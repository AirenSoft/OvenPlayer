/*! OvenPlayerv0.9.6221 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~o~334a3ff0"],{

/***/ "./node_modules/vast-client/src/ad.js":
/*!********************************************!*\
  !*** ./node_modules/vast-client/src/ad.js ***!
  \********************************************/
/*! exports provided: Ad */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ad", function() { return Ad; });
class Ad {
  constructor() {
    this.id = null;
    this.sequence = null;
    this.system = null;
    this.title = null;
    this.description = null;
    this.advertiser = null;
    this.pricing = null;
    this.survey = null;
    this.errorURLTemplates = [];
    this.impressionURLTemplates = [];
    this.creatives = [];
    this.extensions = [];
  }
}


/***/ }),

/***/ "./node_modules/vast-client/src/ad_extension.js":
/*!******************************************************!*\
  !*** ./node_modules/vast-client/src/ad_extension.js ***!
  \******************************************************/
/*! exports provided: AdExtension */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdExtension", function() { return AdExtension; });
class AdExtension {
  constructor() {
    this.attributes = {};
    this.children = [];
  }
}


/***/ }),

/***/ "./node_modules/vast-client/src/ad_extension_child.js":
/*!************************************************************!*\
  !*** ./node_modules/vast-client/src/ad_extension_child.js ***!
  \************************************************************/
/*! exports provided: AdExtensionChild */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdExtensionChild", function() { return AdExtensionChild; });
class AdExtensionChild {
  constructor() {
    this.name = null;
    this.value = null;
    this.attributes = {};
  }
}


/***/ }),

/***/ "./node_modules/vast-client/src/companion_ad.js":
/*!******************************************************!*\
  !*** ./node_modules/vast-client/src/companion_ad.js ***!
  \******************************************************/
/*! exports provided: CompanionAd */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompanionAd", function() { return CompanionAd; });
class CompanionAd {
  constructor() {
    this.id = null;
    this.width = 0;
    this.height = 0;
    this.type = null;
    this.staticResource = null;
    this.htmlResource = null;
    this.iframeResource = null;
    this.altText = null;
    this.companionClickThroughURLTemplate = null;
    this.companionClickTrackingURLTemplates = [];
    this.trackingEvents = {};
  }
}


/***/ }),

/***/ "./node_modules/vast-client/src/creative/creative.js":
/*!***********************************************************!*\
  !*** ./node_modules/vast-client/src/creative/creative.js ***!
  \***********************************************************/
/*! exports provided: Creative */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Creative", function() { return Creative; });
class Creative {
  constructor(creativeAttributes = {}) {
    this.id = creativeAttributes.id || null;
    this.adId = creativeAttributes.adId || null;
    this.sequence = creativeAttributes.sequence || null;
    this.apiFramework = creativeAttributes.apiFramework || null;
    this.trackingEvents = {};
  }
}


/***/ }),

/***/ "./node_modules/vast-client/src/creative/creative_companion.js":
/*!*********************************************************************!*\
  !*** ./node_modules/vast-client/src/creative/creative_companion.js ***!
  \*********************************************************************/
/*! exports provided: CreativeCompanion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreativeCompanion", function() { return CreativeCompanion; });
/* harmony import */ var _creative__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./creative */ "./node_modules/vast-client/src/creative/creative.js");


class CreativeCompanion extends _creative__WEBPACK_IMPORTED_MODULE_0__["Creative"] {
  constructor(creativeAttributes = {}) {
    super(creativeAttributes);

    this.type = 'companion';
    this.variations = [];
  }
}


/***/ }),

/***/ "./node_modules/vast-client/src/creative/creative_linear.js":
/*!******************************************************************!*\
  !*** ./node_modules/vast-client/src/creative/creative_linear.js ***!
  \******************************************************************/
/*! exports provided: CreativeLinear */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreativeLinear", function() { return CreativeLinear; });
/* harmony import */ var _creative__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./creative */ "./node_modules/vast-client/src/creative/creative.js");


class CreativeLinear extends _creative__WEBPACK_IMPORTED_MODULE_0__["Creative"] {
  constructor(creativeAttributes = {}) {
    super(creativeAttributes);

    this.type = 'linear';
    this.duration = 0;
    this.skipDelay = null;
    this.mediaFiles = [];
    this.videoClickThroughURLTemplate = null;
    this.videoClickTrackingURLTemplates = [];
    this.videoCustomClickURLTemplates = [];
    this.adParameters = null;
    this.icons = [];
  }
}


/***/ }),

/***/ "./node_modules/vast-client/src/creative/creative_non_linear.js":
/*!**********************************************************************!*\
  !*** ./node_modules/vast-client/src/creative/creative_non_linear.js ***!
  \**********************************************************************/
/*! exports provided: CreativeNonLinear */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreativeNonLinear", function() { return CreativeNonLinear; });
/* harmony import */ var _creative__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./creative */ "./node_modules/vast-client/src/creative/creative.js");


class CreativeNonLinear extends _creative__WEBPACK_IMPORTED_MODULE_0__["Creative"] {
  constructor(creativeAttributes = {}) {
    super(creativeAttributes);

    this.type = 'nonlinear';
    this.variations = [];
  }
}


/***/ }),

/***/ "./node_modules/vast-client/src/icon.js":
/*!**********************************************!*\
  !*** ./node_modules/vast-client/src/icon.js ***!
  \**********************************************/
/*! exports provided: Icon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Icon", function() { return Icon; });
class Icon {
  constructor() {
    this.program = null;
    this.height = 0;
    this.width = 0;
    this.xPosition = 0;
    this.yPosition = 0;
    this.apiFramework = null;
    this.offset = null;
    this.duration = 0;
    this.type = null;
    this.staticResource = null;
    this.htmlResource = null;
    this.iframeResource = null;
    this.iconClickThroughURLTemplate = null;
    this.iconClickTrackingURLTemplates = [];
    this.iconViewTrackingURLTemplate = null;
  }
}


/***/ }),

/***/ "./node_modules/vast-client/src/index.js":
/*!***********************************************!*\
  !*** ./node_modules/vast-client/src/index.js ***!
  \***********************************************/
/*! exports provided: VASTClient, VASTParser, VASTTracker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _parser_vast_parser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parser/vast_parser.js */ "./node_modules/vast-client/src/parser/vast_parser.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VASTParser", function() { return _parser_vast_parser_js__WEBPACK_IMPORTED_MODULE_0__["VASTParser"]; });

/* harmony import */ var _vast_client_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vast_client.js */ "./node_modules/vast-client/src/vast_client.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VASTClient", function() { return _vast_client_js__WEBPACK_IMPORTED_MODULE_1__["VASTClient"]; });

/* harmony import */ var _vast_tracker_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vast_tracker.js */ "./node_modules/vast-client/src/vast_tracker.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VASTTracker", function() { return _vast_tracker_js__WEBPACK_IMPORTED_MODULE_2__["VASTTracker"]; });








/***/ }),

/***/ "./node_modules/vast-client/src/media_file.js":
/*!****************************************************!*\
  !*** ./node_modules/vast-client/src/media_file.js ***!
  \****************************************************/
/*! exports provided: MediaFile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaFile", function() { return MediaFile; });
class MediaFile {
  constructor() {
    this.id = null;
    this.fileURL = null;
    this.deliveryType = 'progressive';
    this.mimeType = null;
    this.codec = null;
    this.bitrate = 0;
    this.minBitrate = 0;
    this.maxBitrate = 0;
    this.width = 0;
    this.height = 0;
    this.apiFramework = null;
    this.scalable = null;
    this.maintainAspectRatio = null;
  }
}


/***/ }),

/***/ "./node_modules/vast-client/src/non_linear_ad.js":
/*!*******************************************************!*\
  !*** ./node_modules/vast-client/src/non_linear_ad.js ***!
  \*******************************************************/
/*! exports provided: NonLinearAd */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NonLinearAd", function() { return NonLinearAd; });
class NonLinearAd {
  constructor() {
    this.id = null;
    this.width = 0;
    this.height = 0;
    this.expandedWidth = 0;
    this.expandedHeight = 0;
    this.scalable = true;
    this.maintainAspectRatio = true;
    this.minSuggestedDuration = 0;
    this.apiFramework = 'static';
    this.type = null;
    this.staticResource = null;
    this.htmlResource = null;
    this.iframeResource = null;
    this.nonlinearClickThroughURLTemplate = null;
    this.nonlinearClickTrackingURLTemplates = [];
    this.adParameters = null;
  }
}


/***/ }),

/***/ "./node_modules/vast-client/src/parser/ad_parser.js":
/*!**********************************************************!*\
  !*** ./node_modules/vast-client/src/parser/ad_parser.js ***!
  \**********************************************************/
/*! exports provided: parseAd */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseAd", function() { return parseAd; });
/* harmony import */ var _ad__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ad */ "./node_modules/vast-client/src/ad.js");
/* harmony import */ var _ad_extension__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ad_extension */ "./node_modules/vast-client/src/ad_extension.js");
/* harmony import */ var _ad_extension_child__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ad_extension_child */ "./node_modules/vast-client/src/ad_extension_child.js");
/* harmony import */ var _creative_companion_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./creative_companion_parser */ "./node_modules/vast-client/src/parser/creative_companion_parser.js");
/* harmony import */ var _creative_linear_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./creative_linear_parser */ "./node_modules/vast-client/src/parser/creative_linear_parser.js");
/* harmony import */ var _creative_non_linear_parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./creative_non_linear_parser */ "./node_modules/vast-client/src/parser/creative_non_linear_parser.js");
/* harmony import */ var _parser_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./parser_utils */ "./node_modules/vast-client/src/parser/parser_utils.js");








/**
 * This module provides methods to parse a VAST Ad Element.
 */

/**
 * Parses an Ad element (can either be a Wrapper or an InLine).
 * @param  {Object} adElement - The VAST Ad element to parse.
 * @return {Ad}
 */
function parseAd(adElement) {
  const childNodes = adElement.childNodes;

  for (const adTypeElementKey in childNodes) {
    const adTypeElement = childNodes[adTypeElementKey];

    if (['Wrapper', 'InLine'].indexOf(adTypeElement.nodeName) === -1) {
      continue;
    }

    _parser_utils__WEBPACK_IMPORTED_MODULE_6__["parserUtils"].copyNodeAttribute('id', adElement, adTypeElement);
    _parser_utils__WEBPACK_IMPORTED_MODULE_6__["parserUtils"].copyNodeAttribute('sequence', adElement, adTypeElement);

    if (adTypeElement.nodeName === 'Wrapper') {
      return parseWrapper(adTypeElement);
    } else if (adTypeElement.nodeName === 'InLine') {
      return parseInLine(adTypeElement);
    }
  }
}

/**
 * Parses an Inline element.
 * @param  {Object} inLineElement - The VAST Inline element to parse.
 * @return {Ad}
 */
function parseInLine(inLineElement) {
  const childNodes = inLineElement.childNodes;
  const ad = new _ad__WEBPACK_IMPORTED_MODULE_0__["Ad"]();
  ad.id = inLineElement.getAttribute('id') || null;
  ad.sequence = inLineElement.getAttribute('sequence') || null;

  for (const nodeKey in childNodes) {
    const node = childNodes[nodeKey];

    switch (node.nodeName) {
      case 'Error':
        ad.errorURLTemplates.push(_parser_utils__WEBPACK_IMPORTED_MODULE_6__["parserUtils"].parseNodeText(node));
        break;

      case 'Impression':
        ad.impressionURLTemplates.push(_parser_utils__WEBPACK_IMPORTED_MODULE_6__["parserUtils"].parseNodeText(node));
        break;

      case 'Creatives':
        _parser_utils__WEBPACK_IMPORTED_MODULE_6__["parserUtils"]
          .childrenByName(node, 'Creative')
          .forEach(creativeElement => {
            const creativeAttributes = {
              id: creativeElement.getAttribute('id') || null,
              adId: parseCreativeAdIdAttribute(creativeElement),
              sequence: creativeElement.getAttribute('sequence') || null,
              apiFramework: creativeElement.getAttribute('apiFramework') || null
            };

            for (const creativeTypeElementKey in creativeElement.childNodes) {
              const creativeTypeElement =
                creativeElement.childNodes[creativeTypeElementKey];
              let parsedCreative;

              switch (creativeTypeElement.nodeName) {
                case 'Linear':
                  parsedCreative = Object(_creative_linear_parser__WEBPACK_IMPORTED_MODULE_4__["parseCreativeLinear"])(
                    creativeTypeElement,
                    creativeAttributes
                  );
                  if (parsedCreative) {
                    ad.creatives.push(parsedCreative);
                  }
                  break;
                case 'NonLinearAds':
                  parsedCreative = Object(_creative_non_linear_parser__WEBPACK_IMPORTED_MODULE_5__["parseCreativeNonLinear"])(
                    creativeTypeElement,
                    creativeAttributes
                  );
                  if (parsedCreative) {
                    ad.creatives.push(parsedCreative);
                  }
                  break;
                case 'CompanionAds':
                  parsedCreative = Object(_creative_companion_parser__WEBPACK_IMPORTED_MODULE_3__["parseCreativeCompanion"])(
                    creativeTypeElement,
                    creativeAttributes
                  );
                  if (parsedCreative) {
                    ad.creatives.push(parsedCreative);
                  }
                  break;
              }
            }
          });
        break;

      case 'Extensions':
        parseExtensions(
          ad.extensions,
          _parser_utils__WEBPACK_IMPORTED_MODULE_6__["parserUtils"].childrenByName(node, 'Extension')
        );
        break;

      case 'AdSystem':
        ad.system = {
          value: _parser_utils__WEBPACK_IMPORTED_MODULE_6__["parserUtils"].parseNodeText(node),
          version: node.getAttribute('version') || null
        };
        break;

      case 'AdTitle':
        ad.title = _parser_utils__WEBPACK_IMPORTED_MODULE_6__["parserUtils"].parseNodeText(node);
        break;

      case 'Description':
        ad.description = _parser_utils__WEBPACK_IMPORTED_MODULE_6__["parserUtils"].parseNodeText(node);
        break;

      case 'Advertiser':
        ad.advertiser = _parser_utils__WEBPACK_IMPORTED_MODULE_6__["parserUtils"].parseNodeText(node);
        break;

      case 'Pricing':
        ad.pricing = {
          value: _parser_utils__WEBPACK_IMPORTED_MODULE_6__["parserUtils"].parseNodeText(node),
          model: node.getAttribute('model') || null,
          currency: node.getAttribute('currency') || null
        };
        break;

      case 'Survey':
        ad.survey = _parser_utils__WEBPACK_IMPORTED_MODULE_6__["parserUtils"].parseNodeText(node);
        break;
    }
  }

  return ad;
}

/**
 * Parses a Wrapper element without resolving the wrapped urls.
 * @param  {Object} wrapperElement - The VAST Wrapper element to be parsed.
 * @return {Ad}
 */
function parseWrapper(wrapperElement) {
  const ad = parseInLine(wrapperElement);
  let wrapperURLElement = _parser_utils__WEBPACK_IMPORTED_MODULE_6__["parserUtils"].childByName(
    wrapperElement,
    'VASTAdTagURI'
  );

  if (wrapperURLElement) {
    ad.nextWrapperURL = _parser_utils__WEBPACK_IMPORTED_MODULE_6__["parserUtils"].parseNodeText(wrapperURLElement);
  } else {
    wrapperURLElement = _parser_utils__WEBPACK_IMPORTED_MODULE_6__["parserUtils"].childByName(wrapperElement, 'VASTAdTagURL');

    if (wrapperURLElement) {
      ad.nextWrapperURL = _parser_utils__WEBPACK_IMPORTED_MODULE_6__["parserUtils"].parseNodeText(
        _parser_utils__WEBPACK_IMPORTED_MODULE_6__["parserUtils"].childByName(wrapperURLElement, 'URL')
      );
    }
  }

  ad.creatives.forEach(wrapperCreativeElement => {
    if (['linear', 'nonlinear'].indexOf(wrapperCreativeElement.type) !== -1) {
      // TrackingEvents Linear / NonLinear
      if (wrapperCreativeElement.trackingEvents) {
        if (!ad.trackingEvents) {
          ad.trackingEvents = {};
        }
        if (!ad.trackingEvents[wrapperCreativeElement.type]) {
          ad.trackingEvents[wrapperCreativeElement.type] = {};
        }
        for (const eventName in wrapperCreativeElement.trackingEvents) {
          const urls = wrapperCreativeElement.trackingEvents[eventName];
          if (
            !Array.isArray(
              ad.trackingEvents[wrapperCreativeElement.type][eventName]
            )
          ) {
            ad.trackingEvents[wrapperCreativeElement.type][eventName] = [];
          }
          urls.forEach(url => {
            ad.trackingEvents[wrapperCreativeElement.type][eventName].push(url);
          });
        }
      }
      // ClickTracking
      if (wrapperCreativeElement.videoClickTrackingURLTemplates) {
        if (!Array.isArray(ad.videoClickTrackingURLTemplates)) {
          ad.videoClickTrackingURLTemplates = [];
        } // tmp property to save wrapper tracking URLs until they are merged
        wrapperCreativeElement.videoClickTrackingURLTemplates.forEach(item => {
          ad.videoClickTrackingURLTemplates.push(item);
        });
      }
      // ClickThrough
      if (wrapperCreativeElement.videoClickThroughURLTemplate) {
        ad.videoClickThroughURLTemplate =
          wrapperCreativeElement.videoClickThroughURLTemplate;
      }
      // CustomClick
      if (wrapperCreativeElement.videoCustomClickURLTemplates) {
        if (!Array.isArray(ad.videoCustomClickURLTemplates)) {
          ad.videoCustomClickURLTemplates = [];
        } // tmp property to save wrapper tracking URLs until they are merged
        wrapperCreativeElement.videoCustomClickURLTemplates.forEach(item => {
          ad.videoCustomClickURLTemplates.push(item);
        });
      }
    }
  });

  if (ad.nextWrapperURL) {
    return ad;
  }
}

/**
 * Parses an array of Extension elements.
 * @param  {Array} collection - The array used to store the parsed extensions.
 * @param  {Array} extensions - The array of extensions to parse.
 */
function parseExtensions(collection, extensions) {
  extensions.forEach(extNode => {
    const ext = new _ad_extension__WEBPACK_IMPORTED_MODULE_1__["AdExtension"]();
    const extNodeAttrs = extNode.attributes;
    const childNodes = extNode.childNodes;

    if (extNode.attributes) {
      for (const extNodeAttrKey in extNodeAttrs) {
        const extNodeAttr = extNodeAttrs[extNodeAttrKey];

        if (extNodeAttr.nodeName && extNodeAttr.nodeValue) {
          ext.attributes[extNodeAttr.nodeName] = extNodeAttr.nodeValue;
        }
      }
    }

    for (const childNodeKey in childNodes) {
      const childNode = childNodes[childNodeKey];
      const txt = _parser_utils__WEBPACK_IMPORTED_MODULE_6__["parserUtils"].parseNodeText(childNode);

      // ignore comments / empty value
      if (childNode.nodeName !== '#comment' && txt !== '') {
        const extChild = new _ad_extension_child__WEBPACK_IMPORTED_MODULE_2__["AdExtensionChild"]();
        extChild.name = childNode.nodeName;
        extChild.value = txt;

        if (childNode.attributes) {
          const childNodeAttributes = childNode.attributes;

          for (const extChildNodeAttrKey in childNodeAttributes) {
            const extChildNodeAttr = childNodeAttributes[extChildNodeAttrKey];

            extChild.attributes[extChildNodeAttr.nodeName] =
              extChildNodeAttr.nodeValue;
          }
        }

        ext.children.push(extChild);
      }
    }

    collection.push(ext);
  });
}

/**
 * Parses the creative adId Attribute.
 * @param  {any} creativeElement - The creative element to retrieve the adId from.
 * @return {String|null}
 */
function parseCreativeAdIdAttribute(creativeElement) {
  return (
    creativeElement.getAttribute('AdID') || // VAST 2 spec
    creativeElement.getAttribute('adID') || // VAST 3 spec
    creativeElement.getAttribute('adId') || // VAST 4 spec
    null
  );
}


/***/ }),

/***/ "./node_modules/vast-client/src/parser/creative_companion_parser.js":
/*!**************************************************************************!*\
  !*** ./node_modules/vast-client/src/parser/creative_companion_parser.js ***!
  \**************************************************************************/
/*! exports provided: parseCreativeCompanion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseCreativeCompanion", function() { return parseCreativeCompanion; });
/* harmony import */ var _companion_ad__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../companion_ad */ "./node_modules/vast-client/src/companion_ad.js");
/* harmony import */ var _creative_creative_companion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../creative/creative_companion */ "./node_modules/vast-client/src/creative/creative_companion.js");
/* harmony import */ var _parser_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parser_utils */ "./node_modules/vast-client/src/parser/parser_utils.js");




/**
 * This module provides methods to parse a VAST CompanionAd Element.
 */

/**
 * Parses a CompanionAd.
 * @param  {Object} creativeElement - The VAST CompanionAd element to parse.
 * @param  {Object} creativeAttributes - The attributes of the CompanionAd (optional).
 * @return {CreativeCompanion}
 */
function parseCreativeCompanion(creativeElement, creativeAttributes) {
  const creative = new _creative_creative_companion__WEBPACK_IMPORTED_MODULE_1__["CreativeCompanion"](creativeAttributes);

  _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"]
    .childrenByName(creativeElement, 'Companion')
    .forEach(companionResource => {
      const companionAd = new _companion_ad__WEBPACK_IMPORTED_MODULE_0__["CompanionAd"]();
      companionAd.id = companionResource.getAttribute('id') || null;
      companionAd.width = companionResource.getAttribute('width');
      companionAd.height = companionResource.getAttribute('height');
      companionAd.companionClickTrackingURLTemplates = [];

      _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"]
        .childrenByName(companionResource, 'HTMLResource')
        .forEach(htmlElement => {
          companionAd.type =
            htmlElement.getAttribute('creativeType') || 'text/html';
          companionAd.htmlResource = _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"].parseNodeText(htmlElement);
        });

      _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"]
        .childrenByName(companionResource, 'IFrameResource')
        .forEach(iframeElement => {
          companionAd.type = iframeElement.getAttribute('creativeType') || 0;
          companionAd.iframeResource = _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"].parseNodeText(iframeElement);
        });

      _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"]
        .childrenByName(companionResource, 'StaticResource')
        .forEach(staticElement => {
          companionAd.type = staticElement.getAttribute('creativeType') || 0;

          _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"]
            .childrenByName(companionResource, 'AltText')
            .forEach(child => {
              companionAd.altText = _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"].parseNodeText(child);
            });

          companionAd.staticResource = _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"].parseNodeText(staticElement);
        });

      _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"]
        .childrenByName(companionResource, 'TrackingEvents')
        .forEach(trackingEventsElement => {
          _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"]
            .childrenByName(trackingEventsElement, 'Tracking')
            .forEach(trackingElement => {
              const eventName = trackingElement.getAttribute('event');
              const trackingURLTemplate = _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"].parseNodeText(
                trackingElement
              );
              if (eventName && trackingURLTemplate) {
                if (!Array.isArray(companionAd.trackingEvents[eventName])) {
                  companionAd.trackingEvents[eventName] = [];
                }
                companionAd.trackingEvents[eventName].push(trackingURLTemplate);
              }
            });
        });

      _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"]
        .childrenByName(companionResource, 'CompanionClickTracking')
        .forEach(clickTrackingElement => {
          companionAd.companionClickTrackingURLTemplates.push(
            _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"].parseNodeText(clickTrackingElement)
          );
        });

      companionAd.companionClickThroughURLTemplate = _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"].parseNodeText(
        _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"].childByName(companionResource, 'CompanionClickThrough')
      );
      companionAd.companionClickTrackingURLTemplate = _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"].parseNodeText(
        _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"].childByName(companionResource, 'CompanionClickTracking')
      );
      creative.variations.push(companionAd);
    });

  return creative;
}


/***/ }),

/***/ "./node_modules/vast-client/src/parser/creative_linear_parser.js":
/*!***********************************************************************!*\
  !*** ./node_modules/vast-client/src/parser/creative_linear_parser.js ***!
  \***********************************************************************/
/*! exports provided: parseCreativeLinear */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseCreativeLinear", function() { return parseCreativeLinear; });
/* harmony import */ var _creative_creative_linear__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../creative/creative_linear */ "./node_modules/vast-client/src/creative/creative_linear.js");
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../icon */ "./node_modules/vast-client/src/icon.js");
/* harmony import */ var _media_file__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../media_file */ "./node_modules/vast-client/src/media_file.js");
/* harmony import */ var _parser_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parser_utils */ "./node_modules/vast-client/src/parser/parser_utils.js");





/**
 * This module provides methods to parse a VAST Linear Element.
 */

/**
 * Parses a Linear element.
 * @param  {Object} creativeElement - The VAST Linear element to parse.
 * @param  {any} creativeAttributes - The attributes of the Linear (optional).
 * @return {CreativeLinear}
 */
function parseCreativeLinear(creativeElement, creativeAttributes) {
  let offset;
  const creative = new _creative_creative_linear__WEBPACK_IMPORTED_MODULE_0__["CreativeLinear"](creativeAttributes);

  creative.duration = _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].parseDuration(
    _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].parseNodeText(
      _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].childByName(creativeElement, 'Duration')
    )
  );
  const skipOffset = creativeElement.getAttribute('skipoffset');

  if (typeof skipOffset === 'undefined' || skipOffset === null) {
    creative.skipDelay = null;
  } else if (
    skipOffset.charAt(skipOffset.length - 1) === '%' &&
    creative.duration !== -1
  ) {
    const percent = parseInt(skipOffset, 10);
    creative.skipDelay = creative.duration * (percent / 100);
  } else {
    creative.skipDelay = _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].parseDuration(skipOffset);
  }

  const videoClicksElement = _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].childByName(
    creativeElement,
    'VideoClicks'
  );
  if (videoClicksElement) {
    creative.videoClickThroughURLTemplate = _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].parseNodeText(
      _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].childByName(videoClicksElement, 'ClickThrough')
    );

    _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"]
      .childrenByName(videoClicksElement, 'ClickTracking')
      .forEach(clickTrackingElement => {
        creative.videoClickTrackingURLTemplates.push(
          _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].parseNodeText(clickTrackingElement)
        );
      });

    _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"]
      .childrenByName(videoClicksElement, 'CustomClick')
      .forEach(customClickElement => {
        creative.videoCustomClickURLTemplates.push(
          _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].parseNodeText(customClickElement)
        );
      });
  }

  const adParamsElement = _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].childByName(
    creativeElement,
    'AdParameters'
  );
  if (adParamsElement) {
    creative.adParameters = _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].parseNodeText(adParamsElement);
  }

  _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"]
    .childrenByName(creativeElement, 'TrackingEvents')
    .forEach(trackingEventsElement => {
      _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"]
        .childrenByName(trackingEventsElement, 'Tracking')
        .forEach(trackingElement => {
          let eventName = trackingElement.getAttribute('event');
          const trackingURLTemplate = _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].parseNodeText(
            trackingElement
          );
          if (eventName && trackingURLTemplate) {
            if (eventName === 'progress') {
              offset = trackingElement.getAttribute('offset');
              if (!offset) {
                return;
              }
              if (offset.charAt(offset.length - 1) === '%') {
                eventName = `progress-${offset}`;
              } else {
                eventName = `progress-${Math.round(
                  _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].parseDuration(offset)
                )}`;
              }
            }

            if (!Array.isArray(creative.trackingEvents[eventName])) {
              creative.trackingEvents[eventName] = [];
            }
            creative.trackingEvents[eventName].push(trackingURLTemplate);
          }
        });
    });

  _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"]
    .childrenByName(creativeElement, 'MediaFiles')
    .forEach(mediaFilesElement => {
      _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"]
        .childrenByName(mediaFilesElement, 'MediaFile')
        .forEach(mediaFileElement => {
          const mediaFile = new _media_file__WEBPACK_IMPORTED_MODULE_2__["MediaFile"]();
          mediaFile.id = mediaFileElement.getAttribute('id');
          mediaFile.fileURL = _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].parseNodeText(mediaFileElement);
          mediaFile.deliveryType = mediaFileElement.getAttribute('delivery');
          mediaFile.codec = mediaFileElement.getAttribute('codec');
          mediaFile.mimeType = mediaFileElement.getAttribute('type');
          mediaFile.apiFramework = mediaFileElement.getAttribute(
            'apiFramework'
          );
          mediaFile.bitrate = parseInt(
            mediaFileElement.getAttribute('bitrate') || 0
          );
          mediaFile.minBitrate = parseInt(
            mediaFileElement.getAttribute('minBitrate') || 0
          );
          mediaFile.maxBitrate = parseInt(
            mediaFileElement.getAttribute('maxBitrate') || 0
          );
          mediaFile.width = parseInt(
            mediaFileElement.getAttribute('width') || 0
          );
          mediaFile.height = parseInt(
            mediaFileElement.getAttribute('height') || 0
          );

          let scalable = mediaFileElement.getAttribute('scalable');
          if (scalable && typeof scalable === 'string') {
            scalable = scalable.toLowerCase();
            if (scalable === 'true') {
              mediaFile.scalable = true;
            } else if (scalable === 'false') {
              mediaFile.scalable = false;
            }
          }

          let maintainAspectRatio = mediaFileElement.getAttribute(
            'maintainAspectRatio'
          );
          if (maintainAspectRatio && typeof maintainAspectRatio === 'string') {
            maintainAspectRatio = maintainAspectRatio.toLowerCase();
            if (maintainAspectRatio === 'true') {
              mediaFile.maintainAspectRatio = true;
            } else if (maintainAspectRatio === 'false') {
              mediaFile.maintainAspectRatio = false;
            }
          }

          creative.mediaFiles.push(mediaFile);
        });
    });

  const iconsElement = _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].childByName(creativeElement, 'Icons');
  if (iconsElement) {
    _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].childrenByName(iconsElement, 'Icon').forEach(iconElement => {
      const icon = new _icon__WEBPACK_IMPORTED_MODULE_1__["Icon"]();
      icon.program = iconElement.getAttribute('program');
      icon.height = parseInt(iconElement.getAttribute('height') || 0);
      icon.width = parseInt(iconElement.getAttribute('width') || 0);
      icon.xPosition = parseXPosition(iconElement.getAttribute('xPosition'));
      icon.yPosition = parseYPosition(iconElement.getAttribute('yPosition'));
      icon.apiFramework = iconElement.getAttribute('apiFramework');
      icon.offset = _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].parseDuration(
        iconElement.getAttribute('offset')
      );
      icon.duration = _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].parseDuration(
        iconElement.getAttribute('duration')
      );

      _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"]
        .childrenByName(iconElement, 'HTMLResource')
        .forEach(htmlElement => {
          icon.type = htmlElement.getAttribute('creativeType') || 'text/html';
          icon.htmlResource = _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].parseNodeText(htmlElement);
        });

      _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"]
        .childrenByName(iconElement, 'IFrameResource')
        .forEach(iframeElement => {
          icon.type = iframeElement.getAttribute('creativeType') || 0;
          icon.iframeResource = _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].parseNodeText(iframeElement);
        });

      _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"]
        .childrenByName(iconElement, 'StaticResource')
        .forEach(staticElement => {
          icon.type = staticElement.getAttribute('creativeType') || 0;
          icon.staticResource = _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].parseNodeText(staticElement);
        });

      const iconClicksElement = _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].childByName(
        iconElement,
        'IconClicks'
      );
      if (iconClicksElement) {
        icon.iconClickThroughURLTemplate = _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].parseNodeText(
          _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].childByName(iconClicksElement, 'IconClickThrough')
        );
        _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"]
          .childrenByName(iconClicksElement, 'IconClickTracking')
          .forEach(iconClickTrackingElement => {
            icon.iconClickTrackingURLTemplates.push(
              _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].parseNodeText(iconClickTrackingElement)
            );
          });
      }

      icon.iconViewTrackingURLTemplate = _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].parseNodeText(
        _parser_utils__WEBPACK_IMPORTED_MODULE_3__["parserUtils"].childByName(iconElement, 'IconViewTracking')
      );

      creative.icons.push(icon);
    });
  }

  return creative;
}

/**
 * Parses an horizontal position into a String ('left' or 'right') or into a Number.
 * @param  {String} xPosition - The x position to parse.
 * @return {String|Number}
 */
function parseXPosition(xPosition) {
  if (['left', 'right'].indexOf(xPosition) !== -1) {
    return xPosition;
  }

  return parseInt(xPosition || 0);
}

/**
 * Parses an vertical position into a String ('top' or 'bottom') or into a Number.
 * @param  {String} yPosition - The x position to parse.
 * @return {String|Number}
 */
function parseYPosition(yPosition) {
  if (['top', 'bottom'].indexOf(yPosition) !== -1) {
    return yPosition;
  }

  return parseInt(yPosition || 0);
}


/***/ }),

/***/ "./node_modules/vast-client/src/parser/creative_non_linear_parser.js":
/*!***************************************************************************!*\
  !*** ./node_modules/vast-client/src/parser/creative_non_linear_parser.js ***!
  \***************************************************************************/
/*! exports provided: parseCreativeNonLinear */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseCreativeNonLinear", function() { return parseCreativeNonLinear; });
/* harmony import */ var _creative_creative_non_linear__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../creative/creative_non_linear */ "./node_modules/vast-client/src/creative/creative_non_linear.js");
/* harmony import */ var _non_linear_ad__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../non_linear_ad */ "./node_modules/vast-client/src/non_linear_ad.js");
/* harmony import */ var _parser_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parser_utils */ "./node_modules/vast-client/src/parser/parser_utils.js");




/**
 * This module provides methods to parse a VAST NonLinear Element.
 */

/**
 * Parses a NonLinear element.
 * @param  {any} creativeElement - The VAST NonLinear element to parse.
 * @param  {any} creativeAttributes - The attributes of the NonLinear (optional).
 * @return {CreativeNonLinear}
 */
function parseCreativeNonLinear(creativeElement, creativeAttributes) {
  const creative = new _creative_creative_non_linear__WEBPACK_IMPORTED_MODULE_0__["CreativeNonLinear"](creativeAttributes);

  _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"]
    .childrenByName(creativeElement, 'TrackingEvents')
    .forEach(trackingEventsElement => {
      let eventName, trackingURLTemplate;
      _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"]
        .childrenByName(trackingEventsElement, 'Tracking')
        .forEach(trackingElement => {
          eventName = trackingElement.getAttribute('event');
          trackingURLTemplate = _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"].parseNodeText(trackingElement);

          if (eventName && trackingURLTemplate) {
            if (!Array.isArray(creative.trackingEvents[eventName])) {
              creative.trackingEvents[eventName] = [];
            }
            creative.trackingEvents[eventName].push(trackingURLTemplate);
          }
        });
    });

  _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"]
    .childrenByName(creativeElement, 'NonLinear')
    .forEach(nonlinearResource => {
      const nonlinearAd = new _non_linear_ad__WEBPACK_IMPORTED_MODULE_1__["NonLinearAd"]();
      nonlinearAd.id = nonlinearResource.getAttribute('id') || null;
      nonlinearAd.width = nonlinearResource.getAttribute('width');
      nonlinearAd.height = nonlinearResource.getAttribute('height');
      nonlinearAd.expandedWidth = nonlinearResource.getAttribute(
        'expandedWidth'
      );
      nonlinearAd.expandedHeight = nonlinearResource.getAttribute(
        'expandedHeight'
      );
      nonlinearAd.scalable = _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"].parseBoolean(
        nonlinearResource.getAttribute('scalable')
      );
      nonlinearAd.maintainAspectRatio = _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"].parseBoolean(
        nonlinearResource.getAttribute('maintainAspectRatio')
      );
      nonlinearAd.minSuggestedDuration = _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"].parseDuration(
        nonlinearResource.getAttribute('minSuggestedDuration')
      );
      nonlinearAd.apiFramework = nonlinearResource.getAttribute('apiFramework');

      _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"]
        .childrenByName(nonlinearResource, 'HTMLResource')
        .forEach(htmlElement => {
          nonlinearAd.type =
            htmlElement.getAttribute('creativeType') || 'text/html';
          nonlinearAd.htmlResource = _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"].parseNodeText(htmlElement);
        });

      _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"]
        .childrenByName(nonlinearResource, 'IFrameResource')
        .forEach(iframeElement => {
          nonlinearAd.type = iframeElement.getAttribute('creativeType') || 0;
          nonlinearAd.iframeResource = _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"].parseNodeText(iframeElement);
        });

      _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"]
        .childrenByName(nonlinearResource, 'StaticResource')
        .forEach(staticElement => {
          nonlinearAd.type = staticElement.getAttribute('creativeType') || 0;
          nonlinearAd.staticResource = _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"].parseNodeText(staticElement);
        });

      const adParamsElement = _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"].childByName(
        nonlinearResource,
        'AdParameters'
      );
      if (adParamsElement) {
        nonlinearAd.adParameters = _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"].parseNodeText(adParamsElement);
      }

      nonlinearAd.nonlinearClickThroughURLTemplate = _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"].parseNodeText(
        _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"].childByName(nonlinearResource, 'NonLinearClickThrough')
      );
      _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"]
        .childrenByName(nonlinearResource, 'NonLinearClickTracking')
        .forEach(clickTrackingElement => {
          nonlinearAd.nonlinearClickTrackingURLTemplates.push(
            _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"].parseNodeText(clickTrackingElement)
          );
        });

      creative.variations.push(nonlinearAd);
    });

  return creative;
}


