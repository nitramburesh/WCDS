import { css as U, LitElement as $, html as c } from "lit";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _ = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer((() => {
    customElements.define(i, t);
  })) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const p = globalThis, b = p.ShadowRoot && (p.ShadyCSS === void 0 || p.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, x = Symbol(), S = /* @__PURE__ */ new WeakMap();
let j = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== x) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (b && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = S.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && S.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const M = (i) => new j(typeof i == "string" ? i : i + "", void 0, x), R = (i, t) => {
  if (b) i.adoptedStyleSheets = t.map(((e) => e instanceof CSSStyleSheet ? e : e.styleSheet));
  else for (const e of t) {
    const s = document.createElement("style"), r = p.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = e.cssText, i.appendChild(s);
  }
}, P = b ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return M(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: D, defineProperty: z, getOwnPropertyDescriptor: L, getOwnPropertyNames: T, getOwnPropertySymbols: k, getPrototypeOf: q } = Object, y = globalThis, O = y.trustedTypes, N = O ? O.emptyScript : "", I = y.reactiveElementPolyfillSupport, l = (i, t) => i, d = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? N : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, v = (i, t) => !D(i, t), C = { attribute: !0, type: String, converter: d, reflect: !1, useDefault: !1, hasChanged: v };
Symbol.metadata ??= Symbol("metadata"), y.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
class h extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = C) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), r = this.getPropertyDescriptor(t, s, e);
      r !== void 0 && z(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: r, set: o } = L(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: r, set(n) {
      const a = r?.call(this);
      o?.call(this, n), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? C;
  }
  static _$Ei() {
    if (this.hasOwnProperty(l("elementProperties"))) return;
    const t = q(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(l("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(l("properties"))) {
      const e = this.properties, s = [...T(e), ...k(e)];
      for (const r of s) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, r] of e) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const r = this._$Eu(e, s);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const r of s) e.unshift(P(r));
    } else t !== void 0 && e.push(P(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise(((t) => this.enableUpdating = t)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(((t) => t(this)));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return R(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach(((t) => t.hostConnected?.()));
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach(((t) => t.hostDisconnected?.()));
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, s);
    if (r !== void 0 && s.reflect === !0) {
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : d).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const o = s.getPropertyOptions(r), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : d;
      this._$Em = r;
      const a = n.fromAttribute(e, o.type);
      this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    if (t !== void 0) {
      const r = this.constructor, o = this[t];
      if (s ??= r.getPropertyOptions(t), !((s.hasChanged ?? v)(o, e) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: r, wrapped: o }, n) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, o] of s) {
        const { wrapped: n } = o, a = this[r];
        n !== !0 || this._$AL.has(r) || a === void 0 || this.C(r, void 0, o, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach(((s) => s.hostUpdate?.())), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach(((e) => e.hostUpdated?.())), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach(((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
h.elementStyles = [], h.shadowRootOptions = { mode: "open" }, h[l("elementProperties")] = /* @__PURE__ */ new Map(), h[l("finalized")] = /* @__PURE__ */ new Map(), I?.({ ReactiveElement: h }), (y.reactiveElementVersions ??= []).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = { attribute: !0, type: String, converter: d, reflect: !1, hasChanged: v }, B = (i = W, t, e) => {
  const { kind: s, metadata: r } = e;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), o.set(e.name, i), s === "accessor") {
    const { name: n } = e;
    return { set(a) {
      const m = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(n, m, i);
    }, init(a) {
      return a !== void 0 && this.C(n, void 0, i, a), a;
    } };
  }
  if (s === "setter") {
    const { name: n } = e;
    return function(a) {
      const m = this[n];
      t.call(this, a), this.requestUpdate(n, m, i);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function E(i) {
  return (t, e) => typeof e == "object" ? B(i, t, e) : ((s, r, o) => {
    const n = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, s), n ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(i, t, e);
}
var J = Object.defineProperty, K = Object.getOwnPropertyDescriptor, A = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? K(t, e) : t, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = (s ? n(t, e, r) : n(r)) || r);
  return s && r && J(t, e, r), r;
};
let u = class extends $ {
  constructor() {
    super(...arguments), this.name = "default";
  }
  render() {
    return c`<span class="wcds-icon"> ${this._getIcon(this.name)} </span>`;
  }
  _getIcon(i) {
    return c` <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="3" x2="21" y2="21" />
        </svg>`;
  }
};
u.styles = U`
    .wcds-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.5em;
      height: 1.5em;
    }
  `;
A([
  E({ type: String })
], u.prototype, "name", 2);
u = A([
  _("wcds-icon")
], u);
var H = Object.getOwnPropertyDescriptor, V = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? H(t, e) : t, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = n(r) || r);
  return r;
};
let g = class extends $ {
  static get properties() {
    return {
      iconLeft: { type: String },
      iconRight: { type: String }
    };
  }
  constructor() {
    super();
  }
  render() {
    return console.log(this.iconLeft), c`
      <button class="wcds-button">
        ${this.iconLeft && c`<wcds-icon name="${this.iconLeft}" slot="icon-left" />`}

        <slot></slot>

        ${this.iconRight && c`<wcds-icon name="${this.iconRight}" slot="icon-right" />`}
      </button>
    `;
  }
};
g.styles = U`
    ::slotted() {
      font-size: 3.2em;
      line-height: 1.1;
    }

    button {
      border-radius: 32px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      color: #ffffff;
      cursor: pointer;
      transition: border-color 0.25s;
      display: flex;
      gap: 0.5em;
      align-items: center;
      justify-content: center;
      height: 3em;
      text-transform: uppercase;
    }

    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }
  `;
g = V([
  _("wcds-button")
], g);
var F = Object.defineProperty, G = Object.getOwnPropertyDescriptor, w = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? G(t, e) : t, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = (s ? n(t, e, r) : n(r)) || r);
  return s && r && F(t, e, r), r;
};
let f = class extends $ {
  constructor() {
    super();
  }
  render() {
    return c`<div
      style="display: flex; flex-direction: column; align-items: center; "
    >
      <div
        style="background-color: ${this.color}; 
          height: 100px;
          width: 100px;
          border-radius: 16px;
          border: 1px solid #ccc;"
      ></div>
      <p>${this.name}</p>
    </div> `;
  }
};
w([
  E({ type: String })
], f.prototype, "color", 2);
w([
  E({ type: String })
], f.prototype, "name", 2);
f = w([
  _("wcds-color")
], f);
