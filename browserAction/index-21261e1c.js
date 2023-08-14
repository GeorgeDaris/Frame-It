(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
  new MutationObserver((r) => {
    for (const i of r)
      if (i.type === "childList")
        for (const o of i.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && s(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(r) {
    const i = {};
    return (
      r.integrity && (i.integrity = r.integrity),
      r.referrerPolicy && (i.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : r.crossOrigin === "anonymous"
        ? (i.credentials = "omit")
        : (i.credentials = "same-origin"),
      i
    );
  }
  function s(r) {
    if (r.ep) return;
    r.ep = !0;
    const i = n(r);
    fetch(r.href, i);
  }
})();
function kn(e, t) {
  const n = Object.create(null),
    s = e.split(",");
  for (let r = 0; r < s.length; r++) n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
const W = {},
  ut = [],
  we = () => {},
  ni = () => !1,
  si = /^on[^a-z]/,
  sn = (e) => si.test(e),
  qn = (e) => e.startsWith("onUpdate:"),
  ee = Object.assign,
  Vn = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  ri = Object.prototype.hasOwnProperty,
  $ = (e, t) => ri.call(e, t),
  M = Array.isArray,
  at = (e) => rn(e) === "[object Map]",
  nr = (e) => rn(e) === "[object Set]",
  S = (e) => typeof e == "function",
  Q = (e) => typeof e == "string",
  Jn = (e) => typeof e == "symbol",
  z = (e) => e !== null && typeof e == "object",
  sr = (e) => z(e) && S(e.then) && S(e.catch),
  rr = Object.prototype.toString,
  rn = (e) => rr.call(e),
  ii = (e) => rn(e).slice(8, -1),
  ir = (e) => rn(e) === "[object Object]",
  Yn = (e) => Q(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Jt = kn(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  on = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  oi = /-(\w)/g,
  mt = on((e) => e.replace(oi, (t, n) => (n ? n.toUpperCase() : ""))),
  li = /\B([A-Z])/g,
  yt = on((e) => e.replace(li, "-$1").toLowerCase()),
  or = on((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  vn = on((e) => (e ? `on${or(e)}` : "")),
  Ft = (e, t) => !Object.is(e, t),
  Yt = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  Zt = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  An = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  ci = (e) => {
    const t = Q(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let gs;
const On = () =>
  gs ||
  (gs =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
function Xn(e) {
  if (M(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        r = Q(s) ? di(s) : Xn(s);
      if (r) for (const i in r) t[i] = r[i];
    }
    return t;
  } else {
    if (Q(e)) return e;
    if (z(e)) return e;
  }
}
const fi = /;(?![^(]*\))/g,
  ui = /:([^]+)/,
  ai = /\/\*[^]*?\*\//g;
function di(e) {
  const t = {};
  return (
    e
      .replace(ai, "")
      .split(fi)
      .forEach((n) => {
        if (n) {
          const s = n.split(ui);
          s.length > 1 && (t[s[0].trim()] = s[1].trim());
        }
      }),
    t
  );
}
function Re(e) {
  let t = "";
  if (Q(e)) t = e;
  else if (M(e))
    for (let n = 0; n < e.length; n++) {
      const s = Re(e[n]);
      s && (t += s + " ");
    }
  else if (z(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const pi =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  hi = kn(pi);
function lr(e) {
  return !!e || e === "";
}
const cr = (e) =>
    Q(e)
      ? e
      : e == null
      ? ""
      : M(e) || (z(e) && (e.toString === rr || !S(e.toString)))
      ? JSON.stringify(e, fr, 2)
      : String(e),
  fr = (e, t) =>
    t && t.__v_isRef
      ? fr(e, t.value)
      : at(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [s, r]) => ((n[`${s} =>`] = r), n),
            {}
          ),
        }
      : nr(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : z(t) && !M(t) && !ir(t)
      ? String(t)
      : t;
let Ce;
class gi {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Ce),
      !t && Ce && (this.index = (Ce.scopes || (Ce.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = Ce;
      try {
        return (Ce = this), t();
      } finally {
        Ce = n;
      }
    }
  }
  on() {
    Ce = this;
  }
  off() {
    Ce = this.parent;
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
function mi(e, t = Ce) {
  t && t.active && t.effects.push(e);
}
function _i() {
  return Ce;
}
const Zn = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  ur = (e) => (e.w & ke) > 0,
  ar = (e) => (e.n & ke) > 0,
  bi = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= ke;
  },
  vi = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let s = 0; s < t.length; s++) {
        const r = t[s];
        ur(r) && !ar(r) ? r.delete(e) : (t[n++] = r),
          (r.w &= ~ke),
          (r.n &= ~ke);
      }
      t.length = n;
    }
  },
  Mn = new WeakMap();
let Tt = 0,
  ke = 1;
const Ln = 30;
let Ee;
const st = Symbol(""),
  Pn = Symbol("");
class Qn {
  constructor(t, n = null, s) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      mi(this, s);
  }
  run() {
    if (!this.active) return this.fn();
    let t = Ee,
      n = We;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = Ee),
        (Ee = this),
        (We = !0),
        (ke = 1 << ++Tt),
        Tt <= Ln ? bi(this) : ms(this),
        this.fn()
      );
    } finally {
      Tt <= Ln && vi(this),
        (ke = 1 << --Tt),
        (Ee = this.parent),
        (We = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    Ee === this
      ? (this.deferStop = !0)
      : this.active &&
        (ms(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function ms(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let We = !0;
const dr = [];
function xt() {
  dr.push(We), (We = !1);
}
function Ct() {
  const e = dr.pop();
  We = e === void 0 ? !0 : e;
}
function pe(e, t, n) {
  if (We && Ee) {
    let s = Mn.get(e);
    s || Mn.set(e, (s = new Map()));
    let r = s.get(n);
    r || s.set(n, (r = Zn())), pr(r);
  }
}
function pr(e, t) {
  let n = !1;
  Tt <= Ln ? ar(e) || ((e.n |= ke), (n = !ur(e))) : (n = !e.has(Ee)),
    n && (e.add(Ee), Ee.deps.push(e));
}
function Ue(e, t, n, s, r, i) {
  const o = Mn.get(e);
  if (!o) return;
  let l = [];
  if (t === "clear") l = [...o.values()];
  else if (n === "length" && M(e)) {
    const f = Number(s);
    o.forEach((a, p) => {
      (p === "length" || p >= f) && l.push(a);
    });
  } else
    switch ((n !== void 0 && l.push(o.get(n)), t)) {
      case "add":
        M(e)
          ? Yn(n) && l.push(o.get("length"))
          : (l.push(o.get(st)), at(e) && l.push(o.get(Pn)));
        break;
      case "delete":
        M(e) || (l.push(o.get(st)), at(e) && l.push(o.get(Pn)));
        break;
      case "set":
        at(e) && l.push(o.get(st));
        break;
    }
  if (l.length === 1) l[0] && Fn(l[0]);
  else {
    const f = [];
    for (const a of l) a && f.push(...a);
    Fn(Zn(f));
  }
}
function Fn(e, t) {
  const n = M(e) ? e : [...e];
  for (const s of n) s.computed && _s(s);
  for (const s of n) s.computed || _s(s);
}
function _s(e, t) {
  (e !== Ee || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const yi = kn("__proto__,__v_isRef,__isVue"),
  hr = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Jn)
  ),
  xi = Gn(),
  Ci = Gn(!1, !0),
  Ei = Gn(!0),
  bs = Ii();
function Ii() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const s = U(this);
        for (let i = 0, o = this.length; i < o; i++) pe(s, "get", i + "");
        const r = s[t](...n);
        return r === -1 || r === !1 ? s[t](...n.map(U)) : r;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        xt();
        const s = U(this)[t].apply(this, n);
        return Ct(), s;
      };
    }),
    e
  );
}
function wi(e) {
  const t = U(this);
  return pe(t, "has", e), t.hasOwnProperty(e);
}
function Gn(e = !1, t = !1) {
  return function (s, r, i) {
    if (r === "__v_isReactive") return !e;
    if (r === "__v_isReadonly") return e;
    if (r === "__v_isShallow") return t;
    if (r === "__v_raw" && i === (e ? (t ? ji : vr) : t ? br : _r).get(s))
      return s;
    const o = M(s);
    if (!e) {
      if (o && $(bs, r)) return Reflect.get(bs, r, i);
      if (r === "hasOwnProperty") return wi;
    }
    const l = Reflect.get(s, r, i);
    return (Jn(r) ? hr.has(r) : yi(r)) || (e || pe(s, "get", r), t)
      ? l
      : oe(l)
      ? o && Yn(r)
        ? l
        : l.value
      : z(l)
      ? e
        ? yr(l)
        : _t(l)
      : l;
  };
}
const Ti = gr(),
  Ai = gr(!0);
function gr(e = !1) {
  return function (n, s, r, i) {
    let o = n[s];
    if (bt(o) && oe(o) && !oe(r)) return !1;
    if (
      !e &&
      (!Qt(r) && !bt(r) && ((o = U(o)), (r = U(r))), !M(n) && oe(o) && !oe(r))
    )
      return (o.value = r), !0;
    const l = M(n) && Yn(s) ? Number(s) < n.length : $(n, s),
      f = Reflect.set(n, s, r, i);
    return (
      n === U(i) && (l ? Ft(r, o) && Ue(n, "set", s, r) : Ue(n, "add", s, r)), f
    );
  };
}
function Oi(e, t) {
  const n = $(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && Ue(e, "delete", t, void 0), s;
}
function Mi(e, t) {
  const n = Reflect.has(e, t);
  return (!Jn(t) || !hr.has(t)) && pe(e, "has", t), n;
}
function Li(e) {
  return pe(e, "iterate", M(e) ? "length" : st), Reflect.ownKeys(e);
}
const mr = { get: xi, set: Ti, deleteProperty: Oi, has: Mi, ownKeys: Li },
  Pi = {
    get: Ei,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  Fi = ee({}, mr, { get: Ci, set: Ai }),
  es = (e) => e,
  ln = (e) => Reflect.getPrototypeOf(e);
function Kt(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = U(e),
    i = U(t);
  n || (t !== i && pe(r, "get", t), pe(r, "get", i));
  const { has: o } = ln(r),
    l = s ? es : n ? ss : St;
  if (o.call(r, t)) return l(e.get(t));
  if (o.call(r, i)) return l(e.get(i));
  e !== r && e.get(t);
}
function Wt(e, t = !1) {
  const n = this.__v_raw,
    s = U(n),
    r = U(e);
  return (
    t || (e !== r && pe(s, "has", e), pe(s, "has", r)),
    e === r ? n.has(e) : n.has(e) || n.has(r)
  );
}
function zt(e, t = !1) {
  return (
    (e = e.__v_raw), !t && pe(U(e), "iterate", st), Reflect.get(e, "size", e)
  );
}
function vs(e) {
  e = U(e);
  const t = U(this);
  return ln(t).has.call(t, e) || (t.add(e), Ue(t, "add", e, e)), this;
}
function ys(e, t) {
  t = U(t);
  const n = U(this),
    { has: s, get: r } = ln(n);
  let i = s.call(n, e);
  i || ((e = U(e)), (i = s.call(n, e)));
  const o = r.call(n, e);
  return (
    n.set(e, t), i ? Ft(t, o) && Ue(n, "set", e, t) : Ue(n, "add", e, t), this
  );
}
function xs(e) {
  const t = U(this),
    { has: n, get: s } = ln(t);
  let r = n.call(t, e);
  r || ((e = U(e)), (r = n.call(t, e))), s && s.call(t, e);
  const i = t.delete(e);
  return r && Ue(t, "delete", e, void 0), i;
}
function Cs() {
  const e = U(this),
    t = e.size !== 0,
    n = e.clear();
  return t && Ue(e, "clear", void 0, void 0), n;
}
function kt(e, t) {
  return function (s, r) {
    const i = this,
      o = i.__v_raw,
      l = U(o),
      f = t ? es : e ? ss : St;
    return (
      !e && pe(l, "iterate", st), o.forEach((a, p) => s.call(r, f(a), f(p), i))
    );
  };
}
function qt(e, t, n) {
  return function (...s) {
    const r = this.__v_raw,
      i = U(r),
      o = at(i),
      l = e === "entries" || (e === Symbol.iterator && o),
      f = e === "keys" && o,
      a = r[e](...s),
      p = n ? es : t ? ss : St;
    return (
      !t && pe(i, "iterate", f ? Pn : st),
      {
        next() {
          const { value: _, done: v } = a.next();
          return v
            ? { value: _, done: v }
            : { value: l ? [p(_[0]), p(_[1])] : p(_), done: v };
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
function Si() {
  const e = {
      get(i) {
        return Kt(this, i);
      },
      get size() {
        return zt(this);
      },
      has: Wt,
      add: vs,
      set: ys,
      delete: xs,
      clear: Cs,
      forEach: kt(!1, !1),
    },
    t = {
      get(i) {
        return Kt(this, i, !1, !0);
      },
      get size() {
        return zt(this);
      },
      has: Wt,
      add: vs,
      set: ys,
      delete: xs,
      clear: Cs,
      forEach: kt(!1, !0),
    },
    n = {
      get(i) {
        return Kt(this, i, !0);
      },
      get size() {
        return zt(this, !0);
      },
      has(i) {
        return Wt.call(this, i, !0);
      },
      add: He("add"),
      set: He("set"),
      delete: He("delete"),
      clear: He("clear"),
      forEach: kt(!0, !1),
    },
    s = {
      get(i) {
        return Kt(this, i, !0, !0);
      },
      get size() {
        return zt(this, !0);
      },
      has(i) {
        return Wt.call(this, i, !0);
      },
      add: He("add"),
      set: He("set"),
      delete: He("delete"),
      clear: He("clear"),
      forEach: kt(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
      (e[i] = qt(i, !1, !1)),
        (n[i] = qt(i, !0, !1)),
        (t[i] = qt(i, !1, !0)),
        (s[i] = qt(i, !0, !0));
    }),
    [e, n, t, s]
  );
}
const [Ni, Ri, $i, Ui] = Si();
function ts(e, t) {
  const n = t ? (e ? Ui : $i) : e ? Ri : Ni;
  return (s, r, i) =>
    r === "__v_isReactive"
      ? !e
      : r === "__v_isReadonly"
      ? e
      : r === "__v_raw"
      ? s
      : Reflect.get($(n, r) && r in s ? n : s, r, i);
}
const Di = { get: ts(!1, !1) },
  Hi = { get: ts(!1, !0) },
  Bi = { get: ts(!0, !1) },
  _r = new WeakMap(),
  br = new WeakMap(),
  vr = new WeakMap(),
  ji = new WeakMap();
function Ki(e) {
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
function Wi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ki(ii(e));
}
function _t(e) {
  return bt(e) ? e : ns(e, !1, mr, Di, _r);
}
function zi(e) {
  return ns(e, !1, Fi, Hi, br);
}
function yr(e) {
  return ns(e, !0, Pi, Bi, vr);
}
function ns(e, t, n, s, r) {
  if (!z(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const i = r.get(e);
  if (i) return i;
  const o = Wi(e);
  if (o === 0) return e;
  const l = new Proxy(e, o === 2 ? s : n);
  return r.set(e, l), l;
}
function dt(e) {
  return bt(e) ? dt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function bt(e) {
  return !!(e && e.__v_isReadonly);
}
function Qt(e) {
  return !!(e && e.__v_isShallow);
}
function xr(e) {
  return dt(e) || bt(e);
}
function U(e) {
  const t = e && e.__v_raw;
  return t ? U(t) : e;
}
function Cr(e) {
  return Zt(e, "__v_skip", !0), e;
}
const St = (e) => (z(e) ? _t(e) : e),
  ss = (e) => (z(e) ? yr(e) : e);
function Er(e) {
  We && Ee && ((e = U(e)), pr(e.dep || (e.dep = Zn())));
}
function Ir(e, t) {
  e = U(e);
  const n = e.dep;
  n && Fn(n);
}
function oe(e) {
  return !!(e && e.__v_isRef === !0);
}
function me(e) {
  return ki(e, !1);
}
function ki(e, t) {
  return oe(e) ? e : new qi(e, t);
}
class qi {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : U(t)),
      (this._value = n ? t : St(t));
  }
  get value() {
    return Er(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Qt(t) || bt(t);
    (t = n ? t : U(t)),
      Ft(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : St(t)), Ir(this));
  }
}
function de(e) {
  return oe(e) ? e.value : e;
}
const Vi = {
  get: (e, t, n) => de(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return oe(r) && !oe(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
  },
};
function wr(e) {
  return dt(e) ? e : new Proxy(e, Vi);
}
class Ji {
  constructor(t, n, s, r) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new Qn(t, () => {
        this._dirty || ((this._dirty = !0), Ir(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !r),
      (this.__v_isReadonly = s);
  }
  get value() {
    const t = U(this);
    return (
      Er(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function Yi(e, t, n = !1) {
  let s, r;
  const i = S(e);
  return (
    i ? ((s = e), (r = we)) : ((s = e.get), (r = e.set)),
    new Ji(s, r, i || !r, n)
  );
}
function ze(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (i) {
    cn(i, t, n);
  }
  return r;
}
function ve(e, t, n, s) {
  if (S(e)) {
    const i = ze(e, t, n, s);
    return (
      i &&
        sr(i) &&
        i.catch((o) => {
          cn(o, t, n);
        }),
      i
    );
  }
  const r = [];
  for (let i = 0; i < e.length; i++) r.push(ve(e[i], t, n, s));
  return r;
}
function cn(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const o = t.proxy,
      l = n;
    for (; i; ) {
      const a = i.ec;
      if (a) {
        for (let p = 0; p < a.length; p++) if (a[p](e, o, l) === !1) return;
      }
      i = i.parent;
    }
    const f = t.appContext.config.errorHandler;
    if (f) {
      ze(f, null, 10, [e, o, l]);
      return;
    }
  }
  Xi(e, n, r, s);
}
function Xi(e, t, n, s = !0) {
  console.error(e);
}
let Nt = !1,
  Sn = !1;
const ie = [];
let Fe = 0;
const pt = [];
let Ne = null,
  Ge = 0;
const Tr = Promise.resolve();
let rs = null;
function Nn(e) {
  const t = rs || Tr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Zi(e) {
  let t = Fe + 1,
    n = ie.length;
  for (; t < n; ) {
    const s = (t + n) >>> 1;
    Rt(ie[s]) < e ? (t = s + 1) : (n = s);
  }
  return t;
}
function is(e) {
  (!ie.length || !ie.includes(e, Nt && e.allowRecurse ? Fe + 1 : Fe)) &&
    (e.id == null ? ie.push(e) : ie.splice(Zi(e.id), 0, e), Ar());
}
function Ar() {
  !Nt && !Sn && ((Sn = !0), (rs = Tr.then(Mr)));
}
function Qi(e) {
  const t = ie.indexOf(e);
  t > Fe && ie.splice(t, 1);
}
function Gi(e) {
  M(e)
    ? pt.push(...e)
    : (!Ne || !Ne.includes(e, e.allowRecurse ? Ge + 1 : Ge)) && pt.push(e),
    Ar();
}
function Es(e, t = Nt ? Fe + 1 : 0) {
  for (; t < ie.length; t++) {
    const n = ie[t];
    n && n.pre && (ie.splice(t, 1), t--, n());
  }
}
function Or(e) {
  if (pt.length) {
    const t = [...new Set(pt)];
    if (((pt.length = 0), Ne)) {
      Ne.push(...t);
      return;
    }
    for (Ne = t, Ne.sort((n, s) => Rt(n) - Rt(s)), Ge = 0; Ge < Ne.length; Ge++)
      Ne[Ge]();
    (Ne = null), (Ge = 0);
  }
}
const Rt = (e) => (e.id == null ? 1 / 0 : e.id),
  eo = (e, t) => {
    const n = Rt(e) - Rt(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function Mr(e) {
  (Sn = !1), (Nt = !0), ie.sort(eo);
  const t = we;
  try {
    for (Fe = 0; Fe < ie.length; Fe++) {
      const n = ie[Fe];
      n && n.active !== !1 && ze(n, null, 14);
    }
  } finally {
    (Fe = 0),
      (ie.length = 0),
      Or(),
      (Nt = !1),
      (rs = null),
      (ie.length || pt.length) && Mr();
  }
}
function to(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || W;
  let r = n;
  const i = t.startsWith("update:"),
    o = i && t.slice(7);
  if (o && o in s) {
    const p = `${o === "modelValue" ? "model" : o}Modifiers`,
      { number: _, trim: v } = s[p] || W;
    v && (r = n.map((w) => (Q(w) ? w.trim() : w))), _ && (r = n.map(An));
  }
  let l,
    f = s[(l = vn(t))] || s[(l = vn(mt(t)))];
  !f && i && (f = s[(l = vn(yt(t)))]), f && ve(f, e, 6, r);
  const a = s[l + "Once"];
  if (a) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), ve(a, e, 6, r);
  }
}
function Lr(e, t, n = !1) {
  const s = t.emitsCache,
    r = s.get(e);
  if (r !== void 0) return r;
  const i = e.emits;
  let o = {},
    l = !1;
  if (!S(e)) {
    const f = (a) => {
      const p = Lr(a, t, !0);
      p && ((l = !0), ee(o, p));
    };
    !n && t.mixins.length && t.mixins.forEach(f),
      e.extends && f(e.extends),
      e.mixins && e.mixins.forEach(f);
  }
  return !i && !l
    ? (z(e) && s.set(e, null), null)
    : (M(i) ? i.forEach((f) => (o[f] = null)) : ee(o, i),
      z(e) && s.set(e, o),
      o);
}
function fn(e, t) {
  return !e || !sn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      $(e, t[0].toLowerCase() + t.slice(1)) || $(e, yt(t)) || $(e, t));
}
let le = null,
  un = null;
function Gt(e) {
  const t = le;
  return (le = e), (un = (e && e.type.__scopeId) || null), t;
}
function no(e) {
  un = e;
}
function so() {
  un = null;
}
function $t(e, t = le, n) {
  if (!t || e._n) return e;
  const s = (...r) => {
    s._d && Rs(-1);
    const i = Gt(t);
    let o;
    try {
      o = e(...r);
    } finally {
      Gt(i), s._d && Rs(1);
    }
    return o;
  };
  return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function yn(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    props: i,
    propsOptions: [o],
    slots: l,
    attrs: f,
    emit: a,
    render: p,
    renderCache: _,
    data: v,
    setupState: w,
    ctx: F,
    inheritAttrs: I,
  } = e;
  let j, k;
  const q = Gt(e);
  try {
    if (n.shapeFlag & 4) {
      const L = r || s;
      (j = Pe(p.call(L, L, _, i, w, v, F))), (k = f);
    } else {
      const L = t;
      (j = Pe(
        L.length > 1 ? L(i, { attrs: f, slots: l, emit: a }) : L(i, null)
      )),
        (k = t.props ? f : ro(f));
    }
  } catch (L) {
    (Pt.length = 0), cn(L, e, 1), (j = G(ye));
  }
  let V = j;
  if (k && I !== !1) {
    const L = Object.keys(k),
      { shapeFlag: te } = V;
    L.length && te & 7 && (o && L.some(qn) && (k = io(k, o)), (V = qe(V, k)));
  }
  return (
    n.dirs && ((V = qe(V)), (V.dirs = V.dirs ? V.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (V.transition = n.transition),
    (j = V),
    Gt(q),
    j
  );
}
const ro = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || sn(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  io = (e, t) => {
    const n = {};
    for (const s in e) (!qn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
    return n;
  };
function oo(e, t, n) {
  const { props: s, children: r, component: i } = e,
    { props: o, children: l, patchFlag: f } = t,
    a = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && f >= 0) {
    if (f & 1024) return !0;
    if (f & 16) return s ? Is(s, o, a) : !!o;
    if (f & 8) {
      const p = t.dynamicProps;
      for (let _ = 0; _ < p.length; _++) {
        const v = p[_];
        if (o[v] !== s[v] && !fn(a, v)) return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable)
      ? !0
      : s === o
      ? !1
      : s
      ? o
        ? Is(s, o, a)
        : !0
      : !!o;
  return !1;
}
function Is(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < s.length; r++) {
    const i = s[r];
    if (t[i] !== e[i] && !fn(n, i)) return !0;
  }
  return !1;
}
function lo({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const co = (e) => e.__isSuspense;
function fo(e, t) {
  t && t.pendingBranch
    ? M(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Gi(e);
}
const Vt = {};
function Ot(e, t, n) {
  return Pr(e, t, n);
}
function Pr(
  e,
  t,
  { immediate: n, deep: s, flush: r, onTrack: i, onTrigger: o } = W
) {
  var l;
  const f = _i() === ((l = se) == null ? void 0 : l.scope) ? se : null;
  let a,
    p = !1,
    _ = !1;
  if (
    (oe(e)
      ? ((a = () => e.value), (p = Qt(e)))
      : dt(e)
      ? ((a = () => e), (s = !0))
      : M(e)
      ? ((_ = !0),
        (p = e.some((L) => dt(L) || Qt(L))),
        (a = () =>
          e.map((L) => {
            if (oe(L)) return L.value;
            if (dt(L)) return nt(L);
            if (S(L)) return ze(L, f, 2);
          })))
      : S(e)
      ? t
        ? (a = () => ze(e, f, 2))
        : (a = () => {
            if (!(f && f.isUnmounted)) return v && v(), ve(e, f, 3, [w]);
          })
      : (a = we),
    t && s)
  ) {
    const L = a;
    a = () => nt(L());
  }
  let v,
    w = (L) => {
      v = q.onStop = () => {
        ze(L, f, 4);
      };
    },
    F;
  if (Dt)
    if (
      ((w = we),
      t ? n && ve(t, f, 3, [a(), _ ? [] : void 0, w]) : a(),
      r === "sync")
    ) {
      const L = ll();
      F = L.__watcherHandles || (L.__watcherHandles = []);
    } else return we;
  let I = _ ? new Array(e.length).fill(Vt) : Vt;
  const j = () => {
    if (q.active)
      if (t) {
        const L = q.run();
        (s || p || (_ ? L.some((te, Te) => Ft(te, I[Te])) : Ft(L, I))) &&
          (v && v(),
          ve(t, f, 3, [L, I === Vt ? void 0 : _ && I[0] === Vt ? [] : I, w]),
          (I = L));
      } else q.run();
  };
  j.allowRecurse = !!t;
  let k;
  r === "sync"
    ? (k = j)
    : r === "post"
    ? (k = () => ae(j, f && f.suspense))
    : ((j.pre = !0), f && (j.id = f.uid), (k = () => is(j)));
  const q = new Qn(a, k);
  t
    ? n
      ? j()
      : (I = q.run())
    : r === "post"
    ? ae(q.run.bind(q), f && f.suspense)
    : q.run();
  const V = () => {
    q.stop(), f && f.scope && Vn(f.scope.effects, q);
  };
  return F && F.push(V), V;
}
function uo(e, t, n) {
  const s = this.proxy,
    r = Q(e) ? (e.includes(".") ? Fr(s, e) : () => s[e]) : e.bind(s, s);
  let i;
  S(t) ? (i = t) : ((i = t.handler), (n = t));
  const o = se;
  vt(this);
  const l = Pr(r, i.bind(s), n);
  return o ? vt(o) : it(), l;
}
function Fr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++) s = s[n[r]];
    return s;
  };
}
function nt(e, t) {
  if (!z(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), oe(e))) nt(e.value, t);
  else if (M(e)) for (let n = 0; n < e.length; n++) nt(e[n], t);
  else if (nr(e) || at(e))
    e.forEach((n) => {
      nt(n, t);
    });
  else if (ir(e)) for (const n in e) nt(e[n], t);
  return e;
}
function ws(e, t) {
  const n = le;
  if (n === null) return e;
  const s = mn(n) || n.proxy,
    r = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [o, l, f, a = W] = t[i];
    o &&
      (S(o) && (o = { mounted: o, updated: o }),
      o.deep && nt(l),
      r.push({
        dir: o,
        instance: s,
        value: l,
        oldValue: void 0,
        arg: f,
        modifiers: a,
      }));
  }
  return e;
}
function Ye(e, t, n, s) {
  const r = e.dirs,
    i = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    const l = r[o];
    i && (l.oldValue = i[o].value);
    let f = l.dir[s];
    f && (xt(), ve(f, n, 8, [e.el, l, e, t]), Ct());
  }
}
function ao() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    pn(() => {
      e.isMounted = !0;
    }),
    Ur(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const be = [Function, Array],
  Sr = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: be,
    onEnter: be,
    onAfterEnter: be,
    onEnterCancelled: be,
    onBeforeLeave: be,
    onLeave: be,
    onAfterLeave: be,
    onLeaveCancelled: be,
    onBeforeAppear: be,
    onAppear: be,
    onAfterAppear: be,
    onAppearCancelled: be,
  },
  po = {
    name: "BaseTransition",
    props: Sr,
    setup(e, { slots: t }) {
      const n = Go(),
        s = ao();
      let r;
      return () => {
        const i = t.default && Rr(t.default(), !0);
        if (!i || !i.length) return;
        let o = i[0];
        if (i.length > 1) {
          for (const I of i)
            if (I.type !== ye) {
              o = I;
              break;
            }
        }
        const l = U(e),
          { mode: f } = l;
        if (s.isLeaving) return xn(o);
        const a = Ts(o);
        if (!a) return xn(o);
        const p = Rn(a, l, s, n);
        $n(a, p);
        const _ = n.subTree,
          v = _ && Ts(_);
        let w = !1;
        const { getTransitionKey: F } = a.type;
        if (F) {
          const I = F();
          r === void 0 ? (r = I) : I !== r && ((r = I), (w = !0));
        }
        if (v && v.type !== ye && (!et(a, v) || w)) {
          const I = Rn(v, l, s, n);
          if (($n(v, I), f === "out-in"))
            return (
              (s.isLeaving = !0),
              (I.afterLeave = () => {
                (s.isLeaving = !1), n.update.active !== !1 && n.update();
              }),
              xn(o)
            );
          f === "in-out" &&
            a.type !== ye &&
            (I.delayLeave = (j, k, q) => {
              const V = Nr(s, v);
              (V[String(v.key)] = v),
                (j._leaveCb = () => {
                  k(), (j._leaveCb = void 0), delete p.delayedLeave;
                }),
                (p.delayedLeave = q);
            });
        }
        return o;
      };
    },
  },
  ho = po;
function Nr(e, t) {
  const { leavingVNodes: n } = e;
  let s = n.get(t.type);
  return s || ((s = Object.create(null)), n.set(t.type, s)), s;
}
function Rn(e, t, n, s) {
  const {
      appear: r,
      mode: i,
      persisted: o = !1,
      onBeforeEnter: l,
      onEnter: f,
      onAfterEnter: a,
      onEnterCancelled: p,
      onBeforeLeave: _,
      onLeave: v,
      onAfterLeave: w,
      onLeaveCancelled: F,
      onBeforeAppear: I,
      onAppear: j,
      onAfterAppear: k,
      onAppearCancelled: q,
    } = t,
    V = String(e.key),
    L = Nr(n, e),
    te = (N, Y) => {
      N && ve(N, s, 9, Y);
    },
    Te = (N, Y) => {
      const K = Y[1];
      te(N, Y),
        M(N) ? N.every((re) => re.length <= 1) && K() : N.length <= 1 && K();
    },
    Ae = {
      mode: i,
      persisted: o,
      beforeEnter(N) {
        let Y = l;
        if (!n.isMounted)
          if (r) Y = I || l;
          else return;
        N._leaveCb && N._leaveCb(!0);
        const K = L[V];
        K && et(e, K) && K.el._leaveCb && K.el._leaveCb(), te(Y, [N]);
      },
      enter(N) {
        let Y = f,
          K = a,
          re = p;
        if (!n.isMounted)
          if (r) (Y = j || f), (K = k || a), (re = q || p);
          else return;
        let T = !1;
        const J = (N._enterCb = (he) => {
          T ||
            ((T = !0),
            he ? te(re, [N]) : te(K, [N]),
            Ae.delayedLeave && Ae.delayedLeave(),
            (N._enterCb = void 0));
        });
        Y ? Te(Y, [N, J]) : J();
      },
      leave(N, Y) {
        const K = String(e.key);
        if ((N._enterCb && N._enterCb(!0), n.isUnmounting)) return Y();
        te(_, [N]);
        let re = !1;
        const T = (N._leaveCb = (J) => {
          re ||
            ((re = !0),
            Y(),
            J ? te(F, [N]) : te(w, [N]),
            (N._leaveCb = void 0),
            L[K] === e && delete L[K]);
        });
        (L[K] = e), v ? Te(v, [N, T]) : T();
      },
      clone(N) {
        return Rn(N, t, n, s);
      },
    };
  return Ae;
}
function xn(e) {
  if (an(e)) return (e = qe(e)), (e.children = null), e;
}
function Ts(e) {
  return an(e) ? (e.children ? e.children[0] : void 0) : e;
}
function $n(e, t) {
  e.shapeFlag & 6 && e.component
    ? $n(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function Rr(e, t = !1, n) {
  let s = [],
    r = 0;
  for (let i = 0; i < e.length; i++) {
    let o = e[i];
    const l = n == null ? o.key : String(n) + String(o.key != null ? o.key : i);
    o.type === _e
      ? (o.patchFlag & 128 && r++, (s = s.concat(Rr(o.children, t, l))))
      : (t || o.type !== ye) && s.push(l != null ? qe(o, { key: l }) : o);
  }
  if (r > 1) for (let i = 0; i < s.length; i++) s[i].patchFlag = -2;
  return s;
}
const Mt = (e) => !!e.type.__asyncLoader,
  an = (e) => e.type.__isKeepAlive;
function go(e, t) {
  $r(e, "a", t);
}
function mo(e, t) {
  $r(e, "da", t);
}
function $r(e, t, n = se) {
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
  if ((dn(t, s, n), n)) {
    let r = n.parent;
    for (; r && r.parent; )
      an(r.parent.vnode) && _o(s, t, n, r), (r = r.parent);
  }
}
function _o(e, t, n, s) {
  const r = dn(t, e, s, !0);
  Dr(() => {
    Vn(s[t], r);
  }, n);
}
function dn(e, t, n = se, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...o) => {
          if (n.isUnmounted) return;
          xt(), vt(n);
          const l = ve(t, n, e, o);
          return it(), Ct(), l;
        });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const De =
    (e) =>
    (t, n = se) =>
      (!Dt || e === "sp") && dn(e, (...s) => t(...s), n),
  bo = De("bm"),
  pn = De("m"),
  vo = De("bu"),
  yo = De("u"),
  Ur = De("bum"),
  Dr = De("um"),
  xo = De("sp"),
  Co = De("rtg"),
  Eo = De("rtc");
function Io(e, t = se) {
  dn("ec", e, t);
}
const wo = Symbol.for("v-ndc");
function To(e, t, n, s) {
  let r;
  const i = n && n[s];
  if (M(e) || Q(e)) {
    r = new Array(e.length);
    for (let o = 0, l = e.length; o < l; o++)
      r[o] = t(e[o], o, void 0, i && i[o]);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let o = 0; o < e; o++) r[o] = t(o + 1, o, void 0, i && i[o]);
  } else if (z(e))
    if (e[Symbol.iterator])
      r = Array.from(e, (o, l) => t(o, l, void 0, i && i[l]));
    else {
      const o = Object.keys(e);
      r = new Array(o.length);
      for (let l = 0, f = o.length; l < f; l++) {
        const a = o[l];
        r[l] = t(e[a], a, l, i && i[l]);
      }
    }
  else r = [];
  return n && (n[s] = r), r;
}
function Ao(e, t, n = {}, s, r) {
  if (le.isCE || (le.parent && Mt(le.parent) && le.parent.isCE))
    return t !== "default" && (n.name = t), G("slot", n, s && s());
  let i = e[t];
  i && i._c && (i._d = !1), ue();
  const o = i && Hr(i(n)),
    l = gt(
      _e,
      { key: n.key || (o && o.key) || `_${t}` },
      o || (s ? s() : []),
      o && e._ === 1 ? 64 : -2
    );
  return (
    !r && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]),
    i && i._c && (i._d = !0),
    l
  );
}
function Hr(e) {
  return e.some((t) =>
    nn(t) ? !(t.type === ye || (t.type === _e && !Hr(t.children))) : !0
  )
    ? e
    : null;
}
const Un = (e) => (e ? (Xr(e) ? mn(e) || e.proxy : Un(e.parent)) : null),
  Lt = ee(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Un(e.parent),
    $root: (e) => Un(e.root),
    $emit: (e) => e.emit,
    $options: (e) => os(e),
    $forceUpdate: (e) => e.f || (e.f = () => is(e.update)),
    $nextTick: (e) => e.n || (e.n = Nn.bind(e.proxy)),
    $watch: (e) => uo.bind(e),
  }),
  Cn = (e, t) => e !== W && !e.__isScriptSetup && $(e, t),
  Oo = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: s,
        data: r,
        props: i,
        accessCache: o,
        type: l,
        appContext: f,
      } = e;
      let a;
      if (t[0] !== "$") {
        const w = o[t];
        if (w !== void 0)
          switch (w) {
            case 1:
              return s[t];
            case 2:
              return r[t];
            case 4:
              return n[t];
            case 3:
              return i[t];
          }
        else {
          if (Cn(s, t)) return (o[t] = 1), s[t];
          if (r !== W && $(r, t)) return (o[t] = 2), r[t];
          if ((a = e.propsOptions[0]) && $(a, t)) return (o[t] = 3), i[t];
          if (n !== W && $(n, t)) return (o[t] = 4), n[t];
          Dn && (o[t] = 0);
        }
      }
      const p = Lt[t];
      let _, v;
      if (p) return t === "$attrs" && pe(e, "get", t), p(e);
      if ((_ = l.__cssModules) && (_ = _[t])) return _;
      if (n !== W && $(n, t)) return (o[t] = 4), n[t];
      if (((v = f.config.globalProperties), $(v, t))) return v[t];
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: r, ctx: i } = e;
      return Cn(r, t)
        ? ((r[t] = n), !0)
        : s !== W && $(s, t)
        ? ((s[t] = n), !0)
        : $(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((i[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: s,
          appContext: r,
          propsOptions: i,
        },
      },
      o
    ) {
      let l;
      return (
        !!n[o] ||
        (e !== W && $(e, o)) ||
        Cn(t, o) ||
        ((l = i[0]) && $(l, o)) ||
        $(s, o) ||
        $(Lt, o) ||
        $(r.config.globalProperties, o)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : $(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function As(e) {
  return M(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let Dn = !0;
function Mo(e) {
  const t = os(e),
    n = e.proxy,
    s = e.ctx;
  (Dn = !1), t.beforeCreate && Os(t.beforeCreate, e, "bc");
  const {
    data: r,
    computed: i,
    methods: o,
    watch: l,
    provide: f,
    inject: a,
    created: p,
    beforeMount: _,
    mounted: v,
    beforeUpdate: w,
    updated: F,
    activated: I,
    deactivated: j,
    beforeDestroy: k,
    beforeUnmount: q,
    destroyed: V,
    unmounted: L,
    render: te,
    renderTracked: Te,
    renderTriggered: Ae,
    errorCaptured: N,
    serverPrefetch: Y,
    expose: K,
    inheritAttrs: re,
    components: T,
    directives: J,
    filters: he,
  } = t;
  if ((a && Lo(a, s, null), o))
    for (const X in o) {
      const H = o[X];
      S(H) && (s[X] = H.bind(n));
    }
  if (r) {
    const X = r.call(n, n);
    z(X) && (e.data = _t(X));
  }
  if (((Dn = !0), i))
    for (const X in i) {
      const H = i[X],
        Ve = S(H) ? H.bind(n, n) : S(H.get) ? H.get.bind(n, n) : we,
        Bt = !S(H) && S(H.set) ? H.set.bind(n) : we,
        Je = Wn({ get: Ve, set: Bt });
      Object.defineProperty(s, X, {
        enumerable: !0,
        configurable: !0,
        get: () => Je.value,
        set: (Oe) => (Je.value = Oe),
      });
    }
  if (l) for (const X in l) Br(l[X], s, n, X);
  if (f) {
    const X = S(f) ? f.call(n) : f;
    Reflect.ownKeys(X).forEach((H) => {
      Bn(H, X[H]);
    });
  }
  p && Os(p, e, "c");
  function ne(X, H) {
    M(H) ? H.forEach((Ve) => X(Ve.bind(n))) : H && X(H.bind(n));
  }
  if (
    (ne(bo, _),
    ne(pn, v),
    ne(vo, w),
    ne(yo, F),
    ne(go, I),
    ne(mo, j),
    ne(Io, N),
    ne(Eo, Te),
    ne(Co, Ae),
    ne(Ur, q),
    ne(Dr, L),
    ne(xo, Y),
    M(K))
  )
    if (K.length) {
      const X = e.exposed || (e.exposed = {});
      K.forEach((H) => {
        Object.defineProperty(X, H, {
          get: () => n[H],
          set: (Ve) => (n[H] = Ve),
        });
      });
    } else e.exposed || (e.exposed = {});
  te && e.render === we && (e.render = te),
    re != null && (e.inheritAttrs = re),
    T && (e.components = T),
    J && (e.directives = J);
}
function Lo(e, t, n = we) {
  M(e) && (e = Hn(e));
  for (const s in e) {
    const r = e[s];
    let i;
    z(r)
      ? "default" in r
        ? (i = ht(r.from || s, r.default, !0))
        : (i = ht(r.from || s))
      : (i = ht(r)),
      oe(i)
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (o) => (i.value = o),
          })
        : (t[s] = i);
  }
}
function Os(e, t, n) {
  ve(M(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Br(e, t, n, s) {
  const r = s.includes(".") ? Fr(n, s) : () => n[s];
  if (Q(e)) {
    const i = t[e];
    S(i) && Ot(r, i);
  } else if (S(e)) Ot(r, e.bind(n));
  else if (z(e))
    if (M(e)) e.forEach((i) => Br(i, t, n, s));
    else {
      const i = S(e.handler) ? e.handler.bind(n) : t[e.handler];
      S(i) && Ot(r, i, e);
    }
}
function os(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: r,
      optionsCache: i,
      config: { optionMergeStrategies: o },
    } = e.appContext,
    l = i.get(t);
  let f;
  return (
    l
      ? (f = l)
      : !r.length && !n && !s
      ? (f = t)
      : ((f = {}), r.length && r.forEach((a) => en(f, a, o, !0)), en(f, t, o)),
    z(t) && i.set(t, f),
    f
  );
}
function en(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t;
  i && en(e, i, n, !0), r && r.forEach((o) => en(e, o, n, !0));
  for (const o in t)
    if (!(s && o === "expose")) {
      const l = Po[o] || (n && n[o]);
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const Po = {
  data: Ms,
  props: Ls,
  emits: Ls,
  methods: At,
  computed: At,
  beforeCreate: fe,
  created: fe,
  beforeMount: fe,
  mounted: fe,
  beforeUpdate: fe,
  updated: fe,
  beforeDestroy: fe,
  beforeUnmount: fe,
  destroyed: fe,
  unmounted: fe,
  activated: fe,
  deactivated: fe,
  errorCaptured: fe,
  serverPrefetch: fe,
  components: At,
  directives: At,
  watch: So,
  provide: Ms,
  inject: Fo,
};
function Ms(e, t) {
  return t
    ? e
      ? function () {
          return ee(
            S(e) ? e.call(this, this) : e,
            S(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function Fo(e, t) {
  return At(Hn(e), Hn(t));
}
function Hn(e) {
  if (M(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function fe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function At(e, t) {
  return e ? ee(Object.create(null), e, t) : t;
}
function Ls(e, t) {
  return e
    ? M(e) && M(t)
      ? [...new Set([...e, ...t])]
      : ee(Object.create(null), As(e), As(t ?? {}))
    : t;
}
function So(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ee(Object.create(null), e);
  for (const s in t) n[s] = fe(e[s], t[s]);
  return n;
}
function jr() {
  return {
    app: null,
    config: {
      isNativeTag: ni,
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
let No = 0;
function Ro(e, t) {
  return function (s, r = null) {
    S(s) || (s = ee({}, s)), r != null && !z(r) && (r = null);
    const i = jr(),
      o = new Set();
    let l = !1;
    const f = (i.app = {
      _uid: No++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: cl,
      get config() {
        return i.config;
      },
      set config(a) {},
      use(a, ...p) {
        return (
          o.has(a) ||
            (a && S(a.install)
              ? (o.add(a), a.install(f, ...p))
              : S(a) && (o.add(a), a(f, ...p))),
          f
        );
      },
      mixin(a) {
        return i.mixins.includes(a) || i.mixins.push(a), f;
      },
      component(a, p) {
        return p ? ((i.components[a] = p), f) : i.components[a];
      },
      directive(a, p) {
        return p ? ((i.directives[a] = p), f) : i.directives[a];
      },
      mount(a, p, _) {
        if (!l) {
          const v = G(s, r);
          return (
            (v.appContext = i),
            p && t ? t(v, a) : e(v, a, _),
            (l = !0),
            (f._container = a),
            (a.__vue_app__ = f),
            mn(v.component) || v.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, f._container), delete f._container.__vue_app__);
      },
      provide(a, p) {
        return (i.provides[a] = p), f;
      },
      runWithContext(a) {
        tn = f;
        try {
          return a();
        } finally {
          tn = null;
        }
      },
    });
    return f;
  };
}
let tn = null;
function Bn(e, t) {
  if (se) {
    let n = se.provides;
    const s = se.parent && se.parent.provides;
    s === n && (n = se.provides = Object.create(s)), (n[e] = t);
  }
}
function ht(e, t, n = !1) {
  const s = se || le;
  if (s || tn) {
    const r = s
      ? s.parent == null
        ? s.vnode.appContext && s.vnode.appContext.provides
        : s.parent.provides
      : tn._context.provides;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && S(t) ? t.call(s && s.proxy) : t;
  }
}
function $o(e, t, n, s = !1) {
  const r = {},
    i = {};
  Zt(i, gn, 1), (e.propsDefaults = Object.create(null)), Kr(e, t, r, i);
  for (const o in e.propsOptions[0]) o in r || (r[o] = void 0);
  n ? (e.props = s ? r : zi(r)) : e.type.props ? (e.props = r) : (e.props = i),
    (e.attrs = i);
}
function Uo(e, t, n, s) {
  const {
      props: r,
      attrs: i,
      vnode: { patchFlag: o },
    } = e,
    l = U(r),
    [f] = e.propsOptions;
  let a = !1;
  if ((s || o > 0) && !(o & 16)) {
    if (o & 8) {
      const p = e.vnode.dynamicProps;
      for (let _ = 0; _ < p.length; _++) {
        let v = p[_];
        if (fn(e.emitsOptions, v)) continue;
        const w = t[v];
        if (f)
          if ($(i, v)) w !== i[v] && ((i[v] = w), (a = !0));
          else {
            const F = mt(v);
            r[F] = jn(f, l, F, w, e, !1);
          }
        else w !== i[v] && ((i[v] = w), (a = !0));
      }
    }
  } else {
    Kr(e, t, r, i) && (a = !0);
    let p;
    for (const _ in l)
      (!t || (!$(t, _) && ((p = yt(_)) === _ || !$(t, p)))) &&
        (f
          ? n &&
            (n[_] !== void 0 || n[p] !== void 0) &&
            (r[_] = jn(f, l, _, void 0, e, !0))
          : delete r[_]);
    if (i !== l) for (const _ in i) (!t || !$(t, _)) && (delete i[_], (a = !0));
  }
  a && Ue(e, "set", "$attrs");
}
function Kr(e, t, n, s) {
  const [r, i] = e.propsOptions;
  let o = !1,
    l;
  if (t)
    for (let f in t) {
      if (Jt(f)) continue;
      const a = t[f];
      let p;
      r && $(r, (p = mt(f)))
        ? !i || !i.includes(p)
          ? (n[p] = a)
          : ((l || (l = {}))[p] = a)
        : fn(e.emitsOptions, f) ||
          ((!(f in s) || a !== s[f]) && ((s[f] = a), (o = !0)));
    }
  if (i) {
    const f = U(n),
      a = l || W;
    for (let p = 0; p < i.length; p++) {
      const _ = i[p];
      n[_] = jn(r, f, _, a[_], e, !$(a, _));
    }
  }
  return o;
}
function jn(e, t, n, s, r, i) {
  const o = e[n];
  if (o != null) {
    const l = $(o, "default");
    if (l && s === void 0) {
      const f = o.default;
      if (o.type !== Function && !o.skipFactory && S(f)) {
        const { propsDefaults: a } = r;
        n in a ? (s = a[n]) : (vt(r), (s = a[n] = f.call(null, t)), it());
      } else s = f;
    }
    o[0] &&
      (i && !l ? (s = !1) : o[1] && (s === "" || s === yt(n)) && (s = !0));
  }
  return s;
}
function Wr(e, t, n = !1) {
  const s = t.propsCache,
    r = s.get(e);
  if (r) return r;
  const i = e.props,
    o = {},
    l = [];
  let f = !1;
  if (!S(e)) {
    const p = (_) => {
      f = !0;
      const [v, w] = Wr(_, t, !0);
      ee(o, v), w && l.push(...w);
    };
    !n && t.mixins.length && t.mixins.forEach(p),
      e.extends && p(e.extends),
      e.mixins && e.mixins.forEach(p);
  }
  if (!i && !f) return z(e) && s.set(e, ut), ut;
  if (M(i))
    for (let p = 0; p < i.length; p++) {
      const _ = mt(i[p]);
      Ps(_) && (o[_] = W);
    }
  else if (i)
    for (const p in i) {
      const _ = mt(p);
      if (Ps(_)) {
        const v = i[p],
          w = (o[_] = M(v) || S(v) ? { type: v } : ee({}, v));
        if (w) {
          const F = Ns(Boolean, w.type),
            I = Ns(String, w.type);
          (w[0] = F > -1),
            (w[1] = I < 0 || F < I),
            (F > -1 || $(w, "default")) && l.push(_);
        }
      }
    }
  const a = [o, l];
  return z(e) && s.set(e, a), a;
}
function Ps(e) {
  return e[0] !== "$";
}
function Fs(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function Ss(e, t) {
  return Fs(e) === Fs(t);
}
function Ns(e, t) {
  return M(t) ? t.findIndex((n) => Ss(n, e)) : S(t) && Ss(t, e) ? 0 : -1;
}
const zr = (e) => e[0] === "_" || e === "$stable",
  ls = (e) => (M(e) ? e.map(Pe) : [Pe(e)]),
  Do = (e, t, n) => {
    if (t._n) return t;
    const s = $t((...r) => ls(t(...r)), n);
    return (s._c = !1), s;
  },
  kr = (e, t, n) => {
    const s = e._ctx;
    for (const r in e) {
      if (zr(r)) continue;
      const i = e[r];
      if (S(i)) t[r] = Do(r, i, s);
      else if (i != null) {
        const o = ls(i);
        t[r] = () => o;
      }
    }
  },
  qr = (e, t) => {
    const n = ls(t);
    e.slots.default = () => n;
  },
  Ho = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = U(t)), Zt(t, "_", n)) : kr(t, (e.slots = {}));
    } else (e.slots = {}), t && qr(e, t);
    Zt(e.slots, gn, 1);
  },
  Bo = (e, t, n) => {
    const { vnode: s, slots: r } = e;
    let i = !0,
      o = W;
    if (s.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (i = !1)
          : (ee(r, t), !n && l === 1 && delete r._)
        : ((i = !t.$stable), kr(t, r)),
        (o = t);
    } else t && (qr(e, t), (o = { default: 1 }));
    if (i) for (const l in r) !zr(l) && !(l in o) && delete r[l];
  };
function Kn(e, t, n, s, r = !1) {
  if (M(e)) {
    e.forEach((v, w) => Kn(v, t && (M(t) ? t[w] : t), n, s, r));
    return;
  }
  if (Mt(s) && !r) return;
  const i = s.shapeFlag & 4 ? mn(s.component) || s.component.proxy : s.el,
    o = r ? null : i,
    { i: l, r: f } = e,
    a = t && t.r,
    p = l.refs === W ? (l.refs = {}) : l.refs,
    _ = l.setupState;
  if (
    (a != null &&
      a !== f &&
      (Q(a)
        ? ((p[a] = null), $(_, a) && (_[a] = null))
        : oe(a) && (a.value = null)),
    S(f))
  )
    ze(f, l, 12, [o, p]);
  else {
    const v = Q(f),
      w = oe(f);
    if (v || w) {
      const F = () => {
        if (e.f) {
          const I = v ? ($(_, f) ? _[f] : p[f]) : f.value;
          r
            ? M(I) && Vn(I, i)
            : M(I)
            ? I.includes(i) || I.push(i)
            : v
            ? ((p[f] = [i]), $(_, f) && (_[f] = p[f]))
            : ((f.value = [i]), e.k && (p[e.k] = f.value));
        } else
          v
            ? ((p[f] = o), $(_, f) && (_[f] = o))
            : w && ((f.value = o), e.k && (p[e.k] = o));
      };
      o ? ((F.id = -1), ae(F, n)) : F();
    }
  }
}
const ae = fo;
function jo(e) {
  return Ko(e);
}
function Ko(e, t) {
  const n = On();
  n.__VUE__ = !0;
  const {
      insert: s,
      remove: r,
      patchProp: i,
      createElement: o,
      createText: l,
      createComment: f,
      setText: a,
      setElementText: p,
      parentNode: _,
      nextSibling: v,
      setScopeId: w = we,
      insertStaticContent: F,
    } = e,
    I = (
      c,
      u,
      d,
      g = null,
      h = null,
      y = null,
      C = !1,
      b = null,
      x = !!u.dynamicChildren
    ) => {
      if (c === u) return;
      c && !et(c, u) && ((g = jt(c)), Oe(c, h, y, !0), (c = null)),
        u.patchFlag === -2 && ((x = !1), (u.dynamicChildren = null));
      const { type: m, ref: A, shapeFlag: E } = u;
      switch (m) {
        case hn:
          j(c, u, d, g);
          break;
        case ye:
          k(c, u, d, g);
          break;
        case En:
          c == null && q(u, d, g, C);
          break;
        case _e:
          T(c, u, d, g, h, y, C, b, x);
          break;
        default:
          E & 1
            ? te(c, u, d, g, h, y, C, b, x)
            : E & 6
            ? J(c, u, d, g, h, y, C, b, x)
            : (E & 64 || E & 128) && m.process(c, u, d, g, h, y, C, b, x, ot);
      }
      A != null && h && Kn(A, c && c.ref, y, u || c, !u);
    },
    j = (c, u, d, g) => {
      if (c == null) s((u.el = l(u.children)), d, g);
      else {
        const h = (u.el = c.el);
        u.children !== c.children && a(h, u.children);
      }
    },
    k = (c, u, d, g) => {
      c == null ? s((u.el = f(u.children || "")), d, g) : (u.el = c.el);
    },
    q = (c, u, d, g) => {
      [c.el, c.anchor] = F(c.children, u, d, g, c.el, c.anchor);
    },
    V = ({ el: c, anchor: u }, d, g) => {
      let h;
      for (; c && c !== u; ) (h = v(c)), s(c, d, g), (c = h);
      s(u, d, g);
    },
    L = ({ el: c, anchor: u }) => {
      let d;
      for (; c && c !== u; ) (d = v(c)), r(c), (c = d);
      r(u);
    },
    te = (c, u, d, g, h, y, C, b, x) => {
      (C = C || u.type === "svg"),
        c == null ? Te(u, d, g, h, y, C, b, x) : Y(c, u, h, y, C, b, x);
    },
    Te = (c, u, d, g, h, y, C, b) => {
      let x, m;
      const { type: A, props: E, shapeFlag: O, transition: P, dirs: R } = c;
      if (
        ((x = c.el = o(c.type, y, E && E.is, E)),
        O & 8
          ? p(x, c.children)
          : O & 16 &&
            N(c.children, x, null, g, h, y && A !== "foreignObject", C, b),
        R && Ye(c, null, g, "created"),
        Ae(x, c, c.scopeId, C, g),
        E)
      ) {
        for (const D in E)
          D !== "value" &&
            !Jt(D) &&
            i(x, D, null, E[D], y, c.children, g, h, Se);
        "value" in E && i(x, "value", null, E.value),
          (m = E.onVnodeBeforeMount) && Le(m, g, c);
      }
      R && Ye(c, null, g, "beforeMount");
      const B = (!h || (h && !h.pendingBranch)) && P && !P.persisted;
      B && P.beforeEnter(x),
        s(x, u, d),
        ((m = E && E.onVnodeMounted) || B || R) &&
          ae(() => {
            m && Le(m, g, c), B && P.enter(x), R && Ye(c, null, g, "mounted");
          }, h);
    },
    Ae = (c, u, d, g, h) => {
      if ((d && w(c, d), g)) for (let y = 0; y < g.length; y++) w(c, g[y]);
      if (h) {
        let y = h.subTree;
        if (u === y) {
          const C = h.vnode;
          Ae(c, C, C.scopeId, C.slotScopeIds, h.parent);
        }
      }
    },
    N = (c, u, d, g, h, y, C, b, x = 0) => {
      for (let m = x; m < c.length; m++) {
        const A = (c[m] = b ? Ke(c[m]) : Pe(c[m]));
        I(null, A, u, d, g, h, y, C, b);
      }
    },
    Y = (c, u, d, g, h, y, C) => {
      const b = (u.el = c.el);
      let { patchFlag: x, dynamicChildren: m, dirs: A } = u;
      x |= c.patchFlag & 16;
      const E = c.props || W,
        O = u.props || W;
      let P;
      d && Xe(d, !1),
        (P = O.onVnodeBeforeUpdate) && Le(P, d, u, c),
        A && Ye(u, c, d, "beforeUpdate"),
        d && Xe(d, !0);
      const R = h && u.type !== "foreignObject";
      if (
        (m
          ? K(c.dynamicChildren, m, b, d, g, R, y)
          : C || H(c, u, b, null, d, g, R, y, !1),
        x > 0)
      ) {
        if (x & 16) re(b, u, E, O, d, g, h);
        else if (
          (x & 2 && E.class !== O.class && i(b, "class", null, O.class, h),
          x & 4 && i(b, "style", E.style, O.style, h),
          x & 8)
        ) {
          const B = u.dynamicProps;
          for (let D = 0; D < B.length; D++) {
            const Z = B[D],
              xe = E[Z],
              lt = O[Z];
            (lt !== xe || Z === "value") &&
              i(b, Z, xe, lt, h, c.children, d, g, Se);
          }
        }
        x & 1 && c.children !== u.children && p(b, u.children);
      } else !C && m == null && re(b, u, E, O, d, g, h);
      ((P = O.onVnodeUpdated) || A) &&
        ae(() => {
          P && Le(P, d, u, c), A && Ye(u, c, d, "updated");
        }, g);
    },
    K = (c, u, d, g, h, y, C) => {
      for (let b = 0; b < u.length; b++) {
        const x = c[b],
          m = u[b],
          A =
            x.el && (x.type === _e || !et(x, m) || x.shapeFlag & 70)
              ? _(x.el)
              : d;
        I(x, m, A, null, g, h, y, C, !0);
      }
    },
    re = (c, u, d, g, h, y, C) => {
      if (d !== g) {
        if (d !== W)
          for (const b in d)
            !Jt(b) && !(b in g) && i(c, b, d[b], null, C, u.children, h, y, Se);
        for (const b in g) {
          if (Jt(b)) continue;
          const x = g[b],
            m = d[b];
          x !== m && b !== "value" && i(c, b, m, x, C, u.children, h, y, Se);
        }
        "value" in g && i(c, "value", d.value, g.value);
      }
    },
    T = (c, u, d, g, h, y, C, b, x) => {
      const m = (u.el = c ? c.el : l("")),
        A = (u.anchor = c ? c.anchor : l(""));
      let { patchFlag: E, dynamicChildren: O, slotScopeIds: P } = u;
      P && (b = b ? b.concat(P) : P),
        c == null
          ? (s(m, d, g), s(A, d, g), N(u.children, d, A, h, y, C, b, x))
          : E > 0 && E & 64 && O && c.dynamicChildren
          ? (K(c.dynamicChildren, O, d, h, y, C, b),
            (u.key != null || (h && u === h.subTree)) && Vr(c, u, !0))
          : H(c, u, d, A, h, y, C, b, x);
    },
    J = (c, u, d, g, h, y, C, b, x) => {
      (u.slotScopeIds = b),
        c == null
          ? u.shapeFlag & 512
            ? h.ctx.activate(u, d, g, C, x)
            : he(u, d, g, h, y, C, x)
          : Et(c, u, x);
    },
    he = (c, u, d, g, h, y, C) => {
      const b = (c.component = Qo(c, g, h));
      if ((an(c) && (b.ctx.renderer = ot), el(b), b.asyncDep)) {
        if ((h && h.registerDep(b, ne), !c.el)) {
          const x = (b.subTree = G(ye));
          k(null, x, u, d);
        }
        return;
      }
      ne(b, c, u, d, h, y, C);
    },
    Et = (c, u, d) => {
      const g = (u.component = c.component);
      if (oo(c, u, d))
        if (g.asyncDep && !g.asyncResolved) {
          X(g, u, d);
          return;
        } else (g.next = u), Qi(g.update), g.update();
      else (u.el = c.el), (g.vnode = u);
    },
    ne = (c, u, d, g, h, y, C) => {
      const b = () => {
          if (c.isMounted) {
            let { next: A, bu: E, u: O, parent: P, vnode: R } = c,
              B = A,
              D;
            Xe(c, !1),
              A ? ((A.el = R.el), X(c, A, C)) : (A = R),
              E && Yt(E),
              (D = A.props && A.props.onVnodeBeforeUpdate) && Le(D, P, A, R),
              Xe(c, !0);
            const Z = yn(c),
              xe = c.subTree;
            (c.subTree = Z),
              I(xe, Z, _(xe.el), jt(xe), c, h, y),
              (A.el = Z.el),
              B === null && lo(c, Z.el),
              O && ae(O, h),
              (D = A.props && A.props.onVnodeUpdated) &&
                ae(() => Le(D, P, A, R), h);
          } else {
            let A;
            const { el: E, props: O } = u,
              { bm: P, m: R, parent: B } = c,
              D = Mt(u);
            if (
              (Xe(c, !1),
              P && Yt(P),
              !D && (A = O && O.onVnodeBeforeMount) && Le(A, B, u),
              Xe(c, !0),
              E && bn)
            ) {
              const Z = () => {
                (c.subTree = yn(c)), bn(E, c.subTree, c, h, null);
              };
              D
                ? u.type.__asyncLoader().then(() => !c.isUnmounted && Z())
                : Z();
            } else {
              const Z = (c.subTree = yn(c));
              I(null, Z, d, g, c, h, y), (u.el = Z.el);
            }
            if ((R && ae(R, h), !D && (A = O && O.onVnodeMounted))) {
              const Z = u;
              ae(() => Le(A, B, Z), h);
            }
            (u.shapeFlag & 256 ||
              (B && Mt(B.vnode) && B.vnode.shapeFlag & 256)) &&
              c.a &&
              ae(c.a, h),
              (c.isMounted = !0),
              (u = d = g = null);
          }
        },
        x = (c.effect = new Qn(b, () => is(m), c.scope)),
        m = (c.update = () => x.run());
      (m.id = c.uid), Xe(c, !0), m();
    },
    X = (c, u, d) => {
      u.component = c;
      const g = c.vnode.props;
      (c.vnode = u),
        (c.next = null),
        Uo(c, u.props, g, d),
        Bo(c, u.children, d),
        xt(),
        Es(),
        Ct();
    },
    H = (c, u, d, g, h, y, C, b, x = !1) => {
      const m = c && c.children,
        A = c ? c.shapeFlag : 0,
        E = u.children,
        { patchFlag: O, shapeFlag: P } = u;
      if (O > 0) {
        if (O & 128) {
          Bt(m, E, d, g, h, y, C, b, x);
          return;
        } else if (O & 256) {
          Ve(m, E, d, g, h, y, C, b, x);
          return;
        }
      }
      P & 8
        ? (A & 16 && Se(m, h, y), E !== m && p(d, E))
        : A & 16
        ? P & 16
          ? Bt(m, E, d, g, h, y, C, b, x)
          : Se(m, h, y, !0)
        : (A & 8 && p(d, ""), P & 16 && N(E, d, g, h, y, C, b, x));
    },
    Ve = (c, u, d, g, h, y, C, b, x) => {
      (c = c || ut), (u = u || ut);
      const m = c.length,
        A = u.length,
        E = Math.min(m, A);
      let O;
      for (O = 0; O < E; O++) {
        const P = (u[O] = x ? Ke(u[O]) : Pe(u[O]));
        I(c[O], P, d, null, h, y, C, b, x);
      }
      m > A ? Se(c, h, y, !0, !1, E) : N(u, d, g, h, y, C, b, x, E);
    },
    Bt = (c, u, d, g, h, y, C, b, x) => {
      let m = 0;
      const A = u.length;
      let E = c.length - 1,
        O = A - 1;
      for (; m <= E && m <= O; ) {
        const P = c[m],
          R = (u[m] = x ? Ke(u[m]) : Pe(u[m]));
        if (et(P, R)) I(P, R, d, null, h, y, C, b, x);
        else break;
        m++;
      }
      for (; m <= E && m <= O; ) {
        const P = c[E],
          R = (u[O] = x ? Ke(u[O]) : Pe(u[O]));
        if (et(P, R)) I(P, R, d, null, h, y, C, b, x);
        else break;
        E--, O--;
      }
      if (m > E) {
        if (m <= O) {
          const P = O + 1,
            R = P < A ? u[P].el : g;
          for (; m <= O; )
            I(null, (u[m] = x ? Ke(u[m]) : Pe(u[m])), d, R, h, y, C, b, x), m++;
        }
      } else if (m > O) for (; m <= E; ) Oe(c[m], h, y, !0), m++;
      else {
        const P = m,
          R = m,
          B = new Map();
        for (m = R; m <= O; m++) {
          const ge = (u[m] = x ? Ke(u[m]) : Pe(u[m]));
          ge.key != null && B.set(ge.key, m);
        }
        let D,
          Z = 0;
        const xe = O - R + 1;
        let lt = !1,
          ds = 0;
        const It = new Array(xe);
        for (m = 0; m < xe; m++) It[m] = 0;
        for (m = P; m <= E; m++) {
          const ge = c[m];
          if (Z >= xe) {
            Oe(ge, h, y, !0);
            continue;
          }
          let Me;
          if (ge.key != null) Me = B.get(ge.key);
          else
            for (D = R; D <= O; D++)
              if (It[D - R] === 0 && et(ge, u[D])) {
                Me = D;
                break;
              }
          Me === void 0
            ? Oe(ge, h, y, !0)
            : ((It[Me - R] = m + 1),
              Me >= ds ? (ds = Me) : (lt = !0),
              I(ge, u[Me], d, null, h, y, C, b, x),
              Z++);
        }
        const ps = lt ? Wo(It) : ut;
        for (D = ps.length - 1, m = xe - 1; m >= 0; m--) {
          const ge = R + m,
            Me = u[ge],
            hs = ge + 1 < A ? u[ge + 1].el : g;
          It[m] === 0
            ? I(null, Me, d, hs, h, y, C, b, x)
            : lt && (D < 0 || m !== ps[D] ? Je(Me, d, hs, 2) : D--);
        }
      }
    },
    Je = (c, u, d, g, h = null) => {
      const { el: y, type: C, transition: b, children: x, shapeFlag: m } = c;
      if (m & 6) {
        Je(c.component.subTree, u, d, g);
        return;
      }
      if (m & 128) {
        c.suspense.move(u, d, g);
        return;
      }
      if (m & 64) {
        C.move(c, u, d, ot);
        return;
      }
      if (C === _e) {
        s(y, u, d);
        for (let E = 0; E < x.length; E++) Je(x[E], u, d, g);
        s(c.anchor, u, d);
        return;
      }
      if (C === En) {
        V(c, u, d);
        return;
      }
      if (g !== 2 && m & 1 && b)
        if (g === 0) b.beforeEnter(y), s(y, u, d), ae(() => b.enter(y), h);
        else {
          const { leave: E, delayLeave: O, afterLeave: P } = b,
            R = () => s(y, u, d),
            B = () => {
              E(y, () => {
                R(), P && P();
              });
            };
          O ? O(y, R, B) : B();
        }
      else s(y, u, d);
    },
    Oe = (c, u, d, g = !1, h = !1) => {
      const {
        type: y,
        props: C,
        ref: b,
        children: x,
        dynamicChildren: m,
        shapeFlag: A,
        patchFlag: E,
        dirs: O,
      } = c;
      if ((b != null && Kn(b, null, d, c, !0), A & 256)) {
        u.ctx.deactivate(c);
        return;
      }
      const P = A & 1 && O,
        R = !Mt(c);
      let B;
      if ((R && (B = C && C.onVnodeBeforeUnmount) && Le(B, u, c), A & 6))
        ti(c.component, d, g);
      else {
        if (A & 128) {
          c.suspense.unmount(d, g);
          return;
        }
        P && Ye(c, null, u, "beforeUnmount"),
          A & 64
            ? c.type.remove(c, u, d, h, ot, g)
            : m && (y !== _e || (E > 0 && E & 64))
            ? Se(m, u, d, !1, !0)
            : ((y === _e && E & 384) || (!h && A & 16)) && Se(x, u, d),
          g && us(c);
      }
      ((R && (B = C && C.onVnodeUnmounted)) || P) &&
        ae(() => {
          B && Le(B, u, c), P && Ye(c, null, u, "unmounted");
        }, d);
    },
    us = (c) => {
      const { type: u, el: d, anchor: g, transition: h } = c;
      if (u === _e) {
        ei(d, g);
        return;
      }
      if (u === En) {
        L(c);
        return;
      }
      const y = () => {
        r(d), h && !h.persisted && h.afterLeave && h.afterLeave();
      };
      if (c.shapeFlag & 1 && h && !h.persisted) {
        const { leave: C, delayLeave: b } = h,
          x = () => C(d, y);
        b ? b(c.el, y, x) : x();
      } else y();
    },
    ei = (c, u) => {
      let d;
      for (; c !== u; ) (d = v(c)), r(c), (c = d);
      r(u);
    },
    ti = (c, u, d) => {
      const { bum: g, scope: h, update: y, subTree: C, um: b } = c;
      g && Yt(g),
        h.stop(),
        y && ((y.active = !1), Oe(C, c, u, d)),
        b && ae(b, u),
        ae(() => {
          c.isUnmounted = !0;
        }, u),
        u &&
          u.pendingBranch &&
          !u.isUnmounted &&
          c.asyncDep &&
          !c.asyncResolved &&
          c.suspenseId === u.pendingId &&
          (u.deps--, u.deps === 0 && u.resolve());
    },
    Se = (c, u, d, g = !1, h = !1, y = 0) => {
      for (let C = y; C < c.length; C++) Oe(c[C], u, d, g, h);
    },
    jt = (c) =>
      c.shapeFlag & 6
        ? jt(c.component.subTree)
        : c.shapeFlag & 128
        ? c.suspense.next()
        : v(c.anchor || c.el),
    as = (c, u, d) => {
      c == null
        ? u._vnode && Oe(u._vnode, null, null, !0)
        : I(u._vnode || null, c, u, null, null, null, d),
        Es(),
        Or(),
        (u._vnode = c);
    },
    ot = {
      p: I,
      um: Oe,
      m: Je,
      r: us,
      mt: he,
      mc: N,
      pc: H,
      pbc: K,
      n: jt,
      o: e,
    };
  let _n, bn;
  return (
    t && ([_n, bn] = t(ot)), { render: as, hydrate: _n, createApp: Ro(as, _n) }
  );
}
function Xe({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Vr(e, t, n = !1) {
  const s = e.children,
    r = t.children;
  if (M(s) && M(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      let l = r[i];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = r[i] = Ke(r[i])), (l.el = o.el)),
        n || Vr(o, l)),
        l.type === hn && (l.el = o.el);
    }
}
function Wo(e) {
  const t = e.slice(),
    n = [0];
  let s, r, i, o, l;
  const f = e.length;
  for (s = 0; s < f; s++) {
    const a = e[s];
    if (a !== 0) {
      if (((r = n[n.length - 1]), e[r] < a)) {
        (t[s] = r), n.push(s);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; )
        (l = (i + o) >> 1), e[n[l]] < a ? (i = l + 1) : (o = l);
      a < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), (n[i] = s));
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; ) (n[i] = o), (o = t[o]);
  return n;
}
const zo = (e) => e.__isTeleport,
  _e = Symbol.for("v-fgt"),
  hn = Symbol.for("v-txt"),
  ye = Symbol.for("v-cmt"),
  En = Symbol.for("v-stc"),
  Pt = [];
let Ie = null;
function ue(e = !1) {
  Pt.push((Ie = e ? null : []));
}
function ko() {
  Pt.pop(), (Ie = Pt[Pt.length - 1] || null);
}
let Ut = 1;
function Rs(e) {
  Ut += e;
}
function Jr(e) {
  return (
    (e.dynamicChildren = Ut > 0 ? Ie || ut : null),
    ko(),
    Ut > 0 && Ie && Ie.push(e),
    e
  );
}
function $e(e, t, n, s, r, i) {
  return Jr(ce(e, t, n, s, r, i, !0));
}
function gt(e, t, n, s, r) {
  return Jr(G(e, t, n, s, r, !0));
}
function nn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function et(e, t) {
  return e.type === t.type && e.key === t.key;
}
const gn = "__vInternal",
  Yr = ({ key: e }) => e ?? null,
  Xt = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? Q(e) || oe(e) || S(e)
        ? { i: le, r: e, k: t, f: !!n }
        : e
      : null
  );
function ce(
  e,
  t = null,
  n = null,
  s = 0,
  r = null,
  i = e === _e ? 0 : 1,
  o = !1,
  l = !1
) {
  const f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Yr(t),
    ref: t && Xt(t),
    scopeId: un,
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
    shapeFlag: i,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: le,
  };
  return (
    l
      ? (cs(f, n), i & 128 && e.normalize(f))
      : n && (f.shapeFlag |= Q(n) ? 8 : 16),
    Ut > 0 &&
      !o &&
      Ie &&
      (f.patchFlag > 0 || i & 6) &&
      f.patchFlag !== 32 &&
      Ie.push(f),
    f
  );
}
const G = qo;
function qo(e, t = null, n = null, s = 0, r = null, i = !1) {
  if (((!e || e === wo) && (e = ye), nn(e))) {
    const l = qe(e, t, !0);
    return (
      n && cs(l, n),
      Ut > 0 &&
        !i &&
        Ie &&
        (l.shapeFlag & 6 ? (Ie[Ie.indexOf(e)] = l) : Ie.push(l)),
      (l.patchFlag |= -2),
      l
    );
  }
  if ((rl(e) && (e = e.__vccOpts), t)) {
    t = Vo(t);
    let { class: l, style: f } = t;
    l && !Q(l) && (t.class = Re(l)),
      z(f) && (xr(f) && !M(f) && (f = ee({}, f)), (t.style = Xn(f)));
  }
  const o = Q(e) ? 1 : co(e) ? 128 : zo(e) ? 64 : z(e) ? 4 : S(e) ? 2 : 0;
  return ce(e, t, n, s, r, o, i, !0);
}
function Vo(e) {
  return e ? (xr(e) || gn in e ? ee({}, e) : e) : null;
}
function qe(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: i, children: o } = e,
    l = t ? Yo(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Yr(l),
    ref:
      t && t.ref ? (n && r ? (M(r) ? r.concat(Xt(t)) : [r, Xt(t)]) : Xt(t)) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== _e ? (i === -1 ? 16 : i | 16) : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && qe(e.ssContent),
    ssFallback: e.ssFallback && qe(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function Jo(e = " ", t = 0) {
  return G(hn, null, e, t);
}
function rt(e = "", t = !1) {
  return t ? (ue(), gt(ye, null, e)) : G(ye, null, e);
}
function Pe(e) {
  return e == null || typeof e == "boolean"
    ? G(ye)
    : M(e)
    ? G(_e, null, e.slice())
    : typeof e == "object"
    ? Ke(e)
    : G(hn, null, String(e));
}
function Ke(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : qe(e);
}
function cs(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null) t = null;
  else if (M(t)) n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), cs(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(gn in t)
        ? (t._ctx = le)
        : r === 3 &&
          le &&
          (le.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    S(t)
      ? ((t = { default: t, _ctx: le }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [Jo(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Yo(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = Re([t.class, s.class]));
      else if (r === "style") t.style = Xn([t.style, s.style]);
      else if (sn(r)) {
        const i = t[r],
          o = s[r];
        o &&
          i !== o &&
          !(M(i) && i.includes(o)) &&
          (t[r] = i ? [].concat(i, o) : o);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function Le(e, t, n, s = null) {
  ve(e, t, 7, [n, s]);
}
const Xo = jr();
let Zo = 0;
function Qo(e, t, n) {
  const s = e.type,
    r = (t ? t.appContext : e.appContext) || Xo,
    i = {
      uid: Zo++,
      vnode: e,
      type: s,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new gi(!0),
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
      propsOptions: Wr(s, r),
      emitsOptions: Lr(s, r),
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
    (i.ctx = { _: i }),
    (i.root = t ? t.root : i),
    (i.emit = to.bind(null, i)),
    e.ce && e.ce(i),
    i
  );
}
let se = null;
const Go = () => se || le;
let fs,
  ct,
  $s = "__VUE_INSTANCE_SETTERS__";
(ct = On()[$s]) || (ct = On()[$s] = []),
  ct.push((e) => (se = e)),
  (fs = (e) => {
    ct.length > 1 ? ct.forEach((t) => t(e)) : ct[0](e);
  });
const vt = (e) => {
    fs(e), e.scope.on();
  },
  it = () => {
    se && se.scope.off(), fs(null);
  };
function Xr(e) {
  return e.vnode.shapeFlag & 4;
}
let Dt = !1;
function el(e, t = !1) {
  Dt = t;
  const { props: n, children: s } = e.vnode,
    r = Xr(e);
  $o(e, n, r, t), Ho(e, s);
  const i = r ? tl(e, t) : void 0;
  return (Dt = !1), i;
}
function tl(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Cr(new Proxy(e.ctx, Oo)));
  const { setup: s } = n;
  if (s) {
    const r = (e.setupContext = s.length > 1 ? sl(e) : null);
    vt(e), xt();
    const i = ze(s, e, 0, [e.props, r]);
    if ((Ct(), it(), sr(i))) {
      if ((i.then(it, it), t))
        return i
          .then((o) => {
            Us(e, o, t);
          })
          .catch((o) => {
            cn(o, e, 0);
          });
      e.asyncDep = i;
    } else Us(e, i, t);
  } else Zr(e, t);
}
function Us(e, t, n) {
  S(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : z(t) && (e.setupState = wr(t)),
    Zr(e, n);
}
let Ds;
function Zr(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && Ds && !s.render) {
      const r = s.template || os(e).template;
      if (r) {
        const { isCustomElement: i, compilerOptions: o } = e.appContext.config,
          { delimiters: l, compilerOptions: f } = s,
          a = ee(ee({ isCustomElement: i, delimiters: l }, o), f);
        s.render = Ds(r, a);
      }
    }
    e.render = s.render || we;
  }
  vt(e), xt(), Mo(e), Ct(), it();
}
function nl(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return pe(e, "get", "$attrs"), t[n];
      },
    }))
  );
}
function sl(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return nl(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function mn(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(wr(Cr(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in Lt) return Lt[n](e);
        },
        has(t, n) {
          return n in t || n in Lt;
        },
      }))
    );
}
function rl(e) {
  return S(e) && "__vccOpts" in e;
}
const Wn = (e, t) => Yi(e, t, Dt);
function il(e, t, n) {
  const s = arguments.length;
  return s === 2
    ? z(t) && !M(t)
      ? nn(t)
        ? G(e, null, [t])
        : G(e, t)
      : G(e, null, t)
    : (s > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : s === 3 && nn(n) && (n = [n]),
      G(e, t, n));
}
const ol = Symbol.for("v-scx"),
  ll = () => ht(ol),
  cl = "3.3.4",
  fl = "http://www.w3.org/2000/svg",
  tt = typeof document < "u" ? document : null,
  Hs = tt && tt.createElement("template"),
  ul = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, s) => {
      const r = t
        ? tt.createElementNS(fl, e)
        : tt.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          s &&
          s.multiple != null &&
          r.setAttribute("multiple", s.multiple),
        r
      );
    },
    createText: (e) => tt.createTextNode(e),
    createComment: (e) => tt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => tt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, s, r, i) {
      const o = n ? n.previousSibling : t.lastChild;
      if (r && (r === i || r.nextSibling))
        for (
          ;
          t.insertBefore(r.cloneNode(!0), n),
            !(r === i || !(r = r.nextSibling));

        );
      else {
        Hs.innerHTML = s ? `<svg>${e}</svg>` : e;
        const l = Hs.content;
        if (s) {
          const f = l.firstChild;
          for (; f.firstChild; ) l.appendChild(f.firstChild);
          l.removeChild(f);
        }
        t.insertBefore(l, n);
      }
      return [
        o ? o.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function al(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function dl(e, t, n) {
  const s = e.style,
    r = Q(n);
  if (n && !r) {
    if (t && !Q(t)) for (const i in t) n[i] == null && zn(s, i, "");
    for (const i in n) zn(s, i, n[i]);
  } else {
    const i = s.display;
    r ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (s.display = i);
  }
}
const Bs = /\s*!important$/;
function zn(e, t, n) {
  if (M(n)) n.forEach((s) => zn(e, t, s));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const s = pl(e, t);
    Bs.test(n)
      ? e.setProperty(yt(s), n.replace(Bs, ""), "important")
      : (e[s] = n);
  }
}
const js = ["Webkit", "Moz", "ms"],
  In = {};
function pl(e, t) {
  const n = In[t];
  if (n) return n;
  let s = mt(t);
  if (s !== "filter" && s in e) return (In[t] = s);
  s = or(s);
  for (let r = 0; r < js.length; r++) {
    const i = js[r] + s;
    if (i in e) return (In[t] = i);
  }
  return t;
}
const Ks = "http://www.w3.org/1999/xlink";
function hl(e, t, n, s, r) {
  if (s && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(Ks, t.slice(6, t.length))
      : e.setAttributeNS(Ks, t, n);
  else {
    const i = hi(t);
    n == null || (i && !lr(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, i ? "" : n);
  }
}
function gl(e, t, n, s, r, i, o) {
  if (t === "innerHTML" || t === "textContent") {
    s && o(s, r, i), (e[t] = n ?? "");
    return;
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && !l.includes("-")) {
    e._value = n;
    const a = l === "OPTION" ? e.getAttribute("value") : e.value,
      p = n ?? "";
    a !== p && (e.value = p), n == null && e.removeAttribute(t);
    return;
  }
  let f = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean"
      ? (n = lr(n))
      : n == null && a === "string"
      ? ((n = ""), (f = !0))
      : a === "number" && ((n = 0), (f = !0));
  }
  try {
    e[t] = n;
  } catch {}
  f && e.removeAttribute(t);
}
function ft(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function ml(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function _l(e, t, n, s, r = null) {
  const i = e._vei || (e._vei = {}),
    o = i[t];
  if (s && o) o.value = s;
  else {
    const [l, f] = bl(t);
    if (s) {
      const a = (i[t] = xl(s, r));
      ft(e, l, a, f);
    } else o && (ml(e, l, o, f), (i[t] = void 0));
  }
}
const Ws = /(?:Once|Passive|Capture)$/;
function bl(e) {
  let t;
  if (Ws.test(e)) {
    t = {};
    let s;
    for (; (s = e.match(Ws)); )
      (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : yt(e.slice(2)), t];
}
let wn = 0;
const vl = Promise.resolve(),
  yl = () => wn || (vl.then(() => (wn = 0)), (wn = Date.now()));
function xl(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now();
    else if (s._vts <= n.attached) return;
    ve(Cl(s, n.value), t, 5, [s]);
  };
  return (n.value = e), (n.attached = yl()), n;
}
function Cl(e, t) {
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
const zs = /^on[a-z]/,
  El = (e, t, n, s, r = !1, i, o, l, f) => {
    t === "class"
      ? al(e, s, r)
      : t === "style"
      ? dl(e, n, s)
      : sn(t)
      ? qn(t) || _l(e, t, n, s, o)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : Il(e, t, s, r)
        )
      ? gl(e, t, s, i, o, l, f)
      : (t === "true-value"
          ? (e._trueValue = s)
          : t === "false-value" && (e._falseValue = s),
        hl(e, t, s, r));
  };
function Il(e, t, n, s) {
  return s
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && zs.test(t) && S(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (zs.test(t) && Q(n))
    ? !1
    : t in e;
}
const Be = "transition",
  wt = "animation",
  Ht = (e, { slots: t }) => il(ho, wl(e), t);
Ht.displayName = "Transition";
const Qr = {
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
Ht.props = ee({}, Sr, Qr);
const Ze = (e, t = []) => {
    M(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  ks = (e) => (e ? (M(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function wl(e) {
  const t = {};
  for (const T in e) T in Qr || (t[T] = e[T]);
  if (e.css === !1) return t;
  const {
      name: n = "v",
      type: s,
      duration: r,
      enterFromClass: i = `${n}-enter-from`,
      enterActiveClass: o = `${n}-enter-active`,
      enterToClass: l = `${n}-enter-to`,
      appearFromClass: f = i,
      appearActiveClass: a = o,
      appearToClass: p = l,
      leaveFromClass: _ = `${n}-leave-from`,
      leaveActiveClass: v = `${n}-leave-active`,
      leaveToClass: w = `${n}-leave-to`,
    } = e,
    F = Tl(r),
    I = F && F[0],
    j = F && F[1],
    {
      onBeforeEnter: k,
      onEnter: q,
      onEnterCancelled: V,
      onLeave: L,
      onLeaveCancelled: te,
      onBeforeAppear: Te = k,
      onAppear: Ae = q,
      onAppearCancelled: N = V,
    } = t,
    Y = (T, J, he) => {
      Qe(T, J ? p : l), Qe(T, J ? a : o), he && he();
    },
    K = (T, J) => {
      (T._isLeaving = !1), Qe(T, _), Qe(T, w), Qe(T, v), J && J();
    },
    re = (T) => (J, he) => {
      const Et = T ? Ae : q,
        ne = () => Y(J, T, he);
      Ze(Et, [J, ne]),
        qs(() => {
          Qe(J, T ? f : i), je(J, T ? p : l), ks(Et) || Vs(J, s, I, ne);
        });
    };
  return ee(t, {
    onBeforeEnter(T) {
      Ze(k, [T]), je(T, i), je(T, o);
    },
    onBeforeAppear(T) {
      Ze(Te, [T]), je(T, f), je(T, a);
    },
    onEnter: re(!1),
    onAppear: re(!0),
    onLeave(T, J) {
      T._isLeaving = !0;
      const he = () => K(T, J);
      je(T, _),
        Ml(),
        je(T, v),
        qs(() => {
          T._isLeaving && (Qe(T, _), je(T, w), ks(L) || Vs(T, s, j, he));
        }),
        Ze(L, [T, he]);
    },
    onEnterCancelled(T) {
      Y(T, !1), Ze(V, [T]);
    },
    onAppearCancelled(T) {
      Y(T, !0), Ze(N, [T]);
    },
    onLeaveCancelled(T) {
      K(T), Ze(te, [T]);
    },
  });
}
function Tl(e) {
  if (e == null) return null;
  if (z(e)) return [Tn(e.enter), Tn(e.leave)];
  {
    const t = Tn(e);
    return [t, t];
  }
}
function Tn(e) {
  return ci(e);
}
function je(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e._vtc || (e._vtc = new Set())).add(t);
}
function Qe(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.remove(s));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function qs(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Al = 0;
function Vs(e, t, n, s) {
  const r = (e._endId = ++Al),
    i = () => {
      r === e._endId && s();
    };
  if (n) return setTimeout(i, n);
  const { type: o, timeout: l, propCount: f } = Ol(e, t);
  if (!o) return s();
  const a = o + "end";
  let p = 0;
  const _ = () => {
      e.removeEventListener(a, v), i();
    },
    v = (w) => {
      w.target === e && ++p >= f && _();
    };
  setTimeout(() => {
    p < f && _();
  }, l + 1),
    e.addEventListener(a, v);
}
function Ol(e, t) {
  const n = window.getComputedStyle(e),
    s = (F) => (n[F] || "").split(", "),
    r = s(`${Be}Delay`),
    i = s(`${Be}Duration`),
    o = Js(r, i),
    l = s(`${wt}Delay`),
    f = s(`${wt}Duration`),
    a = Js(l, f);
  let p = null,
    _ = 0,
    v = 0;
  t === Be
    ? o > 0 && ((p = Be), (_ = o), (v = i.length))
    : t === wt
    ? a > 0 && ((p = wt), (_ = a), (v = f.length))
    : ((_ = Math.max(o, a)),
      (p = _ > 0 ? (o > a ? Be : wt) : null),
      (v = p ? (p === Be ? i.length : f.length) : 0));
  const w =
    p === Be && /\b(transform|all)(,|$)/.test(s(`${Be}Property`).toString());
  return { type: p, timeout: _, propCount: v, hasTransform: w };
}
function Js(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, s) => Ys(n) + Ys(e[s])));
}
function Ys(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Ml() {
  return document.body.offsetHeight;
}
const Xs = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return M(t) ? (n) => Yt(t, n) : t;
};
function Ll(e) {
  e.target.composing = !0;
}
function Zs(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const Qs = {
    created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
      e._assign = Xs(r);
      const i = s || (r.props && r.props.type === "number");
      ft(e, t ? "change" : "input", (o) => {
        if (o.target.composing) return;
        let l = e.value;
        n && (l = l.trim()), i && (l = An(l)), e._assign(l);
      }),
        n &&
          ft(e, "change", () => {
            e.value = e.value.trim();
          }),
        t ||
          (ft(e, "compositionstart", Ll),
          ft(e, "compositionend", Zs),
          ft(e, "change", Zs));
    },
    mounted(e, { value: t }) {
      e.value = t ?? "";
    },
    beforeUpdate(
      e,
      { value: t, modifiers: { lazy: n, trim: s, number: r } },
      i
    ) {
      if (
        ((e._assign = Xs(i)),
        e.composing ||
          (document.activeElement === e &&
            e.type !== "range" &&
            (n ||
              (s && e.value.trim() === t) ||
              ((r || e.type === "number") && An(e.value) === t))))
      )
        return;
      const o = t ?? "";
      e.value !== o && (e.value = o);
    },
  },
  Pl = ["ctrl", "shift", "alt", "meta"],
  Fl = {
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
    exact: (e, t) => Pl.some((n) => e[`${n}Key`] && !t.includes(n)),
  },
  Sl =
    (e, t) =>
    (n, ...s) => {
      for (let r = 0; r < t.length; r++) {
        const i = Fl[t[r]];
        if (i && i(n, t)) return;
      }
      return e(n, ...s);
    },
  Nl = ee({ patchProp: El }, ul);
let Gs;
function Rl() {
  return Gs || (Gs = jo(Nl));
}
const $l = (...e) => {
  const t = Rl().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (s) => {
      const r = Ul(s);
      if (!r) return;
      const i = t._component;
      !S(i) && !i.render && !i.template && (i.template = r.innerHTML),
        (r.innerHTML = "");
      const o = n(r, !1, r instanceof SVGElement);
      return (
        r instanceof Element &&
          (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")),
        o
      );
    }),
    t
  );
};
function Ul(e) {
  return Q(e) ? document.querySelector(e) : e;
}
const Dl = { key: 0, class: "label-container" },
  Hl = ce("label", { for: "URL", class: "add-image-label" }, "Image URL", -1),
  Bl = ce(
    "label",
    { for: "descr", class: "add-image-label" },
    "Description",
    -1
  ),
  jl = { key: 0, class: "warn-para" },
  er = {
    __name: "AddImage",
    setup(e) {
      const t = _t({
          id: void 0,
          URL: void 0,
          description: void 0,
          frame: void 0,
        }),
        n = ht("addImage");
      let s = me(!1),
        r = me(void 0),
        i = me(!1),
        o = me(void 0),
        l = me(void 0),
        f = me(void 0),
        a = me(void 0),
        p = me(null);
      async function _() {
        return new Promise((w, F) => {
          const I = new Image();
          (I.src = t.URL), (I.onload = () => w(!0)), (I.onerror = () => w(!1));
        });
      }
      Ot(t, (w) => {
        t.URL != "" &&
          _().then((F, I) => {
            F
              ? (console.log("VALID"),
                (a.value = !0),
                (o.value = null),
                t.description !== "" && t.description !== void 0
                  ? (r.value = "add-image-ready")
                  : (r.value = ""))
              : ((a.value = !1),
                console.log("NOT VALID"),
                (o.value = "Invalid URL"),
                (r.value = ""));
          });
      });
      const v = async () => {
        s.value
          ? (s.value && t.description == "") || t.description == null
            ? a.value
              ? ((o.value = "Please enter a description"),
                (f.value = "add-image-url-error"))
              : (s.value = !s.value)
            : a.value
            ? ((t.id = `${Math.floor(Date.now() * Math.random())}`),
              n(t),
              (f.value = ""),
              (l.value = ""),
              (r.value = ""),
              await Nn(),
              (s.value = !s.value),
              (t.id = ""),
              (t.URL = ""),
              (t.description = ""),
              (t.frame = ""))
            : ((o.value = "Please enter a valid URL"),
              (l.value = "add-image-url-error"),
              (f.value = ""))
          : ((s.value = !s.value), await Nn(), p.value.focus());
      };
      return (w, F) =>
        de(i)
          ? rt("", !0)
          : (ue(),
            $e(
              "div",
              { key: 0, class: Re(["add-image", de(r)]) },
              [
                ce(
                  "form",
                  {
                    onSubmit: F[2] || (F[2] = Sl(() => {}, ["prevent"])),
                    class: "add-image-form",
                    novalidate: "",
                    autocomplete: "off",
                    spellcheck: "true",
                  },
                  [
                    ce("button", {
                      onClick: v,
                      class: "add-image-btn",
                      title: "add an image",
                    }),
                    G(
                      Ht,
                      { name: "btn-fade" },
                      {
                        default: $t(() => [
                          de(s)
                            ? (ue(),
                              $e("div", Dl, [
                                Hl,
                                ws(
                                  ce(
                                    "input",
                                    {
                                      type: "url",
                                      name: "Image URL",
                                      id: "URL",
                                      class: Re(["add-image-url", de(l)]),
                                      placeholder:
                                        "https://cdn.wa.H's_Envelope.jpg",
                                      "onUpdate:modelValue":
                                        F[0] || (F[0] = (I) => (t.URL = I)),
                                      ref_key: "input",
                                      ref: p,
                                      required: "true",
                                    },
                                    null,
                                    2
                                  ),
                                  [[Qs, t.URL]]
                                ),
                                Bl,
                                ws(
                                  ce(
                                    "input",
                                    {
                                      type: "text",
                                      name: "Image description",
                                      id: "descr",
                                      class: Re(["add-image-url", de(f)]),
                                      ref: "inputDescr",
                                      placeholder: "Hayley's envelope",
                                      "onUpdate:modelValue":
                                        F[1] ||
                                        (F[1] = (I) => (t.description = I)),
                                      required: "true",
                                    },
                                    null,
                                    2
                                  ),
                                  [[Qs, t.description]]
                                ),
                                de(o)
                                  ? (ue(), $e("p", jl, cr(de(o)), 1))
                                  : rt("", !0),
                              ]))
                            : rt("", !0),
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
  Kl = { class: "select-image-container" },
  Wl = ["src", "alt"],
  zl = { class: "fade-text" },
  tr = {
    __name: "FramedImage",
    props: ["image"],
    setup(e) {
      return (t, n) => (
        ue(),
        gt(
          Ht,
          { name: "fade", appear: "" },
          {
            default: $t(() => [
              ce("figure", null, [
                ce("div", Kl, [
                  ce(
                    "img",
                    {
                      class: "main-image",
                      src: e.image.URL,
                      alt: e.image.description,
                      ref: "mainImage",
                      loading: "lazy",
                    },
                    null,
                    8,
                    Wl
                  ),
                  Ao(t.$slots, "default"),
                ]),
                ce("figcaption", zl, [
                  t.editing
                    ? rt("", !0)
                    : (ue(),
                      $e(
                        "span",
                        {
                          key: 0,
                          onDblclick:
                            n[0] ||
                            (n[0] = (...s) => t.editImage && t.editImage(...s)),
                        },
                        cr(e.image.description),
                        33
                      )),
                ]),
              ]),
            ]),
            _: 3,
          }
        )
      );
    },
  };
const Gr = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [s, r] of t) n[s] = r;
    return n;
  },
  kl = {
    __name: "LayoutToggle",
    setup(e) {
      let t = localStorage.layout
          ? me(JSON.parse(localStorage.layout))
          : me("vertical"),
        n = me("layout-button");
      const s = (i) => {
          i === "vertical"
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
        pn(() => s(t.value)),
        (i, o) => (
          ue(),
          $e(
            "button",
            { onClick: r, title: "change layout", class: Re(de(n)) },
            "L",
            2
          )
        )
      );
    },
  },
  ql = Gr(kl, [["__scopeId", "data-v-186b5ba1"]]),
  Vl = {
    __name: "SetMainImageButton",
    props: { image: Object },
    setup(e) {
      const t = ht("setAsMainImage");
      let n = me(""),
        s = {},
        r = me(null);
      const i = () => (n.value = "btn-container-active"),
        o = () => (n.value = "");
      return (
        pn(() => {
          (s = r.value.parentElement),
            s.addEventListener("mouseenter", () => {
              i();
            }),
            s.addEventListener("mouseleave", () => {
              o();
            });
        }),
        (l, f) => (
          ue(),
          $e(
            "div",
            {
              class: Re(["select-image", de(n)]),
              ref_key: "buttonContainer",
              ref: r,
            },
            [
              ce(
                "button",
                {
                  class: "add-image-btn select-image-btn",
                  title: "select as main image",
                  onClick: f[0] || (f[0] = (a) => de(t)(e.image)),
                  onFocus: i,
                  onBlur: o,
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
  };
const Jl = (e) => (no("data-v-716b5aae"), (e = e()), so(), e),
  Yl = Jl(() => ce("hr", null, null, -1)),
  Xl = { key: 0, class: "gallery-wrapper" },
  Zl = { class: "image-gallery mask" },
  Ql = {
    __name: "App",
    setup(e) {
      const t = localStorage.images
        ? _t(JSON.parse(localStorage.images))
        : _t([]);
      Bn("addImage", (f) => {
        t.length < 1 ? (f.isMainImage = !0) : (f.isMainImage = !1),
          t.push({ ...f });
      }),
        Bn("setAsMainImage", (f) => {
          t.find((p) => p.isMainImage === !0).isMainImage = !1;
          let a = t.find((p) => p.id === f.id);
          a.isMainImage = !0;
        });
      const r = () => t.length >= 1;
      r();
      let i = r() ? "has-image" : "";
      Ot(
        t,
        (f) => {
          localStorage.setItem("images", JSON.stringify(f)),
            r(),
            (i = r() ? "has-image" : "");
        },
        { deep: !0, immediate: !0 }
      );
      const o = Wn(() => t.find((f) => f.isMainImage === !0)),
        l = Wn(() => t.slice().reverse());
      return (f, a) => (
        ue(),
        $e("main", null, [
          ce(
            "div",
            { class: Re(["image-container", de(i)]) },
            [
              de(t).length < 1 ? (ue(), gt(er, { key: 0 })) : rt("", !0),
              o.value
                ? (ue(),
                  gt(tr, { image: o.value, key: o.value.id }, null, 8, [
                    "image",
                  ]))
                : rt("", !0),
            ],
            2
          ),
          Yl,
          G(
            Ht,
            { name: "section-fade" },
            {
              default: $t(() => [
                de(t).length >= 1
                  ? (ue(),
                    $e("div", Xl, [
                      G(ql),
                      ce("section", Zl, [
                        G(er),
                        (ue(!0),
                        $e(
                          _e,
                          null,
                          To(
                            l.value,
                            (p) => (
                              ue(),
                              gt(
                                tr,
                                { key: p.id, image: p },
                                {
                                  default: $t(() => [
                                    G(Vl, { image: p }, null, 8, ["image"]),
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
                  : rt("", !0),
              ]),
              _: 1,
            }
          ),
        ])
      );
    },
  },
  Gl = Gr(Ql, [["__scopeId", "data-v-716b5aae"]]);
$l(Gl).mount("#app");

async function loadStorage() {
  if (!browser.storage.local.get("theme")) {
    let theme;
  } else {
    let body = document.querySelector("body");
    let root = document.querySelector(":root");
    theme = await browser.storage.local.get("theme");
    console.log(theme.theme);
    if (theme.theme === "custom-theme") {
      let customThemeBgColor = await browser.storage.local.get("customBgColor");
      let customThemeAccentColor = await browser.storage.local.get(
        "customAccentColor"
      );

      root.style.setProperty(
        "--custom-theme-bg-color",
        customThemeBgColor.customBgColor
      );
      root.style.setProperty(
        "--custom-theme-accent-color",
        customThemeAccentColor.customAccentColor
      );
      console.log(`BG COLOR IS: ${customThemeBgColor.customBgColor}`);
    }
    body.classList.add(theme.theme);
  }

  //Font
  let gettingFont = browser.storage.local.get("currentFont");
  let fontExists;

  await gettingFont.then((value) => {
    if (value.currentFont) {
      fontExists = true;
    } else {
      fontExists = false;
    }
  });
  if (fontExists === false) {
    //not sure if anything is needed here
  } else {
    let main = document.querySelector("main");
    let font = await browser.storage.local.get("currentFont");
    main.classList.add(font.currentFont);
  }

  //Frame
  let mainImage = document.querySelectorAll(".main-image");
  let captionWrap = document.querySelectorAll(".fade-text");

  let gettingFrame = browser.storage.local.get("currentFrame");
  let frameExists;

  await gettingFrame.then((value) => {
    if (value.currentFrame) {
      frameExists = true;
    } else {
      frameExists = false;
    }
  });

  if (frameExists === false) {
    //not sure if anything is needed here
  } else {
    let frame = await browser.storage.local.get("currentFrame");
    mainImage.forEach((image) => {
      captionWrap.forEach((caption) => {
        // if (frame.currentFrame === "polaroid") {
        //   image.classList.add("frame-polaroid");
        //   caption.classList.add("frame-polaroid-caption");
        // }
        switch (frame.currentFrame) {
          case "shadow":
            image.classList.add("frame-shadow");
            break;
          case "polaroid":
            image.classList.add("frame-polaroid");
            caption.classList.add("frame-polaroid-caption");
            break;
          case "photo corner":
            let imageContainer = document.querySelectorAll(
              ".select-image-container"
            );
            imageContainer.forEach((container) => {
              container.classList.add("frame-corner");
            });
            image.classList.add("frame-none");
            break;
          case "image":
            image.classList.add("frame-image");
          case "none":
            image.classList.add("frame-none");
        }
      });
    });
  }
}

//maybe the popup can't access the user's color scheme?

loadStorage();
//IT WORKS

let test = [
  {
    name: "test",
    age: 34,
  },
  {
    name: "Two",
    age: 24,
  },
];

browser.storage.local.set({ test });
console.log(test);

let optionsBtn = document.querySelector(".openOptions");

optionsBtn.addEventListener("click", () => {
  browser.runtime.openOptionsPage();
});
