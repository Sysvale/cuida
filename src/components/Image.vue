<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<!--TODO: Substituir a tag img pela tag picture e modificar a API para refletir essa mudança. -->
	<img
		v-bind="$attrs"
		:src="innerSrc"
		:alt="alt"
		class="cds__image"
		@error="imageSrcResolver"
	>
</template>

<script>
import rounder from '../utils/methods/rounder';

export default {
	props: {
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
			required: false,
			default: 'https://sysfront.nyc3.cdn.digitaloceanspaces.com/cuida/images/imagePlaceholder.png'
		},
		/**
		* Largura da imagem. Quando não especificada, o valor `auto` é aplicado.
		*/
		width: {
			type: [Number, String],
			default: null,
		},
		/**
		* Altura da imagem. Quando não especificada, o valor `auto` é aplicado.
		*/
		height: {
			type: [Number, String],
			default: null,
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
	},

	data() {
		return {
			innerSrc: this.src,
		};
	},

	computed: {
		heightResolver() {
			if (this.round) {
				return this.resolveSizeUnit(this.width);
			}

			return this.height ? this.resolveSizeUnit(this.height) : 'auto';
		},

		widthResolver() {
			return this.width ? this.resolveSizeUnit(this.width) : 'auto';
		},

		opacityResolver() {
			return this.width ? this.resolveSizeUnit(this.width) : 'auto';
		},

		radiusResolver() {
			if (this.round) {
				return '50%';
			}

			if (this.roundedCorners) {
				return rounder(this.width);
			}
			return '0px';
		},

		grayScaleResolver() {
			if (this.blackAndWhite) {
				return 'grayscale(100%)';
			} else if (this.dimmed) {
				return 'grayscale(35%)';
			} else {
				return 'grayscale(0%)';
			}
		},
	},

	watch: {
		src(newValue) {
			this.innerSrc = newValue;
		},
	},

	methods: {
		rounder,

		imageSrcResolver() {
			this.innerSrc = this.fallbackSrc;
		},

		resolveSizeUnit(size) {
			if (!Number.isNaN(Number(size))) {
				return `${size}px`;
			}

			return size;
		},
	},
}
</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.cds__image {
	border-radius: v-bind(radiusResolver);
	filter: v-bind(grayScaleResolver);
	height: v-bind(heightResolver);
	object-fit: cover;
	opacity: v-bind(opacity);
	width: v-bind(widthResolver);
	-webkit-filter: v-bind(grayScaleResolver);
}
</style>
