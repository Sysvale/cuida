import vueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import VCalendar from 'v-calendar';
import _$1 from 'lodash';
import { XIcon, AlertTriangleIcon, CheckIcon, InfoIcon, AlertCircleIcon, PlusIcon, MinusIcon, ChevronLeftIcon } from 'vue-feather-icons';
import moment from 'moment';
import { directive } from 'vue-on-click-outside';
import Multiselect from 'vue-multiselect';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
	props: {
		/**
		 * Define a cor da ProgressBar.
		 */
		color: {
			type: String,
			default: '#2EB88D',
			required: false,
		},
		/**
		 * Define a cor de background da ProgressBar.
		 */
		backgroundColor: {
			type: String,
			default: '#DDE2E7',
			required: false,
		},
		/**
		 * Define a largura da ProgressBar.
		 */
		percentage: {
			type: Number,
			default: 0,
			required: true,
		},
		/**
		 * Define se a porcentagem vai ser mostrada.
		 */
		showText: {
			type: Boolean,
			default: true,
			description: 'Defines if the text will be displayed',
			required: false,
		},
	},

	computed: {
		backgroundColorStyle: function backgroundColorStyle() {
			return {
				'--backgroundColor': this.backgroundColor,
			};
		},

		formatedPercentage: function formatedPercentage() {
			return ((parseInt(this.percentage * 100, 10)) + "%");
		},

		progressIndicatorStyle: function progressIndicatorStyle() {
			return {
				'--width': this.formatedPercentage,
				'--color': this.color,
			};
		},
	},
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{attrs:{"id":"progressBar"}},[_c('div',{staticClass:"bar"},[(_vm.showText)?_c('span',{staticClass:"bar__text"},[_vm._v("\n\t\t\t"+_vm._s(_vm.formatedPercentage)+"\n\t\t")]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"bar__content",style:(_vm.backgroundColorStyle)},[_c('div',{staticClass:"bar__indicator",style:(_vm.progressIndicatorStyle)})])])])};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-efd66c3a_0", { source: "#progressBar .bar[data-v-efd66c3a]{display:flex;align-items:center;flex-direction:column}#progressBar .bar__content[data-v-efd66c3a]{background-color:var(--backgroundColor);border-radius:80px;width:100%;height:7px}#progressBar .bar__indicator[data-v-efd66c3a]{border-radius:80px;height:7px;background-color:var(--color);width:var(--width)}#progressBar .bar__text[data-v-efd66c3a]{font-weight:600}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-efd66c3a";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$1 = {
	props: {
		/**
		* A lista de actions a ser renderizada.
		*/
		actions: {
			type: Array,
			default: function () { return []; },
			required: true,
		},
		/**
		 * O número de itens que vai ser mostrado quando o componente for renderizado.
		 */
		numberOfExpandedActions: {
			type: Number,
			default: 2,
			required: false,
		},
		/**
		 * Faz com que o componente seja renderizado do lado esquerdo.
		 */
		left: {
			type: Boolean,
			default: false,
		},
	},
	data: function data() {
		return {
			action: _.cloneDeep(this.actions),
			internalNumberOfExpandedActions: this.numberOfExpandedActions,
			itsBeingShown: false,
		};
	},

	methods: {
		toggleCollapseState: function toggleCollapseState() {
			this.internalNumberOfExpandedActions = this.itsBeingShown
				? this.numberOfExpandedActions : this.action.length;
			this.itsBeingShown = !this.itsBeingShown;
			/**
			* Evento emitido quando a lista é expandida ('true') ou contraída ('false').
			* @event expanded
			* @type {Event}
			*/
			this.$emit('expanded', this.itsBeingShown);
		},
	},
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"action-list"},[_c('div',{class:_vm.left ? 'action-list--left' : 'action-list--right'},[(_vm.left)?_c('div',[(_vm.actions.length > _vm.numberOfExpandedActions)?_c('div',{staticClass:"action-list__item--right-bordered",on:{"click":_vm.toggleCollapseState}},[_vm._t("action-trigger",[_vm._v("\n\t\t\t\t\t"+_vm._s(_vm.itsBeingShown ? 'Menos ações' : 'Mais ações')+"\n\t\t\t\t")])],2):_vm._e()]):_vm._e(),_vm._v(" "),_vm._l((_vm.actions),function(action,i){return _c('div',{key:action.title},[_c('transition',{attrs:{"name":"action-list__slide-fade"}},[(i <= _vm.internalNumberOfExpandedActions - 1)?_c('div',{class:i === 0 ? 'action-list__item' : 'action-list__item--left-bordered',on:{"click":function($event){return _vm.$emit('action-clicked', action)}}},[_vm._t("action",null,{"list":action})],2):_vm._e()])],1)}),_vm._v(" "),(!_vm.left)?_c('div',[(_vm.actions.length > _vm.numberOfExpandedActions)?_c('div',{staticClass:"action-list__item--left-bordered",on:{"click":_vm.toggleCollapseState}},[_vm._t("action-trigger",[_vm._v("\n\t\t\t\t\t"+_vm._s(_vm.itsBeingShown ? 'Menos ações' : 'Mais ações')+"\n\t\t\t\t")])],2):_vm._e()]):_vm._e()],2)])};
var __vue_staticRenderFns__$1 = [];

  /* style */
  var __vue_inject_styles__$1 = function (inject) {
    if (!inject) { return }
    inject("data-v-86535f0a_0", { source: ".action-list--left[data-v-86535f0a],.action-list--right[data-v-86535f0a]{color:#566676;font-weight:600;display:flex;justify-content:flex-end}.action-list--left[data-v-86535f0a]{justify-content:flex-start}.action-list__item[data-v-86535f0a],.action-list__item--left-bordered[data-v-86535f0a],.action-list__item--right-bordered[data-v-86535f0a]{padding:24px;cursor:pointer;border-radius:1px}.action-list__item--left-bordered[data-v-86535f0a]:hover,.action-list__item--right-bordered[data-v-86535f0a]:hover,.action-list__item[data-v-86535f0a]:hover{background-color:#fafcfe}.action-list__item--right-bordered[data-v-86535f0a]{border-right:1px solid #d3dbe4}.action-list__item--left-bordered[data-v-86535f0a]{border-left:1px solid #d3dbe4}.action-list__slide-fade-enter-active[data-v-86535f0a]{transition:all .3s ease}.action-list__slide-fade-leave-active[data-v-86535f0a]{transition:all .1s ease}.action-list__slide-fade-enter[data-v-86535f0a],.action-list__slide-fade-leave-to[data-v-86535f0a]{transform:translateX(10px);opacity:0}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$1 = "data-v-86535f0a";
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$2 = {
	props: {
		/**
		 * A prop usada como v-model para monitorar a seleção do RadioButton
		*/
		value: {
			default: null,
			required: true,
		},
		/**
		 * O número de radio buttons a ser renderizado no grupo
		 */
		options: {
			type: Array,
			default: function () { return []; },
			required: true,
		},
		/**
		 * Controla o status do grupo de radio buttons
		 */
		disabled: {
			type: Boolean,
			default: false,
			required: false,
		},
		/**
		 * Quando verdadeira, faz com que os radio buttons sejam renderizados um ao lado do outro
		 */
		inline: {
			type: Boolean,
			default: false,
			description: "When true, the radio buttons will be displayed in a row.",
			required: false,
		},
	},

	data: function data() {
		return {
			selected: this.value,
		};
	},

	watch: {
		selected: function selected(value) {
			this.$emit('input', value);
		},

		value: {
			handler: function handler(newValue) {
				this.selected = newValue;
			},
			immediate: true,
		},
	},
};

/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{attrs:{"id":"radioButton"}},[_c('div',{class:{'button-group': _vm.inline }},_vm._l((_vm.options),function(option,i){return _c('div',{key:option.value,class:{'radio-button__container--vertical': _vm.inline && i > 0}},[_c('label',{staticClass:"radio-button",attrs:{"disabled":option.disabled || _vm.disabled,"for":option.value}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selected),expression:"selected"}],attrs:{"type":"radio","id":option.value,"disabled":option.disabled || _vm.disabled},domProps:{"value":option.value,"checked":_vm._q(_vm.selected,option.value)},on:{"change":function($event){_vm.selected=option.value;}}}),_vm._v(" "),_c('label',{staticClass:"radio-button__content",attrs:{"for":option.value}},[_vm._v("\n\t\t\t\t\t"+_vm._s(option.text)+"\n\t\t\t\t")])])])}),0)])};
var __vue_staticRenderFns__$2 = [];

  /* style */
  var __vue_inject_styles__$2 = function (inject) {
    if (!inject) { return }
    inject("data-v-433177a9_0", { source: "#radioButton [type=radio]:checked,#radioButton [type=radio]:not(:checked){position:absolute;left:-9999px}#radioButton [type=radio]:checked+label,#radioButton [type=radio]:not(:checked)+label{position:relative;padding:0 0 0 28px;cursor:pointer;line-height:20px;display:inline-block;color:#475766}#radioButton [type=radio]:checked+label:before,#radioButton [type=radio]:not(:checked)+label:before{content:\"\";position:absolute;left:0;top:0;width:20px;height:20px;border:1px solid #29333d;border-radius:100%;background:#fff}#radioButton [type=radio]:checked+label:after,#radioButton [type=radio]:not(:checked)+label:after{content:\"\";width:12px;height:12px;background:#1b59b1;position:absolute;top:4px;left:4px;border-radius:100%;-webkit-transition:all .3s ease;transition:all .3s ease}#radioButton [type=radio]:not(:checked)+label:after{opacity:0;-webkit-transform:scale(0);transform:scale(0)}#radioButton [type=radio]:checked+label:after{opacity:1;-webkit-transform:scale(1);transform:scale(1)}#radioButton .button-group{display:flex}#radioButton .radio-button{border:1px solid #bcc7d2;padding:12px 16px;border-radius:.5rem;cursor:pointer;display:inline-block}#radioButton .radio-button__container--vertical{margin:0 0 0 16px}#radioButton .radio-button__content{margin:0}#radioButton .radio-button:hover{background-color:#fafcfe;-webkit-transition:all .3s ease;transition:all .3s ease}#radioButton .radio-button[disabled=disabled]{background-color:#e2eaf3;-webkit-transition:all .3s ease;transition:all .3s ease}#radioButton .radio-button[disabled=disabled] [type=radio]:checked+label:before,#radioButton .radio-button[disabled=disabled] [type=radio]:not(:checked)+label:before{background:0 0}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$3 = {
	props: {
		/**
		 * O array que especifica os eventos que vão ser mostrados na timeline
		 */
		history: {
			type: Array,
			default: function () { return []; },
			required: true,
		},
	},
};

/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{attrs:{"id":"timeline"}},[_c('div',{staticClass:"container"},_vm._l((_vm.history),function(event,index){return _c('div',{key:index},[_c('div',{staticClass:"event__row"},[_c('div',[_c('p',{staticClass:"event__date"},[_vm._v("\n\t\t\t\t\t\t"+_vm._s(event.date)+"\n\t\t\t\t\t")])]),_vm._v(" "),_c('div',{staticClass:"timeline__container"},[_c('span',{staticClass:"event__pin"}),_vm._v(" "),(((index + 1) < _vm.history.length) && (_vm.history.length > 1))?_c('div',{staticClass:"timeline"}):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"content__container"},[_c('div',[_c('p',{staticClass:"content__title"},[_vm._v("\n\t\t\t\t\t\t\t"+_vm._s(event.title)+"\n\t\t\t\t\t\t")])]),_vm._v(" "),_c('span',{staticClass:"content__text"},[_vm._v("\n\t\t\t\t\t\t"+_vm._s(event.text)+"\n\t\t\t\t\t")]),_vm._v(" "),((index + 1) < _vm.history.length)?_c('hr'):_vm._e()])])])}),0)])};
var __vue_staticRenderFns__$3 = [];

  /* style */
  var __vue_inject_styles__$3 = function (inject) {
    if (!inject) { return }
    inject("data-v-57da78cc_0", { source: "#timeline .container{padding:24px!important;overflow:auto;max-height:350px;width:100%!important;scrollbar-color:#abb8c4 #fff;scrollbar-width:thin}#timeline .container::-webkit-scrollbar{width:.35rem}#timeline .container::-webkit-scrollbar-thumb{border-radius:4px;background:#abb8c4 #fff}#timeline .content__container{width:50%!important;margin:-8px 0 0 0}#timeline .content__text{color:#475766;margin:4px 0 0 0}#timeline .event__date{font-weight:400;color:#566676;text-transform:Capitalize;align-self:flex-end;margin:-4px 0 0 0}#timeline .event__pin{min-height:12px!important;min-width:11.5px!important;border-radius:50%!important;background-color:#2ac092;border:1px solid #2ac092}#timeline .event__row{display:flex;justify-content:space-between}#timeline .content__title{color:#1e252c;font-weight:600;margin:0}#timeline .timeline{height:100%!important;width:1px!important;background-color:#d3dbe4}#timeline .timeline__container{display:flex;flex-direction:column;align-items:center}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$3 = undefined;
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$3 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var script$4 = {
	props: {
		/**
		 * Define a lista dos itens do NavBar a serem mostrados.
		 * Os itens da lista devem ser objetos com `path` ou `route`, e com uma `label`
		 */
		items: {
			type: Array,
			default: function () { return ([]); },
			required: true,
			validator: function (values) {
				var invalidValues = values.filter(function (value) {
					var hasNotRoute = _.isEmpty(value.path) && _.isEmpty(value.route);
					var hasInvalidItems = _.isEmpty(value.items)
						|| value.items.filter(function (item) { return (_.isEmpty(item.path) && _.isEmpty(item.route)); }).length;
					return _.isEmpty(value.label) || (hasInvalidItems && hasNotRoute);
				});
				return !invalidValues.length;
			},
		},
		/**
		 * Define o estilo da NavBar. Quando setado para true,
		 * a NavBar passa a ter um tema claro, quando false, tem o tema padrão, escuro.
		 */
		isLightThemed: {
			type: Boolean,
			default: true,
		},
		/**
		 * O item ativo da NavBar
		 */
		activeItem: {
			type: Object,
			default: function () { return ({}); },
			required: true,
		},
	},

	data: function data() {
		return {
			internalActiveItem: this.activeItem,
			internalActiveParent: this.activeItem,
		};
	},

	computed: {
		computedItems: function computedItems() {
			var this$1 = this;

			return this.items.map(function (item) {
				var customItem = item;
				if (this$1.isDropdown(item)) {
					customItem.items = item.items.map(function (subitem) { return (Object.assign({}, {parent: _.clone(item)},
						subitem)); });
				}

				return customItem;
			});
		},
	},

	watch: {
		computedItems: {
			handler: function handler(newValue) {
				var this$1 = this;
				var assign, assign$1;

				var filtered = newValue.filter(function (item) { return item === this$1.activeItem; });

				if (filtered.length) {
					(assign = filtered, this.internalActiveItem = assign[0]);
					this.internalActiveParent = this.internalActiveItem;
				} else {
					var subitems = _.flatten(
						newValue
							.filter(function (item) { return !!item.items; })
							.map(function (ref) {
								var items = ref.items;

								return items;
					})
					);
					if (subitems.length) {
						(assign$1 = subitems.filter(
							function (item) { return this$1.resolveRoute(item) === this$1.resolveRoute(this$1.activeItem); }
						), this.internalActiveItem = assign$1[0]);

						this.internalActiveParent = this.internalActiveItem.parent;
					}
				}
			},
			immediate: true,
		},
	},

	methods: {
		handleClick: function handleClick(item, parent) {
			this.internalActiveItem = item;
			this.internalActiveParent = parent;
			/**
			 * Evento emitido quando um dos itens da NavBar é clicado
			* @event click
			* @type {Event}
				*/
			this.$emit('click', this.internalActiveItem);
		},

		resolveRoute: function resolveRoute(ref) {
			var route = ref.route;
			var path = ref.path;

			var to = !_.isEmpty(route) ? route : path;
			return to instanceof String ? { path: to } : to;
		},

		isActive: function isActive(item) {
			return Object.keys(this.internalActiveItem).length > 0
				? this.resolveRoute(this.internalActiveItem) === this.resolveRoute(item)
				: false;
		},

		getElementKey: function getElementKey(item, index, subitem) {
			if ( subitem === void 0 ) subitem = false;

			if (!item.label) { return; }

			return ("" + (item.label.replace(/\s/g, '')) + index + (subitem ? '-subitem' : ''));
		},

		isSubitem: function isSubitem(item) {
			return !!item.parent;
		},

		isDropdown: function isDropdown(item) {
			return !!item.items;
		},

		dropdownOrSingleItem: function dropdownOrSingleItem(item) {
			if (this.isDropdown(item)) { return 'b-nav-item-dropdown'; }
			return 'b-nav-item';
		},

		getClass: function getClass(item) {
			var accClass = this.isLightThemed ? 'cds-nav-bar__item--light' : 'cds-nav-bar__item--dark';

			if (
				this.isDropdown(item)
				&& this.internalActiveParent
				&& this.resolveRoute(this.internalActiveParent) === this.resolveRoute(item)
				&& this.internalActiveParent.label === item.label
			) {
				return (accClass + " active-parent");
			}
			return accClass;
		},
	},
};

/* script */
var __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"cds-nav-bar",attrs:{"id":"cds-nav-bar"}},[_c('b-nav',{class:_vm.isLightThemed ? 'cds-nav-bar--light' : 'cds-nav-bar--dark'},_vm._l((_vm.computedItems),function(item,i){return _c(_vm.dropdownOrSingleItem(item),{key:_vm.getElementKey(item, i),tag:"component",staticClass:"cds-nav-bar__item-container",class:_vm.getClass(item),attrs:{"id":_vm.getElementKey(item, i),"text":item.label,"active":_vm.isActive(item),"to":_vm.resolveRoute(item)},on:{"click":function($event){$event.preventDefault();return _vm.handleClick(item)}}},[(_vm.isDropdown(item))?_vm._l((item.items),function(subitem,j){return _c('b-dropdown-item',{key:_vm.getElementKey(subitem, j, true),attrs:{"id":_vm.getElementKey(subitem, j, true),"active":_vm.isActive(subitem),"to":_vm.resolveRoute(item)},on:{"click":function($event){$event.stopPropagation();return _vm.handleClick(subitem, item)}}},[_vm._v("\n\t\t\t\t\t"+_vm._s(subitem.label)+"\n\t\t\t\t")])}):[_vm._v("\n\t\t\t\t"+_vm._s(item.label)+"\n\t\t\t")]],2)}),1)],1)};
var __vue_staticRenderFns__$4 = [];

  /* style */
  var __vue_inject_styles__$4 = function (inject) {
    if (!inject) { return }
    inject("data-v-e5755b8a_0", { source: "a{outline:0}#cds-nav-bar .cds-nav-bar{padding:8px 0}#cds-nav-bar .cds-nav-bar--dark{background:#36424e}#cds-nav-bar .cds-nav-bar--dark .dropdown-menu{background:#36424e}#cds-nav-bar .cds-nav-bar--light{background:linear-gradient(.93deg,#fff 16.45%,#eff5fb 105.67%)}#cds-nav-bar .cds-nav-bar--light .dropdown-menu{background:#fff;box-shadow:2px 2px 4px #bcc7d2;border-radius:2px}#cds-nav-bar .cds-nav-bar__item,#cds-nav-bar .cds-nav-bar__item--dark,#cds-nav-bar .cds-nav-bar__item--light{margin:8px 24px 0 0}#cds-nav-bar .cds-nav-bar__item-container{margin:8px 24px 0 0}#cds-nav-bar .cds-nav-bar__item--dark .active{color:#fff;border-bottom:4px solid #2ac092;background:#566676;border-radius:4px 4px 0 0}#cds-nav-bar .cds-nav-bar__item--dark.active-parent{color:#fff;border-bottom:4px solid #2ac092;background:#566676;border-radius:4px 4px 0 0}#cds-nav-bar .cds-nav-bar__item--dark.active-parent .show{border-bottom:4px solid transparent}#cds-nav-bar .cds-nav-bar__item--dark.active-parent .dropdown-toggle{color:#fff}#cds-nav-bar .cds-nav-bar__item--dark .nav-link{color:#d3dbe4}#cds-nav-bar .cds-nav-bar__item--dark .nav-link:hover{color:#fff}#cds-nav-bar .cds-nav-bar__item--dark .nav-link.active{color:#fff}#cds-nav-bar .cds-nav-bar__item--dark .dropdown-item{color:#d3dbe4}#cds-nav-bar .cds-nav-bar__item--dark .dropdown-item:hover{color:#fff;background:0 0}#cds-nav-bar .cds-nav-bar__item--dark .dropdown-item.active{color:#fff;border-left:4px solid #2ac092;border-bottom:0;background:#475766;border-radius:0}#cds-nav-bar .cds-nav-bar__item--light .active{color:#29333d!important;border-bottom:4px solid #206ed9;background:#eff5fb;border-radius:4px 4px 0 0}#cds-nav-bar .cds-nav-bar__item--light.active-parent{color:#29333d!important;border-bottom:4px solid #206ed9;background:#eff5fb;border-radius:4px 4px 0 0}#cds-nav-bar .cds-nav-bar__item--light.active-parent .show{border-bottom:4px solid transparent}#cds-nav-bar .cds-nav-bar__item--light.active-parent .dropdown-toggle{color:#29333d}#cds-nav-bar .cds-nav-bar__item--light .nav-link{color:#475766}#cds-nav-bar .cds-nav-bar__item--light .nav-link:hover{color:#29333d;background:0 0}#cds-nav-bar .cds-nav-bar__item--light .nav-link .active{color:#29333d}#cds-nav-bar .cds-nav-bar__item--light .dropdown-item{color:#475766}#cds-nav-bar .cds-nav-bar__item--light .dropdown-item:hover{color:#29333d;background:0 0}#cds-nav-bar .cds-nav-bar__item--light .dropdown-item.active{border-left:4px solid #206ed9;border-bottom:0;background:#eff5fb!important;border-radius:0}.dropdown-item:active{background:inherit}.dropdown-item{padding:12px 0 12px 28px}.dropdown-menu{margin:4px 0 0 0;border:0;border-radius:0}.dropdown-toggle[aria-expanded=true]:after{transform:rotate(180deg)}.dropdown-toggle:after{transition:all .4s ease}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$4 = undefined;
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$4 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    createInjector,
    undefined,
    undefined
  );

var KeyCodes = {
  ESC: 27,
};

function generateKey(length) {
	if ( length === void 0 ) length = 8;

	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i += 1) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

//

var script$5 = {
	data: function data() {
		return {
			internalOffset: '-60%',
			sizes: {
				default: 276,
				sm: 180,
				lg: 360,
				xl: 520,
			},
		};
	},

	props: {
		/**
		* É uma prop utilizada como v-model. Controla a visibilidade do popover .
		*/
		value: {
			type: Boolean,
			default: false,
			required: true,
		},
		/**
		 * Define se o popover vai estar alinhado à esquerda ou à direita do elemento de target.
		 */
		alignment: {
			type: String,
			default: 'left',
		},
		/**
		 * Define o elemento que cujo comportamento servirá de gatilho à exibição do popover.
		 */
		target: {
			type: String,
			default: null,
			required: true,
		},
		/**
		 * Altera o alinhamento horizontal do popover em pixels, à partir do valor passado.
		 */
		offset: {
			type: String,
			default: null,
		},
		/**
		 * Define o tamanho do Popover. As opções são 'xl', 'lg', 'sm' e 'default.
		 */
		size: {
			type: String,
			default: 'default',
		},
		/**
		 * Define se o Popover vai ser fechado com o click no backdrop.
		 */
		noCloseOnBackdrop: {
			type: Boolean,
			default: false,
			description: "\n\t\t\t\tDefines if the element won't be dismissed when backdrop is click.\n\t\t\t",
		},
		/**
		 * Define se o Popover vai ser fechado quando o usuário pressionar 'ESC'.
		 */
		noCloseOnEsc: {
			type: Boolean,
			default: false,
			description: "\n\t\t\t\tDefines if the element won't be dismissed when esc is pressed.\n\t\t\t",
		},
	},

	computed: {
		placement: function placement() {
			return this.alignment === 'right' ? 'bottomright' : 'bottomleft';
		},

		popoverClasses: function popoverClasses() {
			var sizeClass = this.size ? ("s-popover-" + (this.size)) : '';
			return (sizeClass + " s-popover");
		},
	},

	watch: {
		alignment: function alignment(newValue) {
			this.alignment = newValue;
			this.calcOffset();
		},

		offset: function offset(newValue) {
			this.offset = newValue;
			this.calcOffset();
		},

		value: function value(newValue) {
			if (!newValue) {
				this.detachKeyupEvent();
				return;
			}

			this.attachKeyupEvent();
		},
	},

	mounted: function mounted() {
		this.calcOffset();
	},

	created: function created() {
		this.attachKeyupEvent();
	},

	beforeDestroy: function beforeDestroy() {
		this.detachKeyupEvent();
	},

	methods: {
		calcOffset: function calcOffset() {
			if (this.offset) {
				this.internalOffset = this.offset;
				return;
			}

			var target = document.getElementById(this.target);
			if (target) {
				var targetWidth = target.offsetWidth;
				var popoverWidth = this.sizes[this.size];
				var factor = this.alignment === 'right' ? 1 : -1;
				this.internalOffset = (popoverWidth - targetWidth) * factor / 2;
			}
		},

		shouldCloseOnBackdrop: function shouldCloseOnBackdrop() {
			if (!this.noCloseOnBackdrop) {
				/**
				 * Evento utilizado para implementar o v-model.
				* @event input
				* @type {Event}
				 */
				this.$emit('input', !this.value);
			}
		},

		shouldCloseOnEsc: function shouldCloseOnEsc() {
			if (!this.noCloseOnEsc) {
				this.$emit('input', !this.value);
			}
		},

		keyupListener: function keyupListener(ev) {
			if (ev.keyCode === KeyCodes.ESC) {
				this.shouldCloseOnEsc();
			}
		},

		attachKeyupEvent: function attachKeyupEvent() {
			window.addEventListener('keyup', this.keyupListener);
		},

		detachKeyupEvent: function detachKeyupEvent() {
			window.removeEventListener('keyup', this.keyupListener);
		}
	},
};

/* script */
var __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{attrs:{"id":"s-popover"}},[(_vm.value)?_c('div',{staticClass:"overlay",attrs:{"tabindex":"0"},on:{"click":_vm.shouldCloseOnBackdrop}},[_c('b-popover',{attrs:{"show":_vm.value,"custom-class":_vm.popoverClasses,"target":_vm.target,"placement":_vm.placement,"triggers":"","offset":_vm.internalOffset},on:{"update:show":function($event){_vm.value=$event;}}},[_vm._t("default")],2)],1):_vm._e()])};
var __vue_staticRenderFns__$5 = [];

  /* style */
  var __vue_inject_styles__$5 = function (inject) {
    if (!inject) { return }
    inject("data-v-5342e098_0", { source: "#s-popover .overlay{position:fixed;width:100%;height:100%;top:0;left:0;right:0;bottom:0;background-color:transparent;z-index:999;cursor:pointer}#s-popover .b-popover .arrow{display:none}#s-popover .b-popover{max-width:none}.b-popover.s-popover-default{width:276px}.s-popover{border:1px solid #d3dbe4;box-shadow:0 4px 4px rgba(0,0,0,.25);border-radius:8px}.b-popover.s-popover-sm{width:180px}.b-popover.s-popover-lg{width:360px}.b-popover.s-popover-xl{width:520px}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$5 = undefined;
  /* module identifier */
  var __vue_module_identifier__$5 = undefined;
  /* functional template */
  var __vue_is_functional_template__$5 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$5 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$6 = {
	components: {
		XIcon: XIcon,
	},
	props: {
		/**
		 * Prop utilizada como v-model. Controla a visilidade do SideSheet.
		 */
		value: {
			type: Boolean,
			default: false,
			required: true,
		},
		/**
		 * Define a posição ao qual o SideSheet será mostrado.
		*/
		position: {
			type: String,
			default: 'right',
		},
		/**
		 * Define se o SideSheet vai ser fechado com o click no backdrop.
		 */
		noCloseOnBackdrop: {
			type: Boolean,
			default: false,
		},
		/**
		 * Define se o SideSheet vai ser fechado quando o usuário pressionar 'ESC'.
		 */
		noCloseOnEsc: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		floatTransition: function floatTransition() {
			return ("slide-fade-" + (this.position));
		},
	},

	watch: {
		value: function value(newValue) {
			if (!newValue) {
				this.dettachKeyupEvent();
				return;
			}
			this.attachKeyupEvent();
		},
	},

	created: function created() {
		this.attachKeyupEvent();
	},

	beforeDestroy: function beforeDestroy() {
		this.dettachKeyupEvent();
	},

	methods: {
		shouldCloseOnBackdrop: function shouldCloseOnBackdrop() {
			if (!this.noCloseOnBackdrop) {
				/**
				 * Evento utilizado para implementar o v-model.
				* @event input
				* @type {Event}
				 */
				this.$emit('input', !this.value);
			}
		},
		shouldCloseOnEsc: function shouldCloseOnEsc() {
			if (!this.noCloseOnEsc) {
				this.$emit('input', !this.value);
			}
		},

		keyupListener: function keyupListener(ev) {
			if (ev.keyCode === KeyCodes.ESC) { // esc
				this.shouldCloseOnEsc();
			}
		},

		attachKeyupEvent: function attachKeyupEvent() {
			window.addEventListener('keyup', this.keyupListener);
		},

		dettachKeyupEvent: function dettachKeyupEvent() {
			window.removeEventListener('keyup', this.keyupListener);
		},
	},
};

/* script */
var __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{attrs:{"id":"side-sheet"}},[_c('transition',{attrs:{"name":_vm.floatTransition}},[(_vm.value)?_c('div',{staticClass:"side-sheet__overlay",attrs:{"tabindex":"0"},on:{"click":_vm.shouldCloseOnBackdrop}},[_c('div',{class:("side-sheet__container--" + _vm.position),on:{"click":function($event){$event.stopPropagation();}}},[_vm._t("close-icon",[_c('div',{staticClass:"close-icon__container"},[_c('x-icon',{attrs:{"id":"close-icon"},on:{"click":function($event){$event.stopPropagation();return _vm.$emit('input', !_vm.value)}}})],1)]),_vm._v(" "),_vm._t("default")],2)]):_vm._e()])],1)};
var __vue_staticRenderFns__$6 = [];

  /* style */
  var __vue_inject_styles__$6 = function (inject) {
    if (!inject) { return }
    inject("data-v-7c8bd2a0_0", { source: "#side-sheet .side-sheet__overlay[data-v-7c8bd2a0]{padding:0;position:fixed;width:100%;height:100%;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.4);z-index:999;cursor:pointer}#side-sheet .side-sheet__container[data-v-7c8bd2a0],#side-sheet .side-sheet__container--left[data-v-7c8bd2a0],#side-sheet .side-sheet__container--right[data-v-7c8bd2a0]{background:#fff;width:328px;height:100%;border-radius:0}#side-sheet .side-sheet__container--right[data-v-7c8bd2a0]{float:right}#side-sheet .side-sheet__container--left[data-v-7c8bd2a0]{float:left}.close-icon__container[data-v-7c8bd2a0]{color:#475766;text-align:right;padding:16px}.close-icon__container[data-v-7c8bd2a0]:hover{color:#36424e}.slide-fade-right-enter-active[data-v-7c8bd2a0]{transition:all .4s ease}.slide-fade-right-leave-active[data-v-7c8bd2a0]{transition:all .4s ease}.slide-fade-right-enter[data-v-7c8bd2a0],.slide-fade-right-leave-to[data-v-7c8bd2a0]{transform:translateX(8px);opacity:0}.slide-fade-left-enter-active[data-v-7c8bd2a0]{transition:all .4s ease}.slide-fade-left-leave-active[data-v-7c8bd2a0]{transition:all .4s ease}.slide-fade-left-enter[data-v-7c8bd2a0],.slide-fade-left-leave-to[data-v-7c8bd2a0]{transform:translateX(-8px);opacity:0}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$6 = "data-v-7c8bd2a0";
  /* module identifier */
  var __vue_module_identifier__$6 = undefined;
  /* functional template */
  var __vue_is_functional_template__$6 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$6 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$7 = {
	data: function data() {
		return {
			selectedValue: this.$attrs.value,
			internalOptions: _.cloneDeep(this.$attrs.options),
		};
	},

	mounted: function mounted() {
		var this$1 = this;

		this.selectedValue.forEach(function (item) {
			item.is_selected = true;
		});

		this.internalOptions.forEach(function (item) {
			var containsItem = this$1.selectedValue.some(
				function (value) { return value[this$1.$attrs.label] === item[this$1.$attrs.label]; }
			);

			if (containsItem) {
				item.is_selected = true;
			} else {
				item.is_selected = false;
			}
		});
	},

	watch: {
		selectedValue: function selectedValue(values) {
			var cleanedValues = _.cloneDeep(values);
			cleanedValues.forEach(function (val) { return delete val.is_selected; });

			/**
			 * Evento utilizado para implementar o v-model.
			* @event input
			* @type {Event}
				*/
			this.$emit('input', cleanedValues);
		},
	},

	methods: {
		selectItem: function selectItem(option) {
			this.internalOptions.forEach(function (item) {
				if (item.title === option.title) {
					item.is_selected = !item.is_selected;
				}
			});
		},

		addItemViaCustomCheckbox: function addItemViaCustomCheckbox(option) {
			option.is_selected = !option.is_selected;
			this.selectedValue.push(option);
		},
	},
};

/* script */
var __vue_script__$7 = script$7;

/* template */
var __vue_render__$7 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{attrs:{"id":"dropdown"}},[_c('multiselect',_vm._b({attrs:{"select-label":"","deselect-label":"","selected-label":"","options":_vm.internalOptions,"close-on-select":false,"multiple":true,"taggable":true,"clear-on-select":false,"searchable":false},on:{"select":_vm.selectItem,"remove":_vm.selectItem},scopedSlots:_vm._u([{key:"option",fn:function(internalOptions){return [_c('div',{staticClass:"dropdown__option"},[_c('div',{staticClass:"option__checkbox"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(internalOptions.option.is_selected),expression:"internalOptions.option.is_selected"}],attrs:{"type":"checkbox","id":("input-" + (internalOptions.option.title)),"name":("input-" + (internalOptions.option.title))},domProps:{"value":true,"checked":Array.isArray(internalOptions.option.is_selected)?_vm._i(internalOptions.option.is_selected,true)>-1:(internalOptions.option.is_selected)},on:{"change":function($event){var $$a=internalOptions.option.is_selected,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=true,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.$set(internalOptions.option, "is_selected", $$a.concat([$$v])));}else {$$i>-1&&(_vm.$set(internalOptions.option, "is_selected", $$a.slice(0,$$i).concat($$a.slice($$i+1))));}}else {_vm.$set(internalOptions.option, "is_selected", $$c);}}}}),_vm._v(" "),_c('label',{class:{ 'option__checkbox--checked': internalOptions.option.is_selected },attrs:{"id":("checkbox-" + (internalOptions.option.title)),"for":("input-" + (internalOptions.option.title))},on:{"click":function($event){return _vm.addItemViaCustomCheckbox(internalOptions.option)}}})]),_vm._v("\n\t\t\t\t"+_vm._s(internalOptions.option.title)+"\n\t\t\t")])]}}]),model:{value:(_vm.selectedValue),callback:function ($$v) {_vm.selectedValue=$$v;},expression:"selectedValue"}},'multiselect',_vm.$attrs,false))],1)};
var __vue_staticRenderFns__$7 = [];

  /* style */
  var __vue_inject_styles__$7 = function (inject) {
    if (!inject) { return }
    inject("data-v-1587023b_0", { source: "fieldset[disabled] .multiselect{pointer-events:none}.multiselect__spinner{position:absolute;right:1px;top:1px;width:48px;height:35px;background:#fff;display:block}.multiselect__spinner:after,.multiselect__spinner:before{position:absolute;content:\"\";top:50%;left:50%;margin:-8px 0 0 -8px;width:16px;height:16px;border-radius:100%;border:2px solid transparent;border-top-color:#41b883;box-shadow:0 0 0 1px transparent}.multiselect__spinner:before{animation:spinning 2.4s cubic-bezier(.41,.26,.2,.62);animation-iteration-count:infinite}.multiselect__spinner:after{animation:spinning 2.4s cubic-bezier(.51,.09,.21,.8);animation-iteration-count:infinite}.multiselect__loading-enter-active,.multiselect__loading-leave-active{transition:opacity .4s ease-in-out;opacity:1}.multiselect__loading-enter,.multiselect__loading-leave-active{opacity:0}.multiselect,.multiselect__input,.multiselect__single{font-family:inherit;font-size:16px;-ms-touch-action:manipulation;touch-action:manipulation}.multiselect{box-sizing:content-box;display:block;position:relative;width:100%;min-height:40px;text-align:left;color:#35495e}.multiselect *{box-sizing:border-box}.multiselect:focus{outline:0}.multiselect--disabled{background:#ededed;pointer-events:none;opacity:.6}.multiselect--active{z-index:50}.multiselect--active:not(.multiselect--above) .multiselect__current,.multiselect--active:not(.multiselect--above) .multiselect__input,.multiselect--active:not(.multiselect--above) .multiselect__tags{border-bottom-left-radius:0;border-bottom-right-radius:0}.multiselect--active .multiselect__select{transform:rotate(180deg)}.multiselect--above.multiselect--active .multiselect__current,.multiselect--above.multiselect--active .multiselect__input,.multiselect--above.multiselect--active .multiselect__tags{border-top-left-radius:0;border-top-right-radius:0}.multiselect__input,.multiselect__single{position:relative;display:inline-block;min-height:20px;line-height:20px;border:none;border-radius:5px;background:#fff;padding:0 0 0 5px;width:100%;transition:border .1s ease;box-sizing:border-box;margin-bottom:8px;vertical-align:top}.multiselect__input:-ms-input-placeholder{color:#35495e}.multiselect__input::placeholder{color:#35495e}.multiselect__tag~.multiselect__input,.multiselect__tag~.multiselect__single{width:auto}.multiselect__input:hover,.multiselect__single:hover{border-color:#cfcfcf}.multiselect__input:focus,.multiselect__single:focus{border-color:#a8a8a8;outline:0}.multiselect__single{padding-left:5px;margin-bottom:8px}.multiselect__tags-wrap{display:inline}.multiselect__tags{min-height:40px;display:block;padding:8px 40px 0 8px;border-radius:5px;border:1px solid #e8e8e8;background:#fff;font-size:14px}.multiselect__tag{position:relative;display:inline-block;padding:4px 26px 4px 10px;border-radius:5px;margin-right:10px;color:#fff;line-height:1;background:#41b883;margin-bottom:5px;white-space:nowrap;overflow:hidden;max-width:100%;text-overflow:ellipsis}.multiselect__tag-icon{cursor:pointer;margin-left:7px;position:absolute;right:0;top:0;bottom:0;font-weight:700;font-style:normal;width:22px;text-align:center;line-height:22px;transition:all .2s ease;border-radius:5px}.multiselect__tag-icon:after{content:\"\\D7\";color:#266d4d;font-size:14px}.multiselect__tag-icon:focus,.multiselect__tag-icon:hover{background:#369a6e}.multiselect__tag-icon:focus:after,.multiselect__tag-icon:hover:after{color:#fff}.multiselect__current{min-height:40px;overflow:hidden;padding:8px 30px 0 12px;white-space:nowrap;border-radius:5px;border:1px solid #e8e8e8}.multiselect__current,.multiselect__select{line-height:16px;box-sizing:border-box;display:block;margin:0;text-decoration:none;cursor:pointer}.multiselect__select{position:absolute;width:40px;height:38px;right:1px;top:1px;padding:4px 8px;text-align:center;transition:transform .2s ease}.multiselect__select:before{position:relative;right:0;top:65%;color:#999;margin-top:4px;border-color:#999 transparent transparent;border-style:solid;border-width:5px 5px 0;content:\"\"}.multiselect__placeholder{color:#adadad;display:inline-block;margin-bottom:10px;padding-top:2px}.multiselect--active .multiselect__placeholder{display:none}.multiselect__content-wrapper{position:absolute;display:block;background:#fff;width:100%;max-height:240px;overflow:auto;border:1px solid #e8e8e8;border-top:none;border-bottom-left-radius:5px;border-bottom-right-radius:5px;z-index:50;-webkit-overflow-scrolling:touch}.multiselect__content{list-style:none;display:inline-block;padding:0;margin:0;min-width:100%;vertical-align:top}.multiselect--above .multiselect__content-wrapper{bottom:100%;border-bottom-left-radius:0;border-bottom-right-radius:0;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom:none;border-top:1px solid #e8e8e8}.multiselect__content::webkit-scrollbar{display:none}.multiselect__element{display:block}.multiselect__option{display:block;padding:12px;min-height:40px;line-height:16px;text-decoration:none;text-transform:none;vertical-align:middle;position:relative;cursor:pointer;white-space:nowrap}.multiselect__option:after{top:0;right:0;position:absolute;line-height:40px;padding-right:12px;padding-left:20px;font-size:13px}.multiselect__option--highlight{background:#41b883;outline:0;color:#fff}.multiselect__option--highlight:after{content:attr(data-select);background:#41b883;color:#fff}.multiselect__option--selected{background:#f3f3f3;color:#35495e;font-weight:700}.multiselect__option--selected:after{content:attr(data-selected);color:silver}.multiselect__option--selected.multiselect__option--highlight{background:#ff6a6a;color:#fff}.multiselect__option--selected.multiselect__option--highlight:after{background:#ff6a6a;content:attr(data-deselect);color:#fff}.multiselect--disabled .multiselect__current,.multiselect--disabled .multiselect__select{background:#ededed;color:#a6a6a6}.multiselect__option--disabled{background:#ededed!important;color:#a6a6a6!important;cursor:text;pointer-events:none}.multiselect__option--group{background:#ededed;color:#35495e}.multiselect__option--group.multiselect__option--highlight{background:#35495e;color:#fff}.multiselect__option--group.multiselect__option--highlight:after{background:#35495e}.multiselect__option--disabled.multiselect__option--highlight{background:#dedede}.multiselect__option--group-selected.multiselect__option--highlight{background:#ff6a6a;color:#fff}.multiselect__option--group-selected.multiselect__option--highlight:after{background:#ff6a6a;content:attr(data-deselect);color:#fff}.multiselect-enter-active,.multiselect-leave-active{transition:all .15s ease}.multiselect-enter,.multiselect-leave-active{opacity:0}.multiselect__strong{margin-bottom:8px;line-height:20px;display:inline-block;vertical-align:top}[dir=rtl] .multiselect{text-align:right}[dir=rtl] .multiselect__select{right:auto;left:1px}[dir=rtl] .multiselect__tags{padding:8px 8px 0 40px}[dir=rtl] .multiselect__content{text-align:right}[dir=rtl] .multiselect__option:after{right:auto;left:0}[dir=rtl] .multiselect__clear{right:auto;left:12px}[dir=rtl] .multiselect__spinner{right:auto;left:1px}@keyframes spinning{0%{transform:rotate(0)}to{transform:rotate(2turn)}}", map: undefined, media: undefined })
,inject("data-v-1587023b_1", { source: "#dropdown .multiselect__option--highlight{background:#eff5fb;outline:0;color:#36424e}#dropdown input[type=checkbox]{visibility:hidden}.dropdown__option{display:flex;align-items:center}#dropdown .option__checkbox{width:15px;position:relative;margin-right:24px;margin-left:-12px}#dropdown .option__checkbox label{cursor:pointer;position:absolute;width:15px;height:15px;top:0;border-radius:4px;border:.5px solid #566676}#dropdown .option__checkbox label:after{border:1.5px solid #fff;border-top:none;border-right:none;content:\"\";height:5px;left:3.1px;opacity:0;position:absolute;top:4.4px;transform:rotate(-45deg);width:8px;border-radius:.4px}#dropdown .option__checkbox input[type=checkbox]:checked+label:after{-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\";filter:alpha(opacity=100);opacity:1}.option__checkbox--checked{background-color:#144385!important;border:none!important}#dropdown .multiselect__tag{background:#eff5fb;color:#36424e;border:1px solid #abb8c4}#dropdown .multiselect__tag-icon:after{color:#36424e}#dropdown .multiselect__tag-icon:focus,#dropdown .multiselect__tag-icon:hover{background:#d3dbe4;color:#29333d}#dropdown .multiselect__tag-icon:focus:after,#dropdown .multiselect__tag-icon:hover:after{color:#29333d}#dropdown .multiselect__option--selected.multiselect__option--highlight{background:#fff;color:#29333d}#dropdown .multiselect__option--selected.multiselect__option--highlight:after{background:#fff;color:#29333d}#dropdown .multiselect__option--selected{background:#fff;color:#29333d;font-weight:600}#dropdown .multiselect--disabled{background:0 0}#dropdown .multiselect--disabled .multiselect__tags{background:#8b99a7!important}#dropdown .multiselect__placeholder{color:#475766}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$7 = undefined;
  /* module identifier */
  var __vue_module_identifier__$7 = undefined;
  /* functional template */
  var __vue_is_functional_template__$7 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$7 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$8 = {
	props: {
		/**
		 * A imagem a ser mostrada no Empty State. Obs.: o addon Controls
		 * do Storybook ainda não permite a seleção de arquivos. Desse modo
		 * não é possível testar o funcionamento dessa prop por aqui.
		 */
		image: {
			type: String,
			default: '',
		},
		/**
		 * O descritor da imagem do Empty State adicionado à 'alt' da tag <img>
		 */
		imageDescription: {
			type: String,
			default: 'Imagem de Empty State',
		},
		/**
		 * O título do Empty State.
		 */
		title: {
			type: String,
			default: 'Título do empty state',
			required: true,
		},
		/**
		 * O texto instrutivo do Empty State
		 */
		text: {
			type: String,
			default: 'Para sair dessa situação de empty state, realize a ação abaixo.',
		},
		/**
		 * Prop utilizada para ocultar o botão de ação do Empty State.
		 */
		hideActionButton: {
			type: Boolean,
			default: false,
		},
		/**
		 * O texto mostrado no botão de ação do Empty State
		 */
		actionButtonText: {
			type: String,
			default: 'Finalizar',
		},
	},
};

/* script */
var __vue_script__$8 = script$8;

/* template */
var __vue_render__$8 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"empty-state"},[_vm._t("graphic-element",[_c('img',{staticClass:"empty-state__image",attrs:{"src":_vm.image,"alt":_vm.imageDescription}})]),_vm._v(" "),_c('div',{staticClass:"empty-state__title"},[_vm._v("\n\t\t"+_vm._s(_vm.title)+"\n\t")]),_vm._v(" "),_c('div',{staticClass:"empty-state__text"},[_vm._t("text",[_vm._v("\n\t\t\t"+_vm._s(_vm.text)+"\n\t\t")])],2),_vm._v(" "),(!_vm.hideActionButton)?_c('button',{staticClass:"empty-state__button",on:{"click":function($event){return _vm.$emit('action-button-click', true)}}},[_vm._v("\n\t\t"+_vm._s(_vm.actionButtonText)+"\n\t")]):_vm._e()],2)};
var __vue_staticRenderFns__$8 = [];

  /* style */
  var __vue_inject_styles__$8 = function (inject) {
    if (!inject) { return }
    inject("data-v-38214037_0", { source: ".empty-state[data-v-38214037]{display:flex;flex-direction:column;align-items:center;position:relative;margin:48px}.empty-state__image[data-v-38214037]{max-width:500px;max-height:500px;width:auto;height:auto}.empty-state__title[data-v-38214037]{margin:48px 0 0 0;color:#1e252c;font-size:28px}.empty-state__text[data-v-38214037]{margin:8px 0 0 0;color:#36424e;font-size:16px;max-width:50%;text-align:center}.empty-state__button[data-v-38214037]{margin:16px 0 0 0;background-color:#2ac092;color:#fff;border-radius:4px;font-weight:600;border:none;padding:8px 12px}.empty-state__button[data-v-38214037]:hover{background-color:#239f78}.empty-state__button[data-v-38214037]:focus{outline:0}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$8 = "data-v-38214037";
  /* module identifier */
  var __vue_module_identifier__$8 = undefined;
  /* functional template */
  var __vue_is_functional_template__$8 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$8 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//

var script$9 = {
	props: {
		/**
		 * A variante da Badge. São 9 variantes: 'turquoise', 'green', 'blue',
		 * 'violet', 'pink', 'red', 'orange', 'amber' e 'gray'.
		 */
		variant: {
			type: String,
			default: 'gray',
		},
	},

	data: function data() {
		return {
			predefinedColors: [
				'turquoise',
				'green',
				'blue',
				'indigo',
				'violet',
				'pink',
				'red',
				'orange',
				'amber',
				'gray' ],
		};
	},

	computed: {
		predefinedStyle: function predefinedStyle() {
			if (this.predefinedColors.indexOf(this.variant) > -1) {
				return ("badge--" + (this.variant));
			}
			return 'badge--gray';
		},
	},
};

/* script */
var __vue_script__$9 = script$9;

/* template */
var __vue_render__$9 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"badge__container",class:_vm.predefinedStyle},[_c('div',{staticClass:"badge__content"},[_vm._t("default")],2)])};
var __vue_staticRenderFns__$9 = [];

  /* style */
  var __vue_inject_styles__$9 = function (inject) {
    if (!inject) { return }
    inject("data-v-1dfaf650_0", { source: ".badge__container[data-v-1dfaf650]{border-radius:50px!important;width:fit-content;padding:0 8px}.badge__content[data-v-1dfaf650]{font-weight:500!important;font-size:14px!important;letter-spacing:.25px!important;font-weight:400}.badge--turquoise[data-v-1dfaf650]{color:#13526d;background-color:#f0faff;border:1px solid #3cacdd}.badge--green[data-v-1dfaf650]{color:#145c45;background-color:#eefcf5;border:1px solid #2ac092}.badge--blue[data-v-1dfaf650]{color:#144385;background-color:#f2f5fd;border:1px solid #377ee1}.badge--indigo[data-v-1dfaf650]{color:#353d64;background-color:#e5eaff;border:1px solid #6174d1}.badge--violet[data-v-1dfaf650]{color:#642b96;background-color:#f8f0ff;border:1px solid #a169d3}.badge--pink[data-v-1dfaf650]{color:#701a48;background-color:#ffeff9;border:1px solid #dd5a9c}.badge--red[data-v-1dfaf650]{color:#a42333;background-color:#fff0f2;border:1px solid #f95367}.badge--orange[data-v-1dfaf650]{color:#ab3c21;background-color:#fff3f0;border:1px solid #ff8567}.badge--amber[data-v-1dfaf650]{color:#a56a12;background-color:#fff7eb;border:1px solid #eea22f}.badge--gray[data-v-1dfaf650]{color:#36424e;background-color:#eff5fb;border:1px solid #9aa8b6}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$9 = "data-v-1dfaf650";
  /* module identifier */
  var __vue_module_identifier__$9 = undefined;
  /* functional template */
  var __vue_is_functional_template__$9 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$9 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$a = {
	components: {
		AlertTriangleIcon: AlertTriangleIcon,
	},
	props: {
		/**
		 * O conteúdo do arquivo upado.
		 */
		value: {
			default: null,
			description: 'Armazena o valor do arquivo upado (acessível via v-model)',
			required: true,
		},
		/**
		 * Lista com extensões de arquivos (separadas por vírgula) as quais o usuário pode selecionar.
		 * Ex.: jpg,png
		 */
		allowedExtensions: {
			type: String,
			default: null,
			description: "Define quais tipos de arquivos são permitidos nessa instância do UploadInput.\n\t\t\t",
		},

		/**
		 * Define o tamanho do input [lg, md, sm]
		 */
		size: {
			type: String,
			default: 'md',
			description: "Define o tamanho do input: [lg, md (padrão), sm]",
		},
	},

	data: function data() {
		return {
			file: !!this.value && !_.isEmpty(this.value) ? this.value : null,
			isOnDragEnterState: false,
			isValid: null,
		};
	},

	computed: {
		sizeClass: function sizeClass() {
			var classesObject = {
				inputTitle: ("upload-input__title--" + (this.size)),
				holderPadding: 'px-3',
				wrapperPadding: 'px-2 py-4',
				contentPadding: 'mt-3',
				svgScale: 1,
			};

			switch (this.size) {
				case 'lg':
					return Object.assign({}, classesObject,
						{holderPadding: 'px-3 py-5',
						wrapperPadding: 'py-5 px-2',
						contentPadding: 'mt-5',
						svgScale: 1.3});
				case 'sm':
					return Object.assign({}, classesObject,
						{wrapperPadding: 'py-2',
						holderPadding: 'px-3 pb-2',
						contentPadding: 'mt-1',
						svgScale: 0.8});
				default: // md
					return classesObject;
			}
		},

		acceptString: function acceptString() {
			if (this.allowedExtensions === null) { return null; }
			var formated = '';
			var splited = this.allowedExtensions.split(',');
			splited.forEach(function (item, index, arr) {
				if (item && item.trim().length > 0) {
					formated += "." + (item.trim()) + (index !== arr.length - 1 ? ', ' : '');
				}
			});
			return formated;
		},

		computedAllowedMessage: function computedAllowedMessage() {
			if (this.allowedExtensions) {
				var splited = this.allowedExtensions.split(',');
				var s = splited.length === 1 ? '' : 's';
				var initial = "São aceitos apenas arquivo" + s + " do" + s + " seguinte" + s + " tipo" + s + ":";
				return (initial + " " + (this.acceptString) + ".");
			}
			return null;
		},
	},

	watch: {
		file: function file(newValue) {
			/**
				* Evento utilizado para implementar o v-model.
				* @event input
				* @type {Event}
			*/
			this.$emit('input', newValue);
		},
	},

	methods: {
		dropHandler: function dropHandler(ev) {
			this.isValid = null;
			this.isOnDragEnterState = false;

			// Prevent the browser default behavior (open the file)
			ev.preventDefault();

			if (!ev.dataTransfer.items || ev.dataTransfer.items[0].kind !== 'file') { return; }
			var internalFile = ev.dataTransfer.items[0].getAsFile();
			if (this.isAValidExtension(internalFile.name)) {
				this.file = internalFile;
				this.isValid = true;
				return;
			}
			this.isValid = false;
			this.file = null;
		},
		linkClick: function linkClick() {
			// A lot of nested operations are needed because b-form-file wraps the input tag with a div
			this.$refs.fileInput.$el.childNodes[0].click();
		},
		isAValidExtension: function isAValidExtension(fileName) {
			if (this.allowedExtensions === null) { return true; }
			
			var alloweds = this.allowedExtensions.split(',');
			var uploaded = fileName.split('.');
			uploaded = uploaded[uploaded.length - 1].trim();
			return alloweds.filter(function (item) { return item === uploaded; }).length > 0;
		},
		handleFormFileChange: function handleFormFileChange(ev) {
			var this$1 = this;

			this.isValid = null;
			var ref = ev.target.files || {};
			var file = ref[0];
			if (this.isAValidExtension(file.name)) {
				this.file = file;
				this.isValid = true;
				return;
			}
			this.isValid = false;
			this.$nextTick().then(function () {
				this$1.file = null;
			});
		},
		handleRemove: function handleRemove() {
			this.isValid = null;
			this.file = null;
		},
	},
};

/* script */
var __vue_script__$a = script$a;

/* template */
var __vue_render__$a = function () {
var _obj, _obj$1, _obj$2;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"upload-input text-center",class:( _obj = {
		'upload-input--drag-state': _vm.isOnDragEnterState
	}, _obj[_vm.sizeClass.holderPadding] = _vm.size, _obj ),on:{"dragover":function($event){$event.preventDefault();$event.stopPropagation();_vm.isOnDragEnterState = true;},"dragenter":function($event){$event.preventDefault();$event.stopPropagation();_vm.isOnDragEnterState = true;},"dragleave":function($event){$event.preventDefault();$event.stopPropagation();_vm.isOnDragEnterState = false;},"dragend":function($event){$event.preventDefault();$event.stopPropagation();_vm.isOnDragEnterState = false;},"drop":_vm.dropHandler,"click":_vm.linkClick}},[_c('div',{staticClass:"text-center",class:_vm.sizeClass.wrapperPadding},[_c('b-form-file',{directives:[{name:"show",rawName:"v-show",value:(false),expression:"false"}],ref:"fileInput",attrs:{"accept":_vm.acceptString},on:{"change":_vm.handleFormFileChange},model:{value:(_vm.file),callback:function ($$v) {_vm.file=$$v;},expression:"file"}}),_vm._v(" "),(!_vm.file)?_c('div',[_c('svg',{style:(("transform: scale(" + (_vm.sizeClass.svgScale) + ")")),attrs:{"width":"103","height":"96","viewBox":"0 0 103 96","fill":"none","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"d":"M43.6196 87.2393C67.7101 87.2393 87.2393 67.7101 87.2393 43.6196C87.2393 19.5292 67.7101 0 43.6196 0C19.5292 0 0 19.5292 0 43.6196C0 67.7101 19.5292 87.2393 43.6196 87.2393Z","fill":"#F0F5FF"}}),_vm._v(" "),_c('path',{attrs:{"d":"M56.6196 93.2393C80.7101 93.2393 100.239 73.7101 100.239 49.6196C100.239 25.5292 80.7101 6 56.6196 6C32.5292 6 13 25.5292 13 49.6196C13 73.7101 32.5292 93.2393 56.6196 93.2393Z","stroke":"#3A7EDF","stroke-width":"4","stroke-linecap":"round","stroke-linejoin":"round"}}),_vm._v(" "),_c('path',{attrs:{"d":"M74.0675 49.6196L56.6196 32.1718L39.1718 49.6196","stroke":"#3A7EDF","stroke-width":"4","stroke-linecap":"round","stroke-linejoin":"round"}}),_vm._v(" "),_c('path',{attrs:{"d":"M56.6196 67.0675V32.1718","stroke":"#3A7EDF","stroke-width":"4","stroke-linecap":"round","stroke-linejoin":"round"}})]),_vm._v(" "),_c('div',{class:( _obj$1 = {}, _obj$1[_vm.sizeClass.inputTitle] = _vm.size, _obj$1[_vm.sizeClass.contentPadding] = _vm.size, _obj$1 )},[(!_vm.isOnDragEnterState)?_c('div',[_vm._m(0),_vm._v(" "),(_vm.isValid === false)?_c('div',{staticClass:"upload-input__alert-container"},[_c('alert-triangle-icon',{staticClass:"upload-input__alert"}),_vm._v(" "+_vm._s(_vm.computedAllowedMessage)+"\n\t\t\t\t\t")],1):_vm._e()]):_c('div',[_vm._v("\n\t\t\t\t\tSolte aqui o seu arquivo\n\t\t\t\t")])])]):_c('div',[_vm._t("file-preview",[_c('svg',{style:(("transform: scale(" + (_vm.sizeClass.svgScale) + ")")),attrs:{"width":"103","height":"96","viewBox":"0 0 103 96","fill":"none","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"d":"M43.6196 87.2393C67.7101 87.2393 87.2393 67.7101 87.2393 43.6196C87.2393 19.5292 67.7101 0 43.6196 0C19.5292 0 0 19.5292 0 43.6196C0 67.7101 19.5292 87.2393 43.6196 87.2393Z","fill":"#F0F5FF"}}),_vm._v(" "),_c('path',{attrs:{"d":"M56.6196 93.2393C80.7101 93.2393 100.239 73.7101 100.239 49.6196C100.239 25.5292 80.7101 6 56.6196 6C32.5292 6 13 25.5292 13 49.6196C13 73.7101 32.5292 93.2393 56.6196 93.2393Z","stroke":"#3A7EDF","stroke-width":"4","stroke-linecap":"round","stroke-linejoin":"round"}}),_vm._v(" "),_c('path',{attrs:{"d":"M45 70.5H69C72.032 70.5 74.5 68.0343 74.5 65V35C74.5 31.9657 72.032 29.5 69 29.5H45C41.968 29.5 39.5 31.9657 39.5 35V65C39.5 68.0343 41.968 70.5 45 70.5ZM42.5 35C42.5 33.6221 43.6221 32.5 45 32.5H69C70.3779 32.5 71.5 33.6221 71.5 35V65C71.5 66.3779 70.3779 67.5 69 67.5H45C43.6221 67.5 42.5 66.3779 42.5 65V35Z","fill":"#3A7EDF","stroke":"#3A7EDF"}}),_vm._v(" "),_c('path',{attrs:{"d":"M49 56.5H65C65.8281 56.5 66.5 55.8281 66.5 55C66.5 54.1719 65.8281 53.5 65 53.5H49C48.1719 53.5 47.5 54.1719 47.5 55C47.5 55.8281 48.1719 56.5 49 56.5Z","fill":"#3A7EDF","stroke":"#3A7EDF"}}),_vm._v(" "),_c('path',{attrs:{"d":"M49 64.5H65C65.8281 64.5 66.5 63.8281 66.5 63C66.5 62.1719 65.8281 61.5 65 61.5H49C48.1719 61.5 47.5 62.1719 47.5 63C47.5 63.8281 48.1719 64.5 49 64.5Z","fill":"#3A7EDF","stroke":"#3A7EDF"}}),_vm._v(" "),_c('path',{attrs:{"d":"M49 48.5H65C65.8281 48.5 66.5 47.8281 66.5 47C66.5 46.1719 65.8281 45.5 65 45.5H49C48.1719 45.5 47.5 46.1719 47.5 47C47.5 47.8281 48.1719 48.5 49 48.5Z","fill":"#3A7EDF","stroke":"#3A7EDF"}}),_vm._v(" "),_c('path',{attrs:{"d":"M49 40.5H65C65.8281 40.5 66.5 39.8281 66.5 39C66.5 38.1719 65.8281 37.5 65 37.5H49C48.1719 37.5 47.5 38.1719 47.5 39C47.5 39.8281 48.1719 40.5 49 40.5Z","fill":"#3A7EDF","stroke":"#3A7EDF"}})])]),_vm._v(" "),_c('div',{class:( _obj$2 = {}, _obj$2[_vm.sizeClass.inputTitle] = _vm.size, _obj$2[_vm.sizeClass.contentPadding] = _vm.size, _obj$2 )},[(!_vm.isOnDragEnterState)?_c('div',[_c('div',[_vm._v(_vm._s(_vm.file.name))]),_vm._v(" "),_c('div',[_c('div',[_c('a',{staticClass:"upload-input__search-link",attrs:{"href":"javascript:void(0)"},on:{"click":_vm.handleRemove}},[_vm._v("\n\t\t\t\t\t\t\t\tRemover\n\t\t\t\t\t\t\t")])])])]):_c('div',[_vm._v("\n\t\t\t\t\tSolte aqui o seu arquivo\n\t\t\t\t")])])],2)],1)])};
var __vue_staticRenderFns__$a = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._v("\n\t\t\t\t\t\tArraste o arquivo aqui ou\n\t\t\t\t\t\t"),_c('a',{staticClass:"upload-input__search-link",attrs:{"href":"javascript:void(0)"}},[_vm._v("\n\t\t\t\t\t\t\tpesquise no seu dispositivo\n\t\t\t\t\t\t")])])}];

  /* style */
  var __vue_inject_styles__$a = function (inject) {
    if (!inject) { return }
    inject("data-v-22dfd100_0", { source: ".upload-input[data-v-22dfd100]{border:2px dashed #d3dbe4;border-radius:16px;box-sizing:border-box}.upload-input__alert[data-v-22dfd100]{margin:0 8px 0 0}.upload-input__alert-container[data-v-22dfd100]{background:#fff7eb;border:1px solid #fdcd87;color:#d38817;border-radius:5px;padding:8px 0;margin:16px 0 0 0;display:flex;justify-content:center;align-items:center}.upload-input__title--lg[data-v-22dfd100]{font-size:22px!important;letter-spacing:.15px!important;font-weight:500}.upload-input__title--md[data-v-22dfd100]{font-size:16px!important;letter-spacing:.1px!important;font-weight:500}.upload-input__title--sm[data-v-22dfd100]{font-size:14px!important;letter-spacing:.1px!important;font-weight:400}.upload-input__search-link[data-v-22dfd100]{color:#377ee1;font-weight:700}.upload-input__search-link[data-v-22dfd100]:hover{text-decoration:underline}.upload-input--drag-state[data-v-22dfd100]{background-color:#f2f5fd;border:2px dashed #d3dbe4}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$a = "data-v-22dfd100";
  /* module identifier */
  var __vue_module_identifier__$a = undefined;
  /* functional template */
  var __vue_is_functional_template__$a = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$a = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$b = {
	components: {
		CheckIcon: CheckIcon,
		XIcon: XIcon,
	},

	props: {
		/**
		 * Um array com objetos com as propriedades 'label', 'inProcessing',
		 * 'error' e 'completed'. A 'label' é o texto que descreve o passo,
		 * e as demais props são booleanas e representam o status do passo.
		 */
		steps: {
			type: Array,
			default: function () { return []; },
			required: true,
			description:
				"Um array com objetos com as propriedades 'label', 'inProcessing',\n\t\t\t\t'error' e 'completed'. A 'label' é o texto que descreve o passo,\n\t\t\t\te as demais props são booleanas e representam o status do passo.",
		},
		/**
		 * Define direção do stepper como vertical, por padrão a direção é horizontal (vertical = false).
		 */
		vertical: {
			type: Boolean,
			default: false,
			required: false,
		},
		/**
		* Controla qual step está ativo variando de 1 até o número de steps.
		*/
		value: {
			type: Number,
			default: 1,
			required: true,
		},
		/**
		* Desabilita navegação pelos steps quando setado como `true`.
		*/
		disableOnClick: {
			type: Boolean,
			default: false,
		},
	},

	data: function data() {
		return {
			internalValue: this.value - 1,
		};
	},

	watch: {
		internalValue: function internalValue(value) {
			this.$emit('input', value + 1);
		},

		value: {
			handler: function handler(newValue) {
				this.internalValue = newValue - 1;
			},
			immediate: true,
		},
	},

	methods: {
		circleStyle: function circleStyle(step, index) {
			var classCursor = !this.disableOnClick ? 'stepper__step--clickable' : '';

			if (step.inProcessing) {
				return ("stepper__step--in-processing " + classCursor);
			}

			if (step.error) {
				return ("stepper__step--error " + classCursor);
			}

			if (step.completed) {
				return ("stepper__step--completed " + classCursor);
			}

			if (index === this.internalValue) {
				return ("stepper__step--active " + classCursor);
			}

			return (" stepper__step--muted " + classCursor);
		},

		changeStep: function changeStep(value) {
			if (!this.disableOnClick) {
				this.internalValue = value;
			}
		},

		dividerStyle: function dividerStyle(index) {
			var vertical = this.vertical ? 'vertical-' : '';
			if (index < 0) {
				return ("stepper__" + vertical + "divider--default");
			}

			var lastStep = index === this.steps.length - 1;
			var firstStep = index === 0;
			var prevStep = index - 1;
			var nextStep = index + 1;

			if (!lastStep
				&& this.steps[index].completed
				&& this.steps[nextStep].completed
			) {
				return ("stepper__" + vertical + "divider--completed");
			}

			if ((!lastStep
				&& index > 0
				&& this.steps[index].completed
				&& this.steps[prevStep].completed)
				|| (!lastStep
				&& firstStep
				&& this.steps[index].completed)
			) {
				return ("stepper__" + vertical + "divider--in-progress");
			}

			return ("stepper__" + vertical + "divider--default");
		},

		stepSectionStyle: function stepSectionStyle(index) {
			var classes = '';
			classes += index !== this.steps.length - 1 ? 'stepper__step-section ' : '';
			classes += this.vertical ? 'stepper__step-section--vertical' : '';
			return classes;
		},

		labelStyle: function labelStyle(index) {
			var classes = '';

			classes += index === this.internalValue ? 'stepper__step-label--active' : 'stepper__step-label--muted';
			classes += !this.vertical ? ' stepper__step-label--horizontal' : '';
			classes += !this.disableOnClick ? ' stepper__step--clickable' : '';

			return classes;
		},
	},
};

/* script */
var __vue_script__$b = script$b;

/* template */
var __vue_render__$b = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.vertical ? 'stepper--vertical' : 'stepper'},[_c('div',{class:_vm.vertical ? 'stepper__edge-container--vertical' : 'stepper__edge-container'},[_c('div',{staticClass:"stepper__edge"},[_c('div',{class:_vm.dividerStyle(-1)})])]),_vm._v(" "),_vm._l((_vm.steps),function(step,index){return _c('div',{key:index,class:_vm.stepSectionStyle(index)},[(_vm.vertical)?_c('div',{staticClass:"stepper__step-label--vertical",class:_vm.labelStyle(index),on:{"click":function($event){return _vm.changeStep(index)}}},[_c('small',[_vm._v(_vm._s(step.label))])]):_vm._e(),_vm._v(" "),_c('div',{class:_vm.vertical ? 'stepper__icon-container--vertical' : 'stepper__icon-container',attrs:{"id":("step-" + (index + 1))},on:{"click":function($event){return _vm.changeStep(index)}}},[_c('div',{staticClass:"stepper__icon-circle",class:_vm.circleStyle(step, index)},[(step.completed)?_c('check-icon',{attrs:{"size":"1x"}}):(step.error)?_c('x-icon',{attrs:{"size":"1x"}}):(step.inProcessing)?_c('div',{staticClass:"stepper__processing-icon"},[_c('svg',{attrs:{"width":"19","height":"22","viewBox":"0 0 19 22","fill":"none","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"d":"M18.78 16.6325C17.738 18.0472 16.3457 19.1664 14.7402 19.8799C13.1346 20.5935 11.3709 20.8769 9.62259 20.7023C7.87428 20.5276 6.20151 19.901 4.76877 18.884C3.33604 17.867 2.19266 16.4945 1.45107 14.9017C0.709475 13.3089 0.395207 11.5504 0.539162 9.79934C0.683116 8.04824 1.28034 6.36474 2.2721 4.9144C3.26387 3.46406 4.61603 2.2968 6.19562 1.52741C7.77522 0.758019 9.52787 0.412981 11.2812 0.526225L10.6287 10.6288L18.78 16.6325Z","fill":"#3A7EDF"}})])]):_c('span',{staticClass:"stepper__icon-text"},[_vm._v("\n\t\t\t\t\t"+_vm._s(index + 1)+"\n\t\t\t\t")])],1),_vm._v(" "),_c('div',{class:_vm.dividerStyle(index)})]),_vm._v(" "),(!_vm.vertical)?_c('div',{staticClass:"stepper__step-label",class:_vm.labelStyle(index)},[_c('small',[_vm._v(_vm._s(step.label))])]):_vm._e()])}),_vm._v(" "),(!_vm.vertical)?_c('div',{staticClass:"stepper__edge-container"},[_c('div',{staticClass:"stepper__edge"},[_c('div',{class:_vm.dividerStyle(-1)})])]):_vm._e()],2)};
var __vue_staticRenderFns__$b = [];

  /* style */
  var __vue_inject_styles__$b = function (inject) {
    if (!inject) { return }
    inject("data-v-4a91c8d5_0", { source: ".stepper[data-v-4a91c8d5],.stepper--vertical[data-v-4a91c8d5]{display:flex;justify-content:space-between}.stepper--vertical[data-v-4a91c8d5]{flex-direction:column;height:100%}.stepper__step--active[data-v-4a91c8d5],.stepper__step--completed[data-v-4a91c8d5],.stepper__step--error[data-v-4a91c8d5],.stepper__step--in-processing[data-v-4a91c8d5],.stepper__step--muted[data-v-4a91c8d5]{min-width:30px;min-height:30px;border-radius:50px;border:1px;border-style:solid}.stepper__step--active[data-v-4a91c8d5]{color:#475766;border:2px;border-style:solid;border-color:#2ac092}.stepper__step--muted[data-v-4a91c8d5]{color:#566676;border-color:#566676}.stepper__step--in-processing[data-v-4a91c8d5]{border:2px;border-style:solid;border-color:#377ee1}.stepper__step--error[data-v-4a91c8d5]{background-color:#f95367;border-color:#f95367;color:#fff}.stepper__step--completed[data-v-4a91c8d5]{background-color:#2ac092;border-color:#2ac092;color:#fff}.stepper__step--clickable[data-v-4a91c8d5]{cursor:pointer}.stepper__step-label[data-v-4a91c8d5],.stepper__step-label--vertical[data-v-4a91c8d5]{margin:8px 0 0 -32px;line-height:1;display:block;text-align:center}.stepper__step-label--muted[data-v-4a91c8d5]{color:#475766}.stepper__step-label--active small[data-v-4a91c8d5]{color:#36424e;font-weight:600}.stepper__step-label--horizontal[data-v-4a91c8d5]{width:100px}.stepper__step-label--vertical[data-v-4a91c8d5]{margin:0 8px 0 0;text-align:right}.stepper__edge[data-v-4a91c8d5]{min-width:30px;min-height:30px;display:flex;align-items:center;justify-content:center}.stepper__edge-container[data-v-4a91c8d5]{width:50%}.stepper__edge-container--vertical[data-v-4a91c8d5]{display:flex;justify-content:flex-end;height:50%}.stepper__divider--completed[data-v-4a91c8d5],.stepper__divider--default[data-v-4a91c8d5],.stepper__divider--in-progress[data-v-4a91c8d5]{height:1px;width:100%}.stepper__divider--default[data-v-4a91c8d5]{background-color:#7c8a98}.stepper__divider--in-progress[data-v-4a91c8d5]{background:linear-gradient(90deg,#43e4cc 0,#7c8a98 67.57%)}.stepper__divider--completed[data-v-4a91c8d5]{background:#2ac092}.stepper__icon-container[data-v-4a91c8d5],.stepper__icon-container--vertical[data-v-4a91c8d5]{display:flex;align-items:center}.stepper__icon-container--vertical[data-v-4a91c8d5]{flex-direction:column}.stepper__icon-circle[data-v-4a91c8d5]{display:flex;justify-content:center;align-items:center}.stepper__icon-text[data-v-4a91c8d5]{font-size:14px}.stepper__processing-icon[data-v-4a91c8d5]{margin-left:-1px;display:flex;align-items:center}.stepper__step-section[data-v-4a91c8d5]{width:100%}.stepper__step-section--vertical[data-v-4a91c8d5]{display:flex;justify-content:flex-end;height:100%}.stepper__vertical-divider--completed[data-v-4a91c8d5],.stepper__vertical-divider--default[data-v-4a91c8d5],.stepper__vertical-divider--in-progress[data-v-4a91c8d5]{min-height:30px;height:100%;width:1px}.stepper__vertical-divider--default[data-v-4a91c8d5]{background-color:#7c8a98}.stepper__vertical-divider--in-progress[data-v-4a91c8d5]{background:linear-gradient(180deg,#43e4cc 0,#7c8a98 67.57%)}.stepper__vertical-divider--completed[data-v-4a91c8d5]{background:#2ac092}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$b = "data-v-4a91c8d5";
  /* module identifier */
  var __vue_module_identifier__$b = undefined;
  /* functional template */
  var __vue_is_functional_template__$b = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$b = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$c = {
	props: {
		/**
		 * Define a cor da ProgressCircular.
		 */
		color: {
			type: String,
			default: '#2EB88D',
			required: false,
		},
		/**
		 * Define a cor de background da ProgressCircular.
		 */
		backgroundColor: {
			type: String,
			default: '#CED4DA',
			required: false,
		},
		/**
		 * Define o tamanho (diâmetro) da ProgressCircular.
		 */
		size: {
			type: Number,
			default: 24,
			required: false,
		},
		/**
		 * Define o valor correspondente ao percentual ou fração preenchida da ProgressCircular.
		 */
		value: {
			type: Number,
			default: 0,
			required: true,
		},
		/**
		 * Define o valor máximo, a porção toda do processo, da ProgressCircular.
		 * Por padrão o valor máximo é 100 (padrão porcentagem).
		 */
		maxValue: {
			type: Number,
			default: 100,
			required: false,
		},
		/**
		* Torna a espessura do circulo da ProgressCircular menor.
		*/
		small: {
			type: Boolean,
			default: false,
		},
		/**
		* Torna a espessura do circulo da ProgressCircular maior.
		*/
		large: {
			type: Boolean,
			default: false,
		},
		/**
		 * Define a cor do texto (label) dentro da ProgressCircular.
		 */
		labelColor: {
			type: String,
			default: '#303A44',
			required: false,
		},
	},

	computed: {
		label: function label() {
			if (this.maxValue >= 100) {
				var normalizedValue = Math.round(100 * this.value / this.maxValue);
				return (normalizedValue + "%");
			}

			return ((this.value) + "/" + (this.maxValue));
		},

		normalizedDashArray: function normalizedDashArray() {
			var normalizedValue = 100 * this.value / this.maxValue;
			return (normalizedValue + ", 100");
		},

		stroke: function stroke() {
			if (this.small) { return 1.5; }
			if (this.large) { return 4.5; }
			return 3.5;
		},

		labelClass: function labelClass() {
			var modifier = this.maxValue >= 100 ? '--reduced' : '';
			return ("progress-circular__label" + modifier);
		}
	},
};

/* script */
var __vue_script__$c = script$c;

/* template */
var __vue_render__$c = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"progress-circular",attrs:{"viewBox":"0 0 36 36","height":_vm.size,"width":_vm.size}},[_c('path',{staticClass:"progress-circular__ring-background",attrs:{"stroke":_vm.backgroundColor,"stroke-width":_vm.stroke,"d":"M18 2.0845\n\t\ta 15.9155 15.9155 0 0 1 0 31.831\n\t\ta 15.9155 15.9155 0 0 1 0 -31.831"}}),_vm._v(" "),_c('path',{staticClass:"progress-circular__ring-progress",attrs:{"stroke":_vm.color,"stroke-dasharray":_vm.normalizedDashArray,"stroke-width":_vm.stroke-1,"d":"M18 2.0845\n\t\ta 15.9155 15.9155 0 0 1 0 31.831\n\t\ta 15.9155 15.9155 0 0 1 0 -31.831"}}),_vm._v(" "),_c('text',{class:_vm.labelClass,attrs:{"x":"18","y":"21.7","fill":_vm.labelColor}},[_vm._v("\n\t\t"+_vm._s(_vm.label)+"\n\t")])])};
var __vue_staticRenderFns__$c = [];

  /* style */
  var __vue_inject_styles__$c = function (inject) {
    if (!inject) { return }
    inject("data-v-53339e19_0", { source: ".progress-circular[data-v-53339e19]{display:block;margin:0 auto;max-width:80%;max-height:250px}.progress-circular__ring-background[data-v-53339e19]{fill:none}.progress-circular__ring-progress[data-v-53339e19]{fill:none;stroke-linecap:round;animation:progress-data-v-53339e19 1s ease-out forwards}@keyframes progress-data-v-53339e19{0%{stroke-dasharray:0 100}}.progress-circular__label[data-v-53339e19],.progress-circular__label--reduced[data-v-53339e19]{font-family:sans-serif;font-size:.66em;text-anchor:middle}.progress-circular__label--reduced[data-v-53339e19]{font-size:.6em}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$c = "data-v-53339e19";
  /* module identifier */
  var __vue_module_identifier__$c = undefined;
  /* functional template */
  var __vue_is_functional_template__$c = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$c = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$d = {
	props: {
		/**
		 * A variante do Alert. São 3 variantes implementadas: 'info', 'warning'
		 * e 'danger'
		 */
		variant: {
			type: String,
			default: 'info',
		},
		/**
		 * O título do alerta. O título também pode ser usado com o slot.
		 */
		title: {
			type: String,
			default: 'Título do AlertCard',
		},
		/**
		 * O subtítulo do alerta. O subtítulo também pode ser usado com o slot.
		 */
		subTitle: {
			type: String,
			default: 'Subtítulo do AlertCard',
		},
		/**
		 * Indica se a prop title deve ser exibida.
		 */
		noTitle: {
			type: Boolean,
			default: false,
		},
		/**
		 * Determina se o Alert vai ter ícone ou não.
		 */
		withIcon: {
			type: Boolean,
			default: true,
		},
		/**
		 * Determina se o Alert vai ter um checkbox de seleção.
		 */
		selectable: {
			type: Boolean,
			default: false,
		},
		/**
		* Prop utilizada como v-model. Controla a visibilidade do popover .
		*/
		value: {
			type: Boolean,
			default: false,
		},
		/**
		* Deixa o card com o estilo de card desabilitado.
		*/
		muted: {
			type: Boolean,
			default: false,
		},
	},

	components: {
		InfoIcon: InfoIcon,
		AlertTriangleIcon: AlertTriangleIcon,
		AlertCircleIcon: AlertCircleIcon,
	},

	data: function data() {
		return {
			isSelected: this.value,
		};
	},

	computed: {
		dynamicIcon: function dynamicIcon() {
			switch (this.variant) {
				case 'info':
					return 'info-icon';
				case 'warning':
					return 'alert-triangle-icon';
				case 'danger':
					return 'alert-circle-icon';
				default:
					return 'info-icon';
			}
		},

		alertCardContainerSelected: function alertCardContainerSelected() {
			var dynamicClass = '';

			if (!this.muted) {
				if (this.selectable) {
					dynamicClass = 'alert-card__container--selectable';
				}

				if (this.isSelected) {
					return (dynamicClass + " alert-card__container--selected-" + (this.variant));
				}
			} else {
				dynamicClass = 'alert-card__container--muted';
			}

			return dynamicClass;
		},

		iconClass: function iconClass() {
			return ("icon__container--" + (this.variant) + " " + (this.noTitle ? 'align-self-center' : ''));
		},
	},

	methods: {
		selectCheckbox: function selectCheckbox() {
			this.isSelected = !this.isSelected;
			/**
			 * Evento utilizado para implementar o v-model.
			* @event input
			* @type {Event}
				*/
			this.$emit('input', !this.value);
		},
	},
};

/* script */
var __vue_script__$d = script$d;

/* template */
var __vue_render__$d = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{attrs:{"id":"alert-card"}},[_c('div',_vm._g({staticClass:"alert-card__container",class:_vm.alertCardContainerSelected},_vm.selectable && !_vm.muted ? { click: _vm.selectCheckbox } : {}),[(_vm.selectable)?_c('div',{staticClass:"custom-checkbox"},[_c('input',{attrs:{"type":"checkbox","id":"checkbox-input","name":"checkbox-input"},domProps:{"value":_vm.isSelected,"checked":_vm.isSelected}}),_vm._v(" "),_c('label',{class:{ 'custom-checkbox--checked': _vm.isSelected },attrs:{"id":"custom-checkbox"},on:{"click":function($event){$event.stopPropagation();return _vm.selectCheckbox($event)}}})]):_vm._e(),_vm._v(" "),(_vm.withIcon)?_c('div',{class:_vm.iconClass},[_c(_vm.dynamicIcon,{tag:"component",class:("icon--" + _vm.variant),attrs:{"size":"1.4x"}})],1):_vm._e(),_vm._v(" "),_c('div',{staticClass:"alert-card__content-container"},[(!_vm.noTitle)?_c('span',{class:("alert-card__title--" + _vm.variant)},[_vm._v("\n\t\t\t\t"+_vm._s(_vm.title)+"\n\t\t\t")]):_vm._e(),_vm._v(" "),_c('span',{staticClass:"alert-card__subtitle",class:("" + (_vm.noTitle ? 'mt-0' : 'mt-2'))},[_vm._t("subTitle-slot",[_vm._v("\n\t\t\t\t\t"+_vm._s(_vm.subTitle)+"\n\t\t\t\t")])],2),_vm._v(" "),_vm._t("content-slot")],2)])])};
var __vue_staticRenderFns__$d = [];

  /* style */
  var __vue_inject_styles__$d = function (inject) {
    if (!inject) { return }
    inject("data-v-3c009de0_0", { source: "#alert-card .alert-card[data-v-3c009de0],#alert-card .alert-card__container[data-v-3c009de0],#alert-card .alert-card__container--selected-danger[data-v-3c009de0],#alert-card .alert-card__container--selected-info[data-v-3c009de0],#alert-card .alert-card__container--selected-warning[data-v-3c009de0]{display:flex;align-items:center;padding:16px;border-radius:16px}#alert-card .alert-card__container[data-v-3c009de0]{border:1px solid #d3dbe4}#alert-card .alert-card__container--selectable[data-v-3c009de0]{cursor:pointer}#alert-card .alert-card__container--muted[data-v-3c009de0]{background-color:#fafcfe}#alert-card .alert-card__container--selected-info[data-v-3c009de0]{border:2px solid #83afec;box-shadow:1px 1px 4px rgba(32,110,217,.5)}#alert-card .alert-card__container--selected-warning[data-v-3c009de0]{border:2px solid #fdcd87;box-shadow:1px 1px 4px rgba(253,210,145,.5)}#alert-card .alert-card__container--selected-danger[data-v-3c009de0]{border:2px solid #f797a3;box-shadow:1px 1px 4px rgba(237,59,81,.5)}#alert-card .alert-card__title[data-v-3c009de0],#alert-card .alert-card__title--danger[data-v-3c009de0],#alert-card .alert-card__title--info[data-v-3c009de0],#alert-card .alert-card__title--warning[data-v-3c009de0]{font-size:16px!important;letter-spacing:.1px!important;font-weight:500;margin:12px 0 0 0;display:block}#alert-card .alert-card__title--info[data-v-3c009de0]{color:#377ee1}#alert-card .alert-card__title--warning[data-v-3c009de0]{color:#d38817}#alert-card .alert-card__title--danger[data-v-3c009de0]{color:#e83047}#alert-card .alert-card__subtitle[data-v-3c009de0]{font-size:14px!important;letter-spacing:.1px!important;font-weight:400;display:block;color:#475766}#alert-card .alert-card__content[data-v-3c009de0]{margin:16px 0 0 0}#alert-card .alert-card__content-container[data-v-3c009de0]{width:100%}#alert-card .icon[data-v-3c009de0],#alert-card .icon--danger[data-v-3c009de0],#alert-card .icon--info[data-v-3c009de0],#alert-card .icon--warning[data-v-3c009de0]{stroke-width:2.4}#alert-card .icon--info[data-v-3c009de0]{color:#377ee1}#alert-card .icon--warning[data-v-3c009de0]{color:#d38817}#alert-card .icon--danger[data-v-3c009de0]{color:#f95367}#alert-card .icon__container[data-v-3c009de0],#alert-card .icon__container--danger[data-v-3c009de0],#alert-card .icon__container--info[data-v-3c009de0],#alert-card .icon__container--warning[data-v-3c009de0]{display:flex;padding:12px;border-radius:100%;margin:0 12px 0 0;align-self:flex-start}#alert-card .icon__container--info[data-v-3c009de0]{background-color:#f2f5fd}#alert-card .icon__container--warning[data-v-3c009de0]{background-color:#fff7eb}#alert-card .icon__container--danger[data-v-3c009de0]{background-color:#fff0f2}#alert-card .custom-checkbox[data-v-3c009de0]{margin:16px 0 0 0;align-self:flex-start;width:14px;position:relative;margin-right:32px;margin-left:-8px}#alert-card .custom-checkbox label[data-v-3c009de0]{cursor:pointer;position:absolute;width:14px;height:14px;top:0;border-radius:4px;border:1px solid #9aa8b6}#alert-card .custom-checkbox label[data-v-3c009de0]:after{border:2px solid #fff;border-top:none;border-right:none;content:\"\";height:5px;left:3.1px;opacity:0;position:absolute;top:4.4px;transform:rotate(-45deg);width:8px;border-radius:.4px}#alert-card .custom-checkbox input[type=checkbox]:checked+label[data-v-3c009de0]:after{-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\";filter:alpha(opacity=100);opacity:1}#alert-card .custom-checkbox input[type=checkbox][data-v-3c009de0]{visibility:hidden}#alert-card .custom-checkbox--checked[data-v-3c009de0]{background-color:#206ed9!important;border:none!important}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$d = "data-v-3c009de0";
  /* module identifier */
  var __vue_module_identifier__$d = undefined;
  /* functional template */
  var __vue_is_functional_template__$d = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$d = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
    __vue_inject_styles__$d,
    __vue_script__$d,
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$e = {
	props: {
		/**
		* Prop utilizada como v-model. Controla a visibilidade do popover .
		*/
		value: {
			type: [Number, String],
			default: 0,
		},
		/**
		 * Especifica o maior valor que o StepperInput deve aceitar.
		 */
		max: {
			type: [Number, String],
			default: Number.MAX_SAFE_INTEGER,
		},
		/**
		 * Especifica o menor valor que o StepperInput deve aceitar.
		 */
		min: {
			type: [Number, String],
			default: Number.MIN_SAFE_INTEGER,
		},
		/**
		 * Especifica a label do input.
		 */
		label: {
			type: String,
			default: 'Label',
		},
		/**
		 * Desabilita o input.
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Especifica o estado do StepperInput. As opções são 'default', 'valid' e 'invalid'.
		 */
		state: {
			type: String,
			default: 'default',
		},
	},

	components: {
		PlusIcon: PlusIcon,
		MinusIcon: MinusIcon,
	},

	data: function data() {
		return {
			internalValue: this.value,
			isBeingFocused: false,
		};
	},

	computed: {
		stepperInputDynamicClass: function stepperInputDynamicClass() {
			var stepperInputClass = '';

			if (!this.isBeingFocused) {
				stepperInputClass = 'stepper-input';

				if (!this.disabled) {
					if (this.state === 'valid') {
						stepperInputClass += ' stepper-input--valid';
					} else if (this.state === 'invalid') {
						stepperInputClass += ' stepper-input--invalid';
					}
				} else {
					stepperInputClass += ' stepper-input--disabled';
				}
			} else if (!this.disabled) {
				if (this.state === 'default') {
					stepperInputClass += ' stepper-input--focused';
				} else if (this.state === 'valid') {
					stepperInputClass += ' stepper-input--focused-valid';
				} else if (this.state === 'invalid') {
					stepperInputClass += ' stepper-input--focused-invalid';
				}
			}

			return stepperInputClass;
		},
	},

	watch: {
		internalValue: function internalValue(value) {
			if (!value) {
				this.internalValue = 0;
			}

			if (value < this.min) {
				/**
				* Evento que indica que o valor informado está fora do intervalo aceito.
				* @event invalid number
				* @type {Event}
				*/
				this.internalValue = this.min;
				this.$emit('invalid-number', ("'O campo não pode ser menor que " + (parseInt(this.min, 10)) + ".'"));
			} else if (value > this.max) {
				this.internalValue = this.max;
				this.$emit('invalid-number', ("'O campo não pode ser maior que " + (parseInt(this.max, 10)) + ".'"));
			} else {
				/**
				* Evento utilizado para implementar o v-model.
				* @event input
				* @type {Event}
				*/
				this.$emit('input', parseInt(value, 10));
			}
		},
	},

	methods: {
		changeValue: function changeValue(amount) {
			this.internalValue = parseInt(this.internalValue) + amount;
		},
	},
};

/* script */
var __vue_script__$e = script$e;

/* template */
var __vue_render__$e = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.label)?_c('label',{attrs:{"for":"stepper-input-number"}},[_vm._v(_vm._s(_vm.label))]):_vm._e(),_vm._v(" "),_c('div',{class:_vm.stepperInputDynamicClass},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.internalValue),expression:"internalValue"}],staticClass:"stepper-input__field",attrs:{"disabled":_vm.disabled,"id":"stepper-input-number","type":"number"},domProps:{"value":(_vm.internalValue)},on:{"focus":function($event){_vm.isBeingFocused = true;},"blur":function($event){_vm.isBeingFocused = false;},"input":function($event){if($event.target.composing){ return; }_vm.internalValue=$event.target.value;}}}),_vm._v(" "),_c('div',{staticClass:"stepper-input__icon-container"},[_c('button',{directives:[{name:"longclick",rawName:"v-longclick",value:(function () { return _vm.changeValue(1); }),expression:"() => changeValue(1)"}],staticClass:"stepper-input__icon--plus",attrs:{"disabled":_vm.disabled,"tabindex":"-1"},on:{"focus":function($event){_vm.isBeingFocused = true;},"blur":function($event){_vm.isBeingFocused = false;},"click":function($event){return _vm.changeValue(1)}}},[_c('plus-icon',{staticClass:"custom-class",attrs:{"size":"1x"}})],1),_vm._v(" "),_c('button',{directives:[{name:"longclick",rawName:"v-longclick",value:(function () { return _vm.changeValue(-1); }),expression:"() => changeValue(-1)"}],staticClass:"stepper-input__icon--minus",attrs:{"disabled":_vm.disabled,"tabindex":"-1"},on:{"focus":function($event){_vm.isBeingFocused = true;},"blur":function($event){_vm.isBeingFocused = false;},"click":function($event){return _vm.changeValue(-1)}}},[_c('minus-icon',{staticClass:"custom-class",attrs:{"size":"1x"}})],1)])])])};
var __vue_staticRenderFns__$e = [];

  /* style */
  var __vue_inject_styles__$e = function (inject) {
    if (!inject) { return }
    inject("data-v-c1665b7c_0", { source: ".stepper-input[data-v-c1665b7c],.stepper-input--focused[data-v-c1665b7c],.stepper-input--focused-invalid[data-v-c1665b7c],.stepper-input--focused-valid[data-v-c1665b7c],.stepper-input--invalid[data-v-c1665b7c],.stepper-input--valid[data-v-c1665b7c]{display:flex;border:1px solid #bcc7d2;border-radius:4px;width:fit-content;width:-moz-fit-content}.stepper-input__icon-container[data-v-c1665b7c]{background-color:#eff5fb;display:flex;flex-direction:column;justify-content:center;border-radius:0 3px 3px 0}.stepper-input__field[data-v-c1665b7c]{padding:8px;margin:0 8px 0 0;border-radius:4px;border:none;text-align:end;color:#475766}.stepper-input__field[data-v-c1665b7c]:focus{outline:0}.stepper-input--focused[data-v-c1665b7c]{border:1px solid #83afec;box-shadow:0 0 0 .2rem rgba(131,175,236,.45)}.stepper-input--focused-valid[data-v-c1665b7c],.stepper-input--valid[data-v-c1665b7c]{border:1px solid #239f78}.stepper-input--focused-invalid[data-v-c1665b7c],.stepper-input--invalid[data-v-c1665b7c]{border:1px solid #7633b2}.stepper-input--focused-valid[data-v-c1665b7c]{box-shadow:0 0 0 .2rem rgba(109,223,188,.45)}.stepper-input--focused-invalid[data-v-c1665b7c]{box-shadow:0 0 0 .2rem rgba(206,171,237,.45)}.stepper-input--disabled[data-v-c1665b7c]{background-color:#fafcfe;pointer-events:none}.stepper-input__icon--plus[data-v-c1665b7c]{background:0 0;border:none;padding:0;outline:0;padding:4px 0 0 0;display:flex;color:#475766;transition:all .2s ease-out;height:50%}.stepper-input__icon--plus[data-v-c1665b7c]:hover{background-color:#377ee1;color:#fff;border-radius:0 3px 0 0}.stepper-input__icon--plus[data-v-c1665b7c]:active{background-color:#206ed9;border-radius:0 3px 0 0}.stepper-input__icon--minus[data-v-c1665b7c]{background:0 0;border:none;padding:0;outline:0;padding:4px 0 0 0;display:flex;color:#475766;transition:all .2s ease-out;height:50%}.stepper-input__icon--minus[data-v-c1665b7c]:hover{background-color:#377ee1;color:#fff;border-radius:0 0 3px 0}.stepper-input__icon--minus[data-v-c1665b7c]:active{background-color:#206ed9;border-radius:0 0 3px 0}input[data-v-c1665b7c]::-webkit-inner-spin-button,input[data-v-c1665b7c]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}input[type=number][data-v-c1665b7c]{-moz-appearance:textfield}input[type=number][data-v-c1665b7c]{width:68px}input[data-v-c1665b7c]:disabled{background:0 0!important}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$e = "data-v-c1665b7c";
  /* module identifier */
  var __vue_module_identifier__$e = undefined;
  /* functional template */
  var __vue_is_functional_template__$e = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$e = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
    __vue_inject_styles__$e,
    __vue_script__$e,
    __vue_scope_id__$e,
    __vue_is_functional_template__$e,
    __vue_module_identifier__$e,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$f = {
	props: {
		/**
		 * Título do card.
		 */
		title: {
			type: String,
			default: 'Título',
			required: true,
		},
		/**
		 * Subtítulo do card.
		 */
		subtitle: {
			type: String,
			default: 'Subtítulo',
			required: true,
		},
		/**
		 * Remove o padding padrão do corpo do card.
		 */
		noContentPadding: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		contentClass: function contentClass() {
			if (this.noContentPadding) {
				return 'panel-card__content--no-pading';
			}
			return 'panel-card__content';
		},
	},
};

/* script */
var __vue_script__$f = script$f;

/* template */
var __vue_render__$f = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"panel-card"},[_c('div',{staticClass:"panel-card__header"},[_c('div',[_c('span',{staticClass:"panel-card__title"},[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_c('br'),_vm._v(" "),_c('span',{staticClass:"panel-card__subtitle"},[_vm._v(_vm._s(_vm.subtitle))])]),_vm._v(" "),_c('div',{staticClass:"ml-auto"},[_vm._t("panel-actions")],2)]),_vm._v(" "),_c('hr',{staticClass:"panel-card__divider"}),_vm._v(" "),_c('div',{class:_vm.contentClass},[_vm._t("default")],2)])};
var __vue_staticRenderFns__$f = [];

  /* style */
  var __vue_inject_styles__$f = function (inject) {
    if (!inject) { return }
    inject("data-v-21e95f22_0", { source: ".panel-card[data-v-21e95f22]{background-color:#fff;border-radius:8px}.panel-card__divider[data-v-21e95f22]{margin:0;color:#8b99a7}.panel-card__header[data-v-21e95f22]{padding:16px;display:flex;min-height:78px}.panel-card__content[data-v-21e95f22]{padding:16px}.panel-card__content--no-padding[data-v-21e95f22]{padding:16px}.panel-card__title[data-v-21e95f22]{font-size:16px!important;letter-spacing:.1px!important;font-weight:500;margin:0 0 8px 0;color:#1e252c}.panel-card__subtitle[data-v-21e95f22]{font-size:14px!important;letter-spacing:.1px!important;font-weight:400;color:#566676}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$f = "data-v-21e95f22";
  /* module identifier */
  var __vue_module_identifier__$f = undefined;
  /* functional template */
  var __vue_is_functional_template__$f = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$f = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
    __vue_inject_styles__$f,
    __vue_script__$f,
    __vue_scope_id__$f,
    __vue_is_functional_template__$f,
    __vue_module_identifier__$f,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$g = {
	props: {
		/**
		 * Variante do ExpansionCard. São 9 variantes: 'turquoise', 'green', 'blue',
		 * 'indigo', 'violet', 'pink', 'red', 'orange', 'amber' e 'gray'.
		 */
		variant: {
			type: String,
			default: 'gray',
		},
		/**
		 * Legenda da informação principal do card (no template padrão). Torna-se
		 * o título do card quando este é expandido.
		 */
		legend: {
			type: String,
			default: null,
		},
		/**
		 * Informação principal do card (no template padrão), pode ser a quantidade
		 * de resultados, por exemplo.
		 */
		mainValue: {
			type: Number,
			default: null,
		},
		/**
		 * Indica se o card é expansível.
		 */
		expansible: {
			type: Boolean,
			default: true,
		},
	},

	data: function data() {
		return {
			isHovering: false,
			isExpanded: false,
		};
	},

	computed: {
		expansionCardContainerStyle: function expansionCardContainerStyle() {
			var dynamicClass = this.variantStyle;

			if (this.isHovering) {
				dynamicClass += " expansion-card--hover-" + (this.variant);
			}
			if (this.isExpanded) {
				dynamicClass += ' expansion-card--expanded';
			}

			return dynamicClass;
		},

		variantStyle: function variantStyle() {
			if (!this.variant) {
				return 'expansion-card--gray';
			}
			return ("expansion-card--" + (this.variant));
		},

		subtitle: function subtitle() {
			var s = this.mainValue !== 1 ? 's' : '';
			return ((this.mainValue) + " resultado" + s + " encontrado" + s);
		},
	},

	methods: {
		toggleCardStyle: function toggleCardStyle(status) {
			this.isHovering = false;

			if (this.expansible) {
				switch (status) {
					case 'hover':
						if (!this.isExpanded) {
							this.isHovering = true;
						}
						break;
					case 'expand':
					case 'contract':
						this.isExpanded = !this.isExpanded;
						/**
						* Evento emitido quando o card é expandido ('true') ou contraído ('false').
						* @event expanded
						* @type {Event}
						*/
						this.$emit('expanded', this.isExpanded);
						break;
				}
			}
		},
	},
};

/* script */
var __vue_script__$g = script$g;

/* template */
var __vue_render__$g = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"expansion-card",class:_vm.expansionCardContainerStyle,on:{"mouseover":function($event){!_vm.isExpanded ? _vm.toggleCardStyle('hover') : null;},"mouseleave":function($event){!_vm.isExpanded ? _vm.toggleCardStyle() : null;},"click":function($event){_vm.isHovering ? _vm.toggleCardStyle('expand') : null;}}},[(_vm.isHovering)?_c('div',{staticClass:"expansion-card__expand-icon",on:{"click":function($event){$event.stopPropagation();return _vm.toggleCardStyle('expand')}}},[_c('span',{staticClass:"expansion-card__label-button"},[_vm._v("Maximizar")])]):_vm._e(),_vm._v(" "),(_vm.isExpanded)?_c('div',{staticClass:"expansion-card__contract-icon",on:{"click":function($event){$event.stopPropagation();return _vm.toggleCardStyle('contract')}}},[_c('span',{staticClass:"expansion-card__label-button"},[_vm._v("Minimizar")])]):_vm._e(),_vm._v(" "),_vm._t("default",[(!_vm.isExpanded)?_c('div',{staticClass:"expansion-card__body"},[_c('div',{staticClass:"expansion-card__icon",class:("expansion-card__icon--" + _vm.variant)},[_vm._t("icon")],2),_vm._v(" "),_c('div',{staticClass:"expansion-card__content"},[_vm._t("main-value",[_c('h1',{staticClass:"expansion-card__main-value"},[_vm._v("\n\t\t\t\t\t\t"+_vm._s(_vm.mainValue)+"\n\t\t\t\t\t")])]),_vm._v(" "),_c('p',{staticClass:"expansion-card__legend"},[_vm._t("legend",[_vm._v("\n\t\t\t\t\t\t"+_vm._s(_vm.legend)+"\n\t\t\t\t\t")])],2)],2)]):_c('div',{staticClass:"expansion-card__expanded-body"},[_c('div',{staticClass:"expansion-card__header"},[_c('div',{staticClass:"expansion-card__icon",class:("expansion-card__icon--" + _vm.variant)},[_vm._t("icon")],2),_vm._v(" "),_c('div',{staticClass:"expansion-card__content"},[_c('p',{staticClass:"expansion-card__legend"},[_vm._t("legend",[_vm._v("\n\t\t\t\t\t\t\t"+_vm._s(_vm.legend)+"\n\t\t\t\t\t\t")])],2),_vm._v(" "),_c('span',{staticClass:"expansion-card__main-value"},[_vm._v("\n\t\t\t\t\t\t"+_vm._s(_vm.subtitle)+"\n\t\t\t\t\t")])])]),_vm._v(" "),_c('div',{staticClass:"expansion-card__expanded-content"},[_vm._t("content")],2)])])],2)};
var __vue_staticRenderFns__$g = [];

  /* style */
  var __vue_inject_styles__$g = function (inject) {
    if (!inject) { return }
    inject("data-v-9ce79e12_0", { source: "ion-icon[data-v-9ce79e12]{font-size:20px!important}@keyframes content-animation-data-v-9ce79e12{from{margin:24px 0 0 0;opacity:0;visibility:hidden;height:50%}to{visibility:visible;opacity:1;height:100%}}[data-v-9ce79e12] .expansion-card__contract-icon path,[data-v-9ce79e12] .expansion-card__expand-icon path{stroke:#8b99a7;stroke-width:1}[data-v-9ce79e12] .expansion-card__contract-icon:hover path,[data-v-9ce79e12] .expansion-card__expand-icon:hover path{transition:stroke ease-in-out;stroke:#83afec}.expansion-card[data-v-9ce79e12],.expansion-card--hover-amber[data-v-9ce79e12],.expansion-card--hover-blue[data-v-9ce79e12],.expansion-card--hover-gray[data-v-9ce79e12],.expansion-card--hover-green[data-v-9ce79e12],.expansion-card--hover-indigo[data-v-9ce79e12],.expansion-card--hover-orange[data-v-9ce79e12],.expansion-card--hover-pink[data-v-9ce79e12],.expansion-card--hover-red[data-v-9ce79e12],.expansion-card--hover-turquoise[data-v-9ce79e12],.expansion-card--hover-violet[data-v-9ce79e12]{display:flex;position:relative;flex-direction:column;align-items:center;padding:16px;border-radius:16px;border:1px solid #e2eaf3;min-height:130px;width:255px;height:130px;transition:all .3s ease-in-out}.expansion-card__label-button[data-v-9ce79e12]{font-size:12px!important;letter-spacing:.15px!important;font-weight:400;cursor:pointer}.expansion-card__label-button[data-v-9ce79e12]:hover{text-decoration:underline}.expansion-card--hover[data-v-9ce79e12],.expansion-card--hover-amber[data-v-9ce79e12],.expansion-card--hover-blue[data-v-9ce79e12],.expansion-card--hover-gray[data-v-9ce79e12],.expansion-card--hover-green[data-v-9ce79e12],.expansion-card--hover-indigo[data-v-9ce79e12],.expansion-card--hover-orange[data-v-9ce79e12],.expansion-card--hover-pink[data-v-9ce79e12],.expansion-card--hover-red[data-v-9ce79e12],.expansion-card--hover-turquoise[data-v-9ce79e12],.expansion-card--hover-violet[data-v-9ce79e12]{transition:transform .5s,box-shadow .2s ease-out;transform:scale(1.035);cursor:pointer}.expansion-card--hover-blue[data-v-9ce79e12]{transition:transform .2s,box-shadow .2s ease-in-out;border:2px solid #b6d1f7;box-shadow:0 0 2px #b6d1f7}.expansion-card--hover-turquoise[data-v-9ce79e12]{transition:transform .2s,box-shadow .2s ease-in-out;border:2px solid #c2edff;box-shadow:0 0 2px #c2edff}.expansion-card--hover-green[data-v-9ce79e12]{transition:transform .2s,box-shadow .2s ease-in-out;border:2px solid #abedd9;box-shadow:0 0 2px #abedd9}.expansion-card--hover-indigo[data-v-9ce79e12]{transition:transform .2s,box-shadow .2s ease-in-out;border:2px solid #ced6fd;box-shadow:0 0 2px #ced6fd}.expansion-card--hover-violet[data-v-9ce79e12]{transition:transform .2s,box-shadow .2s ease-in-out;border:2px solid #e6d2f9;box-shadow:0 0 2px #e6d2f9}.expansion-card--hover-pink[data-v-9ce79e12]{transition:transform .2s,box-shadow .2s ease-in-out;border:2px solid #f9c8e2;box-shadow:0 0 2px #f9c8e2}.expansion-card--hover-red[data-v-9ce79e12]{transition:transform .2s,box-shadow .2s ease-in-out;border:2px solid #fbd0d6;box-shadow:0 0 2px #fbd0d6}.expansion-card--hover-orange[data-v-9ce79e12]{transition:transform .2s,box-shadow .2s ease-in-out;border:2px solid #ffd6cc;box-shadow:0 0 2px #ffd6cc}.expansion-card--hover-amber[data-v-9ce79e12]{transition:transform .2s,box-shadow .2s ease-in-out;border:2px solid #ffe2b8;box-shadow:0 0 2px #ffe2b8}.expansion-card--hover-gray[data-v-9ce79e12]{transition:transform .2s,box-shadow .2s ease-in-out;box-shadow:0 0 2px #bcc7d2;border:2px solid #e2eaf3}.expansion-card--expanded[data-v-9ce79e12]{width:100%;height:auto}.expansion-card__body[data-v-9ce79e12]{display:flex;width:100%;margin-top:auto;margin-bottom:auto}.expansion-card__expanded-body[data-v-9ce79e12]{display:flex;align-self:start;flex-direction:column;width:100%}.expansion-card__expanded-body .expansion-card__header[data-v-9ce79e12]{display:flex;align-items:center}.expansion-card__expanded-body .expansion-card__main-value[data-v-9ce79e12]{font-size:12px!important;letter-spacing:.15px!important;font-weight:400;color:#475766;margin:0 0 4px 0;margin:0}.expansion-card__expanded-body .expansion-card__legend[data-v-9ce79e12]{font-size:14px!important;letter-spacing:.1px!important;font-weight:400;margin:0;color:#29333d;max-width:100%;font-weight:600}.expansion-card__expanded-body .expansion-card__icon[data-v-9ce79e12]{margin:0 16px 0 0}.expansion-card__expanded-content[data-v-9ce79e12]{opacity:0;visibility:hidden;margin:24px 0 0 0;height:0;animation:content-animation-data-v-9ce79e12;animation-delay:.45s;animation-duration:.4s;animation-fill-mode:forwards}.expansion-card__content[data-v-9ce79e12]{display:flex;flex-direction:column}.expansion-card__main-value[data-v-9ce79e12]{font-size:47px!important;letter-spacing:0!important;font-weight:400;color:#29333d;margin:0}.expansion-card__legend[data-v-9ce79e12]{font-size:12px!important;letter-spacing:.15px!important;font-weight:400;margin:0;color:#475766;max-width:155px}.expansion-card__icon[data-v-9ce79e12]{display:flex;padding:12px;border-radius:100%;width:50px;height:50px;align-self:center;align-items:center;justify-content:center;margin:0 16px 0 0}.expansion-card__icon--blue[data-v-9ce79e12]{color:#377ee1;background-color:#f2f5fd}.expansion-card__icon--turquoise[data-v-9ce79e12]{color:#1f86b2;background-color:#f0faff}.expansion-card__icon--green[data-v-9ce79e12]{color:#2ac092;background-color:#eefcf5}.expansion-card__icon--indigo[data-v-9ce79e12]{color:#6174d1;background-color:#e5eaff}.expansion-card__icon--violet[data-v-9ce79e12]{color:#8f4dcc;background-color:#f8f0ff}.expansion-card__icon--pink[data-v-9ce79e12]{color:#cc3381;background-color:#ffeff9}.expansion-card__icon--red[data-v-9ce79e12]{color:#e83047;background-color:#fff0f2}.expansion-card__icon--orange[data-v-9ce79e12]{color:#f5613d;background-color:#fff3f0}.expansion-card__icon--amber[data-v-9ce79e12]{color:#eea22f;background-color:#fff7eb}.expansion-card__icon--gray[data-v-9ce79e12]{color:#8b99a7;background-color:#eff5fb}.expansion-card__icon .b-icon[data-v-9ce79e12]{min-width:20px;min-height:20px}.expansion-card__contract-icon[data-v-9ce79e12],.expansion-card__expand-icon[data-v-9ce79e12]{position:absolute;top:8px;right:12px;color:#566676}.expansion-card__contract-icon[data-v-9ce79e12]:hover,.expansion-card__expand-icon[data-v-9ce79e12]:hover{transition:color ease-in-out;color:#83afec}.expansion-card__contract-icon .b-icon[data-v-9ce79e12]{cursor:pointer}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$g = "data-v-9ce79e12";
  /* module identifier */
  var __vue_module_identifier__$g = undefined;
  /* functional template */
  var __vue_is_functional_template__$g = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$g = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
    __vue_inject_styles__$g,
    __vue_script__$g,
    __vue_scope_id__$g,
    __vue_is_functional_template__$g,
    __vue_module_identifier__$g,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//

var script$h = {
	props: {
		/**
		 * A variante do Highlight. São 3 variantes implementadas: 'info', 'success'
		 * e 'danger'
		 */
		variant: {
			type: String,
			default: 'info',
		},
		/**
		 * Especifica se o highlight vai ser estático ou animado.
		 */
		animated: {
			type: Boolean,
			default: false,
		},
		/**
		 * Especifica a duração da animação.
		 */
		duration: {
			type: Number,
			default: 1,
		},
		/**
		 * O tempo de espera até a animação começar.
		 */
		delay: {
			type: Number,
			default: 0,
		},
	},

	computed: {
		dynamicHighlightClass: function dynamicHighlightClass() {
			var dynamicClass = '';

			if (this.animated) {
				dynamicClass = 'highlight__container--highlighted';
			}

			switch (this.variant) {
				case 'info':
					return (dynamicClass + " highlight__container--info");
				case 'success':
					return (dynamicClass + " highlight__container--success");
				case 'danger':
					return (dynamicClass + " highlight__container--danger");
				default:
					return (dynamicClass + " highlight__container--info");
			}
		},

		dynamicStyle: function dynamicStyle() {
			return {
				'--duration': ((this.duration) + "s"),
				'--delay': ((this.delay) + "s"),
			};
		},
	},
};

/* script */
var __vue_script__$h = script$h;

/* template */
var __vue_render__$h = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"highlight__container",class:_vm.dynamicHighlightClass,style:(_vm.dynamicStyle)},[_vm._t("default")],2)};
var __vue_staticRenderFns__$h = [];

  /* style */
  var __vue_inject_styles__$h = function (inject) {
    if (!inject) { return }
    inject("data-v-13d95157_0", { source: ".highlight__container[data-v-13d95157]{padding:4px;border-radius:4px;background-size:200%}.highlight__container--highlighted[data-v-13d95157]{animation:highlight-data-v-13d95157 var(--duration) ease-in var(--delay) backwards}.highlight__container--info[data-v-13d95157]{background-image:linear-gradient(to right,rgba(131,175,236,.25) 50%,transparent 50%)}.highlight__container--success[data-v-13d95157]{background-image:linear-gradient(to right,rgba(109,223,188,.28) 50%,transparent 50%)}.highlight__container--danger[data-v-13d95157]{background-image:linear-gradient(to right,rgba(247,151,163,.22) 50%,transparent 50%)}@keyframes highlight-data-v-13d95157{0%{background-position:100%}}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$h = "data-v-13d95157";
  /* module identifier */
  var __vue_module_identifier__$h = undefined;
  /* functional template */
  var __vue_is_functional_template__$h = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$h = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$h, staticRenderFns: __vue_staticRenderFns__$h },
    __vue_inject_styles__$h,
    __vue_script__$h,
    __vue_scope_id__$h,
    __vue_is_functional_template__$h,
    __vue_module_identifier__$h,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$i = {
	props: {
		/**
		 * Altura máxima do container até ser scrollado
		 */
		maxHeight: {
			type: String,
			default: '300px',
			required: true,
		},
	},
};

/* script */
var __vue_script__$i = script$i;

/* template */
var __vue_render__$i = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{attrs:{"id":"scrollable"}},[_c('div',{staticClass:"scrollable__container",style:({
			'max-height': _vm.maxHeight,
			'height': _vm.maxHeight,
		})},[_vm._t("default")],2)])};
var __vue_staticRenderFns__$i = [];

  /* style */
  var __vue_inject_styles__$i = function (inject) {
    if (!inject) { return }
    inject("data-v-1b39b816_0", { source: "#scrollable .scrollable__container[data-v-1b39b816]{overflow-y:auto;overflow-x:hidden}#scrollable .scrollable__container[data-v-1b39b816]::-webkit-scrollbar{width:6px;border-radius:8px}#scrollable .scrollable__container[data-v-1b39b816]::-webkit-scrollbar-track{background:0 0}#scrollable .scrollable__container[data-v-1b39b816]::-webkit-scrollbar-thumb{background:#d3dbe4;border-radius:8px}#scrollable .scrollable__container[data-v-1b39b816]::-webkit-scrollbar-thumb:hover{background:#bcc7d2}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$i = "data-v-1b39b816";
  /* module identifier */
  var __vue_module_identifier__$i = undefined;
  /* functional template */
  var __vue_is_functional_template__$i = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$i = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$i, staticRenderFns: __vue_staticRenderFns__$i },
    __vue_inject_styles__$i,
    __vue_script__$i,
    __vue_scope_id__$i,
    __vue_is_functional_template__$i,
    __vue_module_identifier__$i,
    false,
    createInjector,
    undefined,
    undefined
  );

//
moment.locale('pt-br');

var script$j = {
	components: {
		ChevronLeftIcon: ChevronLeftIcon,
	},

	data: function data() {
		return {
			date: null,
			attributes: [
				{
					key: 'today',
					dot: true,
					dates: new Date(),
				} ],
			selectedSchedule: {
				dates: [],
				hour: '',
				minute: '',
				fancySchedule: '',
			},
			screenWidth: screen.width,
			showInLowResolution: false,
		}
	},

	props: {
		/**
		 * Objeto de configuração utilizado para construção do timepicker.
		 */
		scheduleAttributes : {
			type: Object,
			default: function () {},
			required: true,
		},
		/**
		 * Prop que especifica se o timepicker vai ser mostrado ou não.
		 */
		timePicker: {
			type: Boolean,
			default: false,
			description: 'The text that will be displayed inside the badge.',
		}

	},

	watch: {
		timePicker: function timePicker(newValue) {
			if (this.screenWidth <= 770) {
				this.showInLowResolution = newValue;
			}
		},
	},

	methods: {
		isEmpty: function isEmpty(object) {
			return Object.entries(object).length === 0
		},

		dayClicked: function dayClicked() {
			if (!!this.date && this.screenWidth <= 770) {
				this.showInLowResolution = true;
			}

			this.selectedSchedule.dates = this.date;
			/**
			 * Evento emitido quando a data é selecionada no calendário.
			* @event daySelected
			* @type {Event}
			*/
			this.$emit('daySelected', this.date);
			this.$emit('scheduleSelected', this.selectedSchedule);
		},

		toggleCalendarTabs: function toggleCalendarTabs() {
			this.showInLowResolution = this.timePicker && !this.showInLowResolution;
		},

		selectHour: function selectHour(hour, availableHours) {
			if (availableHours) {
				this.selectedSchedule.hour = hour;
			}
		},

		availableHours: function availableHours(hours) {
			return Object.values(hours).filter(function (hour) { return hour === true; }).length;
		},

		availableHoursText: function availableHoursText(hours) {
			var count = this.availableHours(hours);
			var complementText = count === 1 ? 'horário disponível' : 'horários disponíveis';
			return count === 0 ? 'Indisponível' : (count + " " + complementText);
		},

		selectMinute: function selectMinute(minute, availability) {
			if (availability) {
				this.selectedSchedule.minute = minute;
				this.selectedSchedule.fancySchedule = (moment(this.selectedSchedule.dates).format("MM-DD-YYYY")) + " " + minute;
				/**
				 * Evento utilizado para emitir um objeto contendo a data e hora selecionados.
				* @event scheduleSelected
				* @type {Event}
				*/
				this.$emit('scheduleSelected', this.selectedSchedule);
			}
		},
	},
};

/* script */
var __vue_script__$j = script$j;

/* template */
var __vue_render__$j = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.screenWidth <= 770)?_c('div',{staticClass:"calendar-tabs"},[_c('div',{class:_vm.showInLowResolution ? 'calendar-tabs__tab--inactive' : 'calendar-tabs__tab--active'},[_c('span',{on:{"click":_vm.toggleCalendarTabs}},[_vm._v("Data")])]),_vm._v(" "),_c('div',{class:_vm.showInLowResolution ? 'calendar-tabs__tab--active' : 'calendar-tabs__tab--inactive'},[_c('span',{on:{"click":_vm.toggleCalendarTabs}},[_vm._v("Hora")])])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"calendar-container"},[(!_vm.timePicker || !_vm.showInLowResolution)?_c('v-date-picker',_vm._b({attrs:{"is-inline":"","locale":"pt-BR","attributes":_vm.attributes},on:{"input":function($event){return _vm.dayClicked()}},model:{value:(_vm.date),callback:function ($$v) {_vm.date=$$v;},expression:"date"}},'v-date-picker',_vm.$attrs,false)):_vm._e(),_vm._v(" "),(_vm.timePicker && (_vm.screenWidth > 770 || _vm.showInLowResolution))?_c('div',[(!_vm.isEmpty(_vm.scheduleAttributes))?_c('div',{staticClass:"schedule__grid-container"},[(_vm.selectedSchedule.hour === '')?_c('div',{staticClass:"schedule__grid"},_vm._l((_vm.scheduleAttributes),function(hours,index){return _c('div',{key:index,staticClass:"schedule__time-interval",on:{"click":function($event){_vm.selectHour(index, _vm.availableHours(hours));}}},[_c('div',{staticClass:"schedule__time-text",class:{
								'schedule__unavailable-interval': _vm.availableHours(hours) === 0,
								'schedule__grid-hour--selected': index.split(':')[0] === _vm.selectedSchedule.minute.split(':')[0],
							}},[_c('div',{class:_vm.availableHours(hours) === 0 ? 'schedule__unavailable-hour' : 'schedule__available-hour'},[_vm._v("\n\t\t\t\t\t\t\t\t"+_vm._s(index)+"\n\t\t\t\t\t\t\t")]),_vm._v(" "),_c('span',{class:_vm.availableHours(hours) === 0 ? 'schedule__unavailable-intervals' : 'schedule__available-intervals'},[_vm._v("\n\t\t\t\t\t\t\t\t"+_vm._s(_vm.availableHoursText(hours))+"\n\t\t\t\t\t\t\t")])])])}),0):_c('div',[_c('div',{staticClass:"schedule__minutes-container"},[_c('div',{staticClass:"minutes-container__header"},[_c('div',{staticClass:"minutes-container__back-buton",on:{"click":function($event){_vm.selectedSchedule.hour = '';}}},[_vm._v("\n\t\t\t\t\t\t\t\tVoltar\n\t\t\t\t\t\t\t")]),_vm._v(" "),_c('chevron-left-icon',{staticClass:"chevron-icon",attrs:{"size":"1.46x"},on:{"click":function($event){_vm.selectedSchedule.hour = '';}}}),_vm._v(" "),_c('div',{staticClass:"minutes-container__header-text"},[_c('div',{staticClass:"minutes-container__header-hours"},[_vm._v("\n\t\t\t\t\t\t\t\t\t"+_vm._s(_vm.selectedSchedule.hour)+" - "+_vm._s(_vm.selectedSchedule.hour.replace('00',  '') + '59')+"\n\t\t\t\t\t\t\t\t")]),_vm._v(" "),_c('div',{staticClass:"minutes-container__header-available-hours"},[_vm._v("\n\t\t\t\t\t\t\t\t\t"+_vm._s(_vm.availableHoursText(_vm.scheduleAttributes[_vm.selectedSchedule.hour]))+"\n\t\t\t\t\t\t\t\t")])])],1),_vm._v(" "),_c('div',{staticClass:"schedule__grid-hour"},_vm._l((_vm.scheduleAttributes[_vm.selectedSchedule.hour]),function(availability,hour){return _c('div',{key:hour,staticClass:"schedule__time-interval"},[_c('div',{staticClass:"time-interval__minutes",class:{
										'schedule__grid-hour--unavailable': !availability,
										'schedule__grid-hour--selected': _vm.selectedSchedule.minute === hour,
									},on:{"click":function($event){return _vm.selectMinute(hour, availability)}}},[_vm._v("\n\t\t\t\t\t\t\t\t\t"+_vm._s(hour)+"\n\t\t\t\t\t\t\t\t")])])}),0)])])]):_c('div',[_c('div',{staticClass:"schedule__grid"},_vm._l((12),function(index){return _c('div',{key:index,staticClass:"schedule__time-interval"},[_c('div',{staticClass:"schedule-skeleton"})])}),0)])]):_vm._e()],1)])};
var __vue_staticRenderFns__$j = [];

  /* style */
  var __vue_inject_styles__$j = function (inject) {
    if (!inject) { return }
    inject("data-v-2b93ed60_0", { source: "@media screen and (max-width:770px){.schedule__grid[data-v-2b93ed60]{display:grid;grid-template-columns:1fr;margin-left:20px;grid-gap:12px;width:212px;padding-top:16px}.schedule__grid-container[data-v-2b93ed60]{padding-bottom:20px;height:266px;overflow:scroll;width:252px;border:1px solid #cbd5e0;border-top:none;border-radius:0 0 8px 8px;-ms-overflow-style:none;scrollbar-width:none}.schedule__grid-container[data-v-2b93ed60]::-webkit-scrollbar{display:none}.schedule__minutes-container[data-v-2b93ed60]{height:266px;width:252px;overflow:scroll;-ms-overflow-style:none;scrollbar-width:none;border-top:none;border-radius:0 0 8px 8px;margin-top:12px}.schedule__minutes-container[data-v-2b93ed60]::-webkit-scrollbar{display:none}.schedule__grid-hour[data-v-2b93ed60]{display:grid;grid-template-columns:1fr 1fr;grid-gap:12px;padding:20px}.schedule__grid-hour--selected[data-v-2b93ed60]{background-color:#377ee1;color:#fff!important;border:1px solid #377ee1!important;font-weight:500}.schedule__grid-hour--unavailable[data-v-2b93ed60]{font-size:16px!important;letter-spacing:.25px!important;font-weight:600;color:#566676!important;border:1px solid #d3dbe4!important;cursor:default;font-weight:400}}@media screen and (min-width:770px){.schedule__grid[data-v-2b93ed60]{display:grid;grid-template-columns:1fr 1fr 1fr;margin-left:20px;grid-gap:12px}.schedule__minutes-container[data-v-2b93ed60]{padding:20px;border:1px solid #7c8a98;margin-left:20px;border-radius:8px}.schedule__grid-hour[data-v-2b93ed60]{display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1fr;grid-gap:12px;padding:20px}.schedule__grid-hour--selected[data-v-2b93ed60]{background-color:#377ee1;color:#fff!important;border:1px solid #377ee1!important;font-weight:500}.schedule__grid-hour--unavailable[data-v-2b93ed60]{color:#bcc7d2!important;font-size:16px!important;letter-spacing:.25px!important;font-weight:600;border:1px solid #d3dbe4!important;cursor:default;font-weight:400}}.schedule__time-text[data-v-2b93ed60]{padding:8px 12px;border-radius:8px;border:1px solid #7c8a98;text-align:center;color:#475766}.schedule__available-hour[data-v-2b93ed60]{font-size:14px!important;letter-spacing:.15px!important;font-weight:600;margin-bottom:-4px}.schedule__unavailable-hour[data-v-2b93ed60]{font-size:14px!important;letter-spacing:.15px!important;font-weight:600;color:#bcc7d2;margin-bottom:-4px}.schedule__unavailable-interval[data-v-2b93ed60]{color:#d3dbe4!important;font-size:16px!important;letter-spacing:.25px!important;font-weight:600;border:1px solid #abb8c4!important;cursor:default;font-weight:400}.schedule__available-intervals[data-v-2b93ed60]{font-size:12px!important;letter-spacing:.15px!important;font-weight:400}.schedule__unavailable-intervals[data-v-2b93ed60]{font-size:12px!important;letter-spacing:.15px!important;font-weight:400;color:#bcc7d2}.schedule__time-interval[data-v-2b93ed60]{text-align:center;cursor:pointer}@media screen and (max-width:770px){.minutes-container__back-buton[data-v-2b93ed60]{display:none}.minutes-container__header-text[data-v-2b93ed60]{text-align:center;width:180px}}@media screen and (min-width:770px){.minutes-container__back-buton[data-v-2b93ed60]{cursor:pointer;font-size:14px!important;letter-spacing:.15px!important;font-weight:600;color:#377ee1}.minutes-container__back-buton[data-v-2b93ed60]:hover{text-decoration:underline}.minutes-container__header-text[data-v-2b93ed60]{text-align:center;width:-webkit-fill-available;width:-moz-available;width:fill-available}}.minutes-container__header[data-v-2b93ed60]{display:flex;justify-content:center}.minutes-container__header-hours[data-v-2b93ed60]{font-size:14px!important;letter-spacing:.15px!important;font-weight:600;font-weight:700;color:#36424e}.minutes-container__header-available-hours[data-v-2b93ed60]{font-size:12px!important;letter-spacing:.15px!important;font-weight:400;font-weight:500;color:#475766}.schedule-skeleton[data-v-2b93ed60]{box-shadow:0 4px 10px 0 rgba(33,33,33,.15);border-radius:4px;position:relative;overflow:hidden;width:182.89px;height:59px;border-radius:8px}.schedule-skeleton[data-v-2b93ed60]::before{content:\"\";display:block;position:absolute;left:-150px;top:0;height:100%;width:150px;background:linear-gradient(to right,transparent 0,#e8e8e8 50%,transparent 100%);animation:load-data-v-2b93ed60 1.4s ease-in-out infinite}.time-interval__minutes[data-v-2b93ed60]{padding:8px 20px;border-radius:8px;border:1px solid #7c8a98;color:#36424e}@keyframes load-data-v-2b93ed60{from{left:-150px}to{left:100%}}@media screen and (max-width:770px){.vc-container[data-v-2b93ed60]{border-top:none!important;border-radius:0 0 8px 8px}.calendar-tabs[data-v-2b93ed60]{display:flex;border-radius:8px 8px 0 0;border:1px solid #cbd5e0;border-bottom:none;width:252px;justify-content:space-around}}@media screen and (min-width:770px){.chevron-icon[data-v-2b93ed60]{display:none}}.chevron-icon[data-v-2b93ed60]{color:#718096}.calendar-tabs__tab[data-v-2b93ed60],.calendar-tabs__tab--active[data-v-2b93ed60],.calendar-tabs__tab--inactive[data-v-2b93ed60]{padding:16px 41px 8px;border-radius:8px 8px 0 0;font-weight:500}.calendar-tabs__tab--active[data-v-2b93ed60]{color:#239f78;border-bottom:2px solid #377ee1}.calendar-tabs__tab--inactive[data-v-2b93ed60]{color:rgba(55,126,225,.75)}.calendar-container[data-v-2b93ed60]{display:flex}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$j = "data-v-2b93ed60";
  /* module identifier */
  var __vue_module_identifier__$j = undefined;
  /* functional template */
  var __vue_is_functional_template__$j = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$j = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$j, staticRenderFns: __vue_staticRenderFns__$j },
    __vue_inject_styles__$j,
    __vue_script__$j,
    __vue_scope_id__$j,
    __vue_is_functional_template__$j,
    __vue_module_identifier__$j,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$k = {
	directives: {
		'on-click-outside': directive,
	},

	data: function data() {
		return {
			id: null,
			isActive: false,
		};
	},

	mounted: function mounted() {
		this.id = "filter-pill$-" + (this._uid);
	},

	props: {
		/**
		 * Conteúdo do filter pill.
		 */
		content: {
			type: String,
			default: 'Conteúdo',
			required: true,
		},
		/**
		 * Label exibida ao lado do conteúdo
		 */
		label: {
			type: String,
			default: 'Label',
			required: true,
		},
		/**
		 * Controla a disponibilidade do FilterPill
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Controla o tamanho do popover do FilterPill (em pixels).
		 * O tamanho nunca é menor que a largura do FilterPill.
		 */
		dropdownWidth: {
			type: Number,
			default: 0,
		},
	},

	computed: {
		dynamicStyle: function dynamicStyle() {
			var filterPillDomReference = document.getElementById(this.id);

			if (!filterPillDomReference) {
				return null;
			}

			var filterWidth = parseFloat(window.getComputedStyle(filterPillDomReference).width);

			if (filterWidth > this.dropdownWidth) {
				return {
					'--width': (filterWidth + "px"),
				};
			}

			return {
				'--width': ((this.dropdownWidth) + "px"),
			};
		},
	},

	methods: {
		activeSelection: function activeSelection() {
			if (this.disabled) {
				return;
			}

			this.isActive = !this.isActive;

			/**
			* Evento que indica que o FilterPill foi clicado
			* @event click
			* @type {Event}
			*/
			this.$emit('click', true);
		},

		hide: function hide() {
			this.isActive = !this.isActive;
		},
	},
};

/* script */
var __vue_script__$k = script$k;

/* template */
var __vue_render__$k = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('span',{staticClass:"filter-pill__container",class:{
			'filter-pill__container--disabled' : _vm.disabled,
			'filter-pill__container--active': _vm.isActive && !_vm.disabled,
		},attrs:{"id":_vm.id},on:{"click":_vm.activeSelection}},[_c('span',{staticClass:"filter-pill__label"},[_vm._v(_vm._s(this.label)+": ")]),_vm._v(" "),_c('span',{staticClass:"filter-pill__content"},[_vm._v(_vm._s(this.content)+" ")]),_vm._v(" "),_c('ion-icon',{class:(_vm.isActive && !_vm.disabled) ? 'filter-pill__chevron--up' : 'filter-pill__chevron--down',attrs:{"name":"chevron-down-outline"}})],1),_vm._v(" "),(_vm.isActive)?_c('div',{directives:[{name:"on-click-outside",rawName:"v-on-click-outside",value:(_vm.hide),expression:"hide"}],staticClass:"filter-pill__dropdown",style:(_vm.dynamicStyle)},[_vm._t("default")],2):_vm._e()])};
var __vue_staticRenderFns__$k = [];

  /* style */
  var __vue_inject_styles__$k = function (inject) {
    if (!inject) { return }
    inject("data-v-48a2d87e_0", { source: ".filter-pill__container[data-v-48a2d87e]{display:inline-block;padding:8px 16px;border:1px solid #bcc7d2;border-radius:8px;cursor:pointer}.filter-pill__container--disabled[data-v-48a2d87e]{background-color:#e2eaf3;cursor:default}.filter-pill__container--active[data-v-48a2d87e],.filter-pill__container[data-v-48a2d87e]:hover:not(.filter-pill__container--disabled){border-color:transparent!important;box-shadow:0 0 0 4px rgba(42,192,146,.2)}.filter-pill__label[data-v-48a2d87e]{font-size:14px!important;letter-spacing:.25px!important;font-weight:400;font-weight:400;color:#566676}.filter-pill__content[data-v-48a2d87e]{font-size:14px!important;letter-spacing:.25px!important;font-weight:400;font-weight:600;color:#36424e}.filter-pill__chevron--up[data-v-48a2d87e]{margin-left:8px;margin-bottom:-4px;color:#566676;transition:all .25s ease-in-out;transform:rotate(180deg)}.filter-pill__chevron--down[data-v-48a2d87e]{margin-left:8px;margin-bottom:-4px;color:#566676;transition:all .25s ease-in-out}.filter-pill__dropdown[data-v-48a2d87e]{width:var(--width);position:absolute;background-color:#fff;padding:20px;top:94px;border-radius:8px;box-shadow:0 0 8px rgba(30,37,44,.08);border:1px solid #e2eaf3;z-index:999999999;color:#475766}ion-icon[data-v-48a2d87e]{visibility:visible!important;font-size:18px!important}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$k = "data-v-48a2d87e";
  /* module identifier */
  var __vue_module_identifier__$k = undefined;
  /* functional template */
  var __vue_is_functional_template__$k = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$k = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$k, staticRenderFns: __vue_staticRenderFns__$k },
    __vue_inject_styles__$k,
    __vue_script__$k,
    __vue_scope_id__$k,
    __vue_is_functional_template__$k,
    __vue_module_identifier__$k,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }
var script$l = {
	props: {
		/**
		 * O valor mínimo do slider.
		 */
		min: {
			type: Number,
			default: 0,
			required: true,
		},
		/**
		 * O valor máximo do slider.
		 */
		max: {
			type: Number,
			default: 100,
			required: true,
		},
		/**
		* Prop utilizada como v-model. Retorna as posições selecionadas no slider.
		*/
		value: {
			type: Array,
			default: function () { return []; },
			required: true,
		},
	},
	data: function data() {
		return {
			internalValue: this.value,
		};
	},
	computed: {
		attrs: function attrs() {
			var ref = this.$attrs;
			var min = ref.min;
			var max = ref.max;
			var value = ref.value;
			var rest = objectWithoutProperties( ref, ["min", "max", "value"] );
			var attrs = rest;

			return attrs;
		},
		hasProcessSlot: function hasProcessSlot() {
			return !!this.$scopedSlots.process;
		},
	},
	watch: {
		internalValue: function internalValue(newValue) {
			this.$emit('input', newValue);
		},
	},
};

/* script */
var __vue_script__$l = script$l;

/* template */
var __vue_render__$l = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('vue-slider',_vm._b({attrs:{"enable-cross":false,"min":_vm.min,"max":_vm.max},scopedSlots:_vm._u([{key:"tooltip",fn:function(tooltip){return [_vm._t("tooltip",null,{"tooltip":tooltip})]}},(_vm.hasProcessSlot)?{key:"process",fn:function(process){return [_vm._t("process",null,{"process":process})]}}:null],null,true),model:{value:(_vm.internalValue),callback:function ($$v) {_vm.internalValue=$$v;},expression:"internalValue"}},'vue-slider',_vm.attrs,false))],1)};
var __vue_staticRenderFns__$l = [];

  /* style */
  var __vue_inject_styles__$l = function (inject) {
    if (!inject) { return }
    inject("data-v-e8342136_0", { source: ".vue-slider-disabled{opacity:.5;cursor:not-allowed}.vue-slider-rail{background-color:#d3dbe4;border-radius:15px}.vue-slider-process{border-radius:15px;background:#f2f5fd}.vue-slider-mark{z-index:4}.vue-slider-mark:first-child .vue-slider-mark-step,.vue-slider-mark:last-child .vue-slider-mark-step{display:none}.vue-slider-mark-step{width:100%;height:100%;border-radius:50%;background-color:rgba(0,0,0,.16)}.vue-slider-mark-label{font-size:14px;white-space:nowrap}.vue-slider-dot{width:16px!important;height:16px!important}.vue-slider-dot-handle{cursor:pointer;width:100%;height:100%;border:2px solid #b6d1f7;border-radius:50%;background-color:#f2f5fd;box-sizing:border-box;box-shadow:.5px .5px 2px 1px rgba(0,0,0,.32)}.vue-slider-dot-handle-focus{box-shadow:0 0 1px 2px rgba(52,152,219,.36)}.vue-slider-dot-handle-disabled{cursor:not-allowed;background-color:#ccc}.vue-slider-dot-tooltip-inner{font-size:14px;white-space:nowrap;padding:2px 5px;min-width:20px;text-align:center;color:#fff;border-radius:5px;border-color:#3498db;background-color:#3498db;box-sizing:content-box}.vue-slider-dot-tooltip-inner::after{content:\"\";position:absolute}.vue-slider-dot-tooltip-inner-top::after{top:100%;left:50%;transform:translate(-50%,0);height:0;width:0;border-color:transparent;border-style:solid;border-width:5px;border-top-color:inherit}.vue-slider-dot-tooltip-inner-bottom::after{bottom:100%;left:50%;transform:translate(-50%,0);height:0;width:0;border-color:transparent;border-style:solid;border-width:5px;border-bottom-color:inherit}.vue-slider-dot-tooltip-inner-left::after{left:100%;top:50%;transform:translate(0,-50%);height:0;width:0;border-color:transparent;border-style:solid;border-width:5px;border-left-color:inherit}.vue-slider-dot-tooltip-inner-right::after{right:100%;top:50%;transform:translate(0,-50%);height:0;width:0;border-color:transparent;border-style:solid;border-width:5px;border-right-color:inherit}.vue-slider-dot-tooltip-wrapper{opacity:0;transition:all .3s}.vue-slider-dot-tooltip-wrapper-show{opacity:1}.vue-slider-component .vue-slider{background-color:#f2f5fd!important}.vue-slider-component .vue-slider-process{background-color:#b6d1f7!important}.vue-slider-component .vue-slider-dot .vue-slider-dot-handle{background-color:#f2f5fd!important;border:2px solid #83afec!important}.vue-slider-dot-handle{box-shadow:none!important}.vue-slider-component .vue-slider-dot .vue-slider-dot-handle{box-shadow:none!important}.vue-slider{height:3px!important}.vue-slider-component .vue-slider-tooltip{border:none!important;background-color:transparent!important;color:#475766!important;margin:0 0 -8px 0!important;font-size:12px!important;letter-spacing:.15px!important;font-weight:400}.vue-slider-component .vue-slider-tooltip-top .vue-merged-tooltip .vue-slider-tooltip::before,.vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-top .vue-slider-tooltip::before{border:none!important}.vue-slider-dot-tooltip-inner{background-color:transparent;border-color:transparent;color:#000}.vue-slider-process{background-color:#b6d1f7;border-radius:15px}.merge-tooltip{position:absolute;left:50%;bottom:100%;transform:translate(-50%,-15px)}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$l = undefined;
  /* module identifier */
  var __vue_module_identifier__$l = undefined;
  /* functional template */
  var __vue_is_functional_template__$l = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$l = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$l, staticRenderFns: __vue_staticRenderFns__$l },
    __vue_inject_styles__$l,
    __vue_script__$l,
    __vue_scope_id__$l,
    __vue_is_functional_template__$l,
    __vue_module_identifier__$l,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//

var script$m = {
	props: {
		/**
		 * Controla a visibilidade do componente.
		 */
		show: {
			type: Boolean,
			default: false,
		},
		/**
		 * Indica o elemento no DOM associado ao tooltip. Ele deve existir para que o tooltip seja mostrado.
		 */
		target: {
			type: String,
			default: '',
		},
	},
	data: function () {
		return {
			visibilityController: this.show,
		}
	},

	watch: {
		show: function show(oldV, newV) {
			var this$1 = this;

			if (this.show) {
				this.visibilityController = true;
				var tooltip = document.getElementById('tooltip');
				var offsets = document.getElementById(this.target).getBoundingClientRect();

				tooltip.style.transition = 'none';
				tooltip.style.top = (document.getElementById(this.target).getBoundingClientRect().top + window.pageYOffset) + 'px';

				var targetWidth = parseFloat(window.getComputedStyle(document.getElementById(this.target)).width);
				var tooltipWidth = parseFloat(window.getComputedStyle(document.getElementById('tooltip')).width);
				tooltip.style.left = (((targetWidth - tooltipWidth) / 2) + offsets.left) + 'px';

				tooltip.style.transition = 'all .3s ease-in-out';

				tooltip.style.top = (document.getElementById(this.target).getBoundingClientRect().top + window.pageYOffset - 30) + 'px';

				setTimeout(function () {
					this$1.visibilityController = false;
					tooltip.style.transition = 'none';
					tooltip.style.top = (document.getElementById(this$1.target).getBoundingClientRect().top + window.pageYOffset) + 'px';

					this$1.$emit('hide', true);
				}, 1500);
			}
		},
	},
};

/* script */
var __vue_script__$m = script$m;

/* template */
var __vue_render__$m = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"tooltip__container",class:_vm.visibilityController ? 'tooltip__container--active' : 'tooltip__container--inactive',attrs:{"id":"tooltip"}},[_vm._t("default")],2)};
var __vue_staticRenderFns__$m = [];

  /* style */
  var __vue_inject_styles__$m = function (inject) {
    if (!inject) { return }
    inject("data-v-eb88e0d6_0", { source: ".tooltip__container[data-v-eb88e0d6]{border-radius:16px;background-size:200%;background-color:#1e252c;color:#fff;position:absolute;padding:4px 12px;margin:0;font-size:12px!important;letter-spacing:.15px!important;font-weight:400;z-index:999}.tooltip__container--active[data-v-eb88e0d6]{opacity:1}.tooltip__container--inactive[data-v-eb88e0d6]{opacity:0}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$m = "data-v-eb88e0d6";
  /* module identifier */
  var __vue_module_identifier__$m = undefined;
  /* functional template */
  var __vue_is_functional_template__$m = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$m = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$m, staticRenderFns: __vue_staticRenderFns__$m },
    __vue_inject_styles__$m,
    __vue_script__$m,
    __vue_scope_id__$m,
    __vue_is_functional_template__$m,
    __vue_module_identifier__$m,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$n = {
	data: function data() {
		return {
			isActive: this.value,
			internalFocus: this.focused,
		};
	},

	props: {
		/**
		* Prop utilizada como v-model. Controla a o estado do ToggleSwitch.
		*/
		value: {
			type: Boolean,
			default: false,
			required: true,
		},
		/**
		* Torna o ToggleSwitch pequeno.
		*/
		small: {
			type: Boolean,
			default: false,
		},
		/**
		* Torna o ToggleSwitch grande.
		*/
		large: {
			type: Boolean,
			default: false,
		},
		/**
		 * Controla a disponibilidade do ToggleSwitch
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Controla o focus do ToggleSwitch
		 */
		focused: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		toggleSwitchSize: function toggleSwitchSize() {
			if (this.small === this.large) {
				return 'switch--medium';
			}

			if (this.small) {
				return 'switch--small';
			}

			return 'switch--large';
		},
	},

	watch: {
		value: function value(newValue, oldValue) {
			if (newValue !== oldValue) {
				this.isActive = newValue;
			}
		},
	},

	methods: {
		handleClick: function handleClick() {
			/**
			 * Evento utilizado para implementar o v-model.
			* @event input
			* @type {Event}
				*/
			this.$emit('input', !this.isActive);
		},
	},
};

/* script */
var __vue_script__$n = script$n;

/* template */
var __vue_render__$n = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('label',{staticClass:"switch",class:_vm.toggleSwitchSize},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.isActive),expression:"isActive"}],attrs:{"type":"checkbox","disabled":_vm.disabled},domProps:{"checked":Array.isArray(_vm.isActive)?_vm._i(_vm.isActive,null)>-1:(_vm.isActive)},on:{"click":_vm.handleClick,"change":function($event){var $$a=_vm.isActive,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.isActive=$$a.concat([$$v]));}else {$$i>-1&&(_vm.isActive=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else {_vm.isActive=$$c;}}}}),_vm._v(" "),_c('span',{staticClass:"switch__slider",class:{
				'switch__slider--active-focused': (_vm.internalFocus && _vm.isActive) && !_vm.disabled,
				'switch__slider--inactive-focused': (_vm.internalFocus && !_vm.isActive) && !_vm.disabled,
				'switch__slider--small': _vm.small && _vm.small !== _vm.large,
				'switch__slider--large': _vm.large && _vm.small !== _vm.large,
				'switch__slider--medium': _vm.small === _vm.large,
			},attrs:{"tabindex":"0"},on:{"focusout":function($event){_vm.internalFocus = false;},"focusin":function($event){_vm.internalFocus = true;}}})])])};
var __vue_staticRenderFns__$n = [];

  /* style */
  var __vue_inject_styles__$n = function (inject) {
    if (!inject) { return }
    inject("data-v-4ad5e460_0", { source: ".switch[data-v-4ad5e460]{position:relative;display:inline-block}.switch--small[data-v-4ad5e460]{width:28px;height:16px}.switch--medium[data-v-4ad5e460]{width:40px;height:23px}.switch--large[data-v-4ad5e460]{width:56px;height:30px}.switch input[data-v-4ad5e460]{opacity:0;width:0;height:0}.switch input:checked+.switch__slider[data-v-4ad5e460]{background-color:#2ac092}.switch input:checked+.switch__slider--small[data-v-4ad5e460]:before{-webkit-transform:translateX(12px);-ms-transform:translateX(12px);transform:translateX(12px)}.switch input:checked+.switch__slider--medium[data-v-4ad5e460]:before{-webkit-transform:translateX(16px);-ms-transform:translateX(16px);transform:translateX(16px)}.switch input:checked+.switch__slider--small[data-v-4ad5e460]:before{-webkit-transform:translateX(12px);-ms-transform:translateX(12px);transform:translateX(12px)}.switch input:checked+.switch__slider--medium[data-v-4ad5e460]:before{-webkit-transform:translateX(16px);-ms-transform:translateX(16px);transform:translateX(16px)}.switch input:checked+.switch__slider--large[data-v-4ad5e460]:before{-webkit-transform:translateX(24px);-ms-transform:translateX(24px);transform:translateX(24px)}.switch input:disabled+.switch__slider[data-v-4ad5e460]{cursor:default;background-color:#d3dbe4}.switch input:disabled+.switch__slider[data-v-4ad5e460]:before{background-color:#e2eaf3}.switch__slider[data-v-4ad5e460]{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#bcc7d2;-webkit-transition:.35s;transition:.35s;border-radius:80px}.switch__slider--small[data-v-4ad5e460]:before{position:absolute;content:\"\";height:12px;width:12px;left:2px;bottom:2px;background-color:#fff;-webkit-transition:.35s;border-radius:50%;transition:.35s}.switch__slider--medium[data-v-4ad5e460]:before{position:absolute;content:\"\";height:18px;width:18px;left:3px;bottom:2.7px;background-color:#fff;-webkit-transition:.35s;border-radius:50%;transition:.35s}.switch__slider--large[data-v-4ad5e460]:before{position:absolute;content:\"\";height:24px;width:24px;left:4px;bottom:3px;background-color:#fff;-webkit-transition:.35s;border-radius:50%;transition:.35s}.switch__slider--medium[data-v-4ad5e460]:focus{outline:0}.switch__slider--active-focused[data-v-4ad5e460]{box-shadow:0 0 0 .2rem #6ddfbc}.switch__slider--inactive-focused[data-v-4ad5e460]{box-shadow:0 0 0 .2rem rgba(131,175,236,.45)}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$n = "data-v-4ad5e460";
  /* module identifier */
  var __vue_module_identifier__$n = undefined;
  /* functional template */
  var __vue_is_functional_template__$n = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$n = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$n, staticRenderFns: __vue_staticRenderFns__$n },
    __vue_inject_styles__$n,
    __vue_script__$n,
    __vue_scope_id__$n,
    __vue_is_functional_template__$n,
    __vue_module_identifier__$n,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

function objectWithoutProperties$1 (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }

var SELECTED = 0;
var NOT_SELECTED = 1;

var clone = function (el) {
	if(el === undefined) { return {}; }
	return JSON.parse(JSON.stringify(el));
};

var script$o = {
	components: {
		Multiselect: Multiselect,
	},

	props: {
		label: {
			type: String,
			default: 'text',
		},

		trackBy: {
			type: String,
			default: 'value',
		},

		options: {
			type: Array,
			required: true,
		},
	},

	data: function data() {
		return {
			selectedValue: this.$attrs.value || [],
			internalOptions: clone(this.options),
			groupValues: null,
			groupLabel: null,
			selectAllValue: false,
			queryString: '',
			indeterminate: false,
			uniqueKey: generateKey(),
		};
	},

	computed: {
		selectedFancyMessage: function selectedFancyMessage() {
			var this$1 = this;

			return function (qty) {
				if (qty === 1) {
					return this$1.selectedValue[0][this$1.label];
				}				return (qty + " opções selecionadas");
			};
		},

		selectAllFancyMessage: function selectAllFancyMessage() {
			if (!this.hasSelectedValues) {
				return 'Selecionar todos';
			}
			return 'Desfazer seleção';
		},

		hasSelectedValues: function hasSelectedValues() {
			return this.selectedValue.length > 0;
		},

		isAllItemsSelected: function isAllItemsSelected() {
			return this.selectedValue.length === this.options.length;
		},

		computedPlaceholder: function computedPlaceholder() {
			if (this.$attrs.placeholder) {
				return this.$attrs.placeholder;
			}
			return 'Selecione uma ou mais opções';
		},

		isGroupMode: function isGroupMode() {
			return (this.internalOptions[SELECTED] && this.internalOptions[SELECTED].$status)
				|| (this.internalOptions[NOT_SELECTED] && this.internalOptions[NOT_SELECTED].$status);
		},

		attrs: function attrs() {
			var ref = this.$attrs;
			var label = ref.label;
			var trackBy = ref.trackBy;
			var options = ref.options;
			var rest = objectWithoutProperties$1( ref, ["label", "trackBy", "options"] );
			var attrs = rest;
			return attrs;
		},
	},

	mounted: function mounted() {
		this.updateRenderOptions();
		this.indeterminate = this.hasSelectedValues && this.selectedValue.length < this.options.length;
	},

	watch: {
		selectedValue: function selectedValue(values) {
			var cleanedValues = clone(values);
			cleanedValues.forEach(function (val) { return delete val.isSelected; });

			this.indeterminate = values.length > 0 && values.length < this.options.length;

			/**
			 * Evento utilizado para implementar o v-model.
			* @event input
			* @type {Event}
				*/
			this.$emit('input', cleanedValues);
		},

		isAllItemsSelected: function isAllItemsSelected(newValue) {
			if (!newValue && this.selectAllValue) {
				this.selectAllValue = false;
				return;
			}

			if (newValue && !this.selectAllValue) {
				this.selectAllValue = true;
			}
		},

		indeterminate: function indeterminate(newValue) {
			var input = document.getElementById('select-all-input-id');
			input.indeterminate = newValue;
		},
	},

	methods: {
		unselectItem: function unselectItem(option) {
			this.handleSelectItem(option);
			/**
			 * Evento disparado quando um item é deselecionado.
			* @event input
			* @type {Event}
				*/
			this.$emit('remove', option);
		},

		selectItem: function selectItem(option) {
			this.handleSelectItem(option);
			/**
			 * Evento disparado quando um item é selecionado.
			* @event input
			* @type {Event}
				*/
			this.$emit('select', option);
		},

		handleSelectItem: function handleSelectItem(option) {
			var this$1 = this;

			if (this.isGroupMode) {
				this.internalOptions[SELECTED].options.forEach(function (item) {
					if (item[this$1.label] === option[this$1.label]) {
						item.isSelected = !item.isSelected;
					}
				});
				this.internalOptions[NOT_SELECTED].options.forEach(function (item) {
					if (item[this$1.label] === option[this$1.label]) {
						item.isSelected = !item.isSelected;
					}
				});
			} else {
				this.internalOptions.forEach(function (item) {
					if (item[this$1.label] === option[this$1.label]) {
						item.isSelected = !item.isSelected;
					}
				});
			}
		},

		toggleSelectAll: function toggleSelectAll() {
			var this$1 = this;

			this.selectAllValue = !this.hasSelectedValues;

			if (this.selectAllValue) {
				this.selectedValue = this.options;
			} else {
				this.selectedValue = [];
			}

			this.$nextTick().then(function () {
				if (this$1.isGroupMode) {
					this$1.$set(
						this$1.internalOptions[SELECTED],
						'options',
						this$1.internalOptions[SELECTED].options.map(function (item) { return (Object.assign({}, item,
							{isSelected: this$1.selectAllValue})); })
					);

					this$1.$set(
						this$1.internalOptions[NOT_SELECTED],
						'options',
						this$1.internalOptions[NOT_SELECTED].options.map(function (item) { return (Object.assign({}, item,
							{isSelected: this$1.selectAllValue})); })
					);
				} else {
					this$1.$set(
						this$1,
						'internalOptions',
						this$1.internalOptions.map(function (item) { return (Object.assign({}, item,
							{isSelected: this$1.selectAllValue})); })
					);
				}
			});
		},

		addItemViaCustomCheckbox: function addItemViaCustomCheckbox(option) {
			option.isSelected = !option.isSelected;
			this.selectedValue = ( this.selectedValue ).concat( [option] );
		},

		handleClose: function handleClose() {
			this.updateRenderOptions();
			this.setContentWrapperScrollToTop();
			/**
			 * Evento disparado quando o select é fechado.
			* @event input
			* @type {Event}
				*/
			this.$emit('close');
		},

		updateRenderOptions: function updateRenderOptions() {
			var this$1 = this;

			if (!this.hasSelectedValues) {
				this.internalOptions = clone(this.options.map(function (item) { return (Object.assign({}, item,
					{isSelected: false})); }));
				this.groupValues = null;
				this.groupLabel = null;
				return;
			}

			this.selectedValue.forEach(function (item) {
				item.isSelected = true;
			});

			var rawOptions = clone(this.options);
			rawOptions = rawOptions.map(function (item) {
				var containsItem = this$1.selectedValue.some(
					function (value) { return value[this$1.label] === item[this$1.label]; }
				);

				if (containsItem) {
					item.isSelected = true;
				} else {
					item.isSelected = false;
				}

				return item;
			});

			this.internalOptions = [
				{
					$status: 'Selecionados',
					options: [],
				},
				{
					$status: 'Não selecionados',
					options: [],
				} ];

			this.internalOptions[SELECTED]
				.options = this.selectedValue;
			this.internalOptions[NOT_SELECTED]
				.options = rawOptions.filter(function (item) { return !item.isSelected; });

			this.groupValues = 'options';
			this.groupLabel = '$status';
		},

		handleSearchChange: function handleSearchChange(queryString) {
			this.queryString = queryString;
		},

		setContentWrapperScrollToTop: function setContentWrapperScrollToTop() {
			document.querySelector(("span[data-cds-multiselect-identifier='" + (this.uniqueKey) + "']"))
				.getElementsByClassName('multiselect__content-wrapper')[0]
				.scrollTo(0, 0);
		},
	},
};

/* script */
var __vue_script__$o = script$o;

/* template */
var __vue_render__$o = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{attrs:{"id":"cds-multiselect","data-cds-multiselect-identifier":_vm.uniqueKey}},[_c('multiselect',_vm._b({attrs:{"options":_vm.internalOptions,"label":_vm.label,"track-by":_vm.trackBy,"multiple":"","group-values":_vm.groupValues,"group-label":_vm.groupLabel,"close-on-select":false,"clear-on-select":false,"select-label":"","deselect-label":"","selected-label":"","placeholder":_vm.computedPlaceholder,"block-keys":['Delete', 'Enter']},on:{"close":_vm.handleClose,"select":_vm.selectItem,"remove":_vm.unselectItem,"search-change":_vm.handleSearchChange},scopedSlots:_vm._u([{key:"beforeList",fn:function(ref){return [_c('div',{directives:[{name:"show",rawName:"v-show",value:(!_vm.queryString && _vm.options.length),expression:"!queryString && options.length"}]},[_c('div',{staticClass:"cds-multiselect__option multiselect__option mt-3",on:{"click":_vm.toggleSelectAll}},[_c('div',{staticClass:"option__checkbox"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selectAllValue),expression:"selectAllValue"}],ref:"select-all-ref",attrs:{"id":"select-all-input-id","type":"checkbox","name":"select-all-input-name"},domProps:{"value":true,"checked":Array.isArray(_vm.selectAllValue)?_vm._i(_vm.selectAllValue,true)>-1:(_vm.selectAllValue)},on:{"change":function($event){var $$a=_vm.selectAllValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=true,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.selectAllValue=$$a.concat([$$v]));}else {$$i>-1&&(_vm.selectAllValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else {_vm.selectAllValue=$$c;}}}}),_vm._v(" "),_c('label',{class:{
								'option__checkbox--checked': _vm.selectAllValue,
								'option__checkbox--indeterminate': _vm.indeterminate,
							},attrs:{"id":"select-all-label","for":"select-all-input-name"},on:{"click":function($event){$event.stopPropagation();return _vm.toggleSelectAll($event)}}})]),_vm._v("\n\t\t\t\t\t"+_vm._s(_vm.selectAllFancyMessage)+"\n\t\t\t\t")]),_vm._v(" "),(!_vm.isGroupMode)?_c('div',{staticClass:"mx-2 my-3"},[_c('hr',{staticClass:"my-0"})]):_vm._e()])]}},{key:"option",fn:function(ref){
							var option = ref.option;
return [(option.$isLabel)?_c('div',{staticClass:"cds-multiselect__group-label"},[_c('small',{staticClass:"font-weight-bold"},[_vm._v(_vm._s(option.$groupLabel))]),_vm._v(" "),_c('div',{staticClass:"flex-grow-1 ml-2"},[_c('hr',{staticClass:"mx-0"})])]):_c('div',{staticClass:"cds-multiselect__option"},[_c('div',{staticClass:"option__checkbox"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(option.isSelected),expression:"option.isSelected"}],attrs:{"type":"checkbox","id":("input-" + (option[_vm.label])),"name":("input-" + (option[_vm.label]))},domProps:{"value":true,"checked":Array.isArray(option.isSelected)?_vm._i(option.isSelected,true)>-1:(option.isSelected)},on:{"change":function($event){var $$a=option.isSelected,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=true,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.$set(option, "isSelected", $$a.concat([$$v])));}else {$$i>-1&&(_vm.$set(option, "isSelected", $$a.slice(0,$$i).concat($$a.slice($$i+1))));}}else {_vm.$set(option, "isSelected", $$c);}}}}),_vm._v(" "),_c('label',{class:{ 'option__checkbox--checked': option.isSelected },attrs:{"id":("checkbox-" + (option[_vm.label])),"for":("input-" + (option[_vm.label]))},on:{"click":function($event){return _vm.addItemViaCustomCheckbox(option)}}})]),_vm._v("\n\t\t\t\t"+_vm._s(option[_vm.label])+"\n\t\t\t")])]}},{key:"selection",fn:function(ref){
							var values = ref.values;
							var isOpen = ref.isOpen;
return [(values.length && !isOpen)?_c('span',{staticClass:"multiselect__single"},[_vm._v("\n\t\t\t\t"+_vm._s(_vm.selectedFancyMessage(values.length))+"\n\t\t\t")]):_c('span')]}}]),model:{value:(_vm.selectedValue),callback:function ($$v) {_vm.selectedValue=$$v;},expression:"selectedValue"}},'multiselect',_vm.attrs,false),[_vm._v(" "),_vm._v(" "),_vm._v(" "),_c('template',{slot:"noResult"},[_vm._v("\n\t\t\tNenhum resultado encontrado para: \""),_c('strong',[_vm._v(_vm._s(_vm.queryString)+" ")]),_vm._v("\"\n\t\t")]),_vm._v(" "),_c('template',{slot:"noOptions"},[_vm._v("\n\t\t\tNão há nenhuma opção para ser exibida.\n\t\t")])],2)],1)};
var __vue_staticRenderFns__$o = [];

  /* style */
  var __vue_inject_styles__$o = function (inject) {
    if (!inject) { return }
    inject("data-v-502beb9a_0", { source: "fieldset[disabled] .multiselect{pointer-events:none}.multiselect__spinner{position:absolute;right:1px;top:1px;width:48px;height:35px;background:#fff;display:block}.multiselect__spinner:after,.multiselect__spinner:before{position:absolute;content:\"\";top:50%;left:50%;margin:-8px 0 0 -8px;width:16px;height:16px;border-radius:100%;border:2px solid transparent;border-top-color:#41b883;box-shadow:0 0 0 1px transparent}.multiselect__spinner:before{animation:spinning 2.4s cubic-bezier(.41,.26,.2,.62);animation-iteration-count:infinite}.multiselect__spinner:after{animation:spinning 2.4s cubic-bezier(.51,.09,.21,.8);animation-iteration-count:infinite}.multiselect__loading-enter-active,.multiselect__loading-leave-active{transition:opacity .4s ease-in-out;opacity:1}.multiselect__loading-enter,.multiselect__loading-leave-active{opacity:0}.multiselect,.multiselect__input,.multiselect__single{font-family:inherit;font-size:16px;-ms-touch-action:manipulation;touch-action:manipulation}.multiselect{box-sizing:content-box;display:block;position:relative;width:100%;min-height:40px;text-align:left;color:#35495e}.multiselect *{box-sizing:border-box}.multiselect:focus{outline:0}.multiselect--disabled{background:#ededed;pointer-events:none;opacity:.6}.multiselect--active{z-index:50}.multiselect--active:not(.multiselect--above) .multiselect__current,.multiselect--active:not(.multiselect--above) .multiselect__input,.multiselect--active:not(.multiselect--above) .multiselect__tags{border-bottom-left-radius:0;border-bottom-right-radius:0}.multiselect--active .multiselect__select{transform:rotate(180deg)}.multiselect--above.multiselect--active .multiselect__current,.multiselect--above.multiselect--active .multiselect__input,.multiselect--above.multiselect--active .multiselect__tags{border-top-left-radius:0;border-top-right-radius:0}.multiselect__input,.multiselect__single{position:relative;display:inline-block;min-height:20px;line-height:20px;border:none;border-radius:5px;background:#fff;padding:0 0 0 5px;width:100%;transition:border .1s ease;box-sizing:border-box;margin-bottom:8px;vertical-align:top}.multiselect__input:-ms-input-placeholder{color:#35495e}.multiselect__input::placeholder{color:#35495e}.multiselect__tag~.multiselect__input,.multiselect__tag~.multiselect__single{width:auto}.multiselect__input:hover,.multiselect__single:hover{border-color:#cfcfcf}.multiselect__input:focus,.multiselect__single:focus{border-color:#a8a8a8;outline:0}.multiselect__single{padding-left:5px;margin-bottom:8px}.multiselect__tags-wrap{display:inline}.multiselect__tags{min-height:40px;display:block;padding:8px 40px 0 8px;border-radius:5px;border:1px solid #e8e8e8;background:#fff;font-size:14px}.multiselect__tag{position:relative;display:inline-block;padding:4px 26px 4px 10px;border-radius:5px;margin-right:10px;color:#fff;line-height:1;background:#41b883;margin-bottom:5px;white-space:nowrap;overflow:hidden;max-width:100%;text-overflow:ellipsis}.multiselect__tag-icon{cursor:pointer;margin-left:7px;position:absolute;right:0;top:0;bottom:0;font-weight:700;font-style:normal;width:22px;text-align:center;line-height:22px;transition:all .2s ease;border-radius:5px}.multiselect__tag-icon:after{content:\"\\D7\";color:#266d4d;font-size:14px}.multiselect__tag-icon:focus,.multiselect__tag-icon:hover{background:#369a6e}.multiselect__tag-icon:focus:after,.multiselect__tag-icon:hover:after{color:#fff}.multiselect__current{min-height:40px;overflow:hidden;padding:8px 30px 0 12px;white-space:nowrap;border-radius:5px;border:1px solid #e8e8e8}.multiselect__current,.multiselect__select{line-height:16px;box-sizing:border-box;display:block;margin:0;text-decoration:none;cursor:pointer}.multiselect__select{position:absolute;width:40px;height:38px;right:1px;top:1px;padding:4px 8px;text-align:center;transition:transform .2s ease}.multiselect__select:before{position:relative;right:0;top:65%;color:#999;margin-top:4px;border-color:#999 transparent transparent;border-style:solid;border-width:5px 5px 0;content:\"\"}.multiselect__placeholder{color:#adadad;display:inline-block;margin-bottom:10px;padding-top:2px}.multiselect--active .multiselect__placeholder{display:none}.multiselect__content-wrapper{position:absolute;display:block;background:#fff;width:100%;max-height:240px;overflow:auto;border:1px solid #e8e8e8;border-top:none;border-bottom-left-radius:5px;border-bottom-right-radius:5px;z-index:50;-webkit-overflow-scrolling:touch}.multiselect__content{list-style:none;display:inline-block;padding:0;margin:0;min-width:100%;vertical-align:top}.multiselect--above .multiselect__content-wrapper{bottom:100%;border-bottom-left-radius:0;border-bottom-right-radius:0;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom:none;border-top:1px solid #e8e8e8}.multiselect__content::webkit-scrollbar{display:none}.multiselect__element{display:block}.multiselect__option{display:block;padding:12px;min-height:40px;line-height:16px;text-decoration:none;text-transform:none;vertical-align:middle;position:relative;cursor:pointer;white-space:nowrap}.multiselect__option:after{top:0;right:0;position:absolute;line-height:40px;padding-right:12px;padding-left:20px;font-size:13px}.multiselect__option--highlight{background:#41b883;outline:0;color:#fff}.multiselect__option--highlight:after{content:attr(data-select);background:#41b883;color:#fff}.multiselect__option--selected{background:#f3f3f3;color:#35495e;font-weight:700}.multiselect__option--selected:after{content:attr(data-selected);color:silver}.multiselect__option--selected.multiselect__option--highlight{background:#ff6a6a;color:#fff}.multiselect__option--selected.multiselect__option--highlight:after{background:#ff6a6a;content:attr(data-deselect);color:#fff}.multiselect--disabled .multiselect__current,.multiselect--disabled .multiselect__select{background:#ededed;color:#a6a6a6}.multiselect__option--disabled{background:#ededed!important;color:#a6a6a6!important;cursor:text;pointer-events:none}.multiselect__option--group{background:#ededed;color:#35495e}.multiselect__option--group.multiselect__option--highlight{background:#35495e;color:#fff}.multiselect__option--group.multiselect__option--highlight:after{background:#35495e}.multiselect__option--disabled.multiselect__option--highlight{background:#dedede}.multiselect__option--group-selected.multiselect__option--highlight{background:#ff6a6a;color:#fff}.multiselect__option--group-selected.multiselect__option--highlight:after{background:#ff6a6a;content:attr(data-deselect);color:#fff}.multiselect-enter-active,.multiselect-leave-active{transition:all .15s ease}.multiselect-enter,.multiselect-leave-active{opacity:0}.multiselect__strong{margin-bottom:8px;line-height:20px;display:inline-block;vertical-align:top}[dir=rtl] .multiselect{text-align:right}[dir=rtl] .multiselect__select{right:auto;left:1px}[dir=rtl] .multiselect__tags{padding:8px 8px 0 40px}[dir=rtl] .multiselect__content{text-align:right}[dir=rtl] .multiselect__option:after{right:auto;left:0}[dir=rtl] .multiselect__clear{right:auto;left:12px}[dir=rtl] .multiselect__spinner{right:auto;left:1px}@keyframes spinning{0%{transform:rotate(0)}to{transform:rotate(2turn)}}", map: undefined, media: undefined })
,inject("data-v-502beb9a_1", { source: "#cds-multiselect .multiselect__option--highlight{background:#eff5fb!important;outline:0!important;color:#36424e!important}#cds-multiselect .multiselect__option--disabled.multiselect__option--group{background:#fff!important;color:#abb8c4!important;text-transform:uppercase!important;border-bottom:none!important}#cds-multiselect input[type=checkbox]{visibility:hidden}#cds-multiselect .cds-multiselect__group-label,#cds-multiselect .cds-multiselect__option{display:flex;align-items:center}#cds-multiselect .cds-multiselect__group-label{font-size:14px!important;letter-spacing:.1px!important;font-weight:400}#cds-multiselect .option__checkbox{width:15px;position:relative;margin-right:24px;margin-left:-12px}#cds-multiselect .option__checkbox label{cursor:pointer;position:absolute;width:15px;height:15px;top:0;border-radius:4px;border:.5px solid #566676}#cds-multiselect .option__checkbox label:after{border:2px solid #fff;border-top:none;border-right:none;content:\"\";height:5px;left:3.1px;opacity:0;position:absolute;top:4.4px;transform:rotate(-45deg);width:8px;border-radius:.4px}#cds-multiselect .option__checkbox input[type=checkbox]:checked+label:after{-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\";filter:alpha(opacity=100);opacity:1}#cds-multiselect .option__checkbox input[type=checkbox]:indeterminate+label:after{-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\";filter:alpha(opacity=100);opacity:1;border-left:none;top:4px;width:9px;transform:rotate(0)}#cds-multiselect .option__checkbox--checked{background-color:#239f78!important;border:none!important}#cds-multiselect .option__checkbox--indeterminate{background-color:#239f78!important;border:none!important}#cds-multiselect .multiselect__tag{background:#eff5fb!important;color:#36424e!important;border:1px solid #abb8c4!important}#cds-multiselect .multiselect__tag-icon:after{color:#36424e!important}#cds-multiselect .multiselect__tag-icon:focus,#cds-multiselect .multiselect__tag-icon:hover{background:#fff!important;color:#29333d!important}#cds-multiselect .multiselect__tag-icon:focus:after,#cds-multiselect .multiselect__tag-icon:hover:after{color:#29333d!important}#cds-multiselect .multiselect__option--selected.multiselect__option--highlight{background:#eff5fb!important;color:#29333d}#cds-multiselect .multiselect__option--selected.multiselect__option--highlight:after{background:#eff5fb!important;color:#29333d!important}#cds-multiselect .multiselect__option--selected{background:#fff!important;color:#29333d!important;font-weight:500!important}#cds-multiselect .multiselect--disabled{background:0 0!important}#cds-multiselect .multiselect__placeholder{color:#475766!important}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$o = undefined;
  /* module identifier */
  var __vue_module_identifier__$o = undefined;
  /* functional template */
  var __vue_is_functional_template__$o = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$o = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$o, staticRenderFns: __vue_staticRenderFns__$o },
    __vue_inject_styles__$o,
    __vue_script__$o,
    __vue_scope_id__$o,
    __vue_is_functional_template__$o,
    __vue_module_identifier__$o,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$p = {
	props: {
		/**
		 * Representa o estado do componente. Quando 'false' o conteúdo não é mostrado
		 * e quando 'true' o conteúdo do container é exibido.
		 */
		value: {
			type: Boolean,
			default: false,
			required: true,
		},
		/**
		 * Título do item a ser expandido
		 */
		title: {
			type: String,
			default: 'Visualizar mais',
		},
	},

	data: function data() {
		return {
			internalValue: this.value,
		};
	},

	watch: {
		internalValue: function internalValue(newValue) {
			/**
			* Evento emitido quando o conteúdo do item é exibido ('true') ou ocultado ('false').
			* @event expanded
			* @type {Event}
			*/
			this.$emit('input', newValue);
		},

		value: function value(newValue) {
			this.internalValue = newValue;
		},
	},

	methods: {
		triggerExpanded: function triggerExpanded() {
			this.internalValue = !this.internalValue;
		},
	},
};

/* script */
var __vue_script__$p = script$p;

/* template */
var __vue_render__$p = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{attrs:{"id":"cds-collapsible-container"}},[_c('div',{staticClass:"cds-collapsible-container__item",on:{"click":_vm.triggerExpanded}},[_c('ion-icon',{class:_vm.internalValue ? 'cds-collapsible-container__icon--expanded' : 'cds-collapsible-container__icon--collapsed',attrs:{"name":"chevron-down-outline"}}),_vm._v(" "),_vm._t("title",[_c('span',{staticClass:"cds-collapsible-container__title"},[_vm._v("\n\t\t\t\t"+_vm._s(_vm.title)+"\n\t\t\t")])])],2),_vm._v(" "),(_vm.internalValue)?_c('div',{staticClass:"cds-collapsible-container__content"},[_vm._t("default")],2):_vm._e()])};
var __vue_staticRenderFns__$p = [];

  /* style */
  var __vue_inject_styles__$p = function (inject) {
    if (!inject) { return }
    inject("data-v-c2bf605a_0", { source: ".cds-collapsible-container__item{font-size:12px!important;letter-spacing:.15px!important;font-weight:400;color:#475766;display:flex;align-items:start;cursor:pointer}.cds-collapsible-container__item hr{border-color:#475766!important}.cds-collapsible-container__title{font-weight:700}.cds-collapsible-container__icon--collapsed,.cds-collapsible-container__icon--expanded{color:#475766;margin:0 8px 0 0;transition:all .25s ease-in-out}.cds-collapsible-container__icon--expanded{transform:rotate(180deg)}ion-icon{visibility:visible!important;font-size:18px!important}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$p = undefined;
  /* module identifier */
  var __vue_module_identifier__$p = undefined;
  /* functional template */
  var __vue_is_functional_template__$p = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$p = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$p, staticRenderFns: __vue_staticRenderFns__$p },
    __vue_inject_styles__$p,
    __vue_script__$p,
    __vue_scope_id__$p,
    __vue_is_functional_template__$p,
    __vue_module_identifier__$p,
    false,
    createInjector,
    undefined,
    undefined
  );

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
	__proto__: null,
	ProgressBar: __vue_component__,
	ActionsList: __vue_component__$1,
	RadioButtonGroup: __vue_component__$2,
	Timeline: __vue_component__$3,
	NavBar: __vue_component__$4,
	Popover: __vue_component__$5,
	SideSheet: __vue_component__$6,
	DropDown: __vue_component__$7,
	EmptyState: __vue_component__$8,
	Badge: __vue_component__$9,
	UploadInput: __vue_component__$a,
	Stepper: __vue_component__$b,
	ProgressCircular: __vue_component__$c,
	AlertCard: __vue_component__$d,
	StepperInput: __vue_component__$e,
	PanelCard: __vue_component__$f,
	ExpansionCard: __vue_component__$g,
	Highlight: __vue_component__$h,
	Scrollable: __vue_component__$i,
	Calendar: __vue_component__$j,
	FilterPill: __vue_component__$k,
	Slider: __vue_component__$l,
	Tooltip: __vue_component__$m,
	ToggleSwitch: __vue_component__$n,
	ClusteredMultiselect: __vue_component__$o,
	CollapsibleContainer: __vue_component__$p
});

