import {
  createElementBlock,
  openBlock,
  resolveDirective,
  withDirectives
} from "./chunk-FA4MWVOB.js";
import "./chunk-BUSYA2B4.js";

// node_modules/vue-input-facade/dist/vue-input-facade.js
var D = {
  "#": { pattern: /\d/ },
  X: { pattern: /[0-9a-z]/i },
  S: { pattern: /[a-z]/i },
  A: { pattern: /[a-z]/i, transform: (e) => e.toLocaleUpperCase() },
  a: { pattern: /[a-z]/i, transform: (e) => e.toLocaleLowerCase() },
  "\\": { escape: true },
  "?": { optional: true },
  "*": { repeat: true },
  "|": { pipe: true }
};
var g = "__input-facade__";
function I(e) {
  this.masked = this.unmasked = e || "";
}
function S() {
  return new CustomEvent("input", {
    bubbles: true,
    cancelable: true,
    detail: { facade: true }
  });
}
function E(e, t) {
  return (Array.isArray(e) || typeof e == "string") && (e = { mask: e }), Object.assign(e || {}, t);
}
function w(e) {
  const t = e instanceof HTMLInputElement ? e : e.querySelector("input");
  if (!t)
    throw new Error("facade directive requires an input element");
  return t;
}
function T(e, t) {
  const { target: n, detail: a, inputType: s } = e;
  if (a != null && a.facade || (e.stopPropagation(), ["insertCompositionText", "insertFromComposition"].includes(s) && t[g].config.mask))
    return false;
  const i = n.value, r = n.selectionEnd, { oldValue: o } = n[g];
  C(n, null, { emit: false }, e), K(e, i, r), o !== n.value && n.dispatchEvent(S());
}
function K(e, t, n) {
  const { target: a } = e, s = ["text", "tel", "search", null].includes(a.getAttribute("type")), i = a[g] && a[g].config;
  if (a !== document.activeElement || !s || !i.mask && !i.masked)
    return;
  const r = e.inputType || "insertText", o = ["insertText", "insertFromPaste"].includes(r), c = o && n == t.length;
  let u = o && t[n - 1];
  const d = a.value.toLocaleLowerCase();
  let p = n;
  if (c)
    p = d.length;
  else if (u) {
    u = u.toLocaleLowerCase();
    let m = p;
    for (; m <= d.length && d.charAt(m - 1) !== u; )
      m++;
    p = m <= d.length ? m : p - 1;
  }
  a.setSelectionRange(p, p), setTimeout(function() {
    a.setSelectionRange(p, p);
  }, 0);
}
function C(e, t, { emit: n = true, force: a = false } = {}, s) {
  var u, d;
  let { config: i, oldValue: r, isComposing: o } = e[g], c = ((d = (u = t == null ? void 0 : t.data) == null ? void 0 : u.model) == null ? void 0 : d.value) || e.value;
  if (!(i.mask && o) && (r = r || "", c = c || "", a || r !== c)) {
    ["deleteByCut", "deleteContent", "deleteContentBackward", "deleteContentForward"].includes(s == null ? void 0 : s.inputType) && (i = { ...i, short: true });
    let p = O(c, i);
    if (s && typeof i.formatter == "function") {
      const m = i.formatter(p, s);
      if (typeof m == "string")
        p = O(m, i);
      else if (m === false) {
        e.value = r;
        return;
      }
    }
    e[g].oldValue = p.masked, e.unmaskedValue = p.unmasked, e.value !== p.masked && (e.value = p.masked), n && e.dispatchEvent(S());
  }
}
var L = D;
var B = false;
try {
  "a".localeCompare("b", "i");
} catch (e) {
  B = e.name === "RangeError";
}
function P(e) {
  e && (L = e);
}
function $(e, t) {
  const n = t.masks.slice().sort((o, c) => o.length - c.length), a = (o) => Object.assign({}, t, o), s = (o, c) => {
    const u = v(e, a({ mask: c })), d = o.unmasked.length;
    return u.unmasked.length > d ? u : o;
  };
  if (!n.length)
    return new I();
  const i = n.shift();
  let r = v(e, a({ mask: i }));
  for (; n.length; ) {
    const o = n.shift();
    r = s(r, o);
  }
  return r;
}
function v(e, t) {
  var m, b;
  let { mask: n = "", tokens: a, prefill: s = false, short: i = false } = t;
  a = a ? Object.assign({}, L, a) : L;
  let r = new I(), o = false, c = 0, u = 0, d = "";
  function p(h) {
    const k = n[u + 1], l = a[k];
    return {
      escape: !!(h != null && h.escape),
      optional: !!(l != null && l.optional),
      repeat: !!(l != null && l.repeat),
      ...(l == null ? void 0 : l.pipe) && {
        pipe: n.substring(u).match(/^(.\|)+./g)[0].split("|")
      }
    };
  }
  for (; u < n.length; ) {
    const h = n[u], k = a[h];
    let l = e[c];
    const f = p(k);
    if (k && !o && !f.pipe) {
      if (f.escape) {
        o = true, u++;
        continue;
      }
      if (!l)
        break;
      if ((m = k.pattern) != null && m.test(l))
        l = ((b = k.transform) == null ? void 0 : b.call(k, l)) || l, r.unmasked += l, r.masked += d + l, d = "", f.repeat || (u += f.optional ? 2 : 1);
      else if (f.optional || f.repeat) {
        u += 2;
        continue;
      }
      c++;
    } else if (f.pipe) {
      if (!l)
        break;
      const V = f.pipe.find(F.bind(null, l));
      V && (r.unmasked += V, r.masked += d + V, u += f.pipe.length * 2 - 1, d = ""), c++;
    } else
      F(l, h) ? (r.masked += d + h, c++, d = "", f.optional && (r.unmasked += h)) : f.optional || (d += h), o = false, u += f.optional ? 2 : 1;
  }
  return (s && !r.unmasked || !i && r.unmasked) && (r.masked += d), r;
}
function F(e, t) {
  return B ? (e == null ? void 0 : e.localeCompare(t, void 0, { sensitivity: "base" })) === 0 : (e == null ? void 0 : e.toLocaleLowerCase()) === (t == null ? void 0 : t.toLocaleLowerCase());
}
function O(e, t) {
  return e = (e || "").toString(), t = E(t), t.mask ? Array.isArray(t.mask) ? $(e, Object.assign({}, t, { masks: t.mask })) : v(e, t) : new I(e);
}
var y = g;
var x = {
  beforeMount: (e, { value: t, modifiers: n }, a) => {
    e = w(e);
    const s = E(t, n);
    e[y] = { config: s }, C(e, a, { force: s.prefill });
  },
  mounted: (e) => {
    e = w(e);
    const t = e[y], n = e.parentElement || e, a = (i) => {
      i.target === e && T(i, e);
    }, s = (i) => {
      i.target === e && (i.type === "compositionend" ? (e[y].isComposing = false, T(i, e)) : e[y].isComposing = true);
    };
    n.addEventListener("input", a, true), n.addEventListener("compositionstart", s, true), n.addEventListener("compositionupdate", s, true), n.addEventListener("compositionend", s, true), t.cleanup = () => {
      n.removeEventListener("input", a, true), n.removeEventListener("compositionstart", s, true), n.removeEventListener("compositionend", s, true), n.removeEventListener("compositionupdate", s, true);
    };
  },
  updated: (e, { value: t, oldValue: n, modifiers: a }, s) => {
    e = w(e), t !== n ? (e[y].config = E(t, a), C(e, s, { force: true })) : C(e, s);
  },
  unmounted: (e) => {
    w(e)[y].cleanup();
  }
};
var H = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
};
var N = {
  name: "InputFacade",
  directives: { facade: x },
  props: {
    /**
     * A function to format the value after applying the mask. The function will receive an
     * object with the masked and unmasked value. The result of this function will determine
     * what happens with the value.
     * <br />
     * If a string is returned, then that string will pass through the masker function once more and its value
     * will be set to the input. If false (boolean) is returned, the input will be rejected and the
     * previous value will be restored. Otherwise the facade logic will continue as usual.
     * @since v1.3
     */
    formatter: {
      type: Function,
      default: null
    },
    /**
     * The mask pattern for this input, it could be a single pattern or multiple patterns when its an array.
     */
    mask: {
      type: [String, Array],
      default: null
    },
    /**
     * Whether to emit the value masked or unmasked
     */
    masked: {
      type: Boolean,
      default: false
    },
    /**
     * If the mask starts with static charaters, prefill the field with said characters
     * @since v1.3
     */
    prefill: {
      type: Boolean,
      default: false
    },
    /**
     * Keep the value short by not showing static characters until after typing
     * @since v1.3
     */
    short: {
      type: Boolean,
      default: false
    },
    /**
     * Token object to override the defaults with
     */
    tokens: {
      type: Object,
      default: () => ({})
    },
    /**
     * The input's value
     * @model
     */
    modelValue: {
      type: [String, Number],
      default: ""
    },
    modelModifiers: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:model-value", "change", "keydown", "keyup", "paste"],
  data() {
    return {
      maskedValue: this.modelValue,
      unmaskedValue: null
    };
  },
  computed: {
    config() {
      return {
        mask: this.mask,
        masked: this.masked,
        tokens: this.tokens,
        formatter: this.formatter,
        prefill: this.prefill,
        short: this.short
      };
    },
    emittedValue() {
      return this.mask && this.masked ? this.maskedValue : this.unmaskedValue;
    }
  },
  watch: {
    modelValue(e) {
      e !== this.emittedValue && (this.maskedValue = e);
    },
    mask: {
      deep: true,
      handler(e) {
        !e && !this.masked && (this.maskedValue = this.unmaskedValue);
      }
    },
    masked() {
      this.emitInput();
    }
  },
  methods: {
    onInput({ target: e }) {
      this.maskedValue = e.value, this.unmaskedValue = e.unmaskedValue, this.modelModifiers.lazy || this.emitInput();
    },
    onChange() {
      this.$emit("change", this.emittedValue), this.modelModifiers.lazy && this.emitInput();
    },
    emitInput() {
      this.$emit("update:model-value", this.emittedValue);
    }
  }
};
var R = ["value"];
function q(e, t, n, a, s, i) {
  const r = resolveDirective("facade");
  return withDirectives((openBlock(), createElementBlock("input", {
    type: "text",
    value: s.maskedValue,
    onInput: t[0] || (t[0] = (...o) => i.onInput && i.onInput(...o)),
    onChange: t[1] || (t[1] = (...o) => i.onChange && i.onChange(...o)),
    onKeyup: t[2] || (t[2] = (o) => e.$emit("keyup", o)),
    onKeydown: t[3] || (t[3] = (o) => e.$emit("keydown", o)),
    onPaste: t[4] || (t[4] = (o) => e.$emit("paste", o))
  }, null, 40, R)), [
    [r, i.config]
  ]);
}
var A = H(N, [["render", q]]);
var G = {
  /**
   * Vue plugin definition
   *
   * @param {Vue} app the app instance
   * @param {Object} options.tokens the tokens to use as global tokens
   * @param {Object} options.name the tokens to use as global tokens
   */
  install(e, t = {}) {
    t.tokens && P(t.tokens), e.component(A.name, A), e.directive(t.name || "facade", x);
  }
};
typeof window < "u" && window.Vue && window.Vue.use(G);
export {
  A as InputFacade,
  x as facade,
  O as masker,
  G as plugin,
  D as tokens
};
//# sourceMappingURL=vue-input-facade.js.map
