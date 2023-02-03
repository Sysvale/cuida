<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		:class="elevated ? 'box--elevated' : 'box'"
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
	</div>
</template>

<script>
import CdsSpacer from './Spacer.vue';
export default {
	components: {
		CdsSpacer,
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
			type: Number,
			default: 4,
			validator: (value) => value <= 12,
		},
	},

	computed: {
		widthResolver() {
			return this.fluid ? '100%' : 'fit-content';
		},
	},
}
</script>

<style lang="scss" scoped>
@import './../assets/sass/tokens.scss';
.box {
	width: v-bind(widthResolver);
	background-color: $n-0;
	border-radius: $border-radius-extra-small;
	outline: 1px solid $n-30;

	&--elevated {
		@extend .box;
		box-shadow: $shadow-sm;
	}
}
</style>