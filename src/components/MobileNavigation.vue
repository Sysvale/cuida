<template>
	<div
		class="mobile-navigation"
		:class="`mobile-navigation--${resolveMode}`"
	>
		<div :class="`variant-resolver--${variant}`">
			<div class="mobile-navigation__header">
				<div class="mobile-navigation__logo">
					<!-- @slot Slot para renderização do logo principal.-->
					<slot name="main-logo">
						<img :src="mainLogo">
					</slot>
				</div>

				<div class="mobile-navigation__title">
					{{ internalActiveItem.label ?? '' }}
				</div>

				<div
					class="mobile-navigation__menu-btn"
					@click="handleOpenSidebar"
				>
					<cds-icon
						name="menu-outline"
					/>
				</div>
			</div>

			<div
				class="mobile-navigation__sidebar"
				:class="{
					'mobile-navigation__sidebar--expanded': openSidebar
				}"
			>
				<div class="mobile-navigation__sidebar-header">
					<div class="mobile-navigation__sidebar-logo">
						<!-- @slot Slot para renderização do logo da sidebar.-->
						<slot name="sidebar-logo">
							<img :src="sidebarLogo">
						</slot>
					</div>

					<div
						class="mobile-navigation__sidebar-btn"
						@click="handleCloseSidebar"
					>
						<cds-icon
							name="menu-outline"
						/>
					</div>
				</div>

				<div class="mobile-navigation__sidebar-content">
					<div class="mobile-navigation__sidebar-items">
						<router-link
							v-for="item in items"
							:key="item.label"
							:to="routerPushTo(item)"
							class="mobile-navigation__sidebar-item"
							:class="{
								'mobile-navigation__sidebar-item--active': isActive(item),
							}"
							@click="handleItemClick(item)"
						>
							<cds-icon
								:name="item.icon"
								width="24"
								height="24"
							/>

							<span>{{ item.label }}</span>
						</router-link>
					</div>

					<div class="mobile-navigation__sidebar-footer">
						<div
							class="mobile-navigation__sidebar-user-info"
							@click="emit('profile-click')"
						>
							<cds-avatar
								:src="user.picture ?? ''"
								:name="user.name ?? ''"
								:variant="variant"
								size="lg"
							/>

							<div class="mobile-navigation__sidebar-user-text">
								<p>{{ user.name ?? '' }}</p>
								<p>{{ user.role ?? '' }}</p>
							</div>
						</div>

						<button
							class="mobile-navigation__sidebar-logout"
							@click="emit('logout')"
						>
							<cds-icon
								name="logout-outline"
								width="24"
								height="24"
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue';
import { isEqual, isEmpty } from 'lodash';
import CdsIcon from './Icon.vue';
import CdsAvatar from './Avatar.vue';

const props = defineProps({
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
	 * Ativa o modo light da navegação.
	*/
	light: {
		type: Boolean,
		default: false,
	},
	/**
	 * Define a logo que vai aparecer no container principal da navegação
	*/
	mainLogo: {
		type: String,
		default: '',
	},
	/**
	 * Define a logo que vai aparecer na barra lateral da navegação
	*/
	sidebarLogo: {
		type: String,
		default: '',
	},
	/**
	 * Define a lista dos itens da navegação a serem
	 * mostrados. Os itens da lista devem ser
	 * objetos com path ou route, e com uma label.
	 */
	items: {
		type: Array,
		default: () => [],
	},
	/**
	* O item ativo da navegação.
	*/
	activeItem: {
		type: Object,
		default: () => {},
	},
	/**
	 * Define as informações referentes ao usuário. O objeto deve seguir a assinatura:
	 * { name: String, role: String, picture: String }
	*/
	user: {
		type: Object,
		default: () => {},
	}
});

const emit = defineEmits([
	/**
	 * Evento emitido quando o botão de logout é clicado
	* @event logout
	* @type {Event}
	*/
	'logout',
	/**
	 * Evento emitido quando um dos itens da navegação é clicado
	* @event item-click
	* @type {Event}
	*/
	'item-click',
	/**
	 * Evento emitido quando o clique é feito nas informações do usuário
	* @event profile-click
	* @type {Event}
	*/
	'profile-click',
]);