/***/ }),

/***/ "./node_modules/vast-client/src/parser/parser_utils.js":
/*!*************************************************************!*\
  !*** ./node_modules/vast-client/src/parser/parser_utils.js ***!
  \*************************************************************/
/*! exports provided: parserUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parserUtils", function() { return parserUtils; });
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/util */ "./node_modules/vast-client/src/util/util.js");


/**
 * This module provides support methods to the parsing classes.
 */

/**
 * Returns the first element of the given node which nodeName matches the given name.
 * @param  {Object} node - The node to use to find a match.
 * @param  {String} name - The name to look for.
 * @return {Object}
 */
function childByName(node, name) {
  const childNodes = node.childNodes;

  for (const childKey in childNodes) {
    const child = childNodes[childKey];

    if (child.nodeName === name) {
      return child;
    }
  }
}

/**
 * Returns all the elements of the given node which nodeName match the given name.
 * @param  {any} node - The node to use to find the matches.
 * @param  {any} name - The name to look for.
 * @return {Array}
 */
function childrenByName(node, name) {
  const children = [];
  const childNodes = node.childNodes;

  for (const childKey in childNodes) {
    const child = childNodes[childKey];

    if (child.nodeName === name) {
      children.push(child);
    }
  }
  return children;
}

/**
 * Converts relative vastAdTagUri.
 * @param  {String} vastAdTagUrl - The url to resolve.
 * @param  {String} originalUrl - The original url.
 * @return {String}
 */
function resolveVastAdTagURI(vastAdTagUrl, originalUrl) {
  if (!originalUrl) {
    return vastAdTagUrl;
  }

  if (vastAdTagUrl.indexOf('//') === 0) {
    const { protocol } = location;
    return `${protocol}${vastAdTagUrl}`;
  }

  if (vastAdTagUrl.indexOf('://') === -1) {
    // Resolve relative URLs (mainly for unit testing)
    const baseURL = originalUrl.slice(0, originalUrl.lastIndexOf('/'));
    return `${baseURL}/${vastAdTagUrl}`;
  }

  return vastAdTagUrl;
}

/**
 * Converts a boolean string into a Boolean.
 * @param  {String} booleanString - The boolean string to convert.
 * @return {Boolean}
 */
function parseBoolean(booleanString) {
  return ['true', 'TRUE', '1'].indexOf(booleanString) !== -1;
}

/**
 * Parses a node text (for legacy support).
 * @param  {Object} node - The node to parse the text from.
 * @return {String}
 */
function parseNodeText(node) {
  return node && (node.textContent || node.text || '').trim();
}

/**
 * Copies an attribute from a node to another.
 * @param  {String} attributeName - The name of the attribute to clone.
 * @param  {Object} nodeSource - The source node to copy the attribute from.
 * @param  {Object} nodeDestination - The destination node to copy the attribute at.
 */
function copyNodeAttribute(attributeName, nodeSource, nodeDestination) {
  const attributeValue = nodeSource.getAttribute(attributeName);
  if (attributeValue) {
    nodeDestination.setAttribute(attributeName, attributeValue);
  }
}

/**
 * Parses a String duration into a Number.
 * @param  {String} durationString - The dureation represented as a string.
 * @return {Number}
 */
function parseDuration(durationString) {
  if (durationString === null || typeof durationString === 'undefined') {
    return -1;
  }
  // Some VAST doesn't have an HH:MM:SS duration format but instead jus the number of seconds
  if (_util_util__WEBPACK_IMPORTED_MODULE_0__["util"].isNumeric(durationString)) {
    return parseInt(durationString);
  }

  const durationComponents = durationString.split(':');
  if (durationComponents.length !== 3) {
    return -1;
  }

  const secondsAndMS = durationComponents[2].split('.');
  let seconds = parseInt(secondsAndMS[0]);
  if (secondsAndMS.length === 2) {
    seconds += parseFloat(`0.${secondsAndMS[1]}`);
  }

  const minutes = parseInt(durationComponents[1] * 60);
  const hours = parseInt(durationComponents[0] * 60 * 60);

  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    isNaN(seconds) ||
    minutes > 60 * 60 ||
    seconds > 60
  ) {
    return -1;
  }
  return hours + minutes + seconds;
}

/**
 * Splits an Array of ads into an Array of Arrays of ads.
 * Each subarray contains either one ad or multiple ads (an AdPod)
 * @param  {Array} ads - An Array of ads to split
 * @return {Array}
 */
function splitVAST(ads) {
  const splittedVAST = [];
  let lastAdPod = null;

  ads.forEach((ad, i) => {
    if (ad.sequence) {
      ad.sequence = parseInt(ad.sequence, 10);
    }
    // The current Ad may be the next Ad of an AdPod
    if (ad.sequence > 1) {
      const lastAd = ads[i - 1];
      // check if the current Ad is exactly the next one in the AdPod
      if (lastAd && lastAd.sequence === ad.sequence - 1) {
        lastAdPod && lastAdPod.push(ad);
        return;
      }
      // If the ad had a sequence attribute but it was not part of a correctly formed
      // AdPod, let's remove the sequence attribute
      delete ad.sequence;
    }

    lastAdPod = [ad];
    splittedVAST.push(lastAdPod);
  });

  return splittedVAST;
}

/**
 * Merges the data between an unwrapped ad and his wrapper.
 * @param  {Ad} unwrappedAd - The 'unwrapped' Ad.
 * @param  {Ad} wrapper - The wrapper Ad.
 * @return {void}
 */
function mergeWrapperAdData(unwrappedAd, wrapper) {
  unwrappedAd.errorURLTemplates = wrapper.errorURLTemplates.concat(
    unwrappedAd.errorURLTemplates
  );
  unwrappedAd.impressionURLTemplates = wrapper.impressionURLTemplates.concat(
    unwrappedAd.impressionURLTemplates
  );
  unwrappedAd.extensions = wrapper.extensions.concat(unwrappedAd.extensions);

  unwrappedAd.creatives.forEach(creative => {
    if (wrapper.trackingEvents && wrapper.trackingEvents[creative.type]) {
      for (const eventName in wrapper.trackingEvents[creative.type]) {
        const urls = wrapper.trackingEvents[creative.type][eventName];
        if (!Array.isArray(creative.trackingEvents[eventName])) {
          creative.trackingEvents[eventName] = [];
        }
        creative.trackingEvents[eventName] = creative.trackingEvents[
          eventName
        ].concat(urls);
      }
    }
  });

  if (
    wrapper.videoClickTrackingURLTemplates &&
    wrapper.videoClickTrackingURLTemplates.length
  ) {
    unwrappedAd.creatives.forEach(creative => {
      if (creative.type === 'linear') {
        creative.videoClickTrackingURLTemplates = creative.videoClickTrackingURLTemplates.concat(
          wrapper.videoClickTrackingURLTemplates
        );
      }
    });
  }

  if (
    wrapper.videoCustomClickURLTemplates &&
    wrapper.videoCustomClickURLTemplates.length
  ) {
    unwrappedAd.creatives.forEach(creative => {
      if (creative.type === 'linear') {
        creative.videoCustomClickURLTemplates = creative.videoCustomClickURLTemplates.concat(
          wrapper.videoCustomClickURLTemplates
        );
      }
    });
  }

  // VAST 2.0 support - Use Wrapper/linear/clickThrough when Inline/Linear/clickThrough is null
  if (wrapper.videoClickThroughURLTemplate) {
    unwrappedAd.creatives.forEach(creative => {
      if (
        creative.type === 'linear' &&
        (creative.videoClickThroughURLTemplate === null ||
          typeof creative.videoClickThroughURLTemplate === 'undefined')
      ) {
        creative.videoClickThroughURLTemplate =
          wrapper.videoClickThroughURLTemplate;
      }
    });
  }
}

const parserUtils = {
  childByName,
  childrenByName,
  resolveVastAdTagURI,
  parseBoolean,
  parseNodeText,
  copyNodeAttribute,
  parseDuration,
  splitVAST,
  mergeWrapperAdData
};


/***/ }),

/***/ "./node_modules/vast-client/src/parser/vast_parser.js":
/*!************************************************************!*\
  !*** ./node_modules/vast-client/src/parser/vast_parser.js ***!
  \************************************************************/
/*! exports provided: VASTParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VASTParser", function() { return VASTParser; });
/* harmony import */ var _ad_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ad_parser */ "./node_modules/vast-client/src/parser/ad_parser.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _parser_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parser_utils */ "./node_modules/vast-client/src/parser/parser_utils.js");
/* harmony import */ var _url_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../url_handler */ "./node_modules/vast-client/src/url_handler.js");
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/util */ "./node_modules/vast-client/src/util/util.js");
/* harmony import */ var _vast_response__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../vast_response */ "./node_modules/vast-client/src/vast_response.js");







const DEFAULT_MAX_WRAPPER_DEPTH = 10;
const DEFAULT_EVENT_DATA = {
  ERRORCODE: 900,
  extensions: []
};

/**
 * This class provides methods to fetch and parse a VAST document.
 * @export
 * @class VASTParser
 * @extends EventEmitter
 */
class VASTParser extends events__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"] {
  /**
   * Creates an instance of VASTParser.
   * @constructor
   */
  constructor() {
    super();

    this.remainingAds = [];
    this.parentURLs = [];
    this.errorURLTemplates = [];
    this.rootErrorURLTemplates = [];
    this.maxWrapperDepth = null;
    this.URLTemplateFilters = [];
    this.fetchingOptions = {};
  }

  /**
   * Adds a filter function to the array of filters which are called before fetching a VAST document.
   * @param  {function} filter - The filter function to be added at the end of the array.
   * @return {void}
   */
  addURLTemplateFilter(filter) {
    if (typeof filter === 'function') {
      this.URLTemplateFilters.push(filter);
    }
  }

  /**
   * Removes the last element of the url templates filters array.
   * @return {void}
   */
  removeURLTemplateFilter() {
    this.URLTemplateFilters.pop();
  }

  /**
   * Returns the number of filters of the url templates filters array.
   * @return {Number}
   */
  countURLTemplateFilters() {
    return this.URLTemplateFilters.length;
  }

  /**
   * Removes all the filter functions from the url templates filters array.
   * @return {void}
   */
  clearURLTemplateFilters() {
    this.URLTemplateFilters = [];
  }

  /**
   * Tracks the error provided in the errorCode parameter and emits a VAST-error event for the given error.
   * @param  {Array} urlTemplates - An Array of url templates to use to make the tracking call.
   * @param  {Object} errorCode - An Object containing the error data.
   * @param  {Object} data - One (or more) Object containing additional data.
   * @emits  VASTParser#VAST-error
   * @return {void}
   */
  trackVastError(urlTemplates, errorCode, ...data) {
    this.emit(
      'VAST-error',
      Object.assign(DEFAULT_EVENT_DATA, errorCode, ...data)
    );
    _util_util__WEBPACK_IMPORTED_MODULE_4__["util"].track(urlTemplates, errorCode);
  }

  /**
   * Returns an array of errorURLTemplates for the VAST being parsed.
   * @return {Array}
   */
  getErrorURLTemplates() {
    return this.rootErrorURLTemplates.concat(this.errorURLTemplates);
  }

  /**
   * Fetches a VAST document for the given url.
   * Returns a Promise which resolves,rejects according to the result of the request.
   * @param  {String} url - The url to request the VAST document.
   * @param {Number} wrapperDepth - how many times the current url has been wrapped
   * @param {String} originalUrl - url of original wrapper
   * @emits  VASTParser#VAST-resolving
   * @emits  VASTParser#VAST-resolved
   * @return {Promise}
   */
  fetchVAST(url, wrapperDepth, originalUrl) {
    return new Promise((resolve, reject) => {
      // Process url with defined filter
      this.URLTemplateFilters.forEach(filter => {
        url = filter(url);
      });

      this.parentURLs.push(url);
      this.emit('VAST-resolving', { url, wrapperDepth, originalUrl });

      this.urlHandler.get(url, this.fetchingOptions, (err, xml) => {
        this.emit('VAST-resolved', { url, error: err });

        if (err) {
          reject(err);
        } else {
          resolve(xml);
        }
      });
    });
  }

  /**
   * Inits the parsing properties of the class with the custom values provided as options.
   * @param {Object} options - The options to initialize a parsing sequence
   */
  initParsingStatus(options = {}) {
    this.rootURL = '';
    this.remainingAds = [];
    this.parentURLs = [];
    this.errorURLTemplates = [];
    this.rootErrorURLTemplates = [];
    this.maxWrapperDepth = options.wrapperLimit || DEFAULT_MAX_WRAPPER_DEPTH;
    this.fetchingOptions = {
      timeout: options.timeout,
      withCredentials: options.withCredentials
    };

    this.urlHandler = options.urlHandler || options.urlhandler || _url_handler__WEBPACK_IMPORTED_MODULE_3__["urlHandler"];
    this.vastVersion = null;
  }

  /**
   * Resolves the next group of ads. If all is true resolves all the remaining ads.
   * @param  {Boolean} all - If true all the remaining ads are resolved
   * @return {Promise}
   */
  getRemainingAds(all) {
    if (this.remainingAds.length === 0) {
      return Promise.reject(
        new Error('No more ads are available for the given VAST')
      );
    }

    const ads = all
      ? _util_util__WEBPACK_IMPORTED_MODULE_4__["util"].flatten(this.remainingAds)
      : this.remainingAds.shift();
    this.errorURLTemplates = [];
    this.parentURLs = [];

    return this.resolveAds(ads, {
      wrapperDepth: 0,
      originalUrl: this.rootURL
    }).then(resolvedAds => {
      return this.buildVASTResponse(resolvedAds);
    });
  }

  /**
   * Fetches and parses a VAST for the given url.
   * Returns a Promise which resolves with a fully parsed VASTResponse or rejects with an Error.
   * @param  {String} url - The url to request the VAST document.
   * @param  {Object} options - An optional Object of parameters to be used in the parsing process.
   * @emits  VASTParser#VAST-resolving
   * @emits  VASTParser#VAST-resolved
   * @return {Promise}
   */
  getAndParseVAST(url, options = {}) {
    this.initParsingStatus(options);
    this.rootURL = url;

    return this.fetchVAST(url).then(xml => {
      options.originalUrl = url;
      options.isRootVAST = true;

      return this.parse(xml, options).then(ads => {
        return this.buildVASTResponse(ads);
      });
    });
  }

  /**
   * Parses the given xml Object into a VASTResponse.
   * Returns a Promise which resolves with a fully parsed VASTResponse or rejects with an Error.
   * @param  {Object} vastXml - An object representing a vast xml document.
   * @param  {Object} options - An optional Object of parameters to be used in the parsing process.
   * @emits  VASTParser#VAST-resolving
   * @emits  VASTParser#VAST-resolved
   * @return {Promise}
   */
  parseVAST(vastXml, options = {}) {
    this.initParsingStatus(options);

    options.isRootVAST = true;

    return this.parse(vastXml, options).then(ads => {
      return this.buildVASTResponse(ads);
    });
  }

  /**
   * Builds a VASTResponse which can be returned.
   * @param  {Array} ads - An Array of unwrapped ads
   * @return {VASTResponse}
   */
  buildVASTResponse(ads) {
    const response = new _vast_response__WEBPACK_IMPORTED_MODULE_5__["VASTResponse"]();
    response.ads = ads;
    response.errorURLTemplates = this.getErrorURLTemplates();
    response.version = this.vastVersion;
    this.completeWrapperResolving(response);

    return response;
  }

  /**
   * Parses the given xml Object into an array of ads
   * Returns the array or throws an `Error` if an invalid VAST XML is provided
   * @param  {Object} vastXml - An object representing an xml document.
   * @param  {Object} options - An optional Object of parameters to be used in the parsing process.
   * @return {Array}
   * @throws {Error} `vastXml` must be a valid VAST XMLDocument
   */
  parseVastXml(vastXml, { isRootVAST = false }) {
    // check if is a valid VAST document
    if (
      !vastXml ||
      !vastXml.documentElement ||
      vastXml.documentElement.nodeName !== 'VAST'
    ) {
      throw new Error('Invalid VAST XMLDocument');
    }

    const ads = [];
    const childNodes = vastXml.documentElement.childNodes;

    /* Only parse the version of the Root VAST for now because we don't know yet how to
       handle some cases like multiple wrappers in the same vast
    */
    if (isRootVAST) {
      const vastVersion = vastXml.documentElement.getAttribute('version');
      if (vastVersion) this.vastVersion = vastVersion;
    }

    // Fill the VASTResponse object with ads and errorURLTemplates
    for (const nodeKey in childNodes) {
      const node = childNodes[nodeKey];

      if (node.nodeName === 'Error') {
        const errorURLTemplate = _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"].parseNodeText(node);

        // Distinguish root VAST url templates from ad specific ones
        isRootVAST
          ? this.rootErrorURLTemplates.push(errorURLTemplate)
          : this.errorURLTemplates.push(errorURLTemplate);
      }

      if (node.nodeName === 'Ad') {
        const ad = Object(_ad_parser__WEBPACK_IMPORTED_MODULE_0__["parseAd"])(node);

        if (ad) {
          ads.push(ad);
        } else {
          // VAST version of response not supported.
          this.trackVastError(this.getErrorURLTemplates(), {
            ERRORCODE: 101
          });
        }
      }
    }

    return ads;
  }

  /**
   * Parses the given xml Object into an array of unwrapped ads.
   * Returns a Promise which resolves with the array or rejects with an error according to the result of the parsing.
   * @param  {Object} vastXml - An object representing an xml document.
   * @param  {Object} options - An optional Object of parameters to be used in the parsing process.
   * @emits  VASTParser#VAST-resolving
   * @emits  VASTParser#VAST-resolved
   * @return {Promise}
   */
  parse(
    vastXml,
    {
      resolveAll = true,
      wrapperSequence = null,
      originalUrl = null,
      wrapperDepth = 0,
      isRootVAST = false
    }
  ) {
    let ads = [];
    try {
      ads = this.parseVastXml(vastXml, { isRootVAST });
    } catch (e) {
      return Promise.reject(e);
    }

    const adsCount = ads.length;
    const lastAddedAd = ads[adsCount - 1];
    // if in child nodes we have only one ads
    // and wrapperSequence is defined
    // and this ads doesn't already have sequence
    if (
      adsCount === 1 &&
      wrapperSequence !== undefined &&
      wrapperSequence !== null &&
      lastAddedAd &&
      !lastAddedAd.sequence
    ) {
      lastAddedAd.sequence = wrapperSequence;
    }

    // Split the VAST in case we don't want to resolve everything at the first time
    if (resolveAll === false) {
      this.remainingAds = _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"].splitVAST(ads);
      // Remove the first element from the remaining ads array, since we're going to resolve that element
      ads = this.remainingAds.shift();
    }

    return this.resolveAds(ads, { wrapperDepth, originalUrl });
  }

  /**
   * Resolves an Array of ads, recursively calling itself with the remaining ads if a no ad
   * response is returned for the given array.
   * @param {Array} ads - An array of ads to resolve
   * @param {Object} options - An options Object containing resolving parameters
   * @return {Promise}
   */
  resolveAds(ads = [], { wrapperDepth, originalUrl }) {
    const resolveWrappersPromises = [];

    ads.forEach(ad => {
      const resolveWrappersPromise = this.resolveWrappers(
        ad,
        wrapperDepth,
        originalUrl
      );

      resolveWrappersPromises.push(resolveWrappersPromise);
    });

    return Promise.all(resolveWrappersPromises).then(unwrappedAds => {
      const resolvedAds = _util_util__WEBPACK_IMPORTED_MODULE_4__["util"].flatten(unwrappedAds);

      if (!resolvedAds && this.remainingAds.length > 0) {
        const remainingAdsToResolve = this.remainingAds.shift();

        return this.resolveAds(remainingAdsToResolve, {
          wrapperDepth,
          originalUrl
        });
      }

      return resolvedAds;
    });
  }

  /**
   * Resolves the wrappers for the given ad in a recursive way.
   * Returns a Promise which resolves with the unwrapped ad or rejects with an error.
   * @param  {Ad} ad - An ad to be unwrapped.
   * @param  {Number} wrapperDepth - The reached depth in the wrapper resolving chain.
   * @param  {String} originalUrl - The original vast url.
   * @return {Promise}
   */
  resolveWrappers(ad, wrapperDepth, originalUrl) {
    return new Promise(resolve => {
      // Going one level deeper in the wrapper chain
      wrapperDepth++;
      // We already have a resolved VAST ad, no need to resolve wrapper
      if (!ad.nextWrapperURL) {
        delete ad.nextWrapperURL;
        return resolve(ad);
      }

      if (
        wrapperDepth >= this.maxWrapperDepth ||
        this.parentURLs.indexOf(ad.nextWrapperURL) !== -1
      ) {
        // Wrapper limit reached, as defined by the video player.
        // Too many Wrapper responses have been received with no InLine response.
        ad.errorCode = 302;
        delete ad.nextWrapperURL;
        return resolve(ad);
      }

      // Get full URL
      ad.nextWrapperURL = _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"].resolveVastAdTagURI(
        ad.nextWrapperURL,
        originalUrl
      );

      // sequence doesn't carry over in wrapper element
      const wrapperSequence = ad.sequence;
      originalUrl = ad.nextWrapperURL;

      this.fetchVAST(ad.nextWrapperURL, wrapperDepth, originalUrl)
        .then(xml => {
          return this.parse(xml, {
            originalUrl,
            wrapperSequence,
            wrapperDepth
          }).then(unwrappedAds => {
            delete ad.nextWrapperURL;
            if (unwrappedAds.length === 0) {
              // No ads returned by the wrappedResponse, discard current <Ad><Wrapper> creatives
              ad.creatives = [];
              return resolve(ad);
            }

            unwrappedAds.forEach(unwrappedAd => {
              if (unwrappedAd) {
                _parser_utils__WEBPACK_IMPORTED_MODULE_2__["parserUtils"].mergeWrapperAdData(unwrappedAd, ad);
              }
            });

            resolve(unwrappedAds);
          });
        })
        .catch(err => {
          // Timeout of VAST URI provided in Wrapper element, or of VAST URI provided in a subsequent Wrapper element.
          // (URI was either unavailable or reached a timeout as defined by the video player.)
          ad.errorCode = 301;
          ad.errorMessage = err.message;

          resolve(ad);
        });
    });
  }

  /**
   * Takes care of handling errors when the wrappers are resolved.
   * @param {VASTResponse} vastResponse - A resolved VASTResponse.
   */
  completeWrapperResolving(vastResponse) {
    // We've to wait for all <Ad> elements to be parsed before handling error so we can:
    // - Send computed extensions data
    // - Ping all <Error> URIs defined across VAST files

    // No Ad case - The parser never bump into an <Ad> element
    if (vastResponse.ads.length === 0) {
      this.trackVastError(vastResponse.errorURLTemplates, { ERRORCODE: 303 });
    } else {
      for (let index = vastResponse.ads.length - 1; index >= 0; index--) {
        // - Error encountred while parsing
        // - No Creative case - The parser has dealt with soma <Ad><Wrapper> or/and an <Ad><Inline> elements
        // but no creative was found
        const ad = vastResponse.ads[index];
        if (ad.errorCode || ad.creatives.length === 0) {
          this.trackVastError(
            ad.errorURLTemplates.concat(vastResponse.errorURLTemplates),
            { ERRORCODE: ad.errorCode || 303 },
            { ERRORMESSAGE: ad.errorMessage || '' },
            { extensions: ad.extensions },
            { system: ad.system }
          );
          vastResponse.ads.splice(index, 1);
        }
      }
    }
  }
}


/***/ }),

/***/ "./node_modules/vast-client/src/url_handler.js":
/*!*****************************************************!*\
  !*** ./node_modules/vast-client/src/url_handler.js ***!
  \*****************************************************/
/*! exports provided: urlHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "urlHandler", function() { return urlHandler; });
/* harmony import */ var _urlhandlers_flash_url_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./urlhandlers/flash_url_handler */ "./node_modules/vast-client/src/urlhandlers/flash_url_handler.js");
/* harmony import */ var _urlhandlers_mock_node_url_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./urlhandlers/mock_node_url_handler */ "./node_modules/vast-client/src/urlhandlers/mock_node_url_handler.js");
/* harmony import */ var _urlhandlers_xhr_url_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./urlhandlers/xhr_url_handler */ "./node_modules/vast-client/src/urlhandlers/xhr_url_handler.js");




function get(url, options, cb) {
  // Allow skip of the options param
  if (!cb) {
    if (typeof options === 'function') {
      cb = options;
    }
    options = {};
  }

  if (typeof window === 'undefined' || window === null) {
    return _urlhandlers_mock_node_url_handler__WEBPACK_IMPORTED_MODULE_1__["nodeURLHandler"].get(url, options, cb);
  } else if (_urlhandlers_xhr_url_handler__WEBPACK_IMPORTED_MODULE_2__["XHRURLHandler"].supported()) {
    return _urlhandlers_xhr_url_handler__WEBPACK_IMPORTED_MODULE_2__["XHRURLHandler"].get(url, options, cb);
  } else if (_urlhandlers_flash_url_handler__WEBPACK_IMPORTED_MODULE_0__["flashURLHandler"].supported()) {
    return _urlhandlers_flash_url_handler__WEBPACK_IMPORTED_MODULE_0__["flashURLHandler"].get(url, options, cb);
  }
  return cb(
    new Error(
      'Current context is not supported by any of the default URLHandlers. Please provide a custom URLHandler'
    )
  );
}

const urlHandler = {
  get
};


/***/ }),

/***/ "./node_modules/vast-client/src/urlhandlers/flash_url_handler.js":
/*!***********************************************************************!*\
  !*** ./node_modules/vast-client/src/urlhandlers/flash_url_handler.js ***!
  \***********************************************************************/
/*! exports provided: flashURLHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flashURLHandler", function() { return flashURLHandler; });
function xdr() {
  let request;
  if (window.XDomainRequest) {
    // eslint-disable-next-line no-undef
    request = new XDomainRequest();
  }
  return request;
}

function supported() {
  return !!xdr();
}

function get(url, options, cb) {
  const xmlDocument =
    typeof window.ActiveXObject === 'function'
      ? new window.ActiveXObject('Microsoft.XMLDOM')
      : undefined;

  if (xmlDocument) {
    xmlDocument.async = false;
  } else {
    return cb(
      new Error('FlashURLHandler: Microsoft.XMLDOM format not supported')
    );
  }

  const request = xdr();
  request.open('GET', url);
  request.timeout = options.timeout || 0;
  request.withCredentials = options.withCredentials || false;
  request.send();
  request.onprogress = function() {};

  request.onload = function() {
    xmlDocument.loadXML(request.responseText);
    cb(null, xmlDocument);
  };
}

const flashURLHandler = {
  get,
  supported
};


/***/ }),

/***/ "./node_modules/vast-client/src/urlhandlers/mock_node_url_handler.js":
/*!***************************************************************************!*\
  !*** ./node_modules/vast-client/src/urlhandlers/mock_node_url_handler.js ***!
  \***************************************************************************/
/*! exports provided: nodeURLHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nodeURLHandler", function() { return nodeURLHandler; });
// This mock module is loaded in stead of the original NodeURLHandler module
// when bundling the library for environments which are not node.
// This allows us to avoid bundling useless node components and have a smaller build.
function get(url, options, cb) {
  cb(
    new Error('Please bundle the library for node to use the node urlHandler')
  );
}

const nodeURLHandler = {
  get
};


/***/ }),

/***/ "./node_modules/vast-client/src/urlhandlers/xhr_url_handler.js":
/*!*********************************************************************!*\
  !*** ./node_modules/vast-client/src/urlhandlers/xhr_url_handler.js ***!
  \*********************************************************************/
/*! exports provided: XHRURLHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XHRURLHandler", function() { return XHRURLHandler; });
function xhr() {
  try {
    const request = new window.XMLHttpRequest();
    if ('withCredentials' in request) {
      // check CORS support
      return request;
    }
    return null;
  } catch (err) {
    return null;
  }
}

function supported() {
  return !!xhr();
}

function get(url, options, cb) {
  if (window.location.protocol === 'https:' && url.indexOf('http://') === 0) {
    return cb(new Error('XHRURLHandler: Cannot go from HTTPS to HTTP.'));
  }

  try {
    const request = xhr();

    request.open('GET', url);
    request.timeout = options.timeout || 0;
    request.withCredentials = options.withCredentials || false;
    request.overrideMimeType && request.overrideMimeType('text/xml');
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          cb(null, request.responseXML);
        } else {
          cb(new Error(`XHRURLHandler: ${request.statusText}`));
        }
      }
    };
    request.send();
  } catch (error) {
    cb(new Error('XHRURLHandler: Unexpected error'));
  }
}

const XHRURLHandler = {
  get,
  supported
};


/***/ }),

/***/ "./node_modules/vast-client/src/util/storage.js":
/*!******************************************************!*\
  !*** ./node_modules/vast-client/src/util/storage.js ***!
  \******************************************************/
/*! exports provided: Storage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Storage", function() { return Storage; });
let storage = null;

/**
 * This Object represents a default storage to be used in case no other storage is available.
 * @constant
 * @type {Object}
 */
const DEFAULT_STORAGE = {
  data: {},
  length: 0,
  getItem(key) {
    return this.data[key];
  },
  setItem(key, value) {
    this.data[key] = value;
    this.length = Object.keys(this.data).length;
  },
  removeItem(key) {
    delete this.data[key];
    this.length = Object.keys(this.data).length;
  },
  clear() {
    this.data = {};
    this.length = 0;
  }
};

/**
 * This class provides an wrapper interface to the a key-value storage.
 * It uses localStorage, sessionStorage or a custom storage if none of the two is available.
 * @export
 * @class Storage
 */
class Storage {
  /**
   * Creates an instance of Storage.
   * @constructor
   */
  constructor() {
    this.storage = this.initStorage();
  }

  /**
   * Provides a singleton instance of the wrapped storage.
   * @return {Object}
   */
  initStorage() {
    if (storage) {
      return storage;
    }

    try {
      storage =
        typeof window !== 'undefined' && window !== null
          ? window.localStorage || window.sessionStorage
          : null;
    } catch (storageError) {
      storage = null;
    }

    if (!storage || this.isStorageDisabled(storage)) {
      storage = DEFAULT_STORAGE;
      storage.clear();
    }

    return storage;
  }

  /**
   * Check if storage is disabled (like in certain cases with private browsing).
   * In Safari (Mac + iOS) when private browsing is ON, localStorage is read only
   * http://spin.atomicobject.com/2013/01/23/ios-private-browsing-localstorage/
   * @param {Object} testStorage - The storage to check.
   * @return {Boolean}
   */
  isStorageDisabled(testStorage) {
    const testValue = '__VASTStorage__';

    try {
      testStorage.setItem(testValue, testValue);
      if (testStorage.getItem(testValue) !== testValue) {
        testStorage.removeItem(testValue);
        return true;
      }
    } catch (e) {
      return true;
    }

    testStorage.removeItem(testValue);
    return false;
  }

  /**
   * Returns the value for the given key. If the key does not exist, null is returned.
   * @param  {String} key - The key to retrieve the value.
   * @return {any}
   */
  getItem(key) {
    return this.storage.getItem(key);
  }

  /**
   * Adds or updates the value for the given key.
   * @param  {String} key - The key to modify the value.
   * @param  {any} value - The value to be associated with the key.
   * @return {any}
   */
  setItem(key, value) {
    return this.storage.setItem(key, value);
  }

  /**
   * Removes an item for the given key.
   * @param  {String} key - The key to remove the value.
   * @return {any}
   */
  removeItem(key) {
    return this.storage.removeItem(key);
  }

  /**
   * Removes all the items from the storage.
   */
  clear() {
    return this.storage.clear();
  }
}


/***/ }),

/***/ "./node_modules/vast-client/src/util/util.js":
/*!***************************************************!*\
  !*** ./node_modules/vast-client/src/util/util.js ***!
  \***************************************************/
/*! exports provided: util */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "util", function() { return util; });
function track(URLTemplates, variables, options) {
  const URLs = resolveURLTemplates(URLTemplates, variables, options);

  URLs.forEach(URL => {
    if (typeof window !== 'undefined' && window !== null) {
      const i = new Image();
      i.src = URL;
    }
  });
}

/**
 * Replace the provided URLTemplates with the given values
 *
 * @param {Array} URLTemplates - An array of tracking url templates.
 * @param {Object} [variables={}] - An optional Object of parameters to be used in the tracking calls.
 * @param {Object} [options={}] - An optional Object of options to be used in the tracking calls.
 */
function resolveURLTemplates(URLTemplates, variables = {}, options = {}) {
  const URLs = [];

  // Encode String variables, when given
  if (variables['ASSETURI']) {
    variables['ASSETURI'] = encodeURIComponentRFC3986(variables['ASSETURI']);
  }
  if (variables['CONTENTPLAYHEAD']) {
    variables['CONTENTPLAYHEAD'] = encodeURIComponentRFC3986(
      variables['CONTENTPLAYHEAD']
    );
  }

  // Set default value for invalid ERRORCODE
  if (
    variables['ERRORCODE'] &&
    !options.isCustomCode &&
    !/^[0-9]{3}$/.test(variables['ERRORCODE'])
  ) {
    variables['ERRORCODE'] = 900;
  }

  // Calc random/time based macros
  variables['CACHEBUSTING'] = leftpad(
    Math.round(Math.random() * 1.0e8).toString()
  );
  variables['TIMESTAMP'] = encodeURIComponentRFC3986(new Date().toISOString());

  // RANDOM/random is not defined in VAST 3/4 as a valid macro tho it's used by some adServer (Auditude)
  variables['RANDOM'] = variables['random'] = variables['CACHEBUSTING'];

  for (const URLTemplateKey in URLTemplates) {
    let resolveURL = URLTemplates[URLTemplateKey];

    if (typeof resolveURL !== 'string') {
      continue;
    }

    for (const key in variables) {
      const value = variables[key];
      const macro1 = `[${key}]`;
      const macro2 = `%%${key}%%`;
      resolveURL = resolveURL.replace(macro1, value);
      resolveURL = resolveURL.replace(macro2, value);
    }
    URLs.push(resolveURL);
  }

  return URLs;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
function encodeURIComponentRFC3986(str) {
  return encodeURIComponent(str).replace(
    /[!'()*]/g,
    c => `%${c.charCodeAt(0).toString(16)}`
  );
}

function leftpad(str) {
  if (str.length < 8) {
    return (
      range(0, 8 - str.length, false)
        .map(() => '0')
        .join('') + str
    );
  }
  return str;
}

function range(left, right, inclusive) {
  const result = [];
  const ascending = left < right;
  const end = !inclusive ? right : ascending ? right + 1 : right - 1;

  for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    result.push(i);
  }
  return result;
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function flatten(arr) {
  return arr.reduce((flat, toFlatten) => {
    return flat.concat(
      Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
    );
  }, []);
}

const util = {
  track,
  resolveURLTemplates,
  encodeURIComponentRFC3986,
  leftpad,
  range,
  isNumeric,
  flatten
};


/***/ }),

/***/ "./node_modules/vast-client/src/vast_client.js":
/*!*****************************************************!*\
  !*** ./node_modules/vast-client/src/vast_client.js ***!
  \*****************************************************/
/*! exports provided: VASTClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VASTClient", function() { return VASTClient; });
/* harmony import */ var _util_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/storage */ "./node_modules/vast-client/src/util/storage.js");
/* harmony import */ var _parser_vast_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parser/vast_parser */ "./node_modules/vast-client/src/parser/vast_parser.js");



/**
 * This class provides methods to fetch and parse a VAST document using VASTParser.
 * In addition it provides options to skip consecutive calls based on constraints.
 * @export
 * @class VASTClient
 */
class VASTClient {
  /**
   * Creates an instance of VASTClient.
   * @param  {Number} cappingFreeLunch - The number of first calls to skip.
   * @param  {Number} cappingMinimumTimeInterval - The minimum time interval between two consecutive calls.
   * @param  {Storage} customStorage - A custom storage to use instead of the default one.
   * @constructor
   */
  constructor(cappingFreeLunch, cappingMinimumTimeInterval, customStorage) {
    this.cappingFreeLunch = cappingFreeLunch || 0;
    this.cappingMinimumTimeInterval = cappingMinimumTimeInterval || 0;
    this.defaultOptions = {
      withCredentials: false,
      timeout: 0
    };
    this.vastParser = new _parser_vast_parser__WEBPACK_IMPORTED_MODULE_1__["VASTParser"]();
    this.storage = customStorage || new _util_storage__WEBPACK_IMPORTED_MODULE_0__["Storage"]();

    // Init values if not already set
    if (this.lastSuccessfulAd === undefined) {
      this.lastSuccessfulAd = 0;
    }

    if (this.totalCalls === undefined) {
      this.totalCalls = 0;
    }
    if (this.totalCallsTimeout === undefined) {
      this.totalCallsTimeout = 0;
    }
  }

  getParser() {
    return this.vastParser;
  }

  get lastSuccessfulAd() {
    return this.storage.getItem('vast-client-last-successful-ad');
  }

