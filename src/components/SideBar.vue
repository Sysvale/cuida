<template>
	<div
		:class="mainClass"
	>
		<div :class="`variant-resolver--${variant}`">
			<div class="side-bar__header">
				<div class="side-bar__logo">
					<slot
						v-if="!collapsed"
						name="logo"
					>
						<img :src="logoImage">
					</slot>

					<slot
						v-else
						name="collapsed-logo"
					>
						<img :src="collapsedLogoImage">
					</slot>
				</div>

				<div
					v-if="collapsible"
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

			<ul
				:class="{'side-bar__container': items.length >= 1}"
			>
				<li
					v-for="(item, index) in items"
					:key="`${index}-${item.name}-item`"
					role="presentation"
				>
					<div
						class="side-bar__item-container"
						:class="isActive(item) ? 'side-bar__item-container--active' : 'side-bar__item-container--inactive'"
						@click="(event) => handleClick(event, item)"
					>
						<div
							v-if="!!item.items || item.type === 'link'"
							class="side-bar__item"
							:class="isActive(item) ? 'side-bar__item--active' : 'side-bar__item--inactive'"
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
								name="caret-down-outline"
								:class="{'item__caret': isActive(item)}"
								width="16"
								height="16"
							/>
						</div>

						<router-link
							v-else
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

							<cds-icon
								v-if="!!item.items && item.items.length > 0"
								name="caret-down-outline"
								:class="{'item__caret': isActive(item)}"
								width="16"
								height="16"
							/>
						</router-link>
					</div>

					<Transition v-if="!collapsed">
						<div
							v-if="(!!item.items && item.items.length > 0) && isActive(item) && showUncollapsedItems"
							class="side-bar__subitem-container"
						>
							<div
								class="side-bar__subitems"
							>
								<div
									v-for="(subitem, idx) in item.items"
									:key="`${idx}-${subitem.name}-item`"
									class="side-bar__subitem"
									:class="isActive(subitem) && (subitem?.type !== 'external') ? 'side-bar__subitem--active' : 'side-bar__subitem--inactive'"
									@click="(event) => handleClick(event, subitem)"
								>
									<a
										v-if="!!subitem.type && subitem.type === 'external'"
										class="side-bar__subitem-link"
										target="_blank"
										rel="noopener noreferrer"
										:href="subitem.route.path"
									>
										{{ subitem.label }}

										<cds-icon
											height="16"
											width="16"
											name="open-in-new-tab-outline"
										/>
									</a>

									<router-link
										v-else
										class="side-bar__subitem-link"
										:to="routerPushTo(subitem)"
									>
										{{ subitem.label }}
									</router-link>
								</div>
							</div>
						</div>
					</Transition>
				</li>
			</ul>
		</div>

		<div
			:class="`side-bar__footer variant-resolver--${variant}`"
		>
			<div
				class="side-bar__avatar"
			>
				<cds-avatar
					:src="userPicture"
					:name="userName"
					variant="white"
					size="lg"
				/>

				<transition
					v-if="!collapsed"
					name="fade"
				>
					<div
						v-if="showUncollapsedItems"
					>
						<p>{{ userName }}</p>
						<p>{{ userRole }}</p>
					</div>
				</transition>
			</div>

			<ul>
				<li
					v-if="showLogout"
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
		</div>
	</div>
</template>

<script>
import isEqual from 'lodash.isequal';
import isEmpty from 'lodash.isempty';
import CdsIcon from './Icon.vue';
import CdsAvatar from './Avatar.vue';

import { colorOptions, colorHexCode } from '../utils/constants/colors';

