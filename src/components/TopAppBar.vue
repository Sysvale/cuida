<template>
	<div class="top-app-bar">
		<icon
			v-if="showMenuIcon"
			class="top-app-bar__menu"
			name="menu-outline"
			:width="iconSize"
			:height="iconSize"
			@click="emit('on-menu-click')"
		/>
		<router-link
			v-else-if="showBackNavigation"
			:to="handleRouterBack"
		>
			<icon
				name="arrow-left-outline"
				:width="iconSize"
				:height="iconSize"
			/>
		</router-link>
		<img
			v-if="logoUrl"
			class="top-app-bar__logo-image"
			:src="logoUrl"
			:alt="title"
		>
		<h2
			v-else
			class="top-app-bar__title"
		>
			{{ title }}
		</h2>
		<div class="top-app-bar__actions">
			<!-- @slot Slot utilizado para os botões de action do lado direito-->
			<slot name="actions" />
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import Icon from './Icon.vue';
import useIsMobile from '../utils/composables/useIsMobile';

const { isMobile } = useIsMobile();

const emit = defineEmits([
	/**
	 * Evento emitido quando o botão de menu é clicado
	 * Obs: necessário habilitar a prop showMenuIcon
	 */
	'on-menu-click'
]);

const props = defineProps({
	/**
	 * Título da sessão ou da página
	 */
	title: {
		type: String,
		default: '',
		required: true,
	},

	/**
	 * URL da imagem do logo. Quando definida o titulo será substituído pela logo
	 */
	logoUrl: {
		type: String,
		default: '',
	},

	/**
	 * Habilita a exibição do botão de menu
	 */
	showMenuIcon: {
		type: Boolean,
		default: false,
	},

	/**
	 * Habilita a exibição do botão de voltar
	 * Obs: se showMenuIcon estiver habilitado esta prop não surtirá efeito
	 */
	showBackNavigation: {
		type: Boolean,
		default: false,
	},

	/**
	 * Rota default para quando a prop showBackNavigation estiver habilitada
	 * Deve seguir o seguinte formato: { name: 'route-name', path: 'route-path' }
	 * Obs: não é necessário fornecer name e path, apenas um já é o suficiente
	 */
	defaultRoute: {
		type: Object,
		default: () => ({}),
	},
});

const iconSize = computed(() => (isMobile.value ? '24' : '34'));

function resolveDefaultRoute() {
	if (props.defaultRoute?.path) {
		return props.defaultRoute.path;
	}

	if (props.defaultRoute?.name) {
		return { name: props.defaultRoute.path };
	}

	return null;
}

function handleRouterBack() {
	const defaultRoute = resolveDefaultRoute();

	if (!defaultRoute) {
		return window.history.back();
	}

	return defaultRoute;
}

</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.top-app-bar {
    align-items: center;
    backdrop-filter: blur(10px);
    background-color: rgba($n-0, .85);
    background: $n-50;
    color: $n-700;
    display: flex;
    height: 74px;
    justify-content: space-between;
    padding: pYX(4, 6);
    position: absolute;
    top: 0;
    width: 100%;
	z-index: $z-index-modal;

    &__menu {
        cursor: pointer;
    }

	&__title {
		@include subheading-2;
	}

    &__actions {
        display: flex;
        gap: spacer(4);
    }

    &__logo-image {
        height: 100%;
    }
}

@media screen and (max-width: 932px) {
	.top-app-bar {
		height: 64px;
	}

	.top-app-bar__title {
		@include subheading-3;
	}
}

</style>