  set lastSuccessfulAd(value) {
    this.storage.setItem('vast-client-last-successful-ad', value);
  }

  get totalCalls() {
    return this.storage.getItem('vast-client-total-calls');
  }

  set totalCalls(value) {
    this.storage.setItem('vast-client-total-calls', value);
  }

  get totalCallsTimeout() {
    return this.storage.getItem('vast-client-total-calls-timeout');
  }

  set totalCallsTimeout(value) {
    this.storage.setItem('vast-client-total-calls-timeout', value);
  }

  /**
   * Returns a boolean indicating if there are more ads to resolve for the current parsing.
   * @return {Boolean}
   */
  hasRemainingAds() {
    return this.vastParser.remainingAds.length > 0;
  }

  /**
   * Resolves the next group of ads. If all is true resolves all the remaining ads.
   * @param  {Boolean} all - If true all the remaining ads are resolved
   * @return {Promise}
   */
  getNextAds(all) {
    return this.vastParser.getRemainingAds(all);
  }

  /**
   * Gets a parsed VAST document for the given url, applying the skipping rules defined.
   * Returns a Promise which resolves with a fully parsed VASTResponse or rejects with an Error.
   * @param  {String} url - The url to use to fecth the VAST document.
   * @param  {Object} options - An optional Object of parameters to be applied in the process.
   * @return {Promise}
   */
  get(url, options = {}) {
    const now = Date.now();
    options = Object.assign(this.defaultOptions, options);

    // By default the client resolves only the first Ad or AdPod
    if (!options.hasOwnProperty('resolveAll')) {
      options.resolveAll = false;
    }

    // Check totalCallsTimeout (first call + 1 hour), if older than now,
    // reset totalCalls number, by this way the client will be eligible again
    // for freelunch capping
    if (this.totalCallsTimeout < now) {
      this.totalCalls = 1;
      this.totalCallsTimeout = now + 60 * 60 * 1000;
    } else {
      this.totalCalls++;
    }

    return new Promise((resolve, reject) => {
      if (this.cappingFreeLunch >= this.totalCalls) {
        return reject(
          new Error(
            `VAST call canceled – FreeLunch capping not reached yet ${
              this.totalCalls
            }/${this.cappingFreeLunch}`
          )
        );
      }

      const timeSinceLastCall = now - this.lastSuccessfulAd;

      // Check timeSinceLastCall to be a positive number. If not, this mean the
      // previous was made in the future. We reset lastSuccessfulAd value
      if (timeSinceLastCall < 0) {
        this.lastSuccessfulAd = 0;
      } else if (timeSinceLastCall < this.cappingMinimumTimeInterval) {
        return reject(
          new Error(
            `VAST call canceled – (${
              this.cappingMinimumTimeInterval
            })ms minimum interval reached`
          )
        );
      }

      this.vastParser
        .getAndParseVAST(url, options)
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }
}


/***/ }),

/***/ "./node_modules/vast-client/src/vast_response.js":
/*!*******************************************************!*\
  !*** ./node_modules/vast-client/src/vast_response.js ***!
  \*******************************************************/
/*! exports provided: VASTResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VASTResponse", function() { return VASTResponse; });
class VASTResponse {
  constructor() {
    this.ads = [];
    this.errorURLTemplates = [];
    this.version = null;
  }
}


/***/ }),

/***/ "./node_modules/vast-client/src/vast_tracker.js":
/*!******************************************************!*\
  !*** ./node_modules/vast-client/src/vast_tracker.js ***!
  \******************************************************/
/*! exports provided: VASTTracker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VASTTracker", function() { return VASTTracker; });
/* harmony import */ var _companion_ad__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./companion_ad */ "./node_modules/vast-client/src/companion_ad.js");
/* harmony import */ var _creative_creative_linear__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./creative/creative_linear */ "./node_modules/vast-client/src/creative/creative_linear.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _non_linear_ad__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./non_linear_ad */ "./node_modules/vast-client/src/non_linear_ad.js");
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/util */ "./node_modules/vast-client/src/util/util.js");






/**
 * The default skip delay used in case a custom one is not provided
 * @constant
 * @type {Number}
 */
const DEFAULT_SKIP_DELAY = -1;

/**
 * This class provides methods to track an ad execution.
 *
 * @export
 * @class VASTTracker
 * @extends EventEmitter
 */
