<template>
	<div
		id="nav-bar"
	>
		<ul
			:class="{'nav-bar__container': items.length >= 1}"
		>
			<li
				v-for="(item, index) in items"
				:key="`${index}-${item.name}-item`"
				role="presentation"
				class="nav-bar__item-container"
				:class="isActive(item) ? 'nav-bar__item-container--active' : 'nav-bar__item-container--inactive'"
			>
				<router-link
					:to="routerPushTo(item)"
					class="nav-bar__item"
					:class="isActive(item) ? 'nav-bar__item--active' : 'nav-bar__item--inactive'"
					@click="(event) => handleClick(event, item)"
				>
					{{ item.label }}
				</router-link>

				<div
					:class="indicatorClass(item)"
					:style="activeBorderStyle"
				/>
			</li>
		</ul>
	</div>
</template>

<script>
import isEqual from 'lodash.isequal';
import isEmpty from 'lodash.isempty';

import { colorOptions, colorHexCode } from '../utils/constants/colors';

export default {
	props: {
		/**
		 * Define a lista dos itens do NavBar a serem
		 * mostrados. Os itens da lista devem ser
		 * objetos com path ou route, e com uma label
		 */
		items: {
			type: Array,
			default: () => ([]),
			required: true,
			validator: (values) => {
				const invalidValues = values.filter((value) => {
					const hasNotRoute = isEmpty(value.path) && isEmpty(value.route);
					const hasInvalidItems = isEmpty(value.items)
						|| value.items.filter(item => (isEmpty(item.path) && isEmpty(item.route))).length;
					return isEmpty(value.label) || (hasInvalidItems && hasNotRoute);
				});
				return !invalidValues.length;
			},
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
		 */
		variant: {
			type: String,
			default: 'green',
			validator: (value) => {
				return colorOptions.includes(value);
			},
		},
	},

	data() {
		return {
			internalActiveItem: this.activeItem,
			colorOptions,
		};
	},

	computed: {
		activeBorderStyle() {
			return {
				'--indicatorColor': this.colorHexCode(this.variant),
			};
		},
	},

	watch: {
		items: {
			handler(newValue) {
				const filtered = newValue.filter(item => item.name === this.activeItem.name);
				[this.internalActiveItem] = filtered.length ? filtered : newValue;
			},
			immediate: true,
		},
	},

	mounted() {
		this.internalActiveItem = this.activeItem;
	},

	methods: {
		colorHexCode,

		handleClick(event, item) {
			this.internalActiveItem = item;
			/**
			 * Evento emitido quando um dos itens da NavBar é clicado
			* @event navbar-click
			* @type {Event}
			*/
			this.$emit('navbar-click', this.internalActiveItem);
		},

		isActive(item) {
			return isEqual(this.internalActiveItem, item);
		},

		resolveRoute({ route, path }) {
			const to = isEmpty(route) ? path : route;
			return to instanceof String ? { path: to } : to;
		},

		routerPushTo(item) {
			return this.resolveRoute(item) ? this.resolveRoute(item).path : null;
		},

		indicatorClass(item) {
			return this.isActive(item) ? `item__indicator--active--${this.variant}` : '';
		},
	},
};
</script>

<style lang="scss">
@use 'sass:color';
@use '../assets/sass/tokens/index' as tokens;

#nav-bar {
	.nav-bar {
		&__container {
			display: flex;
			flex-wrap: wrap;
			padding: tokens.pTRBL(2, 2, 0, 2);
			margin: tokens.mb(0);
			list-style: none;
			border-bottom: 1px solid tokens.$n-40;
			background-color: color.adjust(tokens.$appbar-color, $lightness: -5%);
		}

		&__item-container {
			margin: tokens.mx(2);

			&--active {
				background-color: tokens.$appbar-color;
				border-radius: tokens.$border-radius-button;
				cursor: default;
				color: tokens.$n-10;
			}
		}

		&__item {
			@include tokens.caption;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			text-align: center;
			text-decoration: none !important;
			padding: tokens.pYX(2, 3);
			cursor: pointer;

			&--active {
				cursor: default;
				color: tokens.$n-10;
			}

			&--active:hover {
				color: tokens.$n-0;
			}

			&--inactive {
				color: tokens.$n-100;
			}

			&--inactive:hover {
				color: tokens.$n-40;
			}
		}
	}

	.item__indicator--active {
		@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			height: 4px;
			width: 100%;
			background-color: $base-color;
			transition: all 0.3s ease-out;
		}
	}
}
</style>
