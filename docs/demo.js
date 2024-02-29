(() => {
  // node_modules/tslib/tslib.es6.mjs
  function __decorate(decorators, target, key, desc) {
    var c4 = arguments.length, r8 = c4 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r8 = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i6 = decorators.length - 1; i6 >= 0; i6--)
        if (d3 = decorators[i6])
          r8 = (c4 < 3 ? d3(r8) : c4 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c4 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  }

  // node_modules/@lit/reactive-element/decorators/custom-element.js
  var t = (t5) => (e10, o9) => {
    void 0 !== o9 ? o9.addInitializer(() => {
      customElements.define(t5, e10);
    }) : customElements.define(t5, e10);
  };

  // node_modules/@lit/reactive-element/css-tag.js
  var t2 = globalThis;
  var e = t2.ShadowRoot && (void 0 === t2.ShadyCSS || t2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var o = /* @__PURE__ */ new WeakMap();
  var n = class {
    constructor(t5, e10, o9) {
      if (this._$cssResult$ = true, o9 !== s)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t5, this.t = e10;
    }
    get styleSheet() {
      let t5 = this.o;
      const s5 = this.t;
      if (e && void 0 === t5) {
        const e10 = void 0 !== s5 && 1 === s5.length;
        e10 && (t5 = o.get(s5)), void 0 === t5 && ((this.o = t5 = new CSSStyleSheet()).replaceSync(this.cssText), e10 && o.set(s5, t5));
      }
      return t5;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t5) => new n("string" == typeof t5 ? t5 : t5 + "", void 0, s);
  var i = (t5, ...e10) => {
    const o9 = 1 === t5.length ? t5[0] : e10.reduce((e11, s5, o10) => e11 + ((t6) => {
      if (true === t6._$cssResult$)
        return t6.cssText;
      if ("number" == typeof t6)
        return t6;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t6 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s5) + t5[o10 + 1], t5[0]);
    return new n(o9, t5, s);
  };
  var S = (s5, o9) => {
    if (e)
      s5.adoptedStyleSheets = o9.map((t5) => t5 instanceof CSSStyleSheet ? t5 : t5.styleSheet);
    else
      for (const e10 of o9) {
        const o10 = document.createElement("style"), n8 = t2.litNonce;
        void 0 !== n8 && o10.setAttribute("nonce", n8), o10.textContent = e10.cssText, s5.appendChild(o10);
      }
  };
  var c = e ? (t5) => t5 : (t5) => t5 instanceof CSSStyleSheet ? ((t6) => {
    let e10 = "";
    for (const s5 of t6.cssRules)
      e10 += s5.cssText;
    return r(e10);
  })(t5) : t5;

  // node_modules/@lit/reactive-element/reactive-element.js
  var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: r2, getOwnPropertyNames: h, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
  var a = globalThis;
  var c2 = a.trustedTypes;
  var l = c2 ? c2.emptyScript : "";
  var p = a.reactiveElementPolyfillSupport;
  var d = (t5, s5) => t5;
  var u = { toAttribute(t5, s5) {
    switch (s5) {
      case Boolean:
        t5 = t5 ? l : null;
        break;
      case Object:
      case Array:
        t5 = null == t5 ? t5 : JSON.stringify(t5);
    }
    return t5;
  }, fromAttribute(t5, s5) {
    let i6 = t5;
    switch (s5) {
      case Boolean:
        i6 = null !== t5;
        break;
      case Number:
        i6 = null === t5 ? null : Number(t5);
        break;
      case Object:
      case Array:
        try {
          i6 = JSON.parse(t5);
        } catch (t6) {
          i6 = null;
        }
    }
    return i6;
  } };
  var f = (t5, s5) => !i2(t5, s5);
  var y = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
  Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
  var b = class extends HTMLElement {
    static addInitializer(t5) {
      this._$Ei(), (this.l ??= []).push(t5);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t5, s5 = y) {
      if (s5.state && (s5.attribute = false), this._$Ei(), this.elementProperties.set(t5, s5), !s5.noAccessor) {
        const i6 = Symbol(), r8 = this.getPropertyDescriptor(t5, i6, s5);
        void 0 !== r8 && e2(this.prototype, t5, r8);
      }
    }
    static getPropertyDescriptor(t5, s5, i6) {
      const { get: e10, set: h3 } = r2(this.prototype, t5) ?? { get() {
        return this[s5];
      }, set(t6) {
        this[s5] = t6;
      } };
      return { get() {
        return e10?.call(this);
      }, set(s6) {
        const r8 = e10?.call(this);
        h3.call(this, s6), this.requestUpdate(t5, r8, i6);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t5) {
      return this.elementProperties.get(t5) ?? y;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d("elementProperties")))
        return;
      const t5 = n2(this);
      t5.finalize(), void 0 !== t5.l && (this.l = [...t5.l]), this.elementProperties = new Map(t5.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d("finalized")))
        return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
        const t6 = this.properties, s5 = [...h(t6), ...o2(t6)];
        for (const i6 of s5)
          this.createProperty(i6, t6[i6]);
      }
      const t5 = this[Symbol.metadata];
      if (null !== t5) {
        const s5 = litPropertyMetadata.get(t5);
        if (void 0 !== s5)
          for (const [t6, i6] of s5)
            this.elementProperties.set(t6, i6);
      }
      this._$Eh = /* @__PURE__ */ new Map();
      for (const [t6, s5] of this.elementProperties) {
        const i6 = this._$Eu(t6, s5);
        void 0 !== i6 && this._$Eh.set(i6, t6);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s5) {
      const i6 = [];
      if (Array.isArray(s5)) {
        const e10 = new Set(s5.flat(1 / 0).reverse());
        for (const s6 of e10)
          i6.unshift(c(s6));
      } else
        void 0 !== s5 && i6.push(c(s5));
      return i6;
    }
    static _$Eu(t5, s5) {
      const i6 = s5.attribute;
      return false === i6 ? void 0 : "string" == typeof i6 ? i6 : "string" == typeof t5 ? t5.toLowerCase() : void 0;
    }
    constructor() {
      super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      this._$ES = new Promise((t5) => this.enableUpdating = t5), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t5) => t5(this));
    }
    addController(t5) {
      (this._$EO ??= /* @__PURE__ */ new Set()).add(t5), void 0 !== this.renderRoot && this.isConnected && t5.hostConnected?.();
    }
    removeController(t5) {
      this._$EO?.delete(t5);
    }
    _$E_() {
      const t5 = /* @__PURE__ */ new Map(), s5 = this.constructor.elementProperties;
      for (const i6 of s5.keys())
        this.hasOwnProperty(i6) && (t5.set(i6, this[i6]), delete this[i6]);
      t5.size > 0 && (this._$Ep = t5);
    }
    createRenderRoot() {
      const t5 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return S(t5, this.constructor.elementStyles), t5;
    }
    connectedCallback() {
      this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t5) => t5.hostConnected?.());
    }
    enableUpdating(t5) {
    }
    disconnectedCallback() {
      this._$EO?.forEach((t5) => t5.hostDisconnected?.());
    }
    attributeChangedCallback(t5, s5, i6) {
      this._$AK(t5, i6);
    }
    _$EC(t5, s5) {
      const i6 = this.constructor.elementProperties.get(t5), e10 = this.constructor._$Eu(t5, i6);
      if (void 0 !== e10 && true === i6.reflect) {
        const r8 = (void 0 !== i6.converter?.toAttribute ? i6.converter : u).toAttribute(s5, i6.type);
        this._$Em = t5, null == r8 ? this.removeAttribute(e10) : this.setAttribute(e10, r8), this._$Em = null;
      }
    }
    _$AK(t5, s5) {
      const i6 = this.constructor, e10 = i6._$Eh.get(t5);
      if (void 0 !== e10 && this._$Em !== e10) {
        const t6 = i6.getPropertyOptions(e10), r8 = "function" == typeof t6.converter ? { fromAttribute: t6.converter } : void 0 !== t6.converter?.fromAttribute ? t6.converter : u;
        this._$Em = e10, this[e10] = r8.fromAttribute(s5, t6.type), this._$Em = null;
      }
    }
    requestUpdate(t5, s5, i6) {
      if (void 0 !== t5) {
        if (i6 ??= this.constructor.getPropertyOptions(t5), !(i6.hasChanged ?? f)(this[t5], s5))
          return;
        this.P(t5, s5, i6);
      }
      false === this.isUpdatePending && (this._$ES = this._$ET());
    }
    P(t5, s5, i6) {
      this._$AL.has(t5) || this._$AL.set(t5, s5), true === i6.reflect && this._$Em !== t5 && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t5);
    }
    async _$ET() {
      this.isUpdatePending = true;
      try {
        await this._$ES;
      } catch (t6) {
        Promise.reject(t6);
      }
      const t5 = this.scheduleUpdate();
      return null != t5 && await t5, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending)
        return;
      if (!this.hasUpdated) {
        if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
          for (const [t7, s6] of this._$Ep)
            this[t7] = s6;
          this._$Ep = void 0;
        }
        const t6 = this.constructor.elementProperties;
        if (t6.size > 0)
          for (const [s6, i6] of t6)
            true !== i6.wrapped || this._$AL.has(s6) || void 0 === this[s6] || this.P(s6, this[s6], i6);
      }
      let t5 = false;
      const s5 = this._$AL;
      try {
        t5 = this.shouldUpdate(s5), t5 ? (this.willUpdate(s5), this._$EO?.forEach((t6) => t6.hostUpdate?.()), this.update(s5)) : this._$EU();
      } catch (s6) {
        throw t5 = false, this._$EU(), s6;
      }
      t5 && this._$AE(s5);
    }
    willUpdate(t5) {
    }
    _$AE(t5) {
      this._$EO?.forEach((t6) => t6.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t5)), this.updated(t5);
    }
    _$EU() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(t5) {
      return true;
    }
    update(t5) {
      this._$Ej &&= this._$Ej.forEach((t6) => this._$EC(t6, this[t6])), this._$EU();
    }
    updated(t5) {
    }
    firstUpdated(t5) {
    }
  };
  b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[d("elementProperties")] = /* @__PURE__ */ new Map(), b[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: b }), (a.reactiveElementVersions ??= []).push("2.0.4");

  // node_modules/@lit/reactive-element/decorators/property.js
  var o3 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
  var r3 = (t5 = o3, e10, r8) => {
    const { kind: n8, metadata: i6 } = r8;
    let s5 = globalThis.litPropertyMetadata.get(i6);
    if (void 0 === s5 && globalThis.litPropertyMetadata.set(i6, s5 = /* @__PURE__ */ new Map()), s5.set(r8.name, t5), "accessor" === n8) {
      const { name: o9 } = r8;
      return { set(r9) {
        const n9 = e10.get.call(this);
        e10.set.call(this, r9), this.requestUpdate(o9, n9, t5);
      }, init(e11) {
        return void 0 !== e11 && this.P(o9, void 0, t5), e11;
      } };
    }
    if ("setter" === n8) {
      const { name: o9 } = r8;
      return function(r9) {
        const n9 = this[o9];
        e10.call(this, r9), this.requestUpdate(o9, n9, t5);
      };
    }
    throw Error("Unsupported decorator location: " + n8);
  };
  function n3(t5) {
    return (e10, o9) => "object" == typeof o9 ? r3(t5, e10, o9) : ((t6, e11, o10) => {
      const r8 = e11.hasOwnProperty(o10);
      return e11.constructor.createProperty(o10, r8 ? { ...t6, wrapped: true } : t6), r8 ? Object.getOwnPropertyDescriptor(e11, o10) : void 0;
    })(t5, e10, o9);
  }

  // node_modules/@lit/reactive-element/decorators/state.js
  function r4(r8) {
    return n3({ ...r8, state: true, attribute: false });
  }

  // node_modules/@lit/reactive-element/decorators/base.js
  var e3 = (e10, t5, c4) => (c4.configurable = true, c4.enumerable = true, Reflect.decorate && "object" != typeof t5 && Object.defineProperty(e10, t5, c4), c4);

  // node_modules/@lit/reactive-element/decorators/query.js
  function e4(e10, r8) {
    return (n8, s5, i6) => {
      const o9 = (t5) => t5.renderRoot?.querySelector(e10) ?? null;
      if (r8) {
        const { get: e11, set: r9 } = "object" == typeof s5 ? n8 : i6 ?? (() => {
          const t5 = Symbol();
          return { get() {
            return this[t5];
          }, set(e12) {
            this[t5] = e12;
          } };
        })();
        return e3(n8, s5, { get() {
          let t5 = e11.call(this);
          return void 0 === t5 && (t5 = o9(this), (null !== t5 || this.hasUpdated) && r9.call(this, t5)), t5;
        } });
      }
      return e3(n8, s5, { get() {
        return o9(this);
      } });
    };
  }

  // node_modules/@lit/reactive-element/decorators/query-all.js
  var e5;
  function r5(r8) {
    return (n8, o9) => e3(n8, o9, { get() {
      return (this.renderRoot ?? (e5 ??= document.createDocumentFragment())).querySelectorAll(r8);
    } });
  }

  // node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
  function o4(o9) {
    return (e10, n8) => {
      const { slot: r8, selector: s5 } = o9 ?? {}, c4 = "slot" + (r8 ? `[name=${r8}]` : ":not([name])");
      return e3(e10, n8, { get() {
        const t5 = this.renderRoot?.querySelector(c4), e11 = t5?.assignedElements(o9) ?? [];
        return void 0 === s5 ? e11 : e11.filter((t6) => t6.matches(s5));
      } });
    };
  }

  // node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js
  function n4(n8) {
    return (o9, r8) => {
      const { slot: e10 } = n8 ?? {}, s5 = "slot" + (e10 ? `[name=${e10}]` : ":not([name])");
      return e3(o9, r8, { get() {
        const t5 = this.renderRoot?.querySelector(s5);
        return t5?.assignedNodes(n8) ?? [];
      } });
    };
  }

  // node_modules/lit-html/lit-html.js
  var t3 = globalThis;
  var i3 = t3.trustedTypes;
  var s2 = i3 ? i3.createPolicy("lit-html", { createHTML: (t5) => t5 }) : void 0;
  var e6 = "$lit$";
  var h2 = `lit$${(Math.random() + "").slice(9)}$`;
  var o5 = "?" + h2;
  var n5 = `<${o5}>`;
  var r6 = document;
  var l2 = () => r6.createComment("");
  var c3 = (t5) => null === t5 || "object" != typeof t5 && "function" != typeof t5;
  var a2 = Array.isArray;
  var u2 = (t5) => a2(t5) || "function" == typeof t5?.[Symbol.iterator];
  var d2 = "[ 	\n\f\r]";
  var f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var v = /-->/g;
  var _ = />/g;
  var m = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var p2 = /'/g;
  var g = /"/g;
  var $ = /^(?:script|style|textarea|title)$/i;
  var y2 = (t5) => (i6, ...s5) => ({ _$litType$: t5, strings: i6, values: s5 });
  var x = y2(1);
  var b2 = y2(2);
  var w = Symbol.for("lit-noChange");
  var T = Symbol.for("lit-nothing");
  var A = /* @__PURE__ */ new WeakMap();
  var E = r6.createTreeWalker(r6, 129);
  function C(t5, i6) {
    if (!Array.isArray(t5) || !t5.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return void 0 !== s2 ? s2.createHTML(i6) : i6;
  }
  var P = (t5, i6) => {
    const s5 = t5.length - 1, o9 = [];
    let r8, l4 = 2 === i6 ? "<svg>" : "", c4 = f2;
    for (let i7 = 0; i7 < s5; i7++) {
      const s6 = t5[i7];
      let a4, u4, d3 = -1, y3 = 0;
      for (; y3 < s6.length && (c4.lastIndex = y3, u4 = c4.exec(s6), null !== u4); )
        y3 = c4.lastIndex, c4 === f2 ? "!--" === u4[1] ? c4 = v : void 0 !== u4[1] ? c4 = _ : void 0 !== u4[2] ? ($.test(u4[2]) && (r8 = RegExp("</" + u4[2], "g")), c4 = m) : void 0 !== u4[3] && (c4 = m) : c4 === m ? ">" === u4[0] ? (c4 = r8 ?? f2, d3 = -1) : void 0 === u4[1] ? d3 = -2 : (d3 = c4.lastIndex - u4[2].length, a4 = u4[1], c4 = void 0 === u4[3] ? m : '"' === u4[3] ? g : p2) : c4 === g || c4 === p2 ? c4 = m : c4 === v || c4 === _ ? c4 = f2 : (c4 = m, r8 = void 0);
      const x2 = c4 === m && t5[i7 + 1].startsWith("/>") ? " " : "";
      l4 += c4 === f2 ? s6 + n5 : d3 >= 0 ? (o9.push(a4), s6.slice(0, d3) + e6 + s6.slice(d3) + h2 + x2) : s6 + h2 + (-2 === d3 ? i7 : x2);
    }
    return [C(t5, l4 + (t5[s5] || "<?>") + (2 === i6 ? "</svg>" : "")), o9];
  };
  var V = class _V {
    constructor({ strings: t5, _$litType$: s5 }, n8) {
      let r8;
      this.parts = [];
      let c4 = 0, a4 = 0;
      const u4 = t5.length - 1, d3 = this.parts, [f3, v2] = P(t5, s5);
      if (this.el = _V.createElement(f3, n8), E.currentNode = this.el.content, 2 === s5) {
        const t6 = this.el.content.firstChild;
        t6.replaceWith(...t6.childNodes);
      }
      for (; null !== (r8 = E.nextNode()) && d3.length < u4; ) {
        if (1 === r8.nodeType) {
          if (r8.hasAttributes())
            for (const t6 of r8.getAttributeNames())
              if (t6.endsWith(e6)) {
                const i6 = v2[a4++], s6 = r8.getAttribute(t6).split(h2), e10 = /([.?@])?(.*)/.exec(i6);
                d3.push({ type: 1, index: c4, name: e10[2], strings: s6, ctor: "." === e10[1] ? k : "?" === e10[1] ? H : "@" === e10[1] ? I : R }), r8.removeAttribute(t6);
              } else
                t6.startsWith(h2) && (d3.push({ type: 6, index: c4 }), r8.removeAttribute(t6));
          if ($.test(r8.tagName)) {
            const t6 = r8.textContent.split(h2), s6 = t6.length - 1;
            if (s6 > 0) {
              r8.textContent = i3 ? i3.emptyScript : "";
              for (let i6 = 0; i6 < s6; i6++)
                r8.append(t6[i6], l2()), E.nextNode(), d3.push({ type: 2, index: ++c4 });
              r8.append(t6[s6], l2());
            }
          }
        } else if (8 === r8.nodeType)
          if (r8.data === o5)
            d3.push({ type: 2, index: c4 });
          else {
            let t6 = -1;
            for (; -1 !== (t6 = r8.data.indexOf(h2, t6 + 1)); )
              d3.push({ type: 7, index: c4 }), t6 += h2.length - 1;
          }
        c4++;
      }
    }
    static createElement(t5, i6) {
      const s5 = r6.createElement("template");
      return s5.innerHTML = t5, s5;
    }
  };
  function N(t5, i6, s5 = t5, e10) {
    if (i6 === w)
      return i6;
    let h3 = void 0 !== e10 ? s5._$Co?.[e10] : s5._$Cl;
    const o9 = c3(i6) ? void 0 : i6._$litDirective$;
    return h3?.constructor !== o9 && (h3?._$AO?.(false), void 0 === o9 ? h3 = void 0 : (h3 = new o9(t5), h3._$AT(t5, s5, e10)), void 0 !== e10 ? (s5._$Co ??= [])[e10] = h3 : s5._$Cl = h3), void 0 !== h3 && (i6 = N(t5, h3._$AS(t5, i6.values), h3, e10)), i6;
  }
  var S2 = class {
    constructor(t5, i6) {
      this._$AV = [], this._$AN = void 0, this._$AD = t5, this._$AM = i6;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t5) {
      const { el: { content: i6 }, parts: s5 } = this._$AD, e10 = (t5?.creationScope ?? r6).importNode(i6, true);
      E.currentNode = e10;
      let h3 = E.nextNode(), o9 = 0, n8 = 0, l4 = s5[0];
      for (; void 0 !== l4; ) {
        if (o9 === l4.index) {
          let i7;
          2 === l4.type ? i7 = new M(h3, h3.nextSibling, this, t5) : 1 === l4.type ? i7 = new l4.ctor(h3, l4.name, l4.strings, this, t5) : 6 === l4.type && (i7 = new L(h3, this, t5)), this._$AV.push(i7), l4 = s5[++n8];
        }
        o9 !== l4?.index && (h3 = E.nextNode(), o9++);
      }
      return E.currentNode = r6, e10;
    }
    p(t5) {
      let i6 = 0;
      for (const s5 of this._$AV)
        void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t5, s5, i6), i6 += s5.strings.length - 2) : s5._$AI(t5[i6])), i6++;
    }
  };
  var M = class _M {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t5, i6, s5, e10) {
      this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t5, this._$AB = i6, this._$AM = s5, this.options = e10, this._$Cv = e10?.isConnected ?? true;
    }
    get parentNode() {
      let t5 = this._$AA.parentNode;
      const i6 = this._$AM;
      return void 0 !== i6 && 11 === t5?.nodeType && (t5 = i6.parentNode), t5;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t5, i6 = this) {
      t5 = N(this, t5, i6), c3(t5) ? t5 === T || null == t5 || "" === t5 ? (this._$AH !== T && this._$AR(), this._$AH = T) : t5 !== this._$AH && t5 !== w && this._(t5) : void 0 !== t5._$litType$ ? this.$(t5) : void 0 !== t5.nodeType ? this.T(t5) : u2(t5) ? this.k(t5) : this._(t5);
    }
    S(t5) {
      return this._$AA.parentNode.insertBefore(t5, this._$AB);
    }
    T(t5) {
      this._$AH !== t5 && (this._$AR(), this._$AH = this.S(t5));
    }
    _(t5) {
      this._$AH !== T && c3(this._$AH) ? this._$AA.nextSibling.data = t5 : this.T(r6.createTextNode(t5)), this._$AH = t5;
    }
    $(t5) {
      const { values: i6, _$litType$: s5 } = t5, e10 = "number" == typeof s5 ? this._$AC(t5) : (void 0 === s5.el && (s5.el = V.createElement(C(s5.h, s5.h[0]), this.options)), s5);
      if (this._$AH?._$AD === e10)
        this._$AH.p(i6);
      else {
        const t6 = new S2(e10, this), s6 = t6.u(this.options);
        t6.p(i6), this.T(s6), this._$AH = t6;
      }
    }
    _$AC(t5) {
      let i6 = A.get(t5.strings);
      return void 0 === i6 && A.set(t5.strings, i6 = new V(t5)), i6;
    }
    k(t5) {
      a2(this._$AH) || (this._$AH = [], this._$AR());
      const i6 = this._$AH;
      let s5, e10 = 0;
      for (const h3 of t5)
        e10 === i6.length ? i6.push(s5 = new _M(this.S(l2()), this.S(l2()), this, this.options)) : s5 = i6[e10], s5._$AI(h3), e10++;
      e10 < i6.length && (this._$AR(s5 && s5._$AB.nextSibling, e10), i6.length = e10);
    }
    _$AR(t5 = this._$AA.nextSibling, i6) {
      for (this._$AP?.(false, true, i6); t5 && t5 !== this._$AB; ) {
        const i7 = t5.nextSibling;
        t5.remove(), t5 = i7;
      }
    }
    setConnected(t5) {
      void 0 === this._$AM && (this._$Cv = t5, this._$AP?.(t5));
    }
  };
  var R = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t5, i6, s5, e10, h3) {
      this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t5, this.name = i6, this._$AM = e10, this.options = h3, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = T;
    }
    _$AI(t5, i6 = this, s5, e10) {
      const h3 = this.strings;
      let o9 = false;
      if (void 0 === h3)
        t5 = N(this, t5, i6, 0), o9 = !c3(t5) || t5 !== this._$AH && t5 !== w, o9 && (this._$AH = t5);
      else {
        const e11 = t5;
        let n8, r8;
        for (t5 = h3[0], n8 = 0; n8 < h3.length - 1; n8++)
          r8 = N(this, e11[s5 + n8], i6, n8), r8 === w && (r8 = this._$AH[n8]), o9 ||= !c3(r8) || r8 !== this._$AH[n8], r8 === T ? t5 = T : t5 !== T && (t5 += (r8 ?? "") + h3[n8 + 1]), this._$AH[n8] = r8;
      }
      o9 && !e10 && this.j(t5);
    }
    j(t5) {
      t5 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t5 ?? "");
    }
  };
  var k = class extends R {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t5) {
      this.element[this.name] = t5 === T ? void 0 : t5;
    }
  };
  var H = class extends R {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t5) {
      this.element.toggleAttribute(this.name, !!t5 && t5 !== T);
    }
  };
  var I = class extends R {
    constructor(t5, i6, s5, e10, h3) {
      super(t5, i6, s5, e10, h3), this.type = 5;
    }
    _$AI(t5, i6 = this) {
      if ((t5 = N(this, t5, i6, 0) ?? T) === w)
        return;
      const s5 = this._$AH, e10 = t5 === T && s5 !== T || t5.capture !== s5.capture || t5.once !== s5.once || t5.passive !== s5.passive, h3 = t5 !== T && (s5 === T || e10);
      e10 && this.element.removeEventListener(this.name, this, s5), h3 && this.element.addEventListener(this.name, this, t5), this._$AH = t5;
    }
    handleEvent(t5) {
      "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t5) : this._$AH.handleEvent(t5);
    }
  };
  var L = class {
    constructor(t5, i6, s5) {
      this.element = t5, this.type = 6, this._$AN = void 0, this._$AM = i6, this.options = s5;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t5) {
      N(this, t5);
    }
  };
  var Z = t3.litHtmlPolyfillSupport;
  Z?.(V, M), (t3.litHtmlVersions ??= []).push("3.1.2");
  var j = (t5, i6, s5) => {
    const e10 = s5?.renderBefore ?? i6;
    let h3 = e10._$litPart$;
    if (void 0 === h3) {
      const t6 = s5?.renderBefore ?? null;
      e10._$litPart$ = h3 = new M(i6.insertBefore(l2(), t6), t6, void 0, s5 ?? {});
    }
    return h3._$AI(t5), h3;
  };

  // node_modules/lit-element/lit-element.js
  var s3 = class extends b {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      const t5 = super.createRenderRoot();
      return this.renderOptions.renderBefore ??= t5.firstChild, t5;
    }
    update(t5) {
      const i6 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t5), this._$Do = j(i6, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(true);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(false);
    }
    render() {
      return w;
    }
  };
  s3._$litElement$ = true, s3["finalized", "finalized"] = true, globalThis.litElementHydrateSupport?.({ LitElement: s3 });
  var r7 = globalThis.litElementPolyfillSupport;
  r7?.({ LitElement: s3 });
  (globalThis.litElementVersions ??= []).push("4.0.4");

  // node_modules/lit-html/is-server.js
  var o6 = false;

  // node_modules/lit-html/directive.js
  var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e7 = (t5) => (...e10) => ({ _$litDirective$: t5, values: e10 });
  var i4 = class {
    constructor(t5) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t5, e10, i6) {
      this._$Ct = t5, this._$AM = e10, this._$Ci = i6;
    }
    _$AS(t5, e10) {
      return this.update(t5, e10);
    }
    update(t5, e10) {
      return this.render(...e10);
    }
  };

  // node_modules/lit-html/directives/class-map.js
  var e8 = e7(class extends i4 {
    constructor(t5) {
      if (super(t5), t5.type !== t4.ATTRIBUTE || "class" !== t5.name || t5.strings?.length > 2)
        throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
    }
    render(t5) {
      return " " + Object.keys(t5).filter((s5) => t5[s5]).join(" ") + " ";
    }
    update(s5, [i6]) {
      if (void 0 === this.st) {
        this.st = /* @__PURE__ */ new Set(), void 0 !== s5.strings && (this.nt = new Set(s5.strings.join(" ").split(/\s/).filter((t5) => "" !== t5)));
        for (const t5 in i6)
          i6[t5] && !this.nt?.has(t5) && this.st.add(t5);
        return this.render(i6);
      }
      const r8 = s5.element.classList;
      for (const t5 of this.st)
        t5 in i6 || (r8.remove(t5), this.st.delete(t5));
      for (const t5 in i6) {
        const s6 = !!i6[t5];
        s6 === this.st.has(t5) || this.nt?.has(t5) || (s6 ? (r8.add(t5), this.st.add(t5)) : (r8.remove(t5), this.st.delete(t5)));
      }
      return w;
    }
  });

  // node_modules/@material/web/internal/motion/animation.js
  var EASING = {
    STANDARD: "cubic-bezier(0.2, 0, 0, 1)",
    STANDARD_ACCELERATE: "cubic-bezier(.3,0,1,1)",
    STANDARD_DECELERATE: "cubic-bezier(0,0,0,1)",
    EMPHASIZED: "cubic-bezier(.3,0,0,1)",
    EMPHASIZED_ACCELERATE: "cubic-bezier(.3,0,.8,.15)",
    EMPHASIZED_DECELERATE: "cubic-bezier(.05,.7,.1,1)"
  };
  function createAnimationSignal() {
    let animationAbortController = null;
    return {
      start() {
        animationAbortController?.abort();
        animationAbortController = new AbortController();
        return animationAbortController.signal;
      },
      finish() {
        animationAbortController = null;
      }
    };
  }

  // node_modules/@material/web/field/internal/field.js
  var Field = class extends s3 {
    constructor() {
      super(...arguments);
      this.disabled = false;
      this.error = false;
      this.focused = false;
      this.label = "";
      this.populated = false;
      this.required = false;
      this.resizable = false;
      this.supportingText = "";
      this.errorText = "";
      this.count = -1;
      this.max = -1;
      this.hasStart = false;
      this.hasEnd = false;
      this.isAnimating = false;
      this.refreshErrorAlert = false;
      this.disableTransitions = false;
    }
    get counterText() {
      const countAsNumber = this.count ?? -1;
      const maxAsNumber = this.max ?? -1;
      if (countAsNumber < 0 || maxAsNumber <= 0) {
        return "";
      }
      return `${countAsNumber} / ${maxAsNumber}`;
    }
    get supportingOrErrorText() {
      return this.error && this.errorText ? this.errorText : this.supportingText;
    }
    /**
     * Re-announces the field's error supporting text to screen readers.
     *
     * Error text announces to screen readers anytime it is visible and changes.
     * Use the method to re-announce the message when the text has not changed,
     * but announcement is still needed (such as for `reportValidity()`).
     */
    reannounceError() {
      this.refreshErrorAlert = true;
    }
    update(props) {
      const isDisabledChanging = props.has("disabled") && props.get("disabled") !== void 0;
      if (isDisabledChanging) {
        this.disableTransitions = true;
      }
      if (this.disabled && this.focused) {
        props.set("focused", true);
        this.focused = false;
      }
      this.animateLabelIfNeeded({
        wasFocused: props.get("focused"),
        wasPopulated: props.get("populated")
      });
      super.update(props);
    }
    render() {
      const floatingLabel = this.renderLabel(
        /*isFloating*/
        true
      );
      const restingLabel = this.renderLabel(
        /*isFloating*/
        false
      );
      const outline = this.renderOutline?.(floatingLabel);
      const classes = {
        "disabled": this.disabled,
        "disable-transitions": this.disableTransitions,
        "error": this.error && !this.disabled,
        "focused": this.focused,
        "with-start": this.hasStart,
        "with-end": this.hasEnd,
        "populated": this.populated,
        "resizable": this.resizable,
        "required": this.required,
        "no-label": !this.label
      };
      return x`
      <div class="field ${e8(classes)}">
        <div class="container-overflow">
          ${this.renderBackground?.()} ${this.renderIndicator?.()} ${outline}
          <div class="container">
            <div class="start">
              <slot name="start"></slot>
            </div>
            <div class="middle">
              <div class="label-wrapper">
                ${restingLabel} ${outline ? T : floatingLabel}
              </div>
              <div class="content">
                <slot></slot>
              </div>
            </div>
            <div class="end">
              <slot name="end"></slot>
            </div>
          </div>
        </div>
        ${this.renderSupportingText()}
      </div>
    `;
    }
    updated(changed) {
      if (changed.has("supportingText") || changed.has("errorText") || changed.has("count") || changed.has("max")) {
        this.updateSlottedAriaDescribedBy();
      }
      if (this.refreshErrorAlert) {
        requestAnimationFrame(() => {
          this.refreshErrorAlert = false;
        });
      }
      if (this.disableTransitions) {
        requestAnimationFrame(() => {
          this.disableTransitions = false;
        });
      }
    }
    renderSupportingText() {
      const { supportingOrErrorText, counterText } = this;
      if (!supportingOrErrorText && !counterText) {
        return T;
      }
      const start = x`<span>${supportingOrErrorText}</span>`;
      const end = counterText ? x`<span class="counter">${counterText}</span>` : T;
      const shouldErrorAnnounce = this.error && this.errorText && !this.refreshErrorAlert;
      const role = shouldErrorAnnounce ? "alert" : T;
      return x`
      <div class="supporting-text" role=${role}>${start}${end}</div>
      <slot
        name="aria-describedby"
        @slotchange=${this.updateSlottedAriaDescribedBy}></slot>
    `;
    }
    updateSlottedAriaDescribedBy() {
      for (const element of this.slottedAriaDescribedBy) {
        j(x`${this.supportingOrErrorText} ${this.counterText}`, element);
        element.setAttribute("hidden", "");
      }
    }
    renderLabel(isFloating) {
      if (!this.label) {
        return T;
      }
      let visible;
      if (isFloating) {
        visible = this.focused || this.populated || this.isAnimating;
      } else {
        visible = !this.focused && !this.populated && !this.isAnimating;
      }
      const classes = {
        "hidden": !visible,
        "floating": isFloating,
        "resting": !isFloating
      };
      const labelText = `${this.label}${this.required ? "*" : ""}`;
      return x`
      <span class="label ${e8(classes)}" aria-hidden=${!visible}
        >${labelText}</span
      >
    `;
    }
    animateLabelIfNeeded({ wasFocused, wasPopulated }) {
      if (!this.label) {
        return;
      }
      wasFocused ?? (wasFocused = this.focused);
      wasPopulated ?? (wasPopulated = this.populated);
      const wasFloating = wasFocused || wasPopulated;
      const shouldBeFloating = this.focused || this.populated;
      if (wasFloating === shouldBeFloating) {
        return;
      }
      this.isAnimating = true;
      this.labelAnimation?.cancel();
      this.labelAnimation = this.floatingLabelEl?.animate(this.getLabelKeyframes(), { duration: 150, easing: EASING.STANDARD });
      this.labelAnimation?.addEventListener("finish", () => {
        this.isAnimating = false;
      });
    }
    getLabelKeyframes() {
      const { floatingLabelEl, restingLabelEl } = this;
      if (!floatingLabelEl || !restingLabelEl) {
        return [];
      }
      const { x: floatingX, y: floatingY, height: floatingHeight } = floatingLabelEl.getBoundingClientRect();
      const { x: restingX, y: restingY, height: restingHeight } = restingLabelEl.getBoundingClientRect();
      const floatingScrollWidth = floatingLabelEl.scrollWidth;
      const restingScrollWidth = restingLabelEl.scrollWidth;
      const scale = restingScrollWidth / floatingScrollWidth;
      const xDelta = restingX - floatingX;
      const yDelta = restingY - floatingY + Math.round((restingHeight - floatingHeight * scale) / 2);
      const restTransform = `translateX(${xDelta}px) translateY(${yDelta}px) scale(${scale})`;
      const floatTransform = `translateX(0) translateY(0) scale(1)`;
      const restingClientWidth = restingLabelEl.clientWidth;
      const isRestingClipped = restingScrollWidth > restingClientWidth;
      const width = isRestingClipped ? `${restingClientWidth / scale}px` : "";
      if (this.focused || this.populated) {
        return [
          { transform: restTransform, width },
          { transform: floatTransform, width }
        ];
      }
      return [
        { transform: floatTransform, width },
        { transform: restTransform, width }
      ];
    }
    getSurfacePositionClientRect() {
      return this.containerEl.getBoundingClientRect();
    }
  };
  __decorate([
    n3({ type: Boolean })
  ], Field.prototype, "disabled", void 0);
  __decorate([
    n3({ type: Boolean })
  ], Field.prototype, "error", void 0);
  __decorate([
    n3({ type: Boolean })
  ], Field.prototype, "focused", void 0);
  __decorate([
    n3()
  ], Field.prototype, "label", void 0);
  __decorate([
    n3({ type: Boolean })
  ], Field.prototype, "populated", void 0);
  __decorate([
    n3({ type: Boolean })
  ], Field.prototype, "required", void 0);
  __decorate([
    n3({ type: Boolean })
  ], Field.prototype, "resizable", void 0);
  __decorate([
    n3({ attribute: "supporting-text" })
  ], Field.prototype, "supportingText", void 0);
  __decorate([
    n3({ attribute: "error-text" })
  ], Field.prototype, "errorText", void 0);
  __decorate([
    n3({ type: Number })
  ], Field.prototype, "count", void 0);
  __decorate([
    n3({ type: Number })
  ], Field.prototype, "max", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "has-start" })
  ], Field.prototype, "hasStart", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "has-end" })
  ], Field.prototype, "hasEnd", void 0);
  __decorate([
    o4({ slot: "aria-describedby" })
  ], Field.prototype, "slottedAriaDescribedBy", void 0);
  __decorate([
    r4()
  ], Field.prototype, "isAnimating", void 0);
  __decorate([
    r4()
  ], Field.prototype, "refreshErrorAlert", void 0);
  __decorate([
    r4()
  ], Field.prototype, "disableTransitions", void 0);
  __decorate([
    e4(".label.floating")
  ], Field.prototype, "floatingLabelEl", void 0);
  __decorate([
    e4(".label.resting")
  ], Field.prototype, "restingLabelEl", void 0);
  __decorate([
    e4(".container")
  ], Field.prototype, "containerEl", void 0);

  // node_modules/@material/web/field/internal/filled-field.js
  var FilledField = class extends Field {
    renderBackground() {
      return x`
      <div class="background"></div>
      <div class="state-layer"></div>
    `;
    }
    renderIndicator() {
      return x`<div class="active-indicator"></div>`;
    }
  };

  // node_modules/@material/web/field/internal/filled-styles.css.js
  var styles = i`@layer styles{:host{--_active-indicator-color: var(--md-filled-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_active-indicator-height: var(--md-filled-field-active-indicator-height, 1px);--_bottom-space: var(--md-filled-field-bottom-space, 16px);--_container-color: var(--md-filled-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_content-color: var(--md-filled-field-content-color, var(--md-sys-color-on-surface, #1d1b20));--_content-font: var(--md-filled-field-content-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_content-line-height: var(--md-filled-field-content-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_content-size: var(--md-filled-field-content-size, var(--md-sys-typescale-body-large-size, 1rem));--_content-weight: var(--md-filled-field-content-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_disabled-active-indicator-color: var(--md-filled-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-indicator-height: var(--md-filled-field-disabled-active-indicator-height, 1px);--_disabled-active-indicator-opacity: var(--md-filled-field-disabled-active-indicator-opacity, 0.38);--_disabled-container-color: var(--md-filled-field-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-opacity: var(--md-filled-field-disabled-container-opacity, 0.04);--_disabled-content-color: var(--md-filled-field-disabled-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-content-opacity: var(--md-filled-field-disabled-content-opacity, 0.38);--_disabled-label-text-color: var(--md-filled-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-field-disabled-label-text-opacity, 0.38);--_disabled-leading-content-color: var(--md-filled-field-disabled-leading-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-content-opacity: var(--md-filled-field-disabled-leading-content-opacity, 0.38);--_disabled-supporting-text-color: var(--md-filled-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-filled-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-content-color: var(--md-filled-field-disabled-trailing-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-content-opacity: var(--md-filled-field-disabled-trailing-content-opacity, 0.38);--_error-active-indicator-color: var(--md-filled-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-content-color: var(--md-filled-field-error-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-active-indicator-color: var(--md-filled-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-content-color: var(--md-filled-field-error-focus-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-label-text-color: var(--md-filled-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-content-color: var(--md-filled-field-error-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-supporting-text-color: var(--md-filled-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-content-color: var(--md-filled-field-error-focus-trailing-content-color, var(--md-sys-color-error, #b3261e));--_error-hover-active-indicator-color: var(--md-filled-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-content-color: var(--md-filled-field-error-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-filled-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-content-color: var(--md-filled-field-error-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-state-layer-color: var(--md-filled-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-state-layer-opacity: var(--md-filled-field-error-hover-state-layer-opacity, 0.08);--_error-hover-supporting-text-color: var(--md-filled-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-content-color: var(--md-filled-field-error-hover-trailing-content-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-filled-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-content-color: var(--md-filled-field-error-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-supporting-text-color: var(--md-filled-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-content-color: var(--md-filled-field-error-trailing-content-color, var(--md-sys-color-error, #b3261e));--_focus-active-indicator-color: var(--md-filled-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_focus-active-indicator-height: var(--md-filled-field-focus-active-indicator-height, 3px);--_focus-content-color: var(--md-filled-field-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-filled-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-content-color: var(--md-filled-field-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-supporting-text-color: var(--md-filled-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-content-color: var(--md-filled-field-focus-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-active-indicator-color: var(--md-filled-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-active-indicator-height: var(--md-filled-field-hover-active-indicator-height, 1px);--_hover-content-color: var(--md-filled-field-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-filled-field-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-leading-content-color: var(--md-filled-field-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filled-field-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-filled-field-hover-state-layer-opacity, 0.08);--_hover-supporting-text-color: var(--md-filled-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-content-color: var(--md-filled-field-hover-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-filled-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-filled-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-filled-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-filled-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-filled-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-filled-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-content-color: var(--md-filled-field-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-space: var(--md-filled-field-leading-space, 16px);--_supporting-text-color: var(--md-filled-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-filled-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-leading-space: var(--md-filled-field-supporting-text-leading-space, 16px);--_supporting-text-line-height: var(--md-filled-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-filled-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-top-space: var(--md-filled-field-supporting-text-top-space, 4px);--_supporting-text-trailing-space: var(--md-filled-field-supporting-text-trailing-space, 16px);--_supporting-text-weight: var(--md-filled-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_top-space: var(--md-filled-field-top-space, 16px);--_trailing-content-color: var(--md-filled-field-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-space: var(--md-filled-field-trailing-space, 16px);--_with-label-bottom-space: var(--md-filled-field-with-label-bottom-space, 8px);--_with-label-top-space: var(--md-filled-field-with-label-top-space, 8px);--_container-shape-start-start: var(--md-filled-field-container-shape-start-start, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-filled-field-container-shape-start-end, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-filled-field-container-shape-end-end, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-filled-field-container-shape-end-start, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-none, 0px)))}.background,.state-layer{border-radius:inherit;inset:0;pointer-events:none;position:absolute}.background{background:var(--_container-color)}.state-layer{visibility:hidden}.field:not(.disabled):hover .state-layer{visibility:visible}.label.floating{position:absolute;top:var(--_with-label-top-space)}.field:not(.with-start) .label-wrapper{margin-inline-start:var(--_leading-space)}.field:not(.with-end) .label-wrapper{margin-inline-end:var(--_trailing-space)}.active-indicator{inset:auto 0 0 0;pointer-events:none;position:absolute;width:100%;z-index:1}.active-indicator::before,.active-indicator::after{border-bottom:var(--_active-indicator-height) solid var(--_active-indicator-color);inset:auto 0 0 0;content:"";position:absolute;width:100%}.active-indicator::after{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .active-indicator::after{opacity:1}.field:not(.with-start) .content ::slotted(*){padding-inline-start:var(--_leading-space)}.field:not(.with-end) .content ::slotted(*){padding-inline-end:var(--_trailing-space)}.field:not(.no-label) .content ::slotted(:not(textarea)){padding-bottom:var(--_with-label-bottom-space);padding-top:calc(var(--_with-label-top-space) + var(--_label-text-populated-line-height))}.field:not(.no-label) .content ::slotted(textarea){margin-bottom:var(--_with-label-bottom-space);margin-top:calc(var(--_with-label-top-space) + var(--_label-text-populated-line-height))}:hover .active-indicator::before{border-bottom-color:var(--_hover-active-indicator-color);border-bottom-width:var(--_hover-active-indicator-height)}.active-indicator::after{border-bottom-color:var(--_focus-active-indicator-color);border-bottom-width:var(--_focus-active-indicator-height)}:hover .state-layer{background:var(--_hover-state-layer-color);opacity:var(--_hover-state-layer-opacity)}.disabled .active-indicator::before{border-bottom-color:var(--_disabled-active-indicator-color);border-bottom-width:var(--_disabled-active-indicator-height);opacity:var(--_disabled-active-indicator-opacity)}.disabled .background{background:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}.error .active-indicator::before{border-bottom-color:var(--_error-active-indicator-color)}.error:hover .active-indicator::before{border-bottom-color:var(--_error-hover-active-indicator-color)}.error:hover .state-layer{background:var(--_error-hover-state-layer-color);opacity:var(--_error-hover-state-layer-opacity)}.error .active-indicator::after{border-bottom-color:var(--_error-focus-active-indicator-color)}.resizable .container{bottom:var(--_focus-active-indicator-height);clip-path:inset(var(--_focus-active-indicator-height) 0 0 0)}.resizable .container>*{top:var(--_focus-active-indicator-height)}}@layer hcm{@media(forced-colors: active){.disabled .active-indicator::before{border-color:GrayText;opacity:1}}}/*# sourceMappingURL=filled-styles.css.map */
`;

  // node_modules/@material/web/field/internal/shared-styles.css.js
  var styles2 = i`:host{display:inline-flex;resize:both}.field{display:flex;flex:1;flex-direction:column;writing-mode:horizontal-tb;max-width:100%}.container-overflow{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start);display:flex;height:100%;position:relative}.container{align-items:center;border-radius:inherit;display:flex;flex:1;max-height:100%;min-height:100%;min-width:min-content;position:relative}.field,.container-overflow{resize:inherit}.resizable:not(.disabled) .container{resize:inherit;overflow:hidden}.disabled{pointer-events:none}@layer styles{.start,.middle,.end{display:flex;box-sizing:border-box;height:100%;position:relative}.start{color:var(--_leading-content-color)}.end{color:var(--_trailing-content-color)}.start,.end{align-items:center;justify-content:center}.with-start .start,.with-end .end{min-width:48px}.with-start .start{margin-inline-end:4px}.with-end .end{margin-inline-start:4px}.middle{align-items:stretch;align-self:baseline;flex:1}.content{color:var(--_content-color);display:flex;flex:1;opacity:0;transition:opacity 83ms cubic-bezier(0.2, 0, 0, 1)}.no-label .content,.focused .content,.populated .content{opacity:1;transition-delay:67ms}:is(.disabled,.disable-transitions) .content{transition:none}.content ::slotted(*){all:unset;color:currentColor;font-family:var(--_content-font);font-size:var(--_content-size);line-height:var(--_content-line-height);font-weight:var(--_content-weight);width:100%;overflow-wrap:revert;white-space:revert}.content ::slotted(:not(textarea)){padding-top:var(--_top-space);padding-bottom:var(--_bottom-space)}.content ::slotted(textarea){margin-top:var(--_top-space);margin-bottom:var(--_bottom-space)}:hover .content{color:var(--_hover-content-color)}:hover .start{color:var(--_hover-leading-content-color)}:hover .end{color:var(--_hover-trailing-content-color)}.focused .content{color:var(--_focus-content-color)}.focused .start{color:var(--_focus-leading-content-color)}.focused .end{color:var(--_focus-trailing-content-color)}.disabled .content{color:var(--_disabled-content-color)}.disabled.no-label .content,.disabled.focused .content,.disabled.populated .content{opacity:var(--_disabled-content-opacity)}.disabled .start{color:var(--_disabled-leading-content-color);opacity:var(--_disabled-leading-content-opacity)}.disabled .end{color:var(--_disabled-trailing-content-color);opacity:var(--_disabled-trailing-content-opacity)}.error .content{color:var(--_error-content-color)}.error .start{color:var(--_error-leading-content-color)}.error .end{color:var(--_error-trailing-content-color)}.error:hover .content{color:var(--_error-hover-content-color)}.error:hover .start{color:var(--_error-hover-leading-content-color)}.error:hover .end{color:var(--_error-hover-trailing-content-color)}.error.focused .content{color:var(--_error-focus-content-color)}.error.focused .start{color:var(--_error-focus-leading-content-color)}.error.focused .end{color:var(--_error-focus-trailing-content-color)}}@layer hcm{@media(forced-colors: active){.disabled :is(.start,.content,.end){color:GrayText;opacity:1}}}@layer styles{.label{box-sizing:border-box;color:var(--_label-text-color);overflow:hidden;max-width:100%;text-overflow:ellipsis;white-space:nowrap;z-index:1;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);width:min-content}.label-wrapper{inset:0;pointer-events:none;position:absolute}.label.resting{position:absolute;top:var(--_top-space)}.label.floating{font-size:var(--_label-text-populated-size);line-height:var(--_label-text-populated-line-height);transform-origin:top left}.label.hidden{opacity:0}.no-label .label{display:none}.label-wrapper{inset:0;position:absolute;text-align:initial}:hover .label{color:var(--_hover-label-text-color)}.focused .label{color:var(--_focus-label-text-color)}.disabled .label{color:var(--_disabled-label-text-color)}.disabled .label:not(.hidden){opacity:var(--_disabled-label-text-opacity)}.error .label{color:var(--_error-label-text-color)}.error:hover .label{color:var(--_error-hover-label-text-color)}.error.focused .label{color:var(--_error-focus-label-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .label:not(.hidden){color:GrayText;opacity:1}}}@layer styles{.supporting-text{color:var(--_supporting-text-color);display:flex;font-family:var(--_supporting-text-font);font-size:var(--_supporting-text-size);line-height:var(--_supporting-text-line-height);font-weight:var(--_supporting-text-weight);gap:16px;justify-content:space-between;padding-inline-start:var(--_supporting-text-leading-space);padding-inline-end:var(--_supporting-text-trailing-space);padding-top:var(--_supporting-text-top-space)}.supporting-text :nth-child(2){flex-shrink:0}:hover .supporting-text{color:var(--_hover-supporting-text-color)}.focus .supporting-text{color:var(--_focus-supporting-text-color)}.disabled .supporting-text{color:var(--_disabled-supporting-text-color);opacity:var(--_disabled-supporting-text-opacity)}.error .supporting-text{color:var(--_error-supporting-text-color)}.error:hover .supporting-text{color:var(--_error-hover-supporting-text-color)}.error.focus .supporting-text{color:var(--_error-focus-supporting-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .supporting-text{color:GrayText;opacity:1}}}/*# sourceMappingURL=shared-styles.css.map */
`;

  // node_modules/@material/web/field/filled-field.js
  var MdFilledField = class MdFilledField2 extends FilledField {
  };
  MdFilledField.styles = [styles2, styles];
  MdFilledField = __decorate([
    t("md-filled-field")
  ], MdFilledField);

  // node_modules/lit-html/static.js
  var e9 = Symbol.for("");
  var o7 = (t5) => {
    if (t5?.r === e9)
      return t5?._$litStatic$;
  };
  var s4 = (t5, ...r8) => ({ _$litStatic$: r8.reduce((r9, e10, o9) => r9 + ((t6) => {
    if (void 0 !== t6._$litStatic$)
      return t6._$litStatic$;
    throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t6}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
  })(e10) + t5[o9 + 1], t5[0]), r: e9 });
  var a3 = /* @__PURE__ */ new Map();
  var l3 = (t5) => (r8, ...e10) => {
    const i6 = e10.length;
    let s5, l4;
    const n8 = [], u4 = [];
    let c4, $2 = 0, f3 = false;
    for (; $2 < i6; ) {
      for (c4 = r8[$2]; $2 < i6 && void 0 !== (l4 = e10[$2], s5 = o7(l4)); )
        c4 += s5 + r8[++$2], f3 = true;
      $2 !== i6 && u4.push(l4), n8.push(c4), $2++;
    }
    if ($2 === i6 && n8.push(r8[i6]), f3) {
      const t6 = n8.join("$$lit$$");
      void 0 === (r8 = a3.get(t6)) && (n8.raw = n8, a3.set(t6, r8 = n8)), e10 = u4;
    }
    return t5(r8, ...e10);
  };
  var n6 = l3(x);
  var u3 = l3(b2);

  // node_modules/@material/web/elevation/internal/elevation.js
  var Elevation = class extends s3 {
    connectedCallback() {
      super.connectedCallback();
      this.setAttribute("aria-hidden", "true");
    }
    render() {
      return x`<span class="shadow"></span>`;
    }
  };

  // node_modules/@material/web/elevation/internal/elevation-styles.css.js
  var styles3 = i`:host{display:flex;pointer-events:none}:host,.shadow,.shadow::before,.shadow::after{border-radius:inherit;inset:0;position:absolute;transition-duration:inherit;transition-property:inherit;transition-timing-function:inherit}.shadow::before,.shadow::after{content:"";transition-property:box-shadow,opacity;--_level: var(--md-elevation-level, 0);--_shadow-color: var(--md-elevation-shadow-color, var(--md-sys-color-shadow, #000))}.shadow::before{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 3,1) + 2*clamp(0,var(--_level) - 4,1))) calc(1px*(2*clamp(0,var(--_level),1) + clamp(0,var(--_level) - 2,1) + clamp(0,var(--_level) - 4,1))) 0px var(--_shadow-color);opacity:.3}.shadow::after{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 1,1) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(3*clamp(0,var(--_level),2) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(clamp(0,var(--_level),4) + 2*clamp(0,var(--_level) - 4,1))) var(--_shadow-color);opacity:.15}/*# sourceMappingURL=elevation-styles.css.map */
`;

  // node_modules/@material/web/elevation/elevation.js
  var MdElevation = class MdElevation2 extends Elevation {
  };
  MdElevation.styles = [styles3];
  MdElevation = __decorate([
    t("md-elevation")
  ], MdElevation);

  // node_modules/@material/web/internal/controller/attachable-controller.js
  var ATTACHABLE_CONTROLLER = Symbol("attachableController");
  var FOR_ATTRIBUTE_OBSERVER;
  if (!o6) {
    FOR_ATTRIBUTE_OBSERVER = new MutationObserver((records) => {
      for (const record of records) {
        record.target[ATTACHABLE_CONTROLLER]?.hostConnected();
      }
    });
  }
  var AttachableController = class {
    get htmlFor() {
      return this.host.getAttribute("for");
    }
    set htmlFor(htmlFor) {
      if (htmlFor === null) {
        this.host.removeAttribute("for");
      } else {
        this.host.setAttribute("for", htmlFor);
      }
    }
    get control() {
      if (this.host.hasAttribute("for")) {
        if (!this.htmlFor || !this.host.isConnected) {
          return null;
        }
        return this.host.getRootNode().querySelector(`#${this.htmlFor}`);
      }
      return this.currentControl || this.host.parentElement;
    }
    set control(control) {
      if (control) {
        this.attach(control);
      } else {
        this.detach();
      }
    }
    /**
     * Creates a new controller for an `Attachable` element.
     *
     * @param host The `Attachable` element.
     * @param onControlChange A callback with two parameters for the previous and
     *     next control. An `Attachable` element may perform setup or teardown
     *     logic whenever the control changes.
     */
    constructor(host, onControlChange) {
      this.host = host;
      this.onControlChange = onControlChange;
      this.currentControl = null;
      host.addController(this);
      host[ATTACHABLE_CONTROLLER] = this;
      FOR_ATTRIBUTE_OBSERVER?.observe(host, { attributeFilter: ["for"] });
    }
    attach(control) {
      if (control === this.currentControl) {
        return;
      }
      this.setCurrentControl(control);
      this.host.removeAttribute("for");
    }
    detach() {
      this.setCurrentControl(null);
      this.host.setAttribute("for", "");
    }
    /** @private */
    hostConnected() {
      this.setCurrentControl(this.control);
    }
    /** @private */
    hostDisconnected() {
      this.setCurrentControl(null);
    }
    setCurrentControl(control) {
      this.onControlChange(this.currentControl, control);
      this.currentControl = control;
    }
  };

  // node_modules/@material/web/focus/internal/focus-ring.js
  var EVENTS = ["focusin", "focusout", "pointerdown"];
  var FocusRing = class extends s3 {
    constructor() {
      super(...arguments);
      this.visible = false;
      this.inward = false;
      this.attachableController = new AttachableController(this, this.onControlChange.bind(this));
    }
    get htmlFor() {
      return this.attachableController.htmlFor;
    }
    set htmlFor(htmlFor) {
      this.attachableController.htmlFor = htmlFor;
    }
    get control() {
      return this.attachableController.control;
    }
    set control(control) {
      this.attachableController.control = control;
    }
    attach(control) {
      this.attachableController.attach(control);
    }
    detach() {
      this.attachableController.detach();
    }
    connectedCallback() {
      super.connectedCallback();
      this.setAttribute("aria-hidden", "true");
    }
    /** @private */
    handleEvent(event) {
      if (event[HANDLED_BY_FOCUS_RING]) {
        return;
      }
      switch (event.type) {
        default:
          return;
        case "focusin":
          this.visible = this.control?.matches(":focus-visible") ?? false;
          break;
        case "focusout":
        case "pointerdown":
          this.visible = false;
          break;
      }
      event[HANDLED_BY_FOCUS_RING] = true;
    }
    onControlChange(prev, next) {
      if (o6)
        return;
      for (const event of EVENTS) {
        prev?.removeEventListener(event, this);
        next?.addEventListener(event, this);
      }
    }
    update(changed) {
      if (changed.has("visible")) {
        this.dispatchEvent(new Event("visibility-changed"));
      }
      super.update(changed);
    }
  };
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], FocusRing.prototype, "visible", void 0);
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], FocusRing.prototype, "inward", void 0);
  var HANDLED_BY_FOCUS_RING = Symbol("handledByFocusRing");

  // node_modules/@material/web/focus/internal/focus-ring-styles.css.js
  var styles4 = i`:host{animation-delay:0s,calc(var(--md-focus-ring-duration, 600ms)*.25);animation-duration:calc(var(--md-focus-ring-duration, 600ms)*.25),calc(var(--md-focus-ring-duration, 600ms)*.75);animation-timing-function:cubic-bezier(0.2, 0, 0, 1);box-sizing:border-box;color:var(--md-focus-ring-color, var(--md-sys-color-secondary, #625b71));display:none;pointer-events:none;position:absolute}:host([visible]){display:flex}:host(:not([inward])){animation-name:outward-grow,outward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));inset:calc(-1*var(--md-focus-ring-outward-offset, 2px));outline:var(--md-focus-ring-width, 3px) solid currentColor}:host([inward]){animation-name:inward-grow,inward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border:var(--md-focus-ring-width, 3px) solid currentColor;inset:var(--md-focus-ring-inward-offset, 0px)}@keyframes outward-grow{from{outline-width:0}to{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes outward-shrink{from{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-grow{from{border-width:0}to{border-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-shrink{from{border-width:var(--md-focus-ring-active-width, 8px)}}@media(prefers-reduced-motion){:host{animation:none}}/*# sourceMappingURL=focus-ring-styles.css.map */
`;

  // node_modules/@material/web/focus/md-focus-ring.js
  var MdFocusRing = class MdFocusRing2 extends FocusRing {
  };
  MdFocusRing.styles = [styles4];
  MdFocusRing = __decorate([
    t("md-focus-ring")
  ], MdFocusRing);

  // node_modules/lit-html/directives/style-map.js
  var n7 = "important";
  var i5 = " !" + n7;
  var o8 = e7(class extends i4 {
    constructor(t5) {
      if (super(t5), t5.type !== t4.ATTRIBUTE || "style" !== t5.name || t5.strings?.length > 2)
        throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
    }
    render(t5) {
      return Object.keys(t5).reduce((e10, r8) => {
        const s5 = t5[r8];
        return null == s5 ? e10 : e10 + `${r8 = r8.includes("-") ? r8 : r8.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s5};`;
      }, "");
    }
    update(e10, [r8]) {
      const { style: s5 } = e10.element;
      if (void 0 === this.ft)
        return this.ft = new Set(Object.keys(r8)), this.render(r8);
      for (const t5 of this.ft)
        null == r8[t5] && (this.ft.delete(t5), t5.includes("-") ? s5.removeProperty(t5) : s5[t5] = null);
      for (const t5 in r8) {
        const e11 = r8[t5];
        if (null != e11) {
          this.ft.add(t5);
          const r9 = "string" == typeof e11 && e11.endsWith(i5);
          t5.includes("-") || r9 ? s5.setProperty(t5, r9 ? e11.slice(0, -11) : e11, r9 ? n7 : "") : s5[t5] = e11;
        }
      }
      return w;
    }
  });

  // node_modules/@material/web/list/internal/list-navigation-helpers.js
  function activateFirstItem(items, isActivatable = isItemNotDisabled) {
    const firstItem = getFirstActivatableItem(items, isActivatable);
    if (firstItem) {
      firstItem.tabIndex = 0;
      firstItem.focus();
    }
    return firstItem;
  }
  function activateLastItem(items, isActivatable = isItemNotDisabled) {
    const lastItem = getLastActivatableItem(items, isActivatable);
    if (lastItem) {
      lastItem.tabIndex = 0;
      lastItem.focus();
    }
    return lastItem;
  }
  function getActiveItem(items, isActivatable = isItemNotDisabled) {
    for (let i6 = 0; i6 < items.length; i6++) {
      const item = items[i6];
      if (item.tabIndex === 0 && isActivatable(item)) {
        return {
          item,
          index: i6
        };
      }
    }
    return null;
  }
  function getFirstActivatableItem(items, isActivatable = isItemNotDisabled) {
    for (const item of items) {
      if (isActivatable(item)) {
        return item;
      }
    }
    return null;
  }
  function getLastActivatableItem(items, isActivatable = isItemNotDisabled) {
    for (let i6 = items.length - 1; i6 >= 0; i6--) {
      const item = items[i6];
      if (isActivatable(item)) {
        return item;
      }
    }
    return null;
  }
  function getNextItem(items, index, isActivatable = isItemNotDisabled) {
    for (let i6 = 1; i6 < items.length; i6++) {
      const nextIndex = (i6 + index) % items.length;
      const item = items[nextIndex];
      if (isActivatable(item)) {
        return item;
      }
    }
    return items[index] ? items[index] : null;
  }
  function getPrevItem(items, index, isActivatable = isItemNotDisabled) {
    for (let i6 = 1; i6 < items.length; i6++) {
      const prevIndex = (index - i6 + items.length) % items.length;
      const item = items[prevIndex];
      if (isActivatable(item)) {
        return item;
      }
    }
    return items[index] ? items[index] : null;
  }
  function activateNextItem(items, activeItemRecord, isActivatable = isItemNotDisabled) {
    if (activeItemRecord) {
      const next = getNextItem(items, activeItemRecord.index, isActivatable);
      if (next) {
        next.tabIndex = 0;
        next.focus();
      }
      return next;
    } else {
      return activateFirstItem(items, isActivatable);
    }
  }
  function activatePreviousItem(items, activeItemRecord, isActivatable = isItemNotDisabled) {
    if (activeItemRecord) {
      const prev = getPrevItem(items, activeItemRecord.index, isActivatable);
      if (prev) {
        prev.tabIndex = 0;
        prev.focus();
      }
      return prev;
    } else {
      return activateLastItem(items, isActivatable);
    }
  }
  function isItemNotDisabled(item) {
    return !item.disabled;
  }

  // node_modules/@material/web/list/internal/list-controller.js
  var NavigableKeys = {
    ArrowDown: "ArrowDown",
    ArrowLeft: "ArrowLeft",
    ArrowUp: "ArrowUp",
    ArrowRight: "ArrowRight",
    Home: "Home",
    End: "End"
  };
  var ListController = class {
    constructor(config) {
      this.handleKeydown = (event) => {
        const key = event.key;
        if (event.defaultPrevented || !this.isNavigableKey(key)) {
          return;
        }
        const items = this.items;
        if (!items.length) {
          return;
        }
        const activeItemRecord = getActiveItem(items, this.isActivatable);
        if (activeItemRecord) {
          activeItemRecord.item.tabIndex = -1;
        }
        event.preventDefault();
        const isRtl2 = this.isRtl();
        const inlinePrevious = isRtl2 ? NavigableKeys.ArrowRight : NavigableKeys.ArrowLeft;
        const inlineNext = isRtl2 ? NavigableKeys.ArrowLeft : NavigableKeys.ArrowRight;
        switch (key) {
          case NavigableKeys.ArrowDown:
          case inlineNext:
            activateNextItem(items, activeItemRecord, this.isActivatable);
            break;
          case NavigableKeys.ArrowUp:
          case inlinePrevious:
            activatePreviousItem(items, activeItemRecord, this.isActivatable);
            break;
          case NavigableKeys.Home:
            activateFirstItem(items, this.isActivatable);
            break;
          case NavigableKeys.End:
            activateLastItem(items, this.isActivatable);
            break;
          default:
            break;
        }
      };
      this.onDeactivateItems = () => {
        const items = this.items;
        for (const item of items) {
          this.deactivateItem(item);
        }
      };
      this.onRequestActivation = (event) => {
        this.onDeactivateItems();
        const target = event.target;
        this.activateItem(target);
        target.focus();
      };
      this.onSlotchange = () => {
        const items = this.items;
        let encounteredActivated = false;
        for (const item of items) {
          const isActivated = !item.disabled && item.tabIndex > -1;
          if (isActivated && !encounteredActivated) {
            encounteredActivated = true;
            item.tabIndex = 0;
            continue;
          }
          item.tabIndex = -1;
        }
        if (encounteredActivated) {
          return;
        }
        const firstActivatableItem = getFirstActivatableItem(items, this.isActivatable);
        if (!firstActivatableItem) {
          return;
        }
        firstActivatableItem.tabIndex = 0;
      };
      const { isItem, getPossibleItems, isRtl, deactivateItem, activateItem, isNavigableKey, isActivatable } = config;
      this.isItem = isItem;
      this.getPossibleItems = getPossibleItems;
      this.isRtl = isRtl;
      this.deactivateItem = deactivateItem;
      this.activateItem = activateItem;
      this.isNavigableKey = isNavigableKey;
      this.isActivatable = isActivatable;
    }
    /**
     * The items being managed by the list. Additionally, attempts to see if the
     * object has a sub-item in the `.item` property.
     */
    get items() {
      const maybeItems = this.getPossibleItems();
      const items = [];
      for (const itemOrParent of maybeItems) {
        const isItem = this.isItem(itemOrParent);
        if (isItem) {
          items.push(itemOrParent);
          continue;
        }
        const subItem = itemOrParent.item;
        if (subItem && this.isItem(subItem)) {
          items.push(subItem);
        }
      }
      return items;
    }
    /**
     * Activates the next item in the list. If at the end of the list, the first
     * item will be activated.
     *
     * @return The activated list item or `null` if there are no items.
     */
    activateNextItem() {
      const items = this.items;
      const activeItemRecord = getActiveItem(items, this.isActivatable);
      if (activeItemRecord) {
        activeItemRecord.item.tabIndex = -1;
      }
      return activateNextItem(items, activeItemRecord, this.isActivatable);
    }
    /**
     * Activates the previous item in the list. If at the start of the list, the
     * last item will be activated.
     *
     * @return The activated list item or `null` if there are no items.
     */
    activatePreviousItem() {
      const items = this.items;
      const activeItemRecord = getActiveItem(items, this.isActivatable);
      if (activeItemRecord) {
        activeItemRecord.item.tabIndex = -1;
      }
      return activatePreviousItem(items, activeItemRecord, this.isActivatable);
    }
  };

  // node_modules/@material/web/menu/internal/controllers/shared.js
  function createCloseMenuEvent(initiator, reason) {
    return new CustomEvent("close-menu", {
      bubbles: true,
      composed: true,
      detail: { initiator, reason, itemPath: [initiator] }
    });
  }
  var createDefaultCloseMenuEvent = createCloseMenuEvent;
  var SelectionKey = {
    SPACE: "Space",
    ENTER: "Enter"
  };
  var CloseReason = {
    CLICK_SELECTION: "click-selection",
    KEYDOWN: "keydown"
  };
  var KeydownCloseKey = {
    ESCAPE: "Escape",
    SPACE: SelectionKey.SPACE,
    ENTER: SelectionKey.ENTER
  };
  function isClosableKey(code) {
    return Object.values(KeydownCloseKey).some((value) => value === code);
  }
  function isSelectableKey(code) {
    return Object.values(SelectionKey).some((value) => value === code);
  }
  function isElementInSubtree(target, container) {
    const focusEv = new Event("md-contains", { bubbles: true, composed: true });
    let composedPath = [];
    const listener = (ev) => {
      composedPath = ev.composedPath();
    };
    container.addEventListener("md-contains", listener);
    target.dispatchEvent(focusEv);
    container.removeEventListener("md-contains", listener);
    const isContained = composedPath.length > 0;
    return isContained;
  }
  var FocusState = {
    NONE: "none",
    LIST_ROOT: "list-root",
    FIRST_ITEM: "first-item",
    LAST_ITEM: "last-item"
  };

  // node_modules/@material/web/menu/internal/controllers/surfacePositionController.js
  var Corner = {
    END_START: "end-start",
    END_END: "end-end",
    START_START: "start-start",
    START_END: "start-end"
  };
  var SurfacePositionController = class {
    /**
     * @param host The host to connect the controller to.
     * @param getProperties A function that returns the properties for the
     * controller.
     */
    constructor(host, getProperties) {
      this.host = host;
      this.getProperties = getProperties;
      this.surfaceStylesInternal = {
        "display": "none"
      };
      this.lastValues = {
        isOpen: false
      };
      this.host.addController(this);
    }
    /**
     * The StyleInfo map to apply to the surface via Lit's stylemap
     */
    get surfaceStyles() {
      return this.surfaceStylesInternal;
    }
    /**
     * Calculates the surface's new position required so that the surface's
     * `surfaceCorner` aligns to the anchor's `anchorCorner` while keeping the
     * surface inside the window viewport. This positioning also respects RTL by
     * checking `getComputedStyle()` on the surface element.
     */
    async position() {
      const { surfaceEl, anchorEl, anchorCorner: anchorCornerRaw, surfaceCorner: surfaceCornerRaw, positioning, xOffset, yOffset, repositionStrategy } = this.getProperties();
      const anchorCorner = anchorCornerRaw.toLowerCase().trim();
      const surfaceCorner = surfaceCornerRaw.toLowerCase().trim();
      if (!surfaceEl || !anchorEl) {
        return;
      }
      const windowInnerWidth = window.innerWidth;
      const windowInnerHeight = window.innerHeight;
      const div = document.createElement("div");
      div.style.opacity = "0";
      div.style.position = "fixed";
      div.style.display = "block";
      div.style.inset = "0";
      document.body.appendChild(div);
      const scrollbarTestRect = div.getBoundingClientRect();
      div.remove();
      const blockScrollbarHeight = window.innerHeight - scrollbarTestRect.bottom;
      const inlineScrollbarWidth = window.innerWidth - scrollbarTestRect.right;
      this.surfaceStylesInternal = {
        "display": "block",
        "opacity": "0"
      };
      this.host.requestUpdate();
      await this.host.updateComplete;
      if (surfaceEl.popover && surfaceEl.isConnected) {
        surfaceEl.showPopover();
      }
      const surfaceRect = surfaceEl.getSurfacePositionClientRect ? surfaceEl.getSurfacePositionClientRect() : surfaceEl.getBoundingClientRect();
      const anchorRect = anchorEl.getSurfacePositionClientRect ? anchorEl.getSurfacePositionClientRect() : anchorEl.getBoundingClientRect();
      const [surfaceBlock, surfaceInline] = surfaceCorner.split("-");
      const [anchorBlock, anchorInline] = anchorCorner.split("-");
      const isLTR = getComputedStyle(surfaceEl).direction === "ltr";
      let { blockInset, blockOutOfBoundsCorrection, surfaceBlockProperty } = this.calculateBlock({
        surfaceRect,
        anchorRect,
        anchorBlock,
        surfaceBlock,
        yOffset,
        positioning,
        windowInnerHeight,
        blockScrollbarHeight
      });
      if (blockOutOfBoundsCorrection) {
        const flippedSurfaceBlock = surfaceBlock === "start" ? "end" : "start";
        const flippedAnchorBlock = anchorBlock === "start" ? "end" : "start";
        const flippedBlock = this.calculateBlock({
          surfaceRect,
          anchorRect,
          anchorBlock: flippedAnchorBlock,
          surfaceBlock: flippedSurfaceBlock,
          yOffset,
          positioning,
          windowInnerHeight,
          blockScrollbarHeight
        });
        if (blockOutOfBoundsCorrection > flippedBlock.blockOutOfBoundsCorrection) {
          blockInset = flippedBlock.blockInset;
          blockOutOfBoundsCorrection = flippedBlock.blockOutOfBoundsCorrection;
          surfaceBlockProperty = flippedBlock.surfaceBlockProperty;
        }
      }
      let { inlineInset, inlineOutOfBoundsCorrection, surfaceInlineProperty } = this.calculateInline({
        surfaceRect,
        anchorRect,
        anchorInline,
        surfaceInline,
        xOffset,
        positioning,
        isLTR,
        windowInnerWidth,
        inlineScrollbarWidth
      });
      if (inlineOutOfBoundsCorrection) {
        const flippedSurfaceInline = surfaceInline === "start" ? "end" : "start";
        const flippedAnchorInline = anchorInline === "start" ? "end" : "start";
        const flippedInline = this.calculateInline({
          surfaceRect,
          anchorRect,
          anchorInline: flippedAnchorInline,
          surfaceInline: flippedSurfaceInline,
          xOffset,
          positioning,
          isLTR,
          windowInnerWidth,
          inlineScrollbarWidth
        });
        if (Math.abs(inlineOutOfBoundsCorrection) > Math.abs(flippedInline.inlineOutOfBoundsCorrection)) {
          inlineInset = flippedInline.inlineInset;
          inlineOutOfBoundsCorrection = flippedInline.inlineOutOfBoundsCorrection;
          surfaceInlineProperty = flippedInline.surfaceInlineProperty;
        }
      }
      if (repositionStrategy === "move") {
        blockInset = blockInset - blockOutOfBoundsCorrection;
        inlineInset = inlineInset - inlineOutOfBoundsCorrection;
      }
      this.surfaceStylesInternal = {
        "display": "block",
        "opacity": "1",
        [surfaceBlockProperty]: `${blockInset}px`,
        [surfaceInlineProperty]: `${inlineInset}px`
      };
      if (repositionStrategy === "resize") {
        if (blockOutOfBoundsCorrection) {
          this.surfaceStylesInternal["height"] = `${surfaceRect.height - blockOutOfBoundsCorrection}px`;
        }
        if (inlineOutOfBoundsCorrection) {
          this.surfaceStylesInternal["width"] = `${surfaceRect.width - inlineOutOfBoundsCorrection}px`;
        }
      }
      this.host.requestUpdate();
    }
    /**
     * Calculates the css property, the inset, and the out of bounds correction
     * for the surface in the block direction.
     */
    calculateBlock(config) {
      const { surfaceRect, anchorRect, anchorBlock, surfaceBlock, yOffset, positioning, windowInnerHeight, blockScrollbarHeight } = config;
      const relativeToWindow = positioning === "fixed" || positioning === "document" ? 1 : 0;
      const relativeToDocument = positioning === "document" ? 1 : 0;
      const isSurfaceBlockStart = surfaceBlock === "start" ? 1 : 0;
      const isSurfaceBlockEnd = surfaceBlock === "end" ? 1 : 0;
      const isOneBlockEnd = anchorBlock !== surfaceBlock ? 1 : 0;
      const blockAnchorOffset = isOneBlockEnd * anchorRect.height + yOffset;
      const blockTopLayerOffset = isSurfaceBlockStart * anchorRect.top + isSurfaceBlockEnd * (windowInnerHeight - anchorRect.bottom - blockScrollbarHeight);
      const blockDocumentOffset = isSurfaceBlockStart * window.scrollY - isSurfaceBlockEnd * window.scrollY;
      const blockOutOfBoundsCorrection = Math.abs(Math.min(0, windowInnerHeight - blockTopLayerOffset - blockAnchorOffset - surfaceRect.height));
      const blockInset = relativeToWindow * blockTopLayerOffset + relativeToDocument * blockDocumentOffset + blockAnchorOffset;
      const surfaceBlockProperty = surfaceBlock === "start" ? "inset-block-start" : "inset-block-end";
      return { blockInset, blockOutOfBoundsCorrection, surfaceBlockProperty };
    }
    /**
     * Calculates the css property, the inset, and the out of bounds correction
     * for the surface in the inline direction.
     */
    calculateInline(config) {
      const { isLTR: isLTRBool, surfaceInline, anchorInline, anchorRect, surfaceRect, xOffset, positioning, windowInnerWidth, inlineScrollbarWidth } = config;
      const relativeToWindow = positioning === "fixed" || positioning === "document" ? 1 : 0;
      const relativeToDocument = positioning === "document" ? 1 : 0;
      const isLTR = isLTRBool ? 1 : 0;
      const isRTL = isLTRBool ? 0 : 1;
      const isSurfaceInlineStart = surfaceInline === "start" ? 1 : 0;
      const isSurfaceInlineEnd = surfaceInline === "end" ? 1 : 0;
      const isOneInlineEnd = anchorInline !== surfaceInline ? 1 : 0;
      const inlineAnchorOffset = isOneInlineEnd * anchorRect.width + xOffset;
      const inlineTopLayerOffsetLTR = isSurfaceInlineStart * anchorRect.left + isSurfaceInlineEnd * (windowInnerWidth - anchorRect.right - inlineScrollbarWidth);
      const inlineTopLayerOffsetRTL = isSurfaceInlineStart * (windowInnerWidth - anchorRect.right - inlineScrollbarWidth) + isSurfaceInlineEnd * anchorRect.left;
      const inlineTopLayerOffset = isLTR * inlineTopLayerOffsetLTR + isRTL * inlineTopLayerOffsetRTL;
      const inlineDocumentOffsetLTR = isSurfaceInlineStart * window.scrollX - isSurfaceInlineEnd * window.scrollX;
      const inlineDocumentOffsetRTL = isSurfaceInlineEnd * window.scrollX - isSurfaceInlineStart * window.scrollX;
      const inlineDocumentOffset = isLTR * inlineDocumentOffsetLTR + isRTL * inlineDocumentOffsetRTL;
      const inlineOutOfBoundsCorrection = Math.abs(Math.min(0, windowInnerWidth - inlineTopLayerOffset - inlineAnchorOffset - surfaceRect.width));
      const inlineInset = relativeToWindow * inlineTopLayerOffset + inlineAnchorOffset + relativeToDocument * inlineDocumentOffset;
      let surfaceInlineProperty = surfaceInline === "start" ? "inset-inline-start" : "inset-inline-end";
      if (positioning === "document" || positioning === "fixed") {
        if (surfaceInline === "start" && isLTRBool || surfaceInline === "end" && !isLTRBool) {
          surfaceInlineProperty = "left";
        } else {
          surfaceInlineProperty = "right";
        }
      }
      return {
        inlineInset,
        inlineOutOfBoundsCorrection,
        surfaceInlineProperty
      };
    }
    hostUpdate() {
      this.onUpdate();
    }
    hostUpdated() {
      this.onUpdate();
    }
    /**
     * Checks whether the properties passed into the controller have changed since
     * the last positioning. If so, it will reposition if the surface is open or
     * close it if the surface should close.
     */
    async onUpdate() {
      const props = this.getProperties();
      let hasChanged = false;
      for (const [key, value] of Object.entries(props)) {
        hasChanged = hasChanged || value !== this.lastValues[key];
        if (hasChanged)
          break;
      }
      const openChanged = this.lastValues.isOpen !== props.isOpen;
      const hasAnchor = !!props.anchorEl;
      const hasSurface = !!props.surfaceEl;
      if (hasChanged && hasAnchor && hasSurface) {
        this.lastValues.isOpen = props.isOpen;
        if (props.isOpen) {
          this.lastValues = props;
          await this.position();
          props.onOpen();
        } else if (openChanged) {
          await props.beforeClose();
          this.close();
          props.onClose();
        }
      }
    }
    /**
     * Hides the surface.
     */
    close() {
      this.surfaceStylesInternal = {
        "display": "none"
      };
      this.host.requestUpdate();
      const surfaceEl = this.getProperties().surfaceEl;
      if (surfaceEl?.popover && surfaceEl?.isConnected) {
        surfaceEl.hidePopover();
      }
    }
  };

  // node_modules/@material/web/menu/internal/controllers/typeaheadController.js
  var TYPEAHEAD_RECORD = {
    INDEX: 0,
    ITEM: 1,
    TEXT: 2
  };
  var TypeaheadController = class {
    /**
     * @param getProperties A function that returns the options of the typeahead
     * controller:
     *
     * {
     *   getItems: A function that returns an array of menu items to be searched.
     *   typeaheadBufferTime: The maximum time between each keystroke to keep the
     *       current type buffer alive.
     * }
     */
    constructor(getProperties) {
      this.getProperties = getProperties;
      this.typeaheadRecords = [];
      this.typaheadBuffer = "";
      this.cancelTypeaheadTimeout = 0;
      this.isTypingAhead = false;
      this.lastActiveRecord = null;
      this.onKeydown = (event) => {
        if (this.isTypingAhead) {
          this.typeahead(event);
        } else {
          this.beginTypeahead(event);
        }
      };
      this.endTypeahead = () => {
        this.isTypingAhead = false;
        this.typaheadBuffer = "";
        this.typeaheadRecords = [];
      };
    }
    get items() {
      return this.getProperties().getItems();
    }
    get active() {
      return this.getProperties().active;
    }
    /**
     * Sets up typingahead
     */
    beginTypeahead(event) {
      if (!this.active) {
        return;
      }
      if (event.code === "Space" || event.code === "Enter" || event.code.startsWith("Arrow") || event.code === "Escape") {
        return;
      }
      this.isTypingAhead = true;
      this.typeaheadRecords = this.items.map((el, index) => [
        index,
        el,
        el.typeaheadText.trim().toLowerCase()
      ]);
      this.lastActiveRecord = this.typeaheadRecords.find((record) => record[TYPEAHEAD_RECORD.ITEM].tabIndex === 0) ?? null;
      if (this.lastActiveRecord) {
        this.lastActiveRecord[TYPEAHEAD_RECORD.ITEM].tabIndex = -1;
      }
      this.typeahead(event);
    }
    /**
     * Performs the typeahead. Based on the normalized items and the current text
     * buffer, finds the _next_ item with matching text and activates it.
     *
     * @example
     *
     * items: Apple, Banana, Olive, Orange, Cucumber
     * buffer: ''
     * user types: o
     *
     * activates Olive
     *
     * @example
     *
     * items: Apple, Banana, Olive (active), Orange, Cucumber
     * buffer: 'o'
     * user types: l
     *
     * activates Olive
     *
     * @example
     *
     * items: Apple, Banana, Olive (active), Orange, Cucumber
     * buffer: ''
     * user types: o
     *
     * activates Orange
     *
     * @example
     *
     * items: Apple, Banana, Olive, Orange (active), Cucumber
     * buffer: ''
     * user types: o
     *
     * activates Olive
     */
    typeahead(event) {
      if (event.defaultPrevented)
        return;
      clearTimeout(this.cancelTypeaheadTimeout);
      if (event.code === "Enter" || event.code.startsWith("Arrow") || event.code === "Escape") {
        this.endTypeahead();
        if (this.lastActiveRecord) {
          this.lastActiveRecord[TYPEAHEAD_RECORD.ITEM].tabIndex = -1;
        }
        return;
      }
      if (event.code === "Space") {
        event.preventDefault();
      }
      this.cancelTypeaheadTimeout = setTimeout(this.endTypeahead, this.getProperties().typeaheadBufferTime);
      this.typaheadBuffer += event.key.toLowerCase();
      const lastActiveIndex = this.lastActiveRecord ? this.lastActiveRecord[TYPEAHEAD_RECORD.INDEX] : -1;
      const numRecords = this.typeaheadRecords.length;
      const rebaseIndexOnActive = (record) => {
        return (record[TYPEAHEAD_RECORD.INDEX] + numRecords - lastActiveIndex) % numRecords;
      };
      const matchingRecords = this.typeaheadRecords.filter((record) => !record[TYPEAHEAD_RECORD.ITEM].disabled && record[TYPEAHEAD_RECORD.TEXT].startsWith(this.typaheadBuffer)).sort((a4, b3) => rebaseIndexOnActive(a4) - rebaseIndexOnActive(b3));
      if (matchingRecords.length === 0) {
        clearTimeout(this.cancelTypeaheadTimeout);
        if (this.lastActiveRecord) {
          this.lastActiveRecord[TYPEAHEAD_RECORD.ITEM].tabIndex = -1;
        }
        this.endTypeahead();
        return;
      }
      const isNewQuery = this.typaheadBuffer.length === 1;
      let nextRecord;
      if (this.lastActiveRecord === matchingRecords[0] && isNewQuery) {
        nextRecord = matchingRecords[1] ?? matchingRecords[0];
      } else {
        nextRecord = matchingRecords[0];
      }
      if (this.lastActiveRecord) {
        this.lastActiveRecord[TYPEAHEAD_RECORD.ITEM].tabIndex = -1;
      }
      this.lastActiveRecord = nextRecord;
      nextRecord[TYPEAHEAD_RECORD.ITEM].tabIndex = 0;
      nextRecord[TYPEAHEAD_RECORD.ITEM].focus();
      return;
    }
  };

  // node_modules/@material/web/menu/internal/menu.js
  var DEFAULT_TYPEAHEAD_BUFFER_TIME = 200;
  var submenuNavKeys = /* @__PURE__ */ new Set([
    NavigableKeys.ArrowDown,
    NavigableKeys.ArrowUp,
    NavigableKeys.Home,
    NavigableKeys.End
  ]);
  var menuNavKeys = /* @__PURE__ */ new Set([
    NavigableKeys.ArrowLeft,
    NavigableKeys.ArrowRight,
    ...submenuNavKeys
  ]);
  function getFocusedElement(activeDoc = document) {
    let activeEl = activeDoc.activeElement;
    while (activeEl && activeEl?.shadowRoot?.activeElement) {
      activeEl = activeEl.shadowRoot.activeElement;
    }
    return activeEl;
  }
  var Menu = class extends s3 {
    /**
     * Whether the menu is animating upwards or downwards when opening. This is
     * helpful for calculating some animation calculations.
     */
    get openDirection() {
      const menuCornerBlock = this.menuCorner.split("-")[0];
      return menuCornerBlock === "start" ? "DOWN" : "UP";
    }
    /**
     * The element which the menu should align to. If `anchor` is set to a
     * non-empty idref string, then `anchorEl` will resolve to the element with
     * the given id in the same root node. Otherwise, `null`.
     */
    get anchorElement() {
      if (this.anchor) {
        return this.getRootNode().querySelector(`#${this.anchor}`);
      }
      return this.currentAnchorElement;
    }
    set anchorElement(element) {
      this.currentAnchorElement = element;
      this.requestUpdate("anchorElement");
    }
    constructor() {
      super();
      this.anchor = "";
      this.positioning = "absolute";
      this.quick = false;
      this.hasOverflow = false;
      this.open = false;
      this.xOffset = 0;
      this.yOffset = 0;
      this.typeaheadDelay = DEFAULT_TYPEAHEAD_BUFFER_TIME;
      this.anchorCorner = Corner.END_START;
      this.menuCorner = Corner.START_START;
      this.stayOpenOnOutsideClick = false;
      this.stayOpenOnFocusout = false;
      this.skipRestoreFocus = false;
      this.defaultFocus = FocusState.FIRST_ITEM;
      this.typeaheadActive = true;
      this.isSubmenu = false;
      this.pointerPath = [];
      this.isRepositioning = false;
      this.openCloseAnimationSignal = createAnimationSignal();
      this.listController = new ListController({
        isItem: (maybeItem) => {
          return maybeItem.hasAttribute("md-menu-item");
        },
        getPossibleItems: () => this.slotItems,
        isRtl: () => getComputedStyle(this).direction === "rtl",
        deactivateItem: (item) => {
          item.selected = false;
          item.tabIndex = -1;
        },
        activateItem: (item) => {
          item.selected = true;
          item.tabIndex = 0;
        },
        isNavigableKey: (key) => {
          if (!this.isSubmenu) {
            return menuNavKeys.has(key);
          }
          const isRtl = getComputedStyle(this).direction === "rtl";
          const arrowOpen = isRtl ? NavigableKeys.ArrowLeft : NavigableKeys.ArrowRight;
          if (key === arrowOpen) {
            return true;
          }
          return submenuNavKeys.has(key);
        }
      });
      this.lastFocusedElement = null;
      this.typeaheadController = new TypeaheadController(() => {
        return {
          getItems: () => this.items,
          typeaheadBufferTime: this.typeaheadDelay,
          active: this.typeaheadActive
        };
      });
      this.currentAnchorElement = null;
      this.internals = // Cast needed for closure
      this.attachInternals();
      this.menuPositionController = new SurfacePositionController(this, () => {
        return {
          anchorCorner: this.anchorCorner,
          surfaceCorner: this.menuCorner,
          surfaceEl: this.surfaceEl,
          anchorEl: this.anchorElement,
          positioning: this.positioning === "popover" ? "document" : this.positioning,
          isOpen: this.open,
          xOffset: this.xOffset,
          yOffset: this.yOffset,
          onOpen: this.onOpened,
          beforeClose: this.beforeClose,
          onClose: this.onClosed,
          // We can't resize components that have overflow like menus with
          // submenus because the overflow-y will show menu items / content
          // outside the bounds of the menu. Popover API fixes this because each
          // submenu is hoisted to the top-layer and are not considered overflow
          // content.
          repositionStrategy: this.hasOverflow && this.positioning !== "popover" ? "move" : "resize"
        };
      });
      this.onWindowResize = () => {
        if (this.isRepositioning || this.positioning !== "document" && this.positioning !== "fixed" && this.positioning !== "popover") {
          return;
        }
        this.isRepositioning = true;
        this.reposition();
        this.isRepositioning = false;
      };
      this.handleFocusout = async (event) => {
        const anchorEl = this.anchorElement;
        if (this.stayOpenOnFocusout || !this.open || this.pointerPath.includes(anchorEl)) {
          return;
        }
        if (event.relatedTarget) {
          if (isElementInSubtree(event.relatedTarget, this) || this.pointerPath.length !== 0 && isElementInSubtree(event.relatedTarget, anchorEl)) {
            return;
          }
        } else if (this.pointerPath.includes(this)) {
          return;
        }
        const oldRestoreFocus = this.skipRestoreFocus;
        this.skipRestoreFocus = true;
        this.close();
        await this.updateComplete;
        this.skipRestoreFocus = oldRestoreFocus;
      };
      this.onOpened = async () => {
        this.lastFocusedElement = getFocusedElement();
        const items = this.items;
        const activeItemRecord = getActiveItem(items);
        if (activeItemRecord && this.defaultFocus !== FocusState.NONE) {
          activeItemRecord.item.tabIndex = -1;
        }
        let animationAborted = !this.quick;
        if (this.quick) {
          this.dispatchEvent(new Event("opening"));
        } else {
          animationAborted = !!await this.animateOpen();
        }
        switch (this.defaultFocus) {
          case FocusState.FIRST_ITEM:
            const first = getFirstActivatableItem(items);
            if (first) {
              first.tabIndex = 0;
              first.focus();
              await first.updateComplete;
            }
            break;
          case FocusState.LAST_ITEM:
            const last = getLastActivatableItem(items);
            if (last) {
              last.tabIndex = 0;
              last.focus();
              await last.updateComplete;
            }
            break;
          case FocusState.LIST_ROOT:
            this.focus();
            break;
          default:
          case FocusState.NONE:
            break;
        }
        if (!animationAborted) {
          this.dispatchEvent(new Event("opened"));
        }
      };
      this.beforeClose = async () => {
        this.open = false;
        if (!this.skipRestoreFocus) {
          this.lastFocusedElement?.focus?.();
        }
        if (!this.quick) {
          await this.animateClose();
        }
      };
      this.onClosed = () => {
        if (this.quick) {
          this.dispatchEvent(new Event("closing"));
          this.dispatchEvent(new Event("closed"));
        }
      };
      this.onWindowPointerdown = (event) => {
        this.pointerPath = event.composedPath();
      };
      this.onDocumentClick = (event) => {
        if (!this.open) {
          return;
        }
        const path = event.composedPath();
        if (!this.stayOpenOnOutsideClick && !path.includes(this) && !path.includes(this.anchorElement)) {
          this.open = false;
        }
      };
      if (!o6) {
        this.internals.role = "menu";
        this.addEventListener("keydown", this.handleKeydown);
        this.addEventListener("keydown", this.captureKeydown, { capture: true });
        this.addEventListener("focusout", this.handleFocusout);
      }
    }
    /**
     * The menu items associated with this menu. The items must be `MenuItem`s and
     * have both the `md-menu-item` and `md-list-item` attributes.
     */
    get items() {
      return this.listController.items;
    }
    willUpdate(changed) {
      if (!changed.has("open")) {
        return;
      }
      if (this.open) {
        this.removeAttribute("aria-hidden");
        return;
      }
      this.setAttribute("aria-hidden", "true");
    }
    update(changed) {
      if (changed.has("open")) {
        if (this.open) {
          this.setUpGlobalEventListeners();
        } else {
          this.cleanUpGlobalEventListeners();
        }
      }
      if (changed.has("positioning") && this.positioning === "popover" && // type required for Google JS conformance
      !this.showPopover) {
        this.positioning = "fixed";
      }
      super.update(changed);
    }
    connectedCallback() {
      super.connectedCallback();
      if (this.open) {
        this.setUpGlobalEventListeners();
      }
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.cleanUpGlobalEventListeners();
    }
    render() {
      return this.renderSurface();
    }
    /**
     * Renders the positionable surface element and its contents.
     */
    renderSurface() {
      return x`
      <div
        class="menu ${e8(this.getSurfaceClasses())}"
        style=${o8(this.menuPositionController.surfaceStyles)}
        popover=${this.positioning === "popover" ? "manual" : T}>
        ${this.renderElevation()}
        <div class="items">
          <div class="item-padding"> ${this.renderMenuItems()} </div>
        </div>
      </div>
    `;
    }
    /**
     * Renders the menu items' slot
     */
    renderMenuItems() {
      return x`<slot
      @close-menu=${this.onCloseMenu}
      @deactivate-items=${this.onDeactivateItems}
      @request-activation=${this.onRequestActivation}
      @deactivate-typeahead=${this.handleDeactivateTypeahead}
      @activate-typeahead=${this.handleActivateTypeahead}
      @stay-open-on-focusout=${this.handleStayOpenOnFocusout}
      @close-on-focusout=${this.handleCloseOnFocusout}
      @slotchange=${this.listController.onSlotchange}></slot>`;
    }
    /**
     * Renders the elevation component.
     */
    renderElevation() {
      return x`<md-elevation part="elevation"></md-elevation>`;
    }
    getSurfaceClasses() {
      return {
        open: this.open,
        fixed: this.positioning === "fixed",
        "has-overflow": this.hasOverflow
      };
    }
    captureKeydown(event) {
      if (event.target === this && !event.defaultPrevented && isClosableKey(event.code)) {
        event.preventDefault();
        this.close();
      }
      this.typeaheadController.onKeydown(event);
    }
    /**
     * Performs the opening animation:
     *
     * https://direct.googleplex.com/#/spec/295000003+271060003
     *
     * @return A promise that resolve to `true` if the animation was aborted,
     *     `false` if it was not aborted.
     */
    async animateOpen() {
      const surfaceEl = this.surfaceEl;
      const slotEl = this.slotEl;
      if (!surfaceEl || !slotEl)
        return true;
      const openDirection = this.openDirection;
      this.dispatchEvent(new Event("opening"));
      surfaceEl.classList.toggle("animating", true);
      const signal = this.openCloseAnimationSignal.start();
      const height = surfaceEl.offsetHeight;
      const openingUpwards = openDirection === "UP";
      const children = this.items;
      const FULL_DURATION = 500;
      const SURFACE_OPACITY_DURATION = 50;
      const ITEM_OPACITY_DURATION = 250;
      const DELAY_BETWEEN_ITEMS = (FULL_DURATION - ITEM_OPACITY_DURATION) / children.length;
      const surfaceHeightAnimation = surfaceEl.animate([{ height: "0px" }, { height: `${height}px` }], {
        duration: FULL_DURATION,
        easing: EASING.EMPHASIZED
      });
      const upPositionCorrectionAnimation = slotEl.animate([
        { transform: openingUpwards ? `translateY(-${height}px)` : "" },
        { transform: "" }
      ], { duration: FULL_DURATION, easing: EASING.EMPHASIZED });
      const surfaceOpacityAnimation = surfaceEl.animate([{ opacity: 0 }, { opacity: 1 }], SURFACE_OPACITY_DURATION);
      const childrenAnimations = [];
      for (let i6 = 0; i6 < children.length; i6++) {
        const directionalIndex = openingUpwards ? children.length - 1 - i6 : i6;
        const child = children[directionalIndex];
        const animation = child.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: ITEM_OPACITY_DURATION,
          delay: DELAY_BETWEEN_ITEMS * i6
        });
        child.classList.toggle("md-menu-hidden", true);
        animation.addEventListener("finish", () => {
          child.classList.toggle("md-menu-hidden", false);
        });
        childrenAnimations.push([child, animation]);
      }
      let resolveAnimation = (value) => {
      };
      const animationFinished = new Promise((resolve) => {
        resolveAnimation = resolve;
      });
      signal.addEventListener("abort", () => {
        surfaceHeightAnimation.cancel();
        upPositionCorrectionAnimation.cancel();
        surfaceOpacityAnimation.cancel();
        childrenAnimations.forEach(([child, animation]) => {
          child.classList.toggle("md-menu-hidden", false);
          animation.cancel();
        });
        resolveAnimation(true);
      });
      surfaceHeightAnimation.addEventListener("finish", () => {
        surfaceEl.classList.toggle("animating", false);
        this.openCloseAnimationSignal.finish();
        resolveAnimation(false);
      });
      return await animationFinished;
    }
    /**
     * Performs the closing animation:
     *
     * https://direct.googleplex.com/#/spec/295000003+271060003
     */
    animateClose() {
      let resolve;
      let reject;
      const animationEnded = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      const surfaceEl = this.surfaceEl;
      const slotEl = this.slotEl;
      if (!surfaceEl || !slotEl) {
        reject();
        return animationEnded;
      }
      const openDirection = this.openDirection;
      const closingDownwards = openDirection === "UP";
      this.dispatchEvent(new Event("closing"));
      surfaceEl.classList.toggle("animating", true);
      const signal = this.openCloseAnimationSignal.start();
      const height = surfaceEl.offsetHeight;
      const children = this.items;
      const FULL_DURATION = 150;
      const SURFACE_OPACITY_DURATION = 50;
      const SURFACE_OPACITY_DELAY = FULL_DURATION - SURFACE_OPACITY_DURATION;
      const ITEM_OPACITY_DURATION = 50;
      const ITEM_OPACITY_INITIAL_DELAY = 50;
      const END_HEIGHT_PERCENTAGE = 0.35;
      const DELAY_BETWEEN_ITEMS = (FULL_DURATION - ITEM_OPACITY_INITIAL_DELAY - ITEM_OPACITY_DURATION) / children.length;
      const surfaceHeightAnimation = surfaceEl.animate([
        { height: `${height}px` },
        { height: `${height * END_HEIGHT_PERCENTAGE}px` }
      ], {
        duration: FULL_DURATION,
        easing: EASING.EMPHASIZED_ACCELERATE
      });
      const downPositionCorrectionAnimation = slotEl.animate([
        { transform: "" },
        {
          transform: closingDownwards ? `translateY(-${height * (1 - END_HEIGHT_PERCENTAGE)}px)` : ""
        }
      ], { duration: FULL_DURATION, easing: EASING.EMPHASIZED_ACCELERATE });
      const surfaceOpacityAnimation = surfaceEl.animate([{ opacity: 1 }, { opacity: 0 }], { duration: SURFACE_OPACITY_DURATION, delay: SURFACE_OPACITY_DELAY });
      const childrenAnimations = [];
      for (let i6 = 0; i6 < children.length; i6++) {
        const directionalIndex = closingDownwards ? i6 : children.length - 1 - i6;
        const child = children[directionalIndex];
        const animation = child.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: ITEM_OPACITY_DURATION,
          delay: ITEM_OPACITY_INITIAL_DELAY + DELAY_BETWEEN_ITEMS * i6
        });
        animation.addEventListener("finish", () => {
          child.classList.toggle("md-menu-hidden", true);
        });
        childrenAnimations.push([child, animation]);
      }
      signal.addEventListener("abort", () => {
        surfaceHeightAnimation.cancel();
        downPositionCorrectionAnimation.cancel();
        surfaceOpacityAnimation.cancel();
        childrenAnimations.forEach(([child, animation]) => {
          animation.cancel();
          child.classList.toggle("md-menu-hidden", false);
        });
        reject();
      });
      surfaceHeightAnimation.addEventListener("finish", () => {
        surfaceEl.classList.toggle("animating", false);
        childrenAnimations.forEach(([child]) => {
          child.classList.toggle("md-menu-hidden", false);
        });
        this.openCloseAnimationSignal.finish();
        this.dispatchEvent(new Event("closed"));
        resolve(true);
      });
      return animationEnded;
    }
    handleKeydown(event) {
      this.pointerPath = [];
      this.listController.handleKeydown(event);
    }
    setUpGlobalEventListeners() {
      document.addEventListener("click", this.onDocumentClick, { capture: true });
      window.addEventListener("pointerdown", this.onWindowPointerdown);
      document.addEventListener("resize", this.onWindowResize, { passive: true });
      window.addEventListener("resize", this.onWindowResize, { passive: true });
    }
    cleanUpGlobalEventListeners() {
      document.removeEventListener("click", this.onDocumentClick, {
        capture: true
      });
      window.removeEventListener("pointerdown", this.onWindowPointerdown);
      document.removeEventListener("resize", this.onWindowResize);
      window.removeEventListener("resize", this.onWindowResize);
    }
    onCloseMenu() {
      this.close();
    }
    onDeactivateItems(event) {
      event.stopPropagation();
      this.listController.onDeactivateItems();
    }
    onRequestActivation(event) {
      event.stopPropagation();
      this.listController.onRequestActivation(event);
    }
    handleDeactivateTypeahead(event) {
      event.stopPropagation();
      this.typeaheadActive = false;
    }
    handleActivateTypeahead(event) {
      event.stopPropagation();
      this.typeaheadActive = true;
    }
    handleStayOpenOnFocusout(event) {
      event.stopPropagation();
      this.stayOpenOnFocusout = true;
    }
    handleCloseOnFocusout(event) {
      event.stopPropagation();
      this.stayOpenOnFocusout = false;
    }
    close() {
      this.open = false;
      const maybeSubmenu = this.slotItems;
      maybeSubmenu.forEach((item) => {
        item.close?.();
      });
    }
    show() {
      this.open = true;
    }
    /**
     * Activates the next item in the menu. If at the end of the menu, the first
     * item will be activated.
     *
     * @return The activated menu item or `null` if there are no items.
     */
    activateNextItem() {
      return this.listController.activateNextItem() ?? null;
    }
    /**
     * Activates the previous item in the menu. If at the start of the menu, the
     * last item will be activated.
     *
     * @return The activated menu item or `null` if there are no items.
     */
    activatePreviousItem() {
      return this.listController.activatePreviousItem() ?? null;
    }
    /**
     * Repositions the menu if it is open.
     *
     * Useful for the case where document or window-positioned menus have their
     * anchors moved while open.
     */
    reposition() {
      if (this.open) {
        this.menuPositionController.position();
      }
    }
  };
  __decorate([
    e4(".menu")
  ], Menu.prototype, "surfaceEl", void 0);
  __decorate([
    e4("slot")
  ], Menu.prototype, "slotEl", void 0);
  __decorate([
    n3()
  ], Menu.prototype, "anchor", void 0);
  __decorate([
    n3()
  ], Menu.prototype, "positioning", void 0);
  __decorate([
    n3({ type: Boolean })
  ], Menu.prototype, "quick", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "has-overflow" })
  ], Menu.prototype, "hasOverflow", void 0);
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], Menu.prototype, "open", void 0);
  __decorate([
    n3({ type: Number, attribute: "x-offset" })
  ], Menu.prototype, "xOffset", void 0);
  __decorate([
    n3({ type: Number, attribute: "y-offset" })
  ], Menu.prototype, "yOffset", void 0);
  __decorate([
    n3({ type: Number, attribute: "typeahead-delay" })
  ], Menu.prototype, "typeaheadDelay", void 0);
  __decorate([
    n3({ attribute: "anchor-corner" })
  ], Menu.prototype, "anchorCorner", void 0);
  __decorate([
    n3({ attribute: "menu-corner" })
  ], Menu.prototype, "menuCorner", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "stay-open-on-outside-click" })
  ], Menu.prototype, "stayOpenOnOutsideClick", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "stay-open-on-focusout" })
  ], Menu.prototype, "stayOpenOnFocusout", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "skip-restore-focus" })
  ], Menu.prototype, "skipRestoreFocus", void 0);
  __decorate([
    n3({ attribute: "default-focus" })
  ], Menu.prototype, "defaultFocus", void 0);
  __decorate([
    o4({ flatten: true })
  ], Menu.prototype, "slotItems", void 0);
  __decorate([
    r4()
  ], Menu.prototype, "typeaheadActive", void 0);

  // node_modules/@material/web/menu/internal/menu-styles.css.js
  var styles5 = i`:host{--md-elevation-level: var(--md-menu-container-elevation, 2);--md-elevation-shadow-color: var(--md-menu-container-shadow-color, var(--md-sys-color-shadow, #000));min-width:112px;color:unset;display:contents}md-focus-ring{--md-focus-ring-shape: var(--md-menu-container-shape, var(--md-sys-shape-corner-extra-small, 4px))}.menu{border-radius:var(--md-menu-container-shape, var(--md-sys-shape-corner-extra-small, 4px));display:none;inset:auto;border:none;padding:0px;overflow:visible;background-color:rgba(0,0,0,0);color:inherit;opacity:0;z-index:20;position:absolute;user-select:none;max-height:inherit;height:inherit;min-width:inherit;max-width:inherit}.menu::backdrop{display:none}.fixed{position:fixed}.items{display:block;list-style-type:none;margin:0;outline:none;box-sizing:border-box;background-color:var(--md-menu-container-color, var(--md-sys-color-surface-container, #f3edf7));height:inherit;max-height:inherit;overflow:auto;min-width:inherit;max-width:inherit;border-radius:inherit}.item-padding{padding-block:8px}.has-overflow:not([popover]) .items{overflow:visible}.has-overflow.animating .items,.animating .items{overflow:hidden}.has-overflow.animating .items{pointer-events:none}.animating ::slotted(.md-menu-hidden){opacity:0}slot{display:block;height:inherit;max-height:inherit}::slotted(:is(md-divider,[role=separator])){margin:8px 0}@media(forced-colors: active){.menu{border-style:solid;border-color:CanvasText;border-width:1px}}/*# sourceMappingURL=menu-styles.css.map */
`;

  // node_modules/@material/web/menu/menu.js
  var MdMenu = class MdMenu2 extends Menu {
  };
  MdMenu.styles = [styles5];
  MdMenu = __decorate([
    t("md-menu")
  ], MdMenu);

  // node_modules/@material/web/internal/aria/aria.js
  var ARIA_PROPERTIES = [
    "ariaAtomic",
    "ariaAutoComplete",
    "ariaBusy",
    "ariaChecked",
    "ariaColCount",
    "ariaColIndex",
    "ariaColSpan",
    "ariaCurrent",
    "ariaDisabled",
    "ariaExpanded",
    "ariaHasPopup",
    "ariaHidden",
    "ariaInvalid",
    "ariaKeyShortcuts",
    "ariaLabel",
    "ariaLevel",
    "ariaLive",
    "ariaModal",
    "ariaMultiLine",
    "ariaMultiSelectable",
    "ariaOrientation",
    "ariaPlaceholder",
    "ariaPosInSet",
    "ariaPressed",
    "ariaReadOnly",
    "ariaRequired",
    "ariaRoleDescription",
    "ariaRowCount",
    "ariaRowIndex",
    "ariaRowSpan",
    "ariaSelected",
    "ariaSetSize",
    "ariaSort",
    "ariaValueMax",
    "ariaValueMin",
    "ariaValueNow",
    "ariaValueText"
  ];
  var ARIA_ATTRIBUTES = ARIA_PROPERTIES.map(ariaPropertyToAttribute);
  function ariaPropertyToAttribute(property) {
    return property.replace("aria", "aria-").replace(/Elements?/g, "").toLowerCase();
  }

  // node_modules/@material/web/internal/aria/delegate.js
  function requestUpdateOnAriaChange(ctor) {
    for (const ariaProperty of ARIA_PROPERTIES) {
      ctor.createProperty(ariaProperty, {
        attribute: ariaPropertyToAttribute(ariaProperty),
        reflect: true
      });
    }
    ctor.addInitializer((element) => {
      const controller = {
        hostConnected() {
          element.setAttribute("role", "presentation");
        }
      };
      element.addController(controller);
    });
  }

  // node_modules/@material/web/internal/events/redispatch-event.js
  function redispatchEvent(element, event) {
    if (event.bubbles && (!element.shadowRoot || event.composed)) {
      event.stopPropagation();
    }
    const copy = Reflect.construct(event.constructor, [event.type, event]);
    const dispatched = element.dispatchEvent(copy);
    if (!dispatched) {
      event.preventDefault();
    }
    return dispatched;
  }

  // node_modules/@material/web/labs/behaviors/element-internals.js
  var internals = Symbol("internals");
  var privateInternals = Symbol("privateInternals");
  function mixinElementInternals(base) {
    class WithElementInternalsElement extends base {
      get [internals]() {
        if (!this[privateInternals]) {
          this[privateInternals] = this.attachInternals();
        }
        return this[privateInternals];
      }
    }
    return WithElementInternalsElement;
  }

  // node_modules/@material/web/labs/behaviors/constraint-validation.js
  var createValidator = Symbol("createValidator");
  var getValidityAnchor = Symbol("getValidityAnchor");
  var privateValidator = Symbol("privateValidator");
  var privateSyncValidity = Symbol("privateSyncValidity");
  var privateCustomValidationMessage = Symbol("privateCustomValidationMessage");
  function mixinConstraintValidation(base) {
    var _a2;
    class ConstraintValidationElement extends base {
      constructor() {
        super(...arguments);
        this[_a2] = "";
      }
      get validity() {
        this[privateSyncValidity]();
        return this[internals].validity;
      }
      get validationMessage() {
        this[privateSyncValidity]();
        return this[internals].validationMessage;
      }
      get willValidate() {
        this[privateSyncValidity]();
        return this[internals].willValidate;
      }
      checkValidity() {
        this[privateSyncValidity]();
        return this[internals].checkValidity();
      }
      reportValidity() {
        this[privateSyncValidity]();
        return this[internals].reportValidity();
      }
      setCustomValidity(error) {
        this[privateCustomValidationMessage] = error;
        this[privateSyncValidity]();
      }
      requestUpdate(name, oldValue, options) {
        super.requestUpdate(name, oldValue, options);
        this[privateSyncValidity]();
      }
      firstUpdated(changed) {
        super.firstUpdated(changed);
        this[privateSyncValidity]();
      }
      [(_a2 = privateCustomValidationMessage, privateSyncValidity)]() {
        if (o6) {
          return;
        }
        if (!this[privateValidator]) {
          this[privateValidator] = this[createValidator]();
        }
        const { validity, validationMessage: nonCustomValidationMessage } = this[privateValidator].getValidity();
        const customError = !!this[privateCustomValidationMessage];
        const validationMessage = this[privateCustomValidationMessage] || nonCustomValidationMessage;
        this[internals].setValidity({ ...validity, customError }, validationMessage, this[getValidityAnchor]() ?? void 0);
      }
      [createValidator]() {
        throw new Error("Implement [createValidator]");
      }
      [getValidityAnchor]() {
        throw new Error("Implement [getValidityAnchor]");
      }
    }
    return ConstraintValidationElement;
  }

  // node_modules/@material/web/labs/behaviors/form-associated.js
  var getFormValue = Symbol("getFormValue");
  var getFormState = Symbol("getFormState");
  function mixinFormAssociated(base) {
    class FormAssociatedElement extends base {
      get form() {
        return this[internals].form;
      }
      get labels() {
        return this[internals].labels;
      }
      // Use @property for the `name` and `disabled` properties to add them to the
      // `observedAttributes` array and trigger `attributeChangedCallback()`.
      //
      // We don't use Lit's default getter/setter (`noAccessor: true`) because
      // the attributes need to be updated synchronously to work with synchronous
      // form APIs, and Lit updates attributes async by default.
      get name() {
        return this.getAttribute("name") ?? "";
      }
      set name(name) {
        this.setAttribute("name", name);
      }
      get disabled() {
        return this.hasAttribute("disabled");
      }
      set disabled(disabled) {
        this.toggleAttribute("disabled", disabled);
      }
      attributeChangedCallback(name, old, value) {
        if (name === "name" || name === "disabled") {
          const oldValue = name === "disabled" ? old !== null : old;
          this.requestUpdate(name, oldValue);
          return;
        }
        super.attributeChangedCallback(name, old, value);
      }
      requestUpdate(name, oldValue, options) {
        super.requestUpdate(name, oldValue, options);
        this[internals].setFormValue(this[getFormValue](), this[getFormState]());
      }
      [getFormValue]() {
        throw new Error("Implement [getFormValue]");
      }
      [getFormState]() {
        return this[getFormValue]();
      }
      formDisabledCallback(disabled) {
        this.disabled = disabled;
      }
    }
    FormAssociatedElement.formAssociated = true;
    __decorate([
      n3({ noAccessor: true })
    ], FormAssociatedElement.prototype, "name", null);
    __decorate([
      n3({ type: Boolean, noAccessor: true })
    ], FormAssociatedElement.prototype, "disabled", null);
    return FormAssociatedElement;
  }

  // node_modules/@material/web/labs/behaviors/on-report-validity.js
  var onReportValidity = Symbol("onReportValidity");
  var privateCleanupFormListeners = Symbol("privateCleanupFormListeners");
  var privateDoNotReportInvalid = Symbol("privateDoNotReportInvalid");
  var privateIsSelfReportingValidity = Symbol("privateIsSelfReportingValidity");
  var privateCallOnReportValidity = Symbol("privateCallOnReportValidity");
  function mixinOnReportValidity(base) {
    var _a2, _b, _c;
    class OnReportValidityElement extends base {
      // Mixins must have a constructor with `...args: any[]`
      // tslint:disable-next-line:no-any
      constructor(...args) {
        super(...args);
        this[_a2] = new AbortController();
        this[_b] = false;
        this[_c] = false;
        if (o6) {
          return;
        }
        this.addEventListener("invalid", (invalidEvent) => {
          if (this[privateDoNotReportInvalid] || !invalidEvent.isTrusted) {
            return;
          }
          this.addEventListener("invalid", () => {
            this[privateCallOnReportValidity](invalidEvent);
          }, { once: true });
        }, {
          // Listen during the capture phase, which will happen before the
          // bubbling phase. That way, we can add a final event listener that
          // will run after other event listeners, and we can check if it was
          // default prevented. This works because invalid does not bubble.
          capture: true
        });
      }
      checkValidity() {
        this[privateDoNotReportInvalid] = true;
        const valid = super.checkValidity();
        this[privateDoNotReportInvalid] = false;
        return valid;
      }
      reportValidity() {
        this[privateIsSelfReportingValidity] = true;
        const valid = super.reportValidity();
        if (valid) {
          this[privateCallOnReportValidity](null);
        }
        this[privateIsSelfReportingValidity] = false;
        return valid;
      }
      [(_a2 = privateCleanupFormListeners, _b = privateDoNotReportInvalid, _c = privateIsSelfReportingValidity, privateCallOnReportValidity)](invalidEvent) {
        const wasCanceled = invalidEvent?.defaultPrevented;
        if (wasCanceled) {
          return;
        }
        this[onReportValidity](invalidEvent);
        const implementationCanceledFocus = !wasCanceled && invalidEvent?.defaultPrevented;
        if (!implementationCanceledFocus) {
          return;
        }
        if (this[privateIsSelfReportingValidity] || isFirstInvalidControlInForm(this[internals].form, this)) {
          this.focus();
        }
      }
      [onReportValidity](invalidEvent) {
        throw new Error("Implement [onReportValidity]");
      }
      formAssociatedCallback(form) {
        if (super.formAssociatedCallback) {
          super.formAssociatedCallback(form);
        }
        this[privateCleanupFormListeners].abort();
        if (!form) {
          return;
        }
        this[privateCleanupFormListeners] = new AbortController();
        addFormReportValidListener(this, form, () => {
          this[privateCallOnReportValidity](null);
        }, this[privateCleanupFormListeners].signal);
      }
    }
    return OnReportValidityElement;
  }
  function addFormReportValidListener(control, form, onControlValid, cleanup) {
    const validateHooks = getFormValidateHooks(form);
    let controlFiredInvalid = false;
    let cleanupInvalidListener;
    let isNextSubmitFromHook = false;
    validateHooks.addEventListener("before", () => {
      isNextSubmitFromHook = true;
      cleanupInvalidListener = new AbortController();
      controlFiredInvalid = false;
      control.addEventListener("invalid", () => {
        controlFiredInvalid = true;
      }, {
        signal: cleanupInvalidListener.signal
      });
    }, { signal: cleanup });
    validateHooks.addEventListener("after", () => {
      isNextSubmitFromHook = false;
      cleanupInvalidListener?.abort();
      if (controlFiredInvalid) {
        return;
      }
      onControlValid();
    }, { signal: cleanup });
    form.addEventListener("submit", () => {
      if (isNextSubmitFromHook) {
        return;
      }
      onControlValid();
    }, {
      signal: cleanup
    });
  }
  var FORM_VALIDATE_HOOKS = /* @__PURE__ */ new WeakMap();
  function getFormValidateHooks(form) {
    if (!FORM_VALIDATE_HOOKS.has(form)) {
      const hooks = new EventTarget();
      FORM_VALIDATE_HOOKS.set(form, hooks);
      for (const methodName of ["reportValidity", "requestSubmit"]) {
        const superMethod = form[methodName];
        form[methodName] = function() {
          hooks.dispatchEvent(new Event("before"));
          const result = Reflect.apply(superMethod, this, arguments);
          hooks.dispatchEvent(new Event("after"));
          return result;
        };
      }
    }
    return FORM_VALIDATE_HOOKS.get(form);
  }
  function isFirstInvalidControlInForm(form, control) {
    if (!form) {
      return true;
    }
    let firstInvalidControl;
    for (const element of form.elements) {
      if (element.matches(":invalid")) {
        firstInvalidControl = element;
        break;
      }
    }
    return firstInvalidControl === control;
  }

  // node_modules/@material/web/labs/behaviors/validators/validator.js
  var Validator = class {
    /**
     * Creates a new validator.
     *
     * @param getCurrentState A callback that returns the current state of
     *     constraint validation-related properties.
     */
    constructor(getCurrentState) {
      this.getCurrentState = getCurrentState;
      this.currentValidity = {
        validity: {},
        validationMessage: ""
      };
    }
    /**
     * Returns the current `ValidityStateFlags` and validation message for the
     * validator.
     *
     * If the constraint validation state has not changed, this will return a
     * cached result. This is important since `getValidity()` can be called
     * frequently in response to synchronous property changes.
     *
     * @return The current validity and validation message.
     */
    getValidity() {
      const state = this.getCurrentState();
      const hasStateChanged = !this.prevState || !this.equals(this.prevState, state);
      if (!hasStateChanged) {
        return this.currentValidity;
      }
      const { validity, validationMessage } = this.computeValidity(state);
      this.prevState = this.copy(state);
      this.currentValidity = {
        validationMessage,
        validity: {
          // Change any `ValidityState` instances into `ValidityStateFlags` since
          // `ValidityState` cannot be easily `{...spread}`.
          badInput: validity.badInput,
          customError: validity.customError,
          patternMismatch: validity.patternMismatch,
          rangeOverflow: validity.rangeOverflow,
          rangeUnderflow: validity.rangeUnderflow,
          stepMismatch: validity.stepMismatch,
          tooLong: validity.tooLong,
          tooShort: validity.tooShort,
          typeMismatch: validity.typeMismatch,
          valueMissing: validity.valueMissing
        }
      };
      return this.currentValidity;
    }
  };

  // node_modules/@material/web/labs/behaviors/validators/select-validator.js
  var SelectValidator = class extends Validator {
    computeValidity(state) {
      if (!this.selectControl) {
        this.selectControl = document.createElement("select");
      }
      j(x`<option value=${state.value}></option>`, this.selectControl);
      this.selectControl.value = state.value;
      this.selectControl.required = state.required;
      return {
        validity: this.selectControl.validity,
        validationMessage: this.selectControl.validationMessage
      };
    }
    equals(prev, next) {
      return prev.value === next.value && prev.required === next.required;
    }
    copy({ value, required }) {
      return { value, required };
    }
  };

  // node_modules/@material/web/select/internal/shared.js
  function getSelectedItems(items) {
    const selectedItemRecords = [];
    for (let i6 = 0; i6 < items.length; i6++) {
      const item = items[i6];
      if (item.selected) {
        selectedItemRecords.push([item, i6]);
      }
    }
    return selectedItemRecords;
  }

  // node_modules/@material/web/select/internal/select.js
  var _a;
  var VALUE = Symbol("value");
  var selectBaseClass = mixinOnReportValidity(mixinConstraintValidation(mixinFormAssociated(mixinElementInternals(s3))));
  var Select = class extends selectBaseClass {
    /**
     * The value of the currently selected option.
     *
     * Note: For SSR, set `[selected]` on the requested option and `displayText`
     * rather than setting `value` setting `value` will incur a DOM query.
     */
    get value() {
      return this[VALUE];
    }
    set value(value) {
      if (o6)
        return;
      this.lastUserSetValue = value;
      this.select(value);
    }
    get options() {
      return this.menu?.items ?? [];
    }
    /**
     * The index of the currently selected option.
     *
     * Note: For SSR, set `[selected]` on the requested option and `displayText`
     * rather than setting `selectedIndex` setting `selectedIndex` will incur a
     * DOM query.
     */
    get selectedIndex() {
      const [_option, index] = (this.getSelectedOptions() ?? [])[0] ?? [];
      return index ?? -1;
    }
    set selectedIndex(index) {
      this.lastUserSetSelectedIndex = index;
      this.selectIndex(index);
    }
    /**
     * Returns an array of selected options.
     *
     * NOTE: md-select only suppoprts single selection.
     */
    get selectedOptions() {
      return (this.getSelectedOptions() ?? []).map(([option]) => option);
    }
    get hasError() {
      return this.error || this.nativeError;
    }
    constructor() {
      super();
      this.quick = false;
      this.required = false;
      this.errorText = "";
      this.label = "";
      this.supportingText = "";
      this.error = false;
      this.menuPositioning = "popover";
      this.clampMenuWidth = false;
      this.typeaheadDelay = DEFAULT_TYPEAHEAD_BUFFER_TIME;
      this.hasLeadingIcon = false;
      this.displayText = "";
      this.menuAlign = "start";
      this[_a] = "";
      this.lastUserSetValue = null;
      this.lastUserSetSelectedIndex = null;
      this.lastSelectedOption = null;
      this.lastSelectedOptionRecords = [];
      this.nativeError = false;
      this.nativeErrorText = "";
      this.focused = false;
      this.open = false;
      this.defaultFocus = FocusState.NONE;
      this.prevOpen = this.open;
      this.selectWidth = 0;
      if (o6) {
        return;
      }
      this.addEventListener("focus", this.handleFocus.bind(this));
      this.addEventListener("blur", this.handleBlur.bind(this));
    }
    /**
     * Selects an option given the value of the option, and updates MdSelect's
     * value.
     */
    select(value) {
      const optionToSelect = this.options.find((option) => option.value === value);
      if (optionToSelect) {
        this.selectItem(optionToSelect);
      }
    }
    /**
     * Selects an option given the index of the option, and updates MdSelect's
     * value.
     */
    selectIndex(index) {
      const optionToSelect = this.options[index];
      if (optionToSelect) {
        this.selectItem(optionToSelect);
      }
    }
    /**
     * Reset the select to its default value.
     */
    reset() {
      for (const option of this.options) {
        option.selected = option.hasAttribute("selected");
      }
      this.updateValueAndDisplayText();
      this.nativeError = false;
      this.nativeErrorText = "";
    }
    [(_a = VALUE, onReportValidity)](invalidEvent) {
      invalidEvent?.preventDefault();
      const prevMessage = this.getErrorText();
      this.nativeError = !!invalidEvent;
      this.nativeErrorText = this.validationMessage;
      if (prevMessage === this.getErrorText()) {
        this.field?.reannounceError();
      }
    }
    update(changed) {
      if (!this.hasUpdated) {
        this.initUserSelection();
      }
      if (this.prevOpen !== this.open && this.open) {
        const selectRect = this.getBoundingClientRect();
        this.selectWidth = selectRect.width;
      }
      this.prevOpen = this.open;
      super.update(changed);
    }
    render() {
      return x`
      <span
        class="select ${e8(this.getRenderClasses())}"
        @focusout=${this.handleFocusout}>
        ${this.renderField()} ${this.renderMenu()}
      </span>
    `;
    }
    async firstUpdated(changed) {
      await this.menu?.updateComplete;
      if (!this.lastSelectedOptionRecords.length) {
        this.initUserSelection();
      }
      if (!this.lastSelectedOptionRecords.length && !o6 && !this.options.length) {
        setTimeout(() => {
          this.updateValueAndDisplayText();
        });
      }
      super.firstUpdated(changed);
    }
    getRenderClasses() {
      return {
        "disabled": this.disabled,
        "error": this.error,
        "open": this.open
      };
    }
    renderField() {
      return n6`
      <${this.fieldTag}
          aria-haspopup="listbox"
          role="combobox"
          part="field"
          id="field"
          tabindex=${this.disabled ? "-1" : "0"}
          aria-label=${this.ariaLabel || T}
          aria-describedby="description"
          aria-expanded=${this.open ? "true" : "false"}
          aria-controls="listbox"
          class="field"
          label=${this.label}
          .focused=${this.focused || this.open}
          .populated=${!!this.displayText}
          .disabled=${this.disabled}
          .required=${this.required}
          .error=${this.hasError}
          ?has-start=${this.hasLeadingIcon}
          has-end
          supporting-text=${this.supportingText}
          error-text=${this.getErrorText()}
          @keydown=${this.handleKeydown}
          @click=${this.handleClick}>
         ${this.renderFieldContent()}
         <div id="description" slot="aria-describedby"></div>
      </${this.fieldTag}>`;
    }
    renderFieldContent() {
      return [
        this.renderLeadingIcon(),
        this.renderLabel(),
        this.renderTrailingIcon()
      ];
    }
    renderLeadingIcon() {
      return x`
      <span class="icon leading" slot="start">
        <slot name="leading-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `;
    }
    renderTrailingIcon() {
      return x`
      <span class="icon trailing" slot="end">
        <slot name="trailing-icon" @slotchange=${this.handleIconChange}>
          <svg height="5" viewBox="7 10 10 5" focusable="false">
            <polygon
              class="down"
              stroke="none"
              fill-rule="evenodd"
              points="7 10 12 15 17 10"></polygon>
            <polygon
              class="up"
              stroke="none"
              fill-rule="evenodd"
              points="7 15 12 10 17 15"></polygon>
          </svg>
        </slot>
      </span>
    `;
    }
    renderLabel() {
      return x`<div id="label">${this.displayText || x`&nbsp;`}</div>`;
    }
    renderMenu() {
      const ariaLabel = this.label || this.ariaLabel;
      return x`<div class="menu-wrapper">
      <md-menu
        id="listbox"
        .defaultFocus=${this.defaultFocus}
        role="listbox"
        tabindex="-1"
        aria-label=${ariaLabel || T}
        stay-open-on-focusout
        part="menu"
        exportparts="focus-ring: menu-focus-ring"
        anchor="field"
        style=${o8({
        "--__menu-min-width": `${this.selectWidth}px`,
        "--__menu-max-width": this.clampMenuWidth ? `${this.selectWidth}px` : void 0
      })}
        .open=${this.open}
        .quick=${this.quick}
        .positioning=${this.menuPositioning}
        .typeaheadDelay=${this.typeaheadDelay}
        .anchorCorner=${this.menuAlign === "start" ? "end-start" : "end-end"}
        .menuCorner=${this.menuAlign === "start" ? "start-start" : "start-end"}
        @opening=${this.handleOpening}
        @opened=${this.redispatchEvent}
        @closing=${this.redispatchEvent}
        @closed=${this.handleClosed}
        @close-menu=${this.handleCloseMenu}
        @request-selection=${this.handleRequestSelection}
        @request-deselection=${this.handleRequestDeselection}>
        ${this.renderMenuContent()}
      </md-menu>
    </div>`;
    }
    renderMenuContent() {
      return x`<slot></slot>`;
    }
    /**
     * Handles opening the select on keydown and typahead selection when the menu
     * is closed.
     */
    handleKeydown(event) {
      if (this.open || this.disabled || !this.menu) {
        return;
      }
      const typeaheadController = this.menu.typeaheadController;
      const isOpenKey = event.code === "Space" || event.code === "ArrowDown" || event.code === "ArrowUp" || event.code === "End" || event.code === "Home" || event.code === "Enter";
      if (!typeaheadController.isTypingAhead && isOpenKey) {
        event.preventDefault();
        this.open = true;
        switch (event.code) {
          case "Space":
          case "ArrowDown":
          case "Enter":
            this.defaultFocus = FocusState.NONE;
            break;
          case "End":
            this.defaultFocus = FocusState.LAST_ITEM;
            break;
          case "ArrowUp":
          case "Home":
            this.defaultFocus = FocusState.FIRST_ITEM;
            break;
          default:
            break;
        }
        return;
      }
      const isPrintableKey = event.key.length === 1;
      if (isPrintableKey) {
        typeaheadController.onKeydown(event);
        event.preventDefault();
        const { lastActiveRecord } = typeaheadController;
        if (!lastActiveRecord) {
          return;
        }
        this.labelEl?.setAttribute?.("aria-live", "polite");
        const hasChanged = this.selectItem(lastActiveRecord[TYPEAHEAD_RECORD.ITEM]);
        if (hasChanged) {
          this.dispatchInteractionEvents();
        }
      }
    }
    handleClick() {
      this.open = !this.open;
    }
    handleFocus() {
      this.focused = true;
    }
    handleBlur() {
      this.focused = false;
    }
    /**
     * Handles closing the menu when the focus leaves the select's subtree.
     */
    handleFocusout(event) {
      if (event.relatedTarget && isElementInSubtree(event.relatedTarget, this)) {
        return;
      }
      this.open = false;
    }
    /**
     * Gets a list of all selected select options as a list item record array.
     *
     * @return An array of selected list option records.
     */
    getSelectedOptions() {
      if (!this.menu) {
        this.lastSelectedOptionRecords = [];
        return null;
      }
      const items = this.menu.items;
      this.lastSelectedOptionRecords = getSelectedItems(items);
      return this.lastSelectedOptionRecords;
    }
    async getUpdateComplete() {
      await this.menu?.updateComplete;
      return super.getUpdateComplete();
    }
    /**
     * Gets the selected options from the DOM, and updates the value and display
     * text to the first selected option's value and headline respectively.
     *
     * @return Whether or not the selected option has changed since last update.
     */
    updateValueAndDisplayText() {
      const selectedOptions = this.getSelectedOptions() ?? [];
      let hasSelectedOptionChanged = false;
      if (selectedOptions.length) {
        const [firstSelectedOption] = selectedOptions[0];
        hasSelectedOptionChanged = this.lastSelectedOption !== firstSelectedOption;
        this.lastSelectedOption = firstSelectedOption;
        this[VALUE] = firstSelectedOption.value;
        this.displayText = firstSelectedOption.displayText;
      } else {
        hasSelectedOptionChanged = this.lastSelectedOption !== null;
        this.lastSelectedOption = null;
        this[VALUE] = "";
        this.displayText = "";
      }
      return hasSelectedOptionChanged;
    }
    /**
     * Focuses and activates the last selected item upon opening, and resets other
     * active items.
     */
    async handleOpening(e10) {
      this.labelEl?.removeAttribute?.("aria-live");
      this.redispatchEvent(e10);
      if (this.defaultFocus !== FocusState.NONE) {
        return;
      }
      const items = this.menu.items;
      const activeItem = getActiveItem(items)?.item;
      let [selectedItem] = this.lastSelectedOptionRecords[0] ?? [null];
      if (activeItem && activeItem !== selectedItem) {
        activeItem.tabIndex = -1;
      }
      selectedItem = selectedItem ?? items[0];
      if (selectedItem) {
        selectedItem.tabIndex = 0;
        selectedItem.focus();
      }
    }
    redispatchEvent(e10) {
      redispatchEvent(this, e10);
    }
    handleClosed(e10) {
      this.open = false;
      this.redispatchEvent(e10);
    }
    /**
     * Determines the reason for closing, and updates the UI accordingly.
     */
    handleCloseMenu(event) {
      const reason = event.detail.reason;
      const item = event.detail.itemPath[0];
      this.open = false;
      let hasChanged = false;
      if (reason.kind === "click-selection") {
        hasChanged = this.selectItem(item);
      } else if (reason.kind === "keydown" && isSelectableKey(reason.key)) {
        hasChanged = this.selectItem(item);
      } else {
        item.tabIndex = -1;
        item.blur();
      }
      if (hasChanged) {
        this.dispatchInteractionEvents();
      }
    }
    /**
     * Selects a given option, deselects other options, and updates the UI.
     *
     * @return Whether the last selected option has changed.
     */
    selectItem(item) {
      const selectedOptions = this.getSelectedOptions() ?? [];
      selectedOptions.forEach(([option]) => {
        if (item !== option) {
          option.selected = false;
        }
      });
      item.selected = true;
      return this.updateValueAndDisplayText();
    }
    /**
     * Handles updating selection when an option element requests selection via
     * property / attribute change.
     */
    handleRequestSelection(event) {
      const requestingOptionEl = event.target;
      if (this.lastSelectedOptionRecords.some(([option]) => option === requestingOptionEl)) {
        return;
      }
      this.selectItem(requestingOptionEl);
    }
    /**
     * Handles updating selection when an option element requests deselection via
     * property / attribute change.
     */
    handleRequestDeselection(event) {
      const requestingOptionEl = event.target;
      if (!this.lastSelectedOptionRecords.some(([option]) => option === requestingOptionEl)) {
        return;
      }
      this.updateValueAndDisplayText();
    }
    /**
     * Attempts to initialize the selected option from user-settable values like
     * SSR, setting `value`, or `selectedIndex` at startup.
     */
    initUserSelection() {
      if (this.lastUserSetValue && !this.lastSelectedOptionRecords.length) {
        this.select(this.lastUserSetValue);
      } else if (this.lastUserSetSelectedIndex !== null && !this.lastSelectedOptionRecords.length) {
        this.selectIndex(this.lastUserSetSelectedIndex);
      } else {
        this.updateValueAndDisplayText();
      }
    }
    handleIconChange() {
      this.hasLeadingIcon = this.leadingIcons.length > 0;
    }
    /**
     * Dispatches the `input` and `change` events.
     */
    dispatchInteractionEvents() {
      this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
      this.dispatchEvent(new Event("change", { bubbles: true }));
    }
    getErrorText() {
      return this.error ? this.errorText : this.nativeErrorText;
    }
    [getFormValue]() {
      return this.value;
    }
    formResetCallback() {
      this.reset();
    }
    formStateRestoreCallback(state) {
      this.value = state;
    }
    [createValidator]() {
      return new SelectValidator(() => this);
    }
    [getValidityAnchor]() {
      return this.field;
    }
  };
  (() => {
    requestUpdateOnAriaChange(Select);
  })();
  Select.shadowRootOptions = {
    ...s3.shadowRootOptions,
    delegatesFocus: true
  };
  __decorate([
    n3({ type: Boolean })
  ], Select.prototype, "quick", void 0);
  __decorate([
    n3({ type: Boolean })
  ], Select.prototype, "required", void 0);
  __decorate([
    n3({ type: String, attribute: "error-text" })
  ], Select.prototype, "errorText", void 0);
  __decorate([
    n3()
  ], Select.prototype, "label", void 0);
  __decorate([
    n3({ type: String, attribute: "supporting-text" })
  ], Select.prototype, "supportingText", void 0);
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], Select.prototype, "error", void 0);
  __decorate([
    n3({ attribute: "menu-positioning" })
  ], Select.prototype, "menuPositioning", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "clamp-menu-width" })
  ], Select.prototype, "clampMenuWidth", void 0);
  __decorate([
    n3({ type: Number, attribute: "typeahead-delay" })
  ], Select.prototype, "typeaheadDelay", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "has-leading-icon" })
  ], Select.prototype, "hasLeadingIcon", void 0);
  __decorate([
    n3({ attribute: "display-text" })
  ], Select.prototype, "displayText", void 0);
  __decorate([
    n3({ attribute: "menu-align" })
  ], Select.prototype, "menuAlign", void 0);
  __decorate([
    n3()
  ], Select.prototype, "value", null);
  __decorate([
    n3({ type: Number, attribute: "selected-index" })
  ], Select.prototype, "selectedIndex", null);
  __decorate([
    r4()
  ], Select.prototype, "nativeError", void 0);
  __decorate([
    r4()
  ], Select.prototype, "nativeErrorText", void 0);
  __decorate([
    r4()
  ], Select.prototype, "focused", void 0);
  __decorate([
    r4()
  ], Select.prototype, "open", void 0);
  __decorate([
    r4()
  ], Select.prototype, "defaultFocus", void 0);
  __decorate([
    e4(".field")
  ], Select.prototype, "field", void 0);
  __decorate([
    e4("md-menu")
  ], Select.prototype, "menu", void 0);
  __decorate([
    e4("#label")
  ], Select.prototype, "labelEl", void 0);
  __decorate([
    o4({ slot: "leading-icon", flatten: true })
  ], Select.prototype, "leadingIcons", void 0);

  // node_modules/@material/web/select/internal/filled-select.js
  var FilledSelect = class extends Select {
    constructor() {
      super(...arguments);
      this.fieldTag = s4`md-filled-field`;
    }
  };

  // node_modules/@material/web/select/internal/filled-select-styles.css.js
  var styles6 = i`:host{--_text-field-active-indicator-color: var(--md-filled-select-text-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-active-indicator-height: var(--md-filled-select-text-field-active-indicator-height, 1px);--_text-field-container-color: var(--md-filled-select-text-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_text-field-disabled-active-indicator-color: var(--md-filled-select-text-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-active-indicator-height: var(--md-filled-select-text-field-disabled-active-indicator-height, 1px);--_text-field-disabled-active-indicator-opacity: var(--md-filled-select-text-field-disabled-active-indicator-opacity, 0.38);--_text-field-disabled-container-color: var(--md-filled-select-text-field-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-container-opacity: var(--md-filled-select-text-field-disabled-container-opacity, 0.04);--_text-field-disabled-input-text-color: var(--md-filled-select-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-input-text-opacity: var(--md-filled-select-text-field-disabled-input-text-opacity, 0.38);--_text-field-disabled-label-text-color: var(--md-filled-select-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-label-text-opacity: var(--md-filled-select-text-field-disabled-label-text-opacity, 0.38);--_text-field-disabled-leading-icon-color: var(--md-filled-select-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-leading-icon-opacity: var(--md-filled-select-text-field-disabled-leading-icon-opacity, 0.38);--_text-field-disabled-supporting-text-color: var(--md-filled-select-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-supporting-text-opacity: var(--md-filled-select-text-field-disabled-supporting-text-opacity, 0.38);--_text-field-disabled-trailing-icon-color: var(--md-filled-select-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-trailing-icon-opacity: var(--md-filled-select-text-field-disabled-trailing-icon-opacity, 0.38);--_text-field-error-active-indicator-color: var(--md-filled-select-text-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-active-indicator-color: var(--md-filled-select-text-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-input-text-color: var(--md-filled-select-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-focus-label-text-color: var(--md-filled-select-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-leading-icon-color: var(--md-filled-select-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-focus-supporting-text-color: var(--md-filled-select-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-trailing-icon-color: var(--md-filled-select-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_text-field-error-hover-active-indicator-color: var(--md-filled-select-text-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-hover-input-text-color: var(--md-filled-select-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-hover-label-text-color: var(--md-filled-select-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-hover-leading-icon-color: var(--md-filled-select-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-hover-state-layer-color: var(--md-filled-select-text-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-hover-state-layer-opacity: var(--md-filled-select-text-field-error-hover-state-layer-opacity, 0.08);--_text-field-error-hover-supporting-text-color: var(--md-filled-select-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-hover-trailing-icon-color: var(--md-filled-select-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-input-text-color: var(--md-filled-select-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-label-text-color: var(--md-filled-select-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-leading-icon-color: var(--md-filled-select-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-supporting-text-color: var(--md-filled-select-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-trailing-icon-color: var(--md-filled-select-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_text-field-focus-active-indicator-color: var(--md-filled-select-text-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_text-field-focus-active-indicator-height: var(--md-filled-select-text-field-focus-active-indicator-height, 3px);--_text-field-focus-input-text-color: var(--md-filled-select-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-focus-label-text-color: var(--md-filled-select-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_text-field-focus-leading-icon-color: var(--md-filled-select-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-focus-supporting-text-color: var(--md-filled-select-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-focus-trailing-icon-color: var(--md-filled-select-text-field-focus-trailing-icon-color, var(--md-sys-color-primary, #6750a4));--_text-field-hover-active-indicator-color: var(--md-filled-select-text-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-active-indicator-height: var(--md-filled-select-text-field-hover-active-indicator-height, 1px);--_text-field-hover-input-text-color: var(--md-filled-select-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-label-text-color: var(--md-filled-select-text-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-leading-icon-color: var(--md-filled-select-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-hover-state-layer-color: var(--md-filled-select-text-field-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-state-layer-opacity: var(--md-filled-select-text-field-hover-state-layer-opacity, 0.08);--_text-field-hover-supporting-text-color: var(--md-filled-select-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-hover-trailing-icon-color: var(--md-filled-select-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-input-text-color: var(--md-filled-select-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-input-text-font: var(--md-filled-select-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-input-text-line-height: var(--md-filled-select-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_text-field-input-text-size: var(--md-filled-select-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_text-field-input-text-weight: var(--md-filled-select-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-label-text-color: var(--md-filled-select-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-label-text-font: var(--md-filled-select-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-label-text-line-height: var(--md-filled-select-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_text-field-label-text-populated-line-height: var(--md-filled-select-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_text-field-label-text-populated-size: var(--md-filled-select-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_text-field-label-text-size: var(--md-filled-select-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_text-field-label-text-weight: var(--md-filled-select-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-leading-icon-color: var(--md-filled-select-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-leading-icon-size: var(--md-filled-select-text-field-leading-icon-size, 24px);--_text-field-supporting-text-color: var(--md-filled-select-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-supporting-text-font: var(--md-filled-select-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-supporting-text-line-height: var(--md-filled-select-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_text-field-supporting-text-size: var(--md-filled-select-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_text-field-supporting-text-weight: var(--md-filled-select-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-trailing-icon-color: var(--md-filled-select-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-trailing-icon-size: var(--md-filled-select-text-field-trailing-icon-size, 24px);--_text-field-container-shape-start-start: var(--md-filled-select-text-field-container-shape-start-start, var(--md-filled-select-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_text-field-container-shape-start-end: var(--md-filled-select-text-field-container-shape-start-end, var(--md-filled-select-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_text-field-container-shape-end-end: var(--md-filled-select-text-field-container-shape-end-end, var(--md-filled-select-text-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_text-field-container-shape-end-start: var(--md-filled-select-text-field-container-shape-end-start, var(--md-filled-select-text-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--md-filled-field-active-indicator-color: var(--_text-field-active-indicator-color);--md-filled-field-active-indicator-height: var(--_text-field-active-indicator-height);--md-filled-field-container-color: var(--_text-field-container-color);--md-filled-field-container-shape-end-end: var(--_text-field-container-shape-end-end);--md-filled-field-container-shape-end-start: var(--_text-field-container-shape-end-start);--md-filled-field-container-shape-start-end: var(--_text-field-container-shape-start-end);--md-filled-field-container-shape-start-start: var(--_text-field-container-shape-start-start);--md-filled-field-content-color: var(--_text-field-input-text-color);--md-filled-field-content-font: var(--_text-field-input-text-font);--md-filled-field-content-line-height: var(--_text-field-input-text-line-height);--md-filled-field-content-size: var(--_text-field-input-text-size);--md-filled-field-content-weight: var(--_text-field-input-text-weight);--md-filled-field-disabled-active-indicator-color: var(--_text-field-disabled-active-indicator-color);--md-filled-field-disabled-active-indicator-height: var(--_text-field-disabled-active-indicator-height);--md-filled-field-disabled-active-indicator-opacity: var(--_text-field-disabled-active-indicator-opacity);--md-filled-field-disabled-container-color: var(--_text-field-disabled-container-color);--md-filled-field-disabled-container-opacity: var(--_text-field-disabled-container-opacity);--md-filled-field-disabled-content-color: var(--_text-field-disabled-input-text-color);--md-filled-field-disabled-content-opacity: var(--_text-field-disabled-input-text-opacity);--md-filled-field-disabled-label-text-color: var(--_text-field-disabled-label-text-color);--md-filled-field-disabled-label-text-opacity: var(--_text-field-disabled-label-text-opacity);--md-filled-field-disabled-leading-content-color: var(--_text-field-disabled-leading-icon-color);--md-filled-field-disabled-leading-content-opacity: var(--_text-field-disabled-leading-icon-opacity);--md-filled-field-disabled-supporting-text-color: var(--_text-field-disabled-supporting-text-color);--md-filled-field-disabled-supporting-text-opacity: var(--_text-field-disabled-supporting-text-opacity);--md-filled-field-disabled-trailing-content-color: var(--_text-field-disabled-trailing-icon-color);--md-filled-field-disabled-trailing-content-opacity: var(--_text-field-disabled-trailing-icon-opacity);--md-filled-field-error-active-indicator-color: var(--_text-field-error-active-indicator-color);--md-filled-field-error-content-color: var(--_text-field-error-input-text-color);--md-filled-field-error-focus-active-indicator-color: var(--_text-field-error-focus-active-indicator-color);--md-filled-field-error-focus-content-color: var(--_text-field-error-focus-input-text-color);--md-filled-field-error-focus-label-text-color: var(--_text-field-error-focus-label-text-color);--md-filled-field-error-focus-leading-content-color: var(--_text-field-error-focus-leading-icon-color);--md-filled-field-error-focus-supporting-text-color: var(--_text-field-error-focus-supporting-text-color);--md-filled-field-error-focus-trailing-content-color: var(--_text-field-error-focus-trailing-icon-color);--md-filled-field-error-hover-active-indicator-color: var(--_text-field-error-hover-active-indicator-color);--md-filled-field-error-hover-content-color: var(--_text-field-error-hover-input-text-color);--md-filled-field-error-hover-label-text-color: var(--_text-field-error-hover-label-text-color);--md-filled-field-error-hover-leading-content-color: var(--_text-field-error-hover-leading-icon-color);--md-filled-field-error-hover-state-layer-color: var(--_text-field-error-hover-state-layer-color);--md-filled-field-error-hover-state-layer-opacity: var(--_text-field-error-hover-state-layer-opacity);--md-filled-field-error-hover-supporting-text-color: var(--_text-field-error-hover-supporting-text-color);--md-filled-field-error-hover-trailing-content-color: var(--_text-field-error-hover-trailing-icon-color);--md-filled-field-error-label-text-color: var(--_text-field-error-label-text-color);--md-filled-field-error-leading-content-color: var(--_text-field-error-leading-icon-color);--md-filled-field-error-supporting-text-color: var(--_text-field-error-supporting-text-color);--md-filled-field-error-trailing-content-color: var(--_text-field-error-trailing-icon-color);--md-filled-field-focus-active-indicator-color: var(--_text-field-focus-active-indicator-color);--md-filled-field-focus-active-indicator-height: var(--_text-field-focus-active-indicator-height);--md-filled-field-focus-content-color: var(--_text-field-focus-input-text-color);--md-filled-field-focus-label-text-color: var(--_text-field-focus-label-text-color);--md-filled-field-focus-leading-content-color: var(--_text-field-focus-leading-icon-color);--md-filled-field-focus-supporting-text-color: var(--_text-field-focus-supporting-text-color);--md-filled-field-focus-trailing-content-color: var(--_text-field-focus-trailing-icon-color);--md-filled-field-hover-active-indicator-color: var(--_text-field-hover-active-indicator-color);--md-filled-field-hover-active-indicator-height: var(--_text-field-hover-active-indicator-height);--md-filled-field-hover-content-color: var(--_text-field-hover-input-text-color);--md-filled-field-hover-label-text-color: var(--_text-field-hover-label-text-color);--md-filled-field-hover-leading-content-color: var(--_text-field-hover-leading-icon-color);--md-filled-field-hover-state-layer-color: var(--_text-field-hover-state-layer-color);--md-filled-field-hover-state-layer-opacity: var(--_text-field-hover-state-layer-opacity);--md-filled-field-hover-supporting-text-color: var(--_text-field-hover-supporting-text-color);--md-filled-field-hover-trailing-content-color: var(--_text-field-hover-trailing-icon-color);--md-filled-field-label-text-color: var(--_text-field-label-text-color);--md-filled-field-label-text-font: var(--_text-field-label-text-font);--md-filled-field-label-text-line-height: var(--_text-field-label-text-line-height);--md-filled-field-label-text-populated-line-height: var(--_text-field-label-text-populated-line-height);--md-filled-field-label-text-populated-size: var(--_text-field-label-text-populated-size);--md-filled-field-label-text-size: var(--_text-field-label-text-size);--md-filled-field-label-text-weight: var(--_text-field-label-text-weight);--md-filled-field-leading-content-color: var(--_text-field-leading-icon-color);--md-filled-field-supporting-text-color: var(--_text-field-supporting-text-color);--md-filled-field-supporting-text-font: var(--_text-field-supporting-text-font);--md-filled-field-supporting-text-line-height: var(--_text-field-supporting-text-line-height);--md-filled-field-supporting-text-size: var(--_text-field-supporting-text-size);--md-filled-field-supporting-text-weight: var(--_text-field-supporting-text-weight);--md-filled-field-trailing-content-color: var(--_text-field-trailing-icon-color)}[has-start] .icon.leading{font-size:var(--_text-field-leading-icon-size);height:var(--_text-field-leading-icon-size);width:var(--_text-field-leading-icon-size)}.icon.trailing{font-size:var(--_text-field-trailing-icon-size);height:var(--_text-field-trailing-icon-size);width:var(--_text-field-trailing-icon-size)}/*# sourceMappingURL=filled-select-styles.css.map */
`;

  // node_modules/@material/web/select/internal/shared-styles.css.js
  var styles7 = i`:host{color:unset;min-width:210px;display:flex}.field{cursor:default;outline:none}.select{position:relative;flex-direction:column}.icon.trailing svg,.icon ::slotted(*){fill:currentColor}.icon ::slotted(*){width:inherit;height:inherit;font-size:inherit}.icon slot{display:flex;height:100%;width:100%;align-items:center;justify-content:center}.icon.trailing :is(.up,.down){opacity:0;transition:opacity 75ms linear 75ms}.select:not(.open) .down,.select.open .up{opacity:1}.field,.select,md-menu{min-width:inherit;width:inherit;max-width:inherit;display:flex}md-menu{min-width:var(--__menu-min-width);max-width:var(--__menu-max-width, inherit)}.menu-wrapper{width:0px;height:0px;max-width:inherit}md-menu ::slotted(:not[disabled]){cursor:pointer}.field,.select{width:100%}:host{display:inline-flex}:host([disabled]){pointer-events:none}/*# sourceMappingURL=shared-styles.css.map */
`;

  // node_modules/@material/web/select/filled-select.js
  var MdFilledSelect = class MdFilledSelect2 extends FilledSelect {
  };
  MdFilledSelect.styles = [styles7, styles6];
  MdFilledSelect = __decorate([
    t("md-filled-select")
  ], MdFilledSelect);

  // node_modules/@material/web/menu/internal/menuitem/menu-item-styles.css.js
  var styles8 = i`:host{display:flex;--md-ripple-hover-color: var(--md-menu-item-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-menu-item-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-menu-item-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-opacity: var(--md-menu-item-pressed-state-layer-opacity, 0.12)}:host([disabled]){opacity:var(--md-menu-item-disabled-opacity, 0.3);pointer-events:none}md-focus-ring{z-index:1;--md-focus-ring-shape: 8px}a,button,li{background:none;border:none;padding:0;margin:0;text-align:unset;text-decoration:none}.list-item{border-radius:inherit;display:flex;flex:1;max-width:inherit;min-width:inherit;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.list-item:not(.disabled){cursor:pointer}[slot=container]{pointer-events:none}md-ripple{border-radius:inherit}md-item{border-radius:inherit;flex:1;color:var(--md-menu-item-label-text-color, var(--md-sys-color-on-surface, #1d1b20));font-family:var(--md-menu-item-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));line-height:var(--md-menu-item-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));font-weight:var(--md-menu-item-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));min-height:var(--md-menu-item-one-line-container-height, 56px);padding-top:var(--md-menu-item-top-space, 12px);padding-bottom:var(--md-menu-item-bottom-space, 12px);padding-inline-start:var(--md-menu-item-leading-space, 16px);padding-inline-end:var(--md-menu-item-trailing-space, 16px)}md-item[multiline]{min-height:var(--md-menu-item-two-line-container-height, 72px)}[slot=supporting-text]{color:var(--md-menu-item-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-menu-item-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-menu-item-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));font-weight:var(--md-menu-item-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)))}[slot=trailing-supporting-text]{color:var(--md-menu-item-trailing-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-menu-item-trailing-supporting-text-font, var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-trailing-supporting-text-size, var(--md-sys-typescale-label-small-size, 0.6875rem));line-height:var(--md-menu-item-trailing-supporting-text-line-height, var(--md-sys-typescale-label-small-line-height, 1rem));font-weight:var(--md-menu-item-trailing-supporting-text-weight, var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500)))}:is([slot=start],[slot=end])::slotted(*){fill:currentColor}[slot=start]{color:var(--md-menu-item-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}[slot=end]{color:var(--md-menu-item-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}.list-item{background-color:var(--md-menu-item-container-color, transparent)}.list-item.selected{background-color:var(--md-menu-item-selected-container-color, var(--md-sys-color-secondary-container, #e8def8))}.selected:not(.disabled) ::slotted(*){color:var(--md-menu-item-selected-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b))}@media(forced-colors: active){:host([disabled]),:host([disabled]) slot{color:GrayText;opacity:1}.list-item{position:relative}.list-item.selected::before{content:"";position:absolute;inset:0;box-sizing:border-box;border-radius:inherit;pointer-events:none;border:3px double CanvasText}}/*# sourceMappingURL=menu-item-styles.css.map */
`;

  // node_modules/@material/web/labs/item/internal/item.js
  var Item = class extends s3 {
    constructor() {
      super(...arguments);
      this.multiline = false;
    }
    render() {
      return x`
      <slot name="container"></slot>
      <slot class="non-text" name="start"></slot>
      <div class="text">
        <slot name="overline" @slotchange=${this.handleTextSlotChange}></slot>
        <slot
          class="default-slot"
          @slotchange=${this.handleTextSlotChange}></slot>
        <slot name="headline" @slotchange=${this.handleTextSlotChange}></slot>
        <slot
          name="supporting-text"
          @slotchange=${this.handleTextSlotChange}></slot>
      </div>
      <slot class="non-text" name="trailing-supporting-text"></slot>
      <slot class="non-text" name="end"></slot>
    `;
    }
    handleTextSlotChange() {
      let isMultiline = false;
      let slotsWithContent = 0;
      for (const slot of this.textSlots) {
        if (slotHasContent(slot)) {
          slotsWithContent += 1;
        }
        if (slotsWithContent > 1) {
          isMultiline = true;
          break;
        }
      }
      this.multiline = isMultiline;
    }
  };
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], Item.prototype, "multiline", void 0);
  __decorate([
    r5(".text slot")
  ], Item.prototype, "textSlots", void 0);
  function slotHasContent(slot) {
    for (const node of slot.assignedNodes({ flatten: true })) {
      const isElement = node.nodeType === Node.ELEMENT_NODE;
      const isTextWithContent = node.nodeType === Node.TEXT_NODE && node.textContent?.match(/\S/);
      if (isElement || isTextWithContent) {
        return true;
      }
    }
    return false;
  }

  // node_modules/@material/web/labs/item/internal/item-styles.css.js
  var styles9 = i`:host{color:var(--md-sys-color-on-surface, #1d1b20);font-family:var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-large-size, 1rem);font-weight:var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-large-line-height, 1.5rem);align-items:center;box-sizing:border-box;display:flex;gap:16px;min-height:56px;overflow:hidden;padding:12px 16px;position:relative;text-overflow:ellipsis}:host([multiline]){min-height:72px}[name=overline]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-medium-size, 0.875rem);font-weight:var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-medium-line-height, 1.25rem)}[name=trailing-supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=container]::slotted(*){inset:0;position:absolute}.default-slot{display:inline}.default-slot,.text ::slotted(*){overflow:hidden;text-overflow:ellipsis}.text{display:flex;flex:1;flex-direction:column;overflow:hidden}/*# sourceMappingURL=item-styles.css.map */
`;

  // node_modules/@material/web/labs/item/item.js
  var MdItem = class MdItem2 extends Item {
  };
  MdItem.styles = [styles9];
  MdItem = __decorate([
    t("md-item")
  ], MdItem);

  // node_modules/@material/web/ripple/internal/ripple.js
  var PRESS_GROW_MS = 450;
  var MINIMUM_PRESS_MS = 225;
  var INITIAL_ORIGIN_SCALE = 0.2;
  var PADDING = 10;
  var SOFT_EDGE_MINIMUM_SIZE = 75;
  var SOFT_EDGE_CONTAINER_RATIO = 0.35;
  var PRESS_PSEUDO = "::after";
  var ANIMATION_FILL = "forwards";
  var State;
  (function(State2) {
    State2[State2["INACTIVE"] = 0] = "INACTIVE";
    State2[State2["TOUCH_DELAY"] = 1] = "TOUCH_DELAY";
    State2[State2["HOLDING"] = 2] = "HOLDING";
    State2[State2["WAITING_FOR_CLICK"] = 3] = "WAITING_FOR_CLICK";
  })(State || (State = {}));
  var EVENTS2 = [
    "click",
    "contextmenu",
    "pointercancel",
    "pointerdown",
    "pointerenter",
    "pointerleave",
    "pointerup"
  ];
  var TOUCH_DELAY_MS = 150;
  var FORCED_COLORS = o6 ? null : window.matchMedia("(forced-colors: active)");
  var Ripple = class extends s3 {
    constructor() {
      super(...arguments);
      this.disabled = false;
      this.hovered = false;
      this.pressed = false;
      this.rippleSize = "";
      this.rippleScale = "";
      this.initialSize = 0;
      this.state = State.INACTIVE;
      this.checkBoundsAfterContextMenu = false;
      this.attachableController = new AttachableController(this, this.onControlChange.bind(this));
    }
    get htmlFor() {
      return this.attachableController.htmlFor;
    }
    set htmlFor(htmlFor) {
      this.attachableController.htmlFor = htmlFor;
    }
    get control() {
      return this.attachableController.control;
    }
    set control(control) {
      this.attachableController.control = control;
    }
    attach(control) {
      this.attachableController.attach(control);
    }
    detach() {
      this.attachableController.detach();
    }
    connectedCallback() {
      super.connectedCallback();
      this.setAttribute("aria-hidden", "true");
    }
    render() {
      const classes = {
        "hovered": this.hovered,
        "pressed": this.pressed
      };
      return x`<div class="surface ${e8(classes)}"></div>`;
    }
    update(changedProps) {
      if (changedProps.has("disabled") && this.disabled) {
        this.hovered = false;
        this.pressed = false;
      }
      super.update(changedProps);
    }
    /**
     * TODO(b/269799771): make private
     * @private only public for slider
     */
    handlePointerenter(event) {
      if (!this.shouldReactToEvent(event)) {
        return;
      }
      this.hovered = true;
    }
    /**
     * TODO(b/269799771): make private
     * @private only public for slider
     */
    handlePointerleave(event) {
      if (!this.shouldReactToEvent(event)) {
        return;
      }
      this.hovered = false;
      if (this.state !== State.INACTIVE) {
        this.endPressAnimation();
      }
    }
    handlePointerup(event) {
      if (!this.shouldReactToEvent(event)) {
        return;
      }
      if (this.state === State.HOLDING) {
        this.state = State.WAITING_FOR_CLICK;
        return;
      }
      if (this.state === State.TOUCH_DELAY) {
        this.state = State.WAITING_FOR_CLICK;
        this.startPressAnimation(this.rippleStartEvent);
        return;
      }
    }
    async handlePointerdown(event) {
      if (!this.shouldReactToEvent(event)) {
        return;
      }
      this.rippleStartEvent = event;
      if (!this.isTouch(event)) {
        this.state = State.WAITING_FOR_CLICK;
        this.startPressAnimation(event);
        return;
      }
      if (this.checkBoundsAfterContextMenu && !this.inBounds(event)) {
        return;
      }
      this.checkBoundsAfterContextMenu = false;
      this.state = State.TOUCH_DELAY;
      await new Promise((resolve) => {
        setTimeout(resolve, TOUCH_DELAY_MS);
      });
      if (this.state !== State.TOUCH_DELAY) {
        return;
      }
      this.state = State.HOLDING;
      this.startPressAnimation(event);
    }
    handleClick() {
      if (this.disabled) {
        return;
      }
      if (this.state === State.WAITING_FOR_CLICK) {
        this.endPressAnimation();
        return;
      }
      if (this.state === State.INACTIVE) {
        this.startPressAnimation();
        this.endPressAnimation();
      }
    }
    handlePointercancel(event) {
      if (!this.shouldReactToEvent(event)) {
        return;
      }
      this.endPressAnimation();
    }
    handleContextmenu() {
      if (this.disabled) {
        return;
      }
      this.checkBoundsAfterContextMenu = true;
      this.endPressAnimation();
    }
    determineRippleSize() {
      const { height, width } = this.getBoundingClientRect();
      const maxDim = Math.max(height, width);
      const softEdgeSize = Math.max(SOFT_EDGE_CONTAINER_RATIO * maxDim, SOFT_EDGE_MINIMUM_SIZE);
      const initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
      const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
      const maxRadius = hypotenuse + PADDING;
      this.initialSize = initialSize;
      this.rippleScale = `${(maxRadius + softEdgeSize) / initialSize}`;
      this.rippleSize = `${initialSize}px`;
    }
    getNormalizedPointerEventCoords(pointerEvent) {
      const { scrollX, scrollY } = window;
      const { left, top } = this.getBoundingClientRect();
      const documentX = scrollX + left;
      const documentY = scrollY + top;
      const { pageX, pageY } = pointerEvent;
      return { x: pageX - documentX, y: pageY - documentY };
    }
    getTranslationCoordinates(positionEvent) {
      const { height, width } = this.getBoundingClientRect();
      const endPoint = {
        x: (width - this.initialSize) / 2,
        y: (height - this.initialSize) / 2
      };
      let startPoint;
      if (positionEvent instanceof PointerEvent) {
        startPoint = this.getNormalizedPointerEventCoords(positionEvent);
      } else {
        startPoint = {
          x: width / 2,
          y: height / 2
        };
      }
      startPoint = {
        x: startPoint.x - this.initialSize / 2,
        y: startPoint.y - this.initialSize / 2
      };
      return { startPoint, endPoint };
    }
    startPressAnimation(positionEvent) {
      if (!this.mdRoot) {
        return;
      }
      this.pressed = true;
      this.growAnimation?.cancel();
      this.determineRippleSize();
      const { startPoint, endPoint } = this.getTranslationCoordinates(positionEvent);
      const translateStart = `${startPoint.x}px, ${startPoint.y}px`;
      const translateEnd = `${endPoint.x}px, ${endPoint.y}px`;
      this.growAnimation = this.mdRoot.animate({
        top: [0, 0],
        left: [0, 0],
        height: [this.rippleSize, this.rippleSize],
        width: [this.rippleSize, this.rippleSize],
        transform: [
          `translate(${translateStart}) scale(1)`,
          `translate(${translateEnd}) scale(${this.rippleScale})`
        ]
      }, {
        pseudoElement: PRESS_PSEUDO,
        duration: PRESS_GROW_MS,
        easing: EASING.STANDARD,
        fill: ANIMATION_FILL
      });
    }
    async endPressAnimation() {
      this.rippleStartEvent = void 0;
      this.state = State.INACTIVE;
      const animation = this.growAnimation;
      let pressAnimationPlayState = Infinity;
      if (typeof animation?.currentTime === "number") {
        pressAnimationPlayState = animation.currentTime;
      } else if (animation?.currentTime) {
        pressAnimationPlayState = animation.currentTime.to("ms").value;
      }
      if (pressAnimationPlayState >= MINIMUM_PRESS_MS) {
        this.pressed = false;
        return;
      }
      await new Promise((resolve) => {
        setTimeout(resolve, MINIMUM_PRESS_MS - pressAnimationPlayState);
      });
      if (this.growAnimation !== animation) {
        return;
      }
      this.pressed = false;
    }
    /**
     * Returns `true` if
     *  - the ripple element is enabled
     *  - the pointer is primary for the input type
     *  - the pointer is the pointer that started the interaction, or will start
     * the interaction
     *  - the pointer is a touch, or the pointer state has the primary button
     * held, or the pointer is hovering
     */
    shouldReactToEvent(event) {
      if (this.disabled || !event.isPrimary) {
        return false;
      }
      if (this.rippleStartEvent && this.rippleStartEvent.pointerId !== event.pointerId) {
        return false;
      }
      if (event.type === "pointerenter" || event.type === "pointerleave") {
        return !this.isTouch(event);
      }
      const isPrimaryButton = event.buttons === 1;
      return this.isTouch(event) || isPrimaryButton;
    }
    /**
     * Check if the event is within the bounds of the element.
     *
     * This is only needed for the "stuck" contextmenu longpress on Chrome.
     */
    inBounds({ x: x2, y: y3 }) {
      const { top, left, bottom, right } = this.getBoundingClientRect();
      return x2 >= left && x2 <= right && y3 >= top && y3 <= bottom;
    }
    isTouch({ pointerType }) {
      return pointerType === "touch";
    }
    /** @private */
    async handleEvent(event) {
      if (FORCED_COLORS?.matches) {
        return;
      }
      switch (event.type) {
        case "click":
          this.handleClick();
          break;
        case "contextmenu":
          this.handleContextmenu();
          break;
        case "pointercancel":
          this.handlePointercancel(event);
          break;
        case "pointerdown":
          await this.handlePointerdown(event);
          break;
        case "pointerenter":
          this.handlePointerenter(event);
          break;
        case "pointerleave":
          this.handlePointerleave(event);
          break;
        case "pointerup":
          this.handlePointerup(event);
          break;
        default:
          break;
      }
    }
    onControlChange(prev, next) {
      if (o6)
        return;
      for (const event of EVENTS2) {
        prev?.removeEventListener(event, this);
        next?.addEventListener(event, this);
      }
    }
  };
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], Ripple.prototype, "disabled", void 0);
  __decorate([
    r4()
  ], Ripple.prototype, "hovered", void 0);
  __decorate([
    r4()
  ], Ripple.prototype, "pressed", void 0);
  __decorate([
    e4(".surface")
  ], Ripple.prototype, "mdRoot", void 0);

  // node_modules/@material/web/ripple/internal/ripple-styles.css.js
  var styles10 = i`:host{display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}:host,.surface{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:rgba(0,0,0,0)}.surface::before,.surface::after{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side, var(--md-ripple-pressed-color, var(--md-sys-color-on-surface, #1d1b20)) max(100% - 70px, 65%), transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-ripple-hover-opacity, 0.08)}.pressed::after{opacity:var(--md-ripple-pressed-opacity, 0.12);transition-duration:105ms}/*# sourceMappingURL=ripple-styles.css.map */
`;

  // node_modules/@material/web/ripple/ripple.js
  var MdRipple = class MdRipple2 extends Ripple {
  };
  MdRipple.styles = [styles10];
  MdRipple = __decorate([
    t("md-ripple")
  ], MdRipple);

  // node_modules/@material/web/menu/internal/controllers/menuItemController.js
  var MenuItemController = class {
    /**
     * @param host The MenuItem in which to attach this controller to.
     * @param config The object that configures this controller's behavior.
     */
    constructor(host, config) {
      this.host = host;
      this.internalTypeaheadText = null;
      this.onClick = () => {
        if (this.host.keepOpen)
          return;
        this.host.dispatchEvent(createDefaultCloseMenuEvent(this.host, {
          kind: CloseReason.CLICK_SELECTION
        }));
      };
      this.onKeydown = (event) => {
        if (this.host.href && event.code === "Enter") {
          const interactiveElement = this.getInteractiveElement();
          if (interactiveElement instanceof HTMLAnchorElement) {
            interactiveElement.click();
          }
        }
        if (event.defaultPrevented)
          return;
        const keyCode = event.code;
        if (this.host.keepOpen && keyCode !== "Escape")
          return;
        if (isClosableKey(keyCode)) {
          event.preventDefault();
          this.host.dispatchEvent(createDefaultCloseMenuEvent(this.host, {
            kind: CloseReason.KEYDOWN,
            key: keyCode
          }));
        }
      };
      this.getHeadlineElements = config.getHeadlineElements;
      this.getSupportingTextElements = config.getSupportingTextElements;
      this.getDefaultElements = config.getDefaultElements;
      this.getInteractiveElement = config.getInteractiveElement;
      this.host.addController(this);
    }
    /**
     * The text that is selectable via typeahead. If not set, defaults to the
     * innerText of the item slotted into the `"headline"` slot, and if there are
     * no slotted elements into headline, then it checks the _default_ slot, and
     * then the `"supporting-text"` slot if nothing is in _default_.
     */
    get typeaheadText() {
      if (this.internalTypeaheadText !== null) {
        return this.internalTypeaheadText;
      }
      const headlineElements = this.getHeadlineElements();
      const textParts = [];
      headlineElements.forEach((headlineElement) => {
        if (headlineElement.textContent && headlineElement.textContent.trim()) {
          textParts.push(headlineElement.textContent.trim());
        }
      });
      if (textParts.length === 0) {
        this.getDefaultElements().forEach((defaultElement) => {
          if (defaultElement.textContent && defaultElement.textContent.trim()) {
            textParts.push(defaultElement.textContent.trim());
          }
        });
      }
      if (textParts.length === 0) {
        this.getSupportingTextElements().forEach((supportingTextElement) => {
          if (supportingTextElement.textContent && supportingTextElement.textContent.trim()) {
            textParts.push(supportingTextElement.textContent.trim());
          }
        });
      }
      return textParts.join(" ");
    }
    /**
     * The recommended tag name to render as the list item.
     */
    get tagName() {
      const type = this.host.type;
      switch (type) {
        case "link":
          return "a";
        case "button":
          return "button";
        default:
        case "menuitem":
        case "option":
          return "li";
      }
    }
    /**
     * The recommended role of the menu item.
     */
    get role() {
      return this.host.type === "option" ? "option" : "menuitem";
    }
    hostConnected() {
      this.host.toggleAttribute("md-menu-item", true);
    }
    hostUpdate() {
      if (this.host.href) {
        this.host.type = "link";
      }
    }
    /**
     * Use to set the typeaheadText when it changes.
     */
    setTypeaheadText(text) {
      this.internalTypeaheadText = text;
    }
  };

  // node_modules/@material/web/select/internal/selectoption/selectOptionController.js
  function createRequestSelectionEvent() {
    return new Event("request-selection", {
      bubbles: true,
      composed: true
    });
  }
  function createRequestDeselectionEvent() {
    return new Event("request-deselection", {
      bubbles: true,
      composed: true
    });
  }
  var SelectOptionController = class {
    /**
     * The recommended role of the select option.
     */
    get role() {
      return this.menuItemController.role;
    }
    /**
     * The text that is selectable via typeahead. If not set, defaults to the
     * innerText of the item slotted into the `"headline"` slot, and if there are
     * no slotted elements into headline, then it checks the _default_ slot, and
     * then the `"supporting-text"` slot if nothing is in _default_.
     */
    get typeaheadText() {
      return this.menuItemController.typeaheadText;
    }
    setTypeaheadText(text) {
      this.menuItemController.setTypeaheadText(text);
    }
    /**
     * The text that is displayed in the select field when selected. If not set,
     * defaults to the textContent of the item slotted into the `"headline"` slot,
     * and if there are no slotted elements into headline, then it checks the
     * _default_ slot, and then the `"supporting-text"` slot if nothing is in
     * _default_.
     */
    get displayText() {
      if (this.internalDisplayText !== null) {
        return this.internalDisplayText;
      }
      return this.menuItemController.typeaheadText;
    }
    setDisplayText(text) {
      this.internalDisplayText = text;
    }
    /**
     * @param host The SelectOption in which to attach this controller to.
     * @param config The object that configures this controller's behavior.
     */
    constructor(host, config) {
      this.host = host;
      this.internalDisplayText = null;
      this.lastSelected = this.host.selected;
      this.firstUpdate = true;
      this.onClick = () => {
        this.menuItemController.onClick();
      };
      this.onKeydown = (e10) => {
        this.menuItemController.onKeydown(e10);
      };
      this.menuItemController = new MenuItemController(host, config);
      host.addController(this);
    }
    hostUpdate() {
      if (this.lastSelected !== this.host.selected) {
        this.host.ariaSelected = this.host.selected ? "true" : "false";
      }
    }
    hostUpdated() {
      if (this.lastSelected !== this.host.selected && !this.firstUpdate) {
        if (this.host.selected) {
          this.host.dispatchEvent(createRequestSelectionEvent());
        } else {
          this.host.dispatchEvent(createRequestDeselectionEvent());
        }
      }
      this.lastSelected = this.host.selected;
      this.firstUpdate = false;
    }
  };

  // node_modules/@material/web/select/internal/selectoption/select-option.js
  var SelectOptionEl = class extends s3 {
    constructor() {
      super(...arguments);
      this.disabled = false;
      this.isMenuItem = true;
      this.selected = false;
      this.value = "";
      this.type = "option";
      this.selectOptionController = new SelectOptionController(this, {
        getHeadlineElements: () => {
          return this.headlineElements;
        },
        getSupportingTextElements: () => {
          return this.supportingTextElements;
        },
        getDefaultElements: () => {
          return this.defaultElements;
        },
        getInteractiveElement: () => this.listItemRoot
      });
    }
    /**
     * The text that is selectable via typeahead. If not set, defaults to the
     * innerText of the item slotted into the `"headline"` slot.
     */
    get typeaheadText() {
      return this.selectOptionController.typeaheadText;
    }
    set typeaheadText(text) {
      this.selectOptionController.setTypeaheadText(text);
    }
    /**
     * The text that is displayed in the select field when selected. If not set,
     * defaults to the textContent of the item slotted into the `"headline"` slot.
     */
    get displayText() {
      return this.selectOptionController.displayText;
    }
    set displayText(text) {
      this.selectOptionController.setDisplayText(text);
    }
    render() {
      return this.renderListItem(x`
      <md-item>
        <div slot="container">
          ${this.renderRipple()} ${this.renderFocusRing()}
        </div>
        <slot name="start" slot="start"></slot>
        <slot name="end" slot="end"></slot>
        ${this.renderBody()}
      </md-item>
    `);
    }
    /**
     * Renders the root list item.
     *
     * @param content the child content of the list item.
     */
    renderListItem(content) {
      return x`
      <li
        id="item"
        tabindex=${this.disabled ? -1 : 0}
        role=${this.selectOptionController.role}
        aria-label=${this.ariaLabel || T}
        aria-selected=${this.ariaSelected || T}
        aria-checked=${this.ariaChecked || T}
        aria-expanded=${this.ariaExpanded || T}
        aria-haspopup=${this.ariaHasPopup || T}
        class="list-item ${e8(this.getRenderClasses())}"
        @click=${this.selectOptionController.onClick}
        @keydown=${this.selectOptionController.onKeydown}
        >${content}</li
      >
    `;
    }
    /**
     * Handles rendering of the ripple element.
     */
    renderRipple() {
      return x` <md-ripple
      part="ripple"
      for="item"
      ?disabled=${this.disabled}></md-ripple>`;
    }
    /**
     * Handles rendering of the focus ring.
     */
    renderFocusRing() {
      return x` <md-focus-ring
      part="focus-ring"
      for="item"
      inward></md-focus-ring>`;
    }
    /**
     * Classes applied to the list item root.
     */
    getRenderClasses() {
      return {
        "disabled": this.disabled,
        "selected": this.selected
      };
    }
    /**
     * Handles rendering the headline and supporting text.
     */
    renderBody() {
      return x`
      <slot></slot>
      <slot name="overline" slot="overline"></slot>
      <slot name="headline" slot="headline"></slot>
      <slot name="supporting-text" slot="supporting-text"></slot>
      <slot
        name="trailing-supporting-text"
        slot="trailing-supporting-text"></slot>
    `;
    }
    focus() {
      this.listItemRoot?.focus();
    }
  };
  (() => {
    requestUpdateOnAriaChange(SelectOptionEl);
  })();
  SelectOptionEl.shadowRootOptions = {
    ...s3.shadowRootOptions,
    delegatesFocus: true
  };
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], SelectOptionEl.prototype, "disabled", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "md-menu-item", reflect: true })
  ], SelectOptionEl.prototype, "isMenuItem", void 0);
  __decorate([
    n3({ type: Boolean })
  ], SelectOptionEl.prototype, "selected", void 0);
  __decorate([
    n3()
  ], SelectOptionEl.prototype, "value", void 0);
  __decorate([
    e4(".list-item")
  ], SelectOptionEl.prototype, "listItemRoot", void 0);
  __decorate([
    o4({ slot: "headline" })
  ], SelectOptionEl.prototype, "headlineElements", void 0);
  __decorate([
    o4({ slot: "supporting-text" })
  ], SelectOptionEl.prototype, "supportingTextElements", void 0);
  __decorate([
    n4({ slot: "" })
  ], SelectOptionEl.prototype, "defaultElements", void 0);
  __decorate([
    n3({ attribute: "typeahead-text" })
  ], SelectOptionEl.prototype, "typeaheadText", null);
  __decorate([
    n3({ attribute: "display-text" })
  ], SelectOptionEl.prototype, "displayText", null);

  // node_modules/@material/web/select/select-option.js
  var MdSelectOption = class MdSelectOption2 extends SelectOptionEl {
  };
  MdSelectOption.styles = [styles8];
  MdSelectOption = __decorate([
    t("md-select-option")
  ], MdSelectOption);

  // src/demo.js
  async function getDatasets() {
    return fetch("datasets.json").then((r8) => r8.json());
  }
  function setDataset(dataset) {
    const $vis = document.getElementById("vis");
    console.log(dataset, $vis);
    for (const attr of Object.keys(dataset)) {
      $vis.setAttribute(attr, dataset[attr]);
    }
  }
  async function setupDatasetsDropdown() {
    const datasets = await getDatasets();
    const $datasets = document.getElementById("dataset-input");
    $datasets.innerHTML = datasets.map(
      ({ label }) => `<md-select-option>
        <div slot="headline">${label}</div>
        </md-select-option>`
    ).join("\n");
    $datasets.addEventListener("change", (e10) => {
      const dataset = datasets[$datasets.selectedIndex];
      setDataset(dataset);
    });
    setDataset(datasets[0]);
    setTimeout(() => {
      $datasets.selectIndex(0);
    }, 50);
  }
  window.addEventListener("DOMContentLoaded", setupDatasetsDropdown);
})();
/*! Bundled license information:

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/web/internal/motion/animation.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/internal/field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/internal/filled-field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/internal/filled-styles.css.js:
  (**
    * @license
    * Copyright 2022 Google LLC
    * SPDX-License-Identifier: Apache-2.0
    *)

@material/web/field/internal/shared-styles.css.js:
  (**
    * @license
    * Copyright 2022 Google LLC
    * SPDX-License-Identifier: Apache-2.0
    *)

@material/web/field/filled-field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lit-html/static.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/web/elevation/internal/elevation.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/elevation/internal/elevation-styles.css.js:
  (**
    * @license
    * Copyright 2022 Google LLC
    * SPDX-License-Identifier: Apache-2.0
    *)

@material/web/elevation/elevation.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/controller/attachable-controller.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/focus/internal/focus-ring.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/focus/internal/focus-ring-styles.css.js:
  (**
    * @license
    * Copyright 2022 Google LLC
    * SPDX-License-Identifier: Apache-2.0
    *)

@material/web/focus/md-focus-ring.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/web/list/internal/list-navigation-helpers.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/list/internal/list-controller.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/controllers/shared.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/controllers/surfacePositionController.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/controllers/typeaheadController.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/menu.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/menu-styles.css.js:
  (**
    * @license
    * Copyright 2022 Google LLC
    * SPDX-License-Identifier: Apache-2.0
    *)

@material/web/menu/menu.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/aria/aria.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/aria/delegate.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/events/redispatch-event.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/element-internals.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/constraint-validation.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/form-associated.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/on-report-validity.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/validators/validator.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/validators/select-validator.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/shared.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/select.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/filled-select.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/filled-select-styles.css.js:
  (**
    * @license
    * Copyright 2022 Google LLC
    * SPDX-License-Identifier: Apache-2.0
    *)

@material/web/select/internal/shared-styles.css.js:
  (**
    * @license
    * Copyright 2022 Google LLC
    * SPDX-License-Identifier: Apache-2.0
    *)

@material/web/select/filled-select.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/menuitem/menu-item-styles.css.js:
  (**
    * @license
    * Copyright 2022 Google LLC
    * SPDX-License-Identifier: Apache-2.0
    *)

@material/web/labs/item/internal/item.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/item/internal/item-styles.css.js:
  (**
    * @license
    * Copyright 2022 Google LLC
    * SPDX-License-Identifier: Apache-2.0
    *)

@material/web/labs/item/item.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/ripple/internal/ripple.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/ripple/internal/ripple-styles.css.js:
  (**
    * @license
    * Copyright 2022 Google LLC
    * SPDX-License-Identifier: Apache-2.0
    *)

@material/web/ripple/ripple.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/controllers/menuItemController.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/selectoption/selectOptionController.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/selectoption/select-option.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/select-option.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