export default {
	components: {
		CdsIcon,
		CdsAvatar,
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
		 * Imagem do logo que será renderizada
		*/
		logoImage: {
			type: String,
			default: null,
		},
		/**
		 * Imagem do logo que será renderizada quando a sidebar estiver colapsada
		*/
		collapsedLogoImage: {
			type: String,
			default: null,
		},
		/**
		 * Ativa o modo light da sidebar
		*/
		light: {
			type: Boolean,
			default: false,
		}
	},

	data() {
		return {
			internalActiveItem: {},
			collapsed: false,
			showUncollapsedItems: true,
			colorOptions,
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

		activeItem: {
			handler(newValue) {
				this.internalActiveItem = newValue;
			},
			immediate: true,
		},

		collapsed(newValue) {
			if (newValue) {
				this.showUncollapsedItems = false;
				return;
			}

			setTimeout(() => {
				this.showUncollapsedItems = true;
			}, 500);
		},
	},

	mounted() {
		this.internalActiveItem = this.activeItem;
	},

	methods: {
		colorHexCode,

		handleClick(event, item) {
			this.internalActiveItem = item;

			if (!!item.items && item.items.length > 0) {
				this.collapsed = false;
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
			this.collapsed = !this.collapsed;
		},
	},
};
</script>

<style lang="scss">
@import '../assets/sass/tokens.scss';
.fade-enter-active {
	transition: opacity 0.5s ease;
}

.fade-enter-from {
	opacity: 0;
}

.v-enter-active,
.v-leave-active {
	transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
	display: none;
	opacity: 0;
	transform: translateY(40px);
}

.side-bar--dark {
	background: linear-gradient(223deg, #4B545B 18.22%, #31393f 100%);
	box-shadow: 0px 3.8957247734069824px 7.791449546813965px 0px rgba(16, 24, 64, 0.04);
	display: flex;
	flex-direction: column;
	height: 100vh;
	justify-content: space-between;
	padding: pTRBL(8, 3, 8, 3);
	width: 244px;
	transition: width 0.5s;

	.side-bar {
		&__subitem {
			color: $n-100;
			cursor: pointer;
			padding: py(1);
			@include caption;

			&--active {
				color: $n-0;
				font-weight: 700;
			}

			&:hover {
				color: $n-0;
			}

			&-container {
				padding: pl(7);
				margin: mt(2);
			}

			&-link {
				width: 100%;
				display: block;
				display: flex;
				align-items: center;
				gap: spacer(2);
			}
		}


		&__subitems {
			border-left: 1px solid $n-300;
			display: flex;
			flex-direction: column;
			gap: spacer(4);
			padding: pTRBL(1, 0, 1, 4);
		}

		&__header {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: spacer(4);
			margin-bottom: 40px;
		}

		&__logo {
			display: flex;
			align-items: center;
			max-width: 144px;
		}

		&__logo > img {
			width: 100%;
		}

		&__container {
			display: flex;
			flex-direction: column;
			gap: spacer(3);
			list-style: none;
			padding: pa(0);
		}

		&__item-container {
			cursor: pointer !important;

			&--active {
				background-color: $appbar-color;
				border: 1px solid rgba(100, 115, 130, 0.50);
				border-radius: $border-radius-extra-small;
				color: $n-10;
				cursor: default;
				height: fit-content;
				padding: pTRBL(3, 4, 3, 4);
				transition: $interaction;
				width: 100%;
			}

			&--inactive {
				background-color: transparent;
				border: 1px solid transparent;
				border-radius: $border-radius-extra-small;
				padding: pTRBL(3, 4, 3, 4);
				transition: $opening;
			}
		}

		&__item > div{
			align-items: center;
			display: flex;
			gap: spacer(2);
		}

		&__item span {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		&__item {
			@include caption;
			align-items: center;
			cursor: pointer;
			display: flex;
			justify-content: space-between;
			overflow: hidden;
			text-overflow: ellipsis;
			text-align: center;
			text-decoration: none !important;

			&--active {
				color: $n-0;
				font-weight: 700;
			}

			&--active:hover {
				color: $n-0;
			}

			&--inactive {
				color: $n-10;
				height: fit-content;
			}

			&--inactive:hover {
				color: $n-0;
			}
		}

		&__logout-button {
			padding: pa(3);
			border-radius: $border-radius-small;
		}

		&__logout-button:hover {
			color: $n-0;
			background-color: #576169;
			outline: 1px solid rgba(#647382, 0.5);
			cursor: pointer;
		}

		&__footer {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: spacer(2);
			padding: pTRBL(2, 1, 2, 1);

			& > ul {
				margin: 0;
				padding: 0;

				& > li {
					align-items: center;
					color: $n-0;
					display: flex;
					gap: spacer(2);
				}
			}
		}

		&__avatar {
			align-items: center;
			display: flex;
			gap: spacer(3);
		}

		&__avatar > div > p:nth-child(1) {
			@include body-2;
			color: $n-0;
			font-weight: $font-weight-bold;
			margin: mb(0);
		}

		&__avatar > div > p:nth-child(2) {
			@include caption;
			color: $n-0;
			margin: 0;
		}

		&__collapsible {
			padding: pa(3);
			cursor: pointer;
			border-radius: $border-radius-extra-small;
			width: 42px;
			height: 42px;
			color: $n-0;

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
		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			--system-background-variant: #{$shade-50};
			--system-border-variant: #{$shade-200};
			--system-text-variant: #{$base-color};
		}
	}

	background: $n-0;
	border-right: 1px solid $n-30;
	width: 245px;

	.side-bar {
		&__subitem {
			color: $n-700;

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
				color: $n-700;
			}

			&--inactive:hover {
				color: $n-700;
			}
		}

		&__item-container {
			&--active {
				background-color: var(--system-background-variant);
				border: 1px solid var(--system-border-variant);
			}
		}

		&__avatar > div > p:nth-child(1) {
			color: $n-700;
		}

		&__avatar > div > p:nth-child(2) {
			color: $n-700;
		}

		&__footer {
			& > ul {
				& > li {
					color: $n-700;
				}
			}
		}

		&__logout-button:hover {
			color: var(--system-text-variant);
			background-color: var(--system-background-variant);
			outline: 1px solid var(--system-border-variant);
		}

		&__collapsible {
			color: $n-700;

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
			gap: spacer(6);
		}

		&__item-container {
			&--active {
				padding: pa(3);
				transition: padding 0s;
			}

			&--inactive {
				padding: pa(3);
				transition: padding 0s;
			}
		}

		&__footer {
			flex-direction: column;
			gap: spacer(4);
		}

		&__logo {
			max-width: 44px;
		}
	}
}

.side-bar--light--collapsed {
	@extend .side-bar--dark--collapsed;
	@extend .side-bar--light;

	width: 69px;
}

.item {
	.caret {
		transform: rotate(-180deg);
		transition: $opening;
	}
}
</style>
