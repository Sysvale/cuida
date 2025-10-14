<template>
	<div class="top-app-bar">
		<div class="top-app-bar__menu-container">
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
					class="top-app-bar__back-arrow"
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
		</div>
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

defineOptions({ name: 'CdsTopAppBar' });

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
	 * URL da imagem do logo. Quando definida o título será substituído pela logo
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
const handleRouterBack = computed(() => {
	const defaultRoute = resolveDefaultRoute();

	if (!defaultRoute) {
		return -1;
	}

	return defaultRoute;
});

function resolveDefaultRoute() {
	if (props.defaultRoute?.path) {
		return props.defaultRoute.path;
	}

	if (props.defaultRoute?.name) {
		return { name: props.defaultRoute.path };
	}

	return null;
}



</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.top-app-bar {
    align-items: center;
    backdrop-filter: blur(10px);
    background-color: rgba(tokens.$n-0, .85);
    color: tokens.$n-700;
    display: flex;
    height: 74px;
    justify-content: space-between;
    padding: tokens.pYX(4, 6);
    position: absolute;
    top: 0;
    width: 100%;
	z-index: tokens.$z-index-modal;

    &__menu, &__back-arrow {
        cursor: pointer;
    }

	&__menu-container {
		display: flex;
		align-items: center;
		gap: tokens.spacer(6);
	}

	&__title {
		@include tokens.subheading-2;
	}

    &__actions {
        display: flex;
        gap: tokens.spacer(4);
    }

    &__logo-image {
        height: 50px;
    }
}

@media screen and (max-width: 932px) {
	.top-app-bar {
		height: 64px;
	}

	.top-app-bar__title {
		@include tokens.subheading-3;
	}
}

</style>
