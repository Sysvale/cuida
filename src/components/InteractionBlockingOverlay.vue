<template>
	<div
		v-if="showOverlay"
		class="landscape-overlay"
	>
		<div class="landscape-overlay__container">
			<img
				class="landscape-overlay__image"
				:src="imgSrc"
			>
			<span class="landscape-overlay__title">{{ titleText }}</span>
			<span class="landscape-overlay__subtitle">{{ descriptionText }}</span>
			<div
				v-if="block-interaction === 'mobile'"
				class="landscape-overlay__button"
			>
				<cds-button
					:variant="buttonVariant"
					block
					@button-click="emits('button-click')"
				>
					{{ buttonText }}
				</cds-button>
			</div>
		</div>
	</div>
</template>

<script setup>

defineOptions({ name: 'InteractionBlockingOverlay' });

import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import isDeviceType from '../utils/methods/isDeviceType';
import { colorOptions } from '../utils/constants/colors';
import CdsButton from './Button.vue';

// Props
const props = defineProps({
	/**
	* Define qual critério vai ser usado para exibir o componente.
	*/
	blockInteraction: {
		type: String,
		required: true,
		default: 'mobile',
		validator: (value) => ['mobile', 'landscape'].includes(value.toLowerCase()),
	},
	/**
	*Define o título do componente.
	*/
	title: {
		type: String,
		default: '',
	},
	/**
	*Define a mensagem descritiva a ser exibida no componente.
	*/
	description: {
		type: String,
		default: '',
	},
	/**
	* Define qual é a variante de cor do botão exibido quando a propriedade 'block-interaction' for 'mobile'.
	*/
	buttonVariant: {
		type: String,
		default: 'green',
		validator: (value) => colorOptions.includes(value.toLowerCase()),
	},
	/**
	* Define qual o texto do botão exibido quando a propriedade 'block-interaction' for 'mobile'.
	*/
	buttonText: {
		type: String,
		default: 'Ir para o início',
	},
});

// Emits
const emits = defineEmits([
	/**
	* Evento que indica que o botão de ação foi clicado
	* @event button-click
	* @type {Event}
	*/
	'button-click'
]);

// Variáveis reativas
const showOverlay = ref(false);
const titleText = ref('');
const descriptionText = ref('');
const imgSrc = ref('');

// Variáveis computadas
const isMobile = computed(() => {
	return isDeviceType('smartphone') || isDeviceType('tablet');
});

const isLandscape = computed(() => {
	return (window.outerWidth > window.outerHeight) && isMobile.value;
});

// Watch
watch(showOverlay, (newValue) => {
	if (newValue) {
		document.body.style.overflow = 'hidden';
	} else {
		document.body.style.overflow = 'auto';
	}
});

watchEffect(() => {
	if (!isMobile.value && !isLandscape.value) {
		showOverlay.value = false;
	}
})

// Hooks de ciclo de vida
onMounted(() => {
	if (props.blockInteraction === 'mobile') {
		if (isMobile.value) {
			showOverlay.value = true;
			props.title === '' ? titleText.value = 'Acesse o conteúdo por um computador' : titleText.value = props.title;
			props.description === '' ? descriptionText.value = 'Esta tela não é otimizada para navegação em celular.' : descriptionText.value = props.description;
			imgSrc.value = '/img/page-not-responsive.svg';
		}
		return
	}

	if (props.blockInteraction === 'landscape') {
		if  (isLandscape.value) {
			showOverlay.value = true;
			props.title === '' ? titleText.value = 'Rotacione seu dispositivo' : titleText.value = props.title;
			props.description === '' ? descriptionText.value = 'Este conteúdo é otimizado para a visualização em modo retrato.' : descriptionText.value = props.description;
			imgSrc.value = '/img/smartphone-rotation.svg';
		}
	}
})

</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.landscape-overlay {
	background: rgba($color: tokens.$n-900, $alpha: 0.97);
	color: tokens.$n-20;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: tokens.$z-index-toast;
	display: flex;
	justify-content: center;
	align-items: center;

    &__title {
        @include tokens.heading-3;
        font-weight: tokens.$font-weight-bold;
        color: tokens.$n-20;
		text-align: center;
    }

    &__subtitle {
		text-align: center;
		@include tokens.body-2;
        color: tokens.$n-20;
    }

	&__container {
        display: flex;
		padding: tokens.px(5);
        flex-direction: column;
        align-items: center;
        gap: tokens.spacer(3);
	}

	&__image {
		width: 80px;
		height: 80px;
        filter: invert(88%) sepia(64%) saturate(0%) hue-rotate(231deg) brightness(106%) contrast(102%);
	}

	&__button {
		justify-self: flex-end;
		width: 100%;
		height: 100%;
		margin: tokens.mt(4);
	}
}

</style>