// install function executed by Vue.use()
function install(Vue) {
	if (install.installed) { return; }

	install.installed = true;

	Vue.component('vueSlider', vueSlider);

	Object.defineProperty(Vue.prototype, '_', { value: _$1 });

	Object.keys(components).forEach(function (componentName) {
		Vue.component(
			("cds-" + (componentName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase())),
			components[componentName]
		);
	});
}

// Create module definition for Vue.use()
var plugin = {
	install: install,
};

// To auto-install when vue is found
/* global window global */
var GlobalVue = null;

if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}

if (GlobalVue) {
	GlobalVue.use(plugin);

	GlobalVue.use(VCalendar, {
		locales: {
			'pt-BR': {
				firstDayOfWeek: 1,
				masks: {
					L: 'YYYY-MM-DD',
				},
			},
		},
	});
}

export default plugin;
export { __vue_component__$1 as ActionsList, __vue_component__$d as AlertCard, __vue_component__$9 as Badge, __vue_component__$j as Calendar, __vue_component__$o as ClusteredMultiselect, __vue_component__$p as CollapsibleContainer, __vue_component__$7 as DropDown, __vue_component__$8 as EmptyState, __vue_component__$g as ExpansionCard, __vue_component__$k as FilterPill, __vue_component__$h as Highlight, __vue_component__$4 as NavBar, __vue_component__$f as PanelCard, __vue_component__$5 as Popover, __vue_component__ as ProgressBar, __vue_component__$c as ProgressCircular, __vue_component__$2 as RadioButtonGroup, __vue_component__$i as Scrollable, __vue_component__$6 as SideSheet, __vue_component__$l as Slider, __vue_component__$b as Stepper, __vue_component__$e as StepperInput, __vue_component__$3 as Timeline, __vue_component__$n as ToggleSwitch, __vue_component__$m as Tooltip, __vue_component__$a as UploadInput };
