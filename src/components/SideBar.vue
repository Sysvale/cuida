<template>
	<div
		:class="mainClass"
	>
		<div :class="`variant-resolver--${variant}`">
			<div class="side-bar__header">
				<div
					class="side-bar__logo"
					@click="handleLogoClick"
				>
					<slot
						v-if="!collapsed"
						name="logo"
					>
						<img :src="logoImage">
					</slot>
				</div>

				<div
					v-if="collapsible"
					v-cdstip="collapsedTooltipClass"
					class="side-bar__collapsible"
					@click="handleCollapse"
				>
					<cds-icon
						v-if="!collapsed"
						name="sidebar-collapse-outline"
					/>

					<cds-icon
						v-else
						name="sidebar-expand-outline"
					/>
				</div>
			</div>

			<div
				v-if="searchButton"
				class="side-bar__search-button"
				:class="{'side-bar__search-button--light': light}"
				@click="$emit('search-button-click')"
			>
				<div
					class="search-button__text-container"
				>
					<cds-icon
						height="20"
						width="20"
						name="search-outline"
					/>
					<span v-if="showSearchButtonShortCut">Busca</span>
				</div>

				<span
					v-if="showSearchButtonShortCut"
					class="side-bar__search-shortcut"
					:class="{'side-bar__search-shortcut--light': light}"
				>
					Ctrl + K
				</span>
			</div>

			<ul
				:class="{'side-bar__container': items.length >= 1}"
			>
				<li
					v-for="(item, index) in items"
					:key="`${index}-${item.name}-item`"
					role="presentation"
					@mouseleave="itemsWithVisibilityController[index].show = false"
				>
					<div
						class="side-bar__item-container"
						:class="isActive(item) ? 'side-bar__item-container--active' : 'side-bar__item-container--inactive'"
						@click="(event) => handleClick(event, item)"
					>
						<div
							v-if="!!item.items || item.type === 'link'"
							:id="item.label"
							v-cdstip="(collapsed && item.type === 'link') ? item.label : null"
							class="side-bar__item"
							:class="isActive(item) ? 'side-bar__item--active' : 'side-bar__item--inactive'"
							@mouseover="itemsWithVisibilityController[index].show = true"
						>
							<div>
								<cds-icon
									:name="item.icon"
									width="20"
									height="20"
								/>
								<span>{{ item.label }}</span>
							</div>

							<cds-icon
								v-if="!!item.items && item.items.length > 0"
								:key="expandItemControl"
								:name="resolveCollapsibleItemIcon(item)"
								:class="{'item__caret': isActive(item)}"
								width="16"
								height="16"
							/>
						</div>

						<router-link
							v-else
							v-cdstip="collapsed ? item.label : null"
							:to="routerPushTo(item)"
							class="side-bar__item"
							:class="isActive(item) ? 'side-bar__item--active' : 'side-bar__item--inactive'"
							@click="(event) => handleClick(event, item)"
						>
							<div>
								<cds-icon
									:name="item.icon"
									width="20"
									height="20"
								/>
								<span>{{ item.label }}</span>
							</div>
						</router-link>
					</div>

					<Transition
						v-if="!collapsed"
						name="collapse"
					>
						<div
							v-show="resolveItemCollapse(item)"
							class="side-bar__subitem-container"
						>
							<div
								class="side-bar__subitems"
							>
								<a
									v-for="(subitem, idx) in item.items"
									:key="`${idx}-${subitem.name}-item`"
									class="side-bar__subitem"
									:class="isActive(subitem) && (subitem?.type !== 'external') ? 'side-bar__subitem--active' : 'side-bar__subitem--inactive'"
									:href="subitem?.type === 'external' ? subitem.route.path : 'javascript:void(0)'"
									:target="subitem?.type === 'external' ? '_blank' : '_self'"
									rel="noopener noreferrer"
									@click="(event) => handleClick(event, subitem)"
								>
									<div
										v-if="subitem?.type === 'external'"
										class="side-bar__subitem-link"
									>
										{{ subitem.label }}

										<cds-icon
											height="16"
											width="16"
											name="open-in-new-tab-outline"
										/>
									</div>
									<router-link
										v-else
										class="side-bar__subitem-link"
										:to="routerPushTo(subitem)"
									>
										{{ subitem.label }}
									</router-link>
								</a>
							</div>
						</div>
					</Transition>
					<div v-if="item.items && collapsed">
						<cds-rich-tooltip
							v-model="itemsWithVisibilityController[index].show"
							:target-id="item.label"
							default-placement="bottom-start"
							width="160"
						>
							<div
								class="side-bar__subitems--collapsed"
							>
								<p class="side-bar__tooltip-title">
									{{ item.label }}
								</p>
								<a
									v-for="(subitem, idx) in item.items"
									:key="`${idx}-${subitem.name}-item`"
									class="side-bar__subitem"
									:href="subitem?.type === 'external' ? subitem.route.path : 'javascript:void(0)'"
									target="_blank"
									rel="noopener noreferrer"
									@click="(event) => handleClick(event, subitem)"
								>
									<div
										v-if="subitem?.type === 'external'"
										class="side-bar__subitem-link"
									>
										{{ subitem.label }}

										<cds-icon
											height="16"
											width="16"
											name="open-in-new-tab-outline"
										/>
									</div>
									<router-link
										v-else
										class="side-bar__subitem-link"
										:to="routerPushTo(subitem)"
									>
										{{ subitem.label }}
									</router-link>
								</a>
							</div>
						</cds-rich-tooltip>
					</div>
				</li>
			</ul>
		</div>

		<div
			:class="`side-bar__footer variant-resolver--${variant}`"
		>
			<div
				id="menu-profile"
				class="side-bar__avatar"
				@click.stop="showPopover = !showPopover"
			>
				<cds-avatar
					:src="userPicture"
					:name="userName"
					variant="white"
					size="lg"
				/>

				<Transition
					name="fade"
				>
					<div
						v-if="!collapsed"
					>
						<p>{{ userName }}</p>
						<p>{{ userRole }}</p>
					</div>
				</Transition>
			</div>

			<ul>
				<li
					v-if="showLogout"
					v-cdstip="logoutTooltipText"
					class="side-bar__logout-button"
					@click="$emit('logout', true)"
				>
					<cds-icon
						name="logout-outline"
						width="20"
						height="20"
					/>
				</li>
			</ul>
			<div v-if="shouldShowProfileMenu">
				<cds-popover
					v-model="showPopover"
					right-aligned
					target-id="menu-profile"
					width="160"
					height="160"
				>
					<div class="dropdown-button__dropdown">
						<div
							v-for="(item, index) in profileMenuItems"
							:key="index"
						>
							<div
								class="dropdown__container"
								@click="handleProfileMenuOptionClick(item)"
							>
								<cds-icon
									class="dropdown__icon"
									height="22"
									width="22"
									:name="item.icon"
								/>
								<span class="dropdown__text">{{ item.name }}</span>
							</div>
						</div>
					</div>
				</cds-popover>
			</div>
		</div>
	</div>
