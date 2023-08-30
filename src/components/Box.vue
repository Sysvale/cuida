<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		ref="cds-box"
		:class="elevated ? 'box--elevated' : `box--${variant}`"
	>
		<cds-clickable
			class="box__container"
			:clickable="clickable"
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
		* A variante de cor. São 9 variantes implementadas: 'green', 'teal',
		* 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'gray' e 'dark'.
		*/
		variant: {
			type: String,
			default: 'gray',
		},
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

		borderRadiusResolver() {
			return this.rounder(this.width, 12);
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
@import './../assets/sass/tokens.scss';

.box {
	width: v-bind(widthResolver);
	border-radius: v-bind(borderRadiusResolver);
	overflow: visible;

	&__container {
		width: v-bind(widthResolver);
	}

	&--elevated {
		@extend .box;
		box-shadow: $shadow-sm;
		background-color: $n-0;
		outline: 1px solid $n-30;
	}

	@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
		@extend .box;
		outline: 1px solid $base-color;
		background-color: $shade-50;
	}
}
</style>