class VASTTracker extends events__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"] {
  /**
   * Creates an instance of VASTTracker.
   *
   * @param {VASTClient} client - An instance of VASTClient that can be updated by the tracker. [optional]
   * @param {Ad} ad - The ad to track.
   * @param {Creative} creative - The creative to track.
   * @param {CompanionAd|NonLinearAd} [variation=null] - An optional variation of the creative.
   * @constructor
   */
  constructor(client, ad, creative, variation = null) {
    super();
    this.ad = ad;
    this.creative = creative;
    this.variation = variation;
    this.muted = false;
    this.impressed = false;
    this.skippable = false;
    this.trackingEvents = {};
    // We need to save the already triggered quartiles, in order to not trigger them again
    this._alreadyTriggeredQuartiles = {};
    // Tracker listeners should be notified with some events
    // no matter if there is a tracking URL or not
    this.emitAlwaysEvents = [
      'creativeView',
      'start',
      'firstQuartile',
      'midpoint',
      'thirdQuartile',
      'complete',
      'resume',
      'pause',
      'rewind',
      'skip',
      'closeLinear',
      'close'
    ];

    // Duplicate the creative's trackingEvents property so we can alter it
    for (const eventName in this.creative.trackingEvents) {
      const events = this.creative.trackingEvents[eventName];
      this.trackingEvents[eventName] = events.slice(0);
    }

    // Nonlinear and companion creatives provide some tracking information at a variation level
    // While linear creatives provided that at a creative level. That's why we need to
    // differentiate how we retrieve some tracking information.
    if (this.creative instanceof _creative_creative_linear__WEBPACK_IMPORTED_MODULE_1__["CreativeLinear"]) {
      this._initLinearTracking();
    } else {
      this._initVariationTracking();
    }

    // If the tracker is associated with a client we add a listener to the start event
    // to update the lastSuccessfulAd property.
    if (client) {
      this.on('start', () => {
        client.lastSuccessfulAd = Date.now();
      });
    }
  }

  /**
   * Init the custom tracking options for linear creatives.
   *
   * @return {void}
   */
  _initLinearTracking() {
    this.linear = true;
    this.skipDelay = this.creative.skipDelay;

    this.setDuration(this.creative.duration);

    this.clickThroughURLTemplate = this.creative.videoClickThroughURLTemplate;
    this.clickTrackingURLTemplates = this.creative.videoClickTrackingURLTemplates;
  }

  /**
   * Init the custom tracking options for nonlinear and companion creatives.
   * These options are provided in the variation Object.
   *
   * @return {void}
   */
  _initVariationTracking() {
    this.linear = false;
    this.skipDelay = DEFAULT_SKIP_DELAY;

    // If no variation has been provided there's nothing else to set
    if (!this.variation) {
      return;
    }

    // Duplicate the variation's trackingEvents property so we can alter it
    for (const eventName in this.variation.trackingEvents) {
      const events = this.variation.trackingEvents[eventName];

      // If for the given eventName we already had some trackingEvents provided by the creative
      // we want to keep both the creative trackingEvents and the variation ones
      if (this.trackingEvents[eventName]) {
        this.trackingEvents[eventName] = this.trackingEvents[eventName].concat(
          events.slice(0)
        );
      } else {
        this.trackingEvents[eventName] = events.slice(0);
      }
    }

    if (this.variation instanceof _non_linear_ad__WEBPACK_IMPORTED_MODULE_3__["NonLinearAd"]) {
      this.clickThroughURLTemplate = this.variation.nonlinearClickThroughURLTemplate;
      this.clickTrackingURLTemplates = this.variation.nonlinearClickTrackingURLTemplates;
      this.setDuration(this.variation.minSuggestedDuration);
    } else if (this.variation instanceof _companion_ad__WEBPACK_IMPORTED_MODULE_0__["CompanionAd"]) {
      this.clickThroughURLTemplate = this.variation.companionClickThroughURLTemplate;
      this.clickTrackingURLTemplates = this.variation.companionClickTrackingURLTemplates;
    }
  }

  /**
   * Sets the duration of the ad and updates the quartiles based on that.
   *
   * @param  {Number} duration - The duration of the ad.
   */
  setDuration(duration) {
    this.assetDuration = duration;
    // beware of key names, theses are also used as event names
    this.quartiles = {
      firstQuartile: Math.round(25 * this.assetDuration) / 100,
      midpoint: Math.round(50 * this.assetDuration) / 100,
      thirdQuartile: Math.round(75 * this.assetDuration) / 100
    };
  }

  /**
   * Sets the duration of the ad and updates the quartiles based on that.
   * This is required for tracking time related events.
   *
   * @param {Number} progress - Current playback time in seconds.
   * @emits VASTTracker#start
   * @emits VASTTracker#skip-countdown
   * @emits VASTTracker#progress-[0-100]%
   * @emits VASTTracker#progress-[currentTime]
   * @emits VASTTracker#rewind
   * @emits VASTTracker#firstQuartile
   * @emits VASTTracker#midpoint
   * @emits VASTTracker#thirdQuartile
   */
  setProgress(progress) {
    const skipDelay = this.skipDelay || DEFAULT_SKIP_DELAY;

    if (skipDelay !== -1 && !this.skippable) {
      if (skipDelay > progress) {
        this.emit('skip-countdown', skipDelay - progress);
      } else {
        this.skippable = true;
        this.emit('skip-countdown', 0);
      }
    }

    if (this.assetDuration > 0) {
      const events = [];

      if (progress > 0) {
        const percent = Math.round((progress / this.assetDuration) * 100);

        events.push('start');
        events.push(`progress-${percent}%`);
        events.push(`progress-${Math.round(progress)}`);

        for (const quartile in this.quartiles) {
          if (
            this.isQuartileReached(quartile, this.quartiles[quartile], progress)
          ) {
            events.push(quartile);
            this._alreadyTriggeredQuartiles[quartile] = true;
          }
        }
      }

      events.forEach(eventName => {
        this.track(eventName, true);
      });

      if (progress < this.progress) {
        this.track('rewind');
      }
    }

    this.progress = progress;
  }

  /**
   * Checks if a quartile has been reached without have being triggered already.
   *
   * @param {String} quartile - Quartile name
   * @param {Number} time - Time offset, when this quartile is reached in seconds.
   * @param {Number} progress - Current progress of the ads in seconds.
   *
   * @return {Boolean}
   */
  isQuartileReached(quartile, time, progress) {
    let quartileReached = false;
    // if quartile time already reached and never triggered
    if (time <= progress && !this._alreadyTriggeredQuartiles[quartile]) {
      quartileReached = true;
    }
    return quartileReached;
  }

  /**
   * Updates the mute state and calls the mute/unmute tracking URLs.
   *
   * @param {Boolean} muted - Indicates if the video is muted or not.
   * @emits VASTTracker#mute
   * @emits VASTTracker#unmute
   */
  setMuted(muted) {
    if (this.muted !== muted) {
      this.track(muted ? 'mute' : 'unmute');
    }
    this.muted = muted;
  }

  /**
   * Update the pause state and call the resume/pause tracking URLs.
   *
   * @param {Boolean} paused - Indicates if the video is paused or not.
   * @emits VASTTracker#pause
   * @emits VASTTracker#resume
   */
  setPaused(paused) {
    if (this.paused !== paused) {
      this.track(paused ? 'pause' : 'resume');
    }
    this.paused = paused;
  }

  /**
   * Updates the fullscreen state and calls the fullscreen tracking URLs.
   *
   * @param {Boolean} fullscreen - Indicates if the video is in fulscreen mode or not.
   * @emits VASTTracker#fullscreen
   * @emits VASTTracker#exitFullscreen
   */
  setFullscreen(fullscreen) {
    if (this.fullscreen !== fullscreen) {
      this.track(fullscreen ? 'fullscreen' : 'exitFullscreen');
    }
    this.fullscreen = fullscreen;
  }

  /**
   * Updates the expand state and calls the expand/collapse tracking URLs.
   *
   * @param {Boolean} expanded - Indicates if the video is expanded or not.
   * @emits VASTTracker#expand
   * @emits VASTTracker#collapse
   */
  setExpand(expanded) {
    if (this.expanded !== expanded) {
      this.track(expanded ? 'expand' : 'collapse');
    }
    this.expanded = expanded;
  }

  /**
   * Must be called if you want to overwrite the <Linear> Skipoffset value.
   * This will init the skip countdown duration. Then, every time setProgress() is called,
   * it will decrease the countdown and emit a skip-countdown event with the remaining time.
   * Do not call this method if you want to keep the original Skipoffset value.
   *
   * @param {Number} duration - The time in seconds until the skip button is displayed.
   */
  setSkipDelay(duration) {
    if (typeof duration === 'number') {
      this.skipDelay = duration;
    }
  }

  /**
   * Tracks an impression (can be called only once).
   *
   * @emits VASTTracker#creativeView
   */
  trackImpression() {
    if (!this.impressed) {
      this.impressed = true;
      this.trackURLs(this.ad.impressionURLTemplates);
      this.track('creativeView');
    }
  }

  /**
   * Send a request to the URI provided by the VAST <Error> element.
   * If an [ERRORCODE] macro is included, it will be substitute with errorCode.
   *
   * @param {String} errorCode - Replaces [ERRORCODE] macro. [ERRORCODE] values are listed in the VAST specification.
   * @param {Boolean} [isCustomCode=false] - Flag to allow custom values on error code.
   */
  errorWithCode(errorCode, isCustomCode = false) {
    this.trackURLs(
      this.ad.errorURLTemplates,
      { ERRORCODE: errorCode },
      { isCustomCode }
    );
  }

  /**
   * Must be called when the user watched the linear creative until its end.
   * Calls the complete tracking URLs.
   *
   * @emits VASTTracker#complete
   */
  complete() {
    this.track('complete');
  }

  /**
   * Must be called when the player or the window is closed during the ad.
   * Calls the `closeLinear` (in VAST 3.0) and `close` tracking URLs.
   *
   * @emits VASTTracker#closeLinear
   * @emits VASTTracker#close
   */
  close() {
    this.track(this.linear ? 'closeLinear' : 'close');
  }

  /**
   * Must be called when the skip button is clicked. Calls the skip tracking URLs.
   *
   * @emits VASTTracker#skip
   */
  skip() {
    this.track('skip');
  }

  /**
   * Must be called when the user clicks on the creative.
   * It calls the tracking URLs and emits a 'clickthrough' event with the resolved
   * clickthrough URL when done.
   *
   * @param {String} [fallbackClickThroughURL=null] - an optional clickThroughURL template that could be used as a fallback
   * @emits VASTTracker#clickthrough
   */
  click(fallbackClickThroughURL = null) {
    if (
      this.clickTrackingURLTemplates &&
      this.clickTrackingURLTemplates.length
    ) {
      this.trackURLs(this.clickTrackingURLTemplates);
    }

    // Use the provided fallbackClickThroughURL as a fallback
    const clickThroughURLTemplate =
      this.clickThroughURLTemplate || fallbackClickThroughURL;

    if (clickThroughURLTemplate) {
      const variables = this.linear
        ? { CONTENTPLAYHEAD: this.progressFormatted() }
        : {};
      const clickThroughURL = _util_util__WEBPACK_IMPORTED_MODULE_4__["util"].resolveURLTemplates(
        [clickThroughURLTemplate],
        variables
      )[0];

      this.emit('clickthrough', clickThroughURL);
    }
  }

  /**
   * Calls the tracking URLs for the given eventName and emits the event.
   *
   * @param {String} eventName - The name of the event.
   * @param {Boolean} [once=false] - Boolean to define if the event has to be tracked only once.
   */
  track(eventName, once = false) {
    // closeLinear event was introduced in VAST 3.0
    // Fallback to vast 2.0 close event if necessary
    if (
      eventName === 'closeLinear' &&
      !this.trackingEvents[eventName] &&
      this.trackingEvents['close']
    ) {
      eventName = 'close';
    }

    const trackingURLTemplates = this.trackingEvents[eventName];
    const isAlwaysEmitEvent = this.emitAlwaysEvents.indexOf(eventName) > -1;

    if (trackingURLTemplates) {
      this.emit(eventName, '');
      this.trackURLs(trackingURLTemplates);
    } else if (isAlwaysEmitEvent) {
      this.emit(eventName, '');
    }

    if (once) {
      delete this.trackingEvents[eventName];
      if (isAlwaysEmitEvent) {
        this.emitAlwaysEvents.splice(
          this.emitAlwaysEvents.indexOf(eventName),
          1
        );
      }
    }
  }

  /**
   * Calls the tracking urls templates with the given variables.
   *
   * @param {Array} URLTemplates - An array of tracking url templates.
   * @param {Object} [variables={}] - An optional Object of parameters to be used in the tracking calls.
   * @param {Object} [options={}] - An optional Object of options to be used in the tracking calls.
   */
  trackURLs(URLTemplates, variables = {}, options = {}) {
    if (this.linear) {
      if (
        this.creative &&
        this.creative.mediaFiles &&
        this.creative.mediaFiles[0] &&
        this.creative.mediaFiles[0].fileURL
      ) {
        variables['ASSETURI'] = this.creative.mediaFiles[0].fileURL;
      }
      variables['CONTENTPLAYHEAD'] = this.progressFormatted();
    }

    _util_util__WEBPACK_IMPORTED_MODULE_4__["util"].track(URLTemplates, variables, options);
  }

  /**
   * Formats time progress in a readable string.
   *
   * @return {String}
   */
  progressFormatted() {
    const seconds = parseInt(this.progress);
    let h = seconds / (60 * 60);
    if (h.length < 2) {
      h = `0${h}`;
    }
    let m = (seconds / 60) % 60;
    if (m.length < 2) {
      m = `0${m}`;
    }
    let s = seconds % 60;
    if (s.length < 2) {
      s = `0${m}`;
    }
    const ms = parseInt((this.progress - seconds) * 100);
    return `${h}:${m}:${s}.${ms}`;
  }
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFzdC1jbGllbnQvc3JjL2FkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YXN0LWNsaWVudC9zcmMvYWRfZXh0ZW5zaW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YXN0LWNsaWVudC9zcmMvYWRfZXh0ZW5zaW9uX2NoaWxkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YXN0LWNsaWVudC9zcmMvY29tcGFuaW9uX2FkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YXN0LWNsaWVudC9zcmMvY3JlYXRpdmUvY3JlYXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Zhc3QtY2xpZW50L3NyYy9jcmVhdGl2ZS9jcmVhdGl2ZV9jb21wYW5pb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Zhc3QtY2xpZW50L3NyYy9jcmVhdGl2ZS9jcmVhdGl2ZV9saW5lYXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Zhc3QtY2xpZW50L3NyYy9jcmVhdGl2ZS9jcmVhdGl2ZV9ub25fbGluZWFyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YXN0LWNsaWVudC9zcmMvaWNvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFzdC1jbGllbnQvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YXN0LWNsaWVudC9zcmMvbWVkaWFfZmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFzdC1jbGllbnQvc3JjL25vbl9saW5lYXJfYWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Zhc3QtY2xpZW50L3NyYy9wYXJzZXIvYWRfcGFyc2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YXN0LWNsaWVudC9zcmMvcGFyc2VyL2NyZWF0aXZlX2NvbXBhbmlvbl9wYXJzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Zhc3QtY2xpZW50L3NyYy9wYXJzZXIvY3JlYXRpdmVfbGluZWFyX3BhcnNlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFzdC1jbGllbnQvc3JjL3BhcnNlci9jcmVhdGl2ZV9ub25fbGluZWFyX3BhcnNlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFzdC1jbGllbnQvc3JjL3BhcnNlci9wYXJzZXJfdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Zhc3QtY2xpZW50L3NyYy9wYXJzZXIvdmFzdF9wYXJzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Zhc3QtY2xpZW50L3NyYy91cmxfaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFzdC1jbGllbnQvc3JjL3VybGhhbmRsZXJzL2ZsYXNoX3VybF9oYW5kbGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YXN0LWNsaWVudC9zcmMvdXJsaGFuZGxlcnMvbW9ja19ub2RlX3VybF9oYW5kbGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YXN0LWNsaWVudC9zcmMvdXJsaGFuZGxlcnMveGhyX3VybF9oYW5kbGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YXN0LWNsaWVudC9zcmMvdXRpbC9zdG9yYWdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YXN0LWNsaWVudC9zcmMvdXRpbC91dGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YXN0LWNsaWVudC9zcmMvdmFzdF9jbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Zhc3QtY2xpZW50L3NyYy92YXN0X3Jlc3BvbnNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YXN0LWNsaWVudC9zcmMvdmFzdF90cmFja2VyLmpzIl0sIm5h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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLDhCQUE4QiwrQ0FBSTtBQUNsQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLE9BQU8sY0FBYztBQUNsQyxhQUFhLE9BQU8sWUFBWTtBQUNoQztBQUNBLHdDQUF3QyxjQUFjO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSSwrQ0FBSTtBQUNSOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxFQUFFO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLGNBQWMsRUFBRTtBQUNoQjtBQUNBO0FBQ0E7QUFDQSxjQUFjLEVBQUU7QUFDaEI7QUFDQTtBQUNBLGNBQWMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRztBQUNoQztBQUNBIiwiZmlsZSI6InZlbmRvcnN+b3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm9+MzM0YTNmZjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmlkID0gbnVsbDtcbiAgICB0aGlzLnNlcXVlbmNlID0gbnVsbDtcbiAgICB0aGlzLnN5c3RlbSA9IG51bGw7XG4gICAgdGhpcy50aXRsZSA9IG51bGw7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IG51bGw7XG4gICAgdGhpcy5hZHZlcnRpc2VyID0gbnVsbDtcbiAgICB0aGlzLnByaWNpbmcgPSBudWxsO1xuICAgIHRoaXMuc3VydmV5ID0gbnVsbDtcbiAgICB0aGlzLmVycm9yVVJMVGVtcGxhdGVzID0gW107XG4gICAgdGhpcy5pbXByZXNzaW9uVVJMVGVtcGxhdGVzID0gW107XG4gICAgdGhpcy5jcmVhdGl2ZXMgPSBbXTtcbiAgICB0aGlzLmV4dGVuc2lvbnMgPSBbXTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEFkRXh0ZW5zaW9uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5hdHRyaWJ1dGVzID0ge307XG4gICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgQWRFeHRlbnNpb25DaGlsZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubmFtZSA9IG51bGw7XG4gICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgdGhpcy5hdHRyaWJ1dGVzID0ge307XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBDb21wYW5pb25BZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaWQgPSBudWxsO1xuICAgIHRoaXMud2lkdGggPSAwO1xuICAgIHRoaXMuaGVpZ2h0ID0gMDtcbiAgICB0aGlzLnR5cGUgPSBudWxsO1xuICAgIHRoaXMuc3RhdGljUmVzb3VyY2UgPSBudWxsO1xuICAgIHRoaXMuaHRtbFJlc291cmNlID0gbnVsbDtcbiAgICB0aGlzLmlmcmFtZVJlc291cmNlID0gbnVsbDtcbiAgICB0aGlzLmFsdFRleHQgPSBudWxsO1xuICAgIHRoaXMuY29tcGFuaW9uQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUgPSBudWxsO1xuICAgIHRoaXMuY29tcGFuaW9uQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcyA9IFtdO1xuICAgIHRoaXMudHJhY2tpbmdFdmVudHMgPSB7fTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIENyZWF0aXZlIHtcbiAgY29uc3RydWN0b3IoY3JlYXRpdmVBdHRyaWJ1dGVzID0ge30pIHtcbiAgICB0aGlzLmlkID0gY3JlYXRpdmVBdHRyaWJ1dGVzLmlkIHx8IG51bGw7XG4gICAgdGhpcy5hZElkID0gY3JlYXRpdmVBdHRyaWJ1dGVzLmFkSWQgfHwgbnVsbDtcbiAgICB0aGlzLnNlcXVlbmNlID0gY3JlYXRpdmVBdHRyaWJ1dGVzLnNlcXVlbmNlIHx8IG51bGw7XG4gICAgdGhpcy5hcGlGcmFtZXdvcmsgPSBjcmVhdGl2ZUF0dHJpYnV0ZXMuYXBpRnJhbWV3b3JrIHx8IG51bGw7XG4gICAgdGhpcy50cmFja2luZ0V2ZW50cyA9IHt9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBDcmVhdGl2ZSB9IGZyb20gJy4vY3JlYXRpdmUnO1xuXG5leHBvcnQgY2xhc3MgQ3JlYXRpdmVDb21wYW5pb24gZXh0ZW5kcyBDcmVhdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKGNyZWF0aXZlQXR0cmlidXRlcyA9IHt9KSB7XG4gICAgc3VwZXIoY3JlYXRpdmVBdHRyaWJ1dGVzKTtcblxuICAgIHRoaXMudHlwZSA9ICdjb21wYW5pb24nO1xuICAgIHRoaXMudmFyaWF0aW9ucyA9IFtdO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDcmVhdGl2ZSB9IGZyb20gJy4vY3JlYXRpdmUnO1xuXG5leHBvcnQgY2xhc3MgQ3JlYXRpdmVMaW5lYXIgZXh0ZW5kcyBDcmVhdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKGNyZWF0aXZlQXR0cmlidXRlcyA9IHt9KSB7XG4gICAgc3VwZXIoY3JlYXRpdmVBdHRyaWJ1dGVzKTtcblxuICAgIHRoaXMudHlwZSA9ICdsaW5lYXInO1xuICAgIHRoaXMuZHVyYXRpb24gPSAwO1xuICAgIHRoaXMuc2tpcERlbGF5ID0gbnVsbDtcbiAgICB0aGlzLm1lZGlhRmlsZXMgPSBbXTtcbiAgICB0aGlzLnZpZGVvQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUgPSBudWxsO1xuICAgIHRoaXMudmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzID0gW107XG4gICAgdGhpcy52aWRlb0N1c3RvbUNsaWNrVVJMVGVtcGxhdGVzID0gW107XG4gICAgdGhpcy5hZFBhcmFtZXRlcnMgPSBudWxsO1xuICAgIHRoaXMuaWNvbnMgPSBbXTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ3JlYXRpdmUgfSBmcm9tICcuL2NyZWF0aXZlJztcblxuZXhwb3J0IGNsYXNzIENyZWF0aXZlTm9uTGluZWFyIGV4dGVuZHMgQ3JlYXRpdmUge1xuICBjb25zdHJ1Y3RvcihjcmVhdGl2ZUF0dHJpYnV0ZXMgPSB7fSkge1xuICAgIHN1cGVyKGNyZWF0aXZlQXR0cmlidXRlcyk7XG5cbiAgICB0aGlzLnR5cGUgPSAnbm9ubGluZWFyJztcbiAgICB0aGlzLnZhcmlhdGlvbnMgPSBbXTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEljb24ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnByb2dyYW0gPSBudWxsO1xuICAgIHRoaXMuaGVpZ2h0ID0gMDtcbiAgICB0aGlzLndpZHRoID0gMDtcbiAgICB0aGlzLnhQb3NpdGlvbiA9IDA7XG4gICAgdGhpcy55UG9zaXRpb24gPSAwO1xuICAgIHRoaXMuYXBpRnJhbWV3b3JrID0gbnVsbDtcbiAgICB0aGlzLm9mZnNldCA9IG51bGw7XG4gICAgdGhpcy5kdXJhdGlvbiA9IDA7XG4gICAgdGhpcy50eXBlID0gbnVsbDtcbiAgICB0aGlzLnN0YXRpY1Jlc291cmNlID0gbnVsbDtcbiAgICB0aGlzLmh0bWxSZXNvdXJjZSA9IG51bGw7XG4gICAgdGhpcy5pZnJhbWVSZXNvdXJjZSA9IG51bGw7XG4gICAgdGhpcy5pY29uQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUgPSBudWxsO1xuICAgIHRoaXMuaWNvbkNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMgPSBbXTtcbiAgICB0aGlzLmljb25WaWV3VHJhY2tpbmdVUkxUZW1wbGF0ZSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7IFZBU1RQYXJzZXIgfSBmcm9tICcuL3BhcnNlci92YXN0X3BhcnNlci5qcyc7XG5pbXBvcnQgeyBWQVNUQ2xpZW50IH0gZnJvbSAnLi92YXN0X2NsaWVudC5qcyc7XG5pbXBvcnQgeyBWQVNUVHJhY2tlciB9IGZyb20gJy4vdmFzdF90cmFja2VyLmpzJztcblxuZXhwb3J0IHsgVkFTVENsaWVudCwgVkFTVFBhcnNlciwgVkFTVFRyYWNrZXIgfTtcbiIsImV4cG9ydCBjbGFzcyBNZWRpYUZpbGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmlkID0gbnVsbDtcbiAgICB0aGlzLmZpbGVVUkwgPSBudWxsO1xuICAgIHRoaXMuZGVsaXZlcnlUeXBlID0gJ3Byb2dyZXNzaXZlJztcbiAgICB0aGlzLm1pbWVUeXBlID0gbnVsbDtcbiAgICB0aGlzLmNvZGVjID0gbnVsbDtcbiAgICB0aGlzLmJpdHJhdGUgPSAwO1xuICAgIHRoaXMubWluQml0cmF0ZSA9IDA7XG4gICAgdGhpcy5tYXhCaXRyYXRlID0gMDtcbiAgICB0aGlzLndpZHRoID0gMDtcbiAgICB0aGlzLmhlaWdodCA9IDA7XG4gICAgdGhpcy5hcGlGcmFtZXdvcmsgPSBudWxsO1xuICAgIHRoaXMuc2NhbGFibGUgPSBudWxsO1xuICAgIHRoaXMubWFpbnRhaW5Bc3BlY3RSYXRpbyA9IG51bGw7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBOb25MaW5lYXJBZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaWQgPSBudWxsO1xuICAgIHRoaXMud2lkdGggPSAwO1xuICAgIHRoaXMuaGVpZ2h0ID0gMDtcbiAgICB0aGlzLmV4cGFuZGVkV2lkdGggPSAwO1xuICAgIHRoaXMuZXhwYW5kZWRIZWlnaHQgPSAwO1xuICAgIHRoaXMuc2NhbGFibGUgPSB0cnVlO1xuICAgIHRoaXMubWFpbnRhaW5Bc3BlY3RSYXRpbyA9IHRydWU7XG4gICAgdGhpcy5taW5TdWdnZXN0ZWREdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5hcGlGcmFtZXdvcmsgPSAnc3RhdGljJztcbiAgICB0aGlzLnR5cGUgPSBudWxsO1xuICAgIHRoaXMuc3RhdGljUmVzb3VyY2UgPSBudWxsO1xuICAgIHRoaXMuaHRtbFJlc291cmNlID0gbnVsbDtcbiAgICB0aGlzLmlmcmFtZVJlc291cmNlID0gbnVsbDtcbiAgICB0aGlzLm5vbmxpbmVhckNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlID0gbnVsbDtcbiAgICB0aGlzLm5vbmxpbmVhckNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMgPSBbXTtcbiAgICB0aGlzLmFkUGFyYW1ldGVycyA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7IEFkIH0gZnJvbSAnLi4vYWQnO1xuaW1wb3J0IHsgQWRFeHRlbnNpb24gfSBmcm9tICcuLi9hZF9leHRlbnNpb24nO1xuaW1wb3J0IHsgQWRFeHRlbnNpb25DaGlsZCB9IGZyb20gJy4uL2FkX2V4dGVuc2lvbl9jaGlsZCc7XG5pbXBvcnQgeyBwYXJzZUNyZWF0aXZlQ29tcGFuaW9uIH0gZnJvbSAnLi9jcmVhdGl2ZV9jb21wYW5pb25fcGFyc2VyJztcbmltcG9ydCB7IHBhcnNlQ3JlYXRpdmVMaW5lYXIgfSBmcm9tICcuL2NyZWF0aXZlX2xpbmVhcl9wYXJzZXInO1xuaW1wb3J0IHsgcGFyc2VDcmVhdGl2ZU5vbkxpbmVhciB9IGZyb20gJy4vY3JlYXRpdmVfbm9uX2xpbmVhcl9wYXJzZXInO1xuaW1wb3J0IHsgcGFyc2VyVXRpbHMgfSBmcm9tICcuL3BhcnNlcl91dGlscyc7XG5cbi8qKlxuICogVGhpcyBtb2R1bGUgcHJvdmlkZXMgbWV0aG9kcyB0byBwYXJzZSBhIFZBU1QgQWQgRWxlbWVudC5cbiAqL1xuXG4vKipcbiAqIFBhcnNlcyBhbiBBZCBlbGVtZW50IChjYW4gZWl0aGVyIGJlIGEgV3JhcHBlciBvciBhbiBJbkxpbmUpLlxuICogQHBhcmFtICB7T2JqZWN0fSBhZEVsZW1lbnQgLSBUaGUgVkFTVCBBZCBlbGVtZW50IHRvIHBhcnNlLlxuICogQHJldHVybiB7QWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUFkKGFkRWxlbWVudCkge1xuICBjb25zdCBjaGlsZE5vZGVzID0gYWRFbGVtZW50LmNoaWxkTm9kZXM7XG5cbiAgZm9yIChjb25zdCBhZFR5cGVFbGVtZW50S2V5IGluIGNoaWxkTm9kZXMpIHtcbiAgICBjb25zdCBhZFR5cGVFbGVtZW50ID0gY2hpbGROb2Rlc1thZFR5cGVFbGVtZW50S2V5XTtcblxuICAgIGlmIChbJ1dyYXBwZXInLCAnSW5MaW5lJ10uaW5kZXhPZihhZFR5cGVFbGVtZW50Lm5vZGVOYW1lKSA9PT0gLTEpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHBhcnNlclV0aWxzLmNvcHlOb2RlQXR0cmlidXRlKCdpZCcsIGFkRWxlbWVudCwgYWRUeXBlRWxlbWVudCk7XG4gICAgcGFyc2VyVXRpbHMuY29weU5vZGVBdHRyaWJ1dGUoJ3NlcXVlbmNlJywgYWRFbGVtZW50LCBhZFR5cGVFbGVtZW50KTtcblxuICAgIGlmIChhZFR5cGVFbGVtZW50Lm5vZGVOYW1lID09PSAnV3JhcHBlcicpIHtcbiAgICAgIHJldHVybiBwYXJzZVdyYXBwZXIoYWRUeXBlRWxlbWVudCk7XG4gICAgfSBlbHNlIGlmIChhZFR5cGVFbGVtZW50Lm5vZGVOYW1lID09PSAnSW5MaW5lJykge1xuICAgICAgcmV0dXJuIHBhcnNlSW5MaW5lKGFkVHlwZUVsZW1lbnQpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFBhcnNlcyBhbiBJbmxpbmUgZWxlbWVudC5cbiAqIEBwYXJhbSAge09iamVjdH0gaW5MaW5lRWxlbWVudCAtIFRoZSBWQVNUIElubGluZSBlbGVtZW50IHRvIHBhcnNlLlxuICogQHJldHVybiB7QWR9XG4gKi9cbmZ1bmN0aW9uIHBhcnNlSW5MaW5lKGluTGluZUVsZW1lbnQpIHtcbiAgY29uc3QgY2hpbGROb2RlcyA9IGluTGluZUVsZW1lbnQuY2hpbGROb2RlcztcbiAgY29uc3QgYWQgPSBuZXcgQWQoKTtcbiAgYWQuaWQgPSBpbkxpbmVFbGVtZW50LmdldEF0dHJpYnV0ZSgnaWQnKSB8fCBudWxsO1xuICBhZC5zZXF1ZW5jZSA9IGluTGluZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzZXF1ZW5jZScpIHx8IG51bGw7XG5cbiAgZm9yIChjb25zdCBub2RlS2V5IGluIGNoaWxkTm9kZXMpIHtcbiAgICBjb25zdCBub2RlID0gY2hpbGROb2Rlc1tub2RlS2V5XTtcblxuICAgIHN3aXRjaCAobm9kZS5ub2RlTmFtZSkge1xuICAgICAgY2FzZSAnRXJyb3InOlxuICAgICAgICBhZC5lcnJvclVSTFRlbXBsYXRlcy5wdXNoKHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQobm9kZSkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnSW1wcmVzc2lvbic6XG4gICAgICAgIGFkLmltcHJlc3Npb25VUkxUZW1wbGF0ZXMucHVzaChwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KG5vZGUpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ0NyZWF0aXZlcyc6XG4gICAgICAgIHBhcnNlclV0aWxzXG4gICAgICAgICAgLmNoaWxkcmVuQnlOYW1lKG5vZGUsICdDcmVhdGl2ZScpXG4gICAgICAgICAgLmZvckVhY2goY3JlYXRpdmVFbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0aXZlQXR0cmlidXRlcyA9IHtcbiAgICAgICAgICAgICAgaWQ6IGNyZWF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2lkJykgfHwgbnVsbCxcbiAgICAgICAgICAgICAgYWRJZDogcGFyc2VDcmVhdGl2ZUFkSWRBdHRyaWJ1dGUoY3JlYXRpdmVFbGVtZW50KSxcbiAgICAgICAgICAgICAgc2VxdWVuY2U6IGNyZWF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3NlcXVlbmNlJykgfHwgbnVsbCxcbiAgICAgICAgICAgICAgYXBpRnJhbWV3b3JrOiBjcmVhdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhcGlGcmFtZXdvcmsnKSB8fCBudWxsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNyZWF0aXZlVHlwZUVsZW1lbnRLZXkgaW4gY3JlYXRpdmVFbGVtZW50LmNoaWxkTm9kZXMpIHtcbiAgICAgICAgICAgICAgY29uc3QgY3JlYXRpdmVUeXBlRWxlbWVudCA9XG4gICAgICAgICAgICAgICAgY3JlYXRpdmVFbGVtZW50LmNoaWxkTm9kZXNbY3JlYXRpdmVUeXBlRWxlbWVudEtleV07XG4gICAgICAgICAgICAgIGxldCBwYXJzZWRDcmVhdGl2ZTtcblxuICAgICAgICAgICAgICBzd2l0Y2ggKGNyZWF0aXZlVHlwZUVsZW1lbnQubm9kZU5hbWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdMaW5lYXInOlxuICAgICAgICAgICAgICAgICAgcGFyc2VkQ3JlYXRpdmUgPSBwYXJzZUNyZWF0aXZlTGluZWFyKFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGl2ZVR5cGVFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGl2ZUF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICBpZiAocGFyc2VkQ3JlYXRpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgYWQuY3JlYXRpdmVzLnB1c2gocGFyc2VkQ3JlYXRpdmUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnTm9uTGluZWFyQWRzJzpcbiAgICAgICAgICAgICAgICAgIHBhcnNlZENyZWF0aXZlID0gcGFyc2VDcmVhdGl2ZU5vbkxpbmVhcihcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRpdmVUeXBlRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRpdmVBdHRyaWJ1dGVzXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlZENyZWF0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkLmNyZWF0aXZlcy5wdXNoKHBhcnNlZENyZWF0aXZlKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0NvbXBhbmlvbkFkcyc6XG4gICAgICAgICAgICAgICAgICBwYXJzZWRDcmVhdGl2ZSA9IHBhcnNlQ3JlYXRpdmVDb21wYW5pb24oXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0aXZlVHlwZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0aXZlQXR0cmlidXRlc1xuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIGlmIChwYXJzZWRDcmVhdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBhZC5jcmVhdGl2ZXMucHVzaChwYXJzZWRDcmVhdGl2ZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnRXh0ZW5zaW9ucyc6XG4gICAgICAgIHBhcnNlRXh0ZW5zaW9ucyhcbiAgICAgICAgICBhZC5leHRlbnNpb25zLFxuICAgICAgICAgIHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKG5vZGUsICdFeHRlbnNpb24nKVxuICAgICAgICApO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnQWRTeXN0ZW0nOlxuICAgICAgICBhZC5zeXN0ZW0gPSB7XG4gICAgICAgICAgdmFsdWU6IHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQobm9kZSksXG4gICAgICAgICAgdmVyc2lvbjogbm9kZS5nZXRBdHRyaWJ1dGUoJ3ZlcnNpb24nKSB8fCBudWxsXG4gICAgICAgIH07XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdBZFRpdGxlJzpcbiAgICAgICAgYWQudGl0bGUgPSBwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KG5vZGUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnRGVzY3JpcHRpb24nOlxuICAgICAgICBhZC5kZXNjcmlwdGlvbiA9IHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQobm9kZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdBZHZlcnRpc2VyJzpcbiAgICAgICAgYWQuYWR2ZXJ0aXNlciA9IHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQobm9kZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdQcmljaW5nJzpcbiAgICAgICAgYWQucHJpY2luZyA9IHtcbiAgICAgICAgICB2YWx1ZTogcGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChub2RlKSxcbiAgICAgICAgICBtb2RlbDogbm9kZS5nZXRBdHRyaWJ1dGUoJ21vZGVsJykgfHwgbnVsbCxcbiAgICAgICAgICBjdXJyZW5jeTogbm9kZS5nZXRBdHRyaWJ1dGUoJ2N1cnJlbmN5JykgfHwgbnVsbFxuICAgICAgICB9O1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnU3VydmV5JzpcbiAgICAgICAgYWQuc3VydmV5ID0gcGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChub2RlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGFkO1xufVxuXG4vKipcbiAqIFBhcnNlcyBhIFdyYXBwZXIgZWxlbWVudCB3aXRob3V0IHJlc29sdmluZyB0aGUgd3JhcHBlZCB1cmxzLlxuICogQHBhcmFtICB7T2JqZWN0fSB3cmFwcGVyRWxlbWVudCAtIFRoZSBWQVNUIFdyYXBwZXIgZWxlbWVudCB0byBiZSBwYXJzZWQuXG4gKiBAcmV0dXJuIHtBZH1cbiAqL1xuZnVuY3Rpb24gcGFyc2VXcmFwcGVyKHdyYXBwZXJFbGVtZW50KSB7XG4gIGNvbnN0IGFkID0gcGFyc2VJbkxpbmUod3JhcHBlckVsZW1lbnQpO1xuICBsZXQgd3JhcHBlclVSTEVsZW1lbnQgPSBwYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShcbiAgICB3cmFwcGVyRWxlbWVudCxcbiAgICAnVkFTVEFkVGFnVVJJJ1xuICApO1xuXG4gIGlmICh3cmFwcGVyVVJMRWxlbWVudCkge1xuICAgIGFkLm5leHRXcmFwcGVyVVJMID0gcGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dCh3cmFwcGVyVVJMRWxlbWVudCk7XG4gIH0gZWxzZSB7XG4gICAgd3JhcHBlclVSTEVsZW1lbnQgPSBwYXJzZXJVdGlscy5jaGlsZEJ5TmFtZSh3cmFwcGVyRWxlbWVudCwgJ1ZBU1RBZFRhZ1VSTCcpO1xuXG4gICAgaWYgKHdyYXBwZXJVUkxFbGVtZW50KSB7XG4gICAgICBhZC5uZXh0V3JhcHBlclVSTCA9IHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoXG4gICAgICAgIHBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKHdyYXBwZXJVUkxFbGVtZW50LCAnVVJMJylcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgYWQuY3JlYXRpdmVzLmZvckVhY2god3JhcHBlckNyZWF0aXZlRWxlbWVudCA9PiB7XG4gICAgaWYgKFsnbGluZWFyJywgJ25vbmxpbmVhciddLmluZGV4T2Yod3JhcHBlckNyZWF0aXZlRWxlbWVudC50eXBlKSAhPT0gLTEpIHtcbiAgICAgIC8vIFRyYWNraW5nRXZlbnRzIExpbmVhciAvIE5vbkxpbmVhclxuICAgICAgaWYgKHdyYXBwZXJDcmVhdGl2ZUVsZW1lbnQudHJhY2tpbmdFdmVudHMpIHtcbiAgICAgICAgaWYgKCFhZC50cmFja2luZ0V2ZW50cykge1xuICAgICAgICAgIGFkLnRyYWNraW5nRXZlbnRzID0ge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhZC50cmFja2luZ0V2ZW50c1t3cmFwcGVyQ3JlYXRpdmVFbGVtZW50LnR5cGVdKSB7XG4gICAgICAgICAgYWQudHJhY2tpbmdFdmVudHNbd3JhcHBlckNyZWF0aXZlRWxlbWVudC50eXBlXSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgZXZlbnROYW1lIGluIHdyYXBwZXJDcmVhdGl2ZUVsZW1lbnQudHJhY2tpbmdFdmVudHMpIHtcbiAgICAgICAgICBjb25zdCB1cmxzID0gd3JhcHBlckNyZWF0aXZlRWxlbWVudC50cmFja2luZ0V2ZW50c1tldmVudE5hbWVdO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICFBcnJheS5pc0FycmF5KFxuICAgICAgICAgICAgICBhZC50cmFja2luZ0V2ZW50c1t3cmFwcGVyQ3JlYXRpdmVFbGVtZW50LnR5cGVdW2V2ZW50TmFtZV1cbiAgICAgICAgICAgIClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGFkLnRyYWNraW5nRXZlbnRzW3dyYXBwZXJDcmVhdGl2ZUVsZW1lbnQudHlwZV1bZXZlbnROYW1lXSA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICB1cmxzLmZvckVhY2godXJsID0+IHtcbiAgICAgICAgICAgIGFkLnRyYWNraW5nRXZlbnRzW3dyYXBwZXJDcmVhdGl2ZUVsZW1lbnQudHlwZV1bZXZlbnROYW1lXS5wdXNoKHVybCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIENsaWNrVHJhY2tpbmdcbiAgICAgIGlmICh3cmFwcGVyQ3JlYXRpdmVFbGVtZW50LnZpZGVvQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcykge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoYWQudmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzKSkge1xuICAgICAgICAgIGFkLnZpZGVvQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcyA9IFtdO1xuICAgICAgICB9IC8vIHRtcCBwcm9wZXJ0eSB0byBzYXZlIHdyYXBwZXIgdHJhY2tpbmcgVVJMcyB1bnRpbCB0aGV5IGFyZSBtZXJnZWRcbiAgICAgICAgd3JhcHBlckNyZWF0aXZlRWxlbWVudC52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICBhZC52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMucHVzaChpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICAvLyBDbGlja1Rocm91Z2hcbiAgICAgIGlmICh3cmFwcGVyQ3JlYXRpdmVFbGVtZW50LnZpZGVvQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUpIHtcbiAgICAgICAgYWQudmlkZW9DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZSA9XG4gICAgICAgICAgd3JhcHBlckNyZWF0aXZlRWxlbWVudC52aWRlb0NsaWNrVGhyb3VnaFVSTFRlbXBsYXRlO1xuICAgICAgfVxuICAgICAgLy8gQ3VzdG9tQ2xpY2tcbiAgICAgIGlmICh3cmFwcGVyQ3JlYXRpdmVFbGVtZW50LnZpZGVvQ3VzdG9tQ2xpY2tVUkxUZW1wbGF0ZXMpIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGFkLnZpZGVvQ3VzdG9tQ2xpY2tVUkxUZW1wbGF0ZXMpKSB7XG4gICAgICAgICAgYWQudmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlcyA9IFtdO1xuICAgICAgICB9IC8vIHRtcCBwcm9wZXJ0eSB0byBzYXZlIHdyYXBwZXIgdHJhY2tpbmcgVVJMcyB1bnRpbCB0aGV5IGFyZSBtZXJnZWRcbiAgICAgICAgd3JhcHBlckNyZWF0aXZlRWxlbWVudC52aWRlb0N1c3RvbUNsaWNrVVJMVGVtcGxhdGVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgYWQudmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlcy5wdXNoKGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGlmIChhZC5uZXh0V3JhcHBlclVSTCkge1xuICAgIHJldHVybiBhZDtcbiAgfVxufVxuXG4vKipcbiAqIFBhcnNlcyBhbiBhcnJheSBvZiBFeHRlbnNpb24gZWxlbWVudHMuXG4gKiBAcGFyYW0gIHtBcnJheX0gY29sbGVjdGlvbiAtIFRoZSBhcnJheSB1c2VkIHRvIHN0b3JlIHRoZSBwYXJzZWQgZXh0ZW5zaW9ucy5cbiAqIEBwYXJhbSAge0FycmF5fSBleHRlbnNpb25zIC0gVGhlIGFycmF5IG9mIGV4dGVuc2lvbnMgdG8gcGFyc2UuXG4gKi9cbmZ1bmN0aW9uIHBhcnNlRXh0ZW5zaW9ucyhjb2xsZWN0aW9uLCBleHRlbnNpb25zKSB7XG4gIGV4dGVuc2lvbnMuZm9yRWFjaChleHROb2RlID0+IHtcbiAgICBjb25zdCBleHQgPSBuZXcgQWRFeHRlbnNpb24oKTtcbiAgICBjb25zdCBleHROb2RlQXR0cnMgPSBleHROb2RlLmF0dHJpYnV0ZXM7XG4gICAgY29uc3QgY2hpbGROb2RlcyA9IGV4dE5vZGUuY2hpbGROb2RlcztcblxuICAgIGlmIChleHROb2RlLmF0dHJpYnV0ZXMpIHtcbiAgICAgIGZvciAoY29uc3QgZXh0Tm9kZUF0dHJLZXkgaW4gZXh0Tm9kZUF0dHJzKSB7XG4gICAgICAgIGNvbnN0IGV4dE5vZGVBdHRyID0gZXh0Tm9kZUF0dHJzW2V4dE5vZGVBdHRyS2V5XTtcblxuICAgICAgICBpZiAoZXh0Tm9kZUF0dHIubm9kZU5hbWUgJiYgZXh0Tm9kZUF0dHIubm9kZVZhbHVlKSB7XG4gICAgICAgICAgZXh0LmF0dHJpYnV0ZXNbZXh0Tm9kZUF0dHIubm9kZU5hbWVdID0gZXh0Tm9kZUF0dHIubm9kZVZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBjaGlsZE5vZGVLZXkgaW4gY2hpbGROb2Rlcykge1xuICAgICAgY29uc3QgY2hpbGROb2RlID0gY2hpbGROb2Rlc1tjaGlsZE5vZGVLZXldO1xuICAgICAgY29uc3QgdHh0ID0gcGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChjaGlsZE5vZGUpO1xuXG4gICAgICAvLyBpZ25vcmUgY29tbWVudHMgLyBlbXB0eSB2YWx1ZVxuICAgICAgaWYgKGNoaWxkTm9kZS5ub2RlTmFtZSAhPT0gJyNjb21tZW50JyAmJiB0eHQgIT09ICcnKSB7XG4gICAgICAgIGNvbnN0IGV4dENoaWxkID0gbmV3IEFkRXh0ZW5zaW9uQ2hpbGQoKTtcbiAgICAgICAgZXh0Q2hpbGQubmFtZSA9IGNoaWxkTm9kZS5ub2RlTmFtZTtcbiAgICAgICAgZXh0Q2hpbGQudmFsdWUgPSB0eHQ7XG5cbiAgICAgICAgaWYgKGNoaWxkTm9kZS5hdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgY29uc3QgY2hpbGROb2RlQXR0cmlidXRlcyA9IGNoaWxkTm9kZS5hdHRyaWJ1dGVzO1xuXG4gICAgICAgICAgZm9yIChjb25zdCBleHRDaGlsZE5vZGVBdHRyS2V5IGluIGNoaWxkTm9kZUF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4dENoaWxkTm9kZUF0dHIgPSBjaGlsZE5vZGVBdHRyaWJ1dGVzW2V4dENoaWxkTm9kZUF0dHJLZXldO1xuXG4gICAgICAgICAgICBleHRDaGlsZC5hdHRyaWJ1dGVzW2V4dENoaWxkTm9kZUF0dHIubm9kZU5hbWVdID1cbiAgICAgICAgICAgICAgZXh0Q2hpbGROb2RlQXR0ci5ub2RlVmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXh0LmNoaWxkcmVuLnB1c2goZXh0Q2hpbGQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbGxlY3Rpb24ucHVzaChleHQpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBQYXJzZXMgdGhlIGNyZWF0aXZlIGFkSWQgQXR0cmlidXRlLlxuICogQHBhcmFtICB7YW55fSBjcmVhdGl2ZUVsZW1lbnQgLSBUaGUgY3JlYXRpdmUgZWxlbWVudCB0byByZXRyaWV2ZSB0aGUgYWRJZCBmcm9tLlxuICogQHJldHVybiB7U3RyaW5nfG51bGx9XG4gKi9cbmZ1bmN0aW9uIHBhcnNlQ3JlYXRpdmVBZElkQXR0cmlidXRlKGNyZWF0aXZlRWxlbWVudCkge1xuICByZXR1cm4gKFxuICAgIGNyZWF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ0FkSUQnKSB8fCAvLyBWQVNUIDIgc3BlY1xuICAgIGNyZWF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2FkSUQnKSB8fCAvLyBWQVNUIDMgc3BlY1xuICAgIGNyZWF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2FkSWQnKSB8fCAvLyBWQVNUIDQgc3BlY1xuICAgIG51bGxcbiAgKTtcbn1cbiIsImltcG9ydCB7IENvbXBhbmlvbkFkIH0gZnJvbSAnLi4vY29tcGFuaW9uX2FkJztcbmltcG9ydCB7IENyZWF0aXZlQ29tcGFuaW9uIH0gZnJvbSAnLi4vY3JlYXRpdmUvY3JlYXRpdmVfY29tcGFuaW9uJztcbmltcG9ydCB7IHBhcnNlclV0aWxzIH0gZnJvbSAnLi9wYXJzZXJfdXRpbHMnO1xuXG4vKipcbiAqIFRoaXMgbW9kdWxlIHByb3ZpZGVzIG1ldGhvZHMgdG8gcGFyc2UgYSBWQVNUIENvbXBhbmlvbkFkIEVsZW1lbnQuXG4gKi9cblxuLyoqXG4gKiBQYXJzZXMgYSBDb21wYW5pb25BZC5cbiAqIEBwYXJhbSAge09iamVjdH0gY3JlYXRpdmVFbGVtZW50IC0gVGhlIFZBU1QgQ29tcGFuaW9uQWQgZWxlbWVudCB0byBwYXJzZS5cbiAqIEBwYXJhbSAge09iamVjdH0gY3JlYXRpdmVBdHRyaWJ1dGVzIC0gVGhlIGF0dHJpYnV0ZXMgb2YgdGhlIENvbXBhbmlvbkFkIChvcHRpb25hbCkuXG4gKiBAcmV0dXJuIHtDcmVhdGl2ZUNvbXBhbmlvbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ3JlYXRpdmVDb21wYW5pb24oY3JlYXRpdmVFbGVtZW50LCBjcmVhdGl2ZUF0dHJpYnV0ZXMpIHtcbiAgY29uc3QgY3JlYXRpdmUgPSBuZXcgQ3JlYXRpdmVDb21wYW5pb24oY3JlYXRpdmVBdHRyaWJ1dGVzKTtcblxuICBwYXJzZXJVdGlsc1xuICAgIC5jaGlsZHJlbkJ5TmFtZShjcmVhdGl2ZUVsZW1lbnQsICdDb21wYW5pb24nKVxuICAgIC5mb3JFYWNoKGNvbXBhbmlvblJlc291cmNlID0+IHtcbiAgICAgIGNvbnN0IGNvbXBhbmlvbkFkID0gbmV3IENvbXBhbmlvbkFkKCk7XG4gICAgICBjb21wYW5pb25BZC5pZCA9IGNvbXBhbmlvblJlc291cmNlLmdldEF0dHJpYnV0ZSgnaWQnKSB8fCBudWxsO1xuICAgICAgY29tcGFuaW9uQWQud2lkdGggPSBjb21wYW5pb25SZXNvdXJjZS5nZXRBdHRyaWJ1dGUoJ3dpZHRoJyk7XG4gICAgICBjb21wYW5pb25BZC5oZWlnaHQgPSBjb21wYW5pb25SZXNvdXJjZS5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpO1xuICAgICAgY29tcGFuaW9uQWQuY29tcGFuaW9uQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcyA9IFtdO1xuXG4gICAgICBwYXJzZXJVdGlsc1xuICAgICAgICAuY2hpbGRyZW5CeU5hbWUoY29tcGFuaW9uUmVzb3VyY2UsICdIVE1MUmVzb3VyY2UnKVxuICAgICAgICAuZm9yRWFjaChodG1sRWxlbWVudCA9PiB7XG4gICAgICAgICAgY29tcGFuaW9uQWQudHlwZSA9XG4gICAgICAgICAgICBodG1sRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2NyZWF0aXZlVHlwZScpIHx8ICd0ZXh0L2h0bWwnO1xuICAgICAgICAgIGNvbXBhbmlvbkFkLmh0bWxSZXNvdXJjZSA9IHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoaHRtbEVsZW1lbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgcGFyc2VyVXRpbHNcbiAgICAgICAgLmNoaWxkcmVuQnlOYW1lKGNvbXBhbmlvblJlc291cmNlLCAnSUZyYW1lUmVzb3VyY2UnKVxuICAgICAgICAuZm9yRWFjaChpZnJhbWVFbGVtZW50ID0+IHtcbiAgICAgICAgICBjb21wYW5pb25BZC50eXBlID0gaWZyYW1lRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2NyZWF0aXZlVHlwZScpIHx8IDA7XG4gICAgICAgICAgY29tcGFuaW9uQWQuaWZyYW1lUmVzb3VyY2UgPSBwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGlmcmFtZUVsZW1lbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgcGFyc2VyVXRpbHNcbiAgICAgICAgLmNoaWxkcmVuQnlOYW1lKGNvbXBhbmlvblJlc291cmNlLCAnU3RhdGljUmVzb3VyY2UnKVxuICAgICAgICAuZm9yRWFjaChzdGF0aWNFbGVtZW50ID0+IHtcbiAgICAgICAgICBjb21wYW5pb25BZC50eXBlID0gc3RhdGljRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2NyZWF0aXZlVHlwZScpIHx8IDA7XG5cbiAgICAgICAgICBwYXJzZXJVdGlsc1xuICAgICAgICAgICAgLmNoaWxkcmVuQnlOYW1lKGNvbXBhbmlvblJlc291cmNlLCAnQWx0VGV4dCcpXG4gICAgICAgICAgICAuZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgIGNvbXBhbmlvbkFkLmFsdFRleHQgPSBwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGNoaWxkKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY29tcGFuaW9uQWQuc3RhdGljUmVzb3VyY2UgPSBwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KHN0YXRpY0VsZW1lbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgcGFyc2VyVXRpbHNcbiAgICAgICAgLmNoaWxkcmVuQnlOYW1lKGNvbXBhbmlvblJlc291cmNlLCAnVHJhY2tpbmdFdmVudHMnKVxuICAgICAgICAuZm9yRWFjaCh0cmFja2luZ0V2ZW50c0VsZW1lbnQgPT4ge1xuICAgICAgICAgIHBhcnNlclV0aWxzXG4gICAgICAgICAgICAuY2hpbGRyZW5CeU5hbWUodHJhY2tpbmdFdmVudHNFbGVtZW50LCAnVHJhY2tpbmcnKVxuICAgICAgICAgICAgLmZvckVhY2godHJhY2tpbmdFbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgZXZlbnROYW1lID0gdHJhY2tpbmdFbGVtZW50LmdldEF0dHJpYnV0ZSgnZXZlbnQnKTtcbiAgICAgICAgICAgICAgY29uc3QgdHJhY2tpbmdVUkxUZW1wbGF0ZSA9IHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoXG4gICAgICAgICAgICAgICAgdHJhY2tpbmdFbGVtZW50XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlmIChldmVudE5hbWUgJiYgdHJhY2tpbmdVUkxUZW1wbGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjb21wYW5pb25BZC50cmFja2luZ0V2ZW50c1tldmVudE5hbWVdKSkge1xuICAgICAgICAgICAgICAgICAgY29tcGFuaW9uQWQudHJhY2tpbmdFdmVudHNbZXZlbnROYW1lXSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb21wYW5pb25BZC50cmFja2luZ0V2ZW50c1tldmVudE5hbWVdLnB1c2godHJhY2tpbmdVUkxUZW1wbGF0ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgcGFyc2VyVXRpbHNcbiAgICAgICAgLmNoaWxkcmVuQnlOYW1lKGNvbXBhbmlvblJlc291cmNlLCAnQ29tcGFuaW9uQ2xpY2tUcmFja2luZycpXG4gICAgICAgIC5mb3JFYWNoKGNsaWNrVHJhY2tpbmdFbGVtZW50ID0+IHtcbiAgICAgICAgICBjb21wYW5pb25BZC5jb21wYW5pb25DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzLnB1c2goXG4gICAgICAgICAgICBwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGNsaWNrVHJhY2tpbmdFbGVtZW50KVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICBjb21wYW5pb25BZC5jb21wYW5pb25DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZSA9IHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoXG4gICAgICAgIHBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKGNvbXBhbmlvblJlc291cmNlLCAnQ29tcGFuaW9uQ2xpY2tUaHJvdWdoJylcbiAgICAgICk7XG4gICAgICBjb21wYW5pb25BZC5jb21wYW5pb25DbGlja1RyYWNraW5nVVJMVGVtcGxhdGUgPSBwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KFxuICAgICAgICBwYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShjb21wYW5pb25SZXNvdXJjZSwgJ0NvbXBhbmlvbkNsaWNrVHJhY2tpbmcnKVxuICAgICAgKTtcbiAgICAgIGNyZWF0aXZlLnZhcmlhdGlvbnMucHVzaChjb21wYW5pb25BZCk7XG4gICAgfSk7XG5cbiAgcmV0dXJuIGNyZWF0aXZlO1xufVxuIiwiaW1wb3J0IHsgQ3JlYXRpdmVMaW5lYXIgfSBmcm9tICcuLi9jcmVhdGl2ZS9jcmVhdGl2ZV9saW5lYXInO1xuaW1wb3J0IHsgSWNvbiB9IGZyb20gJy4uL2ljb24nO1xuaW1wb3J0IHsgTWVkaWFGaWxlIH0gZnJvbSAnLi4vbWVkaWFfZmlsZSc7XG5pbXBvcnQgeyBwYXJzZXJVdGlscyB9IGZyb20gJy4vcGFyc2VyX3V0aWxzJztcblxuLyoqXG4gKiBUaGlzIG1vZHVsZSBwcm92aWRlcyBtZXRob2RzIHRvIHBhcnNlIGEgVkFTVCBMaW5lYXIgRWxlbWVudC5cbiAqL1xuXG4vKipcbiAqIFBhcnNlcyBhIExpbmVhciBlbGVtZW50LlxuICogQHBhcmFtICB7T2JqZWN0fSBjcmVhdGl2ZUVsZW1lbnQgLSBUaGUgVkFTVCBMaW5lYXIgZWxlbWVudCB0byBwYXJzZS5cbiAqIEBwYXJhbSAge2FueX0gY3JlYXRpdmVBdHRyaWJ1dGVzIC0gVGhlIGF0dHJpYnV0ZXMgb2YgdGhlIExpbmVhciAob3B0aW9uYWwpLlxuICogQHJldHVybiB7Q3JlYXRpdmVMaW5lYXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUNyZWF0aXZlTGluZWFyKGNyZWF0aXZlRWxlbWVudCwgY3JlYXRpdmVBdHRyaWJ1dGVzKSB7XG4gIGxldCBvZmZzZXQ7XG4gIGNvbnN0IGNyZWF0aXZlID0gbmV3IENyZWF0aXZlTGluZWFyKGNyZWF0aXZlQXR0cmlidXRlcyk7XG5cbiAgY3JlYXRpdmUuZHVyYXRpb24gPSBwYXJzZXJVdGlscy5wYXJzZUR1cmF0aW9uKFxuICAgIHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoXG4gICAgICBwYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShjcmVhdGl2ZUVsZW1lbnQsICdEdXJhdGlvbicpXG4gICAgKVxuICApO1xuICBjb25zdCBza2lwT2Zmc2V0ID0gY3JlYXRpdmVFbGVtZW50LmdldEF0dHJpYnV0ZSgnc2tpcG9mZnNldCcpO1xuXG4gIGlmICh0eXBlb2Ygc2tpcE9mZnNldCA9PT0gJ3VuZGVmaW5lZCcgfHwgc2tpcE9mZnNldCA9PT0gbnVsbCkge1xuICAgIGNyZWF0aXZlLnNraXBEZWxheSA9IG51bGw7XG4gIH0gZWxzZSBpZiAoXG4gICAgc2tpcE9mZnNldC5jaGFyQXQoc2tpcE9mZnNldC5sZW5ndGggLSAxKSA9PT0gJyUnICYmXG4gICAgY3JlYXRpdmUuZHVyYXRpb24gIT09IC0xXG4gICkge1xuICAgIGNvbnN0IHBlcmNlbnQgPSBwYXJzZUludChza2lwT2Zmc2V0LCAxMCk7XG4gICAgY3JlYXRpdmUuc2tpcERlbGF5ID0gY3JlYXRpdmUuZHVyYXRpb24gKiAocGVyY2VudCAvIDEwMCk7XG4gIH0gZWxzZSB7XG4gICAgY3JlYXRpdmUuc2tpcERlbGF5ID0gcGFyc2VyVXRpbHMucGFyc2VEdXJhdGlvbihza2lwT2Zmc2V0KTtcbiAgfVxuXG4gIGNvbnN0IHZpZGVvQ2xpY2tzRWxlbWVudCA9IHBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKFxuICAgIGNyZWF0aXZlRWxlbWVudCxcbiAgICAnVmlkZW9DbGlja3MnXG4gICk7XG4gIGlmICh2aWRlb0NsaWNrc0VsZW1lbnQpIHtcbiAgICBjcmVhdGl2ZS52aWRlb0NsaWNrVGhyb3VnaFVSTFRlbXBsYXRlID0gcGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChcbiAgICAgIHBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKHZpZGVvQ2xpY2tzRWxlbWVudCwgJ0NsaWNrVGhyb3VnaCcpXG4gICAgKTtcblxuICAgIHBhcnNlclV0aWxzXG4gICAgICAuY2hpbGRyZW5CeU5hbWUodmlkZW9DbGlja3NFbGVtZW50LCAnQ2xpY2tUcmFja2luZycpXG4gICAgICAuZm9yRWFjaChjbGlja1RyYWNraW5nRWxlbWVudCA9PiB7XG4gICAgICAgIGNyZWF0aXZlLnZpZGVvQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcy5wdXNoKFxuICAgICAgICAgIHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoY2xpY2tUcmFja2luZ0VsZW1lbnQpXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgIHBhcnNlclV0aWxzXG4gICAgICAuY2hpbGRyZW5CeU5hbWUodmlkZW9DbGlja3NFbGVtZW50LCAnQ3VzdG9tQ2xpY2snKVxuICAgICAgLmZvckVhY2goY3VzdG9tQ2xpY2tFbGVtZW50ID0+IHtcbiAgICAgICAgY3JlYXRpdmUudmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlcy5wdXNoKFxuICAgICAgICAgIHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoY3VzdG9tQ2xpY2tFbGVtZW50KVxuICAgICAgICApO1xuICAgICAgfSk7XG4gIH1cblxuICBjb25zdCBhZFBhcmFtc0VsZW1lbnQgPSBwYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShcbiAgICBjcmVhdGl2ZUVsZW1lbnQsXG4gICAgJ0FkUGFyYW1ldGVycydcbiAgKTtcbiAgaWYgKGFkUGFyYW1zRWxlbWVudCkge1xuICAgIGNyZWF0aXZlLmFkUGFyYW1ldGVycyA9IHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoYWRQYXJhbXNFbGVtZW50KTtcbiAgfVxuXG4gIHBhcnNlclV0aWxzXG4gICAgLmNoaWxkcmVuQnlOYW1lKGNyZWF0aXZlRWxlbWVudCwgJ1RyYWNraW5nRXZlbnRzJylcbiAgICAuZm9yRWFjaCh0cmFja2luZ0V2ZW50c0VsZW1lbnQgPT4ge1xuICAgICAgcGFyc2VyVXRpbHNcbiAgICAgICAgLmNoaWxkcmVuQnlOYW1lKHRyYWNraW5nRXZlbnRzRWxlbWVudCwgJ1RyYWNraW5nJylcbiAgICAgICAgLmZvckVhY2godHJhY2tpbmdFbGVtZW50ID0+IHtcbiAgICAgICAgICBsZXQgZXZlbnROYW1lID0gdHJhY2tpbmdFbGVtZW50LmdldEF0dHJpYnV0ZSgnZXZlbnQnKTtcbiAgICAgICAgICBjb25zdCB0cmFja2luZ1VSTFRlbXBsYXRlID0gcGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChcbiAgICAgICAgICAgIHRyYWNraW5nRWxlbWVudFxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKGV2ZW50TmFtZSAmJiB0cmFja2luZ1VSTFRlbXBsYXRlKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnROYW1lID09PSAncHJvZ3Jlc3MnKSB7XG4gICAgICAgICAgICAgIG9mZnNldCA9IHRyYWNraW5nRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ29mZnNldCcpO1xuICAgICAgICAgICAgICBpZiAoIW9mZnNldCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAob2Zmc2V0LmNoYXJBdChvZmZzZXQubGVuZ3RoIC0gMSkgPT09ICclJykge1xuICAgICAgICAgICAgICAgIGV2ZW50TmFtZSA9IGBwcm9ncmVzcy0ke29mZnNldH1gO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV2ZW50TmFtZSA9IGBwcm9ncmVzcy0ke01hdGgucm91bmQoXG4gICAgICAgICAgICAgICAgICBwYXJzZXJVdGlscy5wYXJzZUR1cmF0aW9uKG9mZnNldClcbiAgICAgICAgICAgICAgICApfWA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNyZWF0aXZlLnRyYWNraW5nRXZlbnRzW2V2ZW50TmFtZV0pKSB7XG4gICAgICAgICAgICAgIGNyZWF0aXZlLnRyYWNraW5nRXZlbnRzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNyZWF0aXZlLnRyYWNraW5nRXZlbnRzW2V2ZW50TmFtZV0ucHVzaCh0cmFja2luZ1VSTFRlbXBsYXRlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gIHBhcnNlclV0aWxzXG4gICAgLmNoaWxkcmVuQnlOYW1lKGNyZWF0aXZlRWxlbWVudCwgJ01lZGlhRmlsZXMnKVxuICAgIC5mb3JFYWNoKG1lZGlhRmlsZXNFbGVtZW50ID0+IHtcbiAgICAgIHBhcnNlclV0aWxzXG4gICAgICAgIC5jaGlsZHJlbkJ5TmFtZShtZWRpYUZpbGVzRWxlbWVudCwgJ01lZGlhRmlsZScpXG4gICAgICAgIC5mb3JFYWNoKG1lZGlhRmlsZUVsZW1lbnQgPT4ge1xuICAgICAgICAgIGNvbnN0IG1lZGlhRmlsZSA9IG5ldyBNZWRpYUZpbGUoKTtcbiAgICAgICAgICBtZWRpYUZpbGUuaWQgPSBtZWRpYUZpbGVFbGVtZW50LmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICAgICAgICBtZWRpYUZpbGUuZmlsZVVSTCA9IHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQobWVkaWFGaWxlRWxlbWVudCk7XG4gICAgICAgICAgbWVkaWFGaWxlLmRlbGl2ZXJ5VHlwZSA9IG1lZGlhRmlsZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkZWxpdmVyeScpO1xuICAgICAgICAgIG1lZGlhRmlsZS5jb2RlYyA9IG1lZGlhRmlsZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdjb2RlYycpO1xuICAgICAgICAgIG1lZGlhRmlsZS5taW1lVHlwZSA9IG1lZGlhRmlsZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0eXBlJyk7XG4gICAgICAgICAgbWVkaWFGaWxlLmFwaUZyYW1ld29yayA9IG1lZGlhRmlsZUVsZW1lbnQuZ2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgJ2FwaUZyYW1ld29yaydcbiAgICAgICAgICApO1xuICAgICAgICAgIG1lZGlhRmlsZS5iaXRyYXRlID0gcGFyc2VJbnQoXG4gICAgICAgICAgICBtZWRpYUZpbGVFbGVtZW50LmdldEF0dHJpYnV0ZSgnYml0cmF0ZScpIHx8IDBcbiAgICAgICAgICApO1xuICAgICAgICAgIG1lZGlhRmlsZS5taW5CaXRyYXRlID0gcGFyc2VJbnQoXG4gICAgICAgICAgICBtZWRpYUZpbGVFbGVtZW50LmdldEF0dHJpYnV0ZSgnbWluQml0cmF0ZScpIHx8IDBcbiAgICAgICAgICApO1xuICAgICAgICAgIG1lZGlhRmlsZS5tYXhCaXRyYXRlID0gcGFyc2VJbnQoXG4gICAgICAgICAgICBtZWRpYUZpbGVFbGVtZW50LmdldEF0dHJpYnV0ZSgnbWF4Qml0cmF0ZScpIHx8IDBcbiAgICAgICAgICApO1xuICAgICAgICAgIG1lZGlhRmlsZS53aWR0aCA9IHBhcnNlSW50KFxuICAgICAgICAgICAgbWVkaWFGaWxlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3dpZHRoJykgfHwgMFxuICAgICAgICAgICk7XG4gICAgICAgICAgbWVkaWFGaWxlLmhlaWdodCA9IHBhcnNlSW50KFxuICAgICAgICAgICAgbWVkaWFGaWxlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpIHx8IDBcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgbGV0IHNjYWxhYmxlID0gbWVkaWFGaWxlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3NjYWxhYmxlJyk7XG4gICAgICAgICAgaWYgKHNjYWxhYmxlICYmIHR5cGVvZiBzY2FsYWJsZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHNjYWxhYmxlID0gc2NhbGFibGUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChzY2FsYWJsZSA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAgIG1lZGlhRmlsZS5zY2FsYWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNjYWxhYmxlID09PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgIG1lZGlhRmlsZS5zY2FsYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGxldCBtYWludGFpbkFzcGVjdFJhdGlvID0gbWVkaWFGaWxlRWxlbWVudC5nZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAnbWFpbnRhaW5Bc3BlY3RSYXRpbydcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChtYWludGFpbkFzcGVjdFJhdGlvICYmIHR5cGVvZiBtYWludGFpbkFzcGVjdFJhdGlvID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgbWFpbnRhaW5Bc3BlY3RSYXRpbyA9IG1haW50YWluQXNwZWN0UmF0aW8udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChtYWludGFpbkFzcGVjdFJhdGlvID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICAgbWVkaWFGaWxlLm1haW50YWluQXNwZWN0UmF0aW8gPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYWludGFpbkFzcGVjdFJhdGlvID09PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgIG1lZGlhRmlsZS5tYWludGFpbkFzcGVjdFJhdGlvID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3JlYXRpdmUubWVkaWFGaWxlcy5wdXNoKG1lZGlhRmlsZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gIGNvbnN0IGljb25zRWxlbWVudCA9IHBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKGNyZWF0aXZlRWxlbWVudCwgJ0ljb25zJyk7XG4gIGlmIChpY29uc0VsZW1lbnQpIHtcbiAgICBwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShpY29uc0VsZW1lbnQsICdJY29uJykuZm9yRWFjaChpY29uRWxlbWVudCA9PiB7XG4gICAgICBjb25zdCBpY29uID0gbmV3IEljb24oKTtcbiAgICAgIGljb24ucHJvZ3JhbSA9IGljb25FbGVtZW50LmdldEF0dHJpYnV0ZSgncHJvZ3JhbScpO1xuICAgICAgaWNvbi5oZWlnaHQgPSBwYXJzZUludChpY29uRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpIHx8IDApO1xuICAgICAgaWNvbi53aWR0aCA9IHBhcnNlSW50KGljb25FbGVtZW50LmdldEF0dHJpYnV0ZSgnd2lkdGgnKSB8fCAwKTtcbiAgICAgIGljb24ueFBvc2l0aW9uID0gcGFyc2VYUG9zaXRpb24oaWNvbkVsZW1lbnQuZ2V0QXR0cmlidXRlKCd4UG9zaXRpb24nKSk7XG4gICAgICBpY29uLnlQb3NpdGlvbiA9IHBhcnNlWVBvc2l0aW9uKGljb25FbGVtZW50LmdldEF0dHJpYnV0ZSgneVBvc2l0aW9uJykpO1xuICAgICAgaWNvbi5hcGlGcmFtZXdvcmsgPSBpY29uRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2FwaUZyYW1ld29yaycpO1xuICAgICAgaWNvbi5vZmZzZXQgPSBwYXJzZXJVdGlscy5wYXJzZUR1cmF0aW9uKFxuICAgICAgICBpY29uRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ29mZnNldCcpXG4gICAgICApO1xuICAgICAgaWNvbi5kdXJhdGlvbiA9IHBhcnNlclV0aWxzLnBhcnNlRHVyYXRpb24oXG4gICAgICAgIGljb25FbGVtZW50LmdldEF0dHJpYnV0ZSgnZHVyYXRpb24nKVxuICAgICAgKTtcblxuICAgICAgcGFyc2VyVXRpbHNcbiAgICAgICAgLmNoaWxkcmVuQnlOYW1lKGljb25FbGVtZW50LCAnSFRNTFJlc291cmNlJylcbiAgICAgICAgLmZvckVhY2goaHRtbEVsZW1lbnQgPT4ge1xuICAgICAgICAgIGljb24udHlwZSA9IGh0bWxFbGVtZW50LmdldEF0dHJpYnV0ZSgnY3JlYXRpdmVUeXBlJykgfHwgJ3RleHQvaHRtbCc7XG4gICAgICAgICAgaWNvbi5odG1sUmVzb3VyY2UgPSBwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGh0bWxFbGVtZW50KTtcbiAgICAgICAgfSk7XG5cbiAgICAgIHBhcnNlclV0aWxzXG4gICAgICAgIC5jaGlsZHJlbkJ5TmFtZShpY29uRWxlbWVudCwgJ0lGcmFtZVJlc291cmNlJylcbiAgICAgICAgLmZvckVhY2goaWZyYW1lRWxlbWVudCA9PiB7XG4gICAgICAgICAgaWNvbi50eXBlID0gaWZyYW1lRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2NyZWF0aXZlVHlwZScpIHx8IDA7XG4gICAgICAgICAgaWNvbi5pZnJhbWVSZXNvdXJjZSA9IHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoaWZyYW1lRWxlbWVudCk7XG4gICAgICAgIH0pO1xuXG4gICAgICBwYXJzZXJVdGlsc1xuICAgICAgICAuY2hpbGRyZW5CeU5hbWUoaWNvbkVsZW1lbnQsICdTdGF0aWNSZXNvdXJjZScpXG4gICAgICAgIC5mb3JFYWNoKHN0YXRpY0VsZW1lbnQgPT4ge1xuICAgICAgICAgIGljb24udHlwZSA9IHN0YXRpY0VsZW1lbnQuZ2V0QXR0cmlidXRlKCdjcmVhdGl2ZVR5cGUnKSB8fCAwO1xuICAgICAgICAgIGljb24uc3RhdGljUmVzb3VyY2UgPSBwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KHN0YXRpY0VsZW1lbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgY29uc3QgaWNvbkNsaWNrc0VsZW1lbnQgPSBwYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShcbiAgICAgICAgaWNvbkVsZW1lbnQsXG4gICAgICAgICdJY29uQ2xpY2tzJ1xuICAgICAgKTtcbiAgICAgIGlmIChpY29uQ2xpY2tzRWxlbWVudCkge1xuICAgICAgICBpY29uLmljb25DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZSA9IHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoXG4gICAgICAgICAgcGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUoaWNvbkNsaWNrc0VsZW1lbnQsICdJY29uQ2xpY2tUaHJvdWdoJylcbiAgICAgICAgKTtcbiAgICAgICAgcGFyc2VyVXRpbHNcbiAgICAgICAgICAuY2hpbGRyZW5CeU5hbWUoaWNvbkNsaWNrc0VsZW1lbnQsICdJY29uQ2xpY2tUcmFja2luZycpXG4gICAgICAgICAgLmZvckVhY2goaWNvbkNsaWNrVHJhY2tpbmdFbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGljb24uaWNvbkNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMucHVzaChcbiAgICAgICAgICAgICAgcGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChpY29uQ2xpY2tUcmFja2luZ0VsZW1lbnQpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpY29uLmljb25WaWV3VHJhY2tpbmdVUkxUZW1wbGF0ZSA9IHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoXG4gICAgICAgIHBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKGljb25FbGVtZW50LCAnSWNvblZpZXdUcmFja2luZycpXG4gICAgICApO1xuXG4gICAgICBjcmVhdGl2ZS5pY29ucy5wdXNoKGljb24pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIGNyZWF0aXZlO1xufVxuXG4vKipcbiAqIFBhcnNlcyBhbiBob3Jpem9udGFsIHBvc2l0aW9uIGludG8gYSBTdHJpbmcgKCdsZWZ0JyBvciAncmlnaHQnKSBvciBpbnRvIGEgTnVtYmVyLlxuICogQHBhcmFtICB7U3RyaW5nfSB4UG9zaXRpb24gLSBUaGUgeCBwb3NpdGlvbiB0byBwYXJzZS5cbiAqIEByZXR1cm4ge1N0cmluZ3xOdW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIHBhcnNlWFBvc2l0aW9uKHhQb3NpdGlvbikge1xuICBpZiAoWydsZWZ0JywgJ3JpZ2h0J10uaW5kZXhPZih4UG9zaXRpb24pICE9PSAtMSkge1xuICAgIHJldHVybiB4UG9zaXRpb247XG4gIH1cblxuICByZXR1cm4gcGFyc2VJbnQoeFBvc2l0aW9uIHx8IDApO1xufVxuXG4vKipcbiAqIFBhcnNlcyBhbiB2ZXJ0aWNhbCBwb3NpdGlvbiBpbnRvIGEgU3RyaW5nICgndG9wJyBvciAnYm90dG9tJykgb3IgaW50byBhIE51bWJlci5cbiAqIEBwYXJhbSAge1N0cmluZ30geVBvc2l0aW9uIC0gVGhlIHggcG9zaXRpb24gdG8gcGFyc2UuXG4gKiBAcmV0dXJuIHtTdHJpbmd8TnVtYmVyfVxuICovXG5mdW5jdGlvbiBwYXJzZVlQb3NpdGlvbih5UG9zaXRpb24pIHtcbiAgaWYgKFsndG9wJywgJ2JvdHRvbSddLmluZGV4T2YoeVBvc2l0aW9uKSAhPT0gLTEpIHtcbiAgICByZXR1cm4geVBvc2l0aW9uO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlSW50KHlQb3NpdGlvbiB8fCAwKTtcbn1cbiIsImltcG9ydCB7IENyZWF0aXZlTm9uTGluZWFyIH0gZnJvbSAnLi4vY3JlYXRpdmUvY3JlYXRpdmVfbm9uX2xpbmVhcic7XG5pbXBvcnQgeyBOb25MaW5lYXJBZCB9IGZyb20gJy4uL25vbl9saW5lYXJfYWQnO1xuaW1wb3J0IHsgcGFyc2VyVXRpbHMgfSBmcm9tICcuL3BhcnNlcl91dGlscyc7XG5cbi8qKlxuICogVGhpcyBtb2R1bGUgcHJvdmlkZXMgbWV0aG9kcyB0byBwYXJzZSBhIFZBU1QgTm9uTGluZWFyIEVsZW1lbnQuXG4gKi9cblxuLyoqXG4gKiBQYXJzZXMgYSBOb25MaW5lYXIgZWxlbWVudC5cbiAqIEBwYXJhbSAge2FueX0gY3JlYXRpdmVFbGVtZW50IC0gVGhlIFZBU1QgTm9uTGluZWFyIGVsZW1lbnQgdG8gcGFyc2UuXG4gKiBAcGFyYW0gIHthbnl9IGNyZWF0aXZlQXR0cmlidXRlcyAtIFRoZSBhdHRyaWJ1dGVzIG9mIHRoZSBOb25MaW5lYXIgKG9wdGlvbmFsKS5cbiAqIEByZXR1cm4ge0NyZWF0aXZlTm9uTGluZWFyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VDcmVhdGl2ZU5vbkxpbmVhcihjcmVhdGl2ZUVsZW1lbnQsIGNyZWF0aXZlQXR0cmlidXRlcykge1xuICBjb25zdCBjcmVhdGl2ZSA9IG5ldyBDcmVhdGl2ZU5vbkxpbmVhcihjcmVhdGl2ZUF0dHJpYnV0ZXMpO1xuXG4gIHBhcnNlclV0aWxzXG4gICAgLmNoaWxkcmVuQnlOYW1lKGNyZWF0aXZlRWxlbWVudCwgJ1RyYWNraW5nRXZlbnRzJylcbiAgICAuZm9yRWFjaCh0cmFja2luZ0V2ZW50c0VsZW1lbnQgPT4ge1xuICAgICAgbGV0IGV2ZW50TmFtZSwgdHJhY2tpbmdVUkxUZW1wbGF0ZTtcbiAgICAgIHBhcnNlclV0aWxzXG4gICAgICAgIC5jaGlsZHJlbkJ5TmFtZSh0cmFja2luZ0V2ZW50c0VsZW1lbnQsICdUcmFja2luZycpXG4gICAgICAgIC5mb3JFYWNoKHRyYWNraW5nRWxlbWVudCA9PiB7XG4gICAgICAgICAgZXZlbnROYW1lID0gdHJhY2tpbmdFbGVtZW50LmdldEF0dHJpYnV0ZSgnZXZlbnQnKTtcbiAgICAgICAgICB0cmFja2luZ1VSTFRlbXBsYXRlID0gcGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dCh0cmFja2luZ0VsZW1lbnQpO1xuXG4gICAgICAgICAgaWYgKGV2ZW50TmFtZSAmJiB0cmFja2luZ1VSTFRlbXBsYXRlKSB7XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY3JlYXRpdmUudHJhY2tpbmdFdmVudHNbZXZlbnROYW1lXSkpIHtcbiAgICAgICAgICAgICAgY3JlYXRpdmUudHJhY2tpbmdFdmVudHNbZXZlbnROYW1lXSA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3JlYXRpdmUudHJhY2tpbmdFdmVudHNbZXZlbnROYW1lXS5wdXNoKHRyYWNraW5nVVJMVGVtcGxhdGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgcGFyc2VyVXRpbHNcbiAgICAuY2hpbGRyZW5CeU5hbWUoY3JlYXRpdmVFbGVtZW50LCAnTm9uTGluZWFyJylcbiAgICAuZm9yRWFjaChub25saW5lYXJSZXNvdXJjZSA9PiB7XG4gICAgICBjb25zdCBub25saW5lYXJBZCA9IG5ldyBOb25MaW5lYXJBZCgpO1xuICAgICAgbm9ubGluZWFyQWQuaWQgPSBub25saW5lYXJSZXNvdXJjZS5nZXRBdHRyaWJ1dGUoJ2lkJykgfHwgbnVsbDtcbiAgICAgIG5vbmxpbmVhckFkLndpZHRoID0gbm9ubGluZWFyUmVzb3VyY2UuZ2V0QXR0cmlidXRlKCd3aWR0aCcpO1xuICAgICAgbm9ubGluZWFyQWQuaGVpZ2h0ID0gbm9ubGluZWFyUmVzb3VyY2UuZ2V0QXR0cmlidXRlKCdoZWlnaHQnKTtcbiAgICAgIG5vbmxpbmVhckFkLmV4cGFuZGVkV2lkdGggPSBub25saW5lYXJSZXNvdXJjZS5nZXRBdHRyaWJ1dGUoXG4gICAgICAgICdleHBhbmRlZFdpZHRoJ1xuICAgICAgKTtcbiAgICAgIG5vbmxpbmVhckFkLmV4cGFuZGVkSGVpZ2h0ID0gbm9ubGluZWFyUmVzb3VyY2UuZ2V0QXR0cmlidXRlKFxuICAgICAgICAnZXhwYW5kZWRIZWlnaHQnXG4gICAgICApO1xuICAgICAgbm9ubGluZWFyQWQuc2NhbGFibGUgPSBwYXJzZXJVdGlscy5wYXJzZUJvb2xlYW4oXG4gICAgICAgIG5vbmxpbmVhclJlc291cmNlLmdldEF0dHJpYnV0ZSgnc2NhbGFibGUnKVxuICAgICAgKTtcbiAgICAgIG5vbmxpbmVhckFkLm1haW50YWluQXNwZWN0UmF0aW8gPSBwYXJzZXJVdGlscy5wYXJzZUJvb2xlYW4oXG4gICAgICAgIG5vbmxpbmVhclJlc291cmNlLmdldEF0dHJpYnV0ZSgnbWFpbnRhaW5Bc3BlY3RSYXRpbycpXG4gICAgICApO1xuICAgICAgbm9ubGluZWFyQWQubWluU3VnZ2VzdGVkRHVyYXRpb24gPSBwYXJzZXJVdGlscy5wYXJzZUR1cmF0aW9uKFxuICAgICAgICBub25saW5lYXJSZXNvdXJjZS5nZXRBdHRyaWJ1dGUoJ21pblN1Z2dlc3RlZER1cmF0aW9uJylcbiAgICAgICk7XG4gICAgICBub25saW5lYXJBZC5hcGlGcmFtZXdvcmsgPSBub25saW5lYXJSZXNvdXJjZS5nZXRBdHRyaWJ1dGUoJ2FwaUZyYW1ld29yaycpO1xuXG4gICAgICBwYXJzZXJVdGlsc1xuICAgICAgICAuY2hpbGRyZW5CeU5hbWUobm9ubGluZWFyUmVzb3VyY2UsICdIVE1MUmVzb3VyY2UnKVxuICAgICAgICAuZm9yRWFjaChodG1sRWxlbWVudCA9PiB7XG4gICAgICAgICAgbm9ubGluZWFyQWQudHlwZSA9XG4gICAgICAgICAgICBodG1sRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2NyZWF0aXZlVHlwZScpIHx8ICd0ZXh0L2h0bWwnO1xuICAgICAgICAgIG5vbmxpbmVhckFkLmh0bWxSZXNvdXJjZSA9IHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoaHRtbEVsZW1lbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgcGFyc2VyVXRpbHNcbiAgICAgICAgLmNoaWxkcmVuQnlOYW1lKG5vbmxpbmVhclJlc291cmNlLCAnSUZyYW1lUmVzb3VyY2UnKVxuICAgICAgICAuZm9yRWFjaChpZnJhbWVFbGVtZW50ID0+IHtcbiAgICAgICAgICBub25saW5lYXJBZC50eXBlID0gaWZyYW1lRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2NyZWF0aXZlVHlwZScpIHx8IDA7XG4gICAgICAgICAgbm9ubGluZWFyQWQuaWZyYW1lUmVzb3VyY2UgPSBwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGlmcmFtZUVsZW1lbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgcGFyc2VyVXRpbHNcbiAgICAgICAgLmNoaWxkcmVuQnlOYW1lKG5vbmxpbmVhclJlc291cmNlLCAnU3RhdGljUmVzb3VyY2UnKVxuICAgICAgICAuZm9yRWFjaChzdGF0aWNFbGVtZW50ID0+IHtcbiAgICAgICAgICBub25saW5lYXJBZC50eXBlID0gc3RhdGljRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2NyZWF0aXZlVHlwZScpIHx8IDA7XG4gICAgICAgICAgbm9ubGluZWFyQWQuc3RhdGljUmVzb3VyY2UgPSBwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KHN0YXRpY0VsZW1lbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgY29uc3QgYWRQYXJhbXNFbGVtZW50ID0gcGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUoXG4gICAgICAgIG5vbmxpbmVhclJlc291cmNlLFxuICAgICAgICAnQWRQYXJhbWV0ZXJzJ1xuICAgICAgKTtcbiAgICAgIGlmIChhZFBhcmFtc0VsZW1lbnQpIHtcbiAgICAgICAgbm9ubGluZWFyQWQuYWRQYXJhbWV0ZXJzID0gcGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChhZFBhcmFtc0VsZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICBub25saW5lYXJBZC5ub25saW5lYXJDbGlja1Rocm91Z2hVUkxUZW1wbGF0ZSA9IHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoXG4gICAgICAgIHBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKG5vbmxpbmVhclJlc291cmNlLCAnTm9uTGluZWFyQ2xpY2tUaHJvdWdoJylcbiAgICAgICk7XG4gICAgICBwYXJzZXJVdGlsc1xuICAgICAgICAuY2hpbGRyZW5CeU5hbWUobm9ubGluZWFyUmVzb3VyY2UsICdOb25MaW5lYXJDbGlja1RyYWNraW5nJylcbiAgICAgICAgLmZvckVhY2goY2xpY2tUcmFja2luZ0VsZW1lbnQgPT4ge1xuICAgICAgICAgIG5vbmxpbmVhckFkLm5vbmxpbmVhckNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMucHVzaChcbiAgICAgICAgICAgIHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoY2xpY2tUcmFja2luZ0VsZW1lbnQpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIGNyZWF0aXZlLnZhcmlhdGlvbnMucHVzaChub25saW5lYXJBZCk7XG4gICAgfSk7XG5cbiAgcmV0dXJuIGNyZWF0aXZlO1xufVxuIiwiaW1wb3J0IHsgdXRpbCB9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5cbi8qKlxuICogVGhpcyBtb2R1bGUgcHJvdmlkZXMgc3VwcG9ydCBtZXRob2RzIHRvIHRoZSBwYXJzaW5nIGNsYXNzZXMuXG4gKi9cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBnaXZlbiBub2RlIHdoaWNoIG5vZGVOYW1lIG1hdGNoZXMgdGhlIGdpdmVuIG5hbWUuXG4gKiBAcGFyYW0gIHtPYmplY3R9IG5vZGUgLSBUaGUgbm9kZSB0byB1c2UgdG8gZmluZCBhIG1hdGNoLlxuICogQHBhcmFtICB7U3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgdG8gbG9vayBmb3IuXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIGNoaWxkQnlOYW1lKG5vZGUsIG5hbWUpIHtcbiAgY29uc3QgY2hpbGROb2RlcyA9IG5vZGUuY2hpbGROb2RlcztcblxuICBmb3IgKGNvbnN0IGNoaWxkS2V5IGluIGNoaWxkTm9kZXMpIHtcbiAgICBjb25zdCBjaGlsZCA9IGNoaWxkTm9kZXNbY2hpbGRLZXldO1xuXG4gICAgaWYgKGNoaWxkLm5vZGVOYW1lID09PSBuYW1lKSB7XG4gICAgICByZXR1cm4gY2hpbGQ7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyBhbGwgdGhlIGVsZW1lbnRzIG9mIHRoZSBnaXZlbiBub2RlIHdoaWNoIG5vZGVOYW1lIG1hdGNoIHRoZSBnaXZlbiBuYW1lLlxuICogQHBhcmFtICB7YW55fSBub2RlIC0gVGhlIG5vZGUgdG8gdXNlIHRvIGZpbmQgdGhlIG1hdGNoZXMuXG4gKiBAcGFyYW0gIHthbnl9IG5hbWUgLSBUaGUgbmFtZSB0byBsb29rIGZvci5cbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5mdW5jdGlvbiBjaGlsZHJlbkJ5TmFtZShub2RlLCBuYW1lKSB7XG4gIGNvbnN0IGNoaWxkcmVuID0gW107XG4gIGNvbnN0IGNoaWxkTm9kZXMgPSBub2RlLmNoaWxkTm9kZXM7XG5cbiAgZm9yIChjb25zdCBjaGlsZEtleSBpbiBjaGlsZE5vZGVzKSB7XG4gICAgY29uc3QgY2hpbGQgPSBjaGlsZE5vZGVzW2NoaWxkS2V5XTtcblxuICAgIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gbmFtZSkge1xuICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBjaGlsZHJlbjtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyByZWxhdGl2ZSB2YXN0QWRUYWdVcmkuXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHZhc3RBZFRhZ1VybCAtIFRoZSB1cmwgdG8gcmVzb2x2ZS5cbiAqIEBwYXJhbSAge1N0cmluZ30gb3JpZ2luYWxVcmwgLSBUaGUgb3JpZ2luYWwgdXJsLlxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiByZXNvbHZlVmFzdEFkVGFnVVJJKHZhc3RBZFRhZ1VybCwgb3JpZ2luYWxVcmwpIHtcbiAgaWYgKCFvcmlnaW5hbFVybCkge1xuICAgIHJldHVybiB2YXN0QWRUYWdVcmw7XG4gIH1cblxuICBpZiAodmFzdEFkVGFnVXJsLmluZGV4T2YoJy8vJykgPT09IDApIHtcbiAgICBjb25zdCB7IHByb3RvY29sIH0gPSBsb2NhdGlvbjtcbiAgICByZXR1cm4gYCR7cHJvdG9jb2x9JHt2YXN0QWRUYWdVcmx9YDtcbiAgfVxuXG4gIGlmICh2YXN0QWRUYWdVcmwuaW5kZXhPZignOi8vJykgPT09IC0xKSB7XG4gICAgLy8gUmVzb2x2ZSByZWxhdGl2ZSBVUkxzIChtYWlubHkgZm9yIHVuaXQgdGVzdGluZylcbiAgICBjb25zdCBiYXNlVVJMID0gb3JpZ2luYWxVcmwuc2xpY2UoMCwgb3JpZ2luYWxVcmwubGFzdEluZGV4T2YoJy8nKSk7XG4gICAgcmV0dXJuIGAke2Jhc2VVUkx9LyR7dmFzdEFkVGFnVXJsfWA7XG4gIH1cblxuICByZXR1cm4gdmFzdEFkVGFnVXJsO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGEgYm9vbGVhbiBzdHJpbmcgaW50byBhIEJvb2xlYW4uXG4gKiBAcGFyYW0gIHtTdHJpbmd9IGJvb2xlYW5TdHJpbmcgLSBUaGUgYm9vbGVhbiBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIHBhcnNlQm9vbGVhbihib29sZWFuU3RyaW5nKSB7XG4gIHJldHVybiBbJ3RydWUnLCAnVFJVRScsICcxJ10uaW5kZXhPZihib29sZWFuU3RyaW5nKSAhPT0gLTE7XG59XG5cbi8qKlxuICogUGFyc2VzIGEgbm9kZSB0ZXh0IChmb3IgbGVnYWN5IHN1cHBvcnQpLlxuICogQHBhcmFtICB7T2JqZWN0fSBub2RlIC0gVGhlIG5vZGUgdG8gcGFyc2UgdGhlIHRleHQgZnJvbS5cbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gcGFyc2VOb2RlVGV4dChub2RlKSB7XG4gIHJldHVybiBub2RlICYmIChub2RlLnRleHRDb250ZW50IHx8IG5vZGUudGV4dCB8fCAnJykudHJpbSgpO1xufVxuXG4vKipcbiAqIENvcGllcyBhbiBhdHRyaWJ1dGUgZnJvbSBhIG5vZGUgdG8gYW5vdGhlci5cbiAqIEBwYXJhbSAge1N0cmluZ30gYXR0cmlidXRlTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBhdHRyaWJ1dGUgdG8gY2xvbmUuXG4gKiBAcGFyYW0gIHtPYmplY3R9IG5vZGVTb3VyY2UgLSBUaGUgc291cmNlIG5vZGUgdG8gY29weSB0aGUgYXR0cmlidXRlIGZyb20uXG4gKiBAcGFyYW0gIHtPYmplY3R9IG5vZGVEZXN0aW5hdGlvbiAtIFRoZSBkZXN0aW5hdGlvbiBub2RlIHRvIGNvcHkgdGhlIGF0dHJpYnV0ZSBhdC5cbiAqL1xuZnVuY3Rpb24gY29weU5vZGVBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgbm9kZVNvdXJjZSwgbm9kZURlc3RpbmF0aW9uKSB7XG4gIGNvbnN0IGF0dHJpYnV0ZVZhbHVlID0gbm9kZVNvdXJjZS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XG4gIGlmIChhdHRyaWJ1dGVWYWx1ZSkge1xuICAgIG5vZGVEZXN0aW5hdGlvbi5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWUpO1xuICB9XG59XG5cbi8qKlxuICogUGFyc2VzIGEgU3RyaW5nIGR1cmF0aW9uIGludG8gYSBOdW1iZXIuXG4gKiBAcGFyYW0gIHtTdHJpbmd9IGR1cmF0aW9uU3RyaW5nIC0gVGhlIGR1cmVhdGlvbiByZXByZXNlbnRlZCBhcyBhIHN0cmluZy5cbiAqIEByZXR1cm4ge051bWJlcn1cbiAqL1xuZnVuY3Rpb24gcGFyc2VEdXJhdGlvbihkdXJhdGlvblN0cmluZykge1xuICBpZiAoZHVyYXRpb25TdHJpbmcgPT09IG51bGwgfHwgdHlwZW9mIGR1cmF0aW9uU3RyaW5nID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiAtMTtcbiAgfVxuICAvLyBTb21lIFZBU1QgZG9lc24ndCBoYXZlIGFuIEhIOk1NOlNTIGR1cmF0aW9uIGZvcm1hdCBidXQgaW5zdGVhZCBqdXMgdGhlIG51bWJlciBvZiBzZWNvbmRzXG4gIGlmICh1dGlsLmlzTnVtZXJpYyhkdXJhdGlvblN0cmluZykpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoZHVyYXRpb25TdHJpbmcpO1xuICB9XG5cbiAgY29uc3QgZHVyYXRpb25Db21wb25lbnRzID0gZHVyYXRpb25TdHJpbmcuc3BsaXQoJzonKTtcbiAgaWYgKGR1cmF0aW9uQ29tcG9uZW50cy5sZW5ndGggIT09IDMpIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICBjb25zdCBzZWNvbmRzQW5kTVMgPSBkdXJhdGlvbkNvbXBvbmVudHNbMl0uc3BsaXQoJy4nKTtcbiAgbGV0IHNlY29uZHMgPSBwYXJzZUludChzZWNvbmRzQW5kTVNbMF0pO1xuICBpZiAoc2Vjb25kc0FuZE1TLmxlbmd0aCA9PT0gMikge1xuICAgIHNlY29uZHMgKz0gcGFyc2VGbG9hdChgMC4ke3NlY29uZHNBbmRNU1sxXX1gKTtcbiAgfVxuXG4gIGNvbnN0IG1pbnV0ZXMgPSBwYXJzZUludChkdXJhdGlvbkNvbXBvbmVudHNbMV0gKiA2MCk7XG4gIGNvbnN0IGhvdXJzID0gcGFyc2VJbnQoZHVyYXRpb25Db21wb25lbnRzWzBdICogNjAgKiA2MCk7XG5cbiAgaWYgKFxuICAgIGlzTmFOKGhvdXJzKSB8fFxuICAgIGlzTmFOKG1pbnV0ZXMpIHx8XG4gICAgaXNOYU4oc2Vjb25kcykgfHxcbiAgICBtaW51dGVzID4gNjAgKiA2MCB8fFxuICAgIHNlY29uZHMgPiA2MFxuICApIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cbiAgcmV0dXJuIGhvdXJzICsgbWludXRlcyArIHNlY29uZHM7XG59XG5cbi8qKlxuICogU3BsaXRzIGFuIEFycmF5IG9mIGFkcyBpbnRvIGFuIEFycmF5IG9mIEFycmF5cyBvZiBhZHMuXG4gKiBFYWNoIHN1YmFycmF5IGNvbnRhaW5zIGVpdGhlciBvbmUgYWQgb3IgbXVsdGlwbGUgYWRzIChhbiBBZFBvZClcbiAqIEBwYXJhbSAge0FycmF5fSBhZHMgLSBBbiBBcnJheSBvZiBhZHMgdG8gc3BsaXRcbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5mdW5jdGlvbiBzcGxpdFZBU1QoYWRzKSB7XG4gIGNvbnN0IHNwbGl0dGVkVkFTVCA9IFtdO1xuICBsZXQgbGFzdEFkUG9kID0gbnVsbDtcblxuICBhZHMuZm9yRWFjaCgoYWQsIGkpID0+IHtcbiAgICBpZiAoYWQuc2VxdWVuY2UpIHtcbiAgICAgIGFkLnNlcXVlbmNlID0gcGFyc2VJbnQoYWQuc2VxdWVuY2UsIDEwKTtcbiAgICB9XG4gICAgLy8gVGhlIGN1cnJlbnQgQWQgbWF5IGJlIHRoZSBuZXh0IEFkIG9mIGFuIEFkUG9kXG4gICAgaWYgKGFkLnNlcXVlbmNlID4gMSkge1xuICAgICAgY29uc3QgbGFzdEFkID0gYWRzW2kgLSAxXTtcbiAgICAgIC8vIGNoZWNrIGlmIHRoZSBjdXJyZW50IEFkIGlzIGV4YWN0bHkgdGhlIG5leHQgb25lIGluIHRoZSBBZFBvZFxuICAgICAgaWYgKGxhc3RBZCAmJiBsYXN0QWQuc2VxdWVuY2UgPT09IGFkLnNlcXVlbmNlIC0gMSkge1xuICAgICAgICBsYXN0QWRQb2QgJiYgbGFzdEFkUG9kLnB1c2goYWQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBJZiB0aGUgYWQgaGFkIGEgc2VxdWVuY2UgYXR0cmlidXRlIGJ1dCBpdCB3YXMgbm90IHBhcnQgb2YgYSBjb3JyZWN0bHkgZm9ybWVkXG4gICAgICAvLyBBZFBvZCwgbGV0J3MgcmVtb3ZlIHRoZSBzZXF1ZW5jZSBhdHRyaWJ1dGVcbiAgICAgIGRlbGV0ZSBhZC5zZXF1ZW5jZTtcbiAgICB9XG5cbiAgICBsYXN0QWRQb2QgPSBbYWRdO1xuICAgIHNwbGl0dGVkVkFTVC5wdXNoKGxhc3RBZFBvZCk7XG4gIH0pO1xuXG4gIHJldHVybiBzcGxpdHRlZFZBU1Q7XG59XG5cbi8qKlxuICogTWVyZ2VzIHRoZSBkYXRhIGJldHdlZW4gYW4gdW53cmFwcGVkIGFkIGFuZCBoaXMgd3JhcHBlci5cbiAqIEBwYXJhbSAge0FkfSB1bndyYXBwZWRBZCAtIFRoZSAndW53cmFwcGVkJyBBZC5cbiAqIEBwYXJhbSAge0FkfSB3cmFwcGVyIC0gVGhlIHdyYXBwZXIgQWQuXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5mdW5jdGlvbiBtZXJnZVdyYXBwZXJBZERhdGEodW53cmFwcGVkQWQsIHdyYXBwZXIpIHtcbiAgdW53cmFwcGVkQWQuZXJyb3JVUkxUZW1wbGF0ZXMgPSB3cmFwcGVyLmVycm9yVVJMVGVtcGxhdGVzLmNvbmNhdChcbiAgICB1bndyYXBwZWRBZC5lcnJvclVSTFRlbXBsYXRlc1xuICApO1xuICB1bndyYXBwZWRBZC5pbXByZXNzaW9uVVJMVGVtcGxhdGVzID0gd3JhcHBlci5pbXByZXNzaW9uVVJMVGVtcGxhdGVzLmNvbmNhdChcbiAgICB1bndyYXBwZWRBZC5pbXByZXNzaW9uVVJMVGVtcGxhdGVzXG4gICk7XG4gIHVud3JhcHBlZEFkLmV4dGVuc2lvbnMgPSB3cmFwcGVyLmV4dGVuc2lvbnMuY29uY2F0KHVud3JhcHBlZEFkLmV4dGVuc2lvbnMpO1xuXG4gIHVud3JhcHBlZEFkLmNyZWF0aXZlcy5mb3JFYWNoKGNyZWF0aXZlID0+IHtcbiAgICBpZiAod3JhcHBlci50cmFja2luZ0V2ZW50cyAmJiB3cmFwcGVyLnRyYWNraW5nRXZlbnRzW2NyZWF0aXZlLnR5cGVdKSB7XG4gICAgICBmb3IgKGNvbnN0IGV2ZW50TmFtZSBpbiB3cmFwcGVyLnRyYWNraW5nRXZlbnRzW2NyZWF0aXZlLnR5cGVdKSB7XG4gICAgICAgIGNvbnN0IHVybHMgPSB3cmFwcGVyLnRyYWNraW5nRXZlbnRzW2NyZWF0aXZlLnR5cGVdW2V2ZW50TmFtZV07XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjcmVhdGl2ZS50cmFja2luZ0V2ZW50c1tldmVudE5hbWVdKSkge1xuICAgICAgICAgIGNyZWF0aXZlLnRyYWNraW5nRXZlbnRzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBjcmVhdGl2ZS50cmFja2luZ0V2ZW50c1tldmVudE5hbWVdID0gY3JlYXRpdmUudHJhY2tpbmdFdmVudHNbXG4gICAgICAgICAgZXZlbnROYW1lXG4gICAgICAgIF0uY29uY2F0KHVybHMpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgaWYgKFxuICAgIHdyYXBwZXIudmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzICYmXG4gICAgd3JhcHBlci52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMubGVuZ3RoXG4gICkge1xuICAgIHVud3JhcHBlZEFkLmNyZWF0aXZlcy5mb3JFYWNoKGNyZWF0aXZlID0+IHtcbiAgICAgIGlmIChjcmVhdGl2ZS50eXBlID09PSAnbGluZWFyJykge1xuICAgICAgICBjcmVhdGl2ZS52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMgPSBjcmVhdGl2ZS52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMuY29uY2F0KFxuICAgICAgICAgIHdyYXBwZXIudmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpZiAoXG4gICAgd3JhcHBlci52aWRlb0N1c3RvbUNsaWNrVVJMVGVtcGxhdGVzICYmXG4gICAgd3JhcHBlci52aWRlb0N1c3RvbUNsaWNrVVJMVGVtcGxhdGVzLmxlbmd0aFxuICApIHtcbiAgICB1bndyYXBwZWRBZC5jcmVhdGl2ZXMuZm9yRWFjaChjcmVhdGl2ZSA9PiB7XG4gICAgICBpZiAoY3JlYXRpdmUudHlwZSA9PT0gJ2xpbmVhcicpIHtcbiAgICAgICAgY3JlYXRpdmUudmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlcyA9IGNyZWF0aXZlLnZpZGVvQ3VzdG9tQ2xpY2tVUkxUZW1wbGF0ZXMuY29uY2F0KFxuICAgICAgICAgIHdyYXBwZXIudmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlc1xuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gVkFTVCAyLjAgc3VwcG9ydCAtIFVzZSBXcmFwcGVyL2xpbmVhci9jbGlja1Rocm91Z2ggd2hlbiBJbmxpbmUvTGluZWFyL2NsaWNrVGhyb3VnaCBpcyBudWxsXG4gIGlmICh3cmFwcGVyLnZpZGVvQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUpIHtcbiAgICB1bndyYXBwZWRBZC5jcmVhdGl2ZXMuZm9yRWFjaChjcmVhdGl2ZSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIGNyZWF0aXZlLnR5cGUgPT09ICdsaW5lYXInICYmXG4gICAgICAgIChjcmVhdGl2ZS52aWRlb0NsaWNrVGhyb3VnaFVSTFRlbXBsYXRlID09PSBudWxsIHx8XG4gICAgICAgICAgdHlwZW9mIGNyZWF0aXZlLnZpZGVvQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUgPT09ICd1bmRlZmluZWQnKVxuICAgICAgKSB7XG4gICAgICAgIGNyZWF0aXZlLnZpZGVvQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUgPVxuICAgICAgICAgIHdyYXBwZXIudmlkZW9DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcGFyc2VyVXRpbHMgPSB7XG4gIGNoaWxkQnlOYW1lLFxuICBjaGlsZHJlbkJ5TmFtZSxcbiAgcmVzb2x2ZVZhc3RBZFRhZ1VSSSxcbiAgcGFyc2VCb29sZWFuLFxuICBwYXJzZU5vZGVUZXh0LFxuICBjb3B5Tm9kZUF0dHJpYnV0ZSxcbiAgcGFyc2VEdXJhdGlvbixcbiAgc3BsaXRWQVNULFxuICBtZXJnZVdyYXBwZXJBZERhdGFcbn07XG4iLCJpbXBvcnQgeyBwYXJzZUFkIH0gZnJvbSAnLi9hZF9wYXJzZXInO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcbmltcG9ydCB7IHBhcnNlclV0aWxzIH0gZnJvbSAnLi9wYXJzZXJfdXRpbHMnO1xuaW1wb3J0IHsgdXJsSGFuZGxlciB9IGZyb20gJy4uL3VybF9oYW5kbGVyJztcbmltcG9ydCB7IHV0aWwgfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuaW1wb3J0IHsgVkFTVFJlc3BvbnNlIH0gZnJvbSAnLi4vdmFzdF9yZXNwb25zZSc7XG5cbmNvbnN0IERFRkFVTFRfTUFYX1dSQVBQRVJfREVQVEggPSAxMDtcbmNvbnN0IERFRkFVTFRfRVZFTlRfREFUQSA9IHtcbiAgRVJST1JDT0RFOiA5MDAsXG4gIGV4dGVuc2lvbnM6IFtdXG59O1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgcHJvdmlkZXMgbWV0aG9kcyB0byBmZXRjaCBhbmQgcGFyc2UgYSBWQVNUIGRvY3VtZW50LlxuICogQGV4cG9ydFxuICogQGNsYXNzIFZBU1RQYXJzZXJcbiAqIEBleHRlbmRzIEV2ZW50RW1pdHRlclxuICovXG5leHBvcnQgY2xhc3MgVkFTVFBhcnNlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFZBU1RQYXJzZXIuXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMucmVtYWluaW5nQWRzID0gW107XG4gICAgdGhpcy5wYXJlbnRVUkxzID0gW107XG4gICAgdGhpcy5lcnJvclVSTFRlbXBsYXRlcyA9IFtdO1xuICAgIHRoaXMucm9vdEVycm9yVVJMVGVtcGxhdGVzID0gW107XG4gICAgdGhpcy5tYXhXcmFwcGVyRGVwdGggPSBudWxsO1xuICAgIHRoaXMuVVJMVGVtcGxhdGVGaWx0ZXJzID0gW107XG4gICAgdGhpcy5mZXRjaGluZ09wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgZmlsdGVyIGZ1bmN0aW9uIHRvIHRoZSBhcnJheSBvZiBmaWx0ZXJzIHdoaWNoIGFyZSBjYWxsZWQgYmVmb3JlIGZldGNoaW5nIGEgVkFTVCBkb2N1bWVudC5cbiAgICogQHBhcmFtICB7ZnVuY3Rpb259IGZpbHRlciAtIFRoZSBmaWx0ZXIgZnVuY3Rpb24gdG8gYmUgYWRkZWQgYXQgdGhlIGVuZCBvZiB0aGUgYXJyYXkuXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBhZGRVUkxUZW1wbGF0ZUZpbHRlcihmaWx0ZXIpIHtcbiAgICBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5VUkxUZW1wbGF0ZUZpbHRlcnMucHVzaChmaWx0ZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBsYXN0IGVsZW1lbnQgb2YgdGhlIHVybCB0ZW1wbGF0ZXMgZmlsdGVycyBhcnJheS5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIHJlbW92ZVVSTFRlbXBsYXRlRmlsdGVyKCkge1xuICAgIHRoaXMuVVJMVGVtcGxhdGVGaWx0ZXJzLnBvcCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBmaWx0ZXJzIG9mIHRoZSB1cmwgdGVtcGxhdGVzIGZpbHRlcnMgYXJyYXkuXG4gICAqIEByZXR1cm4ge051bWJlcn1cbiAgICovXG4gIGNvdW50VVJMVGVtcGxhdGVGaWx0ZXJzKCkge1xuICAgIHJldHVybiB0aGlzLlVSTFRlbXBsYXRlRmlsdGVycy5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgdGhlIGZpbHRlciBmdW5jdGlvbnMgZnJvbSB0aGUgdXJsIHRlbXBsYXRlcyBmaWx0ZXJzIGFycmF5LlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgY2xlYXJVUkxUZW1wbGF0ZUZpbHRlcnMoKSB7XG4gICAgdGhpcy5VUkxUZW1wbGF0ZUZpbHRlcnMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFja3MgdGhlIGVycm9yIHByb3ZpZGVkIGluIHRoZSBlcnJvckNvZGUgcGFyYW1ldGVyIGFuZCBlbWl0cyBhIFZBU1QtZXJyb3IgZXZlbnQgZm9yIHRoZSBnaXZlbiBlcnJvci5cbiAgICogQHBhcmFtICB7QXJyYXl9IHVybFRlbXBsYXRlcyAtIEFuIEFycmF5IG9mIHVybCB0ZW1wbGF0ZXMgdG8gdXNlIHRvIG1ha2UgdGhlIHRyYWNraW5nIGNhbGwuXG4gICAqIEBwYXJhbSAge09iamVjdH0gZXJyb3JDb2RlIC0gQW4gT2JqZWN0IGNvbnRhaW5pbmcgdGhlIGVycm9yIGRhdGEuXG4gICAqIEBwYXJhbSAge09iamVjdH0gZGF0YSAtIE9uZSAob3IgbW9yZSkgT2JqZWN0IGNvbnRhaW5pbmcgYWRkaXRpb25hbCBkYXRhLlxuICAgKiBAZW1pdHMgIFZBU1RQYXJzZXIjVkFTVC1lcnJvclxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgdHJhY2tWYXN0RXJyb3IodXJsVGVtcGxhdGVzLCBlcnJvckNvZGUsIC4uLmRhdGEpIHtcbiAgICB0aGlzLmVtaXQoXG4gICAgICAnVkFTVC1lcnJvcicsXG4gICAgICBPYmplY3QuYXNzaWduKERFRkFVTFRfRVZFTlRfREFUQSwgZXJyb3JDb2RlLCAuLi5kYXRhKVxuICAgICk7XG4gICAgdXRpbC50cmFjayh1cmxUZW1wbGF0ZXMsIGVycm9yQ29kZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBhcnJheSBvZiBlcnJvclVSTFRlbXBsYXRlcyBmb3IgdGhlIFZBU1QgYmVpbmcgcGFyc2VkLlxuICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICovXG4gIGdldEVycm9yVVJMVGVtcGxhdGVzKCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFcnJvclVSTFRlbXBsYXRlcy5jb25jYXQodGhpcy5lcnJvclVSTFRlbXBsYXRlcyk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2hlcyBhIFZBU1QgZG9jdW1lbnQgZm9yIHRoZSBnaXZlbiB1cmwuXG4gICAqIFJldHVybnMgYSBQcm9taXNlIHdoaWNoIHJlc29sdmVzLHJlamVjdHMgYWNjb3JkaW5nIHRvIHRoZSByZXN1bHQgb2YgdGhlIHJlcXVlc3QuXG4gICAqIEBwYXJhbSAge1N0cmluZ30gdXJsIC0gVGhlIHVybCB0byByZXF1ZXN0IHRoZSBWQVNUIGRvY3VtZW50LlxuICAgKiBAcGFyYW0ge051bWJlcn0gd3JhcHBlckRlcHRoIC0gaG93IG1hbnkgdGltZXMgdGhlIGN1cnJlbnQgdXJsIGhhcyBiZWVuIHdyYXBwZWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9yaWdpbmFsVXJsIC0gdXJsIG9mIG9yaWdpbmFsIHdyYXBwZXJcbiAgICogQGVtaXRzICBWQVNUUGFyc2VyI1ZBU1QtcmVzb2x2aW5nXG4gICAqIEBlbWl0cyAgVkFTVFBhcnNlciNWQVNULXJlc29sdmVkXG4gICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAqL1xuICBmZXRjaFZBU1QodXJsLCB3cmFwcGVyRGVwdGgsIG9yaWdpbmFsVXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIFByb2Nlc3MgdXJsIHdpdGggZGVmaW5lZCBmaWx0ZXJcbiAgICAgIHRoaXMuVVJMVGVtcGxhdGVGaWx0ZXJzLmZvckVhY2goZmlsdGVyID0+IHtcbiAgICAgICAgdXJsID0gZmlsdGVyKHVybCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5wYXJlbnRVUkxzLnB1c2godXJsKTtcbiAgICAgIHRoaXMuZW1pdCgnVkFTVC1yZXNvbHZpbmcnLCB7IHVybCwgd3JhcHBlckRlcHRoLCBvcmlnaW5hbFVybCB9KTtcblxuICAgICAgdGhpcy51cmxIYW5kbGVyLmdldCh1cmwsIHRoaXMuZmV0Y2hpbmdPcHRpb25zLCAoZXJyLCB4bWwpID0+IHtcbiAgICAgICAgdGhpcy5lbWl0KCdWQVNULXJlc29sdmVkJywgeyB1cmwsIGVycm9yOiBlcnIgfSk7XG5cbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoeG1sKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdHMgdGhlIHBhcnNpbmcgcHJvcGVydGllcyBvZiB0aGUgY2xhc3Mgd2l0aCB0aGUgY3VzdG9tIHZhbHVlcyBwcm92aWRlZCBhcyBvcHRpb25zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIHRvIGluaXRpYWxpemUgYSBwYXJzaW5nIHNlcXVlbmNlXG4gICAqL1xuICBpbml0UGFyc2luZ1N0YXR1cyhvcHRpb25zID0ge30pIHtcbiAgICB0aGlzLnJvb3RVUkwgPSAnJztcbiAgICB0aGlzLnJlbWFpbmluZ0FkcyA9IFtdO1xuICAgIHRoaXMucGFyZW50VVJMcyA9IFtdO1xuICAgIHRoaXMuZXJyb3JVUkxUZW1wbGF0ZXMgPSBbXTtcbiAgICB0aGlzLnJvb3RFcnJvclVSTFRlbXBsYXRlcyA9IFtdO1xuICAgIHRoaXMubWF4V3JhcHBlckRlcHRoID0gb3B0aW9ucy53cmFwcGVyTGltaXQgfHwgREVGQVVMVF9NQVhfV1JBUFBFUl9ERVBUSDtcbiAgICB0aGlzLmZldGNoaW5nT3B0aW9ucyA9IHtcbiAgICAgIHRpbWVvdXQ6IG9wdGlvbnMudGltZW91dCxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogb3B0aW9ucy53aXRoQ3JlZGVudGlhbHNcbiAgICB9O1xuXG4gICAgdGhpcy51cmxIYW5kbGVyID0gb3B0aW9ucy51cmxIYW5kbGVyIHx8IG9wdGlvbnMudXJsaGFuZGxlciB8fCB1cmxIYW5kbGVyO1xuICAgIHRoaXMudmFzdFZlcnNpb24gPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc29sdmVzIHRoZSBuZXh0IGdyb3VwIG9mIGFkcy4gSWYgYWxsIGlzIHRydWUgcmVzb2x2ZXMgYWxsIHRoZSByZW1haW5pbmcgYWRzLlxuICAgKiBAcGFyYW0gIHtCb29sZWFufSBhbGwgLSBJZiB0cnVlIGFsbCB0aGUgcmVtYWluaW5nIGFkcyBhcmUgcmVzb2x2ZWRcbiAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICovXG4gIGdldFJlbWFpbmluZ0FkcyhhbGwpIHtcbiAgICBpZiAodGhpcy5yZW1haW5pbmdBZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXG4gICAgICAgIG5ldyBFcnJvcignTm8gbW9yZSBhZHMgYXJlIGF2YWlsYWJsZSBmb3IgdGhlIGdpdmVuIFZBU1QnKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBhZHMgPSBhbGxcbiAgICAgID8gdXRpbC5mbGF0dGVuKHRoaXMucmVtYWluaW5nQWRzKVxuICAgICAgOiB0aGlzLnJlbWFpbmluZ0Fkcy5zaGlmdCgpO1xuICAgIHRoaXMuZXJyb3JVUkxUZW1wbGF0ZXMgPSBbXTtcbiAgICB0aGlzLnBhcmVudFVSTHMgPSBbXTtcblxuICAgIHJldHVybiB0aGlzLnJlc29sdmVBZHMoYWRzLCB7XG4gICAgICB3cmFwcGVyRGVwdGg6IDAsXG4gICAgICBvcmlnaW5hbFVybDogdGhpcy5yb290VVJMXG4gICAgfSkudGhlbihyZXNvbHZlZEFkcyA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5idWlsZFZBU1RSZXNwb25zZShyZXNvbHZlZEFkcyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2hlcyBhbmQgcGFyc2VzIGEgVkFTVCBmb3IgdGhlIGdpdmVuIHVybC5cbiAgICogUmV0dXJucyBhIFByb21pc2Ugd2hpY2ggcmVzb2x2ZXMgd2l0aCBhIGZ1bGx5IHBhcnNlZCBWQVNUUmVzcG9uc2Ugb3IgcmVqZWN0cyB3aXRoIGFuIEVycm9yLlxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHVybCAtIFRoZSB1cmwgdG8gcmVxdWVzdCB0aGUgVkFTVCBkb2N1bWVudC5cbiAgICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zIC0gQW4gb3B0aW9uYWwgT2JqZWN0IG9mIHBhcmFtZXRlcnMgdG8gYmUgdXNlZCBpbiB0aGUgcGFyc2luZyBwcm9jZXNzLlxuICAgKiBAZW1pdHMgIFZBU1RQYXJzZXIjVkFTVC1yZXNvbHZpbmdcbiAgICogQGVtaXRzICBWQVNUUGFyc2VyI1ZBU1QtcmVzb2x2ZWRcbiAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICovXG4gIGdldEFuZFBhcnNlVkFTVCh1cmwsIG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuaW5pdFBhcnNpbmdTdGF0dXMob3B0aW9ucyk7XG4gICAgdGhpcy5yb290VVJMID0gdXJsO1xuXG4gICAgcmV0dXJuIHRoaXMuZmV0Y2hWQVNUKHVybCkudGhlbih4bWwgPT4ge1xuICAgICAgb3B0aW9ucy5vcmlnaW5hbFVybCA9IHVybDtcbiAgICAgIG9wdGlvbnMuaXNSb290VkFTVCA9IHRydWU7XG5cbiAgICAgIHJldHVybiB0aGlzLnBhcnNlKHhtbCwgb3B0aW9ucykudGhlbihhZHMgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5idWlsZFZBU1RSZXNwb25zZShhZHMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUGFyc2VzIHRoZSBnaXZlbiB4bWwgT2JqZWN0IGludG8gYSBWQVNUUmVzcG9uc2UuXG4gICAqIFJldHVybnMgYSBQcm9taXNlIHdoaWNoIHJlc29sdmVzIHdpdGggYSBmdWxseSBwYXJzZWQgVkFTVFJlc3BvbnNlIG9yIHJlamVjdHMgd2l0aCBhbiBFcnJvci5cbiAgICogQHBhcmFtICB7T2JqZWN0fSB2YXN0WG1sIC0gQW4gb2JqZWN0IHJlcHJlc2VudGluZyBhIHZhc3QgeG1sIGRvY3VtZW50LlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnMgLSBBbiBvcHRpb25hbCBPYmplY3Qgb2YgcGFyYW1ldGVycyB0byBiZSB1c2VkIGluIHRoZSBwYXJzaW5nIHByb2Nlc3MuXG4gICAqIEBlbWl0cyAgVkFTVFBhcnNlciNWQVNULXJlc29sdmluZ1xuICAgKiBAZW1pdHMgIFZBU1RQYXJzZXIjVkFTVC1yZXNvbHZlZFxuICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgKi9cbiAgcGFyc2VWQVNUKHZhc3RYbWwsIG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuaW5pdFBhcnNpbmdTdGF0dXMob3B0aW9ucyk7XG5cbiAgICBvcHRpb25zLmlzUm9vdFZBU1QgPSB0cnVlO1xuXG4gICAgcmV0dXJuIHRoaXMucGFyc2UodmFzdFhtbCwgb3B0aW9ucykudGhlbihhZHMgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuYnVpbGRWQVNUUmVzcG9uc2UoYWRzKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZHMgYSBWQVNUUmVzcG9uc2Ugd2hpY2ggY2FuIGJlIHJldHVybmVkLlxuICAgKiBAcGFyYW0gIHtBcnJheX0gYWRzIC0gQW4gQXJyYXkgb2YgdW53cmFwcGVkIGFkc1xuICAgKiBAcmV0dXJuIHtWQVNUUmVzcG9uc2V9XG4gICAqL1xuICBidWlsZFZBU1RSZXNwb25zZShhZHMpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IG5ldyBWQVNUUmVzcG9uc2UoKTtcbiAgICByZXNwb25zZS5hZHMgPSBhZHM7XG4gICAgcmVzcG9uc2UuZXJyb3JVUkxUZW1wbGF0ZXMgPSB0aGlzLmdldEVycm9yVVJMVGVtcGxhdGVzKCk7XG4gICAgcmVzcG9uc2UudmVyc2lvbiA9IHRoaXMudmFzdFZlcnNpb247XG4gICAgdGhpcy5jb21wbGV0ZVdyYXBwZXJSZXNvbHZpbmcocmVzcG9uc2UpO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUgZ2l2ZW4geG1sIE9iamVjdCBpbnRvIGFuIGFycmF5IG9mIGFkc1xuICAgKiBSZXR1cm5zIHRoZSBhcnJheSBvciB0aHJvd3MgYW4gYEVycm9yYCBpZiBhbiBpbnZhbGlkIFZBU1QgWE1MIGlzIHByb3ZpZGVkXG4gICAqIEBwYXJhbSAge09iamVjdH0gdmFzdFhtbCAtIEFuIG9iamVjdCByZXByZXNlbnRpbmcgYW4geG1sIGRvY3VtZW50LlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnMgLSBBbiBvcHRpb25hbCBPYmplY3Qgb2YgcGFyYW1ldGVycyB0byBiZSB1c2VkIGluIHRoZSBwYXJzaW5nIHByb2Nlc3MuXG4gICAqIEByZXR1cm4ge0FycmF5fVxuICAgKiBAdGhyb3dzIHtFcnJvcn0gYHZhc3RYbWxgIG11c3QgYmUgYSB2YWxpZCBWQVNUIFhNTERvY3VtZW50XG4gICAqL1xuICBwYXJzZVZhc3RYbWwodmFzdFhtbCwgeyBpc1Jvb3RWQVNUID0gZmFsc2UgfSkge1xuICAgIC8vIGNoZWNrIGlmIGlzIGEgdmFsaWQgVkFTVCBkb2N1bWVudFxuICAgIGlmIChcbiAgICAgICF2YXN0WG1sIHx8XG4gICAgICAhdmFzdFhtbC5kb2N1bWVudEVsZW1lbnQgfHxcbiAgICAgIHZhc3RYbWwuZG9jdW1lbnRFbGVtZW50Lm5vZGVOYW1lICE9PSAnVkFTVCdcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBWQVNUIFhNTERvY3VtZW50Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgYWRzID0gW107XG4gICAgY29uc3QgY2hpbGROb2RlcyA9IHZhc3RYbWwuZG9jdW1lbnRFbGVtZW50LmNoaWxkTm9kZXM7XG5cbiAgICAvKiBPbmx5IHBhcnNlIHRoZSB2ZXJzaW9uIG9mIHRoZSBSb290IFZBU1QgZm9yIG5vdyBiZWNhdXNlIHdlIGRvbid0IGtub3cgeWV0IGhvdyB0b1xuICAgICAgIGhhbmRsZSBzb21lIGNhc2VzIGxpa2UgbXVsdGlwbGUgd3JhcHBlcnMgaW4gdGhlIHNhbWUgdmFzdFxuICAgICovXG4gICAgaWYgKGlzUm9vdFZBU1QpIHtcbiAgICAgIGNvbnN0IHZhc3RWZXJzaW9uID0gdmFzdFhtbC5kb2N1bWVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCd2ZXJzaW9uJyk7XG4gICAgICBpZiAodmFzdFZlcnNpb24pIHRoaXMudmFzdFZlcnNpb24gPSB2YXN0VmVyc2lvbjtcbiAgICB9XG5cbiAgICAvLyBGaWxsIHRoZSBWQVNUUmVzcG9uc2Ugb2JqZWN0IHdpdGggYWRzIGFuZCBlcnJvclVSTFRlbXBsYXRlc1xuICAgIGZvciAoY29uc3Qgbm9kZUtleSBpbiBjaGlsZE5vZGVzKSB7XG4gICAgICBjb25zdCBub2RlID0gY2hpbGROb2Rlc1tub2RlS2V5XTtcblxuICAgICAgaWYgKG5vZGUubm9kZU5hbWUgPT09ICdFcnJvcicpIHtcbiAgICAgICAgY29uc3QgZXJyb3JVUkxUZW1wbGF0ZSA9IHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQobm9kZSk7XG5cbiAgICAgICAgLy8gRGlzdGluZ3Vpc2ggcm9vdCBWQVNUIHVybCB0ZW1wbGF0ZXMgZnJvbSBhZCBzcGVjaWZpYyBvbmVzXG4gICAgICAgIGlzUm9vdFZBU1RcbiAgICAgICAgICA/IHRoaXMucm9vdEVycm9yVVJMVGVtcGxhdGVzLnB1c2goZXJyb3JVUkxUZW1wbGF0ZSlcbiAgICAgICAgICA6IHRoaXMuZXJyb3JVUkxUZW1wbGF0ZXMucHVzaChlcnJvclVSTFRlbXBsYXRlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUubm9kZU5hbWUgPT09ICdBZCcpIHtcbiAgICAgICAgY29uc3QgYWQgPSBwYXJzZUFkKG5vZGUpO1xuXG4gICAgICAgIGlmIChhZCkge1xuICAgICAgICAgIGFkcy5wdXNoKGFkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBWQVNUIHZlcnNpb24gb2YgcmVzcG9uc2Ugbm90IHN1cHBvcnRlZC5cbiAgICAgICAgICB0aGlzLnRyYWNrVmFzdEVycm9yKHRoaXMuZ2V0RXJyb3JVUkxUZW1wbGF0ZXMoKSwge1xuICAgICAgICAgICAgRVJST1JDT0RFOiAxMDFcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhZHM7XG4gIH1cblxuICAvKipcbiAgICogUGFyc2VzIHRoZSBnaXZlbiB4bWwgT2JqZWN0IGludG8gYW4gYXJyYXkgb2YgdW53cmFwcGVkIGFkcy5cbiAgICogUmV0dXJucyBhIFByb21pc2Ugd2hpY2ggcmVzb2x2ZXMgd2l0aCB0aGUgYXJyYXkgb3IgcmVqZWN0cyB3aXRoIGFuIGVycm9yIGFjY29yZGluZyB0byB0aGUgcmVzdWx0IG9mIHRoZSBwYXJzaW5nLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IHZhc3RYbWwgLSBBbiBvYmplY3QgcmVwcmVzZW50aW5nIGFuIHhtbCBkb2N1bWVudC5cbiAgICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zIC0gQW4gb3B0aW9uYWwgT2JqZWN0IG9mIHBhcmFtZXRlcnMgdG8gYmUgdXNlZCBpbiB0aGUgcGFyc2luZyBwcm9jZXNzLlxuICAgKiBAZW1pdHMgIFZBU1RQYXJzZXIjVkFTVC1yZXNvbHZpbmdcbiAgICogQGVtaXRzICBWQVNUUGFyc2VyI1ZBU1QtcmVzb2x2ZWRcbiAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICovXG4gIHBhcnNlKFxuICAgIHZhc3RYbWwsXG4gICAge1xuICAgICAgcmVzb2x2ZUFsbCA9IHRydWUsXG4gICAgICB3cmFwcGVyU2VxdWVuY2UgPSBudWxsLFxuICAgICAgb3JpZ2luYWxVcmwgPSBudWxsLFxuICAgICAgd3JhcHBlckRlcHRoID0gMCxcbiAgICAgIGlzUm9vdFZBU1QgPSBmYWxzZVxuICAgIH1cbiAgKSB7XG4gICAgbGV0IGFkcyA9IFtdO1xuICAgIHRyeSB7XG4gICAgICBhZHMgPSB0aGlzLnBhcnNlVmFzdFhtbCh2YXN0WG1sLCB7IGlzUm9vdFZBU1QgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpO1xuICAgIH1cblxuICAgIGNvbnN0IGFkc0NvdW50ID0gYWRzLmxlbmd0aDtcbiAgICBjb25zdCBsYXN0QWRkZWRBZCA9IGFkc1thZHNDb3VudCAtIDFdO1xuICAgIC8vIGlmIGluIGNoaWxkIG5vZGVzIHdlIGhhdmUgb25seSBvbmUgYWRzXG4gICAgLy8gYW5kIHdyYXBwZXJTZXF1ZW5jZSBpcyBkZWZpbmVkXG4gICAgLy8gYW5kIHRoaXMgYWRzIGRvZXNuJ3QgYWxyZWFkeSBoYXZlIHNlcXVlbmNlXG4gICAgaWYgKFxuICAgICAgYWRzQ291bnQgPT09IDEgJiZcbiAgICAgIHdyYXBwZXJTZXF1ZW5jZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICB3cmFwcGVyU2VxdWVuY2UgIT09IG51bGwgJiZcbiAgICAgIGxhc3RBZGRlZEFkICYmXG4gICAgICAhbGFzdEFkZGVkQWQuc2VxdWVuY2VcbiAgICApIHtcbiAgICAgIGxhc3RBZGRlZEFkLnNlcXVlbmNlID0gd3JhcHBlclNlcXVlbmNlO1xuICAgIH1cblxuICAgIC8vIFNwbGl0IHRoZSBWQVNUIGluIGNhc2Ugd2UgZG9uJ3Qgd2FudCB0byByZXNvbHZlIGV2ZXJ5dGhpbmcgYXQgdGhlIGZpcnN0IHRpbWVcbiAgICBpZiAocmVzb2x2ZUFsbCA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMucmVtYWluaW5nQWRzID0gcGFyc2VyVXRpbHMuc3BsaXRWQVNUKGFkcyk7XG4gICAgICAvLyBSZW1vdmUgdGhlIGZpcnN0IGVsZW1lbnQgZnJvbSB0aGUgcmVtYWluaW5nIGFkcyBhcnJheSwgc2luY2Ugd2UncmUgZ29pbmcgdG8gcmVzb2x2ZSB0aGF0IGVsZW1lbnRcbiAgICAgIGFkcyA9IHRoaXMucmVtYWluaW5nQWRzLnNoaWZ0KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVzb2x2ZUFkcyhhZHMsIHsgd3JhcHBlckRlcHRoLCBvcmlnaW5hbFVybCB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNvbHZlcyBhbiBBcnJheSBvZiBhZHMsIHJlY3Vyc2l2ZWx5IGNhbGxpbmcgaXRzZWxmIHdpdGggdGhlIHJlbWFpbmluZyBhZHMgaWYgYSBubyBhZFxuICAgKiByZXNwb25zZSBpcyByZXR1cm5lZCBmb3IgdGhlIGdpdmVuIGFycmF5LlxuICAgKiBAcGFyYW0ge0FycmF5fSBhZHMgLSBBbiBhcnJheSBvZiBhZHMgdG8gcmVzb2x2ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIEFuIG9wdGlvbnMgT2JqZWN0IGNvbnRhaW5pbmcgcmVzb2x2aW5nIHBhcmFtZXRlcnNcbiAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICovXG4gIHJlc29sdmVBZHMoYWRzID0gW10sIHsgd3JhcHBlckRlcHRoLCBvcmlnaW5hbFVybCB9KSB7XG4gICAgY29uc3QgcmVzb2x2ZVdyYXBwZXJzUHJvbWlzZXMgPSBbXTtcblxuICAgIGFkcy5mb3JFYWNoKGFkID0+IHtcbiAgICAgIGNvbnN0IHJlc29sdmVXcmFwcGVyc1Byb21pc2UgPSB0aGlzLnJlc29sdmVXcmFwcGVycyhcbiAgICAgICAgYWQsXG4gICAgICAgIHdyYXBwZXJEZXB0aCxcbiAgICAgICAgb3JpZ2luYWxVcmxcbiAgICAgICk7XG5cbiAgICAgIHJlc29sdmVXcmFwcGVyc1Byb21pc2VzLnB1c2gocmVzb2x2ZVdyYXBwZXJzUHJvbWlzZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocmVzb2x2ZVdyYXBwZXJzUHJvbWlzZXMpLnRoZW4odW53cmFwcGVkQWRzID0+IHtcbiAgICAgIGNvbnN0IHJlc29sdmVkQWRzID0gdXRpbC5mbGF0dGVuKHVud3JhcHBlZEFkcyk7XG5cbiAgICAgIGlmICghcmVzb2x2ZWRBZHMgJiYgdGhpcy5yZW1haW5pbmdBZHMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCByZW1haW5pbmdBZHNUb1Jlc29sdmUgPSB0aGlzLnJlbWFpbmluZ0Fkcy5zaGlmdCgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnJlc29sdmVBZHMocmVtYWluaW5nQWRzVG9SZXNvbHZlLCB7XG4gICAgICAgICAgd3JhcHBlckRlcHRoLFxuICAgICAgICAgIG9yaWdpbmFsVXJsXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzb2x2ZWRBZHM7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVzb2x2ZXMgdGhlIHdyYXBwZXJzIGZvciB0aGUgZ2l2ZW4gYWQgaW4gYSByZWN1cnNpdmUgd2F5LlxuICAgKiBSZXR1cm5zIGEgUHJvbWlzZSB3aGljaCByZXNvbHZlcyB3aXRoIHRoZSB1bndyYXBwZWQgYWQgb3IgcmVqZWN0cyB3aXRoIGFuIGVycm9yLlxuICAgKiBAcGFyYW0gIHtBZH0gYWQgLSBBbiBhZCB0byBiZSB1bndyYXBwZWQuXG4gICAqIEBwYXJhbSAge051bWJlcn0gd3JhcHBlckRlcHRoIC0gVGhlIHJlYWNoZWQgZGVwdGggaW4gdGhlIHdyYXBwZXIgcmVzb2x2aW5nIGNoYWluLlxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IG9yaWdpbmFsVXJsIC0gVGhlIG9yaWdpbmFsIHZhc3QgdXJsLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgKi9cbiAgcmVzb2x2ZVdyYXBwZXJzKGFkLCB3cmFwcGVyRGVwdGgsIG9yaWdpbmFsVXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgLy8gR29pbmcgb25lIGxldmVsIGRlZXBlciBpbiB0aGUgd3JhcHBlciBjaGFpblxuICAgICAgd3JhcHBlckRlcHRoKys7XG4gICAgICAvLyBXZSBhbHJlYWR5IGhhdmUgYSByZXNvbHZlZCBWQVNUIGFkLCBubyBuZWVkIHRvIHJlc29sdmUgd3JhcHBlclxuICAgICAgaWYgKCFhZC5uZXh0V3JhcHBlclVSTCkge1xuICAgICAgICBkZWxldGUgYWQubmV4dFdyYXBwZXJVUkw7XG4gICAgICAgIHJldHVybiByZXNvbHZlKGFkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICB3cmFwcGVyRGVwdGggPj0gdGhpcy5tYXhXcmFwcGVyRGVwdGggfHxcbiAgICAgICAgdGhpcy5wYXJlbnRVUkxzLmluZGV4T2YoYWQubmV4dFdyYXBwZXJVUkwpICE9PSAtMVxuICAgICAgKSB7XG4gICAgICAgIC8vIFdyYXBwZXIgbGltaXQgcmVhY2hlZCwgYXMgZGVmaW5lZCBieSB0aGUgdmlkZW8gcGxheWVyLlxuICAgICAgICAvLyBUb28gbWFueSBXcmFwcGVyIHJlc3BvbnNlcyBoYXZlIGJlZW4gcmVjZWl2ZWQgd2l0aCBubyBJbkxpbmUgcmVzcG9uc2UuXG4gICAgICAgIGFkLmVycm9yQ29kZSA9IDMwMjtcbiAgICAgICAgZGVsZXRlIGFkLm5leHRXcmFwcGVyVVJMO1xuICAgICAgICByZXR1cm4gcmVzb2x2ZShhZCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEdldCBmdWxsIFVSTFxuICAgICAgYWQubmV4dFdyYXBwZXJVUkwgPSBwYXJzZXJVdGlscy5yZXNvbHZlVmFzdEFkVGFnVVJJKFxuICAgICAgICBhZC5uZXh0V3JhcHBlclVSTCxcbiAgICAgICAgb3JpZ2luYWxVcmxcbiAgICAgICk7XG5cbiAgICAgIC8vIHNlcXVlbmNlIGRvZXNuJ3QgY2Fycnkgb3ZlciBpbiB3cmFwcGVyIGVsZW1lbnRcbiAgICAgIGNvbnN0IHdyYXBwZXJTZXF1ZW5jZSA9IGFkLnNlcXVlbmNlO1xuICAgICAgb3JpZ2luYWxVcmwgPSBhZC5uZXh0V3JhcHBlclVSTDtcblxuICAgICAgdGhpcy5mZXRjaFZBU1QoYWQubmV4dFdyYXBwZXJVUkwsIHdyYXBwZXJEZXB0aCwgb3JpZ2luYWxVcmwpXG4gICAgICAgIC50aGVuKHhtbCA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2UoeG1sLCB7XG4gICAgICAgICAgICBvcmlnaW5hbFVybCxcbiAgICAgICAgICAgIHdyYXBwZXJTZXF1ZW5jZSxcbiAgICAgICAgICAgIHdyYXBwZXJEZXB0aFxuICAgICAgICAgIH0pLnRoZW4odW53cmFwcGVkQWRzID0+IHtcbiAgICAgICAgICAgIGRlbGV0ZSBhZC5uZXh0V3JhcHBlclVSTDtcbiAgICAgICAgICAgIGlmICh1bndyYXBwZWRBZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIC8vIE5vIGFkcyByZXR1cm5lZCBieSB0aGUgd3JhcHBlZFJlc3BvbnNlLCBkaXNjYXJkIGN1cnJlbnQgPEFkPjxXcmFwcGVyPiBjcmVhdGl2ZXNcbiAgICAgICAgICAgICAgYWQuY3JlYXRpdmVzID0gW107XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGFkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdW53cmFwcGVkQWRzLmZvckVhY2godW53cmFwcGVkQWQgPT4ge1xuICAgICAgICAgICAgICBpZiAodW53cmFwcGVkQWQpIHtcbiAgICAgICAgICAgICAgICBwYXJzZXJVdGlscy5tZXJnZVdyYXBwZXJBZERhdGEodW53cmFwcGVkQWQsIGFkKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJlc29sdmUodW53cmFwcGVkQWRzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgLy8gVGltZW91dCBvZiBWQVNUIFVSSSBwcm92aWRlZCBpbiBXcmFwcGVyIGVsZW1lbnQsIG9yIG9mIFZBU1QgVVJJIHByb3ZpZGVkIGluIGEgc3Vic2VxdWVudCBXcmFwcGVyIGVsZW1lbnQuXG4gICAgICAgICAgLy8gKFVSSSB3YXMgZWl0aGVyIHVuYXZhaWxhYmxlIG9yIHJlYWNoZWQgYSB0aW1lb3V0IGFzIGRlZmluZWQgYnkgdGhlIHZpZGVvIHBsYXllci4pXG4gICAgICAgICAgYWQuZXJyb3JDb2RlID0gMzAxO1xuICAgICAgICAgIGFkLmVycm9yTWVzc2FnZSA9IGVyci5tZXNzYWdlO1xuXG4gICAgICAgICAgcmVzb2x2ZShhZCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRha2VzIGNhcmUgb2YgaGFuZGxpbmcgZXJyb3JzIHdoZW4gdGhlIHdyYXBwZXJzIGFyZSByZXNvbHZlZC5cbiAgICogQHBhcmFtIHtWQVNUUmVzcG9uc2V9IHZhc3RSZXNwb25zZSAtIEEgcmVzb2x2ZWQgVkFTVFJlc3BvbnNlLlxuICAgKi9cbiAgY29tcGxldGVXcmFwcGVyUmVzb2x2aW5nKHZhc3RSZXNwb25zZSkge1xuICAgIC8vIFdlJ3ZlIHRvIHdhaXQgZm9yIGFsbCA8QWQ+IGVsZW1lbnRzIHRvIGJlIHBhcnNlZCBiZWZvcmUgaGFuZGxpbmcgZXJyb3Igc28gd2UgY2FuOlxuICAgIC8vIC0gU2VuZCBjb21wdXRlZCBleHRlbnNpb25zIGRhdGFcbiAgICAvLyAtIFBpbmcgYWxsIDxFcnJvcj4gVVJJcyBkZWZpbmVkIGFjcm9zcyBWQVNUIGZpbGVzXG5cbiAgICAvLyBObyBBZCBjYXNlIC0gVGhlIHBhcnNlciBuZXZlciBidW1wIGludG8gYW4gPEFkPiBlbGVtZW50XG4gICAgaWYgKHZhc3RSZXNwb25zZS5hZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLnRyYWNrVmFzdEVycm9yKHZhc3RSZXNwb25zZS5lcnJvclVSTFRlbXBsYXRlcywgeyBFUlJPUkNPREU6IDMwMyB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaW5kZXggPSB2YXN0UmVzcG9uc2UuYWRzLmxlbmd0aCAtIDE7IGluZGV4ID49IDA7IGluZGV4LS0pIHtcbiAgICAgICAgLy8gLSBFcnJvciBlbmNvdW50cmVkIHdoaWxlIHBhcnNpbmdcbiAgICAgICAgLy8gLSBObyBDcmVhdGl2ZSBjYXNlIC0gVGhlIHBhcnNlciBoYXMgZGVhbHQgd2l0aCBzb21hIDxBZD48V3JhcHBlcj4gb3IvYW5kIGFuIDxBZD48SW5saW5lPiBlbGVtZW50c1xuICAgICAgICAvLyBidXQgbm8gY3JlYXRpdmUgd2FzIGZvdW5kXG4gICAgICAgIGNvbnN0IGFkID0gdmFzdFJlc3BvbnNlLmFkc1tpbmRleF07XG4gICAgICAgIGlmIChhZC5lcnJvckNvZGUgfHwgYWQuY3JlYXRpdmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMudHJhY2tWYXN0RXJyb3IoXG4gICAgICAgICAgICBhZC5lcnJvclVSTFRlbXBsYXRlcy5jb25jYXQodmFzdFJlc3BvbnNlLmVycm9yVVJMVGVtcGxhdGVzKSxcbiAgICAgICAgICAgIHsgRVJST1JDT0RFOiBhZC5lcnJvckNvZGUgfHwgMzAzIH0sXG4gICAgICAgICAgICB7IEVSUk9STUVTU0FHRTogYWQuZXJyb3JNZXNzYWdlIHx8ICcnIH0sXG4gICAgICAgICAgICB7IGV4dGVuc2lvbnM6IGFkLmV4dGVuc2lvbnMgfSxcbiAgICAgICAgICAgIHsgc3lzdGVtOiBhZC5zeXN0ZW0gfVxuICAgICAgICAgICk7XG4gICAgICAgICAgdmFzdFJlc3BvbnNlLmFkcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBmbGFzaFVSTEhhbmRsZXIgfSBmcm9tICcuL3VybGhhbmRsZXJzL2ZsYXNoX3VybF9oYW5kbGVyJztcbmltcG9ydCB7IG5vZGVVUkxIYW5kbGVyIH0gZnJvbSAnLi91cmxoYW5kbGVycy9tb2NrX25vZGVfdXJsX2hhbmRsZXInO1xuaW1wb3J0IHsgWEhSVVJMSGFuZGxlciB9IGZyb20gJy4vdXJsaGFuZGxlcnMveGhyX3VybF9oYW5kbGVyJztcblxuZnVuY3Rpb24gZ2V0KHVybCwgb3B0aW9ucywgY2IpIHtcbiAgLy8gQWxsb3cgc2tpcCBvZiB0aGUgb3B0aW9ucyBwYXJhbVxuICBpZiAoIWNiKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYiA9IG9wdGlvbnM7XG4gICAgfVxuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCB3aW5kb3cgPT09IG51bGwpIHtcbiAgICByZXR1cm4gbm9kZVVSTEhhbmRsZXIuZ2V0KHVybCwgb3B0aW9ucywgY2IpO1xuICB9IGVsc2UgaWYgKFhIUlVSTEhhbmRsZXIuc3VwcG9ydGVkKCkpIHtcbiAgICByZXR1cm4gWEhSVVJMSGFuZGxlci5nZXQodXJsLCBvcHRpb25zLCBjYik7XG4gIH0gZWxzZSBpZiAoZmxhc2hVUkxIYW5kbGVyLnN1cHBvcnRlZCgpKSB7XG4gICAgcmV0dXJuIGZsYXNoVVJMSGFuZGxlci5nZXQodXJsLCBvcHRpb25zLCBjYik7XG4gIH1cbiAgcmV0dXJuIGNiKFxuICAgIG5ldyBFcnJvcihcbiAgICAgICdDdXJyZW50IGNvbnRleHQgaXMgbm90IHN1cHBvcnRlZCBieSBhbnkgb2YgdGhlIGRlZmF1bHQgVVJMSGFuZGxlcnMuIFBsZWFzZSBwcm92aWRlIGEgY3VzdG9tIFVSTEhhbmRsZXInXG4gICAgKVxuICApO1xufVxuXG5leHBvcnQgY29uc3QgdXJsSGFuZGxlciA9IHtcbiAgZ2V0XG59O1xuIiwiZnVuY3Rpb24geGRyKCkge1xuICBsZXQgcmVxdWVzdDtcbiAgaWYgKHdpbmRvdy5YRG9tYWluUmVxdWVzdCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIHJlcXVlc3QgPSBuZXcgWERvbWFpblJlcXVlc3QoKTtcbiAgfVxuICByZXR1cm4gcmVxdWVzdDtcbn1cblxuZnVuY3Rpb24gc3VwcG9ydGVkKCkge1xuICByZXR1cm4gISF4ZHIoKTtcbn1cblxuZnVuY3Rpb24gZ2V0KHVybCwgb3B0aW9ucywgY2IpIHtcbiAgY29uc3QgeG1sRG9jdW1lbnQgPVxuICAgIHR5cGVvZiB3aW5kb3cuQWN0aXZlWE9iamVjdCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgPyBuZXcgd2luZG93LkFjdGl2ZVhPYmplY3QoJ01pY3Jvc29mdC5YTUxET00nKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgaWYgKHhtbERvY3VtZW50KSB7XG4gICAgeG1sRG9jdW1lbnQuYXN5bmMgPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY2IoXG4gICAgICBuZXcgRXJyb3IoJ0ZsYXNoVVJMSGFuZGxlcjogTWljcm9zb2Z0LlhNTERPTSBmb3JtYXQgbm90IHN1cHBvcnRlZCcpXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IHJlcXVlc3QgPSB4ZHIoKTtcbiAgcmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwpO1xuICByZXF1ZXN0LnRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQgfHwgMDtcbiAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSBvcHRpb25zLndpdGhDcmVkZW50aWFscyB8fCBmYWxzZTtcbiAgcmVxdWVzdC5zZW5kKCk7XG4gIHJlcXVlc3Qub25wcm9ncmVzcyA9IGZ1bmN0aW9uKCkge307XG5cbiAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICB4bWxEb2N1bWVudC5sb2FkWE1MKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgICBjYihudWxsLCB4bWxEb2N1bWVudCk7XG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCBmbGFzaFVSTEhhbmRsZXIgPSB7XG4gIGdldCxcbiAgc3VwcG9ydGVkXG59O1xuIiwiLy8gVGhpcyBtb2NrIG1vZHVsZSBpcyBsb2FkZWQgaW4gc3RlYWQgb2YgdGhlIG9yaWdpbmFsIE5vZGVVUkxIYW5kbGVyIG1vZHVsZVxuLy8gd2hlbiBidW5kbGluZyB0aGUgbGlicmFyeSBmb3IgZW52aXJvbm1lbnRzIHdoaWNoIGFyZSBub3Qgbm9kZS5cbi8vIFRoaXMgYWxsb3dzIHVzIHRvIGF2b2lkIGJ1bmRsaW5nIHVzZWxlc3Mgbm9kZSBjb21wb25lbnRzIGFuZCBoYXZlIGEgc21hbGxlciBidWlsZC5cbmZ1bmN0aW9uIGdldCh1cmwsIG9wdGlvbnMsIGNiKSB7XG4gIGNiKFxuICAgIG5ldyBFcnJvcignUGxlYXNlIGJ1bmRsZSB0aGUgbGlicmFyeSBmb3Igbm9kZSB0byB1c2UgdGhlIG5vZGUgdXJsSGFuZGxlcicpXG4gICk7XG59XG5cbmV4cG9ydCBjb25zdCBub2RlVVJMSGFuZGxlciA9IHtcbiAgZ2V0XG59O1xuIiwiZnVuY3Rpb24geGhyKCkge1xuICB0cnkge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgaWYgKCd3aXRoQ3JlZGVudGlhbHMnIGluIHJlcXVlc3QpIHtcbiAgICAgIC8vIGNoZWNrIENPUlMgc3VwcG9ydFxuICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5mdW5jdGlvbiBzdXBwb3J0ZWQoKSB7XG4gIHJldHVybiAhIXhocigpO1xufVxuXG5mdW5jdGlvbiBnZXQodXJsLCBvcHRpb25zLCBjYikge1xuICBpZiAod2luZG93LmxvY2F0aW9uLnByb3RvY29sID09PSAnaHR0cHM6JyAmJiB1cmwuaW5kZXhPZignaHR0cDovLycpID09PSAwKSB7XG4gICAgcmV0dXJuIGNiKG5ldyBFcnJvcignWEhSVVJMSGFuZGxlcjogQ2Fubm90IGdvIGZyb20gSFRUUFMgdG8gSFRUUC4nKSk7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHJlcXVlc3QgPSB4aHIoKTtcblxuICAgIHJlcXVlc3Qub3BlbignR0VUJywgdXJsKTtcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQgfHwgMDtcbiAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9IG9wdGlvbnMud2l0aENyZWRlbnRpYWxzIHx8IGZhbHNlO1xuICAgIHJlcXVlc3Qub3ZlcnJpZGVNaW1lVHlwZSAmJiByZXF1ZXN0Lm92ZXJyaWRlTWltZVR5cGUoJ3RleHQveG1sJyk7XG4gICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICBjYihudWxsLCByZXF1ZXN0LnJlc3BvbnNlWE1MKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYihuZXcgRXJyb3IoYFhIUlVSTEhhbmRsZXI6ICR7cmVxdWVzdC5zdGF0dXNUZXh0fWApKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgcmVxdWVzdC5zZW5kKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY2IobmV3IEVycm9yKCdYSFJVUkxIYW5kbGVyOiBVbmV4cGVjdGVkIGVycm9yJykpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBYSFJVUkxIYW5kbGVyID0ge1xuICBnZXQsXG4gIHN1cHBvcnRlZFxufTtcbiIsImxldCBzdG9yYWdlID0gbnVsbDtcblxuLyoqXG4gKiBUaGlzIE9iamVjdCByZXByZXNlbnRzIGEgZGVmYXVsdCBzdG9yYWdlIHRvIGJlIHVzZWQgaW4gY2FzZSBubyBvdGhlciBzdG9yYWdlIGlzIGF2YWlsYWJsZS5cbiAqIEBjb25zdGFudFxuICogQHR5cGUge09iamVjdH1cbiAqL1xuY29uc3QgREVGQVVMVF9TVE9SQUdFID0ge1xuICBkYXRhOiB7fSxcbiAgbGVuZ3RoOiAwLFxuICBnZXRJdGVtKGtleSkge1xuICAgIHJldHVybiB0aGlzLmRhdGFba2V5XTtcbiAgfSxcbiAgc2V0SXRlbShrZXksIHZhbHVlKSB7XG4gICAgdGhpcy5kYXRhW2tleV0gPSB2YWx1ZTtcbiAgICB0aGlzLmxlbmd0aCA9IE9iamVjdC5rZXlzKHRoaXMuZGF0YSkubGVuZ3RoO1xuICB9LFxuICByZW1vdmVJdGVtKGtleSkge1xuICAgIGRlbGV0ZSB0aGlzLmRhdGFba2V5XTtcbiAgICB0aGlzLmxlbmd0aCA9IE9iamVjdC5rZXlzKHRoaXMuZGF0YSkubGVuZ3RoO1xuICB9LFxuICBjbGVhcigpIHtcbiAgICB0aGlzLmRhdGEgPSB7fTtcbiAgICB0aGlzLmxlbmd0aCA9IDA7XG4gIH1cbn07XG5cbi8qKlxuICogVGhpcyBjbGFzcyBwcm92aWRlcyBhbiB3cmFwcGVyIGludGVyZmFjZSB0byB0aGUgYSBrZXktdmFsdWUgc3RvcmFnZS5cbiAqIEl0IHVzZXMgbG9jYWxTdG9yYWdlLCBzZXNzaW9uU3RvcmFnZSBvciBhIGN1c3RvbSBzdG9yYWdlIGlmIG5vbmUgb2YgdGhlIHR3byBpcyBhdmFpbGFibGUuXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgU3RvcmFnZVxuICovXG5leHBvcnQgY2xhc3MgU3RvcmFnZSB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFN0b3JhZ2UuXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zdG9yYWdlID0gdGhpcy5pbml0U3RvcmFnZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb3ZpZGVzIGEgc2luZ2xldG9uIGluc3RhbmNlIG9mIHRoZSB3cmFwcGVkIHN0b3JhZ2UuXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGluaXRTdG9yYWdlKCkge1xuICAgIGlmIChzdG9yYWdlKSB7XG4gICAgICByZXR1cm4gc3RvcmFnZTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgc3RvcmFnZSA9XG4gICAgICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdyAhPT0gbnVsbFxuICAgICAgICAgID8gd2luZG93LmxvY2FsU3RvcmFnZSB8fCB3aW5kb3cuc2Vzc2lvblN0b3JhZ2VcbiAgICAgICAgICA6IG51bGw7XG4gICAgfSBjYXRjaCAoc3RvcmFnZUVycm9yKSB7XG4gICAgICBzdG9yYWdlID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoIXN0b3JhZ2UgfHwgdGhpcy5pc1N0b3JhZ2VEaXNhYmxlZChzdG9yYWdlKSkge1xuICAgICAgc3RvcmFnZSA9IERFRkFVTFRfU1RPUkFHRTtcbiAgICAgIHN0b3JhZ2UuY2xlYXIoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RvcmFnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBzdG9yYWdlIGlzIGRpc2FibGVkIChsaWtlIGluIGNlcnRhaW4gY2FzZXMgd2l0aCBwcml2YXRlIGJyb3dzaW5nKS5cbiAgICogSW4gU2FmYXJpIChNYWMgKyBpT1MpIHdoZW4gcHJpdmF0ZSBicm93c2luZyBpcyBPTiwgbG9jYWxTdG9yYWdlIGlzIHJlYWQgb25seVxuICAgKiBodHRwOi8vc3Bpbi5hdG9taWNvYmplY3QuY29tLzIwMTMvMDEvMjMvaW9zLXByaXZhdGUtYnJvd3NpbmctbG9jYWxzdG9yYWdlL1xuICAgKiBAcGFyYW0ge09iamVjdH0gdGVzdFN0b3JhZ2UgLSBUaGUgc3RvcmFnZSB0byBjaGVjay5cbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG4gIGlzU3RvcmFnZURpc2FibGVkKHRlc3RTdG9yYWdlKSB7XG4gICAgY29uc3QgdGVzdFZhbHVlID0gJ19fVkFTVFN0b3JhZ2VfXyc7XG5cbiAgICB0cnkge1xuICAgICAgdGVzdFN0b3JhZ2Uuc2V0SXRlbSh0ZXN0VmFsdWUsIHRlc3RWYWx1ZSk7XG4gICAgICBpZiAodGVzdFN0b3JhZ2UuZ2V0SXRlbSh0ZXN0VmFsdWUpICE9PSB0ZXN0VmFsdWUpIHtcbiAgICAgICAgdGVzdFN0b3JhZ2UucmVtb3ZlSXRlbSh0ZXN0VmFsdWUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB0ZXN0U3RvcmFnZS5yZW1vdmVJdGVtKHRlc3RWYWx1ZSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIGZvciB0aGUgZ2l2ZW4ga2V5LiBJZiB0aGUga2V5IGRvZXMgbm90IGV4aXN0LCBudWxsIGlzIHJldHVybmVkLlxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IGtleSAtIFRoZSBrZXkgdG8gcmV0cmlldmUgdGhlIHZhbHVlLlxuICAgKiBAcmV0dXJuIHthbnl9XG4gICAqL1xuICBnZXRJdGVtKGtleSkge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgb3IgdXBkYXRlcyB0aGUgdmFsdWUgZm9yIHRoZSBnaXZlbiBrZXkuXG4gICAqIEBwYXJhbSAge1N0cmluZ30ga2V5IC0gVGhlIGtleSB0byBtb2RpZnkgdGhlIHZhbHVlLlxuICAgKiBAcGFyYW0gIHthbnl9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIGJlIGFzc29jaWF0ZWQgd2l0aCB0aGUga2V5LlxuICAgKiBAcmV0dXJuIHthbnl9XG4gICAqL1xuICBzZXRJdGVtKGtleSwgdmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbiBpdGVtIGZvciB0aGUgZ2l2ZW4ga2V5LlxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IGtleSAtIFRoZSBrZXkgdG8gcmVtb3ZlIHRoZSB2YWx1ZS5cbiAgICogQHJldHVybiB7YW55fVxuICAgKi9cbiAgcmVtb3ZlSXRlbShrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCB0aGUgaXRlbXMgZnJvbSB0aGUgc3RvcmFnZS5cbiAgICovXG4gIGNsZWFyKCkge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuY2xlYXIoKTtcbiAgfVxufVxuIiwiZnVuY3Rpb24gdHJhY2soVVJMVGVtcGxhdGVzLCB2YXJpYWJsZXMsIG9wdGlvbnMpIHtcbiAgY29uc3QgVVJMcyA9IHJlc29sdmVVUkxUZW1wbGF0ZXMoVVJMVGVtcGxhdGVzLCB2YXJpYWJsZXMsIG9wdGlvbnMpO1xuXG4gIFVSTHMuZm9yRWFjaChVUkwgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGkgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGkuc3JjID0gVVJMO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogUmVwbGFjZSB0aGUgcHJvdmlkZWQgVVJMVGVtcGxhdGVzIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7QXJyYXl9IFVSTFRlbXBsYXRlcyAtIEFuIGFycmF5IG9mIHRyYWNraW5nIHVybCB0ZW1wbGF0ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3ZhcmlhYmxlcz17fV0gLSBBbiBvcHRpb25hbCBPYmplY3Qgb2YgcGFyYW1ldGVycyB0byBiZSB1c2VkIGluIHRoZSB0cmFja2luZyBjYWxscy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSBBbiBvcHRpb25hbCBPYmplY3Qgb2Ygb3B0aW9ucyB0byBiZSB1c2VkIGluIHRoZSB0cmFja2luZyBjYWxscy5cbiAqL1xuZnVuY3Rpb24gcmVzb2x2ZVVSTFRlbXBsYXRlcyhVUkxUZW1wbGF0ZXMsIHZhcmlhYmxlcyA9IHt9LCBvcHRpb25zID0ge30pIHtcbiAgY29uc3QgVVJMcyA9IFtdO1xuXG4gIC8vIEVuY29kZSBTdHJpbmcgdmFyaWFibGVzLCB3aGVuIGdpdmVuXG4gIGlmICh2YXJpYWJsZXNbJ0FTU0VUVVJJJ10pIHtcbiAgICB2YXJpYWJsZXNbJ0FTU0VUVVJJJ10gPSBlbmNvZGVVUklDb21wb25lbnRSRkMzOTg2KHZhcmlhYmxlc1snQVNTRVRVUkknXSk7XG4gIH1cbiAgaWYgKHZhcmlhYmxlc1snQ09OVEVOVFBMQVlIRUFEJ10pIHtcbiAgICB2YXJpYWJsZXNbJ0NPTlRFTlRQTEFZSEVBRCddID0gZW5jb2RlVVJJQ29tcG9uZW50UkZDMzk4NihcbiAgICAgIHZhcmlhYmxlc1snQ09OVEVOVFBMQVlIRUFEJ11cbiAgICApO1xuICB9XG5cbiAgLy8gU2V0IGRlZmF1bHQgdmFsdWUgZm9yIGludmFsaWQgRVJST1JDT0RFXG4gIGlmIChcbiAgICB2YXJpYWJsZXNbJ0VSUk9SQ09ERSddICYmXG4gICAgIW9wdGlvbnMuaXNDdXN0b21Db2RlICYmXG4gICAgIS9eWzAtOV17M30kLy50ZXN0KHZhcmlhYmxlc1snRVJST1JDT0RFJ10pXG4gICkge1xuICAgIHZhcmlhYmxlc1snRVJST1JDT0RFJ10gPSA5MDA7XG4gIH1cblxuICAvLyBDYWxjIHJhbmRvbS90aW1lIGJhc2VkIG1hY3Jvc1xuICB2YXJpYWJsZXNbJ0NBQ0hFQlVTVElORyddID0gbGVmdHBhZChcbiAgICBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxLjBlOCkudG9TdHJpbmcoKVxuICApO1xuICB2YXJpYWJsZXNbJ1RJTUVTVEFNUCddID0gZW5jb2RlVVJJQ29tcG9uZW50UkZDMzk4NihuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkpO1xuXG4gIC8vIFJBTkRPTS9yYW5kb20gaXMgbm90IGRlZmluZWQgaW4gVkFTVCAzLzQgYXMgYSB2YWxpZCBtYWNybyB0aG8gaXQncyB1c2VkIGJ5IHNvbWUgYWRTZXJ2ZXIgKEF1ZGl0dWRlKVxuICB2YXJpYWJsZXNbJ1JBTkRPTSddID0gdmFyaWFibGVzWydyYW5kb20nXSA9IHZhcmlhYmxlc1snQ0FDSEVCVVNUSU5HJ107XG5cbiAgZm9yIChjb25zdCBVUkxUZW1wbGF0ZUtleSBpbiBVUkxUZW1wbGF0ZXMpIHtcbiAgICBsZXQgcmVzb2x2ZVVSTCA9IFVSTFRlbXBsYXRlc1tVUkxUZW1wbGF0ZUtleV07XG5cbiAgICBpZiAodHlwZW9mIHJlc29sdmVVUkwgIT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiB2YXJpYWJsZXMpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdmFyaWFibGVzW2tleV07XG4gICAgICBjb25zdCBtYWNybzEgPSBgWyR7a2V5fV1gO1xuICAgICAgY29uc3QgbWFjcm8yID0gYCUlJHtrZXl9JSVgO1xuICAgICAgcmVzb2x2ZVVSTCA9IHJlc29sdmVVUkwucmVwbGFjZShtYWNybzEsIHZhbHVlKTtcbiAgICAgIHJlc29sdmVVUkwgPSByZXNvbHZlVVJMLnJlcGxhY2UobWFjcm8yLCB2YWx1ZSk7XG4gICAgfVxuICAgIFVSTHMucHVzaChyZXNvbHZlVVJMKTtcbiAgfVxuXG4gIHJldHVybiBVUkxzO1xufVxuXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9lbmNvZGVVUklDb21wb25lbnRcbmZ1bmN0aW9uIGVuY29kZVVSSUNvbXBvbmVudFJGQzM5ODYoc3RyKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKS5yZXBsYWNlKFxuICAgIC9bIScoKSpdL2csXG4gICAgYyA9PiBgJSR7Yy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KX1gXG4gICk7XG59XG5cbmZ1bmN0aW9uIGxlZnRwYWQoc3RyKSB7XG4gIGlmIChzdHIubGVuZ3RoIDwgOCkge1xuICAgIHJldHVybiAoXG4gICAgICByYW5nZSgwLCA4IC0gc3RyLmxlbmd0aCwgZmFsc2UpXG4gICAgICAgIC5tYXAoKCkgPT4gJzAnKVxuICAgICAgICAuam9pbignJykgKyBzdHJcbiAgICApO1xuICB9XG4gIHJldHVybiBzdHI7XG59XG5cbmZ1bmN0aW9uIHJhbmdlKGxlZnQsIHJpZ2h0LCBpbmNsdXNpdmUpIHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG4gIGNvbnN0IGFzY2VuZGluZyA9IGxlZnQgPCByaWdodDtcbiAgY29uc3QgZW5kID0gIWluY2x1c2l2ZSA/IHJpZ2h0IDogYXNjZW5kaW5nID8gcmlnaHQgKyAxIDogcmlnaHQgLSAxO1xuXG4gIGZvciAobGV0IGkgPSBsZWZ0OyBhc2NlbmRpbmcgPyBpIDwgZW5kIDogaSA+IGVuZDsgYXNjZW5kaW5nID8gaSsrIDogaS0tKSB7XG4gICAgcmVzdWx0LnB1c2goaSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gaXNOdW1lcmljKG4pIHtcbiAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG4pKSAmJiBpc0Zpbml0ZShuKTtcbn1cblxuZnVuY3Rpb24gZmxhdHRlbihhcnIpIHtcbiAgcmV0dXJuIGFyci5yZWR1Y2UoKGZsYXQsIHRvRmxhdHRlbikgPT4ge1xuICAgIHJldHVybiBmbGF0LmNvbmNhdChcbiAgICAgIEFycmF5LmlzQXJyYXkodG9GbGF0dGVuKSA/IGZsYXR0ZW4odG9GbGF0dGVuKSA6IHRvRmxhdHRlblxuICAgICk7XG4gIH0sIFtdKTtcbn1cblxuZXhwb3J0IGNvbnN0IHV0aWwgPSB7XG4gIHRyYWNrLFxuICByZXNvbHZlVVJMVGVtcGxhdGVzLFxuICBlbmNvZGVVUklDb21wb25lbnRSRkMzOTg2LFxuICBsZWZ0cGFkLFxuICByYW5nZSxcbiAgaXNOdW1lcmljLFxuICBmbGF0dGVuXG59O1xuIiwiaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJy4vdXRpbC9zdG9yYWdlJztcbmltcG9ydCB7IFZBU1RQYXJzZXIgfSBmcm9tICcuL3BhcnNlci92YXN0X3BhcnNlcic7XG5cbi8qKlxuICogVGhpcyBjbGFzcyBwcm92aWRlcyBtZXRob2RzIHRvIGZldGNoIGFuZCBwYXJzZSBhIFZBU1QgZG9jdW1lbnQgdXNpbmcgVkFTVFBhcnNlci5cbiAqIEluIGFkZGl0aW9uIGl0IHByb3ZpZGVzIG9wdGlvbnMgdG8gc2tpcCBjb25zZWN1dGl2ZSBjYWxscyBiYXNlZCBvbiBjb25zdHJhaW50cy5cbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBWQVNUQ2xpZW50XG4gKi9cbmV4cG9ydCBjbGFzcyBWQVNUQ2xpZW50IHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgVkFTVENsaWVudC5cbiAgICogQHBhcmFtICB7TnVtYmVyfSBjYXBwaW5nRnJlZUx1bmNoIC0gVGhlIG51bWJlciBvZiBmaXJzdCBjYWxscyB0byBza2lwLlxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGNhcHBpbmdNaW5pbXVtVGltZUludGVydmFsIC0gVGhlIG1pbmltdW0gdGltZSBpbnRlcnZhbCBiZXR3ZWVuIHR3byBjb25zZWN1dGl2ZSBjYWxscy5cbiAgICogQHBhcmFtICB7U3RvcmFnZX0gY3VzdG9tU3RvcmFnZSAtIEEgY3VzdG9tIHN0b3JhZ2UgdG8gdXNlIGluc3RlYWQgb2YgdGhlIGRlZmF1bHQgb25lLlxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNhcHBpbmdGcmVlTHVuY2gsIGNhcHBpbmdNaW5pbXVtVGltZUludGVydmFsLCBjdXN0b21TdG9yYWdlKSB7XG4gICAgdGhpcy5jYXBwaW5nRnJlZUx1bmNoID0gY2FwcGluZ0ZyZWVMdW5jaCB8fCAwO1xuICAgIHRoaXMuY2FwcGluZ01pbmltdW1UaW1lSW50ZXJ2YWwgPSBjYXBwaW5nTWluaW11bVRpbWVJbnRlcnZhbCB8fCAwO1xuICAgIHRoaXMuZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IGZhbHNlLFxuICAgICAgdGltZW91dDogMFxuICAgIH07XG4gICAgdGhpcy52YXN0UGFyc2VyID0gbmV3IFZBU1RQYXJzZXIoKTtcbiAgICB0aGlzLnN0b3JhZ2UgPSBjdXN0b21TdG9yYWdlIHx8IG5ldyBTdG9yYWdlKCk7XG5cbiAgICAvLyBJbml0IHZhbHVlcyBpZiBub3QgYWxyZWFkeSBzZXRcbiAgICBpZiAodGhpcy5sYXN0U3VjY2Vzc2Z1bEFkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMubGFzdFN1Y2Nlc3NmdWxBZCA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudG90YWxDYWxscyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnRvdGFsQ2FsbHMgPSAwO1xuICAgIH1cbiAgICBpZiAodGhpcy50b3RhbENhbGxzVGltZW91dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnRvdGFsQ2FsbHNUaW1lb3V0ID0gMDtcbiAgICB9XG4gIH1cblxuICBnZXRQYXJzZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFzdFBhcnNlcjtcbiAgfVxuXG4gIGdldCBsYXN0U3VjY2Vzc2Z1bEFkKCkge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0SXRlbSgndmFzdC1jbGllbnQtbGFzdC1zdWNjZXNzZnVsLWFkJyk7XG4gIH1cblxuICBzZXQgbGFzdFN1Y2Nlc3NmdWxBZCh2YWx1ZSkge1xuICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKCd2YXN0LWNsaWVudC1sYXN0LXN1Y2Nlc3NmdWwtYWQnLCB2YWx1ZSk7XG4gIH1cblxuICBnZXQgdG90YWxDYWxscygpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldEl0ZW0oJ3Zhc3QtY2xpZW50LXRvdGFsLWNhbGxzJyk7XG4gIH1cblxuICBzZXQgdG90YWxDYWxscyh2YWx1ZSkge1xuICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKCd2YXN0LWNsaWVudC10b3RhbC1jYWxscycsIHZhbHVlKTtcbiAgfVxuXG4gIGdldCB0b3RhbENhbGxzVGltZW91dCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldEl0ZW0oJ3Zhc3QtY2xpZW50LXRvdGFsLWNhbGxzLXRpbWVvdXQnKTtcbiAgfVxuXG4gIHNldCB0b3RhbENhbGxzVGltZW91dCh2YWx1ZSkge1xuICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKCd2YXN0LWNsaWVudC10b3RhbC1jYWxscy10aW1lb3V0JywgdmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhlcmUgYXJlIG1vcmUgYWRzIHRvIHJlc29sdmUgZm9yIHRoZSBjdXJyZW50IHBhcnNpbmcuXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuICBoYXNSZW1haW5pbmdBZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFzdFBhcnNlci5yZW1haW5pbmdBZHMubGVuZ3RoID4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNvbHZlcyB0aGUgbmV4dCBncm91cCBvZiBhZHMuIElmIGFsbCBpcyB0cnVlIHJlc29sdmVzIGFsbCB0aGUgcmVtYWluaW5nIGFkcy5cbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gYWxsIC0gSWYgdHJ1ZSBhbGwgdGhlIHJlbWFpbmluZyBhZHMgYXJlIHJlc29sdmVkXG4gICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAqL1xuICBnZXROZXh0QWRzKGFsbCkge1xuICAgIHJldHVybiB0aGlzLnZhc3RQYXJzZXIuZ2V0UmVtYWluaW5nQWRzKGFsbCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIHBhcnNlZCBWQVNUIGRvY3VtZW50IGZvciB0aGUgZ2l2ZW4gdXJsLCBhcHBseWluZyB0aGUgc2tpcHBpbmcgcnVsZXMgZGVmaW5lZC5cbiAgICogUmV0dXJucyBhIFByb21pc2Ugd2hpY2ggcmVzb2x2ZXMgd2l0aCBhIGZ1bGx5IHBhcnNlZCBWQVNUUmVzcG9uc2Ugb3IgcmVqZWN0cyB3aXRoIGFuIEVycm9yLlxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHVybCAtIFRoZSB1cmwgdG8gdXNlIHRvIGZlY3RoIHRoZSBWQVNUIGRvY3VtZW50LlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnMgLSBBbiBvcHRpb25hbCBPYmplY3Qgb2YgcGFyYW1ldGVycyB0byBiZSBhcHBsaWVkIGluIHRoZSBwcm9jZXNzLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgKi9cbiAgZ2V0KHVybCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih0aGlzLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcblxuICAgIC8vIEJ5IGRlZmF1bHQgdGhlIGNsaWVudCByZXNvbHZlcyBvbmx5IHRoZSBmaXJzdCBBZCBvciBBZFBvZFxuICAgIGlmICghb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgncmVzb2x2ZUFsbCcpKSB7XG4gICAgICBvcHRpb25zLnJlc29sdmVBbGwgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayB0b3RhbENhbGxzVGltZW91dCAoZmlyc3QgY2FsbCArIDEgaG91ciksIGlmIG9sZGVyIHRoYW4gbm93LFxuICAgIC8vIHJlc2V0IHRvdGFsQ2FsbHMgbnVtYmVyLCBieSB0aGlzIHdheSB0aGUgY2xpZW50IHdpbGwgYmUgZWxpZ2libGUgYWdhaW5cbiAgICAvLyBmb3IgZnJlZWx1bmNoIGNhcHBpbmdcbiAgICBpZiAodGhpcy50b3RhbENhbGxzVGltZW91dCA8IG5vdykge1xuICAgICAgdGhpcy50b3RhbENhbGxzID0gMTtcbiAgICAgIHRoaXMudG90YWxDYWxsc1RpbWVvdXQgPSBub3cgKyA2MCAqIDYwICogMTAwMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50b3RhbENhbGxzKys7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh0aGlzLmNhcHBpbmdGcmVlTHVuY2ggPj0gdGhpcy50b3RhbENhbGxzKSB7XG4gICAgICAgIHJldHVybiByZWplY3QoXG4gICAgICAgICAgbmV3IEVycm9yKFxuICAgICAgICAgICAgYFZBU1QgY2FsbCBjYW5jZWxlZCDigJMgRnJlZUx1bmNoIGNhcHBpbmcgbm90IHJlYWNoZWQgeWV0ICR7XG4gICAgICAgICAgICAgIHRoaXMudG90YWxDYWxsc1xuICAgICAgICAgICAgfS8ke3RoaXMuY2FwcGluZ0ZyZWVMdW5jaH1gXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB0aW1lU2luY2VMYXN0Q2FsbCA9IG5vdyAtIHRoaXMubGFzdFN1Y2Nlc3NmdWxBZDtcblxuICAgICAgLy8gQ2hlY2sgdGltZVNpbmNlTGFzdENhbGwgdG8gYmUgYSBwb3NpdGl2ZSBudW1iZXIuIElmIG5vdCwgdGhpcyBtZWFuIHRoZVxuICAgICAgLy8gcHJldmlvdXMgd2FzIG1hZGUgaW4gdGhlIGZ1dHVyZS4gV2UgcmVzZXQgbGFzdFN1Y2Nlc3NmdWxBZCB2YWx1ZVxuICAgICAgaWYgKHRpbWVTaW5jZUxhc3RDYWxsIDwgMCkge1xuICAgICAgICB0aGlzLmxhc3RTdWNjZXNzZnVsQWQgPSAwO1xuICAgICAgfSBlbHNlIGlmICh0aW1lU2luY2VMYXN0Q2FsbCA8IHRoaXMuY2FwcGluZ01pbmltdW1UaW1lSW50ZXJ2YWwpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChcbiAgICAgICAgICBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgVkFTVCBjYWxsIGNhbmNlbGVkIOKAkyAoJHtcbiAgICAgICAgICAgICAgdGhpcy5jYXBwaW5nTWluaW11bVRpbWVJbnRlcnZhbFxuICAgICAgICAgICAgfSltcyBtaW5pbXVtIGludGVydmFsIHJlYWNoZWRgXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnZhc3RQYXJzZXJcbiAgICAgICAgLmdldEFuZFBhcnNlVkFTVCh1cmwsIG9wdGlvbnMpXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc29sdmUocmVzcG9uc2UpKVxuICAgICAgICAuY2F0Y2goZXJyID0+IHJlamVjdChlcnIpKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFZBU1RSZXNwb25zZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYWRzID0gW107XG4gICAgdGhpcy5lcnJvclVSTFRlbXBsYXRlcyA9IFtdO1xuICAgIHRoaXMudmVyc2lvbiA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBhbmlvbkFkIH0gZnJvbSAnLi9jb21wYW5pb25fYWQnO1xuaW1wb3J0IHsgQ3JlYXRpdmVMaW5lYXIgfSBmcm9tICcuL2NyZWF0aXZlL2NyZWF0aXZlX2xpbmVhcic7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xuaW1wb3J0IHsgTm9uTGluZWFyQWQgfSBmcm9tICcuL25vbl9saW5lYXJfYWQnO1xuaW1wb3J0IHsgdXRpbCB9IGZyb20gJy4vdXRpbC91dGlsJztcblxuLyoqXG4gKiBUaGUgZGVmYXVsdCBza2lwIGRlbGF5IHVzZWQgaW4gY2FzZSBhIGN1c3RvbSBvbmUgaXMgbm90IHByb3ZpZGVkXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtOdW1iZXJ9XG4gKi9cbmNvbnN0IERFRkFVTFRfU0tJUF9ERUxBWSA9IC0xO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgcHJvdmlkZXMgbWV0aG9kcyB0byB0cmFjayBhbiBhZCBleGVjdXRpb24uXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIFZBU1RUcmFja2VyXG4gKiBAZXh0ZW5kcyBFdmVudEVtaXR0ZXJcbiAqL1xuZXhwb3J0IGNsYXNzIFZBU1RUcmFja2VyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgVkFTVFRyYWNrZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7VkFTVENsaWVudH0gY2xpZW50IC0gQW4gaW5zdGFuY2Ugb2YgVkFTVENsaWVudCB0aGF0IGNhbiBiZSB1cGRhdGVkIGJ5IHRoZSB0cmFja2VyLiBbb3B0aW9uYWxdXG4gICAqIEBwYXJhbSB7QWR9IGFkIC0gVGhlIGFkIHRvIHRyYWNrLlxuICAgKiBAcGFyYW0ge0NyZWF0aXZlfSBjcmVhdGl2ZSAtIFRoZSBjcmVhdGl2ZSB0byB0cmFjay5cbiAgICogQHBhcmFtIHtDb21wYW5pb25BZHxOb25MaW5lYXJBZH0gW3ZhcmlhdGlvbj1udWxsXSAtIEFuIG9wdGlvbmFsIHZhcmlhdGlvbiBvZiB0aGUgY3JlYXRpdmUuXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoY2xpZW50LCBhZCwgY3JlYXRpdmUsIHZhcmlhdGlvbiA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYWQgPSBhZDtcbiAgICB0aGlzLmNyZWF0aXZlID0gY3JlYXRpdmU7XG4gICAgdGhpcy52YXJpYXRpb24gPSB2YXJpYXRpb247XG4gICAgdGhpcy5tdXRlZCA9IGZhbHNlO1xuICAgIHRoaXMuaW1wcmVzc2VkID0gZmFsc2U7XG4gICAgdGhpcy5za2lwcGFibGUgPSBmYWxzZTtcbiAgICB0aGlzLnRyYWNraW5nRXZlbnRzID0ge307XG4gICAgLy8gV2UgbmVlZCB0byBzYXZlIHRoZSBhbHJlYWR5IHRyaWdnZXJlZCBxdWFydGlsZXMsIGluIG9yZGVyIHRvIG5vdCB0cmlnZ2VyIHRoZW0gYWdhaW5cbiAgICB0aGlzLl9hbHJlYWR5VHJpZ2dlcmVkUXVhcnRpbGVzID0ge307XG4gICAgLy8gVHJhY2tlciBsaXN0ZW5lcnMgc2hvdWxkIGJlIG5vdGlmaWVkIHdpdGggc29tZSBldmVudHNcbiAgICAvLyBubyBtYXR0ZXIgaWYgdGhlcmUgaXMgYSB0cmFja2luZyBVUkwgb3Igbm90XG4gICAgdGhpcy5lbWl0QWx3YXlzRXZlbnRzID0gW1xuICAgICAgJ2NyZWF0aXZlVmlldycsXG4gICAgICAnc3RhcnQnLFxuICAgICAgJ2ZpcnN0UXVhcnRpbGUnLFxuICAgICAgJ21pZHBvaW50JyxcbiAgICAgICd0aGlyZFF1YXJ0aWxlJyxcbiAgICAgICdjb21wbGV0ZScsXG4gICAgICAncmVzdW1lJyxcbiAgICAgICdwYXVzZScsXG4gICAgICAncmV3aW5kJyxcbiAgICAgICdza2lwJyxcbiAgICAgICdjbG9zZUxpbmVhcicsXG4gICAgICAnY2xvc2UnXG4gICAgXTtcblxuICAgIC8vIER1cGxpY2F0ZSB0aGUgY3JlYXRpdmUncyB0cmFja2luZ0V2ZW50cyBwcm9wZXJ0eSBzbyB3ZSBjYW4gYWx0ZXIgaXRcbiAgICBmb3IgKGNvbnN0IGV2ZW50TmFtZSBpbiB0aGlzLmNyZWF0aXZlLnRyYWNraW5nRXZlbnRzKSB7XG4gICAgICBjb25zdCBldmVudHMgPSB0aGlzLmNyZWF0aXZlLnRyYWNraW5nRXZlbnRzW2V2ZW50TmFtZV07XG4gICAgICB0aGlzLnRyYWNraW5nRXZlbnRzW2V2ZW50TmFtZV0gPSBldmVudHMuc2xpY2UoMCk7XG4gICAgfVxuXG4gICAgLy8gTm9ubGluZWFyIGFuZCBjb21wYW5pb24gY3JlYXRpdmVzIHByb3ZpZGUgc29tZSB0cmFja2luZyBpbmZvcm1hdGlvbiBhdCBhIHZhcmlhdGlvbiBsZXZlbFxuICAgIC8vIFdoaWxlIGxpbmVhciBjcmVhdGl2ZXMgcHJvdmlkZWQgdGhhdCBhdCBhIGNyZWF0aXZlIGxldmVsLiBUaGF0J3Mgd2h5IHdlIG5lZWQgdG9cbiAgICAvLyBkaWZmZXJlbnRpYXRlIGhvdyB3ZSByZXRyaWV2ZSBzb21lIHRyYWNraW5nIGluZm9ybWF0aW9uLlxuICAgIGlmICh0aGlzLmNyZWF0aXZlIGluc3RhbmNlb2YgQ3JlYXRpdmVMaW5lYXIpIHtcbiAgICAgIHRoaXMuX2luaXRMaW5lYXJUcmFja2luZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pbml0VmFyaWF0aW9uVHJhY2tpbmcoKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgdHJhY2tlciBpcyBhc3NvY2lhdGVkIHdpdGggYSBjbGllbnQgd2UgYWRkIGEgbGlzdGVuZXIgdG8gdGhlIHN0YXJ0IGV2ZW50XG4gICAgLy8gdG8gdXBkYXRlIHRoZSBsYXN0U3VjY2Vzc2Z1bEFkIHByb3BlcnR5LlxuICAgIGlmIChjbGllbnQpIHtcbiAgICAgIHRoaXMub24oJ3N0YXJ0JywgKCkgPT4ge1xuICAgICAgICBjbGllbnQubGFzdFN1Y2Nlc3NmdWxBZCA9IERhdGUubm93KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdCB0aGUgY3VzdG9tIHRyYWNraW5nIG9wdGlvbnMgZm9yIGxpbmVhciBjcmVhdGl2ZXMuXG4gICAqXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBfaW5pdExpbmVhclRyYWNraW5nKCkge1xuICAgIHRoaXMubGluZWFyID0gdHJ1ZTtcbiAgICB0aGlzLnNraXBEZWxheSA9IHRoaXMuY3JlYXRpdmUuc2tpcERlbGF5O1xuXG4gICAgdGhpcy5zZXREdXJhdGlvbih0aGlzLmNyZWF0aXZlLmR1cmF0aW9uKTtcblxuICAgIHRoaXMuY2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUgPSB0aGlzLmNyZWF0aXZlLnZpZGVvQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU7XG4gICAgdGhpcy5jbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzID0gdGhpcy5jcmVhdGl2ZS52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXM7XG4gIH1cblxuICAvKipcbiAgICogSW5pdCB0aGUgY3VzdG9tIHRyYWNraW5nIG9wdGlvbnMgZm9yIG5vbmxpbmVhciBhbmQgY29tcGFuaW9uIGNyZWF0aXZlcy5cbiAgICogVGhlc2Ugb3B0aW9ucyBhcmUgcHJvdmlkZWQgaW4gdGhlIHZhcmlhdGlvbiBPYmplY3QuXG4gICAqXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBfaW5pdFZhcmlhdGlvblRyYWNraW5nKCkge1xuICAgIHRoaXMubGluZWFyID0gZmFsc2U7XG4gICAgdGhpcy5za2lwRGVsYXkgPSBERUZBVUxUX1NLSVBfREVMQVk7XG5cbiAgICAvLyBJZiBubyB2YXJpYXRpb24gaGFzIGJlZW4gcHJvdmlkZWQgdGhlcmUncyBub3RoaW5nIGVsc2UgdG8gc2V0XG4gICAgaWYgKCF0aGlzLnZhcmlhdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIER1cGxpY2F0ZSB0aGUgdmFyaWF0aW9uJ3MgdHJhY2tpbmdFdmVudHMgcHJvcGVydHkgc28gd2UgY2FuIGFsdGVyIGl0XG4gICAgZm9yIChjb25zdCBldmVudE5hbWUgaW4gdGhpcy52YXJpYXRpb24udHJhY2tpbmdFdmVudHMpIHtcbiAgICAgIGNvbnN0IGV2ZW50cyA9IHRoaXMudmFyaWF0aW9uLnRyYWNraW5nRXZlbnRzW2V2ZW50TmFtZV07XG5cbiAgICAgIC8vIElmIGZvciB0aGUgZ2l2ZW4gZXZlbnROYW1lIHdlIGFscmVhZHkgaGFkIHNvbWUgdHJhY2tpbmdFdmVudHMgcHJvdmlkZWQgYnkgdGhlIGNyZWF0aXZlXG4gICAgICAvLyB3ZSB3YW50IHRvIGtlZXAgYm90aCB0aGUgY3JlYXRpdmUgdHJhY2tpbmdFdmVudHMgYW5kIHRoZSB2YXJpYXRpb24gb25lc1xuICAgICAgaWYgKHRoaXMudHJhY2tpbmdFdmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgICB0aGlzLnRyYWNraW5nRXZlbnRzW2V2ZW50TmFtZV0gPSB0aGlzLnRyYWNraW5nRXZlbnRzW2V2ZW50TmFtZV0uY29uY2F0KFxuICAgICAgICAgIGV2ZW50cy5zbGljZSgwKVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50cmFja2luZ0V2ZW50c1tldmVudE5hbWVdID0gZXZlbnRzLnNsaWNlKDApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnZhcmlhdGlvbiBpbnN0YW5jZW9mIE5vbkxpbmVhckFkKSB7XG4gICAgICB0aGlzLmNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlID0gdGhpcy52YXJpYXRpb24ubm9ubGluZWFyQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU7XG4gICAgICB0aGlzLmNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMgPSB0aGlzLnZhcmlhdGlvbi5ub25saW5lYXJDbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzO1xuICAgICAgdGhpcy5zZXREdXJhdGlvbih0aGlzLnZhcmlhdGlvbi5taW5TdWdnZXN0ZWREdXJhdGlvbik7XG4gICAgfSBlbHNlIGlmICh0aGlzLnZhcmlhdGlvbiBpbnN0YW5jZW9mIENvbXBhbmlvbkFkKSB7XG4gICAgICB0aGlzLmNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlID0gdGhpcy52YXJpYXRpb24uY29tcGFuaW9uQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU7XG4gICAgICB0aGlzLmNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMgPSB0aGlzLnZhcmlhdGlvbi5jb21wYW5pb25DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBkdXJhdGlvbiBvZiB0aGUgYWQgYW5kIHVwZGF0ZXMgdGhlIHF1YXJ0aWxlcyBiYXNlZCBvbiB0aGF0LlxuICAgKlxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGR1cmF0aW9uIC0gVGhlIGR1cmF0aW9uIG9mIHRoZSBhZC5cbiAgICovXG4gIHNldER1cmF0aW9uKGR1cmF0aW9uKSB7XG4gICAgdGhpcy5hc3NldER1cmF0aW9uID0gZHVyYXRpb247XG4gICAgLy8gYmV3YXJlIG9mIGtleSBuYW1lcywgdGhlc2VzIGFyZSBhbHNvIHVzZWQgYXMgZXZlbnQgbmFtZXNcbiAgICB0aGlzLnF1YXJ0aWxlcyA9IHtcbiAgICAgIGZpcnN0UXVhcnRpbGU6IE1hdGgucm91bmQoMjUgKiB0aGlzLmFzc2V0RHVyYXRpb24pIC8gMTAwLFxuICAgICAgbWlkcG9pbnQ6IE1hdGgucm91bmQoNTAgKiB0aGlzLmFzc2V0RHVyYXRpb24pIC8gMTAwLFxuICAgICAgdGhpcmRRdWFydGlsZTogTWF0aC5yb3VuZCg3NSAqIHRoaXMuYXNzZXREdXJhdGlvbikgLyAxMDBcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGR1cmF0aW9uIG9mIHRoZSBhZCBhbmQgdXBkYXRlcyB0aGUgcXVhcnRpbGVzIGJhc2VkIG9uIHRoYXQuXG4gICAqIFRoaXMgaXMgcmVxdWlyZWQgZm9yIHRyYWNraW5nIHRpbWUgcmVsYXRlZCBldmVudHMuXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBwcm9ncmVzcyAtIEN1cnJlbnQgcGxheWJhY2sgdGltZSBpbiBzZWNvbmRzLlxuICAgKiBAZW1pdHMgVkFTVFRyYWNrZXIjc3RhcnRcbiAgICogQGVtaXRzIFZBU1RUcmFja2VyI3NraXAtY291bnRkb3duXG4gICAqIEBlbWl0cyBWQVNUVHJhY2tlciNwcm9ncmVzcy1bMC0xMDBdJVxuICAgKiBAZW1pdHMgVkFTVFRyYWNrZXIjcHJvZ3Jlc3MtW2N1cnJlbnRUaW1lXVxuICAgKiBAZW1pdHMgVkFTVFRyYWNrZXIjcmV3aW5kXG4gICAqIEBlbWl0cyBWQVNUVHJhY2tlciNmaXJzdFF1YXJ0aWxlXG4gICAqIEBlbWl0cyBWQVNUVHJhY2tlciNtaWRwb2ludFxuICAgKiBAZW1pdHMgVkFTVFRyYWNrZXIjdGhpcmRRdWFydGlsZVxuICAgKi9cbiAgc2V0UHJvZ3Jlc3MocHJvZ3Jlc3MpIHtcbiAgICBjb25zdCBza2lwRGVsYXkgPSB0aGlzLnNraXBEZWxheSB8fCBERUZBVUxUX1NLSVBfREVMQVk7XG5cbiAgICBpZiAoc2tpcERlbGF5ICE9PSAtMSAmJiAhdGhpcy5za2lwcGFibGUpIHtcbiAgICAgIGlmIChza2lwRGVsYXkgPiBwcm9ncmVzcykge1xuICAgICAgICB0aGlzLmVtaXQoJ3NraXAtY291bnRkb3duJywgc2tpcERlbGF5IC0gcHJvZ3Jlc3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5za2lwcGFibGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmVtaXQoJ3NraXAtY291bnRkb3duJywgMCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYXNzZXREdXJhdGlvbiA+IDApIHtcbiAgICAgIGNvbnN0IGV2ZW50cyA9IFtdO1xuXG4gICAgICBpZiAocHJvZ3Jlc3MgPiAwKSB7XG4gICAgICAgIGNvbnN0IHBlcmNlbnQgPSBNYXRoLnJvdW5kKChwcm9ncmVzcyAvIHRoaXMuYXNzZXREdXJhdGlvbikgKiAxMDApO1xuXG4gICAgICAgIGV2ZW50cy5wdXNoKCdzdGFydCcpO1xuICAgICAgICBldmVudHMucHVzaChgcHJvZ3Jlc3MtJHtwZXJjZW50fSVgKTtcbiAgICAgICAgZXZlbnRzLnB1c2goYHByb2dyZXNzLSR7TWF0aC5yb3VuZChwcm9ncmVzcyl9YCk7XG5cbiAgICAgICAgZm9yIChjb25zdCBxdWFydGlsZSBpbiB0aGlzLnF1YXJ0aWxlcykge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuaXNRdWFydGlsZVJlYWNoZWQocXVhcnRpbGUsIHRoaXMucXVhcnRpbGVzW3F1YXJ0aWxlXSwgcHJvZ3Jlc3MpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBldmVudHMucHVzaChxdWFydGlsZSk7XG4gICAgICAgICAgICB0aGlzLl9hbHJlYWR5VHJpZ2dlcmVkUXVhcnRpbGVzW3F1YXJ0aWxlXSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGV2ZW50cy5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgIHRoaXMudHJhY2soZXZlbnROYW1lLCB0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocHJvZ3Jlc3MgPCB0aGlzLnByb2dyZXNzKSB7XG4gICAgICAgIHRoaXMudHJhY2soJ3Jld2luZCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucHJvZ3Jlc3MgPSBwcm9ncmVzcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYSBxdWFydGlsZSBoYXMgYmVlbiByZWFjaGVkIHdpdGhvdXQgaGF2ZSBiZWluZyB0cmlnZ2VyZWQgYWxyZWFkeS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHF1YXJ0aWxlIC0gUXVhcnRpbGUgbmFtZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGltZSAtIFRpbWUgb2Zmc2V0LCB3aGVuIHRoaXMgcXVhcnRpbGUgaXMgcmVhY2hlZCBpbiBzZWNvbmRzLlxuICAgKiBAcGFyYW0ge051bWJlcn0gcHJvZ3Jlc3MgLSBDdXJyZW50IHByb2dyZXNzIG9mIHRoZSBhZHMgaW4gc2Vjb25kcy5cbiAgICpcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG4gIGlzUXVhcnRpbGVSZWFjaGVkKHF1YXJ0aWxlLCB0aW1lLCBwcm9ncmVzcykge1xuICAgIGxldCBxdWFydGlsZVJlYWNoZWQgPSBmYWxzZTtcbiAgICAvLyBpZiBxdWFydGlsZSB0aW1lIGFscmVhZHkgcmVhY2hlZCBhbmQgbmV2ZXIgdHJpZ2dlcmVkXG4gICAgaWYgKHRpbWUgPD0gcHJvZ3Jlc3MgJiYgIXRoaXMuX2FscmVhZHlUcmlnZ2VyZWRRdWFydGlsZXNbcXVhcnRpbGVdKSB7XG4gICAgICBxdWFydGlsZVJlYWNoZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gcXVhcnRpbGVSZWFjaGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIG11dGUgc3RhdGUgYW5kIGNhbGxzIHRoZSBtdXRlL3VubXV0ZSB0cmFja2luZyBVUkxzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG11dGVkIC0gSW5kaWNhdGVzIGlmIHRoZSB2aWRlbyBpcyBtdXRlZCBvciBub3QuXG4gICAqIEBlbWl0cyBWQVNUVHJhY2tlciNtdXRlXG4gICAqIEBlbWl0cyBWQVNUVHJhY2tlciN1bm11dGVcbiAgICovXG4gIHNldE11dGVkKG11dGVkKSB7XG4gICAgaWYgKHRoaXMubXV0ZWQgIT09IG11dGVkKSB7XG4gICAgICB0aGlzLnRyYWNrKG11dGVkID8gJ211dGUnIDogJ3VubXV0ZScpO1xuICAgIH1cbiAgICB0aGlzLm11dGVkID0gbXV0ZWQ7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBwYXVzZSBzdGF0ZSBhbmQgY2FsbCB0aGUgcmVzdW1lL3BhdXNlIHRyYWNraW5nIFVSTHMuXG4gICAqXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gcGF1c2VkIC0gSW5kaWNhdGVzIGlmIHRoZSB2aWRlbyBpcyBwYXVzZWQgb3Igbm90LlxuICAgKiBAZW1pdHMgVkFTVFRyYWNrZXIjcGF1c2VcbiAgICogQGVtaXRzIFZBU1RUcmFja2VyI3Jlc3VtZVxuICAgKi9cbiAgc2V0UGF1c2VkKHBhdXNlZCkge1xuICAgIGlmICh0aGlzLnBhdXNlZCAhPT0gcGF1c2VkKSB7XG4gICAgICB0aGlzLnRyYWNrKHBhdXNlZCA/ICdwYXVzZScgOiAncmVzdW1lJyk7XG4gICAgfVxuICAgIHRoaXMucGF1c2VkID0gcGF1c2VkO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGZ1bGxzY3JlZW4gc3RhdGUgYW5kIGNhbGxzIHRoZSBmdWxsc2NyZWVuIHRyYWNraW5nIFVSTHMuXG4gICAqXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gZnVsbHNjcmVlbiAtIEluZGljYXRlcyBpZiB0aGUgdmlkZW8gaXMgaW4gZnVsc2NyZWVuIG1vZGUgb3Igbm90LlxuICAgKiBAZW1pdHMgVkFTVFRyYWNrZXIjZnVsbHNjcmVlblxuICAgKiBAZW1pdHMgVkFTVFRyYWNrZXIjZXhpdEZ1bGxzY3JlZW5cbiAgICovXG4gIHNldEZ1bGxzY3JlZW4oZnVsbHNjcmVlbikge1xuICAgIGlmICh0aGlzLmZ1bGxzY3JlZW4gIT09IGZ1bGxzY3JlZW4pIHtcbiAgICAgIHRoaXMudHJhY2soZnVsbHNjcmVlbiA/ICdmdWxsc2NyZWVuJyA6ICdleGl0RnVsbHNjcmVlbicpO1xuICAgIH1cbiAgICB0aGlzLmZ1bGxzY3JlZW4gPSBmdWxsc2NyZWVuO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGV4cGFuZCBzdGF0ZSBhbmQgY2FsbHMgdGhlIGV4cGFuZC9jb2xsYXBzZSB0cmFja2luZyBVUkxzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGV4cGFuZGVkIC0gSW5kaWNhdGVzIGlmIHRoZSB2aWRlbyBpcyBleHBhbmRlZCBvciBub3QuXG4gICAqIEBlbWl0cyBWQVNUVHJhY2tlciNleHBhbmRcbiAgICogQGVtaXRzIFZBU1RUcmFja2VyI2NvbGxhcHNlXG4gICAqL1xuICBzZXRFeHBhbmQoZXhwYW5kZWQpIHtcbiAgICBpZiAodGhpcy5leHBhbmRlZCAhPT0gZXhwYW5kZWQpIHtcbiAgICAgIHRoaXMudHJhY2soZXhwYW5kZWQgPyAnZXhwYW5kJyA6ICdjb2xsYXBzZScpO1xuICAgIH1cbiAgICB0aGlzLmV4cGFuZGVkID0gZXhwYW5kZWQ7XG4gIH1cblxuICAvKipcbiAgICogTXVzdCBiZSBjYWxsZWQgaWYgeW91IHdhbnQgdG8gb3ZlcndyaXRlIHRoZSA8TGluZWFyPiBTa2lwb2Zmc2V0IHZhbHVlLlxuICAgKiBUaGlzIHdpbGwgaW5pdCB0aGUgc2tpcCBjb3VudGRvd24gZHVyYXRpb24uIFRoZW4sIGV2ZXJ5IHRpbWUgc2V0UHJvZ3Jlc3MoKSBpcyBjYWxsZWQsXG4gICAqIGl0IHdpbGwgZGVjcmVhc2UgdGhlIGNvdW50ZG93biBhbmQgZW1pdCBhIHNraXAtY291bnRkb3duIGV2ZW50IHdpdGggdGhlIHJlbWFpbmluZyB0aW1lLlxuICAgKiBEbyBub3QgY2FsbCB0aGlzIG1ldGhvZCBpZiB5b3Ugd2FudCB0byBrZWVwIHRoZSBvcmlnaW5hbCBTa2lwb2Zmc2V0IHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb24gLSBUaGUgdGltZSBpbiBzZWNvbmRzIHVudGlsIHRoZSBza2lwIGJ1dHRvbiBpcyBkaXNwbGF5ZWQuXG4gICAqL1xuICBzZXRTa2lwRGVsYXkoZHVyYXRpb24pIHtcbiAgICBpZiAodHlwZW9mIGR1cmF0aW9uID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5za2lwRGVsYXkgPSBkdXJhdGlvbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJhY2tzIGFuIGltcHJlc3Npb24gKGNhbiBiZSBjYWxsZWQgb25seSBvbmNlKS5cbiAgICpcbiAgICogQGVtaXRzIFZBU1RUcmFja2VyI2NyZWF0aXZlVmlld1xuICAgKi9cbiAgdHJhY2tJbXByZXNzaW9uKCkge1xuICAgIGlmICghdGhpcy5pbXByZXNzZWQpIHtcbiAgICAgIHRoaXMuaW1wcmVzc2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMudHJhY2tVUkxzKHRoaXMuYWQuaW1wcmVzc2lvblVSTFRlbXBsYXRlcyk7XG4gICAgICB0aGlzLnRyYWNrKCdjcmVhdGl2ZVZpZXcnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VuZCBhIHJlcXVlc3QgdG8gdGhlIFVSSSBwcm92aWRlZCBieSB0aGUgVkFTVCA8RXJyb3I+IGVsZW1lbnQuXG4gICAqIElmIGFuIFtFUlJPUkNPREVdIG1hY3JvIGlzIGluY2x1ZGVkLCBpdCB3aWxsIGJlIHN1YnN0aXR1dGUgd2l0aCBlcnJvckNvZGUuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBlcnJvckNvZGUgLSBSZXBsYWNlcyBbRVJST1JDT0RFXSBtYWNyby4gW0VSUk9SQ09ERV0gdmFsdWVzIGFyZSBsaXN0ZWQgaW4gdGhlIFZBU1Qgc3BlY2lmaWNhdGlvbi5cbiAgICogQHBhcmFtIHtCb29sZWFufSBbaXNDdXN0b21Db2RlPWZhbHNlXSAtIEZsYWcgdG8gYWxsb3cgY3VzdG9tIHZhbHVlcyBvbiBlcnJvciBjb2RlLlxuICAgKi9cbiAgZXJyb3JXaXRoQ29kZShlcnJvckNvZGUsIGlzQ3VzdG9tQ29kZSA9IGZhbHNlKSB7XG4gICAgdGhpcy50cmFja1VSTHMoXG4gICAgICB0aGlzLmFkLmVycm9yVVJMVGVtcGxhdGVzLFxuICAgICAgeyBFUlJPUkNPREU6IGVycm9yQ29kZSB9LFxuICAgICAgeyBpc0N1c3RvbUNvZGUgfVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogTXVzdCBiZSBjYWxsZWQgd2hlbiB0aGUgdXNlciB3YXRjaGVkIHRoZSBsaW5lYXIgY3JlYXRpdmUgdW50aWwgaXRzIGVuZC5cbiAgICogQ2FsbHMgdGhlIGNvbXBsZXRlIHRyYWNraW5nIFVSTHMuXG4gICAqXG4gICAqIEBlbWl0cyBWQVNUVHJhY2tlciNjb21wbGV0ZVxuICAgKi9cbiAgY29tcGxldGUoKSB7XG4gICAgdGhpcy50cmFjaygnY29tcGxldGUnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNdXN0IGJlIGNhbGxlZCB3aGVuIHRoZSBwbGF5ZXIgb3IgdGhlIHdpbmRvdyBpcyBjbG9zZWQgZHVyaW5nIHRoZSBhZC5cbiAgICogQ2FsbHMgdGhlIGBjbG9zZUxpbmVhcmAgKGluIFZBU1QgMy4wKSBhbmQgYGNsb3NlYCB0cmFja2luZyBVUkxzLlxuICAgKlxuICAgKiBAZW1pdHMgVkFTVFRyYWNrZXIjY2xvc2VMaW5lYXJcbiAgICogQGVtaXRzIFZBU1RUcmFja2VyI2Nsb3NlXG4gICAqL1xuICBjbG9zZSgpIHtcbiAgICB0aGlzLnRyYWNrKHRoaXMubGluZWFyID8gJ2Nsb3NlTGluZWFyJyA6ICdjbG9zZScpO1xuICB9XG5cbiAgLyoqXG4gICAqIE11c3QgYmUgY2FsbGVkIHdoZW4gdGhlIHNraXAgYnV0dG9uIGlzIGNsaWNrZWQuIENhbGxzIHRoZSBza2lwIHRyYWNraW5nIFVSTHMuXG4gICAqXG4gICAqIEBlbWl0cyBWQVNUVHJhY2tlciNza2lwXG4gICAqL1xuICBza2lwKCkge1xuICAgIHRoaXMudHJhY2soJ3NraXAnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNdXN0IGJlIGNhbGxlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgY3JlYXRpdmUuXG4gICAqIEl0IGNhbGxzIHRoZSB0cmFja2luZyBVUkxzIGFuZCBlbWl0cyBhICdjbGlja3Rocm91Z2gnIGV2ZW50IHdpdGggdGhlIHJlc29sdmVkXG4gICAqIGNsaWNrdGhyb3VnaCBVUkwgd2hlbiBkb25lLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2ZhbGxiYWNrQ2xpY2tUaHJvdWdoVVJMPW51bGxdIC0gYW4gb3B0aW9uYWwgY2xpY2tUaHJvdWdoVVJMIHRlbXBsYXRlIHRoYXQgY291bGQgYmUgdXNlZCBhcyBhIGZhbGxiYWNrXG4gICAqIEBlbWl0cyBWQVNUVHJhY2tlciNjbGlja3Rocm91Z2hcbiAgICovXG4gIGNsaWNrKGZhbGxiYWNrQ2xpY2tUaHJvdWdoVVJMID0gbnVsbCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuY2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcyAmJlxuICAgICAgdGhpcy5jbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzLmxlbmd0aFxuICAgICkge1xuICAgICAgdGhpcy50cmFja1VSTHModGhpcy5jbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzKTtcbiAgICB9XG5cbiAgICAvLyBVc2UgdGhlIHByb3ZpZGVkIGZhbGxiYWNrQ2xpY2tUaHJvdWdoVVJMIGFzIGEgZmFsbGJhY2tcbiAgICBjb25zdCBjbGlja1Rocm91Z2hVUkxUZW1wbGF0ZSA9XG4gICAgICB0aGlzLmNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlIHx8IGZhbGxiYWNrQ2xpY2tUaHJvdWdoVVJMO1xuXG4gICAgaWYgKGNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlKSB7XG4gICAgICBjb25zdCB2YXJpYWJsZXMgPSB0aGlzLmxpbmVhclxuICAgICAgICA/IHsgQ09OVEVOVFBMQVlIRUFEOiB0aGlzLnByb2dyZXNzRm9ybWF0dGVkKCkgfVxuICAgICAgICA6IHt9O1xuICAgICAgY29uc3QgY2xpY2tUaHJvdWdoVVJMID0gdXRpbC5yZXNvbHZlVVJMVGVtcGxhdGVzKFxuICAgICAgICBbY2xpY2tUaHJvdWdoVVJMVGVtcGxhdGVdLFxuICAgICAgICB2YXJpYWJsZXNcbiAgICAgIClbMF07XG5cbiAgICAgIHRoaXMuZW1pdCgnY2xpY2t0aHJvdWdoJywgY2xpY2tUaHJvdWdoVVJMKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbHMgdGhlIHRyYWNraW5nIFVSTHMgZm9yIHRoZSBnaXZlbiBldmVudE5hbWUgYW5kIGVtaXRzIHRoZSBldmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudC5cbiAgICogQHBhcmFtIHtCb29sZWFufSBbb25jZT1mYWxzZV0gLSBCb29sZWFuIHRvIGRlZmluZSBpZiB0aGUgZXZlbnQgaGFzIHRvIGJlIHRyYWNrZWQgb25seSBvbmNlLlxuICAgKi9cbiAgdHJhY2soZXZlbnROYW1lLCBvbmNlID0gZmFsc2UpIHtcbiAgICAvLyBjbG9zZUxpbmVhciBldmVudCB3YXMgaW50cm9kdWNlZCBpbiBWQVNUIDMuMFxuICAgIC8vIEZhbGxiYWNrIHRvIHZhc3QgMi4wIGNsb3NlIGV2ZW50IGlmIG5lY2Vzc2FyeVxuICAgIGlmIChcbiAgICAgIGV2ZW50TmFtZSA9PT0gJ2Nsb3NlTGluZWFyJyAmJlxuICAgICAgIXRoaXMudHJhY2tpbmdFdmVudHNbZXZlbnROYW1lXSAmJlxuICAgICAgdGhpcy50cmFja2luZ0V2ZW50c1snY2xvc2UnXVxuICAgICkge1xuICAgICAgZXZlbnROYW1lID0gJ2Nsb3NlJztcbiAgICB9XG5cbiAgICBjb25zdCB0cmFja2luZ1VSTFRlbXBsYXRlcyA9IHRoaXMudHJhY2tpbmdFdmVudHNbZXZlbnROYW1lXTtcbiAgICBjb25zdCBpc0Fsd2F5c0VtaXRFdmVudCA9IHRoaXMuZW1pdEFsd2F5c0V2ZW50cy5pbmRleE9mKGV2ZW50TmFtZSkgPiAtMTtcblxuICAgIGlmICh0cmFja2luZ1VSTFRlbXBsYXRlcykge1xuICAgICAgdGhpcy5lbWl0KGV2ZW50TmFtZSwgJycpO1xuICAgICAgdGhpcy50cmFja1VSTHModHJhY2tpbmdVUkxUZW1wbGF0ZXMpO1xuICAgIH0gZWxzZSBpZiAoaXNBbHdheXNFbWl0RXZlbnQpIHtcbiAgICAgIHRoaXMuZW1pdChldmVudE5hbWUsICcnKTtcbiAgICB9XG5cbiAgICBpZiAob25jZSkge1xuICAgICAgZGVsZXRlIHRoaXMudHJhY2tpbmdFdmVudHNbZXZlbnROYW1lXTtcbiAgICAgIGlmIChpc0Fsd2F5c0VtaXRFdmVudCkge1xuICAgICAgICB0aGlzLmVtaXRBbHdheXNFdmVudHMuc3BsaWNlKFxuICAgICAgICAgIHRoaXMuZW1pdEFsd2F5c0V2ZW50cy5pbmRleE9mKGV2ZW50TmFtZSksXG4gICAgICAgICAgMVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxscyB0aGUgdHJhY2tpbmcgdXJscyB0ZW1wbGF0ZXMgd2l0aCB0aGUgZ2l2ZW4gdmFyaWFibGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBVUkxUZW1wbGF0ZXMgLSBBbiBhcnJheSBvZiB0cmFja2luZyB1cmwgdGVtcGxhdGVzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3ZhcmlhYmxlcz17fV0gLSBBbiBvcHRpb25hbCBPYmplY3Qgb2YgcGFyYW1ldGVycyB0byBiZSB1c2VkIGluIHRoZSB0cmFja2luZyBjYWxscy5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtIEFuIG9wdGlvbmFsIE9iamVjdCBvZiBvcHRpb25zIHRvIGJlIHVzZWQgaW4gdGhlIHRyYWNraW5nIGNhbGxzLlxuICAgKi9cbiAgdHJhY2tVUkxzKFVSTFRlbXBsYXRlcywgdmFyaWFibGVzID0ge30sIG9wdGlvbnMgPSB7fSkge1xuICAgIGlmICh0aGlzLmxpbmVhcikge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmNyZWF0aXZlICYmXG4gICAgICAgIHRoaXMuY3JlYXRpdmUubWVkaWFGaWxlcyAmJlxuICAgICAgICB0aGlzLmNyZWF0aXZlLm1lZGlhRmlsZXNbMF0gJiZcbiAgICAgICAgdGhpcy5jcmVhdGl2ZS5tZWRpYUZpbGVzWzBdLmZpbGVVUkxcbiAgICAgICkge1xuICAgICAgICB2YXJpYWJsZXNbJ0FTU0VUVVJJJ10gPSB0aGlzLmNyZWF0aXZlLm1lZGlhRmlsZXNbMF0uZmlsZVVSTDtcbiAgICAgIH1cbiAgICAgIHZhcmlhYmxlc1snQ09OVEVOVFBMQVlIRUFEJ10gPSB0aGlzLnByb2dyZXNzRm9ybWF0dGVkKCk7XG4gICAgfVxuXG4gICAgdXRpbC50cmFjayhVUkxUZW1wbGF0ZXMsIHZhcmlhYmxlcywgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogRm9ybWF0cyB0aW1lIHByb2dyZXNzIGluIGEgcmVhZGFibGUgc3RyaW5nLlxuICAgKlxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuICBwcm9ncmVzc0Zvcm1hdHRlZCgpIHtcbiAgICBjb25zdCBzZWNvbmRzID0gcGFyc2VJbnQodGhpcy5wcm9ncmVzcyk7XG4gICAgbGV0IGggPSBzZWNvbmRzIC8gKDYwICogNjApO1xuICAgIGlmIChoLmxlbmd0aCA8IDIpIHtcbiAgICAgIGggPSBgMCR7aH1gO1xuICAgIH1cbiAgICBsZXQgbSA9IChzZWNvbmRzIC8gNjApICUgNjA7XG4gICAgaWYgKG0ubGVuZ3RoIDwgMikge1xuICAgICAgbSA9IGAwJHttfWA7XG4gICAgfVxuICAgIGxldCBzID0gc2Vjb25kcyAlIDYwO1xuICAgIGlmIChzLmxlbmd0aCA8IDIpIHtcbiAgICAgIHMgPSBgMCR7bX1gO1xuICAgIH1cbiAgICBjb25zdCBtcyA9IHBhcnNlSW50KCh0aGlzLnByb2dyZXNzIC0gc2Vjb25kcykgKiAxMDApO1xuICAgIHJldHVybiBgJHtofToke219OiR7c30uJHttc31gO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9