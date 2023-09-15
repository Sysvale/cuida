<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div :class="computedSpinnerClass" />
</template>

<script>
export default {
	props: {
		/**
		*	Propriedade referente ao tamanho do componente ('sm', 'md' ou 'lg')
		*
		*/
		size: {
			type: String,
			default: 'md',
		},
		/**
		*	Variante de cor do componente ('turquoise', 'green', 'blue',
			'indigo', 'violet', 'pink', 'red', 'orange', 'amber')
		*
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
@import '../assets/sass/tokens.scss';

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

	@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
		@extend .spin;
		border-left-color: $base-color;
		border-bottom-color: lighten($base-color, 5%);
		border-right-color: lighten($base-color, 10%);
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
</style>
