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
const W = {},
  pt = [],
  Oe = () => {},
  go = () => !1,
  mo = /^on[^a-z]/,
  gn = (e) => mo.test(e),
  ns = (e) => e.startsWith("onUpdate:"),
  se = Object.assign,
  ss = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  _o = Object.prototype.hasOwnProperty,
  U = (e, t) => _o.call(e, t),
  M = Array.isArray,
  ht = (e) => Kt(e) === "[object Map]",
  mn = (e) => Kt(e) === "[object Set]",
  Ts = (e) => Kt(e) === "[object Date]",
  N = (e) => typeof e == "function",
  te = (e) => typeof e == "string",
  $t = (e) => typeof e == "symbol",
  K = (e) => e !== null && typeof e == "object",
  pr = (e) => K(e) && N(e.then) && N(e.catch),
  hr = Object.prototype.toString,
  Kt = (e) => hr.call(e),
  bo = (e) => Kt(e).slice(8, -1),
  gr = (e) => Kt(e) === "[object Object]",
  rs = (e) =>
    te(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  en = ts(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  _n = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  yo = /-(\w)/g,
  _t = _n((e) => e.replace(yo, (t, n) => (n ? n.toUpperCase() : ""))),
  vo = /\B([A-Z])/g,
  xt = _n((e) => e.replace(vo, "-$1").toLowerCase()),
  mr = _n((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Mn = _n((e) => (e ? `on${mr(e)}` : "")),
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
  xo = (e) => {
    const t = te(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let Os;
const Bn = () =>
  Os ||
  (Os =
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
  if (M(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        r = te(s) ? Eo(s) : os(s);
      if (r) for (const o in r) t[o] = r[o];
    }
    return t;
  } else {
    if (te(e)) return e;
    if (K(e)) return e;
  }
}
const wo = /;(?![^(]*\))/g,
  Co = /:([^]+)/,
  Io = /\/\*[^]*?\*\//g;
function Eo(e) {
  const t = {};
  return (
    e
      .replace(Io, "")
      .split(wo)
      .forEach((n) => {
        if (n) {
          const s = n.split(Co);
          s.length > 1 && (t[s[0].trim()] = s[1].trim());
        }
      }),
    t
  );
}
function ye(e) {
  let t = "";
  if (te(e)) t = e;
  else if (M(e))
    for (let n = 0; n < e.length; n++) {
      const s = ye(e[n]);
      s && (t += s + " ");
    }
  else if (K(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const To =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Oo = ts(To);
function _r(e) {
  return !!e || e === "";
}
function Ao(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let s = 0; n && s < e.length; s++) n = bn(e[s], t[s]);
  return n;
}
function bn(e, t) {
  if (e === t) return !0;
  let n = Ts(e),
    s = Ts(t);
  if (n || s) return n && s ? e.getTime() === t.getTime() : !1;
  if (((n = $t(e)), (s = $t(t)), n || s)) return e === t;
  if (((n = M(e)), (s = M(t)), n || s)) return n && s ? Ao(e, t) : !1;
  if (((n = K(e)), (s = K(t)), n || s)) {
    if (!n || !s) return !1;
    const r = Object.keys(e).length,
      o = Object.keys(t).length;
    if (r !== o) return !1;
    for (const i in e) {
      const l = e.hasOwnProperty(i),
        u = t.hasOwnProperty(i);
      if ((l && !u) || (!l && u) || !bn(e[i], t[i])) return !1;
    }
  }
  return String(e) === String(t);
}
function Lo(e, t) {
  return e.findIndex((n) => bn(n, t));
}
const Un = (e) =>
    te(e)
      ? e
      : e == null
      ? ""
      : M(e) || (K(e) && (e.toString === hr || !N(e.toString)))
      ? JSON.stringify(e, br, 2)
      : String(e),
  br = (e, t) =>
    t && t.__v_isRef
      ? br(e, t.value)
      : ht(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [s, r]) => ((n[`${s} =>`] = r), n),
            {}
          ),
        }
      : mn(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : K(t) && !M(t) && !gr(t)
      ? String(t)
      : t;
let Ie;
class Mo {
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
function Po(e, t = Ie) {
  t && t.active && t.effects.push(e);
}
function Fo() {
  return Ie;
}
const is = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  yr = (e) => (e.w & We) > 0,
  vr = (e) => (e.n & We) > 0,
  So = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= We;
  },
  Ro = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let s = 0; s < t.length; s++) {
        const r = t[s];
        yr(r) && !vr(r) ? r.delete(e) : (t[n++] = r),
          (r.w &= ~We),
          (r.n &= ~We);
      }
      t.length = n;
    }
  },
  Hn = new WeakMap();
let Lt = 0,
  We = 1;
const Dn = 30;
let Ee;
const it = Symbol(""),
  jn = Symbol("");
class ls {
  constructor(t, n = null, s) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Po(this, s);
  }
  run() {
    if (!this.active) return this.fn();
    let t = Ee,
      n = ze;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = Ee),
        (Ee = this),
        (ze = !0),
        (We = 1 << ++Lt),
        Lt <= Dn ? So(this) : As(this),
        this.fn()
      );
    } finally {
      Lt <= Dn && Ro(this),
        (We = 1 << --Lt),
        (Ee = this.parent),
        (ze = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    Ee === this
      ? (this.deferStop = !0)
      : this.active &&
        (As(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function As(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let ze = !0;
const xr = [];
function wt() {
  xr.push(ze), (ze = !1);
}
function Ct() {
  const e = xr.pop();
  ze = e === void 0 ? !0 : e;
}
function me(e, t, n) {
  if (ze && Ee) {
    let s = Hn.get(e);
    s || Hn.set(e, (s = new Map()));
    let r = s.get(n);
    r || s.set(n, (r = is())), wr(r);
  }
}
function wr(e, t) {
  let n = !1;
  Lt <= Dn ? vr(e) || ((e.n |= We), (n = !yr(e))) : (n = !e.has(Ee)),
    n && (e.add(Ee), Ee.deps.push(e));
}
function Ue(e, t, n, s, r, o) {
  const i = Hn.get(e);
  if (!i) return;
  let l = [];
  if (t === "clear") l = [...i.values()];
  else if (n === "length" && M(e)) {
    const u = Number(s);
    i.forEach((f, p) => {
      (p === "length" || p >= u) && l.push(f);
    });
  } else
    switch ((n !== void 0 && l.push(i.get(n)), t)) {
      case "add":
        M(e)
          ? rs(n) && l.push(i.get("length"))
          : (l.push(i.get(it)), ht(e) && l.push(i.get(jn)));
        break;
      case "delete":
        M(e) || (l.push(i.get(it)), ht(e) && l.push(i.get(jn)));
        break;
      case "set":
        ht(e) && l.push(i.get(it));
        break;
    }
  if (l.length === 1) l[0] && kn(l[0]);
  else {
    const u = [];
    for (const f of l) f && u.push(...f);
    kn(is(u));
  }
}
function kn(e, t) {
  const n = M(e) ? e : [...e];
  for (const s of n) s.computed && Ls(s);
  for (const s of n) s.computed || Ls(s);
}
function Ls(e, t) {
  (e !== Ee || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const No = ts("__proto__,__v_isRef,__isVue"),
  Cr = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter($t)
  ),
  $o = cs(),
  Bo = cs(!1, !0),
  Uo = cs(!0),
  Ms = Ho();
function Ho() {
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
        wt();
        const s = H(this)[t].apply(this, n);
        return Ct(), s;
      };
    }),
    e
  );
}
function Do(e) {
  const t = H(this);
  return me(t, "has", e), t.hasOwnProperty(e);
}
function cs(e = !1, t = !1) {
  return function (s, r, o) {
    if (r === "__v_isReactive") return !e;
    if (r === "__v_isReadonly") return e;
    if (r === "__v_isShallow") return t;
    if (r === "__v_raw" && o === (e ? (t ? ni : Ar) : t ? Or : Tr).get(s))
      return s;
    const i = M(s);
    if (!e) {
      if (i && U(Ms, r)) return Reflect.get(Ms, r, o);
      if (r === "hasOwnProperty") return Do;
    }
    const l = Reflect.get(s, r, o);
    return ($t(r) ? Cr.has(r) : No(r)) || (e || me(s, "get", r), t)
      ? l
      : ce(l)
      ? i && rs(r)
        ? l
        : l.value
      : K(l)
      ? e
        ? Lr(l)
        : Vt(l)
      : l;
  };
}
const jo = Ir(),
  ko = Ir(!0);
function Ir(e = !1) {
  return function (n, s, r, o) {
    let i = n[s];
    if (bt(i) && ce(i) && !ce(r)) return !1;
    if (
      !e &&
      (!cn(r) && !bt(r) && ((i = H(i)), (r = H(r))), !M(n) && ce(i) && !ce(r))
    )
      return (i.value = r), !0;
    const l = M(n) && rs(s) ? Number(s) < n.length : U(n, s),
      u = Reflect.set(n, s, r, o);
    return (
      n === H(o) && (l ? Bt(r, i) && Ue(n, "set", s, r) : Ue(n, "add", s, r)), u
    );
  };
}
function Ko(e, t) {
  const n = U(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && Ue(e, "delete", t, void 0), s;
}
function Vo(e, t) {
  const n = Reflect.has(e, t);
  return (!$t(t) || !Cr.has(t)) && me(e, "has", t), n;
}
function zo(e) {
  return me(e, "iterate", M(e) ? "length" : it), Reflect.ownKeys(e);
}
const Er = { get: $o, set: jo, deleteProperty: Ko, has: Vo, ownKeys: zo },
  qo = {
    get: Uo,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  Wo = se({}, Er, { get: Bo, set: ko }),
  us = (e) => e,
  yn = (e) => Reflect.getPrototypeOf(e);
function Jt(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = H(e),
    o = H(t);
  n || (t !== o && me(r, "get", t), me(r, "get", o));
  const { has: i } = yn(r),
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
function Ps(e) {
  e = H(e);
  const t = H(this);
  return yn(t).has.call(t, e) || (t.add(e), Ue(t, "add", e, e)), this;
}
function Fs(e, t) {
  t = H(t);
  const n = H(this),
    { has: s, get: r } = yn(n);
  let o = s.call(n, e);
  o || ((e = H(e)), (o = s.call(n, e)));
  const i = r.call(n, e);
  return (
    n.set(e, t), o ? Bt(t, i) && Ue(n, "set", e, t) : Ue(n, "add", e, t), this
  );
}
function Ss(e) {
  const t = H(this),
    { has: n, get: s } = yn(t);
  let r = n.call(t, e);
  r || ((e = H(e)), (r = n.call(t, e))), s && s.call(t, e);
  const o = t.delete(e);
  return r && Ue(t, "delete", e, void 0), o;
}
function Rs() {
  const e = H(this),
    t = e.size !== 0,
    n = e.clear();
  return t && Ue(e, "clear", void 0, void 0), n;
}
function Xt(e, t) {
  return function (s, r) {
    const o = this,
      i = o.__v_raw,
      l = H(i),
      u = t ? us : e ? ds : Ut;
    return (
      !e && me(l, "iterate", it), i.forEach((f, p) => s.call(r, u(f), u(p), o))
    );
  };
}
function Qt(e, t, n) {
  return function (...s) {
    const r = this.__v_raw,
      o = H(r),
      i = ht(o),
      l = e === "entries" || (e === Symbol.iterator && i),
      u = e === "keys" && i,
      f = r[e](...s),
      p = n ? us : t ? ds : Ut;
    return (
      !t && me(o, "iterate", u ? jn : it),
      {
        next() {
          const { value: _, done: h } = f.next();
          return h
            ? { value: _, done: h }
            : { value: l ? [p(_[0]), p(_[1])] : p(_), done: h };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function De(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function Jo() {
  const e = {
      get(o) {
        return Jt(this, o);
      },
      get size() {
        return Zt(this);
      },
      has: Yt,
      add: Ps,
      set: Fs,
      delete: Ss,
      clear: Rs,
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
      add: Ps,
      set: Fs,
      delete: Ss,
      clear: Rs,
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
      add: De("add"),
      set: De("set"),
      delete: De("delete"),
      clear: De("clear"),
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
      add: De("add"),
      set: De("set"),
      delete: De("delete"),
      clear: De("clear"),
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
const [Yo, Zo, Xo, Qo] = Jo();
function as(e, t) {
  const n = t ? (e ? Qo : Xo) : e ? Zo : Yo;
  return (s, r, o) =>
    r === "__v_isReactive"
      ? !e
      : r === "__v_isReadonly"
      ? e
      : r === "__v_raw"
      ? s
      : Reflect.get(U(n, r) && r in s ? n : s, r, o);
}
const Go = { get: as(!1, !1) },
  ei = { get: as(!1, !0) },
  ti = { get: as(!0, !1) },
  Tr = new WeakMap(),
  Or = new WeakMap(),
  Ar = new WeakMap(),
  ni = new WeakMap();
function si(e) {
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
function ri(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : si(bo(e));
}
function Vt(e) {
  return bt(e) ? e : fs(e, !1, Er, Go, Tr);
}
function oi(e) {
  return fs(e, !1, Wo, ei, Or);
}
function Lr(e) {
  return fs(e, !0, qo, ti, Ar);
}
function fs(e, t, n, s, r) {
  if (!K(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = r.get(e);
  if (o) return o;
  const i = ri(e);
  if (i === 0) return e;
  const l = new Proxy(e, i === 2 ? s : n);
  return r.set(e, l), l;
}
function gt(e) {
  return bt(e) ? gt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function bt(e) {
  return !!(e && e.__v_isReadonly);
}
function cn(e) {
  return !!(e && e.__v_isShallow);
}
function Mr(e) {
  return gt(e) || bt(e);
}
function H(e) {
  const t = e && e.__v_raw;
  return t ? H(t) : e;
}
function Pr(e) {
  return on(e, "__v_skip", !0), e;
}
const Ut = (e) => (K(e) ? Vt(e) : e),
  ds = (e) => (K(e) ? Lr(e) : e);
function Fr(e) {
  ze && Ee && ((e = H(e)), wr(e.dep || (e.dep = is())));
}
function Sr(e, t) {
  e = H(e);
  const n = e.dep;
  n && kn(n);
}
function ce(e) {
  return !!(e && e.__v_isRef === !0);
}
function ie(e) {
  return ii(e, !1);
}
function ii(e, t) {
  return ce(e) ? e : new li(e, t);
}
class li {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : H(t)),
      (this._value = n ? t : Ut(t));
  }
  get value() {
    return Fr(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || cn(t) || bt(t);
    (t = n ? t : H(t)),
      Bt(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : Ut(t)), Sr(this));
  }
}
function ne(e) {
  return ce(e) ? e.value : e;
}
const ci = {
  get: (e, t, n) => ne(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return ce(r) && !ce(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
  },
};
function Rr(e) {
  return gt(e) ? e : new Proxy(e, ci);
}
class ui {
  constructor(t, n, s, r) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new ls(t, () => {
        this._dirty || ((this._dirty = !0), Sr(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !r),
      (this.__v_isReadonly = s);
  }
  get value() {
    const t = H(this);
    return (
      Fr(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function ai(e, t, n = !1) {
  let s, r;
  const o = N(e);
  return (
    o ? ((s = e), (r = Oe)) : ((s = e.get), (r = e.set)),
    new ui(s, r, o || !r, n)
  );
}
function qe(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (o) {
    vn(o, t, n);
  }
  return r;
}
function xe(e, t, n, s) {
  if (N(e)) {
    const o = qe(e, t, n, s);
    return (
      o &&
        pr(o) &&
        o.catch((i) => {
          vn(i, t, n);
        }),
      o
    );
  }
  const r = [];
  for (let o = 0; o < e.length; o++) r.push(xe(e[o], t, n, s));
  return r;
}
function vn(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy,
      l = n;
    for (; o; ) {
      const f = o.ec;
      if (f) {
        for (let p = 0; p < f.length; p++) if (f[p](e, i, l) === !1) return;
      }
      o = o.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      qe(u, null, 10, [e, i, l]);
      return;
    }
  }
  fi(e, n, r, s);
}
function fi(e, t, n, s = !0) {
  console.error(e);
}
let Ht = !1,
  Kn = !1;
const ae = [];
let Re = 0;
const mt = [];
let $e = null,
  tt = 0;
const Nr = Promise.resolve();
let ps = null;
function Vn(e) {
  const t = ps || Nr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function di(e) {
  let t = Re + 1,
    n = ae.length;
  for (; t < n; ) {
    const s = (t + n) >>> 1;
    Dt(ae[s]) < e ? (t = s + 1) : (n = s);
  }
  return t;
}
function hs(e) {
  (!ae.length || !ae.includes(e, Ht && e.allowRecurse ? Re + 1 : Re)) &&
    (e.id == null ? ae.push(e) : ae.splice(di(e.id), 0, e), $r());
}
function $r() {
  !Ht && !Kn && ((Kn = !0), (ps = Nr.then(Ur)));
}
function pi(e) {
  const t = ae.indexOf(e);
  t > Re && ae.splice(t, 1);
}
function hi(e) {
  M(e)
    ? mt.push(...e)
    : (!$e || !$e.includes(e, e.allowRecurse ? tt + 1 : tt)) && mt.push(e),
    $r();
}
function Ns(e, t = Ht ? Re + 1 : 0) {
  for (; t < ae.length; t++) {
    const n = ae[t];
    n && n.pre && (ae.splice(t, 1), t--, n());
  }
}
function Br(e) {
  if (mt.length) {
    const t = [...new Set(mt)];
    if (((mt.length = 0), $e)) {
      $e.push(...t);
      return;
    }
    for ($e = t, $e.sort((n, s) => Dt(n) - Dt(s)), tt = 0; tt < $e.length; tt++)
      $e[tt]();
    ($e = null), (tt = 0);
  }
}
const Dt = (e) => (e.id == null ? 1 / 0 : e.id),
  gi = (e, t) => {
    const n = Dt(e) - Dt(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function Ur(e) {
  (Kn = !1), (Ht = !0), ae.sort(gi);
  const t = Oe;
  try {
    for (Re = 0; Re < ae.length; Re++) {
      const n = ae[Re];
      n && n.active !== !1 && qe(n, null, 14);
    }
  } finally {
    (Re = 0),
      (ae.length = 0),
      Br(),
      (Ht = !1),
      (ps = null),
      (ae.length || mt.length) && Ur();
  }
}
function mi(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || W;
  let r = n;
  const o = t.startsWith("update:"),
    i = o && t.slice(7);
  if (i && i in s) {
    const p = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: _, trim: h } = s[p] || W;
    h && (r = n.map((w) => (te(w) ? w.trim() : w))), _ && (r = n.map(ln));
  }
  let l,
    u = s[(l = Mn(t))] || s[(l = Mn(_t(t)))];
  !u && o && (u = s[(l = Mn(xt(t)))]), u && xe(u, e, 6, r);
  const f = s[l + "Once"];
  if (f) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), xe(f, e, 6, r);
  }
}
function Hr(e, t, n = !1) {
  const s = t.emitsCache,
    r = s.get(e);
  if (r !== void 0) return r;
  const o = e.emits;
  let i = {},
    l = !1;
  if (!N(e)) {
    const u = (f) => {
      const p = Hr(f, t, !0);
      p && ((l = !0), se(i, p));
    };
    !n && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u);
  }
  return !o && !l
    ? (K(e) && s.set(e, null), null)
    : (M(o) ? o.forEach((u) => (i[u] = null)) : se(i, o),
      K(e) && s.set(e, i),
      i);
}
function xn(e, t) {
  return !e || !gn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      U(e, t[0].toLowerCase() + t.slice(1)) || U(e, xt(t)) || U(e, t));
}
let fe = null,
  wn = null;
function un(e) {
  const t = fe;
  return (fe = e), (wn = (e && e.type.__scopeId) || null), t;
}
function _i(e) {
  wn = e;
}
function bi() {
  wn = null;
}
function yt(e, t = fe, n) {
  if (!t || e._n) return e;
  const s = (...r) => {
    s._d && qs(-1);
    const o = un(t);
    let i;
    try {
      i = e(...r);
    } finally {
      un(o), s._d && qs(1);
    }
    return i;
  };
  return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function Pn(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    props: o,
    propsOptions: [i],
    slots: l,
    attrs: u,
    emit: f,
    render: p,
    renderCache: _,
    data: h,
    setupState: w,
    ctx: T,
    inheritAttrs: I,
  } = e;
  let F, R;
  const j = un(e);
  try {
    if (n.shapeFlag & 4) {
      const P = r || s;
      (F = Se(p.call(P, P, _, o, w, h, T))), (R = u);
    } else {
      const P = t;
      (F = Se(
        P.length > 1 ? P(o, { attrs: u, slots: l, emit: f }) : P(o, null)
      )),
        (R = t.props ? u : yi(u));
    }
  } catch (P) {
    (Nt.length = 0), vn(P, e, 1), (F = Y(we));
  }
  let D = F;
  if (R && I !== !1) {
    const P = Object.keys(R),
      { shapeFlag: re } = D;
    P.length && re & 7 && (i && P.some(ns) && (R = vi(R, i)), (D = Je(D, R)));
  }
  return (
    n.dirs && ((D = Je(D)), (D.dirs = D.dirs ? D.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (D.transition = n.transition),
    (F = D),
    un(j),
    F
  );
}
const yi = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || gn(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  vi = (e, t) => {
    const n = {};
    for (const s in e) (!ns(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
    return n;
  };
function xi(e, t, n) {
  const { props: s, children: r, component: o } = e,
    { props: i, children: l, patchFlag: u } = t,
    f = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && u >= 0) {
    if (u & 1024) return !0;
    if (u & 16) return s ? $s(s, i, f) : !!i;
    if (u & 8) {
      const p = t.dynamicProps;
      for (let _ = 0; _ < p.length; _++) {
        const h = p[_];
        if (i[h] !== s[h] && !xn(f, h)) return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable)
      ? !0
      : s === i
      ? !1
      : s
      ? i
        ? $s(s, i, f)
        : !0
      : !!i;
  return !1;
}
function $s(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (t[o] !== e[o] && !xn(n, o)) return !0;
  }
  return !1;
}
function wi({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Ci = (e) => e.__isSuspense;
function Ii(e, t) {
  t && t.pendingBranch
    ? M(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : hi(e);
}
function Ei(e, t) {
  return gs(e, null, { flush: "post" });
}
const Gt = {};
function Pt(e, t, n) {
  return gs(e, t, n);
}
function gs(
  e,
  t,
  { immediate: n, deep: s, flush: r, onTrack: o, onTrigger: i } = W
) {
  var l;
  const u = Fo() === ((l = le) == null ? void 0 : l.scope) ? le : null;
  let f,
    p = !1,
    _ = !1;
  if (
    (ce(e)
      ? ((f = () => e.value), (p = cn(e)))
      : gt(e)
      ? ((f = () => e), (s = !0))
      : M(e)
      ? ((_ = !0),
        (p = e.some((P) => gt(P) || cn(P))),
        (f = () =>
          e.map((P) => {
            if (ce(P)) return P.value;
            if (gt(P)) return ot(P);
            if (N(P)) return qe(P, u, 2);
          })))
      : N(e)
      ? t
        ? (f = () => qe(e, u, 2))
        : (f = () => {
            if (!(u && u.isUnmounted)) return h && h(), xe(e, u, 3, [w]);
          })
      : (f = Oe),
    t && s)
  ) {
    const P = f;
    f = () => ot(P());
  }
  let h,
    w = (P) => {
      h = j.onStop = () => {
        qe(P, u, 4);
      };
    },
    T;
  if (kt)
    if (
      ((w = Oe),
      t ? n && xe(t, u, 3, [f(), _ ? [] : void 0, w]) : f(),
      r === "sync")
    ) {
      const P = vl();
      T = P.__watcherHandles || (P.__watcherHandles = []);
    } else return Oe;
  let I = _ ? new Array(e.length).fill(Gt) : Gt;
  const F = () => {
    if (j.active)
      if (t) {
        const P = j.run();
        (s || p || (_ ? P.some((re, Ae) => Bt(re, I[Ae])) : Bt(P, I))) &&
          (h && h(),
          xe(t, u, 3, [P, I === Gt ? void 0 : _ && I[0] === Gt ? [] : I, w]),
          (I = P));
      } else j.run();
  };
  F.allowRecurse = !!t;
  let R;
  r === "sync"
    ? (R = F)
    : r === "post"
    ? (R = () => ge(F, u && u.suspense))
    : ((F.pre = !0), u && (F.id = u.uid), (R = () => hs(F)));
  const j = new ls(f, R);
  t
    ? n
      ? F()
      : (I = j.run())
    : r === "post"
    ? ge(j.run.bind(j), u && u.suspense)
    : j.run();
  const D = () => {
    j.stop(), u && u.scope && ss(u.scope.effects, j);
  };
  return T && T.push(D), D;
}
function Ti(e, t, n) {
  const s = this.proxy,
    r = te(e) ? (e.includes(".") ? Dr(s, e) : () => s[e]) : e.bind(s, s);
  let o;
  N(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = le;
  vt(this);
  const l = gs(r, o.bind(s), n);
  return i ? vt(i) : ut(), l;
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
  if (!K(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), ce(e))) ot(e.value, t);
  else if (M(e)) for (let n = 0; n < e.length; n++) ot(e[n], t);
  else if (mn(e) || ht(e))
    e.forEach((n) => {
      ot(n, t);
    });
  else if (gr(e)) for (const n in e) ot(e[n], t);
  return e;
}
function nn(e, t) {
  const n = fe;
  if (n === null) return e;
  const s = On(n) || n.proxy,
    r = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [i, l, u, f = W] = t[o];
    i &&
      (N(i) && (i = { mounted: i, updated: i }),
      i.deep && ot(l),
      r.push({
        dir: i,
        instance: s,
        value: l,
        oldValue: void 0,
        arg: u,
        modifiers: f,
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
    u && (wt(), xe(u, n, 8, [e.el, l, e, t]), Ct());
  }
}
function Oi() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    zt(() => {
      e.isMounted = !0;
    }),
    zr(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const ve = [Function, Array],
  jr = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: ve,
    onEnter: ve,
    onAfterEnter: ve,
    onEnterCancelled: ve,
    onBeforeLeave: ve,
    onLeave: ve,
    onAfterLeave: ve,
    onLeaveCancelled: ve,
    onBeforeAppear: ve,
    onAppear: ve,
    onAfterAppear: ve,
    onAppearCancelled: ve,
  },
  Ai = {
    name: "BaseTransition",
    props: jr,
    setup(e, { slots: t }) {
      const n = oo(),
        s = Oi();
      let r;
      return () => {
        const o = t.default && Kr(t.default(), !0);
        if (!o || !o.length) return;
        let i = o[0];
        if (o.length > 1) {
          for (const I of o)
            if (I.type !== we) {
              i = I;
              break;
            }
        }
        const l = H(e),
          { mode: u } = l;
        if (s.isLeaving) return Fn(i);
        const f = Bs(i);
        if (!f) return Fn(i);
        const p = zn(f, l, s, n);
        qn(f, p);
        const _ = n.subTree,
          h = _ && Bs(_);
        let w = !1;
        const { getTransitionKey: T } = f.type;
        if (T) {
          const I = T();
          r === void 0 ? (r = I) : I !== r && ((r = I), (w = !0));
        }
        if (h && h.type !== we && (!nt(f, h) || w)) {
          const I = zn(h, l, s, n);
          if ((qn(h, I), u === "out-in"))
            return (
              (s.isLeaving = !0),
              (I.afterLeave = () => {
                (s.isLeaving = !1), n.update.active !== !1 && n.update();
              }),
              Fn(i)
            );
          u === "in-out" &&
            f.type !== we &&
            (I.delayLeave = (F, R, j) => {
              const D = kr(s, h);
              (D[String(h.key)] = h),
                (F._leaveCb = () => {
                  R(), (F._leaveCb = void 0), delete p.delayedLeave;
                }),
                (p.delayedLeave = j);
            });
        }
        return i;
      };
    },
  },
  Li = Ai;
function kr(e, t) {
  const { leavingVNodes: n } = e;
  let s = n.get(t.type);
  return s || ((s = Object.create(null)), n.set(t.type, s)), s;
}
function zn(e, t, n, s) {
  const {
      appear: r,
      mode: o,
      persisted: i = !1,
      onBeforeEnter: l,
      onEnter: u,
      onAfterEnter: f,
      onEnterCancelled: p,
      onBeforeLeave: _,
      onLeave: h,
      onAfterLeave: w,
      onLeaveCancelled: T,
      onBeforeAppear: I,
      onAppear: F,
      onAfterAppear: R,
      onAppearCancelled: j,
    } = t,
    D = String(e.key),
    P = kr(n, e),
    re = ($, X) => {
      $ && xe($, s, 9, X);
    },
    Ae = ($, X) => {
      const q = X[1];
      re($, X),
        M($) ? $.every((ue) => ue.length <= 1) && q() : $.length <= 1 && q();
    },
    Le = {
      mode: o,
      persisted: i,
      beforeEnter($) {
        let X = l;
        if (!n.isMounted)
          if (r) X = I || l;
          else return;
        $._leaveCb && $._leaveCb(!0);
        const q = P[D];
        q && nt(e, q) && q.el._leaveCb && q.el._leaveCb(), re(X, [$]);
      },
      enter($) {
        let X = u,
          q = f,
          ue = p;
        if (!n.isMounted)
          if (r) (X = F || u), (q = R || f), (ue = j || p);
          else return;
        let O = !1;
        const Z = ($._enterCb = (_e) => {
          O ||
            ((O = !0),
            _e ? re(ue, [$]) : re(q, [$]),
            Le.delayedLeave && Le.delayedLeave(),
            ($._enterCb = void 0));
        });
        X ? Ae(X, [$, Z]) : Z();
      },
      leave($, X) {
        const q = String(e.key);
        if (($._enterCb && $._enterCb(!0), n.isUnmounting)) return X();
        re(_, [$]);
        let ue = !1;
        const O = ($._leaveCb = (Z) => {
          ue ||
            ((ue = !0),
            X(),
            Z ? re(T, [$]) : re(w, [$]),
            ($._leaveCb = void 0),
            P[q] === e && delete P[q]);
        });
        (P[q] = e), h ? Ae(h, [$, O]) : O();
      },
      clone($) {
        return zn($, t, n, s);
      },
    };
  return Le;
}
function Fn(e) {
  if (Cn(e)) return (e = Je(e)), (e.children = null), e;
}
function Bs(e) {
  return Cn(e) ? (e.children ? e.children[0] : void 0) : e;
}
function qn(e, t) {
  e.shapeFlag & 6 && e.component
    ? qn(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function Kr(e, t = !1, n) {
  let s = [],
    r = 0;
  for (let o = 0; o < e.length; o++) {
    let i = e[o];
    const l = n == null ? i.key : String(n) + String(i.key != null ? i.key : o);
    i.type === pe
      ? (i.patchFlag & 128 && r++, (s = s.concat(Kr(i.children, t, l))))
      : (t || i.type !== we) && s.push(l != null ? Je(i, { key: l }) : i);
  }
  if (r > 1) for (let o = 0; o < s.length; o++) s[o].patchFlag = -2;
  return s;
}
const Ft = (e) => !!e.type.__asyncLoader,
  Cn = (e) => e.type.__isKeepAlive;
function Mi(e, t) {
  Vr(e, "a", t);
}
function Pi(e, t) {
  Vr(e, "da", t);
}
function Vr(e, t, n = le) {
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
  if ((In(t, s, n), n)) {
    let r = n.parent;
    for (; r && r.parent; )
      Cn(r.parent.vnode) && Fi(s, t, n, r), (r = r.parent);
  }
}
function Fi(e, t, n, s) {
  const r = In(t, e, s, !0);
  ms(() => {
    ss(s[t], r);
  }, n);
}
function In(e, t, n = le, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          wt(), vt(n);
          const l = xe(t, n, e, i);
          return ut(), Ct(), l;
        });
    return s ? r.unshift(o) : r.push(o), o;
  }
}
const He =
    (e) =>
    (t, n = le) =>
      (!kt || e === "sp") && In(e, (...s) => t(...s), n),
  Si = He("bm"),
  zt = He("m"),
  Ri = He("bu"),
  Ni = He("u"),
  zr = He("bum"),
  ms = He("um"),
  $i = He("sp"),
  Bi = He("rtg"),
  Ui = He("rtc");
function Hi(e, t = le) {
  In("ec", e, t);
}
const Di = Symbol.for("v-ndc");
function qr(e, t, n, s) {
  let r;
  const o = n && n[s];
  if (M(e) || te(e)) {
    r = new Array(e.length);
    for (let i = 0, l = e.length; i < l; i++)
      r[i] = t(e[i], i, void 0, o && o[i]);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let i = 0; i < e; i++) r[i] = t(i + 1, i, void 0, o && o[i]);
  } else if (K(e))
    if (e[Symbol.iterator])
      r = Array.from(e, (i, l) => t(i, l, void 0, o && o[l]));
    else {
      const i = Object.keys(e);
      r = new Array(i.length);
      for (let l = 0, u = i.length; l < u; l++) {
        const f = i[l];
        r[l] = t(e[f], f, l, o && o[l]);
      }
    }
  else r = [];
  return n && (n[s] = r), r;
}
function ji(e, t, n = {}, s, r) {
  if (fe.isCE || (fe.parent && Ft(fe.parent) && fe.parent.isCE))
    return t !== "default" && (n.name = t), Y("slot", n, s && s());
  let o = e[t];
  o && o._c && (o._d = !1), G();
  const i = o && Wr(o(n)),
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
function Wr(e) {
  return e.some((t) =>
    dn(t) ? !(t.type === we || (t.type === pe && !Wr(t.children))) : !0
  )
    ? e
    : null;
}
const Wn = (e) => (e ? (io(e) ? On(e) || e.proxy : Wn(e.parent)) : null),
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
    $watch: (e) => Ti.bind(e),
  }),
  Sn = (e, t) => e !== W && !e.__isScriptSetup && U(e, t),
  ki = {
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
      let f;
      if (t[0] !== "$") {
        const w = i[t];
        if (w !== void 0)
          switch (w) {
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
          if (Sn(s, t)) return (i[t] = 1), s[t];
          if (r !== W && U(r, t)) return (i[t] = 2), r[t];
          if ((f = e.propsOptions[0]) && U(f, t)) return (i[t] = 3), o[t];
          if (n !== W && U(n, t)) return (i[t] = 4), n[t];
          Jn && (i[t] = 0);
        }
      }
      const p = St[t];
      let _, h;
      if (p) return t === "$attrs" && me(e, "get", t), p(e);
      if ((_ = l.__cssModules) && (_ = _[t])) return _;
      if (n !== W && U(n, t)) return (i[t] = 4), n[t];
      if (((h = u.config.globalProperties), U(h, t))) return h[t];
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: r, ctx: o } = e;
      return Sn(r, t)
        ? ((r[t] = n), !0)
        : s !== W && U(s, t)
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
        (e !== W && U(e, i)) ||
        Sn(t, i) ||
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
function Us(e) {
  return M(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let Jn = !0;
function Ki(e) {
  const t = _s(e),
    n = e.proxy,
    s = e.ctx;
  (Jn = !1), t.beforeCreate && Hs(t.beforeCreate, e, "bc");
  const {
    data: r,
    computed: o,
    methods: i,
    watch: l,
    provide: u,
    inject: f,
    created: p,
    beforeMount: _,
    mounted: h,
    beforeUpdate: w,
    updated: T,
    activated: I,
    deactivated: F,
    beforeDestroy: R,
    beforeUnmount: j,
    destroyed: D,
    unmounted: P,
    render: re,
    renderTracked: Ae,
    renderTriggered: Le,
    errorCaptured: $,
    serverPrefetch: X,
    expose: q,
    inheritAttrs: ue,
    components: O,
    directives: Z,
    filters: _e,
  } = t;
  if ((f && Vi(f, s, null), i))
    for (const Q in i) {
      const V = i[Q];
      N(V) && (s[Q] = V.bind(n));
    }
  if (r) {
    const Q = r.call(n, n);
    K(Q) && (e.data = Vt(Q));
  }
  if (((Jn = !0), o))
    for (const Q in o) {
      const V = o[Q],
        Ye = N(V) ? V.bind(n, n) : N(V.get) ? V.get.bind(n, n) : Oe,
        qt = !N(V) && N(V.set) ? V.set.bind(n) : Oe,
        Ze = Be({ get: Ye, set: qt });
      Object.defineProperty(s, Q, {
        enumerable: !0,
        configurable: !0,
        get: () => Ze.value,
        set: (Me) => (Ze.value = Me),
      });
    }
  if (l) for (const Q in l) Jr(l[Q], s, n, Q);
  if (u) {
    const Q = N(u) ? u.call(n) : u;
    Reflect.ownKeys(Q).forEach((V) => {
      sn(V, Q[V]);
    });
  }
  p && Hs(p, e, "c");
  function oe(Q, V) {
    M(V) ? V.forEach((Ye) => Q(Ye.bind(n))) : V && Q(V.bind(n));
  }
  if (
    (oe(Si, _),
    oe(zt, h),
    oe(Ri, w),
    oe(Ni, T),
    oe(Mi, I),
    oe(Pi, F),
    oe(Hi, $),
    oe(Ui, Ae),
    oe(Bi, Le),
    oe(zr, j),
    oe(ms, P),
    oe($i, X),
    M(q))
  )
    if (q.length) {
      const Q = e.exposed || (e.exposed = {});
      q.forEach((V) => {
        Object.defineProperty(Q, V, {
          get: () => n[V],
          set: (Ye) => (n[V] = Ye),
        });
      });
    } else e.exposed || (e.exposed = {});
  re && e.render === Oe && (e.render = re),
    ue != null && (e.inheritAttrs = ue),
    O && (e.components = O),
    Z && (e.directives = Z);
}
function Vi(e, t, n = Oe) {
  M(e) && (e = Yn(e));
  for (const s in e) {
    const r = e[s];
    let o;
    K(r)
      ? "default" in r
        ? (o = lt(r.from || s, r.default, !0))
        : (o = lt(r.from || s))
      : (o = lt(r)),
      ce(o)
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (i) => (o.value = i),
          })
        : (t[s] = o);
  }
}
function Hs(e, t, n) {
  xe(M(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Jr(e, t, n, s) {
  const r = s.includes(".") ? Dr(n, s) : () => n[s];
  if (te(e)) {
    const o = t[e];
    N(o) && Pt(r, o);
  } else if (N(e)) Pt(r, e.bind(n));
  else if (K(e))
    if (M(e)) e.forEach((o) => Jr(o, t, n, s));
    else {
      const o = N(e.handler) ? e.handler.bind(n) : t[e.handler];
      N(o) && Pt(r, o, e);
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
      : ((u = {}), r.length && r.forEach((f) => an(u, f, i, !0)), an(u, t, i)),
    K(t) && o.set(t, u),
    u
  );
}
function an(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && an(e, o, n, !0), r && r.forEach((i) => an(e, i, n, !0));
  for (const i in t)
    if (!(s && i === "expose")) {
      const l = zi[i] || (n && n[i]);
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const zi = {
  data: Ds,
  props: js,
  emits: js,
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
  watch: Wi,
  provide: Ds,
  inject: qi,
};
function Ds(e, t) {
  return t
    ? e
      ? function () {
          return se(
            N(e) ? e.call(this, this) : e,
            N(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function qi(e, t) {
  return Mt(Yn(e), Yn(t));
}
function Yn(e) {
  if (M(e)) {
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
function js(e, t) {
  return e
    ? M(e) && M(t)
      ? [...new Set([...e, ...t])]
      : se(Object.create(null), Us(e), Us(t ?? {}))
    : t;
}
function Wi(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = se(Object.create(null), e);
  for (const s in t) n[s] = de(e[s], t[s]);
  return n;
}
function Yr() {
  return {
    app: null,
    config: {
      isNativeTag: go,
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
let Ji = 0;
function Yi(e, t) {
  return function (s, r = null) {
    N(s) || (s = se({}, s)), r != null && !K(r) && (r = null);
    const o = Yr(),
      i = new Set();
    let l = !1;
    const u = (o.app = {
      _uid: Ji++,
      _component: s,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: xl,
      get config() {
        return o.config;
      },
      set config(f) {},
      use(f, ...p) {
        return (
          i.has(f) ||
            (f && N(f.install)
              ? (i.add(f), f.install(u, ...p))
              : N(f) && (i.add(f), f(u, ...p))),
          u
        );
      },
      mixin(f) {
        return o.mixins.includes(f) || o.mixins.push(f), u;
      },
      component(f, p) {
        return p ? ((o.components[f] = p), u) : o.components[f];
      },
      directive(f, p) {
        return p ? ((o.directives[f] = p), u) : o.directives[f];
      },
      mount(f, p, _) {
        if (!l) {
          const h = Y(s, r);
          return (
            (h.appContext = o),
            p && t ? t(h, f) : e(h, f, _),
            (l = !0),
            (u._container = f),
            (f.__vue_app__ = u),
            On(h.component) || h.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, u._container), delete u._container.__vue_app__);
      },
      provide(f, p) {
        return (o.provides[f] = p), u;
      },
      runWithContext(f) {
        fn = u;
        try {
          return f();
        } finally {
          fn = null;
        }
      },
    });
    return u;
  };
}
let fn = null;
function sn(e, t) {
  if (le) {
    let n = le.provides;
    const s = le.parent && le.parent.provides;
    s === n && (n = le.provides = Object.create(s)), (n[e] = t);
  }
}
function lt(e, t, n = !1) {
  const s = le || fe;
  if (s || fn) {
    const r = s
      ? s.parent == null
        ? s.vnode.appContext && s.vnode.appContext.provides
        : s.parent.provides
      : fn._context.provides;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && N(t) ? t.call(s && s.proxy) : t;
  }
}
function Zi(e, t, n, s = !1) {
  const r = {},
    o = {};
  on(o, Tn, 1), (e.propsDefaults = Object.create(null)), Zr(e, t, r, o);
  for (const i in e.propsOptions[0]) i in r || (r[i] = void 0);
  n ? (e.props = s ? r : oi(r)) : e.type.props ? (e.props = r) : (e.props = o),
    (e.attrs = o);
}
function Xi(e, t, n, s) {
  const {
      props: r,
      attrs: o,
      vnode: { patchFlag: i },
    } = e,
    l = H(r),
    [u] = e.propsOptions;
  let f = !1;
  if ((s || i > 0) && !(i & 16)) {
    if (i & 8) {
      const p = e.vnode.dynamicProps;
      for (let _ = 0; _ < p.length; _++) {
        let h = p[_];
        if (xn(e.emitsOptions, h)) continue;
        const w = t[h];
        if (u)
          if (U(o, h)) w !== o[h] && ((o[h] = w), (f = !0));
          else {
            const T = _t(h);
            r[T] = Zn(u, l, T, w, e, !1);
          }
        else w !== o[h] && ((o[h] = w), (f = !0));
      }
    }
  } else {
    Zr(e, t, r, o) && (f = !0);
    let p;
    for (const _ in l)
      (!t || (!U(t, _) && ((p = xt(_)) === _ || !U(t, p)))) &&
        (u
          ? n &&
            (n[_] !== void 0 || n[p] !== void 0) &&
            (r[_] = Zn(u, l, _, void 0, e, !0))
          : delete r[_]);
    if (o !== l) for (const _ in o) (!t || !U(t, _)) && (delete o[_], (f = !0));
  }
  f && Ue(e, "set", "$attrs");
}
function Zr(e, t, n, s) {
  const [r, o] = e.propsOptions;
  let i = !1,
    l;
  if (t)
    for (let u in t) {
      if (en(u)) continue;
      const f = t[u];
      let p;
      r && U(r, (p = _t(u)))
        ? !o || !o.includes(p)
          ? (n[p] = f)
          : ((l || (l = {}))[p] = f)
        : xn(e.emitsOptions, u) ||
          ((!(u in s) || f !== s[u]) && ((s[u] = f), (i = !0)));
    }
  if (o) {
    const u = H(n),
      f = l || W;
    for (let p = 0; p < o.length; p++) {
      const _ = o[p];
      n[_] = Zn(r, u, _, f[_], e, !U(f, _));
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
      if (i.type !== Function && !i.skipFactory && N(u)) {
        const { propsDefaults: f } = r;
        n in f ? (s = f[n]) : (vt(r), (s = f[n] = u.call(null, t)), ut());
      } else s = u;
    }
    i[0] &&
      (o && !l ? (s = !1) : i[1] && (s === "" || s === xt(n)) && (s = !0));
  }
  return s;
}
function Xr(e, t, n = !1) {
  const s = t.propsCache,
    r = s.get(e);
  if (r) return r;
  const o = e.props,
    i = {},
    l = [];
  let u = !1;
  if (!N(e)) {
    const p = (_) => {
      u = !0;
      const [h, w] = Xr(_, t, !0);
      se(i, h), w && l.push(...w);
    };
    !n && t.mixins.length && t.mixins.forEach(p),
      e.extends && p(e.extends),
      e.mixins && e.mixins.forEach(p);
  }
  if (!o && !u) return K(e) && s.set(e, pt), pt;
  if (M(o))
    for (let p = 0; p < o.length; p++) {
      const _ = _t(o[p]);
      ks(_) && (i[_] = W);
    }
  else if (o)
    for (const p in o) {
      const _ = _t(p);
      if (ks(_)) {
        const h = o[p],
          w = (i[_] = M(h) || N(h) ? { type: h } : se({}, h));
        if (w) {
          const T = zs(Boolean, w.type),
            I = zs(String, w.type);
          (w[0] = T > -1),
            (w[1] = I < 0 || T < I),
            (T > -1 || U(w, "default")) && l.push(_);
        }
      }
    }
  const f = [i, l];
  return K(e) && s.set(e, f), f;
}
function ks(e) {
  return e[0] !== "$";
}
function Ks(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function Vs(e, t) {
  return Ks(e) === Ks(t);
}
function zs(e, t) {
  return M(t) ? t.findIndex((n) => Vs(n, e)) : N(t) && Vs(t, e) ? 0 : -1;
}
const Qr = (e) => e[0] === "_" || e === "$stable",
  bs = (e) => (M(e) ? e.map(Se) : [Se(e)]),
  Qi = (e, t, n) => {
    if (t._n) return t;
    const s = yt((...r) => bs(t(...r)), n);
    return (s._c = !1), s;
  },
  Gr = (e, t, n) => {
    const s = e._ctx;
    for (const r in e) {
      if (Qr(r)) continue;
      const o = e[r];
      if (N(o)) t[r] = Qi(r, o, s);
      else if (o != null) {
        const i = bs(o);
        t[r] = () => i;
      }
    }
  },
  eo = (e, t) => {
    const n = bs(t);
    e.slots.default = () => n;
  },
  Gi = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = H(t)), on(t, "_", n)) : Gr(t, (e.slots = {}));
    } else (e.slots = {}), t && eo(e, t);
    on(e.slots, Tn, 1);
  },
  el = (e, t, n) => {
    const { vnode: s, slots: r } = e;
    let o = !0,
      i = W;
    if (s.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (o = !1)
          : (se(r, t), !n && l === 1 && delete r._)
        : ((o = !t.$stable), Gr(t, r)),
        (i = t);
    } else t && (eo(e, t), (i = { default: 1 }));
    if (o) for (const l in r) !Qr(l) && !(l in i) && delete r[l];
  };
function Xn(e, t, n, s, r = !1) {
  if (M(e)) {
    e.forEach((h, w) => Xn(h, t && (M(t) ? t[w] : t), n, s, r));
    return;
  }
  if (Ft(s) && !r) return;
  const o = s.shapeFlag & 4 ? On(s.component) || s.component.proxy : s.el,
    i = r ? null : o,
    { i: l, r: u } = e,
    f = t && t.r,
    p = l.refs === W ? (l.refs = {}) : l.refs,
    _ = l.setupState;
  if (
    (f != null &&
      f !== u &&
      (te(f)
        ? ((p[f] = null), U(_, f) && (_[f] = null))
        : ce(f) && (f.value = null)),
    N(u))
  )
    qe(u, l, 12, [i, p]);
  else {
    const h = te(u),
      w = ce(u);
    if (h || w) {
      const T = () => {
        if (e.f) {
          const I = h ? (U(_, u) ? _[u] : p[u]) : u.value;
          r
            ? M(I) && ss(I, o)
            : M(I)
            ? I.includes(o) || I.push(o)
            : h
            ? ((p[u] = [o]), U(_, u) && (_[u] = p[u]))
            : ((u.value = [o]), e.k && (p[e.k] = u.value));
        } else
          h
            ? ((p[u] = i), U(_, u) && (_[u] = i))
            : w && ((u.value = i), e.k && (p[e.k] = i));
      };
      i ? ((T.id = -1), ge(T, n)) : T();
    }
  }
}
const ge = Ii;
function tl(e) {
  return nl(e);
}
function nl(e, t) {
  const n = Bn();
  n.__VUE__ = !0;
  const {
      insert: s,
      remove: r,
      patchProp: o,
      createElement: i,
      createText: l,
      createComment: u,
      setText: f,
      setElementText: p,
      parentNode: _,
      nextSibling: h,
      setScopeId: w = Oe,
      insertStaticContent: T,
    } = e,
    I = (
      c,
      a,
      d,
      m = null,
      g = null,
      v = null,
      C = !1,
      y = null,
      x = !!a.dynamicChildren
    ) => {
      if (c === a) return;
      c && !nt(c, a) && ((m = Wt(c)), Me(c, g, v, !0), (c = null)),
        a.patchFlag === -2 && ((x = !1), (a.dynamicChildren = null));
      const { type: b, ref: A, shapeFlag: E } = a;
      switch (b) {
        case En:
          F(c, a, d, m);
          break;
        case we:
          R(c, a, d, m);
          break;
        case Rt:
          c == null && j(a, d, m, C);
          break;
        case pe:
          O(c, a, d, m, g, v, C, y, x);
          break;
        default:
          E & 1
            ? re(c, a, d, m, g, v, C, y, x)
            : E & 6
            ? Z(c, a, d, m, g, v, C, y, x)
            : (E & 64 || E & 128) && b.process(c, a, d, m, g, v, C, y, x, at);
      }
      A != null && g && Xn(A, c && c.ref, v, a || c, !a);
    },
    F = (c, a, d, m) => {
      if (c == null) s((a.el = l(a.children)), d, m);
      else {
        const g = (a.el = c.el);
        a.children !== c.children && f(g, a.children);
      }
    },
    R = (c, a, d, m) => {
      c == null ? s((a.el = u(a.children || "")), d, m) : (a.el = c.el);
    },
    j = (c, a, d, m) => {
      [c.el, c.anchor] = T(c.children, a, d, m, c.el, c.anchor);
    },
    D = ({ el: c, anchor: a }, d, m) => {
      let g;
      for (; c && c !== a; ) (g = h(c)), s(c, d, m), (c = g);
      s(a, d, m);
    },
    P = ({ el: c, anchor: a }) => {
      let d;
      for (; c && c !== a; ) (d = h(c)), r(c), (c = d);
      r(a);
    },
    re = (c, a, d, m, g, v, C, y, x) => {
      (C = C || a.type === "svg"),
        c == null ? Ae(a, d, m, g, v, C, y, x) : X(c, a, g, v, C, y, x);
    },
    Ae = (c, a, d, m, g, v, C, y) => {
      let x, b;
      const { type: A, props: E, shapeFlag: L, transition: S, dirs: B } = c;
      if (
        ((x = c.el = i(c.type, v, E && E.is, E)),
        L & 8
          ? p(x, c.children)
          : L & 16 &&
            $(c.children, x, null, m, g, v && A !== "foreignObject", C, y),
        B && Xe(c, null, m, "created"),
        Le(x, c, c.scopeId, C, m),
        E)
      ) {
        for (const k in E)
          k !== "value" &&
            !en(k) &&
            o(x, k, null, E[k], v, c.children, m, g, Ne);
        "value" in E && o(x, "value", null, E.value),
          (b = E.onVnodeBeforeMount) && Fe(b, m, c);
      }
      B && Xe(c, null, m, "beforeMount");
      const z = (!g || (g && !g.pendingBranch)) && S && !S.persisted;
      z && S.beforeEnter(x),
        s(x, a, d),
        ((b = E && E.onVnodeMounted) || z || B) &&
          ge(() => {
            b && Fe(b, m, c), z && S.enter(x), B && Xe(c, null, m, "mounted");
          }, g);
    },
    Le = (c, a, d, m, g) => {
      if ((d && w(c, d), m)) for (let v = 0; v < m.length; v++) w(c, m[v]);
      if (g) {
        let v = g.subTree;
        if (a === v) {
          const C = g.vnode;
          Le(c, C, C.scopeId, C.slotScopeIds, g.parent);
        }
      }
    },
    $ = (c, a, d, m, g, v, C, y, x = 0) => {
      for (let b = x; b < c.length; b++) {
        const A = (c[b] = y ? Ke(c[b]) : Se(c[b]));
        I(null, A, a, d, m, g, v, C, y);
      }
    },
    X = (c, a, d, m, g, v, C) => {
      const y = (a.el = c.el);
      let { patchFlag: x, dynamicChildren: b, dirs: A } = a;
      x |= c.patchFlag & 16;
      const E = c.props || W,
        L = a.props || W;
      let S;
      d && Qe(d, !1),
        (S = L.onVnodeBeforeUpdate) && Fe(S, d, a, c),
        A && Xe(a, c, d, "beforeUpdate"),
        d && Qe(d, !0);
      const B = g && a.type !== "foreignObject";
      if (
        (b
          ? q(c.dynamicChildren, b, y, d, m, B, v)
          : C || V(c, a, y, null, d, m, B, v, !1),
        x > 0)
      ) {
        if (x & 16) ue(y, a, E, L, d, m, g);
        else if (
          (x & 2 && E.class !== L.class && o(y, "class", null, L.class, g),
          x & 4 && o(y, "style", E.style, L.style, g),
          x & 8)
        ) {
          const z = a.dynamicProps;
          for (let k = 0; k < z.length; k++) {
            const ee = z[k],
              Ce = E[ee],
              ft = L[ee];
            (ft !== Ce || ee === "value") &&
              o(y, ee, Ce, ft, g, c.children, d, m, Ne);
          }
        }
        x & 1 && c.children !== a.children && p(y, a.children);
      } else !C && b == null && ue(y, a, E, L, d, m, g);
      ((S = L.onVnodeUpdated) || A) &&
        ge(() => {
          S && Fe(S, d, a, c), A && Xe(a, c, d, "updated");
        }, m);
    },
    q = (c, a, d, m, g, v, C) => {
      for (let y = 0; y < a.length; y++) {
        const x = c[y],
          b = a[y],
          A =
            x.el && (x.type === pe || !nt(x, b) || x.shapeFlag & 70)
              ? _(x.el)
              : d;
        I(x, b, A, null, m, g, v, C, !0);
      }
    },
    ue = (c, a, d, m, g, v, C) => {
      if (d !== m) {
        if (d !== W)
          for (const y in d)
            !en(y) && !(y in m) && o(c, y, d[y], null, C, a.children, g, v, Ne);
        for (const y in m) {
          if (en(y)) continue;
          const x = m[y],
            b = d[y];
          x !== b && y !== "value" && o(c, y, b, x, C, a.children, g, v, Ne);
        }
        "value" in m && o(c, "value", d.value, m.value);
      }
    },
    O = (c, a, d, m, g, v, C, y, x) => {
      const b = (a.el = c ? c.el : l("")),
        A = (a.anchor = c ? c.anchor : l(""));
      let { patchFlag: E, dynamicChildren: L, slotScopeIds: S } = a;
      S && (y = y ? y.concat(S) : S),
        c == null
          ? (s(b, d, m), s(A, d, m), $(a.children, d, A, g, v, C, y, x))
          : E > 0 && E & 64 && L && c.dynamicChildren
          ? (q(c.dynamicChildren, L, d, g, v, C, y),
            (a.key != null || (g && a === g.subTree)) && to(c, a, !0))
          : V(c, a, d, A, g, v, C, y, x);
    },
    Z = (c, a, d, m, g, v, C, y, x) => {
      (a.slotScopeIds = y),
        c == null
          ? a.shapeFlag & 512
            ? g.ctx.activate(a, d, m, C, x)
            : _e(a, d, m, g, v, C, x)
          : Tt(c, a, x);
    },
    _e = (c, a, d, m, g, v, C) => {
      const y = (c.component = dl(c, m, g));
      if ((Cn(c) && (y.ctx.renderer = at), pl(y), y.asyncDep)) {
        if ((g && g.registerDep(y, oe), !c.el)) {
          const x = (y.subTree = Y(we));
          R(null, x, a, d);
        }
        return;
      }
      oe(y, c, a, d, g, v, C);
    },
    Tt = (c, a, d) => {
      const m = (a.component = c.component);
      if (xi(c, a, d))
        if (m.asyncDep && !m.asyncResolved) {
          Q(m, a, d);
          return;
        } else (m.next = a), pi(m.update), m.update();
      else (a.el = c.el), (m.vnode = a);
    },
    oe = (c, a, d, m, g, v, C) => {
      const y = () => {
          if (c.isMounted) {
            let { next: A, bu: E, u: L, parent: S, vnode: B } = c,
              z = A,
              k;
            Qe(c, !1),
              A ? ((A.el = B.el), Q(c, A, C)) : (A = B),
              E && tn(E),
              (k = A.props && A.props.onVnodeBeforeUpdate) && Fe(k, S, A, B),
              Qe(c, !0);
            const ee = Pn(c),
              Ce = c.subTree;
            (c.subTree = ee),
              I(Ce, ee, _(Ce.el), Wt(Ce), c, g, v),
              (A.el = ee.el),
              z === null && wi(c, ee.el),
              L && ge(L, g),
              (k = A.props && A.props.onVnodeUpdated) &&
                ge(() => Fe(k, S, A, B), g);
          } else {
            let A;
            const { el: E, props: L } = a,
              { bm: S, m: B, parent: z } = c,
              k = Ft(a);
            if (
              (Qe(c, !1),
              S && tn(S),
              !k && (A = L && L.onVnodeBeforeMount) && Fe(A, z, a),
              Qe(c, !0),
              E && Ln)
            ) {
              const ee = () => {
                (c.subTree = Pn(c)), Ln(E, c.subTree, c, g, null);
              };
              k
                ? a.type.__asyncLoader().then(() => !c.isUnmounted && ee())
                : ee();
            } else {
              const ee = (c.subTree = Pn(c));
              I(null, ee, d, m, c, g, v), (a.el = ee.el);
            }
            if ((B && ge(B, g), !k && (A = L && L.onVnodeMounted))) {
              const ee = a;
              ge(() => Fe(A, z, ee), g);
            }
            (a.shapeFlag & 256 ||
              (z && Ft(z.vnode) && z.vnode.shapeFlag & 256)) &&
              c.a &&
              ge(c.a, g),
              (c.isMounted = !0),
              (a = d = m = null);
          }
        },
        x = (c.effect = new ls(y, () => hs(b), c.scope)),
        b = (c.update = () => x.run());
      (b.id = c.uid), Qe(c, !0), b();
    },
    Q = (c, a, d) => {
      a.component = c;
      const m = c.vnode.props;
      (c.vnode = a),
        (c.next = null),
        Xi(c, a.props, m, d),
        el(c, a.children, d),
        wt(),
        Ns(),
        Ct();
    },
    V = (c, a, d, m, g, v, C, y, x = !1) => {
      const b = c && c.children,
        A = c ? c.shapeFlag : 0,
        E = a.children,
        { patchFlag: L, shapeFlag: S } = a;
      if (L > 0) {
        if (L & 128) {
          qt(b, E, d, m, g, v, C, y, x);
          return;
        } else if (L & 256) {
          Ye(b, E, d, m, g, v, C, y, x);
          return;
        }
      }
      S & 8
        ? (A & 16 && Ne(b, g, v), E !== b && p(d, E))
        : A & 16
        ? S & 16
          ? qt(b, E, d, m, g, v, C, y, x)
          : Ne(b, g, v, !0)
        : (A & 8 && p(d, ""), S & 16 && $(E, d, m, g, v, C, y, x));
    },
    Ye = (c, a, d, m, g, v, C, y, x) => {
      (c = c || pt), (a = a || pt);
      const b = c.length,
        A = a.length,
        E = Math.min(b, A);
      let L;
      for (L = 0; L < E; L++) {
        const S = (a[L] = x ? Ke(a[L]) : Se(a[L]));
        I(c[L], S, d, null, g, v, C, y, x);
      }
      b > A ? Ne(c, g, v, !0, !1, E) : $(a, d, m, g, v, C, y, x, E);
    },
    qt = (c, a, d, m, g, v, C, y, x) => {
      let b = 0;
      const A = a.length;
      let E = c.length - 1,
        L = A - 1;
      for (; b <= E && b <= L; ) {
        const S = c[b],
          B = (a[b] = x ? Ke(a[b]) : Se(a[b]));
        if (nt(S, B)) I(S, B, d, null, g, v, C, y, x);
        else break;
        b++;
      }
      for (; b <= E && b <= L; ) {
        const S = c[E],
          B = (a[L] = x ? Ke(a[L]) : Se(a[L]));
        if (nt(S, B)) I(S, B, d, null, g, v, C, y, x);
        else break;
        E--, L--;
      }
      if (b > E) {
        if (b <= L) {
          const S = L + 1,
            B = S < A ? a[S].el : m;
          for (; b <= L; )
            I(null, (a[b] = x ? Ke(a[b]) : Se(a[b])), d, B, g, v, C, y, x), b++;
        }
      } else if (b > L) for (; b <= E; ) Me(c[b], g, v, !0), b++;
      else {
        const S = b,
          B = b,
          z = new Map();
        for (b = B; b <= L; b++) {
          const be = (a[b] = x ? Ke(a[b]) : Se(a[b]));
          be.key != null && z.set(be.key, b);
        }
        let k,
          ee = 0;
        const Ce = L - B + 1;
        let ft = !1,
          Cs = 0;
        const Ot = new Array(Ce);
        for (b = 0; b < Ce; b++) Ot[b] = 0;
        for (b = S; b <= E; b++) {
          const be = c[b];
          if (ee >= Ce) {
            Me(be, g, v, !0);
            continue;
          }
          let Pe;
          if (be.key != null) Pe = z.get(be.key);
          else
            for (k = B; k <= L; k++)
              if (Ot[k - B] === 0 && nt(be, a[k])) {
                Pe = k;
                break;
              }
          Pe === void 0
            ? Me(be, g, v, !0)
            : ((Ot[Pe - B] = b + 1),
              Pe >= Cs ? (Cs = Pe) : (ft = !0),
              I(be, a[Pe], d, null, g, v, C, y, x),
              ee++);
        }
        const Is = ft ? sl(Ot) : pt;
        for (k = Is.length - 1, b = Ce - 1; b >= 0; b--) {
          const be = B + b,
            Pe = a[be],
            Es = be + 1 < A ? a[be + 1].el : m;
          Ot[b] === 0
            ? I(null, Pe, d, Es, g, v, C, y, x)
            : ft && (k < 0 || b !== Is[k] ? Ze(Pe, d, Es, 2) : k--);
        }
      }
    },
    Ze = (c, a, d, m, g = null) => {
      const { el: v, type: C, transition: y, children: x, shapeFlag: b } = c;
      if (b & 6) {
        Ze(c.component.subTree, a, d, m);
        return;
      }
      if (b & 128) {
        c.suspense.move(a, d, m);
        return;
      }
      if (b & 64) {
        C.move(c, a, d, at);
        return;
      }
      if (C === pe) {
        s(v, a, d);
        for (let E = 0; E < x.length; E++) Ze(x[E], a, d, m);
        s(c.anchor, a, d);
        return;
      }
      if (C === Rt) {
        D(c, a, d);
        return;
      }
      if (m !== 2 && b & 1 && y)
        if (m === 0) y.beforeEnter(v), s(v, a, d), ge(() => y.enter(v), g);
        else {
          const { leave: E, delayLeave: L, afterLeave: S } = y,
            B = () => s(v, a, d),
            z = () => {
              E(v, () => {
                B(), S && S();
              });
            };
          L ? L(v, B, z) : z();
        }
      else s(v, a, d);
    },
    Me = (c, a, d, m = !1, g = !1) => {
      const {
        type: v,
        props: C,
        ref: y,
        children: x,
        dynamicChildren: b,
        shapeFlag: A,
        patchFlag: E,
        dirs: L,
      } = c;
      if ((y != null && Xn(y, null, d, c, !0), A & 256)) {
        a.ctx.deactivate(c);
        return;
      }
      const S = A & 1 && L,
        B = !Ft(c);
      let z;
      if ((B && (z = C && C.onVnodeBeforeUnmount) && Fe(z, a, c), A & 6))
        ho(c.component, d, m);
      else {
        if (A & 128) {
          c.suspense.unmount(d, m);
          return;
        }
        S && Xe(c, null, a, "beforeUnmount"),
          A & 64
            ? c.type.remove(c, a, d, g, at, m)
            : b && (v !== pe || (E > 0 && E & 64))
            ? Ne(b, a, d, !1, !0)
            : ((v === pe && E & 384) || (!g && A & 16)) && Ne(x, a, d),
          m && xs(c);
      }
      ((B && (z = C && C.onVnodeUnmounted)) || S) &&
        ge(() => {
          z && Fe(z, a, c), S && Xe(c, null, a, "unmounted");
        }, d);
    },
    xs = (c) => {
      const { type: a, el: d, anchor: m, transition: g } = c;
      if (a === pe) {
        po(d, m);
        return;
      }
      if (a === Rt) {
        P(c);
        return;
      }
      const v = () => {
        r(d), g && !g.persisted && g.afterLeave && g.afterLeave();
      };
      if (c.shapeFlag & 1 && g && !g.persisted) {
        const { leave: C, delayLeave: y } = g,
          x = () => C(d, v);
        y ? y(c.el, v, x) : x();
      } else v();
    },
    po = (c, a) => {
      let d;
      for (; c !== a; ) (d = h(c)), r(c), (c = d);
      r(a);
    },
    ho = (c, a, d) => {
      const { bum: m, scope: g, update: v, subTree: C, um: y } = c;
      m && tn(m),
        g.stop(),
        v && ((v.active = !1), Me(C, c, a, d)),
        y && ge(y, a),
        ge(() => {
          c.isUnmounted = !0;
        }, a),
        a &&
          a.pendingBranch &&
          !a.isUnmounted &&
          c.asyncDep &&
          !c.asyncResolved &&
          c.suspenseId === a.pendingId &&
          (a.deps--, a.deps === 0 && a.resolve());
    },
    Ne = (c, a, d, m = !1, g = !1, v = 0) => {
      for (let C = v; C < c.length; C++) Me(c[C], a, d, m, g);
    },
    Wt = (c) =>
      c.shapeFlag & 6
        ? Wt(c.component.subTree)
        : c.shapeFlag & 128
        ? c.suspense.next()
        : h(c.anchor || c.el),
    ws = (c, a, d) => {
      c == null
        ? a._vnode && Me(a._vnode, null, null, !0)
        : I(a._vnode || null, c, a, null, null, null, d),
        Ns(),
        Br(),
        (a._vnode = c);
    },
    at = {
      p: I,
      um: Me,
      m: Ze,
      r: xs,
      mt: _e,
      mc: $,
      pc: V,
      pbc: q,
      n: Wt,
      o: e,
    };
  let An, Ln;
  return (
    t && ([An, Ln] = t(at)), { render: ws, hydrate: An, createApp: Yi(ws, An) }
  );
}
function Qe({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function to(e, t, n = !1) {
  const s = e.children,
    r = t.children;
  if (M(s) && M(r))
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      let l = r[o];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = r[o] = Ke(r[o])), (l.el = i.el)),
        n || to(i, l)),
        l.type === En && (l.el = i.el);
    }
}
function sl(e) {
  const t = e.slice(),
    n = [0];
  let s, r, o, i, l;
  const u = e.length;
  for (s = 0; s < u; s++) {
    const f = e[s];
    if (f !== 0) {
      if (((r = n[n.length - 1]), e[r] < f)) {
        (t[s] = r), n.push(s);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        (l = (o + i) >> 1), e[n[l]] < f ? (o = l + 1) : (i = l);
      f < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), (n[o] = s));
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
  return n;
}
const rl = (e) => e.__isTeleport,
  pe = Symbol.for("v-fgt"),
  En = Symbol.for("v-txt"),
  we = Symbol.for("v-cmt"),
  Rt = Symbol.for("v-stc"),
  Nt = [];
let Te = null;
function G(e = !1) {
  Nt.push((Te = e ? null : []));
}
function ol() {
  Nt.pop(), (Te = Nt[Nt.length - 1] || null);
}
let jt = 1;
function qs(e) {
  jt += e;
}
function no(e) {
  return (
    (e.dynamicChildren = jt > 0 ? Te || pt : null),
    ol(),
    jt > 0 && Te && Te.push(e),
    e
  );
}
function he(e, t, n, s, r, o) {
  return no(J(e, t, n, s, r, o, !0));
}
function ct(e, t, n, s, r) {
  return no(Y(e, t, n, s, r, !0));
}
function dn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function nt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Tn = "__vInternal",
  so = ({ key: e }) => e ?? null,
  rn = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? te(e) || ce(e) || N(e)
        ? { i: fe, r: e, k: t, f: !!n }
        : e
      : null
  );
function J(
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
    key: t && so(t),
    ref: t && rn(t),
    scopeId: wn,
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
    ctx: fe,
  };
  return (
    l
      ? (ys(u, n), o & 128 && e.normalize(u))
      : n && (u.shapeFlag |= te(n) ? 8 : 16),
    jt > 0 &&
      !i &&
      Te &&
      (u.patchFlag > 0 || o & 6) &&
      u.patchFlag !== 32 &&
      Te.push(u),
    u
  );
}
const Y = il;
function il(e, t = null, n = null, s = 0, r = null, o = !1) {
  if (((!e || e === Di) && (e = we), dn(e))) {
    const l = Je(e, t, !0);
    return (
      n && ys(l, n),
      jt > 0 &&
        !o &&
        Te &&
        (l.shapeFlag & 6 ? (Te[Te.indexOf(e)] = l) : Te.push(l)),
      (l.patchFlag |= -2),
      l
    );
  }
  if ((_l(e) && (e = e.__vccOpts), t)) {
    t = ll(t);
    let { class: l, style: u } = t;
    l && !te(l) && (t.class = ye(l)),
      K(u) && (Mr(u) && !M(u) && (u = se({}, u)), (t.style = os(u)));
  }
  const i = te(e) ? 1 : Ci(e) ? 128 : rl(e) ? 64 : K(e) ? 4 : N(e) ? 2 : 0;
  return J(e, t, n, s, r, i, o, !0);
}
function ll(e) {
  return e ? (Mr(e) || Tn in e ? se({}, e) : e) : null;
}
function Je(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: o, children: i } = e,
    l = t ? ul(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && so(l),
    ref:
      t && t.ref ? (n && r ? (M(r) ? r.concat(rn(t)) : [r, rn(t)]) : rn(t)) : r,
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
function ro(e = " ", t = 0) {
  return Y(En, null, e, t);
}
function cl(e, t) {
  const n = Y(Rt, null, e);
  return (n.staticCount = t), n;
}
function Ve(e = "", t = !1) {
  return t ? (G(), ct(we, null, e)) : Y(we, null, e);
}
function Se(e) {
  return e == null || typeof e == "boolean"
    ? Y(we)
    : M(e)
    ? Y(pe, null, e.slice())
    : typeof e == "object"
    ? Ke(e)
    : Y(En, null, String(e));
}
function Ke(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Je(e);
}
function ys(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null) t = null;
  else if (M(t)) n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), ys(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(Tn in t)
        ? (t._ctx = fe)
        : r === 3 &&
          fe &&
          (fe.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    N(t)
      ? ((t = { default: t, _ctx: fe }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [ro(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function ul(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = ye([t.class, s.class]));
      else if (r === "style") t.style = os([t.style, s.style]);
      else if (gn(r)) {
        const o = t[r],
          i = s[r];
        i &&
          o !== i &&
          !(M(o) && o.includes(i)) &&
          (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function Fe(e, t, n, s = null) {
  xe(e, t, 7, [n, s]);
}
const al = Yr();
let fl = 0;
function dl(e, t, n) {
  const s = e.type,
    r = (t ? t.appContext : e.appContext) || al,
    o = {
      uid: fl++,
      vnode: e,
      type: s,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Mo(!0),
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
      propsOptions: Xr(s, r),
      emitsOptions: Hr(s, r),
      emit: null,
      emitted: null,
      propsDefaults: W,
      inheritAttrs: s.inheritAttrs,
      ctx: W,
      data: W,
      props: W,
      attrs: W,
      slots: W,
      refs: W,
      setupState: W,
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
    (o.emit = mi.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let le = null;
const oo = () => le || fe;
let vs,
  dt,
  Ws = "__VUE_INSTANCE_SETTERS__";
(dt = Bn()[Ws]) || (dt = Bn()[Ws] = []),
  dt.push((e) => (le = e)),
  (vs = (e) => {
    dt.length > 1 ? dt.forEach((t) => t(e)) : dt[0](e);
  });
const vt = (e) => {
    vs(e), e.scope.on();
  },
  ut = () => {
    le && le.scope.off(), vs(null);
  };
function io(e) {
  return e.vnode.shapeFlag & 4;
}
let kt = !1;
function pl(e, t = !1) {
  kt = t;
  const { props: n, children: s } = e.vnode,
    r = io(e);
  Zi(e, n, r, t), Gi(e, s);
  const o = r ? hl(e, t) : void 0;
  return (kt = !1), o;
}
function hl(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Pr(new Proxy(e.ctx, ki)));
  const { setup: s } = n;
  if (s) {
    const r = (e.setupContext = s.length > 1 ? ml(e) : null);
    vt(e), wt();
    const o = qe(s, e, 0, [e.props, r]);
    if ((Ct(), ut(), pr(o))) {
      if ((o.then(ut, ut), t))
        return o
          .then((i) => {
            Js(e, i, t);
          })
          .catch((i) => {
            vn(i, e, 0);
          });
      e.asyncDep = o;
    } else Js(e, o, t);
  } else lo(e, t);
}
function Js(e, t, n) {
  N(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : K(t) && (e.setupState = Rr(t)),
    lo(e, n);
}
let Ys;
function lo(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && Ys && !s.render) {
      const r = s.template || _s(e).template;
      if (r) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
          { delimiters: l, compilerOptions: u } = s,
          f = se(se({ isCustomElement: o, delimiters: l }, i), u);
        s.render = Ys(r, f);
      }
    }
    e.render = s.render || Oe;
  }
  vt(e), wt(), Ki(e), Ct(), ut();
}
function gl(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return me(e, "get", "$attrs"), t[n];
      },
    }))
  );
}
function ml(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return gl(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function On(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Rr(Pr(e.exposed)), {
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
function _l(e) {
  return N(e) && "__vccOpts" in e;
}
const Be = (e, t) => ai(e, t, kt);
function bl(e, t, n) {
  const s = arguments.length;
  return s === 2
    ? K(t) && !M(t)
      ? dn(t)
        ? Y(e, null, [t])
        : Y(e, t)
      : Y(e, null, t)
    : (s > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : s === 3 && dn(n) && (n = [n]),
      Y(e, t, n));
}
const yl = Symbol.for("v-scx"),
  vl = () => lt(yl),
  xl = "3.3.4",
  wl = "http://www.w3.org/2000/svg",
  st = typeof document < "u" ? document : null,
  Zs = st && st.createElement("template"),
  Cl = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, s) => {
      const r = t
        ? st.createElementNS(wl, e)
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
        Zs.innerHTML = s ? `<svg>${e}</svg>` : e;
        const l = Zs.content;
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
function Il(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function El(e, t, n) {
  const s = e.style,
    r = te(n);
  if (n && !r) {
    if (t && !te(t)) for (const o in t) n[o] == null && Qn(s, o, "");
    for (const o in n) Qn(s, o, n[o]);
  } else {
    const o = s.display;
    r ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (s.display = o);
  }
}
const Xs = /\s*!important$/;
function Qn(e, t, n) {
  if (M(n)) n.forEach((s) => Qn(e, t, s));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const s = Tl(e, t);
    Xs.test(n)
      ? e.setProperty(xt(s), n.replace(Xs, ""), "important")
      : (e[s] = n);
  }
}
const Qs = ["Webkit", "Moz", "ms"],
  Rn = {};
function Tl(e, t) {
  const n = Rn[t];
  if (n) return n;
  let s = _t(t);
  if (s !== "filter" && s in e) return (Rn[t] = s);
  s = mr(s);
  for (let r = 0; r < Qs.length; r++) {
    const o = Qs[r] + s;
    if (o in e) return (Rn[t] = o);
  }
  return t;
}
const Gs = "http://www.w3.org/1999/xlink";
function Ol(e, t, n, s, r) {
  if (s && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(Gs, t.slice(6, t.length))
      : e.setAttributeNS(Gs, t, n);
  else {
    const o = Oo(t);
    n == null || (o && !_r(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : n);
  }
}
function Al(e, t, n, s, r, o, i) {
  if (t === "innerHTML" || t === "textContent") {
    s && i(s, r, o), (e[t] = n ?? "");
    return;
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && !l.includes("-")) {
    e._value = n;
    const f = l === "OPTION" ? e.getAttribute("value") : e.value,
      p = n ?? "";
    f !== p && (e.value = p), n == null && e.removeAttribute(t);
    return;
  }
  let u = !1;
  if (n === "" || n == null) {
    const f = typeof e[t];
    f === "boolean"
      ? (n = _r(n))
      : n == null && f === "string"
      ? ((n = ""), (u = !0))
      : f === "number" && ((n = 0), (u = !0));
  }
  try {
    e[t] = n;
  } catch {}
  u && e.removeAttribute(t);
}
function rt(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Ll(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function Ml(e, t, n, s, r = null) {
  const o = e._vei || (e._vei = {}),
    i = o[t];
  if (s && i) i.value = s;
  else {
    const [l, u] = Pl(t);
    if (s) {
      const f = (o[t] = Rl(s, r));
      rt(e, l, f, u);
    } else i && (Ll(e, l, i, u), (o[t] = void 0));
  }
}
const er = /(?:Once|Passive|Capture)$/;
function Pl(e) {
  let t;
  if (er.test(e)) {
    t = {};
    let s;
    for (; (s = e.match(er)); )
      (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : xt(e.slice(2)), t];
}
let Nn = 0;
const Fl = Promise.resolve(),
  Sl = () => Nn || (Fl.then(() => (Nn = 0)), (Nn = Date.now()));
function Rl(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now();
    else if (s._vts <= n.attached) return;
    xe(Nl(s, n.value), t, 5, [s]);
  };
  return (n.value = e), (n.attached = Sl()), n;
}
function Nl(e, t) {
  if (M(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((s) => (r) => !r._stopped && s && s(r))
    );
  } else return t;
}
const tr = /^on[a-z]/,
  $l = (e, t, n, s, r = !1, o, i, l, u) => {
    t === "class"
      ? Il(e, s, r)
      : t === "style"
      ? El(e, n, s)
      : gn(t)
      ? ns(t) || Ml(e, t, n, s, i)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : Bl(e, t, s, r)
        )
      ? Al(e, t, s, o, i, l, u)
      : (t === "true-value"
          ? (e._trueValue = s)
          : t === "false-value" && (e._falseValue = s),
        Ol(e, t, s, r));
  };
function Bl(e, t, n, s) {
  return s
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && tr.test(t) && N(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (tr.test(t) && te(n))
    ? !1
    : t in e;
}
function co(e) {
  const t = oo();
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
  Ei(s),
    zt(() => {
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
  It = (e, { slots: t }) => bl(Li, Ul(e), t);
It.displayName = "Transition";
const uo = {
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
It.props = se({}, jr, uo);
const Ge = (e, t = []) => {
    M(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  nr = (e) => (e ? (M(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function Ul(e) {
  const t = {};
  for (const O in e) O in uo || (t[O] = e[O]);
  if (e.css === !1) return t;
  const {
      name: n = "v",
      type: s,
      duration: r,
      enterFromClass: o = `${n}-enter-from`,
      enterActiveClass: i = `${n}-enter-active`,
      enterToClass: l = `${n}-enter-to`,
      appearFromClass: u = o,
      appearActiveClass: f = i,
      appearToClass: p = l,
      leaveFromClass: _ = `${n}-leave-from`,
      leaveActiveClass: h = `${n}-leave-active`,
      leaveToClass: w = `${n}-leave-to`,
    } = e,
    T = Hl(r),
    I = T && T[0],
    F = T && T[1],
    {
      onBeforeEnter: R,
      onEnter: j,
      onEnterCancelled: D,
      onLeave: P,
      onLeaveCancelled: re,
      onBeforeAppear: Ae = R,
      onAppear: Le = j,
      onAppearCancelled: $ = D,
    } = t,
    X = (O, Z, _e) => {
      et(O, Z ? p : l), et(O, Z ? f : i), _e && _e();
    },
    q = (O, Z) => {
      (O._isLeaving = !1), et(O, _), et(O, w), et(O, h), Z && Z();
    },
    ue = (O) => (Z, _e) => {
      const Tt = O ? Le : j,
        oe = () => X(Z, O, _e);
      Ge(Tt, [Z, oe]),
        sr(() => {
          et(Z, O ? u : o), ke(Z, O ? p : l), nr(Tt) || rr(Z, s, I, oe);
        });
    };
  return se(t, {
    onBeforeEnter(O) {
      Ge(R, [O]), ke(O, o), ke(O, i);
    },
    onBeforeAppear(O) {
      Ge(Ae, [O]), ke(O, u), ke(O, f);
    },
    onEnter: ue(!1),
    onAppear: ue(!0),
    onLeave(O, Z) {
      O._isLeaving = !0;
      const _e = () => q(O, Z);
      ke(O, _),
        kl(),
        ke(O, h),
        sr(() => {
          O._isLeaving && (et(O, _), ke(O, w), nr(P) || rr(O, s, F, _e));
        }),
        Ge(P, [O, _e]);
    },
    onEnterCancelled(O) {
      X(O, !1), Ge(D, [O]);
    },
    onAppearCancelled(O) {
      X(O, !0), Ge($, [O]);
    },
    onLeaveCancelled(O) {
      q(O), Ge(re, [O]);
    },
  });
}
function Hl(e) {
  if (e == null) return null;
  if (K(e)) return [$n(e.enter), $n(e.leave)];
  {
    const t = $n(e);
    return [t, t];
  }
}
function $n(e) {
  return xo(e);
}
function ke(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e._vtc || (e._vtc = new Set())).add(t);
}
function et(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.remove(s));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function sr(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Dl = 0;
function rr(e, t, n, s) {
  const r = (e._endId = ++Dl),
    o = () => {
      r === e._endId && s();
    };
  if (n) return setTimeout(o, n);
  const { type: i, timeout: l, propCount: u } = jl(e, t);
  if (!i) return s();
  const f = i + "end";
  let p = 0;
  const _ = () => {
      e.removeEventListener(f, h), o();
    },
    h = (w) => {
      w.target === e && ++p >= u && _();
    };
  setTimeout(() => {
    p < u && _();
  }, l + 1),
    e.addEventListener(f, h);
}
function jl(e, t) {
  const n = window.getComputedStyle(e),
    s = (T) => (n[T] || "").split(", "),
    r = s(`${je}Delay`),
    o = s(`${je}Duration`),
    i = or(r, o),
    l = s(`${At}Delay`),
    u = s(`${At}Duration`),
    f = or(l, u);
  let p = null,
    _ = 0,
    h = 0;
  t === je
    ? i > 0 && ((p = je), (_ = i), (h = o.length))
    : t === At
    ? f > 0 && ((p = At), (_ = f), (h = u.length))
    : ((_ = Math.max(i, f)),
      (p = _ > 0 ? (i > f ? je : At) : null),
      (h = p ? (p === je ? o.length : u.length) : 0));
  const w =
    p === je && /\b(transform|all)(,|$)/.test(s(`${je}Property`).toString());
  return { type: p, timeout: _, propCount: h, hasTransform: w };
}
function or(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, s) => ir(n) + ir(e[s])));
}
function ir(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function kl() {
  return document.body.offsetHeight;
}
const pn = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return M(t) ? (n) => tn(t, n) : t;
};
function Kl(e) {
  e.target.composing = !0;
}
function lr(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const cr = {
    created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
      e._assign = pn(r);
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
          (rt(e, "compositionstart", Kl),
          rt(e, "compositionend", lr),
          rt(e, "change", lr));
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
        ((e._assign = pn(o)),
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
  Vl = {
    deep: !0,
    created(e, { value: t, modifiers: { number: n } }, s) {
      const r = mn(t);
      rt(e, "change", () => {
        const o = Array.prototype.filter
          .call(e.options, (i) => i.selected)
          .map((i) => (n ? ln(hn(i)) : hn(i)));
        e._assign(e.multiple ? (r ? new Set(o) : o) : o[0]);
      }),
        (e._assign = pn(s));
    },
    mounted(e, { value: t }) {
      ur(e, t);
    },
    beforeUpdate(e, t, n) {
      e._assign = pn(n);
    },
    updated(e, { value: t }) {
      ur(e, t);
    },
  };
function ur(e, t) {
  const n = e.multiple;
  if (!(n && !M(t) && !mn(t))) {
    for (let s = 0, r = e.options.length; s < r; s++) {
      const o = e.options[s],
        i = hn(o);
      if (n) M(t) ? (o.selected = Lo(t, i) > -1) : (o.selected = t.has(i));
      else if (bn(hn(o), t)) {
        e.selectedIndex !== s && (e.selectedIndex = s);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function hn(e) {
  return "_value" in e ? e._value : e.value;
}
const zl = ["ctrl", "shift", "alt", "meta"],
  ql = {
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
    exact: (e, t) => zl.some((n) => e[`${n}Key`] && !t.includes(n)),
  },
  Wl =
    (e, t) =>
    (n, ...s) => {
      for (let r = 0; r < t.length; r++) {
        const o = ql[t[r]];
        if (o && o(n, t)) return;
      }
      return e(n, ...s);
    },
  Jl = se({ patchProp: $l }, Cl);
let ar;
function Yl() {
  return ar || (ar = tl(Jl));
}
const Zl = (...e) => {
  const t = Yl().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (s) => {
      const r = Xl(s);
      if (!r) return;
      const o = t._component;
      !N(o) && !o.render && !o.template && (o.template = r.innerHTML),
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
function Xl(e) {
  return te(e) ? document.querySelector(e) : e;
}
const Et = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t) n[s] = r;
  return n;
};
function ao(e) {
  return Be(() => `url(${e})`);
}
const fo = (e) => (_i("data-v-81f91691"), (e = e()), bi(), e),
  Ql = { key: 0, class: "label-container" },
  Gl = fo(() =>
    J("label", { for: "URL", class: "add-image-label" }, "Image URL", -1)
  ),
  ec = fo(() =>
    J("label", { for: "descr", class: "add-image-label" }, "Description", -1)
  ),
  tc = { key: 0, class: "warn-para" },
  nc = ["value"],
  sc = {
    __name: "AddImage",
    setup(e) {
      co((I) => ({ "64d93a12": ne(_) }));
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
      let r = ie(!1),
        o = ie(void 0),
        i = ie(!1),
        l = ie(void 0),
        u = ie(void 0),
        f = ie(void 0),
        p = ie(void 0),
        _ = ie(""),
        h = ie(null);
      async function w() {
        return new Promise((I, F) => {
          const R = new Image();
          (R.src = t.URL), (R.onload = () => I(!0)), (R.onerror = () => I(!1));
        });
      }
      Pt(t, (I) => {
        t.URL != "" &&
          w().then((F, R) => {
            F
              ? (console.log("VALID"),
                (p.value = !0),
                (l.value = null),
                t.description !== "" && t.description !== void 0
                  ? (o.value = "add-image-ready")
                  : (o.value = ""),
                (_.value = ao(t.URL).value))
              : ((p.value = !1),
                console.log("NOT VALID"),
                (l.value = "Invalid URL"),
                (o.value = ""),
                (_.value = ""));
          });
      });
      const T = async () => {
        r.value
          ? (r.value && t.description == "") || t.description == null
            ? p.value
              ? ((l.value = "Please enter a description"),
                (f.value = "add-image-url-error"))
              : (r.value = !r.value)
            : p.value
            ? ((t.id = `${Math.floor(Date.now() * Math.random())}`),
              s(t),
              (f.value = ""),
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
              (f.value = ""))
          : ((r.value = !r.value), await Vn(), h.value.focus());
      };
      return (I, F) =>
        ne(i)
          ? Ve("", !0)
          : (G(),
            he(
              "div",
              { key: 0, class: ye(["add-image", ne(o)]) },
              [
                J(
                  "form",
                  {
                    onSubmit: F[3] || (F[3] = Wl(() => {}, ["prevent"])),
                    class: "add-image-form",
                    novalidate: "",
                    autocomplete: "off",
                    spellcheck: "true",
                  },
                  [
                    J("button", {
                      onClick: T,
                      class: "add-image-btn",
                      title: "add image",
                    }),
                    Y(
                      It,
                      { name: "btn-fade" },
                      {
                        default: yt(() => [
                          ne(r)
                            ? (G(),
                              he("div", Ql, [
                                Gl,
                                nn(
                                  J(
                                    "input",
                                    {
                                      type: "url",
                                      name: "Image URL",
                                      id: "URL",
                                      class: ye(["add-image-url", ne(u)]),
                                      placeholder:
                                        "https://cdn.wa.H's_Envelope.jpg",
                                      "onUpdate:modelValue":
                                        F[0] || (F[0] = (R) => (t.URL = R)),
                                      ref_key: "input",
                                      ref: h,
                                      required: "true",
                                    },
                                    null,
                                    2
                                  ),
                                  [[cr, t.URL]]
                                ),
                                ec,
                                nn(
                                  J(
                                    "input",
                                    {
                                      type: "text",
                                      name: "Image description",
                                      id: "descr",
                                      class: ye(["add-image-url", ne(f)]),
                                      ref: "inputDescr",
                                      placeholder: "Hayley's envelope",
                                      "onUpdate:modelValue":
                                        F[1] ||
                                        (F[1] = (R) => (t.description = R)),
                                      required: "true",
                                    },
                                    null,
                                    2
                                  ),
                                  [[cr, t.description]]
                                ),
                                ne(l)
                                  ? (G(), he("p", tc, Un(ne(l)), 1))
                                  : Ve("", !0),
                                J("label", null, [
                                  ro(" Frame "),
                                  nn(
                                    J(
                                      "select",
                                      {
                                        "onUpdate:modelValue":
                                          F[2] || (F[2] = (R) => (t.frame = R)),
                                      },
                                      [
                                        (G(),
                                        he(
                                          pe,
                                          null,
                                          qr(n, (R) =>
                                            J(
                                              "option",
                                              { value: R, key: R },
                                              Un(R),
                                              9,
                                              nc
                                            )
                                          ),
                                          64
                                        )),
                                      ],
                                      512
                                    ),
                                    [[Vl, t.frame]]
                                  ),
                                ]),
                              ]))
                            : Ve("", !0),
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
  fr = Et(sc, [["__scopeId", "data-v-81f91691"]]),
  rc = {},
  oc = {
    width: "20",
    height: "20",
    viewBox: "0 0 84 84",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  },
  ic = J(
    "path",
    {
      d: "M64.2254 2.82843C65.7875 1.26633 68.3201 1.26633 69.8822 2.82843L80.4888 13.435C82.0509 14.9971 82.0509 17.5298 80.4888 19.0919L74.832 24.7487L58.5685 8.48528L64.2254 2.82843Z",
      fill: "var(--dark-color)",
    },
    null,
    -1
  ),
  lc = J(
    "path",
    {
      d: "M55.1543 16.8492L66.468 28.1629L21.9202 72.7106C18.7961 75.8348 13.7307 75.8348 10.6065 72.7106C7.48235 69.5864 7.48235 64.5211 10.6065 61.3969L55.1543 16.8492Z",
      stroke: "var(--dark-color)",
      "stroke-width": "7",
    },
    null,
    -1
  ),
  cc = [ic, lc];
function uc(e, t) {
  return G(), he("svg", oc, cc);
}
const ac = Et(rc, [["render", uc]]),
  fc = {},
  dc = {
    width: "20",
    height: "20",
    viewBox: "0 0 24 33",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  },
  pc = cl(
    '<rect x="3" y="4" width="18" height="27" rx="2" stroke="var(--dark-color)" stroke-width="3"></rect><rect y="2" width="24" height="2" rx="1" fill="var(--dark-color)"></rect><rect x="8" y="28" width="20" height="2" rx="1" transform="rotate(-90 8 28)" fill="var(--dark-color)"></rect><rect x="7" y="1" width="10" height="1" rx="0.5" fill="var(--dark-color)"></rect><rect x="11" width="2" height="2" rx="1" fill="var(--dark-color)"></rect><rect x="14" y="28" width="20" height="2" rx="1" transform="rotate(-90 14 28)" fill="var(--dark-color)"></rect>',
    6
  ),
  hc = [pc];
function gc(e, t) {
  return G(), he("svg", dc, hc);
}
const mc = Et(fc, [["render", gc]]),
  _c = {
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
          It,
          { name: "btn-fade" },
          {
            default: yt(() => [
              J(
                "div",
                {
                  class: ye([
                    "btn-container",
                    { "btn-container-active": e.modelValue },
                  ]),
                },
                [
                  J(
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
                    [Y(ac)],
                    544
                  ),
                  J(
                    "button",
                    {
                      class: "delete-btn img-btn",
                      onClick: i[1] || (i[1] = (l) => ne(r)(e.image)),
                      onFocus: n,
                      onBlur: s,
                      title: "delete image",
                    },
                    [Y(mc)],
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
const bc = ["src", "alt"],
  dr = {
    __name: "FramedImage",
    props: { image: Object },
    setup(e) {
      const t = e;
      co((T) => ({ "5d44f67f": ne(s), acfdd748: p.value }));
      let n = ie(null);
      const s = ao(t.image.URL).value;
      let r = ie("");
      const o = (T) => {
          switch (T) {
            case "Shadow":
              r.value = "frame-shadow";
              break;
            case "Polaroid":
              r.value = "frame-polaroid";
              break;
            case "Photo Corner":
              r.value = "frame-none";
              break;
            case "Image":
              r.value = "frame-image";
              break;
            case "None":
              r.value = "frame-none";
              break;
          }
        },
        i = Be(() => (o(t.image.frame), r.value)),
        l = Be(() => (t.image.frame == "Photo Corner" ? "frame-corner" : "")),
        u = Be(() =>
          t.image.frame == "Polaroid" ? "frame-polaroid-caption" : ""
        ),
        f = Be(() => (t.image.frame == "Blur" ? "blur" : "")),
        p = Be(() => (n.value ? `${n.value.offsetWidth}px` : "2px"));
      let _ = ie(!1);
      const h = () => (_.value = !0),
        w = () => (_.value = !1);
      return (T, I) => (
        G(),
        ct(
          It,
          { name: "fade", appear: "" },
          {
            default: yt(() => [
              J(
                "div",
                { class: "image-wrapper", onMouseover: h, onMouseleave: w },
                [
                  Y(
                    _c,
                    {
                      modelValue: ne(_),
                      "onUpdate:modelValue":
                        I[0] ||
                        (I[0] = (F) => (ce(_) ? (_.value = F) : (_ = F))),
                      image: e.image,
                    },
                    null,
                    8,
                    ["modelValue", "image"]
                  ),
                  J("figure", null, [
                    J(
                      "div",
                      {
                        class: ye([
                          "select-image-container",
                          [l.value, f.value],
                        ]),
                      },
                      [
                        J(
                          "img",
                          {
                            class: ye(["main-image", [i.value, f.value]]),
                            src: e.image.URL,
                            alt: e.image.description,
                            ref_key: "imageRef",
                            ref: n,
                            loading: "lazy",
                          },
                          null,
                          10,
                          bc
                        ),
                        ji(T.$slots, "default"),
                      ],
                      2
                    ),
                    J(
                      "figcaption",
                      { class: ye(["fade-text", u.value]) },
                      [
                        T.editing
                          ? Ve("", !0)
                          : (G(),
                            he(
                              "span",
                              {
                                key: 0,
                                onDblclick:
                                  I[1] ||
                                  (I[1] = (...F) =>
                                    T.editImage && T.editImage(...F)),
                              },
                              Un(e.image.description),
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
const yc = {
    __name: "LayoutToggle",
    setup(e) {
      let t = localStorage.layout
          ? ie(JSON.parse(localStorage.layout))
          : ie("vertical"),
        n = ie("layout-button");
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
        zt(() => s(t.value)),
        (o, i) => (
          G(),
          he(
            "button",
            {
              onClick: r,
              title: "change layout",
              class: ye(["toggle-switch", ne(n)]),
            },
            null,
            2
          )
        )
      );
    },
  },
  vc = Et(yc, [["__scopeId", "data-v-2ae23086"]]),
  xc = {
    __name: "SetMainImageButton",
    props: { image: Object },
    setup(e) {
      const t = lt("setAsMainImage");
      let n = ie(""),
        s = {},
        r = ie(null);
      const o = () => (n.value = "btn-container-active"),
        i = () => (n.value = "");
      return (
        zt(() => {
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
              class: ye(["select-image", ne(n)]),
              ref_key: "buttonContainer",
              ref: r,
            },
            [
              J(
                "button",
                {
                  class: "add-image-btn select-image-btn",
                  title: "select as main image",
                  onClick: u[0] || (u[0] = (f) => ne(t)(e.image)),
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
  wc = {},
  Cc = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
  },
  Ic = J(
    "path",
    {
      fill: "var(--secondary)",
      d: "M24 13.616v-3.232c-1.651-.587-2.694-.752-3.219-2.019v-.001c-.527-1.271.1-2.134.847-3.707l-2.285-2.285c-1.561.742-2.433 1.375-3.707.847h-.001c-1.269-.526-1.435-1.576-2.019-3.219h-3.232c-.582 1.635-.749 2.692-2.019 3.219h-.001c-1.271.528-2.132-.098-3.707-.847l-2.285 2.285c.745 1.568 1.375 2.434.847 3.707-.527 1.271-1.584 1.438-3.219 2.02v3.232c1.632.58 2.692.749 3.219 2.019.53 1.282-.114 2.166-.847 3.707l2.285 2.286c1.562-.743 2.434-1.375 3.707-.847h.001c1.27.526 1.436 1.579 2.019 3.219h3.232c.582-1.636.75-2.69 2.027-3.222h.001c1.262-.524 2.12.101 3.698.851l2.285-2.286c-.744-1.563-1.375-2.433-.848-3.706.527-1.271 1.588-1.44 3.221-2.021zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z",
    },
    null,
    -1
  ),
  Ec = [Ic];
function Tc(e, t) {
  return G(), he("svg", Cc, Ec);
}
const Oc = Et(wc, [["render", Tc]]);
const Ac = {
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
          he("button", { tile: "open options page", onClick: t }, [Y(Oc)])),
          [[n]]
        );
    },
  },
  Lc = Et(Ac, [["__scopeId", "data-v-6cc85b85"]]),
  Mc = { key: 0 },
  Pc = { key: 0, class: "gallery-wrapper" },
  Fc = { class: "image-gallery mask" },
  Sc = {
    __name: "App",
    setup(e) {
      let t = ie(!1),
        n = Vt([]);
      (async () => {
        let h = await browser.storage.local.get("images");
        h &&
          h.images &&
          (h.images.forEach((w) => {
            n.push(w);
          }),
          (t.value = !0)),
          console.log("storedImages"),
          console.log(h),
          console.log("images"),
          console.log(n),
          console.log("images.images"),
          console.log(n),
          console.log("images.length"),
          console.log(n.length);
      })(),
        sn("addImage", (h) => {
          n.length < 1 ? (h.isMainImage = !0) : (h.isMainImage = !1),
            n.push({ ...h }),
            console.log("WHy is nothing working?"),
            console.log(n);
        });
      const o = (h) => {
        let w = n.find((I) => I.isMainImage === !0);
        w && (w.isMainImage = !1);
        let T = n.find((I) => I.id === h.id);
        T.isMainImage = !0;
      };
      sn("setAsMainImage", o),
        sn("deleteImage", (h) => {
          const w = n.findIndex((T) => T.id === h.id);
          n[w].isMainImage &&
            (n[w - 1] ? o(n[w - 1]) : n[w + 1] && o(n[w + 1])),
            n.splice(w, 1);
        });
      const l = () => n.length >= 1;
      l();
      let u = l() ? "has-image" : "";
      Pt(
        n,
        (h) => {
          if (t.value) {
            let w = H(h);
            browser.storage.local.set({ images: w });
          }
          l(), (u = l() ? "has-image" : "");
        },
        { deep: !0, immediate: !0 }
      );
      const f = Be(() => n.find((h) => h.isMainImage === !0)),
        p = Be(() => n.slice().reverse());
      async function _() {
        let h = document.querySelector("body"),
          w = document.querySelector(":root"),
          T = await browser.storage.local.get("theme");
        if ((console.log(T.theme), T.theme === "custom-theme")) {
          let D = await browser.storage.local.get("customBgColor"),
            P = await browser.storage.local.get("customAccentColor");
          w.style.setProperty("--custom-theme-bg-color", D.customBgColor),
            w.style.setProperty(
              "--custom-theme-accent-color",
              P.customAccentColor
            ),
            console.log(`BG COLOR IS: ${D.customBgColor}`);
        }
        h.classList.add(T.theme);
        let I = browser.storage.local.get("currentFont"),
          F;
        if (
          (await I.then((D) => {
            D.currentFont ? (F = !0) : (F = !1);
          }),
          F !== !1)
        ) {
          let D = document.querySelector("main"),
            P = await browser.storage.local.get("currentFont");
          D.classList.add(P.currentFont);
        }
        let R = await browser.storage.local.get("popupSize");
        const j = (D) => {
          w.style.setProperty("font-size", D);
        };
        if (R.popupSize)
          switch (R.popupSize) {
            case "small":
              j("0.8rem");
              break;
            case "default":
              j("1rem");
              break;
            case "large":
              j("1.2rem");
              break;
            case "extra large":
              j("1.5rem");
              break;
            default:
              j("1rem");
              break;
          }
      }
      return (
        _(),
        (h, w) => (
          G(),
          he("main", null, [
            J(
              "div",
              { class: ye(["image-container", ne(u)]) },
              [
                ne(n).length < 1 ? (G(), ct(fr, { key: 0 })) : Ve("", !0),
                f.value
                  ? (G(),
                    ct(dr, { image: f.value, key: f.value.id }, null, 8, [
                      "image",
                    ]))
                  : Ve("", !0),
              ],
              2
            ),
            ne(n).length > 0 ? (G(), he("hr", Mc)) : Ve("", !0),
            Y(
              It,
              { name: "section-fade" },
              {
                default: yt(() => [
                  ne(n).length >= 1
                    ? (G(),
                      he("div", Pc, [
                        Y(vc),
                        J("section", Fc, [
                          Y(fr),
                          (G(!0),
                          he(
                            pe,
                            null,
                            qr(
                              p.value,
                              (T) => (
                                G(),
                                ct(
                                  dr,
                                  { key: T.id, image: T },
                                  {
                                    default: yt(() => [
                                      Y(xc, { image: T }, null, 8, ["image"]),
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
                    : Ve("", !0),
                ]),
                _: 1,
              }
            ),
            Y(Lc),
          ])
        )
      );
    },
  };
Zl(Sc).mount("#app");
