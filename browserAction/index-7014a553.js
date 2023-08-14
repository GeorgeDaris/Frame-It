(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
  new MutationObserver((r) => {
    for (const o of r)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && s(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(r) {
    const o = {};
    return (
      r.integrity && (o.integrity = r.integrity),
      r.referrerPolicy && (o.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : r.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function s(r) {
    if (r.ep) return;
    r.ep = !0;
    const o = n(r);
    fetch(r.href, o);
  }
})();
function ts(e, t) {
  const n = Object.create(null),
    s = e.split(",");
  for (let r = 0; r < s.length; r++) n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
const q = {},
  ht = [],
  Oe = () => {},
  mo = () => !1,
  _o = /^on[^a-z]/,
  _n = (e) => _o.test(e),
  ns = (e) => e.startsWith("onUpdate:"),
  se = Object.assign,
  ss = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  bo = Object.prototype.hasOwnProperty,
  U = (e, t) => bo.call(e, t),
  O = Array.isArray,
  gt = (e) => Kt(e) === "[object Map]",
  bn = (e) => Kt(e) === "[object Set]",
  Os = (e) => Kt(e) === "[object Date]",
  S = (e) => typeof e == "function",
  ne = (e) => typeof e == "string",
  $t = (e) => typeof e == "symbol",
  D = (e) => e !== null && typeof e == "object",
  hr = (e) => D(e) && S(e.then) && S(e.catch),
  gr = Object.prototype.toString,
  Kt = (e) => gr.call(e),
  vo = (e) => Kt(e).slice(8, -1),
  mr = (e) => Kt(e) === "[object Object]",
  rs = (e) =>
    ne(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  en = ts(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  vn = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  yo = /-(\w)/g,
  bt = vn((e) => e.replace(yo, (t, n) => (n ? n.toUpperCase() : ""))),
  xo = /\B([A-Z])/g,
  wt = vn((e) => e.replace(xo, "-$1").toLowerCase()),
  _r = vn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Fn = vn((e) => (e ? `on${_r(e)}` : "")),
  Bt = (e, t) => !Object.is(e, t),
  tn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  on = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  ln = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  wo = (e) => {
    const t = ne(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let As;
const Hn = () =>
  As ||
  (As =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
function os(e) {
  if (O(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        r = ne(s) ? To(s) : os(s);
      if (r) for (const o in r) t[o] = r[o];
    }
    return t;
  } else {
    if (ne(e)) return e;
    if (D(e)) return e;
  }
}
const Co = /;(?![^(]*\))/g,
  Io = /:([^]+)/,
  Eo = /\/\*[^]*?\*\//g;
function To(e) {
  const t = {};
  return (
    e
      .replace(Eo, "")
      .split(Co)
      .forEach((n) => {
        if (n) {
          const s = n.split(Io);
          s.length > 1 && (t[s[0].trim()] = s[1].trim());
        }
      }),
    t
  );
}
function ve(e) {
  let t = "";
  if (ne(e)) t = e;
  else if (O(e))
    for (let n = 0; n < e.length; n++) {
      const s = ve(e[n]);
      s && (t += s + " ");
    }
  else if (D(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const Oo =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Ao = ts(Oo);
function br(e) {
  return !!e || e === "";
}
function Lo(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let s = 0; n && s < e.length; s++) n = yn(e[s], t[s]);
  return n;
}
function yn(e, t) {
  if (e === t) return !0;
  let n = Os(e),
    s = Os(t);
  if (n || s) return n && s ? e.getTime() === t.getTime() : !1;
  if (((n = $t(e)), (s = $t(t)), n || s)) return e === t;
  if (((n = O(e)), (s = O(t)), n || s)) return n && s ? Lo(e, t) : !1;
  if (((n = D(e)), (s = D(t)), n || s)) {
    if (!n || !s) return !1;
    const r = Object.keys(e).length,
      o = Object.keys(t).length;
    if (r !== o) return !1;
    for (const i in e) {
      const l = e.hasOwnProperty(i),
        u = t.hasOwnProperty(i);
      if ((l && !u) || (!l && u) || !yn(e[i], t[i])) return !1;
    }
  }
  return String(e) === String(t);
}
function Mo(e, t) {
  return e.findIndex((n) => yn(n, t));
}
const cn = (e) =>
    ne(e)
      ? e
      : e == null
      ? ""
      : O(e) || (D(e) && (e.toString === gr || !S(e.toString)))
      ? JSON.stringify(e, vr, 2)
      : String(e),
  vr = (e, t) =>
    t && t.__v_isRef
      ? vr(e, t.value)
      : gt(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [s, r]) => ((n[`${s} =>`] = r), n),
            {}
          ),
        }
      : bn(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : D(t) && !O(t) && !mr(t)
      ? String(t)
      : t;
let Ie;
class Po {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Ie),
      !t && Ie && (this.index = (Ie.scopes || (Ie.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = Ie;
      try {
        return (Ie = this), t();
      } finally {
        Ie = n;
      }
    }
  }
  on() {
    Ie = this;
  }
  off() {
    Ie = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r &&
          r !== this &&
          ((this.parent.scopes[this.index] = r), (r.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function Fo(e, t = Ie) {
  t && t.active && t.effects.push(e);
}
function So() {
  return Ie;
}
const is = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  yr = (e) => (e.w & We) > 0,
  xr = (e) => (e.n & We) > 0,
  Ro = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= We;
  },
  No = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let s = 0; s < t.length; s++) {
        const r = t[s];
        yr(r) && !xr(r) ? r.delete(e) : (t[n++] = r),
          (r.w &= ~We),
          (r.n &= ~We);
      }
      t.length = n;
    }
  },
  un = new WeakMap();
let Lt = 0,
  We = 1;
const jn = 30;
let Ee;
const it = Symbol(""),
  Dn = Symbol("");
class ls {
  constructor(t, n = null, s) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Fo(this, s);
  }
  run() {
    if (!this.active) return this.fn();
    let t = Ee,
      n = qe;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = Ee),
        (Ee = this),
        (qe = !0),
        (We = 1 << ++Lt),
        Lt <= jn ? Ro(this) : Ls(this),
        this.fn()
      );
    } finally {
      Lt <= jn && No(this),
        (We = 1 << --Lt),
        (Ee = this.parent),
        (qe = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    Ee === this
      ? (this.deferStop = !0)
      : this.active &&
        (Ls(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function Ls(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let qe = !0;
const wr = [];
function Ct() {
  wr.push(qe), (qe = !1);
}
function It() {
  const e = wr.pop();
  qe = e === void 0 ? !0 : e;
}
function me(e, t, n) {
  if (qe && Ee) {
    let s = un.get(e);
    s || un.set(e, (s = new Map()));
    let r = s.get(n);
    r || s.set(n, (r = is())), Cr(r);
  }
}
function Cr(e, t) {
  let n = !1;
  Lt <= jn ? xr(e) || ((e.n |= We), (n = !yr(e))) : (n = !e.has(Ee)),
    n && (e.add(Ee), Ee.deps.push(e));
}
function Be(e, t, n, s, r, o) {
  const i = un.get(e);
  if (!i) return;
  let l = [];
  if (t === "clear") l = [...i.values()];
  else if (n === "length" && O(e)) {
    const u = Number(s);
    i.forEach((a, d) => {
      (d === "length" || d >= u) && l.push(a);
    });
  } else
    switch ((n !== void 0 && l.push(i.get(n)), t)) {
      case "add":
        O(e)
          ? rs(n) && l.push(i.get("length"))
          : (l.push(i.get(it)), gt(e) && l.push(i.get(Dn)));
        break;
      case "delete":
        O(e) || (l.push(i.get(it)), gt(e) && l.push(i.get(Dn)));
        break;
      case "set":
        gt(e) && l.push(i.get(it));
        break;
    }
  if (l.length === 1) l[0] && kn(l[0]);
  else {
    const u = [];
    for (const a of l) a && u.push(...a);
    kn(is(u));
  }
}
function kn(e, t) {
  const n = O(e) ? e : [...e];
  for (const s of n) s.computed && Ms(s);
  for (const s of n) s.computed || Ms(s);
}
function Ms(e, t) {
  (e !== Ee || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
function $o(e, t) {
  var n;
  return (n = un.get(e)) == null ? void 0 : n.get(t);
}
const Bo = ts("__proto__,__v_isRef,__isVue"),
  Ir = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter($t)
  ),
  Uo = cs(),
  Ho = cs(!1, !0),
  jo = cs(!0),
  Ps = Do();
function Do() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const s = H(this);
        for (let o = 0, i = this.length; o < i; o++) me(s, "get", o + "");
        const r = s[t](...n);
        return r === -1 || r === !1 ? s[t](...n.map(H)) : r;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        Ct();
        const s = H(this)[t].apply(this, n);
        return It(), s;
      };
    }),
    e
  );
}
function ko(e) {
  const t = H(this);
  return me(t, "has", e), t.hasOwnProperty(e);
}
function cs(e = !1, t = !1) {
  return function (s, r, o) {
    if (r === "__v_isReactive") return !e;
    if (r === "__v_isReadonly") return e;
    if (r === "__v_isShallow") return t;
    if (r === "__v_raw" && o === (e ? (t ? ri : Lr) : t ? Ar : Or).get(s))
      return s;
    const i = O(s);
    if (!e) {
      if (i && U(Ps, r)) return Reflect.get(Ps, r, o);
      if (r === "hasOwnProperty") return ko;
    }
    const l = Reflect.get(s, r, o);
    return ($t(r) ? Ir.has(r) : Bo(r)) || (e || me(s, "get", r), t)
      ? l
      : ie(l)
      ? i && rs(r)
        ? l
        : l.value
      : D(l)
      ? e
        ? Mr(l)
        : Vt(l)
      : l;
  };
}
const Ko = Er(),
  Vo = Er(!0);
function Er(e = !1) {
  return function (n, s, r, o) {
    let i = n[s];
    if (vt(i) && ie(i) && !ie(r)) return !1;
    if (
      !e &&
      (!fn(r) && !vt(r) && ((i = H(i)), (r = H(r))), !O(n) && ie(i) && !ie(r))
    )
      return (i.value = r), !0;
    const l = O(n) && rs(s) ? Number(s) < n.length : U(n, s),
      u = Reflect.set(n, s, r, o);
    return (
      n === H(o) && (l ? Bt(r, i) && Be(n, "set", s, r) : Be(n, "add", s, r)), u
    );
  };
}
function qo(e, t) {
  const n = U(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && Be(e, "delete", t, void 0), s;
}
function zo(e, t) {
  const n = Reflect.has(e, t);
  return (!$t(t) || !Ir.has(t)) && me(e, "has", t), n;
}
function Wo(e) {
  return me(e, "iterate", O(e) ? "length" : it), Reflect.ownKeys(e);
}
const Tr = { get: Uo, set: Ko, deleteProperty: qo, has: zo, ownKeys: Wo },
  Jo = {
    get: jo,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  Yo = se({}, Tr, { get: Ho, set: Vo }),
  us = (e) => e,
  xn = (e) => Reflect.getPrototypeOf(e);
function Jt(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = H(e),
    o = H(t);
  n || (t !== o && me(r, "get", t), me(r, "get", o));
  const { has: i } = xn(r),
    l = s ? us : n ? ds : Ut;
  if (i.call(r, t)) return l(e.get(t));
  if (i.call(r, o)) return l(e.get(o));
  e !== r && e.get(t);
}
function Yt(e, t = !1) {
  const n = this.__v_raw,
    s = H(n),
    r = H(e);
  return (
    t || (e !== r && me(s, "has", e), me(s, "has", r)),
    e === r ? n.has(e) : n.has(e) || n.has(r)
  );
}
function Zt(e, t = !1) {
  return (
    (e = e.__v_raw), !t && me(H(e), "iterate", it), Reflect.get(e, "size", e)
  );
}
function Fs(e) {
  e = H(e);
  const t = H(this);
  return xn(t).has.call(t, e) || (t.add(e), Be(t, "add", e, e)), this;
}
function Ss(e, t) {
  t = H(t);
  const n = H(this),
    { has: s, get: r } = xn(n);
  let o = s.call(n, e);
  o || ((e = H(e)), (o = s.call(n, e)));
  const i = r.call(n, e);
  return (
    n.set(e, t), o ? Bt(t, i) && Be(n, "set", e, t) : Be(n, "add", e, t), this
  );
}
function Rs(e) {
  const t = H(this),
    { has: n, get: s } = xn(t);
  let r = n.call(t, e);
  r || ((e = H(e)), (r = n.call(t, e))), s && s.call(t, e);
  const o = t.delete(e);
  return r && Be(t, "delete", e, void 0), o;
}
function Ns() {
  const e = H(this),
    t = e.size !== 0,
    n = e.clear();
  return t && Be(e, "clear", void 0, void 0), n;
}
function Xt(e, t) {
  return function (s, r) {
    const o = this,
      i = o.__v_raw,
      l = H(i),
      u = t ? us : e ? ds : Ut;
    return (
      !e && me(l, "iterate", it), i.forEach((a, d) => s.call(r, u(a), u(d), o))
    );
  };
}
function Qt(e, t, n) {
  return function (...s) {
    const r = this.__v_raw,
      o = H(r),
      i = gt(o),
      l = e === "entries" || (e === Symbol.iterator && i),
      u = e === "keys" && i,
      a = r[e](...s),
      d = n ? us : t ? ds : Ut;
    return (
      !t && me(o, "iterate", u ? Dn : it),
      {
        next() {
          const { value: h, done: _ } = a.next();
          return _
            ? { value: h, done: _ }
            : { value: l ? [d(h[0]), d(h[1])] : d(h), done: _ };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function He(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function Zo() {
  const e = {
      get(o) {
        return Jt(this, o);
      },
      get size() {
        return Zt(this);
      },
      has: Yt,
      add: Fs,
      set: Ss,
      delete: Rs,
      clear: Ns,
      forEach: Xt(!1, !1),
    },
    t = {
      get(o) {
        return Jt(this, o, !1, !0);
      },
      get size() {
        return Zt(this);
      },
      has: Yt,
      add: Fs,
      set: Ss,
      delete: Rs,
      clear: Ns,
      forEach: Xt(!1, !0),
    },
    n = {
      get(o) {
        return Jt(this, o, !0);
      },
      get size() {
        return Zt(this, !0);
      },
      has(o) {
        return Yt.call(this, o, !0);
      },
      add: He("add"),
      set: He("set"),
      delete: He("delete"),
      clear: He("clear"),
      forEach: Xt(!0, !1),
    },
    s = {
      get(o) {
        return Jt(this, o, !0, !0);
      },
      get size() {
        return Zt(this, !0);
      },
      has(o) {
        return Yt.call(this, o, !0);
      },
      add: He("add"),
      set: He("set"),
      delete: He("delete"),
      clear: He("clear"),
      forEach: Xt(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
      (e[o] = Qt(o, !1, !1)),
        (n[o] = Qt(o, !0, !1)),
        (t[o] = Qt(o, !1, !0)),
        (s[o] = Qt(o, !0, !0));
    }),
    [e, n, t, s]
  );
}
const [Xo, Qo, Go, ei] = Zo();
function fs(e, t) {
  const n = t ? (e ? ei : Go) : e ? Qo : Xo;
  return (s, r, o) =>
    r === "__v_isReactive"
      ? !e
      : r === "__v_isReadonly"
      ? e
      : r === "__v_raw"
      ? s
      : Reflect.get(U(n, r) && r in s ? n : s, r, o);
}
const ti = { get: fs(!1, !1) },
  ni = { get: fs(!1, !0) },
  si = { get: fs(!0, !1) },
  Or = new WeakMap(),
  Ar = new WeakMap(),
  Lr = new WeakMap(),
  ri = new WeakMap();
function oi(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function ii(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : oi(vo(e));
}
function Vt(e) {
  return vt(e) ? e : as(e, !1, Tr, ti, Or);
}
function li(e) {
  return as(e, !1, Yo, ni, Ar);
}
function Mr(e) {
  return as(e, !0, Jo, si, Lr);
}
function as(e, t, n, s, r) {
  if (!D(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = r.get(e);
  if (o) return o;
  const i = ii(e);
  if (i === 0) return e;
  const l = new Proxy(e, i === 2 ? s : n);
  return r.set(e, l), l;
}
function mt(e) {
  return vt(e) ? mt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function vt(e) {
  return !!(e && e.__v_isReadonly);
}
function fn(e) {
  return !!(e && e.__v_isShallow);
}
function Pr(e) {
  return mt(e) || vt(e);
}
function H(e) {
  const t = e && e.__v_raw;
  return t ? H(t) : e;
}
function Fr(e) {
  return on(e, "__v_skip", !0), e;
}
const Ut = (e) => (D(e) ? Vt(e) : e),
  ds = (e) => (D(e) ? Mr(e) : e);
function Sr(e) {
  qe && Ee && ((e = H(e)), Cr(e.dep || (e.dep = is())));
}
function Rr(e, t) {
  e = H(e);
  const n = e.dep;
  n && kn(n);
}
function ie(e) {
  return !!(e && e.__v_isRef === !0);
}
function ue(e) {
  return ci(e, !1);
}
function ci(e, t) {
  return ie(e) ? e : new ui(e, t);
}
class ui {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : H(t)),
      (this._value = n ? t : Ut(t));
  }
  get value() {
    return Sr(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || fn(t) || vt(t);
    (t = n ? t : H(t)),
      Bt(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : Ut(t)), Rr(this));
  }
}
function te(e) {
  return ie(e) ? e.value : e;
}
const fi = {
  get: (e, t, n) => te(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return ie(r) && !ie(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
  },
};
function Nr(e) {
  return mt(e) ? e : new Proxy(e, fi);
}
function ai(e) {
  const t = O(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = pi(e, n);
  return t;
}
class di {
  constructor(t, n, s) {
    (this._object = t),
      (this._key = n),
      (this._defaultValue = s),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return $o(H(this._object), this._key);
  }
}
function pi(e, t, n) {
  const s = e[t];
  return ie(s) ? s : new di(e, t, n);
}
class hi {
  constructor(t, n, s, r) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new ls(t, () => {
        this._dirty || ((this._dirty = !0), Rr(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !r),
      (this.__v_isReadonly = s);
  }
  get value() {
    const t = H(this);
    return (
      Sr(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function gi(e, t, n = !1) {
  let s, r;
  const o = S(e);
  return (
    o ? ((s = e), (r = Oe)) : ((s = e.get), (r = e.set)),
    new hi(s, r, o || !r, n)
  );
}
function ze(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (o) {
    wn(o, t, n);
  }
  return r;
}
function xe(e, t, n, s) {
  if (S(e)) {
    const o = ze(e, t, n, s);
    return (
      o &&
        hr(o) &&
        o.catch((i) => {
          wn(i, t, n);
        }),
      o
    );
  }
  const r = [];
  for (let o = 0; o < e.length; o++) r.push(xe(e[o], t, n, s));
  return r;
}
function wn(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy,
      l = n;
    for (; o; ) {
      const a = o.ec;
      if (a) {
        for (let d = 0; d < a.length; d++) if (a[d](e, i, l) === !1) return;
      }
      o = o.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      ze(u, null, 10, [e, i, l]);
      return;
    }
  }
  mi(e, n, r, s);
}
function mi(e, t, n, s = !0) {
  console.error(e);
}
let Ht = !1,
  Kn = !1;
const fe = [];
let Re = 0;
const _t = [];
let $e = null,
  tt = 0;
const $r = Promise.resolve();
let ps = null;
function Vn(e) {
  const t = ps || $r;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function _i(e) {
  let t = Re + 1,
    n = fe.length;
  for (; t < n; ) {
    const s = (t + n) >>> 1;
    jt(fe[s]) < e ? (t = s + 1) : (n = s);
  }
  return t;
}
function hs(e) {
  (!fe.length || !fe.includes(e, Ht && e.allowRecurse ? Re + 1 : Re)) &&
    (e.id == null ? fe.push(e) : fe.splice(_i(e.id), 0, e), Br());
}
function Br() {
  !Ht && !Kn && ((Kn = !0), (ps = $r.then(Hr)));
}
function bi(e) {
  const t = fe.indexOf(e);
  t > Re && fe.splice(t, 1);
}
function vi(e) {
  O(e)
    ? _t.push(...e)
    : (!$e || !$e.includes(e, e.allowRecurse ? tt + 1 : tt)) && _t.push(e),
    Br();
}
function $s(e, t = Ht ? Re + 1 : 0) {
  for (; t < fe.length; t++) {
    const n = fe[t];
    n && n.pre && (fe.splice(t, 1), t--, n());
  }
}
function Ur(e) {
  if (_t.length) {
    const t = [...new Set(_t)];
    if (((_t.length = 0), $e)) {
      $e.push(...t);
      return;
    }
    for ($e = t, $e.sort((n, s) => jt(n) - jt(s)), tt = 0; tt < $e.length; tt++)
      $e[tt]();
    ($e = null), (tt = 0);
  }
}
const jt = (e) => (e.id == null ? 1 / 0 : e.id),
  yi = (e, t) => {
    const n = jt(e) - jt(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function Hr(e) {
  (Kn = !1), (Ht = !0), fe.sort(yi);
  const t = Oe;
  try {
    for (Re = 0; Re < fe.length; Re++) {
      const n = fe[Re];
      n && n.active !== !1 && ze(n, null, 14);
    }
  } finally {
    (Re = 0),
      (fe.length = 0),
      Ur(),
      (Ht = !1),
      (ps = null),
      (fe.length || _t.length) && Hr();
  }
}
function xi(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || q;
  let r = n;
  const o = t.startsWith("update:"),
    i = o && t.slice(7);
  if (i && i in s) {
    const d = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: h, trim: _ } = s[d] || q;
    _ && (r = n.map((C) => (ne(C) ? C.trim() : C))), h && (r = n.map(ln));
  }
  let l,
    u = s[(l = Fn(t))] || s[(l = Fn(bt(t)))];
  !u && o && (u = s[(l = Fn(wt(t)))]), u && xe(u, e, 6, r);
  const a = s[l + "Once"];
  if (a) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), xe(a, e, 6, r);
  }
}
function jr(e, t, n = !1) {
  const s = t.emitsCache,
    r = s.get(e);
  if (r !== void 0) return r;
  const o = e.emits;
  let i = {},
    l = !1;
  if (!S(e)) {
    const u = (a) => {
      const d = jr(a, t, !0);
      d && ((l = !0), se(i, d));
    };
    !n && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u);
  }
  return !o && !l
    ? (D(e) && s.set(e, null), null)
    : (O(o) ? o.forEach((u) => (i[u] = null)) : se(i, o),
      D(e) && s.set(e, i),
      i);
}
function Cn(e, t) {
  return !e || !_n(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      U(e, t[0].toLowerCase() + t.slice(1)) || U(e, wt(t)) || U(e, t));
}
let ae = null,
  In = null;
function an(e) {
  const t = ae;
  return (ae = e), (In = (e && e.type.__scopeId) || null), t;
}
function wi(e) {
  In = e;
}
function Ci() {
  In = null;
}
function yt(e, t = ae, n) {
  if (!t || e._n) return e;
  const s = (...r) => {
    s._d && Ws(-1);
    const o = an(t);
    let i;
    try {
      i = e(...r);
    } finally {
      an(o), s._d && Ws(1);
    }
    return i;
  };
  return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function Sn(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    props: o,
    propsOptions: [i],
    slots: l,
    attrs: u,
    emit: a,
    render: d,
    renderCache: h,
    data: _,
    setupState: C,
    ctx: F,
    inheritAttrs: E,
  } = e;
  let $, R;
  const J = an(e);
  try {
    if (n.shapeFlag & 4) {
      const M = r || s;
      ($ = Se(d.call(M, M, h, o, C, _, F))), (R = u);
    } else {
      const M = t;
      ($ = Se(
        M.length > 1 ? M(o, { attrs: u, slots: l, emit: a }) : M(o, null)
      )),
        (R = t.props ? u : Ii(u));
    }
  } catch (M) {
    (Nt.length = 0), wn(M, e, 1), ($ = W(we));
  }
  let Y = $;
  if (R && E !== !1) {
    const M = Object.keys(R),
      { shapeFlag: re } = Y;
    M.length && re & 7 && (i && M.some(ns) && (R = Ei(R, i)), (Y = Je(Y, R)));
  }
  return (
    n.dirs && ((Y = Je(Y)), (Y.dirs = Y.dirs ? Y.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (Y.transition = n.transition),
    ($ = Y),
    an(J),
    $
  );
}
const Ii = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || _n(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Ei = (e, t) => {
    const n = {};
    for (const s in e) (!ns(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
    return n;
  };
function Ti(e, t, n) {
  const { props: s, children: r, component: o } = e,
    { props: i, children: l, patchFlag: u } = t,
    a = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && u >= 0) {
    if (u & 1024) return !0;
    if (u & 16) return s ? Bs(s, i, a) : !!i;
    if (u & 8) {
      const d = t.dynamicProps;
      for (let h = 0; h < d.length; h++) {
        const _ = d[h];
        if (i[_] !== s[_] && !Cn(a, _)) return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable)
      ? !0
      : s === i
      ? !1
      : s
      ? i
        ? Bs(s, i, a)
        : !0
      : !!i;
  return !1;
}
function Bs(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (t[o] !== e[o] && !Cn(n, o)) return !0;
  }
  return !1;
}
function Oi({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Ai = (e) => e.__isSuspense;
function Li(e, t) {
  t && t.pendingBranch
    ? O(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : vi(e);
}
function Mi(e, t) {
  return gs(e, null, { flush: "post" });
}
const Gt = {};
function Pt(e, t, n) {
  return gs(e, t, n);
}
function gs(
  e,
  t,
  { immediate: n, deep: s, flush: r, onTrack: o, onTrigger: i } = q
) {
  var l;
  const u = So() === ((l = le) == null ? void 0 : l.scope) ? le : null;
  let a,
    d = !1,
    h = !1;
  if (
    (ie(e)
      ? ((a = () => e.value), (d = fn(e)))
      : mt(e)
      ? ((a = () => e), (s = !0))
      : O(e)
      ? ((h = !0),
        (d = e.some((M) => mt(M) || fn(M))),
        (a = () =>
          e.map((M) => {
            if (ie(M)) return M.value;
            if (mt(M)) return ot(M);
            if (S(M)) return ze(M, u, 2);
          })))
      : S(e)
      ? t
        ? (a = () => ze(e, u, 2))
        : (a = () => {
            if (!(u && u.isUnmounted)) return _ && _(), xe(e, u, 3, [C]);
          })
      : (a = Oe),
    t && s)
  ) {
    const M = a;
    a = () => ot(M());
  }
  let _,
    C = (M) => {
      _ = J.onStop = () => {
        ze(M, u, 4);
      };
    },
    F;
  if (kt)
    if (
      ((C = Oe),
      t ? n && xe(t, u, 3, [a(), h ? [] : void 0, C]) : a(),
      r === "sync")
    ) {
      const M = Il();
      F = M.__watcherHandles || (M.__watcherHandles = []);
    } else return Oe;
  let E = h ? new Array(e.length).fill(Gt) : Gt;
  const $ = () => {
    if (J.active)
      if (t) {
        const M = J.run();
        (s || d || (h ? M.some((re, Ae) => Bt(re, E[Ae])) : Bt(M, E))) &&
          (_ && _(),
          xe(t, u, 3, [M, E === Gt ? void 0 : h && E[0] === Gt ? [] : E, C]),
          (E = M));
      } else J.run();
  };
  $.allowRecurse = !!t;
  let R;
  r === "sync"
    ? (R = $)
    : r === "post"
    ? (R = () => ge($, u && u.suspense))
    : (($.pre = !0), u && ($.id = u.uid), (R = () => hs($)));
  const J = new ls(a, R);
  t
    ? n
      ? $()
      : (E = J.run())
    : r === "post"
    ? ge(J.run.bind(J), u && u.suspense)
    : J.run();
  const Y = () => {
    J.stop(), u && u.scope && ss(u.scope.effects, J);
  };
  return F && F.push(Y), Y;
}
function Pi(e, t, n) {
  const s = this.proxy,
    r = ne(e) ? (e.includes(".") ? Dr(s, e) : () => s[e]) : e.bind(s, s);
  let o;
  S(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = le;
  xt(this);
  const l = gs(r, o.bind(s), n);
  return i ? xt(i) : ut(), l;
}
function Dr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++) s = s[n[r]];
    return s;
  };
}
function ot(e, t) {
  if (!D(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), ie(e))) ot(e.value, t);
  else if (O(e)) for (let n = 0; n < e.length; n++) ot(e[n], t);
  else if (bn(e) || gt(e))
    e.forEach((n) => {
      ot(n, t);
    });
  else if (mr(e)) for (const n in e) ot(e[n], t);
  return e;
}
function nn(e, t) {
  const n = ae;
  if (n === null) return e;
  const s = Ln(n) || n.proxy,
    r = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [i, l, u, a = q] = t[o];
    i &&
      (S(i) && (i = { mounted: i, updated: i }),
      i.deep && ot(l),
      r.push({
        dir: i,
        instance: s,
        value: l,
        oldValue: void 0,
        arg: u,
        modifiers: a,
      }));
  }
  return e;
}
function Xe(e, t, n, s) {
  const r = e.dirs,
    o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const l = r[i];
    o && (l.oldValue = o[i].value);
    let u = l.dir[s];
    u && (Ct(), xe(u, n, 8, [e.el, l, e, t]), It());
  }
}
function Fi() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    qt(() => {
      e.isMounted = !0;
    }),
    Wr(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const ye = [Function, Array],
  kr = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: ye,
    onEnter: ye,
    onAfterEnter: ye,
    onEnterCancelled: ye,
    onBeforeLeave: ye,
    onLeave: ye,
    onAfterLeave: ye,
    onLeaveCancelled: ye,
    onBeforeAppear: ye,
    onAppear: ye,
    onAfterAppear: ye,
    onAppearCancelled: ye,
  },
  Si = {
    name: "BaseTransition",
    props: kr,
    setup(e, { slots: t }) {
      const n = io(),
        s = Fi();
      let r;
      return () => {
        const o = t.default && Vr(t.default(), !0);
        if (!o || !o.length) return;
        let i = o[0];
        if (o.length > 1) {
          for (const E of o)
            if (E.type !== we) {
              i = E;
              break;
            }
        }
        const l = H(e),
          { mode: u } = l;
        if (s.isLeaving) return Rn(i);
        const a = Us(i);
        if (!a) return Rn(i);
        const d = qn(a, l, s, n);
        zn(a, d);
        const h = n.subTree,
          _ = h && Us(h);
        let C = !1;
        const { getTransitionKey: F } = a.type;
        if (F) {
          const E = F();
          r === void 0 ? (r = E) : E !== r && ((r = E), (C = !0));
        }
        if (_ && _.type !== we && (!nt(a, _) || C)) {
          const E = qn(_, l, s, n);
          if ((zn(_, E), u === "out-in"))
            return (
              (s.isLeaving = !0),
              (E.afterLeave = () => {
                (s.isLeaving = !1), n.update.active !== !1 && n.update();
              }),
              Rn(i)
            );
          u === "in-out" &&
            a.type !== we &&
            (E.delayLeave = ($, R, J) => {
              const Y = Kr(s, _);
              (Y[String(_.key)] = _),
                ($._leaveCb = () => {
                  R(), ($._leaveCb = void 0), delete d.delayedLeave;
                }),
                (d.delayedLeave = J);
            });
        }
        return i;
      };
    },
  },
  Ri = Si;
function Kr(e, t) {
  const { leavingVNodes: n } = e;
  let s = n.get(t.type);
  return s || ((s = Object.create(null)), n.set(t.type, s)), s;
}
function qn(e, t, n, s) {
  const {
      appear: r,
      mode: o,
      persisted: i = !1,
      onBeforeEnter: l,
      onEnter: u,
      onAfterEnter: a,
      onEnterCancelled: d,
      onBeforeLeave: h,
      onLeave: _,
      onAfterLeave: C,
      onLeaveCancelled: F,
      onBeforeAppear: E,
      onAppear: $,
      onAfterAppear: R,
      onAppearCancelled: J,
    } = t,
    Y = String(e.key),
    M = Kr(n, e),
    re = (N, X) => {
      N && xe(N, s, 9, X);
    },
    Ae = (N, X) => {
      const V = X[1];
      re(N, X),
        O(N) ? N.every((ce) => ce.length <= 1) && V() : N.length <= 1 && V();
    },
    Le = {
      mode: o,
      persisted: i,
      beforeEnter(N) {
        let X = l;
        if (!n.isMounted)
          if (r) X = E || l;
          else return;
        N._leaveCb && N._leaveCb(!0);
        const V = M[Y];
        V && nt(e, V) && V.el._leaveCb && V.el._leaveCb(), re(X, [N]);
      },
      enter(N) {
        let X = u,
          V = a,
          ce = d;
        if (!n.isMounted)
          if (r) (X = $ || u), (V = R || a), (ce = J || d);
          else return;
        let T = !1;
        const Z = (N._enterCb = (_e) => {
          T ||
            ((T = !0),
            _e ? re(ce, [N]) : re(V, [N]),
            Le.delayedLeave && Le.delayedLeave(),
            (N._enterCb = void 0));
        });
        X ? Ae(X, [N, Z]) : Z();
      },
      leave(N, X) {
        const V = String(e.key);
        if ((N._enterCb && N._enterCb(!0), n.isUnmounting)) return X();
        re(h, [N]);
        let ce = !1;
        const T = (N._leaveCb = (Z) => {
          ce ||
            ((ce = !0),
            X(),
            Z ? re(F, [N]) : re(C, [N]),
            (N._leaveCb = void 0),
            M[V] === e && delete M[V]);
        });
        (M[V] = e), _ ? Ae(_, [N, T]) : T();
      },
      clone(N) {
        return qn(N, t, n, s);
      },
    };
  return Le;
}
function Rn(e) {
  if (En(e)) return (e = Je(e)), (e.children = null), e;
}
function Us(e) {
  return En(e) ? (e.children ? e.children[0] : void 0) : e;
}
function zn(e, t) {
  e.shapeFlag & 6 && e.component
    ? zn(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function Vr(e, t = !1, n) {
  let s = [],
    r = 0;
  for (let o = 0; o < e.length; o++) {
    let i = e[o];
    const l = n == null ? i.key : String(n) + String(i.key != null ? i.key : o);
    i.type === pe
      ? (i.patchFlag & 128 && r++, (s = s.concat(Vr(i.children, t, l))))
      : (t || i.type !== we) && s.push(l != null ? Je(i, { key: l }) : i);
  }
  if (r > 1) for (let o = 0; o < s.length; o++) s[o].patchFlag = -2;
  return s;
}
const Ft = (e) => !!e.type.__asyncLoader,
  En = (e) => e.type.__isKeepAlive;
function Ni(e, t) {
  qr(e, "a", t);
}
function $i(e, t) {
  qr(e, "da", t);
}
function qr(e, t, n = le) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let r = n;
      for (; r; ) {
        if (r.isDeactivated) return;
        r = r.parent;
      }
      return e();
    });
  if ((Tn(t, s, n), n)) {
    let r = n.parent;
    for (; r && r.parent; )
      En(r.parent.vnode) && Bi(s, t, n, r), (r = r.parent);
  }
}
function Bi(e, t, n, s) {
  const r = Tn(t, e, s, !0);
  ms(() => {
    ss(s[t], r);
  }, n);
}
function Tn(e, t, n = le, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          Ct(), xt(n);
          const l = xe(t, n, e, i);
          return ut(), It(), l;
        });
    return s ? r.unshift(o) : r.push(o), o;
  }
}
const Ue =
    (e) =>
    (t, n = le) =>
      (!kt || e === "sp") && Tn(e, (...s) => t(...s), n),
  zr = Ue("bm"),
  qt = Ue("m"),
  Ui = Ue("bu"),
  Hi = Ue("u"),
  Wr = Ue("bum"),
  ms = Ue("um"),
  ji = Ue("sp"),
  Di = Ue("rtg"),
  ki = Ue("rtc");
function Ki(e, t = le) {
  Tn("ec", e, t);
}
const Vi = Symbol.for("v-ndc");
function Jr(e, t, n, s) {
  let r;
  const o = n && n[s];
  if (O(e) || ne(e)) {
    r = new Array(e.length);
    for (let i = 0, l = e.length; i < l; i++)
      r[i] = t(e[i], i, void 0, o && o[i]);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let i = 0; i < e; i++) r[i] = t(i + 1, i, void 0, o && o[i]);
  } else if (D(e))
    if (e[Symbol.iterator])
      r = Array.from(e, (i, l) => t(i, l, void 0, o && o[l]));
    else {
      const i = Object.keys(e);
      r = new Array(i.length);
      for (let l = 0, u = i.length; l < u; l++) {
        const a = i[l];
        r[l] = t(e[a], a, l, o && o[l]);
      }
    }
  else r = [];
  return n && (n[s] = r), r;
}
function qi(e, t, n = {}, s, r) {
  if (ae.isCE || (ae.parent && Ft(ae.parent) && ae.parent.isCE))
    return t !== "default" && (n.name = t), W("slot", n, s && s());
  let o = e[t];
  o && o._c && (o._d = !1), G();
  const i = o && Yr(o(n)),
    l = ct(
      pe,
      { key: n.key || (i && i.key) || `_${t}` },
      i || (s ? s() : []),
      i && e._ === 1 ? 64 : -2
    );
  return (
    !r && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]),
    o && o._c && (o._d = !0),
    l
  );
}
function Yr(e) {
  return e.some((t) =>
    hn(t) ? !(t.type === we || (t.type === pe && !Yr(t.children))) : !0
  )
    ? e
    : null;
}
const Wn = (e) => (e ? (lo(e) ? Ln(e) || e.proxy : Wn(e.parent)) : null),
  St = se(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Wn(e.parent),
    $root: (e) => Wn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => _s(e),
    $forceUpdate: (e) => e.f || (e.f = () => hs(e.update)),
    $nextTick: (e) => e.n || (e.n = Vn.bind(e.proxy)),
    $watch: (e) => Pi.bind(e),
  }),
  Nn = (e, t) => e !== q && !e.__isScriptSetup && U(e, t),
  zi = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: s,
        data: r,
        props: o,
        accessCache: i,
        type: l,
        appContext: u,
      } = e;
      let a;
      if (t[0] !== "$") {
        const C = i[t];
        if (C !== void 0)
          switch (C) {
            case 1:
              return s[t];
            case 2:
              return r[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (Nn(s, t)) return (i[t] = 1), s[t];
          if (r !== q && U(r, t)) return (i[t] = 2), r[t];
          if ((a = e.propsOptions[0]) && U(a, t)) return (i[t] = 3), o[t];
          if (n !== q && U(n, t)) return (i[t] = 4), n[t];
          Jn && (i[t] = 0);
        }
      }
      const d = St[t];
      let h, _;
      if (d) return t === "$attrs" && me(e, "get", t), d(e);
      if ((h = l.__cssModules) && (h = h[t])) return h;
      if (n !== q && U(n, t)) return (i[t] = 4), n[t];
      if (((_ = u.config.globalProperties), U(_, t))) return _[t];
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: r, ctx: o } = e;
      return Nn(r, t)
        ? ((r[t] = n), !0)
        : s !== q && U(s, t)
        ? ((s[t] = n), !0)
        : U(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((o[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: s,
          appContext: r,
          propsOptions: o,
        },
      },
      i
    ) {
      let l;
      return (
        !!n[i] ||
        (e !== q && U(e, i)) ||
        Nn(t, i) ||
        ((l = o[0]) && U(l, i)) ||
        U(s, i) ||
        U(St, i) ||
        U(r.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : U(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function Hs(e) {
  return O(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let Jn = !0;
function Wi(e) {
  const t = _s(e),
    n = e.proxy,
    s = e.ctx;
  (Jn = !1), t.beforeCreate && js(t.beforeCreate, e, "bc");
  const {
    data: r,
    computed: o,
    methods: i,
    watch: l,
    provide: u,
    inject: a,
    created: d,
    beforeMount: h,
    mounted: _,
    beforeUpdate: C,
    updated: F,
    activated: E,
    deactivated: $,
    beforeDestroy: R,
    beforeUnmount: J,
    destroyed: Y,
    unmounted: M,
    render: re,
    renderTracked: Ae,
    renderTriggered: Le,
    errorCaptured: N,
    serverPrefetch: X,
    expose: V,
    inheritAttrs: ce,
    components: T,
    directives: Z,
    filters: _e,
  } = t;
  if ((a && Ji(a, s, null), i))
    for (const Q in i) {
      const k = i[Q];
      S(k) && (s[Q] = k.bind(n));
    }
  if (r) {
    const Q = r.call(n, n);
    D(Q) && (e.data = Vt(Q));
  }
  if (((Jn = !0), o))
    for (const Q in o) {
      const k = o[Q],
        Ye = S(k) ? k.bind(n, n) : S(k.get) ? k.get.bind(n, n) : Oe,
        zt = !S(k) && S(k.set) ? k.set.bind(n) : Oe,
        Ze = Ve({ get: Ye, set: zt });
      Object.defineProperty(s, Q, {
        enumerable: !0,
        configurable: !0,
        get: () => Ze.value,
        set: (Me) => (Ze.value = Me),
      });
    }
  if (l) for (const Q in l) Zr(l[Q], s, n, Q);
  if (u) {
    const Q = S(u) ? u.call(n) : u;
    Reflect.ownKeys(Q).forEach((k) => {
      sn(k, Q[k]);
    });
  }
  d && js(d, e, "c");
  function oe(Q, k) {
    O(k) ? k.forEach((Ye) => Q(Ye.bind(n))) : k && Q(k.bind(n));
  }
  if (
    (oe(zr, h),
    oe(qt, _),
    oe(Ui, C),
    oe(Hi, F),
    oe(Ni, E),
    oe($i, $),
    oe(Ki, N),
    oe(ki, Ae),
    oe(Di, Le),
    oe(Wr, J),
    oe(ms, M),
    oe(ji, X),
    O(V))
  )
    if (V.length) {
      const Q = e.exposed || (e.exposed = {});
      V.forEach((k) => {
        Object.defineProperty(Q, k, {
          get: () => n[k],
          set: (Ye) => (n[k] = Ye),
        });
      });
    } else e.exposed || (e.exposed = {});
  re && e.render === Oe && (e.render = re),
    ce != null && (e.inheritAttrs = ce),
    T && (e.components = T),
    Z && (e.directives = Z);
}
function Ji(e, t, n = Oe) {
  O(e) && (e = Yn(e));
  for (const s in e) {
    const r = e[s];
    let o;
    D(r)
      ? "default" in r
        ? (o = lt(r.from || s, r.default, !0))
        : (o = lt(r.from || s))
      : (o = lt(r)),
      ie(o)
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (i) => (o.value = i),
          })
        : (t[s] = o);
  }
}
function js(e, t, n) {
  xe(O(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Zr(e, t, n, s) {
  const r = s.includes(".") ? Dr(n, s) : () => n[s];
  if (ne(e)) {
    const o = t[e];
    S(o) && Pt(r, o);
  } else if (S(e)) Pt(r, e.bind(n));
  else if (D(e))
    if (O(e)) e.forEach((o) => Zr(o, t, n, s));
    else {
      const o = S(e.handler) ? e.handler.bind(n) : t[e.handler];
      S(o) && Pt(r, o, e);
    }
}
function _s(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: r,
      optionsCache: o,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    l = o.get(t);
  let u;
  return (
    l
      ? (u = l)
      : !r.length && !n && !s
      ? (u = t)
      : ((u = {}), r.length && r.forEach((a) => dn(u, a, i, !0)), dn(u, t, i)),
    D(t) && o.set(t, u),
    u
  );
}
function dn(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && dn(e, o, n, !0), r && r.forEach((i) => dn(e, i, n, !0));
  for (const i in t)
    if (!(s && i === "expose")) {
      const l = Yi[i] || (n && n[i]);
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Yi = {
  data: Ds,
  props: ks,
  emits: ks,
  methods: Mt,
  computed: Mt,
  beforeCreate: de,
  created: de,
  beforeMount: de,
  mounted: de,
  beforeUpdate: de,
  updated: de,
  beforeDestroy: de,
  beforeUnmount: de,
  destroyed: de,
  unmounted: de,
  activated: de,
  deactivated: de,
  errorCaptured: de,
  serverPrefetch: de,
  components: Mt,
  directives: Mt,
  watch: Xi,
  provide: Ds,
  inject: Zi,
};
function Ds(e, t) {
  return t
    ? e
      ? function () {
          return se(
            S(e) ? e.call(this, this) : e,
            S(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function Zi(e, t) {
  return Mt(Yn(e), Yn(t));
}
function Yn(e) {
  if (O(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function de(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Mt(e, t) {
  return e ? se(Object.create(null), e, t) : t;
}
function ks(e, t) {
  return e
    ? O(e) && O(t)
      ? [...new Set([...e, ...t])]
      : se(Object.create(null), Hs(e), Hs(t ?? {}))
    : t;
}
function Xi(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = se(Object.create(null), e);
  for (const s in t) n[s] = de(e[s], t[s]);
  return n;
}
function Xr() {
  return {
    app: null,
    config: {
      isNativeTag: mo,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Qi = 0;
function Gi(e, t) {
  return function (s, r = null) {
    S(s) || (s = se({}, s)), r != null && !D(r) && (r = null);
    const o = Xr(),
      i = new Set();
    let l = !1;
    const u = (o.app = {
      _uid: Qi++,
      _component: s,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: El,
      get config() {
        return o.config;
      },
      set config(a) {},
      use(a, ...d) {
        return (
          i.has(a) ||
            (a && S(a.install)
              ? (i.add(a), a.install(u, ...d))
              : S(a) && (i.add(a), a(u, ...d))),
          u
        );
      },
      mixin(a) {
        return o.mixins.includes(a) || o.mixins.push(a), u;
      },
      component(a, d) {
        return d ? ((o.components[a] = d), u) : o.components[a];
      },
      directive(a, d) {
        return d ? ((o.directives[a] = d), u) : o.directives[a];
      },
      mount(a, d, h) {
        if (!l) {
          const _ = W(s, r);
          return (
            (_.appContext = o),
            d && t ? t(_, a) : e(_, a, h),
            (l = !0),
            (u._container = a),
            (a.__vue_app__ = u),
            Ln(_.component) || _.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, u._container), delete u._container.__vue_app__);
      },
      provide(a, d) {
        return (o.provides[a] = d), u;
      },
      runWithContext(a) {
        pn = u;
        try {
          return a();
        } finally {
          pn = null;
        }
      },
    });
    return u;
  };
}
let pn = null;
function sn(e, t) {
  if (le) {
    let n = le.provides;
    const s = le.parent && le.parent.provides;
    s === n && (n = le.provides = Object.create(s)), (n[e] = t);
  }
}
function lt(e, t, n = !1) {
  const s = le || ae;
  if (s || pn) {
    const r = s
      ? s.parent == null
        ? s.vnode.appContext && s.vnode.appContext.provides
        : s.parent.provides
      : pn._context.provides;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && S(t) ? t.call(s && s.proxy) : t;
  }
}
function el(e, t, n, s = !1) {
  const r = {},
    o = {};
  on(o, An, 1), (e.propsDefaults = Object.create(null)), Qr(e, t, r, o);
  for (const i in e.propsOptions[0]) i in r || (r[i] = void 0);
  n ? (e.props = s ? r : li(r)) : e.type.props ? (e.props = r) : (e.props = o),
    (e.attrs = o);
}
function tl(e, t, n, s) {
  const {
      props: r,
      attrs: o,
      vnode: { patchFlag: i },
    } = e,
    l = H(r),
    [u] = e.propsOptions;
  let a = !1;
  if ((s || i > 0) && !(i & 16)) {
    if (i & 8) {
      const d = e.vnode.dynamicProps;
      for (let h = 0; h < d.length; h++) {
        let _ = d[h];
        if (Cn(e.emitsOptions, _)) continue;
        const C = t[_];
        if (u)
          if (U(o, _)) C !== o[_] && ((o[_] = C), (a = !0));
          else {
            const F = bt(_);
            r[F] = Zn(u, l, F, C, e, !1);
          }
        else C !== o[_] && ((o[_] = C), (a = !0));
      }
    }
  } else {
    Qr(e, t, r, o) && (a = !0);
    let d;
    for (const h in l)
      (!t || (!U(t, h) && ((d = wt(h)) === h || !U(t, d)))) &&
        (u
          ? n &&
            (n[h] !== void 0 || n[d] !== void 0) &&
            (r[h] = Zn(u, l, h, void 0, e, !0))
          : delete r[h]);
    if (o !== l) for (const h in o) (!t || !U(t, h)) && (delete o[h], (a = !0));
  }
  a && Be(e, "set", "$attrs");
}
function Qr(e, t, n, s) {
  const [r, o] = e.propsOptions;
  let i = !1,
    l;
  if (t)
    for (let u in t) {
      if (en(u)) continue;
      const a = t[u];
      let d;
      r && U(r, (d = bt(u)))
        ? !o || !o.includes(d)
          ? (n[d] = a)
          : ((l || (l = {}))[d] = a)
        : Cn(e.emitsOptions, u) ||
          ((!(u in s) || a !== s[u]) && ((s[u] = a), (i = !0)));
    }
  if (o) {
    const u = H(n),
      a = l || q;
    for (let d = 0; d < o.length; d++) {
      const h = o[d];
      n[h] = Zn(r, u, h, a[h], e, !U(a, h));
    }
  }
  return i;
}
function Zn(e, t, n, s, r, o) {
  const i = e[n];
  if (i != null) {
    const l = U(i, "default");
    if (l && s === void 0) {
      const u = i.default;
      if (i.type !== Function && !i.skipFactory && S(u)) {
        const { propsDefaults: a } = r;
        n in a ? (s = a[n]) : (xt(r), (s = a[n] = u.call(null, t)), ut());
      } else s = u;
    }
    i[0] &&
      (o && !l ? (s = !1) : i[1] && (s === "" || s === wt(n)) && (s = !0));
  }
  return s;
}
function Gr(e, t, n = !1) {
  const s = t.propsCache,
    r = s.get(e);
  if (r) return r;
  const o = e.props,
    i = {},
    l = [];
  let u = !1;
  if (!S(e)) {
    const d = (h) => {
      u = !0;
      const [_, C] = Gr(h, t, !0);
      se(i, _), C && l.push(...C);
    };
    !n && t.mixins.length && t.mixins.forEach(d),
      e.extends && d(e.extends),
      e.mixins && e.mixins.forEach(d);
  }
  if (!o && !u) return D(e) && s.set(e, ht), ht;
  if (O(o))
    for (let d = 0; d < o.length; d++) {
      const h = bt(o[d]);
      Ks(h) && (i[h] = q);
    }
  else if (o)
    for (const d in o) {
      const h = bt(d);
      if (Ks(h)) {
        const _ = o[d],
          C = (i[h] = O(_) || S(_) ? { type: _ } : se({}, _));
        if (C) {
          const F = zs(Boolean, C.type),
            E = zs(String, C.type);
          (C[0] = F > -1),
            (C[1] = E < 0 || F < E),
            (F > -1 || U(C, "default")) && l.push(h);
        }
      }
    }
  const a = [i, l];
  return D(e) && s.set(e, a), a;
}
function Ks(e) {
  return e[0] !== "$";
}
function Vs(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function qs(e, t) {
  return Vs(e) === Vs(t);
}
function zs(e, t) {
  return O(t) ? t.findIndex((n) => qs(n, e)) : S(t) && qs(t, e) ? 0 : -1;
}
const eo = (e) => e[0] === "_" || e === "$stable",
  bs = (e) => (O(e) ? e.map(Se) : [Se(e)]),
  nl = (e, t, n) => {
    if (t._n) return t;
    const s = yt((...r) => bs(t(...r)), n);
    return (s._c = !1), s;
  },
  to = (e, t, n) => {
    const s = e._ctx;
    for (const r in e) {
      if (eo(r)) continue;
      const o = e[r];
      if (S(o)) t[r] = nl(r, o, s);
      else if (o != null) {
        const i = bs(o);
        t[r] = () => i;
      }
    }
  },
  no = (e, t) => {
    const n = bs(t);
    e.slots.default = () => n;
  },
  sl = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = H(t)), on(t, "_", n)) : to(t, (e.slots = {}));
    } else (e.slots = {}), t && no(e, t);
    on(e.slots, An, 1);
  },
  rl = (e, t, n) => {
    const { vnode: s, slots: r } = e;
    let o = !0,
      i = q;
    if (s.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (o = !1)
          : (se(r, t), !n && l === 1 && delete r._)
        : ((o = !t.$stable), to(t, r)),
        (i = t);
    } else t && (no(e, t), (i = { default: 1 }));
    if (o) for (const l in r) !eo(l) && !(l in i) && delete r[l];
  };
function Xn(e, t, n, s, r = !1) {
  if (O(e)) {
    e.forEach((_, C) => Xn(_, t && (O(t) ? t[C] : t), n, s, r));
    return;
  }
  if (Ft(s) && !r) return;
  const o = s.shapeFlag & 4 ? Ln(s.component) || s.component.proxy : s.el,
    i = r ? null : o,
    { i: l, r: u } = e,
    a = t && t.r,
    d = l.refs === q ? (l.refs = {}) : l.refs,
    h = l.setupState;
  if (
    (a != null &&
      a !== u &&
      (ne(a)
        ? ((d[a] = null), U(h, a) && (h[a] = null))
        : ie(a) && (a.value = null)),
    S(u))
  )
    ze(u, l, 12, [i, d]);
  else {
    const _ = ne(u),
      C = ie(u);
    if (_ || C) {
      const F = () => {
        if (e.f) {
          const E = _ ? (U(h, u) ? h[u] : d[u]) : u.value;
          r
            ? O(E) && ss(E, o)
            : O(E)
            ? E.includes(o) || E.push(o)
            : _
            ? ((d[u] = [o]), U(h, u) && (h[u] = d[u]))
            : ((u.value = [o]), e.k && (d[e.k] = u.value));
        } else
          _
            ? ((d[u] = i), U(h, u) && (h[u] = i))
            : C && ((u.value = i), e.k && (d[e.k] = i));
      };
      i ? ((F.id = -1), ge(F, n)) : F();
    }
  }
}
const ge = Li;
function ol(e) {
  return il(e);
}
function il(e, t) {
  const n = Hn();
  n.__VUE__ = !0;
  const {
      insert: s,
      remove: r,
      patchProp: o,
      createElement: i,
      createText: l,
      createComment: u,
      setText: a,
      setElementText: d,
      parentNode: h,
      nextSibling: _,
      setScopeId: C = Oe,
      insertStaticContent: F,
    } = e,
    E = (
      c,
      f,
      p,
      m = null,
      g = null,
      y = null,
      w = !1,
      v = null,
      x = !!f.dynamicChildren
    ) => {
      if (c === f) return;
      c && !nt(c, f) && ((m = Wt(c)), Me(c, g, y, !0), (c = null)),
        f.patchFlag === -2 && ((x = !1), (f.dynamicChildren = null));
      const { type: b, ref: A, shapeFlag: I } = f;
      switch (b) {
        case On:
          $(c, f, p, m);
          break;
        case we:
          R(c, f, p, m);
          break;
        case Rt:
          c == null && J(f, p, m, w);
          break;
        case pe:
          T(c, f, p, m, g, y, w, v, x);
          break;
        default:
          I & 1
            ? re(c, f, p, m, g, y, w, v, x)
            : I & 6
            ? Z(c, f, p, m, g, y, w, v, x)
            : (I & 64 || I & 128) && b.process(c, f, p, m, g, y, w, v, x, at);
      }
      A != null && g && Xn(A, c && c.ref, y, f || c, !f);
    },
    $ = (c, f, p, m) => {
      if (c == null) s((f.el = l(f.children)), p, m);
      else {
        const g = (f.el = c.el);
        f.children !== c.children && a(g, f.children);
      }
    },
    R = (c, f, p, m) => {
      c == null ? s((f.el = u(f.children || "")), p, m) : (f.el = c.el);
    },
    J = (c, f, p, m) => {
      [c.el, c.anchor] = F(c.children, f, p, m, c.el, c.anchor);
    },
    Y = ({ el: c, anchor: f }, p, m) => {
      let g;
      for (; c && c !== f; ) (g = _(c)), s(c, p, m), (c = g);
      s(f, p, m);
    },
    M = ({ el: c, anchor: f }) => {
      let p;
      for (; c && c !== f; ) (p = _(c)), r(c), (c = p);
      r(f);
    },
    re = (c, f, p, m, g, y, w, v, x) => {
      (w = w || f.type === "svg"),
        c == null ? Ae(f, p, m, g, y, w, v, x) : X(c, f, g, y, w, v, x);
    },
    Ae = (c, f, p, m, g, y, w, v) => {
      let x, b;
      const { type: A, props: I, shapeFlag: L, transition: P, dirs: B } = c;
      if (
        ((x = c.el = i(c.type, y, I && I.is, I)),
        L & 8
          ? d(x, c.children)
          : L & 16 &&
            N(c.children, x, null, m, g, y && A !== "foreignObject", w, v),
        B && Xe(c, null, m, "created"),
        Le(x, c, c.scopeId, w, m),
        I)
      ) {
        for (const j in I)
          j !== "value" &&
            !en(j) &&
            o(x, j, null, I[j], y, c.children, m, g, Ne);
        "value" in I && o(x, "value", null, I.value),
          (b = I.onVnodeBeforeMount) && Fe(b, m, c);
      }
      B && Xe(c, null, m, "beforeMount");
      const K = (!g || (g && !g.pendingBranch)) && P && !P.persisted;
      K && P.beforeEnter(x),
        s(x, f, p),
        ((b = I && I.onVnodeMounted) || K || B) &&
          ge(() => {
            b && Fe(b, m, c), K && P.enter(x), B && Xe(c, null, m, "mounted");
          }, g);
    },
    Le = (c, f, p, m, g) => {
      if ((p && C(c, p), m)) for (let y = 0; y < m.length; y++) C(c, m[y]);
      if (g) {
        let y = g.subTree;
        if (f === y) {
          const w = g.vnode;
          Le(c, w, w.scopeId, w.slotScopeIds, g.parent);
        }
      }
    },
    N = (c, f, p, m, g, y, w, v, x = 0) => {
      for (let b = x; b < c.length; b++) {
        const A = (c[b] = v ? ke(c[b]) : Se(c[b]));
        E(null, A, f, p, m, g, y, w, v);
      }
    },
    X = (c, f, p, m, g, y, w) => {
      const v = (f.el = c.el);
      let { patchFlag: x, dynamicChildren: b, dirs: A } = f;
      x |= c.patchFlag & 16;
      const I = c.props || q,
        L = f.props || q;
      let P;
      p && Qe(p, !1),
        (P = L.onVnodeBeforeUpdate) && Fe(P, p, f, c),
        A && Xe(f, c, p, "beforeUpdate"),
        p && Qe(p, !0);
      const B = g && f.type !== "foreignObject";
      if (
        (b
          ? V(c.dynamicChildren, b, v, p, m, B, y)
          : w || k(c, f, v, null, p, m, B, y, !1),
        x > 0)
      ) {
        if (x & 16) ce(v, f, I, L, p, m, g);
        else if (
          (x & 2 && I.class !== L.class && o(v, "class", null, L.class, g),
          x & 4 && o(v, "style", I.style, L.style, g),
          x & 8)
        ) {
          const K = f.dynamicProps;
          for (let j = 0; j < K.length; j++) {
            const ee = K[j],
              Ce = I[ee],
              dt = L[ee];
            (dt !== Ce || ee === "value") &&
              o(v, ee, Ce, dt, g, c.children, p, m, Ne);
          }
        }
        x & 1 && c.children !== f.children && d(v, f.children);
      } else !w && b == null && ce(v, f, I, L, p, m, g);
      ((P = L.onVnodeUpdated) || A) &&
        ge(() => {
          P && Fe(P, p, f, c), A && Xe(f, c, p, "updated");
        }, m);
    },
    V = (c, f, p, m, g, y, w) => {
      for (let v = 0; v < f.length; v++) {
        const x = c[v],
          b = f[v],
          A =
            x.el && (x.type === pe || !nt(x, b) || x.shapeFlag & 70)
              ? h(x.el)
              : p;
        E(x, b, A, null, m, g, y, w, !0);
      }
    },
    ce = (c, f, p, m, g, y, w) => {
      if (p !== m) {
        if (p !== q)
          for (const v in p)
            !en(v) && !(v in m) && o(c, v, p[v], null, w, f.children, g, y, Ne);
        for (const v in m) {
          if (en(v)) continue;
          const x = m[v],
            b = p[v];
          x !== b && v !== "value" && o(c, v, b, x, w, f.children, g, y, Ne);
        }
        "value" in m && o(c, "value", p.value, m.value);
      }
    },
    T = (c, f, p, m, g, y, w, v, x) => {
      const b = (f.el = c ? c.el : l("")),
        A = (f.anchor = c ? c.anchor : l(""));
      let { patchFlag: I, dynamicChildren: L, slotScopeIds: P } = f;
      P && (v = v ? v.concat(P) : P),
        c == null
          ? (s(b, p, m), s(A, p, m), N(f.children, p, A, g, y, w, v, x))
          : I > 0 && I & 64 && L && c.dynamicChildren
          ? (V(c.dynamicChildren, L, p, g, y, w, v),
            (f.key != null || (g && f === g.subTree)) && so(c, f, !0))
          : k(c, f, p, A, g, y, w, v, x);
    },
    Z = (c, f, p, m, g, y, w, v, x) => {
      (f.slotScopeIds = v),
        c == null
          ? f.shapeFlag & 512
            ? g.ctx.activate(f, p, m, w, x)
            : _e(f, p, m, g, y, w, x)
          : Tt(c, f, x);
    },
    _e = (c, f, p, m, g, y, w) => {
      const v = (c.component = ml(c, m, g));
      if ((En(c) && (v.ctx.renderer = at), _l(v), v.asyncDep)) {
        if ((g && g.registerDep(v, oe), !c.el)) {
          const x = (v.subTree = W(we));
          R(null, x, f, p);
        }
        return;
      }
      oe(v, c, f, p, g, y, w);
    },
    Tt = (c, f, p) => {
      const m = (f.component = c.component);
      if (Ti(c, f, p))
        if (m.asyncDep && !m.asyncResolved) {
          Q(m, f, p);
          return;
        } else (m.next = f), bi(m.update), m.update();
      else (f.el = c.el), (m.vnode = f);
    },
    oe = (c, f, p, m, g, y, w) => {
      const v = () => {
          if (c.isMounted) {
            let { next: A, bu: I, u: L, parent: P, vnode: B } = c,
              K = A,
              j;
            Qe(c, !1),
              A ? ((A.el = B.el), Q(c, A, w)) : (A = B),
              I && tn(I),
              (j = A.props && A.props.onVnodeBeforeUpdate) && Fe(j, P, A, B),
              Qe(c, !0);
            const ee = Sn(c),
              Ce = c.subTree;
            (c.subTree = ee),
              E(Ce, ee, h(Ce.el), Wt(Ce), c, g, y),
              (A.el = ee.el),
              K === null && Oi(c, ee.el),
              L && ge(L, g),
              (j = A.props && A.props.onVnodeUpdated) &&
                ge(() => Fe(j, P, A, B), g);
          } else {
            let A;
            const { el: I, props: L } = f,
              { bm: P, m: B, parent: K } = c,
              j = Ft(f);
            if (
              (Qe(c, !1),
              P && tn(P),
              !j && (A = L && L.onVnodeBeforeMount) && Fe(A, K, f),
              Qe(c, !0),
              I && Pn)
            ) {
              const ee = () => {
                (c.subTree = Sn(c)), Pn(I, c.subTree, c, g, null);
              };
              j
                ? f.type.__asyncLoader().then(() => !c.isUnmounted && ee())
                : ee();
            } else {
              const ee = (c.subTree = Sn(c));
              E(null, ee, p, m, c, g, y), (f.el = ee.el);
            }
            if ((B && ge(B, g), !j && (A = L && L.onVnodeMounted))) {
              const ee = f;
              ge(() => Fe(A, K, ee), g);
            }
            (f.shapeFlag & 256 ||
              (K && Ft(K.vnode) && K.vnode.shapeFlag & 256)) &&
              c.a &&
              ge(c.a, g),
              (c.isMounted = !0),
              (f = p = m = null);
          }
        },
        x = (c.effect = new ls(v, () => hs(b), c.scope)),
        b = (c.update = () => x.run());
      (b.id = c.uid), Qe(c, !0), b();
    },
    Q = (c, f, p) => {
      f.component = c;
      const m = c.vnode.props;
      (c.vnode = f),
        (c.next = null),
        tl(c, f.props, m, p),
        rl(c, f.children, p),
        Ct(),
        $s(),
        It();
    },
    k = (c, f, p, m, g, y, w, v, x = !1) => {
      const b = c && c.children,
        A = c ? c.shapeFlag : 0,
        I = f.children,
        { patchFlag: L, shapeFlag: P } = f;
      if (L > 0) {
        if (L & 128) {
          zt(b, I, p, m, g, y, w, v, x);
          return;
        } else if (L & 256) {
          Ye(b, I, p, m, g, y, w, v, x);
          return;
        }
      }
      P & 8
        ? (A & 16 && Ne(b, g, y), I !== b && d(p, I))
        : A & 16
        ? P & 16
          ? zt(b, I, p, m, g, y, w, v, x)
          : Ne(b, g, y, !0)
        : (A & 8 && d(p, ""), P & 16 && N(I, p, m, g, y, w, v, x));
    },
    Ye = (c, f, p, m, g, y, w, v, x) => {
      (c = c || ht), (f = f || ht);
      const b = c.length,
        A = f.length,
        I = Math.min(b, A);
      let L;
      for (L = 0; L < I; L++) {
        const P = (f[L] = x ? ke(f[L]) : Se(f[L]));
        E(c[L], P, p, null, g, y, w, v, x);
      }
      b > A ? Ne(c, g, y, !0, !1, I) : N(f, p, m, g, y, w, v, x, I);
    },
    zt = (c, f, p, m, g, y, w, v, x) => {
      let b = 0;
      const A = f.length;
      let I = c.length - 1,
        L = A - 1;
      for (; b <= I && b <= L; ) {
        const P = c[b],
          B = (f[b] = x ? ke(f[b]) : Se(f[b]));
        if (nt(P, B)) E(P, B, p, null, g, y, w, v, x);
        else break;
        b++;
      }
      for (; b <= I && b <= L; ) {
        const P = c[I],
          B = (f[L] = x ? ke(f[L]) : Se(f[L]));
        if (nt(P, B)) E(P, B, p, null, g, y, w, v, x);
        else break;
        I--, L--;
      }
      if (b > I) {
        if (b <= L) {
          const P = L + 1,
            B = P < A ? f[P].el : m;
          for (; b <= L; )
            E(null, (f[b] = x ? ke(f[b]) : Se(f[b])), p, B, g, y, w, v, x), b++;
        }
      } else if (b > L) for (; b <= I; ) Me(c[b], g, y, !0), b++;
      else {
        const P = b,
          B = b,
          K = new Map();
        for (b = B; b <= L; b++) {
          const be = (f[b] = x ? ke(f[b]) : Se(f[b]));
          be.key != null && K.set(be.key, b);
        }
        let j,
          ee = 0;
        const Ce = L - B + 1;
        let dt = !1,
          Is = 0;
        const Ot = new Array(Ce);
        for (b = 0; b < Ce; b++) Ot[b] = 0;
        for (b = P; b <= I; b++) {
          const be = c[b];
          if (ee >= Ce) {
            Me(be, g, y, !0);
            continue;
          }
          let Pe;
          if (be.key != null) Pe = K.get(be.key);
          else
            for (j = B; j <= L; j++)
              if (Ot[j - B] === 0 && nt(be, f[j])) {
                Pe = j;
                break;
              }
          Pe === void 0
            ? Me(be, g, y, !0)
            : ((Ot[Pe - B] = b + 1),
              Pe >= Is ? (Is = Pe) : (dt = !0),
              E(be, f[Pe], p, null, g, y, w, v, x),
              ee++);
        }
        const Es = dt ? ll(Ot) : ht;
        for (j = Es.length - 1, b = Ce - 1; b >= 0; b--) {
          const be = B + b,
            Pe = f[be],
            Ts = be + 1 < A ? f[be + 1].el : m;
          Ot[b] === 0
            ? E(null, Pe, p, Ts, g, y, w, v, x)
            : dt && (j < 0 || b !== Es[j] ? Ze(Pe, p, Ts, 2) : j--);
        }
      }
    },
    Ze = (c, f, p, m, g = null) => {
      const { el: y, type: w, transition: v, children: x, shapeFlag: b } = c;
      if (b & 6) {
        Ze(c.component.subTree, f, p, m);
        return;
      }
      if (b & 128) {
        c.suspense.move(f, p, m);
        return;
      }
      if (b & 64) {
        w.move(c, f, p, at);
        return;
      }
      if (w === pe) {
        s(y, f, p);
        for (let I = 0; I < x.length; I++) Ze(x[I], f, p, m);
        s(c.anchor, f, p);
        return;
      }
      if (w === Rt) {
        Y(c, f, p);
        return;
      }
      if (m !== 2 && b & 1 && v)
        if (m === 0) v.beforeEnter(y), s(y, f, p), ge(() => v.enter(y), g);
        else {
          const { leave: I, delayLeave: L, afterLeave: P } = v,
            B = () => s(y, f, p),
            K = () => {
              I(y, () => {
                B(), P && P();
              });
            };
          L ? L(y, B, K) : K();
        }
      else s(y, f, p);
    },
    Me = (c, f, p, m = !1, g = !1) => {
      const {
        type: y,
        props: w,
        ref: v,
        children: x,
        dynamicChildren: b,
        shapeFlag: A,
        patchFlag: I,
        dirs: L,
      } = c;
      if ((v != null && Xn(v, null, p, c, !0), A & 256)) {
        f.ctx.deactivate(c);
        return;
      }
      const P = A & 1 && L,
        B = !Ft(c);
      let K;
      if ((B && (K = w && w.onVnodeBeforeUnmount) && Fe(K, f, c), A & 6))
        go(c.component, p, m);
      else {
        if (A & 128) {
          c.suspense.unmount(p, m);
          return;
        }
        P && Xe(c, null, f, "beforeUnmount"),
          A & 64
            ? c.type.remove(c, f, p, g, at, m)
            : b && (y !== pe || (I > 0 && I & 64))
            ? Ne(b, f, p, !1, !0)
            : ((y === pe && I & 384) || (!g && A & 16)) && Ne(x, f, p),
          m && ws(c);
      }
      ((B && (K = w && w.onVnodeUnmounted)) || P) &&
        ge(() => {
          K && Fe(K, f, c), P && Xe(c, null, f, "unmounted");
        }, p);
    },
    ws = (c) => {
      const { type: f, el: p, anchor: m, transition: g } = c;
      if (f === pe) {
        ho(p, m);
        return;
      }
      if (f === Rt) {
        M(c);
        return;
      }
      const y = () => {
        r(p), g && !g.persisted && g.afterLeave && g.afterLeave();
      };
      if (c.shapeFlag & 1 && g && !g.persisted) {
        const { leave: w, delayLeave: v } = g,
          x = () => w(p, y);
        v ? v(c.el, y, x) : x();
      } else y();
    },
    ho = (c, f) => {
      let p;
      for (; c !== f; ) (p = _(c)), r(c), (c = p);
      r(f);
    },
    go = (c, f, p) => {
      const { bum: m, scope: g, update: y, subTree: w, um: v } = c;
      m && tn(m),
        g.stop(),
        y && ((y.active = !1), Me(w, c, f, p)),
        v && ge(v, f),
        ge(() => {
          c.isUnmounted = !0;
        }, f),
        f &&
          f.pendingBranch &&
          !f.isUnmounted &&
          c.asyncDep &&
          !c.asyncResolved &&
          c.suspenseId === f.pendingId &&
          (f.deps--, f.deps === 0 && f.resolve());
    },
    Ne = (c, f, p, m = !1, g = !1, y = 0) => {
      for (let w = y; w < c.length; w++) Me(c[w], f, p, m, g);
    },
    Wt = (c) =>
      c.shapeFlag & 6
        ? Wt(c.component.subTree)
        : c.shapeFlag & 128
        ? c.suspense.next()
        : _(c.anchor || c.el),
    Cs = (c, f, p) => {
      c == null
        ? f._vnode && Me(f._vnode, null, null, !0)
        : E(f._vnode || null, c, f, null, null, null, p),
        $s(),
        Ur(),
        (f._vnode = c);
    },
    at = {
      p: E,
      um: Me,
      m: Ze,
      r: ws,
      mt: _e,
      mc: N,
      pc: k,
      pbc: V,
      n: Wt,
      o: e,
    };
  let Mn, Pn;
  return (
    t && ([Mn, Pn] = t(at)), { render: Cs, hydrate: Mn, createApp: Gi(Cs, Mn) }
  );
}
function Qe({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function so(e, t, n = !1) {
  const s = e.children,
    r = t.children;
  if (O(s) && O(r))
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      let l = r[o];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = r[o] = ke(r[o])), (l.el = i.el)),
        n || so(i, l)),
        l.type === On && (l.el = i.el);
    }
}
function ll(e) {
  const t = e.slice(),
    n = [0];
  let s, r, o, i, l;
  const u = e.length;
  for (s = 0; s < u; s++) {
    const a = e[s];
    if (a !== 0) {
      if (((r = n[n.length - 1]), e[r] < a)) {
        (t[s] = r), n.push(s);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        (l = (o + i) >> 1), e[n[l]] < a ? (o = l + 1) : (i = l);
      a < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), (n[o] = s));
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
  return n;
}
const cl = (e) => e.__isTeleport,
  pe = Symbol.for("v-fgt"),
  On = Symbol.for("v-txt"),
  we = Symbol.for("v-cmt"),
  Rt = Symbol.for("v-stc"),
  Nt = [];
let Te = null;
function G(e = !1) {
  Nt.push((Te = e ? null : []));
}
function ul() {
  Nt.pop(), (Te = Nt[Nt.length - 1] || null);
}
let Dt = 1;
function Ws(e) {
  Dt += e;
}
function ro(e) {
  return (
    (e.dynamicChildren = Dt > 0 ? Te || ht : null),
    ul(),
    Dt > 0 && Te && Te.push(e),
    e
  );
}
function he(e, t, n, s, r, o) {
  return ro(z(e, t, n, s, r, o, !0));
}
function ct(e, t, n, s, r) {
  return ro(W(e, t, n, s, r, !0));
}
function hn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function nt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const An = "__vInternal",
  oo = ({ key: e }) => e ?? null,
  rn = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? ne(e) || ie(e) || S(e)
        ? { i: ae, r: e, k: t, f: !!n }
        : e
      : null
  );
function z(
  e,
  t = null,
  n = null,
  s = 0,
  r = null,
  o = e === pe ? 0 : 1,
  i = !1,
  l = !1
) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && oo(t),
    ref: t && rn(t),
    scopeId: In,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: ae,
  };
  return (
    l
      ? (ys(u, n), o & 128 && e.normalize(u))
      : n && (u.shapeFlag |= ne(n) ? 8 : 16),
    Dt > 0 &&
      !i &&
      Te &&
      (u.patchFlag > 0 || o & 6) &&
      u.patchFlag !== 32 &&
      Te.push(u),
    u
  );
}
const W = fl;
function fl(e, t = null, n = null, s = 0, r = null, o = !1) {
  if (((!e || e === Vi) && (e = we), hn(e))) {
    const l = Je(e, t, !0);
    return (
      n && ys(l, n),
      Dt > 0 &&
        !o &&
        Te &&
        (l.shapeFlag & 6 ? (Te[Te.indexOf(e)] = l) : Te.push(l)),
      (l.patchFlag |= -2),
      l
    );
  }
  if ((xl(e) && (e = e.__vccOpts), t)) {
    t = al(t);
    let { class: l, style: u } = t;
    l && !ne(l) && (t.class = ve(l)),
      D(u) && (Pr(u) && !O(u) && (u = se({}, u)), (t.style = os(u)));
  }
  const i = ne(e) ? 1 : Ai(e) ? 128 : cl(e) ? 64 : D(e) ? 4 : S(e) ? 2 : 0;
  return z(e, t, n, s, r, i, o, !0);
}
function al(e) {
  return e ? (Pr(e) || An in e ? se({}, e) : e) : null;
}
function Je(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: o, children: i } = e,
    l = t ? pl(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && oo(l),
    ref:
      t && t.ref ? (n && r ? (O(r) ? r.concat(rn(t)) : [r, rn(t)]) : rn(t)) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== pe ? (o === -1 ? 16 : o | 16) : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Je(e.ssContent),
    ssFallback: e.ssFallback && Je(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function vs(e = " ", t = 0) {
  return W(On, null, e, t);
}
function dl(e, t) {
  const n = W(Rt, null, e);
  return (n.staticCount = t), n;
}
function Ke(e = "", t = !1) {
  return t ? (G(), ct(we, null, e)) : W(we, null, e);
}
function Se(e) {
  return e == null || typeof e == "boolean"
    ? W(we)
    : O(e)
    ? W(pe, null, e.slice())
    : typeof e == "object"
    ? ke(e)
    : W(On, null, String(e));
}
function ke(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Je(e);
}
function ys(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null) t = null;
  else if (O(t)) n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), ys(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(An in t)
        ? (t._ctx = ae)
        : r === 3 &&
          ae &&
          (ae.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    S(t)
      ? ((t = { default: t, _ctx: ae }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [vs(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function pl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = ve([t.class, s.class]));
      else if (r === "style") t.style = os([t.style, s.style]);
      else if (_n(r)) {
        const o = t[r],
          i = s[r];
        i &&
          o !== i &&
          !(O(o) && o.includes(i)) &&
          (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function Fe(e, t, n, s = null) {
  xe(e, t, 7, [n, s]);
}
const hl = Xr();
let gl = 0;
function ml(e, t, n) {
  const s = e.type,
    r = (t ? t.appContext : e.appContext) || hl,
    o = {
      uid: gl++,
      vnode: e,
      type: s,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Po(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Gr(s, r),
      emitsOptions: jr(s, r),
      emit: null,
      emitted: null,
      propsDefaults: q,
      inheritAttrs: s.inheritAttrs,
      ctx: q,
      data: q,
      props: q,
      attrs: q,
      slots: q,
      refs: q,
      setupState: q,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = xi.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let le = null;
const io = () => le || ae;
let xs,
  pt,
  Js = "__VUE_INSTANCE_SETTERS__";
(pt = Hn()[Js]) || (pt = Hn()[Js] = []),
  pt.push((e) => (le = e)),
  (xs = (e) => {
    pt.length > 1 ? pt.forEach((t) => t(e)) : pt[0](e);
  });
const xt = (e) => {
    xs(e), e.scope.on();
  },
  ut = () => {
    le && le.scope.off(), xs(null);
  };
function lo(e) {
  return e.vnode.shapeFlag & 4;
}
let kt = !1;
function _l(e, t = !1) {
  kt = t;
  const { props: n, children: s } = e.vnode,
    r = lo(e);
  el(e, n, r, t), sl(e, s);
  const o = r ? bl(e, t) : void 0;
  return (kt = !1), o;
}
function bl(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Fr(new Proxy(e.ctx, zi)));
  const { setup: s } = n;
  if (s) {
    const r = (e.setupContext = s.length > 1 ? yl(e) : null);
    xt(e), Ct();
    const o = ze(s, e, 0, [e.props, r]);
    if ((It(), ut(), hr(o))) {
      if ((o.then(ut, ut), t))
        return o
          .then((i) => {
            Ys(e, i, t);
          })
          .catch((i) => {
            wn(i, e, 0);
          });
      e.asyncDep = o;
    } else Ys(e, o, t);
  } else co(e, t);
}
function Ys(e, t, n) {
  S(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : D(t) && (e.setupState = Nr(t)),
    co(e, n);
}
let Zs;
function co(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && Zs && !s.render) {
      const r = s.template || _s(e).template;
      if (r) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
          { delimiters: l, compilerOptions: u } = s,
          a = se(se({ isCustomElement: o, delimiters: l }, i), u);
        s.render = Zs(r, a);
      }
    }
    e.render = s.render || Oe;
  }
  xt(e), Ct(), Wi(e), It(), ut();
}
function vl(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return me(e, "get", "$attrs"), t[n];
      },
    }))
  );
}
function yl(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return vl(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Ln(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Nr(Fr(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in St) return St[n](e);
        },
        has(t, n) {
          return n in t || n in St;
        },
      }))
    );
}
function xl(e) {
  return S(e) && "__vccOpts" in e;
}
const Ve = (e, t) => gi(e, t, kt);
function wl(e, t, n) {
  const s = arguments.length;
  return s === 2
    ? D(t) && !O(t)
      ? hn(t)
        ? W(e, null, [t])
        : W(e, t)
      : W(e, null, t)
    : (s > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : s === 3 && hn(n) && (n = [n]),
      W(e, t, n));
}
const Cl = Symbol.for("v-scx"),
  Il = () => lt(Cl),
  El = "3.3.4",
  Tl = "http://www.w3.org/2000/svg",
  st = typeof document < "u" ? document : null,
  Xs = st && st.createElement("template"),
  Ol = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, s) => {
      const r = t
        ? st.createElementNS(Tl, e)
        : st.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          s &&
          s.multiple != null &&
          r.setAttribute("multiple", s.multiple),
        r
      );
    },
    createText: (e) => st.createTextNode(e),
    createComment: (e) => st.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => st.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, s, r, o) {
      const i = n ? n.previousSibling : t.lastChild;
      if (r && (r === o || r.nextSibling))
        for (
          ;
          t.insertBefore(r.cloneNode(!0), n),
            !(r === o || !(r = r.nextSibling));

        );
      else {
        Xs.innerHTML = s ? `<svg>${e}</svg>` : e;
        const l = Xs.content;
        if (s) {
          const u = l.firstChild;
          for (; u.firstChild; ) l.appendChild(u.firstChild);
          l.removeChild(u);
        }
        t.insertBefore(l, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function Al(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function Ll(e, t, n) {
  const s = e.style,
    r = ne(n);
  if (n && !r) {
    if (t && !ne(t)) for (const o in t) n[o] == null && Qn(s, o, "");
    for (const o in n) Qn(s, o, n[o]);
  } else {
    const o = s.display;
    r ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (s.display = o);
  }
}
const Qs = /\s*!important$/;
function Qn(e, t, n) {
  if (O(n)) n.forEach((s) => Qn(e, t, s));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const s = Ml(e, t);
    Qs.test(n)
      ? e.setProperty(wt(s), n.replace(Qs, ""), "important")
      : (e[s] = n);
  }
}
const Gs = ["Webkit", "Moz", "ms"],
  $n = {};
function Ml(e, t) {
  const n = $n[t];
  if (n) return n;
  let s = bt(t);
  if (s !== "filter" && s in e) return ($n[t] = s);
  s = _r(s);
  for (let r = 0; r < Gs.length; r++) {
    const o = Gs[r] + s;
    if (o in e) return ($n[t] = o);
  }
  return t;
}
const er = "http://www.w3.org/1999/xlink";
function Pl(e, t, n, s, r) {
  if (s && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(er, t.slice(6, t.length))
      : e.setAttributeNS(er, t, n);
  else {
    const o = Ao(t);
    n == null || (o && !br(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : n);
  }
}
function Fl(e, t, n, s, r, o, i) {
  if (t === "innerHTML" || t === "textContent") {
    s && i(s, r, o), (e[t] = n ?? "");
    return;
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && !l.includes("-")) {
    e._value = n;
    const a = l === "OPTION" ? e.getAttribute("value") : e.value,
      d = n ?? "";
    a !== d && (e.value = d), n == null && e.removeAttribute(t);
    return;
  }
  let u = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean"
      ? (n = br(n))
      : n == null && a === "string"
      ? ((n = ""), (u = !0))
      : a === "number" && ((n = 0), (u = !0));
  }
  try {
    e[t] = n;
  } catch {}
  u && e.removeAttribute(t);
}
function rt(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Sl(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function Rl(e, t, n, s, r = null) {
  const o = e._vei || (e._vei = {}),
    i = o[t];
  if (s && i) i.value = s;
  else {
    const [l, u] = Nl(t);
    if (s) {
      const a = (o[t] = Ul(s, r));
      rt(e, l, a, u);
    } else i && (Sl(e, l, i, u), (o[t] = void 0));
  }
}
const tr = /(?:Once|Passive|Capture)$/;
function Nl(e) {
  let t;
  if (tr.test(e)) {
    t = {};
    let s;
    for (; (s = e.match(tr)); )
      (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : wt(e.slice(2)), t];
}
let Bn = 0;
const $l = Promise.resolve(),
  Bl = () => Bn || ($l.then(() => (Bn = 0)), (Bn = Date.now()));
function Ul(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now();
    else if (s._vts <= n.attached) return;
    xe(Hl(s, n.value), t, 5, [s]);
  };
  return (n.value = e), (n.attached = Bl()), n;
}
function Hl(e, t) {
  if (O(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((s) => (r) => !r._stopped && s && s(r))
    );
  } else return t;
}
const nr = /^on[a-z]/,
  jl = (e, t, n, s, r = !1, o, i, l, u) => {
    t === "class"
      ? Al(e, s, r)
      : t === "style"
      ? Ll(e, n, s)
      : _n(t)
      ? ns(t) || Rl(e, t, n, s, i)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : Dl(e, t, s, r)
        )
      ? Fl(e, t, s, o, i, l, u)
      : (t === "true-value"
          ? (e._trueValue = s)
          : t === "false-value" && (e._falseValue = s),
        Pl(e, t, s, r));
  };
function Dl(e, t, n, s) {
  return s
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && nr.test(t) && S(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (nr.test(t) && ne(n))
    ? !1
    : t in e;
}
function uo(e) {
  const t = io();
  if (!t) return;
  const n = (t.ut = (r = e(t.proxy)) => {
      Array.from(
        document.querySelectorAll(`[data-v-owner="${t.uid}"]`)
      ).forEach((o) => es(o, r));
    }),
    s = () => {
      const r = e(t.proxy);
      Gn(t.subTree, r), n(r);
    };
  Mi(s),
    qt(() => {
      const r = new MutationObserver(s);
      r.observe(t.subTree.el.parentNode, { childList: !0 }),
        ms(() => r.disconnect());
    });
}
function Gn(e, t) {
  if (e.shapeFlag & 128) {
    const n = e.suspense;
    (e = n.activeBranch),
      n.pendingBranch &&
        !n.isHydrating &&
        n.effects.push(() => {
          Gn(n.activeBranch, t);
        });
  }
  for (; e.component; ) e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el) es(e.el, t);
  else if (e.type === pe) e.children.forEach((n) => Gn(n, t));
  else if (e.type === Rt) {
    let { el: n, anchor: s } = e;
    for (; n && (es(n, t), n !== s); ) n = n.nextSibling;
  }
}
function es(e, t) {
  if (e.nodeType === 1) {
    const n = e.style;
    for (const s in t) n.setProperty(`--${s}`, t[s]);
  }
}
const je = "transition",
  At = "animation",
  Et = (e, { slots: t }) => wl(Ri, kl(e), t);
Et.displayName = "Transition";
const fo = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
Et.props = se({}, kr, fo);
const Ge = (e, t = []) => {
    O(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  sr = (e) => (e ? (O(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function kl(e) {
  const t = {};
  for (const T in e) T in fo || (t[T] = e[T]);
  if (e.css === !1) return t;
  const {
      name: n = "v",
      type: s,
      duration: r,
      enterFromClass: o = `${n}-enter-from`,
      enterActiveClass: i = `${n}-enter-active`,
      enterToClass: l = `${n}-enter-to`,
      appearFromClass: u = o,
      appearActiveClass: a = i,
      appearToClass: d = l,
      leaveFromClass: h = `${n}-leave-from`,
      leaveActiveClass: _ = `${n}-leave-active`,
      leaveToClass: C = `${n}-leave-to`,
    } = e,
    F = Kl(r),
    E = F && F[0],
    $ = F && F[1],
    {
      onBeforeEnter: R,
      onEnter: J,
      onEnterCancelled: Y,
      onLeave: M,
      onLeaveCancelled: re,
      onBeforeAppear: Ae = R,
      onAppear: Le = J,
      onAppearCancelled: N = Y,
    } = t,
    X = (T, Z, _e) => {
      et(T, Z ? d : l), et(T, Z ? a : i), _e && _e();
    },
    V = (T, Z) => {
      (T._isLeaving = !1), et(T, h), et(T, C), et(T, _), Z && Z();
    },
    ce = (T) => (Z, _e) => {
      const Tt = T ? Le : J,
        oe = () => X(Z, T, _e);
      Ge(Tt, [Z, oe]),
        rr(() => {
          et(Z, T ? u : o), De(Z, T ? d : l), sr(Tt) || or(Z, s, E, oe);
        });
    };
  return se(t, {
    onBeforeEnter(T) {
      Ge(R, [T]), De(T, o), De(T, i);
    },
    onBeforeAppear(T) {
      Ge(Ae, [T]), De(T, u), De(T, a);
    },
    onEnter: ce(!1),
    onAppear: ce(!0),
    onLeave(T, Z) {
      T._isLeaving = !0;
      const _e = () => V(T, Z);
      De(T, h),
        zl(),
        De(T, _),
        rr(() => {
          T._isLeaving && (et(T, h), De(T, C), sr(M) || or(T, s, $, _e));
        }),
        Ge(M, [T, _e]);
    },
    onEnterCancelled(T) {
      X(T, !1), Ge(Y, [T]);
    },
    onAppearCancelled(T) {
      X(T, !0), Ge(N, [T]);
    },
    onLeaveCancelled(T) {
      V(T), Ge(re, [T]);
    },
  });
}
function Kl(e) {
  if (e == null) return null;
  if (D(e)) return [Un(e.enter), Un(e.leave)];
  {
    const t = Un(e);
    return [t, t];
  }
}
function Un(e) {
  return wo(e);
}
function De(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e._vtc || (e._vtc = new Set())).add(t);
}
function et(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.remove(s));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function rr(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Vl = 0;
function or(e, t, n, s) {
  const r = (e._endId = ++Vl),
    o = () => {
      r === e._endId && s();
    };
  if (n) return setTimeout(o, n);
  const { type: i, timeout: l, propCount: u } = ql(e, t);
  if (!i) return s();
  const a = i + "end";
  let d = 0;
  const h = () => {
      e.removeEventListener(a, _), o();
    },
    _ = (C) => {
      C.target === e && ++d >= u && h();
    };
  setTimeout(() => {
    d < u && h();
  }, l + 1),
    e.addEventListener(a, _);
}
function ql(e, t) {
  const n = window.getComputedStyle(e),
    s = (F) => (n[F] || "").split(", "),
    r = s(`${je}Delay`),
    o = s(`${je}Duration`),
    i = ir(r, o),
    l = s(`${At}Delay`),
    u = s(`${At}Duration`),
    a = ir(l, u);
  let d = null,
    h = 0,
    _ = 0;
  t === je
    ? i > 0 && ((d = je), (h = i), (_ = o.length))
    : t === At
    ? a > 0 && ((d = At), (h = a), (_ = u.length))
    : ((h = Math.max(i, a)),
      (d = h > 0 ? (i > a ? je : At) : null),
      (_ = d ? (d === je ? o.length : u.length) : 0));
  const C =
    d === je && /\b(transform|all)(,|$)/.test(s(`${je}Property`).toString());
  return { type: d, timeout: h, propCount: _, hasTransform: C };
}
function ir(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, s) => lr(n) + lr(e[s])));
}
function lr(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function zl() {
  return document.body.offsetHeight;
}
const gn = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return O(t) ? (n) => tn(t, n) : t;
};
function Wl(e) {
  e.target.composing = !0;
}
function cr(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const ur = {
    created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
      e._assign = gn(r);
      const o = s || (r.props && r.props.type === "number");
      rt(e, t ? "change" : "input", (i) => {
        if (i.target.composing) return;
        let l = e.value;
        n && (l = l.trim()), o && (l = ln(l)), e._assign(l);
      }),
        n &&
          rt(e, "change", () => {
            e.value = e.value.trim();
          }),
        t ||
          (rt(e, "compositionstart", Wl),
          rt(e, "compositionend", cr),
          rt(e, "change", cr));
    },
    mounted(e, { value: t }) {
      e.value = t ?? "";
    },
    beforeUpdate(
      e,
      { value: t, modifiers: { lazy: n, trim: s, number: r } },
      o
    ) {
      if (
        ((e._assign = gn(o)),
        e.composing ||
          (document.activeElement === e &&
            e.type !== "range" &&
            (n ||
              (s && e.value.trim() === t) ||
              ((r || e.type === "number") && ln(e.value) === t))))
      )
        return;
      const i = t ?? "";
      e.value !== i && (e.value = i);
    },
  },
  Jl = {
    deep: !0,
    created(e, { value: t, modifiers: { number: n } }, s) {
      const r = bn(t);
      rt(e, "change", () => {
        const o = Array.prototype.filter
          .call(e.options, (i) => i.selected)
          .map((i) => (n ? ln(mn(i)) : mn(i)));
        e._assign(e.multiple ? (r ? new Set(o) : o) : o[0]);
      }),
        (e._assign = gn(s));
    },
    mounted(e, { value: t }) {
      fr(e, t);
    },
    beforeUpdate(e, t, n) {
      e._assign = gn(n);
    },
    updated(e, { value: t }) {
      fr(e, t);
    },
  };
function fr(e, t) {
  const n = e.multiple;
  if (!(n && !O(t) && !bn(t))) {
    for (let s = 0, r = e.options.length; s < r; s++) {
      const o = e.options[s],
        i = mn(o);
      if (n) O(t) ? (o.selected = Mo(t, i) > -1) : (o.selected = t.has(i));
      else if (yn(mn(o), t)) {
        e.selectedIndex !== s && (e.selectedIndex = s);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function mn(e) {
  return "_value" in e ? e._value : e.value;
}
const Yl = ["ctrl", "shift", "alt", "meta"],
  Zl = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && e.button !== 0,
    middle: (e) => "button" in e && e.button !== 1,
    right: (e) => "button" in e && e.button !== 2,
    exact: (e, t) => Yl.some((n) => e[`${n}Key`] && !t.includes(n)),
  },
  Xl =
    (e, t) =>
    (n, ...s) => {
      for (let r = 0; r < t.length; r++) {
        const o = Zl[t[r]];
        if (o && o(n, t)) return;
      }
      return e(n, ...s);
    },
  Ql = se({ patchProp: jl }, Ol);
let ar;
function Gl() {
  return ar || (ar = ol(Ql));
}
const ec = (...e) => {
  const t = Gl().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (s) => {
      const r = tc(s);
      if (!r) return;
      const o = t._component;
      !S(o) && !o.render && !o.template && (o.template = r.innerHTML),
        (r.innerHTML = "");
      const i = n(r, !1, r instanceof SVGElement);
      return (
        r instanceof Element &&
          (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")),
        i
      );
    }),
    t
  );
};
function tc(e) {
  return ne(e) ? document.querySelector(e) : e;
}
const ft = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t) n[s] = r;
  return n;
};
function ao(e) {
  return Ve(() => `url(${e})`);
}
const po = (e) => (wi("data-v-221dfb9a"), (e = e()), Ci(), e),
  nc = { key: 0, class: "label-container" },
  sc = po(() =>
    z("label", { for: "URL", class: "add-image-label" }, "Image URL", -1)
  ),
  rc = po(() =>
    z("label", { for: "descr", class: "add-image-label" }, "Description", -1)
  ),
  oc = { key: 0, class: "warn-para" },
  ic = ["value"],
  lc = {
    __name: "AddImage",
    setup(e) {
      uo((E) => ({ "8368de40": te(h) }));
      const t = Vt({
          id: void 0,
          URL: void 0,
          description: void 0,
          frame: "Border",
        }),
        n = [
          "Border",
          "Shadow",
          "Polaroid",
          "Photo Corner",
          "Image",
          "Blur",
          "None",
        ],
        s = lt("addImage");
      let r = ue(!1),
        o = ue(void 0),
        i = ue(!1),
        l = ue(void 0),
        u = ue(void 0),
        a = ue(void 0),
        d = ue(void 0),
        h = ue(""),
        _ = ue(null);
      async function C() {
        return new Promise((E, $) => {
          const R = new Image();
          (R.src = t.URL), (R.onload = () => E(!0)), (R.onerror = () => E(!1));
        });
      }
      Pt(t, (E) => {
        t.URL != "" &&
          C().then(($, R) => {
            $
              ? (console.log("VALID"),
                (d.value = !0),
                (l.value = null),
                t.description !== "" && t.description !== void 0
                  ? (o.value = "add-image-ready")
                  : (o.value = ""),
                (h.value = ao(t.URL).value))
              : ((d.value = !1),
                console.log("NOT VALID"),
                (l.value = "Invalid URL"),
                (o.value = ""),
                (h.value = ""));
          });
      });
      const F = async () => {
        r.value
          ? (r.value && t.description == "") || t.description == null
            ? d.value
              ? ((l.value = "Please enter a description"),
                (a.value = "add-image-url-error"))
              : (r.value = !r.value)
            : d.value
            ? ((t.id = `${Math.floor(Date.now() * Math.random())}`),
              s(t),
              (a.value = ""),
              (u.value = ""),
              (o.value = ""),
              await Vn(),
              (r.value = !r.value),
              (t.id = ""),
              (t.URL = ""),
              (t.description = ""),
              (t.frame = ""))
            : ((l.value = "Please enter a valid URL"),
              (u.value = "add-image-url-error"),
              (a.value = ""))
          : ((r.value = !r.value), await Vn(), _.value.focus());
      };
      return (E, $) =>
        te(i)
          ? Ke("", !0)
          : (G(),
            he(
              "div",
              { key: 0, class: ve(["add-image", te(o)]) },
              [
                z(
                  "form",
                  {
                    onSubmit: $[3] || ($[3] = Xl(() => {}, ["prevent"])),
                    class: "add-image-form",
                    novalidate: "",
                    autocomplete: "off",
                    spellcheck: "true",
                  },
                  [
                    z("button", {
                      onClick: F,
                      class: "add-image-btn",
                      title: "add image",
                    }),
                    W(
                      Et,
                      { name: "btn-fade" },
                      {
                        default: yt(() => [
                          te(r)
                            ? (G(),
                              he("div", nc, [
                                sc,
                                nn(
                                  z(
                                    "input",
                                    {
                                      type: "url",
                                      name: "Image URL",
                                      id: "URL",
                                      class: ve(["add-image-url", te(u)]),
                                      placeholder:
                                        "https://cdn.wa.H's_Envelope.jpg",
                                      "onUpdate:modelValue":
                                        $[0] || ($[0] = (R) => (t.URL = R)),
                                      ref_key: "input",
                                      ref: _,
                                      required: "true",
                                    },
                                    null,
                                    2
                                  ),
                                  [[ur, t.URL]]
                                ),
                                rc,
                                nn(
                                  z(
                                    "input",
                                    {
                                      type: "text",
                                      name: "Image description",
                                      id: "descr",
                                      class: ve(["add-image-url", te(a)]),
                                      ref: "inputDescr",
                                      placeholder: "Hayley's envelope",
                                      "onUpdate:modelValue":
                                        $[1] ||
                                        ($[1] = (R) => (t.description = R)),
                                      required: "true",
                                    },
                                    null,
                                    2
                                  ),
                                  [[ur, t.description]]
                                ),
                                te(l)
                                  ? (G(), he("p", oc, cn(te(l)), 1))
                                  : Ke("", !0),
                                z("label", null, [
                                  vs(" Frame "),
                                  nn(
                                    z(
                                      "select",
                                      {
                                        "onUpdate:modelValue":
                                          $[2] || ($[2] = (R) => (t.frame = R)),
                                      },
                                      [
                                        (G(),
                                        he(
                                          pe,
                                          null,
                                          Jr(n, (R) =>
                                            z(
                                              "option",
                                              { value: R, key: R },
                                              cn(R),
                                              9,
                                              ic
                                            )
                                          ),
                                          64
                                        )),
                                      ],
                                      512
                                    ),
                                    [[Jl, t.frame]]
                                  ),
                                ]),
                              ]))
                            : Ke("", !0),
                        ]),
                        _: 1,
                      }
                    ),
                  ],
                  32
                ),
              ],
              2
            ));
    },
  },
  dr = ft(lc, [["__scopeId", "data-v-221dfb9a"]]),
  cc = {},
  uc = {
    width: "20",
    height: "20",
    viewBox: "0 0 84 84",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  },
  fc = z(
    "path",
    {
      d: "M64.2254 2.82843C65.7875 1.26633 68.3201 1.26633 69.8822 2.82843L80.4888 13.435C82.0509 14.9971 82.0509 17.5298 80.4888 19.0919L74.832 24.7487L58.5685 8.48528L64.2254 2.82843Z",
      fill: "var(--dark-color)",
    },
    null,
    -1
  ),
  ac = z(
    "path",
    {
      d: "M55.1543 16.8492L66.468 28.1629L21.9202 72.7106C18.7961 75.8348 13.7307 75.8348 10.6065 72.7106C7.48235 69.5864 7.48235 64.5211 10.6065 61.3969L55.1543 16.8492Z",
      stroke: "var(--dark-color)",
      "stroke-width": "7",
    },
    null,
    -1
  ),
  dc = [fc, ac];
function pc(e, t) {
  return G(), he("svg", uc, dc);
}
const hc = ft(cc, [["render", pc]]),
  gc = {},
  mc = {
    width: "20",
    height: "20",
    viewBox: "0 0 24 33",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  },
  _c = dl(
    '<rect x="3" y="4" width="18" height="27" rx="2" stroke="var(--dark-color)" stroke-width="3"></rect><rect y="2" width="24" height="2" rx="1" fill="var(--dark-color)"></rect><rect x="8" y="28" width="20" height="2" rx="1" transform="rotate(-90 8 28)" fill="var(--dark-color)"></rect><rect x="7" y="1" width="10" height="1" rx="0.5" fill="var(--dark-color)"></rect><rect x="11" width="2" height="2" rx="1" fill="var(--dark-color)"></rect><rect x="14" y="28" width="20" height="2" rx="1" transform="rotate(-90 14 28)" fill="var(--dark-color)"></rect>',
    6
  ),
  bc = [_c];
function vc(e, t) {
  return G(), he("svg", mc, bc);
}
const yc = ft(gc, [["render", vc]]),
  xc = {
    __name: "EditContainer",
    props: {
      modelValue: { type: Boolean, required: !0 },
      image: { type: Object, required: !0 },
    },
    emits: ["update:modelValue"],
    setup(e, { emit: t }) {
      const n = () => {
          t("update:modelValue", !0);
        },
        s = () => {
          t("update:modelValue", !1);
        },
        r = lt("deleteImage");
      return (o, i) => (
        G(),
        ct(
          Et,
          { name: "btn-fade" },
          {
            default: yt(() => [
              z(
                "div",
                {
                  class: ve([
                    "btn-container",
                    { "btn-container-active": e.modelValue },
                  ]),
                },
                [
                  z(
                    "button",
                    {
                      class: "edit-btn img-btn",
                      title: "edit image",
                      onClick:
                        i[0] ||
                        (i[0] = (...l) => o.editImage && o.editImage(...l)),
                      onFocus: n,
                      ref: "editBtn",
                    },
                    [W(hc)],
                    544
                  ),
                  z(
                    "button",
                    {
                      class: "delete-btn img-btn",
                      onClick: i[1] || (i[1] = (l) => te(r)(e.image)),
                      onFocus: n,
                      onBlur: s,
                      title: "delete image",
                    },
                    [W(yc)],
                    32
                  ),
                ],
                2
              ),
            ]),
            _: 1,
          }
        )
      );
    },
  };
const wc = ["src", "alt"],
  pr = {
    __name: "FramedImage",
    props: { image: Object },
    setup(e) {
      const t = e;
      uo((_) => ({ "40a6c2e3": te(n) }));
      const n = ao(t.image.URL).value;
      let s = ue("");
      const r = (_) => {
          switch (_) {
            case "Shadow":
              s.value = "frame-shadow";
              break;
            case "Polaroid":
              s.value = "frame-polaroid";
              break;
            case "Photo Corner":
              s.value = "frame-none";
              break;
            case "Image":
              s.value = "frame-image";
              break;
            case "None":
              s.value = "frame-none";
              break;
          }
        },
        o = Ve(() => (r(t.image.frame), s.value)),
        i = Ve(() => (t.image.frame == "Photo Corner" ? "frame-corner" : "")),
        l = Ve(() =>
          t.image.frame == "Polaroid" ? "frame-polaroid-caption" : ""
        ),
        u = Ve(() => (t.image.frame == "Blur" ? "blur" : ""));
      let a = ue(!1);
      const d = () => (a.value = !0),
        h = () => (a.value = !1);
      return (_, C) => (
        G(),
        ct(
          Et,
          { name: "fade", appear: "" },
          {
            default: yt(() => [
              z(
                "div",
                { class: "image-wrapper", onMouseover: d, onMouseleave: h },
                [
                  W(
                    xc,
                    {
                      modelValue: te(a),
                      "onUpdate:modelValue":
                        C[0] ||
                        (C[0] = (F) => (ie(a) ? (a.value = F) : (a = F))),
                      image: e.image,
                    },
                    null,
                    8,
                    ["modelValue", "image"]
                  ),
                  z("figure", null, [
                    z(
                      "div",
                      {
                        class: ve([
                          "select-image-container",
                          [i.value, u.value],
                        ]),
                      },
                      [
                        z(
                          "img",
                          {
                            class: ve(["main-image", [o.value, u.value]]),
                            src: e.image.URL,
                            alt: e.image.description,
                            ref: "mainImage",
                            loading: "lazy",
                          },
                          null,
                          10,
                          wc
                        ),
                        qi(_.$slots, "default"),
                      ],
                      2
                    ),
                    z(
                      "figcaption",
                      { class: ve(["fade-text", l.value]) },
                      [
                        _.editing
                          ? Ke("", !0)
                          : (G(),
                            he(
                              "span",
                              {
                                key: 0,
                                onDblclick:
                                  C[1] ||
                                  (C[1] = (...F) =>
                                    _.editImage && _.editImage(...F)),
                              },
                              cn(e.image.description),
                              33
                            )),
                      ],
                      2
                    ),
                  ]),
                ],
                32
              ),
            ]),
            _: 3,
          }
        )
      );
    },
  };
const Cc = {
    __name: "LayoutToggle",
    setup(e) {
      let t = localStorage.layout
          ? ue(JSON.parse(localStorage.layout))
          : ue("vertical"),
        n = ue("layout-button");
      const s = (o) => {
          o === "vertical"
            ? ((n.value = "layout-button-horizontal"),
              document.body.classList.add("horizontal-body"),
              document.querySelector("main").classList.add("main-grid"),
              document.querySelector("hr").classList.add("vertical-hr"),
              document
                .querySelector(".image-gallery")
                .setAttribute("id", "horizontal-gallery"))
            : ((n.value = "layout-button"),
              document.body.classList.remove("horizontal-body"),
              document.querySelector("main").classList.remove("main-grid"),
              document.querySelector("hr").classList.remove("vertical-hr"),
              document.querySelector(".image-gallery").removeAttribute("id"));
        },
        r = () => {
          t.value === "vertical"
            ? ((t.value = "horizontal"),
              (n.value = "layout-button-horizontal"),
              (localStorage.layout = JSON.stringify(t.value)),
              s(t.value))
            : ((t.value = "vertical"),
              (localStorage.layout = JSON.stringify(t.value)),
              s(t.value));
        };
      return (
        qt(() => s(t.value)),
        (o, i) => (
          G(),
          he(
            "button",
            {
              onClick: r,
              title: "change layout",
              class: ve(["toggle-switch", te(n)]),
            },
            null,
            2
          )
        )
      );
    },
  },
  Ic = ft(Cc, [["__scopeId", "data-v-2ae23086"]]),
  Ec = {
    __name: "SetMainImageButton",
    props: { image: Object },
    setup(e) {
      const t = lt("setAsMainImage");
      let n = ue(""),
        s = {},
        r = ue(null);
      const o = () => (n.value = "btn-container-active"),
        i = () => (n.value = "");
      return (
        qt(() => {
          (s = r.value.parentElement),
            s.addEventListener("mouseenter", () => {
              o();
            }),
            s.addEventListener("mouseleave", () => {
              i();
            });
        }),
        (l, u) => (
          G(),
          he(
            "div",
            {
              class: ve(["select-image", te(n)]),
              ref_key: "buttonContainer",
              ref: r,
            },
            [
              z(
                "button",
                {
                  class: "add-image-btn select-image-btn",
                  title: "select as main image",
                  onClick: u[0] || (u[0] = (a) => te(t)(e.image)),
                  onFocus: o,
                  onBlur: i,
                },
                null,
                32
              ),
            ],
            2
          )
        )
      );
    },
  },
  Tc = {},
  Oc = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
  },
  Ac = z(
    "path",
    {
      fill: "var(--secondary)",
      d: "M24 13.616v-3.232c-1.651-.587-2.694-.752-3.219-2.019v-.001c-.527-1.271.1-2.134.847-3.707l-2.285-2.285c-1.561.742-2.433 1.375-3.707.847h-.001c-1.269-.526-1.435-1.576-2.019-3.219h-3.232c-.582 1.635-.749 2.692-2.019 3.219h-.001c-1.271.528-2.132-.098-3.707-.847l-2.285 2.285c.745 1.568 1.375 2.434.847 3.707-.527 1.271-1.584 1.438-3.219 2.02v3.232c1.632.58 2.692.749 3.219 2.019.53 1.282-.114 2.166-.847 3.707l2.285 2.286c1.562-.743 2.434-1.375 3.707-.847h.001c1.27.526 1.436 1.579 2.019 3.219h3.232c.582-1.636.75-2.69 2.027-3.222h.001c1.262-.524 2.12.101 3.698.851l2.285-2.286c-.744-1.563-1.375-2.433-.848-3.706.527-1.271 1.588-1.44 3.221-2.021zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z",
    },
    null,
    -1
  ),
  Lc = [Ac];
function Mc(e, t) {
  return G(), he("svg", Oc, Lc);
}
const Pc = ft(Tc, [["render", Mc]]);
const Fc = {
    __name: "OpenOptions",
    setup(e) {
      const t = () => browser.runtime.openOptionsPage(),
        n = {
          mounted(s) {
            const r = () => {
                s.style.opacity = "1";
              },
              o = () => {
                s.style.opacity = "0";
              };
            document.body.addEventListener("mouseover", r),
              document.body.addEventListener("mouseout", o),
              s.addEventListener("focus", r),
              s.addEventListener("blur", o);
          },
        };
      return (s, r) =>
        nn(
          (G(),
          he("button", { tile: "open options page", onClick: t }, [W(Pc)])),
          [[n]]
        );
    },
  },
  Sc = ft(Fc, [["__scopeId", "data-v-3191668d"]]);
const Rc = { key: 0 },
  Nc = { key: 0, class: "gallery-wrapper" },
  $c = { class: "image-gallery mask" },
  Bc = {
    __name: "App",
    setup(e) {
      let t = Vt([]);
      const n = async () => {
        let d = await browser.storage.local.get("images");
        (t = d ? d.images : []),
          console.log(d),
          console.log(t),
          console.log(t.images);
      };
      zr(() => n()),
        sn("addImage", (d) => {
          t.length < 1 ? (d.isMainImage = !0) : (d.isMainImage = !1),
            t.push({ ...d }),
            console.log("WHy is nothing working?"),
            console.log(t);
        });
      const r = (d) => {
        let h = t.find((C) => C.isMainImage === !0);
        h && (h.isMainImage = !1);
        let _ = t.find((C) => C.id === d.id);
        _.isMainImage = !0;
      };
      sn("setAsMainImage", r),
        sn("deleteImage", (d) => {
          const h = t.findIndex((_) => _.id === d.id);
          t[h].isMainImage &&
            (t[h - 1] ? r(t[h - 1]) : t[h + 1] && r(t[h + 1])),
            t.splice(h, 1);
        });
      const i = () => t.length >= 1;
      i();
      let l = i() ? "has-image" : "";
      Pt(
        t,
        (d) => {
          let h = ai(d);
          browser.storage.local.set({ images: h }),
            i(),
            (l = i() ? "has-image" : "");
        },
        { deep: !0, immediate: !0 }
      );
      const u = Ve(() => t.find((d) => d.isMainImage === !0)),
        a = Ve(() => t.slice().reverse());
      return (d, h) => (
        G(),
        he("main", null, [
          vs(cn(te(t)) + " ", 1),
          z(
            "div",
            { class: ve(["image-container", te(l)]) },
            [
              te(t).length < 1 ? (G(), ct(dr, { key: 0 })) : Ke("", !0),
              u.value
                ? (G(),
                  ct(pr, { image: u.value, key: u.value.id }, null, 8, [
                    "image",
                  ]))
                : Ke("", !0),
            ],
            2
          ),
          te(t).length > 0 ? (G(), he("hr", Rc)) : Ke("", !0),
          W(
            Et,
            { name: "section-fade" },
            {
              default: yt(() => [
                te(t).length >= 1
                  ? (G(),
                    he("div", Nc, [
                      W(Ic),
                      z("section", $c, [
                        W(dr),
                        (G(!0),
                        he(
                          pe,
                          null,
                          Jr(
                            a.value,
                            (_) => (
                              G(),
                              ct(
                                pr,
                                { key: _.id, image: _ },
                                {
                                  default: yt(() => [
                                    W(Ec, { image: _ }, null, 8, ["image"]),
                                  ]),
                                  _: 2,
                                },
                                1032,
                                ["image"]
                              )
                            )
                          ),
                          128
                        )),
                      ]),
                    ]))
                  : Ke("", !0),
              ]),
              _: 1,
            }
          ),
          W(Sc),
        ])
      );
    },
  },
  Uc = ft(Bc, [["__scopeId", "data-v-37817a76"]]);
ec(Uc).mount("#app");