</template>

<script>
import isEqual from 'lodash.isequal';
import isEmpty from 'lodash.isempty';
import CdsIcon from './Icon.vue';
import CdsPopover from './Popover.vue';
import CdsAvatar from './Avatar.vue';
import CdsRichTooltip from './RichTooltip.vue';
import Cdstip from '../utils/directives/cdstip';

import { colorOptions, colorHexCode } from '../utils/constants/colors';

export default {
	directives: {
		cdstip: Cdstip,
	},

	components: {
		CdsIcon,
		CdsAvatar,
		CdsRichTooltip,
		CdsPopover,
	},

	props: {
		/**
		* A variante de cor. São 10 variantes implementadas: 'green', 'teal',
		* 'blue', 'indigo', 'violet', 'pink', 'red', 'orange','amber' e 'white'.
		* A variante só terá efeito quando a SideBar estiver no modo light.
		*/
		variant: {
			type: String,
			default: 'green',
		},
		/**
		* Define a lista dos itens do SideBar a serem
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
		* O item ativo da SideBar
		*/
		activeItem: {
			type: Object,
			default: () => ({}),
			required: true,
		},
		/**
		* Controla exibição do botão "sair" no footer da sidebar
		*/
		showLogout: {
			type: Boolean,
			default: true,
		},
		/**
		* Controla exibição do menu/dropdown ao clicar nas informações de perfil
		*/
		showProfileMenu: {
			type: Boolean,
			default: false,
		},
		/**
		* Controla os itens do menu/dropdown exibidos ao clicar nas informações de perfil
		*/
		profileMenuItems: {
			type: Array,
			default: () => ([]),
		},
		/**
		* Nome do usuário logado. Essa informação é colocada ao lado do Avatar
		*/
		userName: {
			type: String,
			default: '',
		},
		/**
		* Perfil do usuário logado. Essa informação é colocada ao lado do Avatar
		*/
		userRole: {
			type: String,
			default: '',
		},
		/**
		* Imagem do usuário logado. Informação é usada para montar o Avatar
		*/
		userPicture: {
			type: String,
			default: null,
		},
		/**
		* Permite que a sidebar seja colapsada em uma versão mínima
		*/
		collapsible: {
			type: Boolean,
			default: false,
		},
		/**
		* Controla o estado da sidebar, se aberta ou colapsada.
		*/
		collapsibleState: {
			type: Boolean,
			default: false,
		},
		/**
		 * Imagem do logo que será renderizada
		*/
		logoImage: {
			type: String,
			default: null,
		},
		/**
		 * Ativa o modo light da sidebar
		*/
		light: {
			type: Boolean,
			default: false,
		},
		/**
		 * Ativa o modo light da sidebar
		*/
		searchButton: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			internalActiveItem: {},
			collapsed: false,
			showUncollapsedItems: true,
			colorOptions,
			expandItemControl: 0,
			itemsWithVisibilityController: [],
			logoutTooltipText: 'Sair',
			showPopover: false,
			showSearchButtonShortCut: true,
		};
	},

	computed: {
		mainClass() {
			if (this.light) {
				if (this.collapsed) {
					return 'side-bar--light--collapsed';
				}

				return 'side-bar--light';
			}

			if (this.collapsed) {
				return 'side-bar--dark--collapsed';
			}

			return 'side-bar--dark';
		},

		collapsedTooltipClass() {
			return this.collapsed ? 'Maximizar' : 'Minimizar';
		},

		shouldShowProfileMenu() {
			return this.showProfileMenu && this.profileMenuItems?.length > 0;
		},

		avatarCursorResolver() {
			return this.shouldShowProfileMenu ? 'pointer' : 'default';
		},

		computedSearchButtonJustify() {
			return this.collapsed ? 'center' : 'space-between'
		}
	},

	watch: {
		items: {
			handler(newValue) {
				const filtered = newValue.filter(item => item.name === this.activeItem.name);
				[this.internalActiveItem] = filtered.length ? filtered : newValue;
			},
			immediate: true,
		},

		collapsibleState: {
			handler(newValue) {
				this.collapsed = newValue;
			},
			immediate: true,
		},

		activeItem: {
			handler(newValue) {
				this.internalActiveItem = newValue;
			},
			immediate: true,
		},

		collapsed(newValue) {
			if (newValue) {
				this.showUncollapsedItems = false;
				this.showSearchButtonShortCut = false;
				return;
			}

			setTimeout(() => {
				this.showUncollapsedItems = true;
			}, 500);

			setTimeout(() => {
				this.showSearchButtonShortCut = true;
			}, 250);
		},
	},

	created() {
		this.internalActiveItem = this.activeItem;
		this.collapsed = this.collapsibleState;

		this.items.forEach((item, idx) => {
			this.itemsWithVisibilityController.push({
				name: item.label,
				index: idx,
				show: false,
			})
		});
	},

	methods: {
		colorHexCode,

		handleClick(event, item) {
			if (!isEqual(this.internalActiveItem, item)) {
				this.internalActiveItem = item;
				this.showUncollapsedItems = true;
				this.expandItemControl += 1;
				return;
			}

			if (!!item.items && item.items.length > 0) {
				this.showUncollapsedItems = !this.showUncollapsedItems;
				this.expandItemControl += 1;
				return;
			}

			if (item.icon) {
				this.showUncollapsedItems = false;
				this.expandItemControl += 1;
			}

			/**
			 * Evento emitido quando um dos itens da SideBar é clicado
			* @event sidebar-click
			* @type {Event}
			*/
			this.$emit('sidebar-click', this.internalActiveItem);
		},

		isActive(item) {
			let hasActiveSubitem = false;
			let hasActiveItem = false;

			if (!!item.items && item.items.length > 0) {
				hasActiveSubitem = item.items.some(item => {
					return isEqual(item, this.internalActiveItem)
				})
			}

			hasActiveItem = isEqual(this.internalActiveItem, item);
			return hasActiveSubitem || hasActiveItem;
		},

		resolveRoute({ route, path }) {
			const to = isEmpty(route) ? path : route;
			return to instanceof String ? { path: to } : to;
		},

		routerPushTo(item) {
			return this.resolveRoute(item) ? this.resolveRoute(item).path : null;
		},

		handleCollapse() {
			this.$emit('collapse-click', !this.collapsed);
			this.collapsed = !this.collapsed;
		},

		resolveItemCollapse(item) {
			return (!!item.items && item.items.length > 0)
				&& this.isActive(item)
				&& this.showUncollapsedItems;
		},

		resolveCollapsibleItemIcon(item) {
			return this.resolveItemCollapse(item)
				? 'caret-up-outline'
				: 'caret-down-outline';
		},

		handleProfileMenuOptionClick (actionName) {
			/**
			 * Evento emitido quando um dos itens do menu dropdown do perfil é clicado
			* @event profile-menu-option-click
			* @type {Event}
			*/
			this.$emit('profile-menu-option-click', actionName);
			this.showPopover = false
		},

		handleLogoClick() {
			/**
			 * Evento emitido quando um o logo da SideBar é clicado
			* @event logo-click
			* @type {Event}
			*/
			this.$emit('logo-click');
		},
	},
};
</script>

