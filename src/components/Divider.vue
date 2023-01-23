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
			}"
			:style="dynamicStyle"
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
		 * Quando especificado, determina a largura do Divider.
		 */
		width: {
			type: [String, Number],
			default: null,
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
		dynamicStyle() {
			let sanitizedWidth = '100%';

			if (this.width !== null) {
				sanitizedWidth = `${this.width}px`;
			}

			return {
				'--width': sanitizedWidth,
			};
		},
	},
};
</script>
<style lang="scss">
@import '../assets/sass/app.scss';
.divider__container > div {
	margin: mb(1);
}

.divider {
	background-color: $n-100;
	border: 0;
	height: 1px;
	width: var(--width);
	margin: 0;

	&__container {
		&--inline {
			justify-content: space-between;
			align-items: center;
		}

		&--inline > div {
			width: max-content;
			white-space: nowrap;
			margin: mTRBL(0, 4, 1, 0);
		}
	}

	&--vertical {
		@extend .divider;
		transform: rotate(90deg);
	}

	&--light {
		@extend .divider;
		background-color: $n-0;
	}
}
</style>
