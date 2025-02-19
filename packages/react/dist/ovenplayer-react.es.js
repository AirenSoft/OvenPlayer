import xe, { useRef as Te, useCallback as Pe, useEffect as Oe } from "react";
import vr from "ovenplayer";
var N = { exports: {} }, $ = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Se;
function gr() {
  if (Se) return $;
  Se = 1;
  var n = xe, T = Symbol.for("react.element"), P = Symbol.for("react.fragment"), E = Object.prototype.hasOwnProperty, _ = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, l = { key: !0, ref: !0, __self: !0, __source: !0 };
  function i(t, g, x) {
    var R, C = {}, S = null, Y = null;
    x !== void 0 && (S = "" + x), g.key !== void 0 && (S = "" + g.key), g.ref !== void 0 && (Y = g.ref);
    for (R in g) E.call(g, R) && !l.hasOwnProperty(R) && (C[R] = g[R]);
    if (t && t.defaultProps) for (R in g = t.defaultProps, g) C[R] === void 0 && (C[R] = g[R]);
    return { $$typeof: T, type: t, key: S, ref: Y, props: C, _owner: _.current };
  }
  return $.Fragment = P, $.jsx = i, $.jsxs = i, $;
}
var W = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var we;
function hr() {
  return we || (we = 1, process.env.NODE_ENV !== "production" && function() {
    var n = xe, T = Symbol.for("react.element"), P = Symbol.for("react.portal"), E = Symbol.for("react.fragment"), _ = Symbol.for("react.strict_mode"), l = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), t = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), x = Symbol.for("react.suspense"), R = Symbol.for("react.suspense_list"), C = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), Y = Symbol.for("react.offscreen"), Q = Symbol.iterator, ke = "@@iterator";
    function De(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = Q && e[Q] || e[ke];
      return typeof r == "function" ? r : null;
    }
    var k = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function h(e) {
      {
        for (var r = arguments.length, a = new Array(r > 1 ? r - 1 : 0), u = 1; u < r; u++)
          a[u - 1] = arguments[u];
        Ae("error", e, a);
      }
    }
    function Ae(e, r, a) {
      {
        var u = k.ReactDebugCurrentFrame, c = u.getStackAddendum();
        c !== "" && (r += "%s", a = a.concat([c]));
        var s = a.map(function(f) {
          return String(f);
        });
        s.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, s);
      }
    }
    var Fe = !1, Ie = !1, $e = !1, We = !1, Ye = !1, Z;
    Z = Symbol.for("react.module.reference");
    function Me(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === E || e === l || Ye || e === _ || e === x || e === R || We || e === Y || Fe || Ie || $e || typeof e == "object" && e !== null && (e.$$typeof === S || e.$$typeof === C || e.$$typeof === i || e.$$typeof === t || e.$$typeof === g || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === Z || e.getModuleId !== void 0));
    }
    function Le(e, r, a) {
      var u = e.displayName;
      if (u)
        return u;
      var c = r.displayName || r.name || "";
      return c !== "" ? a + "(" + c + ")" : a;
    }
    function p(e) {
      return e.displayName || "Context";
    }
    function O(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && h("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case E:
          return "Fragment";
        case P:
          return "Portal";
        case l:
          return "Profiler";
        case _:
          return "StrictMode";
        case x:
          return "Suspense";
        case R:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case t:
            var r = e;
            return p(r) + ".Consumer";
          case i:
            var a = e;
            return p(a._context) + ".Provider";
          case g:
            return Le(e, e.render, "ForwardRef");
          case C:
            var u = e.displayName || null;
            return u !== null ? u : O(e.type) || "Memo";
          case S: {
            var c = e, s = c._payload, f = c._init;
            try {
              return O(f(s));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var w = Object.assign, F = 0, ee, re, ne, te, ae, ie, ue;
    function oe() {
    }
    oe.__reactDisabledLog = !0;
    function Ve() {
      {
        if (F === 0) {
          ee = console.log, re = console.info, ne = console.warn, te = console.error, ae = console.group, ie = console.groupCollapsed, ue = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: oe,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        F++;
      }
    }
    function Ue() {
      {
        if (F--, F === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: w({}, e, {
              value: ee
            }),
            info: w({}, e, {
              value: re
            }),
            warn: w({}, e, {
              value: ne
            }),
            error: w({}, e, {
              value: te
            }),
            group: w({}, e, {
              value: ae
            }),
            groupCollapsed: w({}, e, {
              value: ie
            }),
            groupEnd: w({}, e, {
              value: ue
            })
          });
        }
        F < 0 && h("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var q = k.ReactCurrentDispatcher, J;
    function M(e, r, a) {
      {
        if (J === void 0)
          try {
            throw Error();
          } catch (c) {
            var u = c.stack.trim().match(/\n( *(at )?)/);
            J = u && u[1] || "";
          }
        return `
` + J + e;
      }
    }
    var B = !1, L;
    {
      var Ne = typeof WeakMap == "function" ? WeakMap : Map;
      L = new Ne();
    }
    function le(e, r) {
      if (!e || B)
        return "";
      {
        var a = L.get(e);
        if (a !== void 0)
          return a;
      }
      var u;
      B = !0;
      var c = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var s;
      s = q.current, q.current = null, Ve();
      try {
        if (r) {
          var f = function() {
            throw Error();
          };
          if (Object.defineProperty(f.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(f, []);
            } catch (m) {
              u = m;
            }
            Reflect.construct(e, [], f);
          } else {
            try {
              f.call();
            } catch (m) {
              u = m;
            }
            e.call(f.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (m) {
            u = m;
          }
          e();
        }
      } catch (m) {
        if (m && u && typeof m.stack == "string") {
          for (var o = m.stack.split(`
`), y = u.stack.split(`
`), d = o.length - 1, v = y.length - 1; d >= 1 && v >= 0 && o[d] !== y[v]; )
            v--;
          for (; d >= 1 && v >= 0; d--, v--)
            if (o[d] !== y[v]) {
              if (d !== 1 || v !== 1)
                do
                  if (d--, v--, v < 0 || o[d] !== y[v]) {
                    var b = `
` + o[d].replace(" at new ", " at ");
                    return e.displayName && b.includes("<anonymous>") && (b = b.replace("<anonymous>", e.displayName)), typeof e == "function" && L.set(e, b), b;
                  }
                while (d >= 1 && v >= 0);
              break;
            }
        }
      } finally {
        B = !1, q.current = s, Ue(), Error.prepareStackTrace = c;
      }
      var A = e ? e.displayName || e.name : "", j = A ? M(A) : "";
      return typeof e == "function" && L.set(e, j), j;
    }
    function qe(e, r, a) {
      return le(e, !1);
    }
    function Je(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function V(e, r, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return le(e, Je(e));
      if (typeof e == "string")
        return M(e);
      switch (e) {
        case x:
          return M("Suspense");
        case R:
          return M("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case g:
            return qe(e.render);
          case C:
            return V(e.type, r, a);
          case S: {
            var u = e, c = u._payload, s = u._init;
            try {
              return V(s(c), r, a);
            } catch {
            }
          }
        }
      return "";
    }
    var I = Object.prototype.hasOwnProperty, fe = {}, ce = k.ReactDebugCurrentFrame;
    function U(e) {
      if (e) {
        var r = e._owner, a = V(e.type, e._source, r ? r.type : null);
        ce.setExtraStackFrame(a);
      } else
        ce.setExtraStackFrame(null);
    }
    function Be(e, r, a, u, c) {
      {
        var s = Function.call.bind(I);
        for (var f in e)
          if (s(e, f)) {
            var o = void 0;
            try {
              if (typeof e[f] != "function") {
                var y = Error((u || "React class") + ": " + a + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw y.name = "Invariant Violation", y;
              }
              o = e[f](r, f, u, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (d) {
              o = d;
            }
            o && !(o instanceof Error) && (U(c), h("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", u || "React class", a, f, typeof o), U(null)), o instanceof Error && !(o.message in fe) && (fe[o.message] = !0, U(c), h("Failed %s type: %s", a, o.message), U(null));
          }
      }
    }
    var Ke = Array.isArray;
    function K(e) {
      return Ke(e);
    }
    function ze(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, a = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function Ge(e) {
      try {
        return se(e), !1;
      } catch {
        return !0;
      }
    }
    function se(e) {
      return "" + e;
    }
    function de(e) {
      if (Ge(e))
        return h("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ze(e)), se(e);
    }
    var ve = k.ReactCurrentOwner, He = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ge, he;
    function Xe(e) {
      if (I.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Qe(e) {
      if (I.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Ze(e, r) {
      typeof e.ref == "string" && ve.current;
    }
    function pe(e, r) {
      {
        var a = function() {
          ge || (ge = !0, h("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        a.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: a,
          configurable: !0
        });
      }
    }
    function er(e, r) {
      {
        var a = function() {
          he || (he = !0, h("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        a.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: a,
          configurable: !0
        });
      }
    }
    var rr = function(e, r, a, u, c, s, f) {
      var o = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: T,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: a,
        props: f,
        // Record the component responsible for creating this element.
        _owner: s
      };
      return o._store = {}, Object.defineProperty(o._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(o, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: u
      }), Object.defineProperty(o, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: c
      }), Object.freeze && (Object.freeze(o.props), Object.freeze(o)), o;
    };
    function nr(e, r, a, u, c) {
      {
        var s, f = {}, o = null, y = null;
        a !== void 0 && (de(a), o = "" + a), Qe(r) && (de(r.key), o = "" + r.key), Xe(r) && (y = r.ref, Ze(r, c));
        for (s in r)
          I.call(r, s) && !He.hasOwnProperty(s) && (f[s] = r[s]);
        if (e && e.defaultProps) {
          var d = e.defaultProps;
          for (s in d)
            f[s] === void 0 && (f[s] = d[s]);
        }
        if (o || y) {
          var v = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          o && pe(f, v), y && er(f, v);
        }
        return rr(e, o, y, c, u, ve.current, f);
      }
    }
    var z = k.ReactCurrentOwner, ye = k.ReactDebugCurrentFrame;
    function D(e) {
      if (e) {
        var r = e._owner, a = V(e.type, e._source, r ? r.type : null);
        ye.setExtraStackFrame(a);
      } else
        ye.setExtraStackFrame(null);
    }
    var G;
    G = !1;
    function H(e) {
      return typeof e == "object" && e !== null && e.$$typeof === T;
    }
    function me() {
      {
        if (z.current) {
          var e = O(z.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function tr(e) {
      return "";
    }
    var Re = {};
    function ar(e) {
      {
        var r = me();
        if (!r) {
          var a = typeof e == "string" ? e : e.displayName || e.name;
          a && (r = `

Check the top-level render call using <` + a + ">.");
        }
        return r;
      }
    }
    function be(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var a = ar(r);
        if (Re[a])
          return;
        Re[a] = !0;
        var u = "";
        e && e._owner && e._owner !== z.current && (u = " It was passed a child from " + O(e._owner.type) + "."), D(e), h('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', a, u), D(null);
      }
    }
    function Ee(e, r) {
      {
        if (typeof e != "object")
          return;
        if (K(e))
          for (var a = 0; a < e.length; a++) {
            var u = e[a];
            H(u) && be(u, r);
          }
        else if (H(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var c = De(e);
          if (typeof c == "function" && c !== e.entries)
            for (var s = c.call(e), f; !(f = s.next()).done; )
              H(f.value) && be(f.value, r);
        }
      }
    }
    function ir(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var a;
        if (typeof r == "function")
          a = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === g || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === C))
          a = r.propTypes;
        else
          return;
        if (a) {
          var u = O(r);
          Be(a, e.props, "prop", u, e);
        } else if (r.PropTypes !== void 0 && !G) {
          G = !0;
          var c = O(r);
          h("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", c || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && h("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ur(e) {
      {
        for (var r = Object.keys(e.props), a = 0; a < r.length; a++) {
          var u = r[a];
          if (u !== "children" && u !== "key") {
            D(e), h("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", u), D(null);
            break;
          }
        }
        e.ref !== null && (D(e), h("Invalid attribute `ref` supplied to `React.Fragment`."), D(null));
      }
    }
    var _e = {};
    function Ce(e, r, a, u, c, s) {
      {
        var f = Me(e);
        if (!f) {
          var o = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (o += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var y = tr();
          y ? o += y : o += me();
          var d;
          e === null ? d = "null" : K(e) ? d = "array" : e !== void 0 && e.$$typeof === T ? (d = "<" + (O(e.type) || "Unknown") + " />", o = " Did you accidentally export a JSX literal instead of a component?") : d = typeof e, h("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", d, o);
        }
        var v = nr(e, r, a, c, s);
        if (v == null)
          return v;
        if (f) {
          var b = r.children;
          if (b !== void 0)
            if (u)
              if (K(b)) {
                for (var A = 0; A < b.length; A++)
                  Ee(b[A], e);
                Object.freeze && Object.freeze(b);
              } else
                h("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ee(b, e);
        }
        if (I.call(r, "key")) {
          var j = O(e), m = Object.keys(r).filter(function(dr) {
            return dr !== "key";
          }), X = m.length > 0 ? "{key: someKey, " + m.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!_e[j + X]) {
            var sr = m.length > 0 ? "{" + m.join(": ..., ") + ": ...}" : "{}";
            h(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, X, j, sr, j), _e[j + X] = !0;
          }
        }
        return e === E ? ur(v) : ir(v), v;
      }
    }
    function or(e, r, a) {
      return Ce(e, r, a, !0);
    }
    function lr(e, r, a) {
      return Ce(e, r, a, !1);
    }
    var fr = lr, cr = or;
    W.Fragment = E, W.jsx = fr, W.jsxs = cr;
  }()), W;
}
var je;
function yr() {
  return je || (je = 1, process.env.NODE_ENV === "production" ? N.exports = gr() : N.exports = hr()), N.exports;
}
var mr = yr();
const Er = (n) => {
  const T = Te(
    `ovenplayer-${Math.random().toString(36).substring(2)}`
  ), P = Te(null), E = Pe(() => {
    if (P.current) {
      try {
        P.current.remove();
      } catch {
      }
      P.current = null;
    }
  }, []), _ = Pe(() => {
    E();
    const l = vr.create(T.current, n.config);
    l.on("ready", () => {
      var i;
      return (i = n.onReady) == null ? void 0 : i.call(n);
    }), l.on("metaChanged", (i) => {
      var t;
      return (t = n.onMetaChanged) == null ? void 0 : t.call(n, i);
    }), l.on("stateChanged", (i) => {
      var t;
      return (t = n.onStateChanged) == null ? void 0 : t.call(n, i);
    }), l.on("resized", (i) => {
      var t;
      return (t = n.onResized) == null ? void 0 : t.call(n, i);
    }), l.on(
      "playbackRateChanged",
      (i) => {
        var t;
        return (t = n.onPlaybackRateChanged) == null ? void 0 : t.call(n, i);
      }
    ), l.on("seek", (i) => {
      var t;
      return (t = n.onSeek) == null ? void 0 : t.call(n, i);
    }), l.on("time", (i) => {
      var t;
      return (t = n.onTime) == null ? void 0 : t.call(n, i);
    }), l.on("bufferChanged", (i) => {
      var t;
      return (t = n.onBufferChanged) == null ? void 0 : t.call(n, i);
    }), l.on("mute", (i) => {
      var t;
      return (t = n.onMute) == null ? void 0 : t.call(n, i);
    }), l.on("volumeChanged", (i) => {
      var t;
      return (t = n.onVolumeChanged) == null ? void 0 : t.call(n, i);
    }), l.on("playlistChanged", (i) => {
      var t;
      return (t = n.onPlaylistChanged) == null ? void 0 : t.call(n, i);
    }), l.on("sourceChanged", (i) => {
      var t;
      return (t = n.onSourceChanged) == null ? void 0 : t.call(n, i);
    }), l.on(
      "qualityLevelChanged",
      (i) => {
        var t;
        return (t = n.onQualityLevelChanged) == null ? void 0 : t.call(n, i);
      }
    ), l.on("cueChanged", (i) => {
      var t;
      return (t = n.onCueChanged) == null ? void 0 : t.call(n, i);
    }), l.on(
      "timeDisplayModeChanged",
      (i) => {
        var t;
        return (t = n.onTimeDisplayModeChanged) == null ? void 0 : t.call(n, i);
      }
    ), l.on("adChanged", (i) => {
      var t;
      return (t = n.onAdChanged) == null ? void 0 : t.call(n, i);
    }), l.on("adTime", (i) => {
      var t;
      return (t = n.onAdTime) == null ? void 0 : t.call(n, i);
    }), l.on("adComplete", () => {
      var i;
      return (i = n.onAdComplete) == null ? void 0 : i.call(n);
    }), l.on(
      "fullscreenChanged",
      (i) => {
        var t;
        return (t = n.onFullscreenChanged) == null ? void 0 : t.call(n, i);
      }
    ), l.on("clicked", (i) => {
      var t;
      return (t = n.onClicked) == null ? void 0 : t.call(n, i);
    }), l.on("allPlaylistEnded", () => {
      var i;
      return (i = n.onAllPlaylistEnded) == null ? void 0 : i.call(n);
    }), l.on("hlsPrepared", (i) => {
      var t;
      return (t = n.onHlsPrepared) == null ? void 0 : t.call(n, i);
    }), l.on("hlsDestroyed", () => {
      var i;
      return (i = n.onHlsDestroyed) == null ? void 0 : i.call(n);
    }), l.on("dashPrepared", (i) => {
      var t;
      return (t = n.onDashPrepared) == null ? void 0 : t.call(n, i);
    }), l.on("dashDestroyed", () => {
      var i;
      return (i = n.onDashDestroyed) == null ? void 0 : i.call(n);
    }), l.on("destroy", () => {
      var i;
      return (i = n.onDestroy) == null ? void 0 : i.call(n);
    }), l.on("error", (i) => {
      var t;
      return (t = n.onError) == null ? void 0 : t.call(n, i);
    }), P.current = l;
  }, [n, E]);
  return Oe(() => (_(), () => {
    E();
  }), [_, E]), Oe(() => {
    _();
  }, [n.config, _]), /* @__PURE__ */ mr.jsx("div", { id: T.current });
};
export {
  Er as default
};
