<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		ref="cds-box"
		:class="computedClass"
	>
		<cds-clickable
			class="box__container"
			:clickable="clickable"
			:fluid="fluid"
			@click="handleClick"
		>
			<!-- @slot Slot utilizado para renderização do conteúdo interno do Box.-->
			<cds-spacer
				:padding-top="padding"
				:padding-right="padding"
				:padding-bottom="padding"
				:padding-left="padding"
			>
				<slot />
			</cds-spacer>
		</cds-clickable>
	</div>
</template>

<script>
import CdsSpacer from './Spacer.vue';
import CdsClickable from './Clickable.vue';

import rounder from '../utils/methods/rounder';

export default {
	name: 'Box',
	components: {
		CdsSpacer,
		CdsClickable,
	},

	props: {
		/**
		* Quando true aplica o token $shadow-sm como box-shadow do componente.
		*/
		elevated: {
			type: Boolean,
			default: false,
		},
		/**
		* Indica se o componente deverá ocupar 100% da largura disponível.
		*/
		fluid: {
			type: Boolean,
			default: false,
		},
		/**
		* Indica se o componente deverá ocupar 100% da altura disponível.
		*/
		verticalFluid: {
			type: Boolean,
			default: false,
		},
		/**
		* O valor setado é sempre multiplicado por 4, assim como nos tokens scss do Cuida.
		* O valor mínimo aceito é 4 e o máximo aceito é 12.
		*/
		padding: {
			type: [Number, String],
			default: 4,
			validator: (value) => value <= 12,
		},
		/**
		* Ativa ou desativa o clique no componente
		*/
		clickable: {
			type: Boolean,
			default: false,
		},
		/**
		* A variante de cor. São 10 variantes:
		* @values 'green', 'teal', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'dark'
		*/
		variant: {
			type: String,
			default: 'gray',
		},
		/**
		* Aplica uma versão mais suave da variante de cor.
		*/
		light: {
			type: Boolean,
			default: false,
		},
		/**
		* Quando true, oculta o overflow do componente.
		*/
		overflowVisible: {
			type: Boolean,
			default: false
		}
	},

	data() {
		return {
			width: 0,
		};
	},

	computed: {
		widthResolver() {
			return this.fluid ? '100%' : 'fit-content';
		},

		heightResolver() {
			return this.verticalFluid ? '100%' : 'fit-content';
		},

		borderRadiusResolver() {
			return this.rounder(this.width, 12);
		},

		overflowResolver() {
			return this.overflowVisible ? 'visible' : 'hidden';
		},

		computedClass() {
			if (this.elevated) {
				return 'box--elevated';
			}

			return this.light ? `box--${this.variant}--light` : `box--${this.variant}`;
		},
	},

	mounted() {
		this.width = this.$refs['cds-box'].getBoundingClientRect().width;
	},

	methods: {
		rounder,

		handleClick() {
			if (this.clickable) {
				this.$emit('boxClick', true);
			}
		},
	},
}
</script>

<style lang="scss" scoped>
@use './../assets/sass/tokens/index' as tokens;

.box {
	width: v-bind(widthResolver);
	height: v-bind(heightResolver);
	border-radius: v-bind(borderRadiusResolver);
	overflow: v-bind(overflowResolver);

	&__container {
		width: v-bind(widthResolver);
		height: v-bind(heightResolver);
	}

	&--elevated {
		@extend .box;
		box-shadow: tokens.$shadow-sm;
		background-color: tokens.$n-0;
		outline: 1px solid tokens.$n-30;
	}

	@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
		@extend .box;
		outline: 1px solid $base-color;
		background-color: $shade-50;

		&--light {
			@extend .box;
			outline: 1px solid $shade-100;
			background-color: tokens.$n-0;
		}
	}
}
</style>