<style lang="scss">
@use '../assets/sass/tokens/index' as tokens;
.fade-enter-active {
	transition: opacity 0.5s ease;
}

.fade-enter-from {
	opacity: 0;
}

.collapse-enter-active,
.collapse-leave-active {
	transition: all 0.5s ease;
}

.collapse-enter-from,
.collapse-leave-to {
	transition: all 0.35s ease;
	opacity: 0;
	transform: translateY(-8px);
}

.side-bar--dark {
	background: #333B42;
	box-shadow: 0px 3.8957247734069824px 7.791449546813965px 0px rgba(16, 24, 64, 0.04);
	display: flex;
	flex-direction: column;
	height: 100vh;
	justify-content: space-between;
	padding: tokens.pTRBL(8, 3, 8, 3);
	width: 244px;
	transition: width 0.5s;

	.side-bar {
		&__tooltip-title {
			font-size: 16px;
			font-weight: 600;
			margin: tokens.my(2);
		}

		&__subitem {
			color: tokens.$n-100;
			cursor: pointer;
			padding: tokens.py(1);
			@include tokens.caption;

			&--active {
				color: tokens.$n-0;
				font-weight: 700;
			}

			&:hover {
				color: tokens.$n-0;
			}

			&-container {
				padding: tokens.pl(7);
				margin: tokens.mt(2);
				transition: all 0.35s ease;
			}

			&-link {
				width: 100%;
				display: block;
				display: flex;
				align-items: center;
				gap: tokens.spacer(2);
			}
		}


		&__subitems {
			border-left: 1px solid tokens.$n-300;
			display: flex;
			flex-direction: column;
			gap: tokens.spacer(4);
			padding: tokens.pTRBL(1, 0, 1, 4);

			&--collapsed {
				display: flex;
				flex-direction: column;
				gap: tokens.spacer(2);
				margin: tokens.ml(2);
			}
		}

		&__header {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: tokens.spacer(4);
			margin-bottom: 40px;
		}

		&__logo {
			display: flex;
			align-items: center;
			max-width: 144px;
			cursor: pointer;
		}

		&__logo > img {
			width: 100%;
		}

		&__container {
			display: flex;
			flex-direction: column;
			gap: tokens.spacer(3);
			list-style: none;
			transition: all 0.9s ease;
			padding: tokens.pa(0);
		}

		&__item-container {
			cursor: pointer !important;

			&--active {
				background-color: tokens.$n-600;
				border: 1px solid rgba(100, 115, 130, 0.50);
				border-radius: tokens.$border-radius-extra-small;
				color: tokens.$n-10;
				cursor: default;
				height: fit-content;
				padding: tokens.pTRBL(3, 4, 3, 4);
				transition: tokens.$interaction;
				width: 100%;
			}

			&--inactive {
				background-color: transparent;
				border: 1px solid transparent;
				border-radius: tokens.$border-radius-extra-small;
				padding: tokens.pTRBL(3, 4, 3, 4);
				transition: tokens.$opening;
			}
		}

		&__item > div{
			align-items: center;
			display: flex;
			gap: tokens.spacer(2);
		}

		&__item span {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		&__item {
			@include tokens.caption;
			align-items: center;
			cursor: pointer;
			display: flex;
			justify-content: space-between;
			overflow: hidden;
			text-overflow: ellipsis;
			text-align: center;
			text-decoration: none !important;

			&--active {
				color: tokens.$n-0;
				font-weight: 700;
			}

			&--active:hover {
				color: tokens.$n-0;
			}

			&--inactive {
				color: tokens.$n-10;
				height: fit-content;
			}

			&--inactive:hover {
				color: tokens.$n-0;
			}
		}

		&__logout-button {
			padding: tokens.pa(3);
			border-radius: tokens.$border-radius-small;
		}

		&__logout-button:hover {
			color: tokens.$n-0;
			background-color: #576169;
			outline: 1px solid rgba(#647382, 0.5);
			cursor: pointer;
		}

		&__footer {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: tokens.spacer(2);
			padding: tokens.pTRBL(2, 1, 2, 1);

			& > ul {
				margin: 0;
				padding: 0;

				& > li {
					align-items: center;
					color: tokens.$n-0;
					display: flex;
					gap: tokens.spacer(2);
				}
			}
		}

		&__avatar {
			align-items: center;
			display: flex;
			gap: tokens.spacer(3);
			cursor: v-bind(avatarCursorResolver);
		}

		&__avatar > div > p:nth-child(1) {
			@include tokens.body-2;
			color: tokens.$n-0;
			font-weight: tokens.$font-weight-bold;
			margin: tokens.mb(0);
		}

		&__avatar > div > p:nth-child(2) {
			@include tokens.caption;
			color: tokens.$n-0;
			margin: 0;
		}

		/* Necessário para que o avatar fique com o cursor pointer sem que seja
			exibido a ação de popover "nativa" do componente quando passada pra ele a prop clickable */
		&__avatar > #avatar-dropdown {
			cursor: v-bind(avatarCursorResolver)!important;
		}

		&__collapsible {
			padding: tokens.pa(3);
			cursor: pointer;
			border-radius: tokens.$border-radius-extra-small;
			width: 42px;
			height: 42px;
			color: tokens.$n-0;

			&:hover {
				background-color: #576169;
				outline: 1px solid rgba(#647382, 0.5);
			}

			svg {
				width: 18px;
				height: 18px;
			}
		}
	}
}

.side-bar--light {
	@extend .side-bar--dark;

	.variant-resolver {
		@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			--system-background-variant: #{$shade-50};

			@if ($color-name != 'gray') {
				--system-border-variant: #{$shade-200};
				--system-text-variant: #{$base-color};
			} @else {
				--system-border-variant: #{$shade-600};
				--system-text-variant: #{tokens.$n-800};
			}

		}
	}

	background: tokens.$n-0;
	border-right: 1px solid tokens.$n-30;
	width: 245px;

	.side-bar {
		&__subitem {
			color: tokens.$n-700;

			&--active {
				color: var(--system-text-variant);
			}

			&:hover {
				color: var(--system-text-variant);
			}
		}

		&__item {
			&--active {
				color: var(--system-text-variant);
			}

			&--active:hover {
				color: var(--system-text-variant);
			}

			&--inactive {
				color: tokens.$n-700;
			}

			&--inactive:hover {
				color: tokens.$n-700;
			}
		}

		&__item-container {
			&--active {
				background-color: var(--system-background-variant);
				border: 1px solid var(--system-border-variant);
			}
		}

		&__avatar > div > p:nth-child(1) {
			color: tokens.$n-700;
			cursor: v-bind(avatarCursorResolver);
		}

		&__avatar > div > p:nth-child(2) {
			color: tokens.$n-700;
			cursor: v-bind(avatarCursorResolver);
		}

		&__footer {
			& > ul {
				& > li {
					color: tokens.$n-700;
				}
			}
		}

		&__logout-button:hover {
			color: var(--system-text-variant);
			background-color: var(--system-background-variant);
			outline: 1px solid var(--system-border-variant);
		}

		&__collapsible {
			color: tokens.$n-700;

			&:hover {
				background-color: var(--system-background-variant);
				outline: 1px solid var(--system-border-variant);
				color: var(--system-text-variant);
			}
		}
	}
}

.side-bar--dark--collapsed {
	@extend .side-bar--dark;

	width: 68px;
	transition: width 0.5s;

	.side-bar {
		&__header {
			flex-direction: column;
			gap: 0;
		}

		&__item-container {
			&--active {
				padding: tokens.pa(3);
				transition: padding 0s;
			}

			&--inactive {
				padding: tokens.pa(3);
				transition: padding 0s;
			}
		}

		&__footer {
			flex-direction: column;
			gap: tokens.spacer(4);
		}

		&__logo {
			max-width: 44px;
		}
	}
}

.side-bar--light--collapsed {
	@extend .side-bar--dark--collapsed;
	@extend .side-bar--light;

	.side-bar__subitem {
		color: tokens.$n-100;

		&:hover {
			color: tokens.$n-0;
		}
	}

	width: 69px;
}

.item {
	.caret {
		transform: rotate(-180deg);
		transition: tokens.$opening;
	}
}

.dropdown {
	&__container {
		display: flex;
		gap: 12px;
		align-items: center;
		cursor: pointer;
		border-radius: 6px;
		padding: tokens.pa(2);

		&:hover {
			background-color: tokens.$n-20;
		}
	}

	&__text {
		color: tokens.$n-600;
		@include tokens.body-2;
		padding: tokens.py(1)
	}

	&__icon {
		color: tokens.$n-600;
	}
}

.popover {
	display: flex;
	align-items: center;
}

.side-bar__search-button {
	display: flex;
	gap: 12px;
	color: tokens.$n-400;
	outline: 1px solid tokens.$n-600;
	border-radius: tokens.$border-radius-lil;
	background-color: #414C57;
	padding: tokens.pa(2);
	cursor: pointer;
	align-items: center;
	justify-content: v-bind(computedSearchButtonJustify);
	@include tokens.button-2;
	font-weight: tokens.$font-weight-semibold;
	transition: tokens.$hover;
	min-height: 44px;

	&:hover {
		color: tokens.$n-200;
		outline: 1px solid tokens.$n-300;
		transition: tokens.$hover;
	}

	&--light {
		background-color: tokens.$n-0;
		color: tokens.$n-400;
		outline: 1px solid tokens.$n-100;

		&:hover {
			color: tokens.$n-600;
			outline: 1px solid tokens.$n-500;
			transition: tokens.$hover;
		}
	}
}

.side-bar__search-shortcut {
	@include tokens.overline;
	border: 1px solid tokens.$n-400;
	padding: 2px 4px;
	border-radius: 4px;

	&--light {
		border: 1px solid tokens.$n-300;
	}
}

.search-button__text-container {
	display: flex;
	gap: 4px;
	align-items: center;
}
</style>
