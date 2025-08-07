<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		v-if="showSpinner"
		:class="computedSpinnerClass"
	/>
</template>

<script>
export default {
	name: 'Spinner',
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
		* A variante de cor. São 10 variantes:
		* @values 'green', 'teal', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'dark'
		*/
		variant: {
			type: String,
			default: 'green',
		},
		/**
		*	Delay para exibição do spinner, em ms
		*
		*/
		delay: {
			type: Number,
			default: 0,
		},
	},

	data() {
		return {
			showSpinner: false,
		};
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

	mounted() {
		if (this.delay > 0) {
			setTimeout(() => {
				this.showSpinner = true;
			}, this.delay);

			return;
		}

		this.showSpinner = true;
	},

	unmounted() {
		this.showSpinner = false;
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
</style>
