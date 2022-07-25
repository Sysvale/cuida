<template>
	<span
		id="cds-nav-bar"
		class="cds-nav-bar"
	>
		<b-nav
			:class="isLightThemed ? 'cds-nav-bar--light' : 'cds-nav-bar--dark'"
			:style="activeBorderStyle"
			@contextmenu.prevent="(event) => handleRightClick(event, null)"
		>
			<component
				v-for="(item, i) in computedItems"
				:is="dropdownOrSingleItem(item)"
				:id="getElementKey(item, i)"
				:key="getElementKey(item, i)"
				:class="getClass(item)"
				:text="item.label"
				:active="isActive(item)"
				:to="routerPushTo(item)"
				class="cds-nav-bar__item-container"
				@click.stop="handleClick(item)"
				@contextmenu.stop="(event) => handleRightClick(event, item)"
			>
				<template
					v-if="isDropdown(item)"
				>
					<b-dropdown-item
						v-for="(subitem, j) in item.items"
						:id="getElementKey(subitem, j, true)"
						:key="getElementKey(subitem, j, true)"
						:active="isActive(subitem)"
						:to="routerPushTo(item)"
						@click.stop="handleClick(subitem, item)"
					>
						{{ subitem.label }}
					</b-dropdown-item>
				</template>
				<template
					v-else
				>
					{{ item.label }}
				</template>
			</component>
		</b-nav>
	</span>
</template>

<script>
import { colorOptions, colorHexCode } from '../utils/constants/colors';

