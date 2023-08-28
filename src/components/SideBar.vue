<template>
	<div
		class="side-bar"
	>
		<div>
			<div class="side-bar__logo">
				<slot name="logo" />
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
					>
						<router-link
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

					<Transition>
						<div
							v-if="(!!item.items && item.items.length > 0) && isActive(item)"
							class="side-bar__subitem-container"
						>
							<div
								class="side-bar__subitems"
							>
								<div
									v-for="(subitem, idx) in item.items"
									:key="`${idx}-${subitem.name}-item`"
									class="side-bar__subitem"
									:class="isActive(subitem) ? 'side-bar__subitem--active' : 'side-bar__subitem--inactive'"
									@click="(event) => handleClick(event, subitem)"
								>	
									<router-link
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
			class="side-bar__footer"
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

				<div>
					<p>{{ userName }}</p>
					<p>{{ userRole }}</p>
				</div>
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
					<span>Sair</span>
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
	},

	data() {
		return {
			internalActiveItem: {},
			colorOptions,
		};
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
	},

	mounted() {
		this.internalActiveItem = this.activeItem;
	},

	methods: {
		colorHexCode,

		handleClick(event, item) {
			this.internalActiveItem = item;
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
	},
};
</script>

<style lang="scss">
@import '../assets/sass/tokens.scss';

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

.side-bar {
	background: linear-gradient(223deg, #4B545B 18.22%, #31393f 100%);
	box-shadow: 0px 3.8957247734069824px 7.791449546813965px 0px rgba(16, 24, 64, 0.04);
	display: flex;
	flex-direction: column;
	height: 100vh;
	justify-content: space-between;
	padding: pTRBL(8, 3, 8, 3);
	width: 232px;

	&__subitem {
		color: $n-100;
		cursor: pointer;
		padding: py(1);
		@include caption;
	
		&--active {
			color: $n-0;
			font-weight: $font-weight-semibold;
		}

		&:hover {
			color: $n-40;
		}
		
		&-container {
			padding: pl(7);
			margin: mt(2);
		}
	}


	&__subitems {
		border-left: 1px solid $n-300;
		display: flex;
		flex-direction: column;
		gap: spacer(3);
		padding: pTRBL(1, 0, 1, 4);
	}

	&__logo > img {
		margin-bottom: 40px;
		padding: px(3);
		width: 100%;
	}

	&__container {
		display: flex;
		flex-direction: column;
		gap: spacer(2);
		list-style: none;
		padding: pa(0);
	}

	&__item-container {
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

	&__item {
		align-items: center;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: center;
		text-decoration: none !important;
		@include caption;

		&--active {
			color: $n-0;
			font-weight: 550;
		}

		&--active:hover {
			color: $n-0;
		}

		&--inactive {
			color: $n-40;
			height: fit-content;
		}

		&--inactive:hover {
			color: $n-20;
		}
	}

	&__logout-button:hover {
		color: $n-0;
		cursor: pointer;
	}

	&__footer {
		display: flex;
		flex-direction: column;
		gap: spacer(8);
		padding: pTRBL(2, 4, 2, 4);

		& > ul {
			margin: 0;
			padding: 0;

			& > li {
				align-items: center;
				color: $n-40;
				display: flex;
				gap: spacer(2);
			}
		}
	}

	&__avatar {
		align-items: center;
		display: flex;
		gap: spacer(4);
	}

	&__avatar > div > p:nth-child(1) {
		color: $n-30;
		font-weight: $font-weight-semibold;
		margin: mb(1);
		@include body-1;
	}

	&__avatar > div > p:nth-child(2) {
		color: $n-40;
		margin: 0;
		@include caption;
	}
}

.item {
	.caret {
		transform: rotate(-180deg);
		transition: $opening;
	}
}
</style>
