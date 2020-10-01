<template>
	<b-nav
		class="px-2"
		:class="oldSchool ? 'bg-cs' : 'bg-liga'"
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
			class="mr-4 mt-2"
			menu-class="py-1"
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
					link-class="py-2"
					class="py-1"
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
</template>

<script>
export default {
	props: {
		items: {
			type: Array,
			default: () => [],
			description: 'A list of the menu itens to be displayed',
			required: true,
		},
		oldSchool: {
			type: Boolean,
			default: true,
			description: 'Defines the style of the menu. The new one is light themed and the old one follows the style used by the "Cidade Saudável"',
		},
		activeItem: {
			type: Object,
			default: () => {},
			description: 'The currently active menu item',
			required: true,
		},
	},

	data() {
		return {
			internalActiveItem: this.activeItem,
			internalActiveParent: this.activeItem,
		}
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
							(item) => item.path === this.activeItem.path
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
			this.$emit('click', this.internalActiveItem);
		},

		isActive(item) {
			return Object.keys(this.internalActiveItem).length > 0
				? this.internalActiveItem.path === item.path
				: false;
		},

		getElementKey(item, index, subitem = false) {
			return `${item.label.replace(/\s/g, '')}${index}${ subitem ? '-subitem' : ''}`;
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
			let accClass = this.oldSchool ? 'cs-mode' : 'liga-mode';

			if (
				this.isDropdown(item)
				&& this.internalActiveParent
				&& this.internalActiveParent.path === item.path
			) {
				accClass = `${accClass} active-parent`;
			}
			return accClass;
		},
	},
};
</script>
<style>
	a {
		outline: none;
	}

	.cs-mode .nav-link:hover, .cs-mode .dropdown-item:hover {
		color: rgb(255, 255, 255);
	}

	.cs-mode .dropdown-item:hover {
		background: transparent;
	}

	.cs-mode .active, .cs-mode.active-parent {
		border-bottom: 4px solid rgb(58, 223, 124);
		background: rgb(90, 90, 90);
		border-radius: 4px  4px 0px 0px;
	}

	.cs-mode.active-parent.show {
		border-bottom: 4px solid transparent;
	}

	.cs-mode .dropdown-item.active {
		border-left: 4px solid rgb(58, 223, 124);
		border-bottom: 0px;
		background: rgb(90, 90, 90);
		border-radius: 0px;
	}

	.bg-liga {
		background: linear-gradient(0.93deg, #FFFFFF 16.45%, #F1F5FB 105.67%);
	}

	.bg-liga .dropdown-menu {
		background: #fff;
	}

	.bg-cs, .bg-cs .dropdown-menu {
		background: rgb(68, 68, 68);
	}

	.cs-mode .nav-link.active,
	.cs-mode .dropdown-item.active,
	.cs-mode.active-parent
	.dropdown-toggle {
		color: rgb(255, 255, 255);
	}

	.cs-mode .nav-link, .cs-mode .dropdown-item {
		color: rgb(208, 210, 213);
	}

	.liga-mode .active, .liga-mode.active-parent {
		border-bottom: 4px solid rgb(40, 90, 185);
		background: rgba(40, 90, 185, 0.05);
		border-radius: 4px  4px 0px 0px;
	}

	.liga-mode.active-parent.show {
		border-bottom: 4px solid transparent;
	}

	.liga-mode .nav-link.active,
	.liga-mode .dropdown-item.active,
	.liga-mode.active-parent
	.dropdown-toggle {
		color: rgb(20, 32, 50);
	}

	.liga-mode .nav-link, .liga-mode .dropdown-item {
		color: rgb(106, 117, 128);
	}

	.liga-mode .nav-link:hover, .liga-mode .dropdown-item:hover {
		color: rgb(20, 32, 50);
		background: transparent;
	}

	.bg-liga .dropdown-menu {
		background: #fff;
		box-shadow: 2px 2px 4px rgba(58, 67, 81, 0.16);
		border-radius: 2px;
	}

	.liga-mode .dropdown-item.active {
		border-left: 4px solid rgb(40, 90, 185);
		border-bottom: 0px;
		background: rgba(40, 90, 185, 0.05);
		border-radius: 0px;
	}

	.dropdown-item:active {
		background: inherit;
	}

	.dropdown-menu {
		margin-top: 4px;
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