export default {
	props: {
		/**
		 * Define a lista dos itens do NavBar a serem mostrados.
		 * Os itens da lista devem ser objetos com `path` ou `route`, e com uma `label`
		 */
		items: {
			type: Array,
			default: () => ([]),
			required: true,
			validator: (values) => {
				const invalidValues = values.filter((value) => {
					const hasNotRoute = _.isEmpty(value.path) && _.isEmpty(value.route);
					const hasInvalidItems = _.isEmpty(value.items)
						|| value.items.filter(item => (_.isEmpty(item.path) && _.isEmpty(item.route))).length;
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
			default: () => ({}),
			required: true,
		},
		/**
		 * Cor da borda que indica o item ativo na NavBar.
		 * Existem algumas cores predefinidas seguindo os guias do Cuida, são elas: 
		 * `turquoise`, `green`, `blue`, `violet`, `pink`, `red`, `orange`, `amber` e `gray`.
		 * É possível ainda definir uma cor pela seu hexadecimal (ex.: `#DDE2E7`).
		 */
		activeColor: {
			type: String,
			default: null,
			validator: (value) => {
				const matchHexColor = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/g;
				return colorOptions.includes(value) || matchHexColor.test(value);
			},
		},
	},

	data() {
		return {
			internalActiveItem: this.activeItem,
			internalActiveParent: this.activeItem,
			colorOptions,
		};
	},

	computed: {
		computedItems() {
			return this.items.map((item) => {
				const customItem = item;
				if (this.isDropdown(item)) {
					customItem.items = item.items.map(subitem => ({
						parent: _.clone(item),
						...subitem,
					}));
				}

				return customItem;
			});
		},

		activeBorderStyle() {
			if (!this.activeColor) {
				return {
					'--activeBorderColor': this.isLightThemed
						? '#206ED9' // $bn-500
						: '#2AC092' // $gp-400
				};
			}
			const presetColor = this.colorOptions.includes(this.activeColor);
			const borderColor = presetColor ? this.colorHexCode(this.activeColor) : this.activeColor;
			return {
				'--activeBorderColor': borderColor,
			};
		},
	},

	watch: {
		computedItems: {
			handler(newValue) {
				const filtered = newValue.filter(item => _.isEqual(item, this.activeItem));

				if (filtered.length) {
					[this.internalActiveItem] = filtered;
					this.internalActiveParent = this.internalActiveItem;
				} else {
					const subitems = _.flatten(
						newValue
							.filter(item => !!item.items)
							.map(({ items }) => items),
					);
					if (subitems.length) {
						[this.internalActiveItem] = subitems.filter(
							item => _.isEqual(this.resolveRoute(item), this.resolveRoute(this.activeItem)),
						);

						this.internalActiveParent = this.internalActiveItem.parent;
					}
				}
			},
			immediate: true,
		},
	},

	methods: {
		colorHexCode,

		handleClick(item, parent) {
			this.internalActiveItem = item;
			this.internalActiveParent = parent;
			/**
			 * Evento emitido quando um dos itens da NavBar é clicado
			* @event click
			* @type {Event}
				*/
			this.$emit('click', this.internalActiveItem);
		},

		handleRightClick(event, item) {
			/**
			 * Evento emitido quando um dos itens da NavBar é clicado com o botão direito
			* @event right-click
			* @type {Event}
				*/
			this.$emit('right-click', { event, item });
		},

		resolveRoute({ route, path }) {
			const to = !_.isEmpty(route) ? route : path;
			return to instanceof String ? { path: to } : to;
		},

		routerPushTo(item) {
			return this.resolveRoute(item) ? this.resolveRoute(item).path : null;
		},

		isActive(item) {
			return Object.keys(this.internalActiveItem).length > 0
				? _.isEqual(this.resolveRoute(this.internalActiveItem), this.resolveRoute(item))
				: false;
		},

		getElementKey(item, index, subitem = false) {
			if (!item.label) return;

			return `${item.label.replace(/\s/g, '')}${index}${subitem ? '-subitem' : ''}`;
		},

		isSubitem(item) {
			return !!item.parent;
		},

		isDropdown(item) {
			return !!item.items;
		},

		dropdownOrSingleItem(item) {
			if (this.isDropdown(item)) return 'b-nav-item-dropdown';
			return 'b-nav-item';
		},

		getClass(item) {
			const accClass = this.isLightThemed ? 'cds-nav-bar__item--light' : 'cds-nav-bar__item--dark';

			if (
				this.isDropdown(item)
				&& this.internalActiveParent
				&& _.isEqual(this.resolveRoute(this.internalActiveParent), this.resolveRoute(item))
				&& this.internalActiveParent.label === item.label
			) {
				return `${accClass} active-parent`;
			}
			return accClass;
		},
	},
};
</script>

<style lang="scss">
@import '../assets/sass/app.scss';

a {
	outline: none;
}

#cds-nav-bar .cds-nav-bar {
	padding: 8px 0;

	&--dark {
		background: $n-700;

		.dropdown-menu {
			background: $n-700;
		}
	}

	&--light {
		background: linear-gradient(0.93deg, $n-0 16.45%, $n-20 105.67%);

		.dropdown-menu {
			background: $n-0;
			box-shadow: 2px 2px 4px $n-50;
			border-radius: 2px;
		}
	}
}

#cds-nav-bar .cds-nav-bar__item {
	margin: mTRBL(2, 6, 0, 0);

	&-container {
		margin: mTRBL(2, 6, 0, 0);
	}

	&--dark {
		@extend .cds-nav-bar__item;

		.active {
			color: $n-0;
			border-bottom: 4px solid var(--activeBorderColor);
			background: $n-500;
			border-radius: 4px  4px 0px 0px;
		}

		&.active-parent{
			color: $n-0;
			border-bottom: 4px solid var(--activeBorderColor);
			background: $n-500;
			border-radius: 4px  4px 0px 0px;

			.show {
				border-bottom: 4px solid transparent;
			}

			.dropdown-toggle {
				color: $n-0;
			}
		}

		.nav-link {
			color: $n-40;

			&:hover {
				color: $n-0;
			}

			&.active {
				color: $n-0;
			}
		}

		.dropdown-item {
			color: $n-40;

			&:hover {
				color: $n-0;
				background: transparent;
			}

			&.active {
				color: $n-0;
				border-left: 4px solid var(--activeBorderColor);
				border-bottom: 0px;
				background: $n-600;
				border-radius: 0px;
			}
		}
	}

	&--light {
		@extend .cds-nav-bar__item;

		.active {
			color: $n-800 !important;
			border-bottom: 4px solid var(--activeBorderColor);
			background: $n-20;
			border-radius: 4px  4px 0px 0px;
		}

		&.active-parent{
			color: $n-800 !important;
			border-bottom: 4px solid var(--activeBorderColor);
			background: $n-20;
			border-radius: 4px  4px 0px 0px;

			.show {
				border-bottom: 4px solid transparent;
			}

			.dropdown-toggle {
				color: $n-800;
			}
		}

		.nav-link {
			color: $n-600;

			&:hover {
				color: $n-800;
				background: transparent;
			}

			.active {
				color: $n-800;
			}
		}

		.dropdown-item {
			color: $n-600;

			&:hover {
				color: $n-800;
				background: transparent;
			}

			&.active {
				border-left: 4px solid var(--activeBorderColor);
				border-bottom: 0px;
				background: $n-20 !important;
				border-radius: 0px;
			}
		}
	}
}

.dropdown-item:active {
	background: inherit;
}

.dropdown-item {
	padding: pTRBL(3, 0, 3 , 7);
}

.dropdown-menu {
	margin: mt(1);
	border: 0;
	border-radius: 0;
}

.dropdown-toggle[aria-expanded="true"]:after {
	transform: rotate(180deg);
}

.dropdown-toggle:after {
	transition: all 0.4s ease;
}
</style>
