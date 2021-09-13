<template>
	<span id="nav-bar">
		<b-nav
			:class="isLightThemed ? 'nav-bar--light' : 'nav-bar--dark'"
		>
			<component
				v-for="(item, i) in computedItems"
				:is="dropdownOrSingleItem(item)"
				:class="getClass(item)"
				:id="getElementKey(item, i)"
				:key="getElementKey(item, i)"
				:text="item.label"
				:active="isActive(item)"
				:to="{name: item.path}"
				class="nav-bar__item-container"
				@click="handleClick(item)"
			>
				<template
					v-if="isDropdown(item)"
				>
					<b-dropdown-item
						v-for="(subitem, j) in item.items"
						:id="getElementKey(subitem, j, true)"
						:key="getElementKey(subitem, j, true)"
						:active="isActive(subitem)"
						:to="{name: item.path}"
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
export default {
	props: {
		/**
		 * A lista dos itens do NavBar a serem mostrados
		 */
		items: {
			type: Array,
			default: () => ([]),
			required: true,
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
	},

	data() {
		return {
			internalActiveItem: this.activeItem,
			internalActiveParent: this.activeItem,
		};
	},

	computed: {
		computedItems() {
			return this.items.map((item) => {
				const customItem = item;
				if (this.isDropdown(item)) {
					customItem.items = item.items.map((subitem) => ({
						parent: _.clone(item),
						...subitem,
					}));
				}

				return customItem;
			});
		},
	},

	watch: {
		computedItems: {
			handler(newValue) {
				const filtered = newValue.filter((item) => item === this.activeItem);

				if (filtered.length) {
					[this.internalActiveItem] = filtered;
					this.internalActiveParent = this.internalActiveItem;
				} else {
					const subitems = _.flatten(
						newValue
							.filter((item) => !!item.items)
							.map(({ items }) => items),
					);
					if (subitems.length) {
						[this.internalActiveItem] = subitems.filter(
							(item) => item.path === this.activeItem.path,
						);

						this.internalActiveParent = this.internalActiveItem.parent;
					}
				}
			},
			immediate: true,
		},
	},

	methods: {
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

		isActive(item) {
			return Object.keys(this.internalActiveItem).length > 0
				? this.internalActiveItem.path === item.path
				: false;
		},

		getElementKey(item, index, subitem = false) {
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
			let accClass = this.isLightThemed ? 'nav-bar__item--light' : 'nav-bar__item--dark';

			if (
				this.isDropdown(item)
				&& this.internalActiveParent
				&& this.internalActiveParent.path === item.path
				&& this.internalActiveParent.label === item.label
			) {
				accClass = `${accClass} active-parent`;
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

#nav-bar .nav-bar {
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

#nav-bar .nav-bar__item {
	margin: mTRBL(2, 6, 0, 0);

	&-container {
		margin: mTRBL(2, 6, 0, 0);
	}

	&--dark {
		@extend .nav-bar__item;

		.active {
			color: $n-0;
			border-bottom: 4px solid $gp-400;
			background: $n-50;
			border-radius: 4px  4px 0px 0px;
		}

		&.active-parent{
			color: $n-0;
			border-bottom: 4px solid $gp-400;
			background: $n-50;
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
				border-left: 4px solid $gp-400;
				border-bottom: 0px;
				background: $n-600;
				border-radius: 0px;
			}
		}
	}

	&--light {
		@extend .nav-bar__item;

		.active {
			color: $n-800 !important;
			border-bottom: 4px solid $bn-500;
			background: $n-20;
			border-radius: 4px  4px 0px 0px;
		}

		&.active-parent{
			color: $n-800 !important;
			border-bottom: 4px solid $bn-500;
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
				border-left: 4px solid $bn-500;
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
