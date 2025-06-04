<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		class="divider__container"
		:class="{'divider__container--inline': inline}"
	>
		<div v-if="!vertical">
			{{ text }}
		</div>

		<hr
			class="divider"
			:class="{
				'divider--vertical': vertical,
				'divider--light': light,
				'divider--dimmed': dimmed,
			}"
		>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * Texto renderizado em cima ou ao lado do Divider
		 */
		text: {
			type: String,
			default: null,
		},
		/**
		 * Quando true, mostra o Divider na vertical
		 */
		vertical: {
			type: Boolean,
			default: false,
		},
		/**
		 * Quando não especificado ou 0, o comportamento do
		 * componente é fluid, com width 100%.
		 */
		width: {
			type: [String, Number],
			default: null,
		},
		/**
		 * Torna o divider branco
		 */
		dimmed: {
			type: Boolean,
			default: false,
		},
		/**
		 * Torna o divider branco
		 */
		light: {
			type: Boolean,
			default: false,
		},
		/**
		 * Quando especificado, determina a largura do Divider.
		 */
		inline: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		sanitizedWidth() {
			if (this.width) {
				return `${this.width}px`;
			}

			return '100%';
		}
	},
};
</script>
<style lang="scss">
@use '../assets/sass/tokens/index' as tokens;

.divider__container > div {
	margin: mb(1);
}
.divider {
	background-color: tokens.$n-200;
	border: 0;
	height: 1px;
	width: v-bind(sanitizedWidth);
	margin: 0;

	&__container {
		&--inline {
			display: flex;
			align-items: center;
		}

		&--inline > div {
			@include tokens.overline;
			color: tokens.$n-500;
			width: max-content;
			white-space: nowrap;
			margin: mTRBL(0, 2, 1, 0);
		}
	}

	&--vertical {
		@extend .divider;
		transform: rotate(90deg);
	}

	&--light {
		@extend .divider;
		background-color: tokens.$n-0;
	}

	&--dimmed {
		@extend .divider;
		background-color: tokens.$n-40;
	}
}
</style>
