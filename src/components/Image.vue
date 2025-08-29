<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<!--TODO: Substituir a tag img pela tag picture e modificar a API para refletir essa mudança. -->
	<img
		v-bind="$attrs"
		:src="innerSrc"
		:alt="alt"
		class="cds-image"
		@error="imageSrcResolver"
	>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import rounder from '../utils/methods/rounder';

defineOptions({
	name: 'Image',
});

const props = defineProps({
	/**
	* Caminho da imagem que vai ser renderizada.
	*/
	src: {
		type: String,
		required: true,
	},
	/**
	* Caminho da imagem que vai ser renderizada como fallback, caso a imagem principal
	* apresentar algum erro de carregamento.
	*/
	fallbackSrc: {
		type: String,
		default: 'https://sysfront.nyc3.cdn.digitaloceanspaces.com/cuida/images/imagePlaceholder.png'
	},
	/**
	* Largura da imagem. Quando não especificada, o valor `auto` é aplicado.
	*/
	width: {
		type: [Number, String],
		default: 100,
	},
	/**
	* Altura da imagem. Quando não especificada, o valor `auto` é aplicado.
	*/
	height: {
		type: [Number, String],
		default: 100,
	},
	/**
	* Descrição em texto da imagem.
	*/
	alt: {
		type: String,
		default: 'Imagem',
	},
	/**
	* Opacidade da imagem.
	*/
	opacity: {
		type: [Number, String],
		default: 1,
	},
	/**
	* Quando true, aplica um grayscale de 35% na imagem.
	*/
	dimmed: {
		type: Boolean,
		default: false,
	},
	/**
	* Torna a imagem preto e branca.
	*/
	blackAndWhite: {
		type: Boolean,
		default: false,
	},
	/**
	* Arrendonda as bordas da imagem.
	*/
	roundedCorners: {
		type: Boolean,
		default: false,
	},
	/**
	* Torna a imagem redonda.
	*/
	round: {
		type: Boolean,
		default: false,
	},
});

const innerSrc = ref(props.src);

const heightResolver = computed(() => {
	if (props.round) {
		return resolveSizeUnit(props.width);
	}
	return props.height ? resolveSizeUnit(props.height) : 'auto';
});

const widthResolver = computed(() => {
	return props.width ? resolveSizeUnit(props.width) : 'auto';
});

const opacityResolver = computed(() => {
	return props.width ? resolveSizeUnit(props.width) : 'auto';
});

const radiusResolver = computed(() => {
	if (props.round) {
		return '50%';
	}
	if (props.roundedCorners) {
		return rounder(props.width);
	}
	return '0px';
});

const grayScaleResolver = computed(() => {
	if (props.blackAndWhite) {
		return 'grayscale(100%)';
	} else if (props.dimmed) {
		return 'grayscale(35%)';
	} else {
		return 'grayscale(0%)';
	}
});

watch(() => props.src, (newValue) => {
	innerSrc.value = newValue;
});

function imageSrcResolver() {
	innerSrc.value = props.fallbackSrc;
}

function resolveSizeUnit(size) {
	if (!Number.isNaN(Number(size))) {
		return `${size}px`;
	}
	return size;
}
</script>

<style lang="scss" scoped>
.cds-image {
	border-radius: v-bind(radiusResolver);
	filter: v-bind(grayScaleResolver);
	height: v-bind(heightResolver);
	object-fit: cover;
	opacity: v-bind(opacity);
	width: v-bind(widthResolver);
	-webkit-filter: v-bind(grayScaleResolver);
}
</style>
