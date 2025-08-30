<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="overlay">
		<div :class="computedSpinnerClass" />
	</div>
</template>

<script>
export default {
	name: 'OverlayLoader',
	props: {
		/**
		* Propriedade referente ao tamanho do componente ('sm', 'md' ou 'lg')
		* @values sm, md, lg
		*/
		size: {
			type: String,
			default: 'md',
		},
		/**
		* Variante de cor do componente ('turquoise', 'green', 'blue',
		 'indigo', 'violet', 'pink', 'red', 'orange', 'amber')
		* @values 'green', 'teal', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'dark'
		*/
		variant: {
			type: String,
			default: 'green',
		},
	},

	computed: {
		computedSizeClass() {
			return `spin--${this.size}`;
		},

		computedColorClass() {
			return `spin--${this.variant}`;
		},

		computedSpinnerClass() {
			return `${this.computedSizeClass} ${this.computedColorClass}`;
		},
	},
};
</script>

<style lang="scss" scoped>
@use 'sass:color';
@use '../assets/sass/tokens/index' as tokens;

.spin {
	border-radius: 80px;
	cursor: progress;
	-webkit-transform: rotate(0deg);
	-moz-transform: rotate(0deg);
	-ms-transform: rotate(0deg);
	transform: rotate(0deg);
	-webkit-animation: spin .75s linear infinite;
	animation: spine .75s linear infinite;
	background: transparent;
	border-style: solid;

	@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
		@extend .spin;
		border-left-color: $base-color;
		border-bottom-color: color.adjust($base-color, $lightness: 5%);
		border-right-color: color.adjust($base-color, $lightness: 10%);
		border-top-color: transparent;
	}

	&--sm {
		height: 16px;
		width: 16px;
		border-width: 2px;
	}

	&--md {
		height: 28px;
		width: 28px;
		border-width: 4px;
	}

	&--lg {
		height: 52px;
		width: 52px;
		border-width: 6px;
	}
}

@keyframes spine {
	100% {
		transform: rotate(360deg);
	}
}

.overlay {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(tokens.$n-600, 0.30);
	height: 100%;
	position: absolute;
	width: 100%;
	padding: 0;
	margin: 0;
	left: 0;
	top: 0;
}
</style>