const internalActiveItem = ref(props.activeItem);
const openSidebar = ref(false);

const resolveMode = computed(() => {
	return (props.light) ? 'light' : 'dark';
});

const handleOpenSidebar = () => {
	openSidebar.value = true;
};

const handleCloseSidebar = () => {
	openSidebar.value = false;
};

const isActive = (item) => isEqual(item, internalActiveItem.value);

const handleItemClick = (item) => {
	internalActiveItem.value = item;
	openSidebar.value = false;

	emit('item-click', item);
};

const resolveRoute = ({ route, path }) => {
	const to = isEmpty(route) ? path : route;
	return to instanceof String ? { path: to } : to;
};

const routerPushTo = (item) => {
	return resolveRoute(item) ? resolveRoute(item).path : null;
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.mobile-navigation {
	top: 0;
	left: 0;
	width: 100%;
	z-index: 1000;
	box-shadow: $shadow-sm;

	&__header {
		padding: pTRBL(2, 4, 5, 4);
	}

	&__logo {
		display: flex;
		justify-content: center;
		padding: pb(4);

		& img {
			width: 130px;
		}
	}

	&__title {
		@include subheading-1;
		margin: mt(3);
	}

	&__menu-btn {
		position: absolute;
		top: spacer(6);
		left: spacer(4);
	}

	&__sidebar {
		display: flex;
		flex-direction: column;
		gap: spacer(6);
		top: 0;
		left: 0;
		position: absolute;
		padding: pYX(4, 5);
		height: 100%;
		width: 100%;
		margin-left: calc(0px - 100%);
		transition: margin-left 0.3s ease;
	}

	&__sidebar--expanded {
		margin-left: 0;
		transition: margin-left 0.3s ease;
	}

	&__sidebar-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&__sidebar-logo img {
		max-width: 147px;
	}

	&__sidebar-btn {
		margin-right: spacer(1);
	}

	&__sidebar-content {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-bottom: spacer(8);
	}

	&__sidebar-items {
		display: flex;
		flex-direction: column;
		gap: spacer(4);
	}

	&__sidebar-item {
		@include body-1;
		display: flex;
		align-items: center;
		padding: pYX(4, 5);
		border-radius: 10px;
		gap: 10px;
		background: none;
		transition: background 0.25s ease-in-out;

		&--active {
			font-weight: 700;
		}
	}

	&__sidebar-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&__sidebar-user-info {
		display: flex;
		align-items: center;
		gap: spacer(4);
	}

	&__sidebar-user-text {
		display: flex;
		flex-direction: column;
		gap: 0;

		& p {
			margin: 0;
		}

		& p:first-child {
			@include body-1;
			font-weight: $font-weight-bold;
		}

		& p:last-child {
			@include body-2;
		}
	}

	&__sidebar-logout {
		padding: pa(2);
		background: none;
		border: none;
		cursor: pointer;
	}
}

.mobile-navigation--dark {
	&.mobile-navigation {
		background: linear-gradient(183deg, #4B545B 26.25%, #262B2F 183.33%);
		color: $n-0;
	}

	.mobile-navigation {
		&__sidebar {
			background: linear-gradient(183deg, #4B545B 26.25%, #262B2F 183.33%);
			color: $n-0;
		}

		&__sidebar-item {
			&--active {
				background: #576169;
				color: $n-0;
				border: 1px solid #64738280;
				transition: background 0.25s ease-in-out;
			}
		}

		&__sidebar-logout {
			color: $n-0;
		}
	}
}

.mobile-navigation--light {
	.variant-resolver {
		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			--system-background-variant: #{$shade-50};
			--system-border-variant: #{$shade-200};
			--system-text-variant: #{$base-color};
		}
	}

	&.mobile-navigation {
		background: $n-0;
		color: $n-700;
	}

	.mobile-navigation {
		&__sidebar {
			background: $n-0;
			color: $n-700;
		}

		&__sidebar-item {
			&--active {
				background: var(--system-background-variant);
				color: var(--system-text-variant);
				border: 1px solid var(--system-border-variant);
			}
		}

		&__sidebar-logout {
			color: $n-700;
		}
	}
}
</style>
