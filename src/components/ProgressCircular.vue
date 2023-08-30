<template>
	<svg
		class="progress-circular"
		viewBox="0 0 36 36"
		:class="`progress-circular--${size}`"
	>
		<path
			class="progress-circular__ring-background"
			:stroke="backgroundColor"
			:stroke-width="stroke"
			d="M18 2.0845
			a 15.9155 15.9155 0 0 1 0 31.831
			a 15.9155 15.9155 0 0 1 0 -31.831"
		/>

		<path
			:class="`progress-circular__ring-progress--${variant}`"
			:stroke-dasharray="normalizedDashArray"
			:stroke-width="stroke-1"
			:style="circleIndicatorStyle"
			d="M18 2.0845
			a 15.9155 15.9155 0 0 1 0 31.831
			a 15.9155 15.9155 0 0 1 0 -31.831"
		/>

		<text
			v-if="!noLabel"
			x="18"
			y="21.7"
			:class="labelClass"
		>
			{{ label }}
		</text>
	</svg>
</template>

<script>
import { colorOptions, colorHexCode } from '../utils/constants/colors';

export default {
	props: {
		/**
		 * Define a cor da ProgressCircular.
		 */
		variant: {
			type: String,
			default: 'green',
		},
		/**
		 * Define o tamanho (diâmetro) da ProgressCircular.
		 */
		size: {
			type: String,
			default: 'md',
			required: false,
		},
		/**
		 * Define o valor correspondente ao percentual ou fração preenchida da ProgressCircular.
		 */
		value: {
			type: Number,
			default: 0,
			required: true,
		},
		/**
		 * Define o valor máximo, a porção toda do processo, da ProgressCircular.
		 * Por padrão o valor máximo é 100 (padrão porcentagem).
		 */
		maxValue: {
			type: Number,
			default: 100,
			required: false,
		},
		/**
		* Torna a espessura do circulo da ProgressCircular menor.
		*/
		slim: {
			type: Boolean,
			default: false,
		},
		/**
		* Torna a espessura do circulo da ProgressCircular maior.
		*/
		thick: {
			type: Boolean,
			default: false,
		},
		/**
		* Controla a exibição da label.
		*/
		noLabel: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		label() {
			if (this.maxValue >= 100) {
				const normalizedValue = Math.round(100 * this.value / this.maxValue);
				return `${normalizedValue}%`;
			}

			return `${this.value}/${this.maxValue}`;
		},

		normalizedDashArray() {
			const normalizedValue = 100 * this.value / this.maxValue;
			return `${normalizedValue}, 100`;
		},

		stroke() {
			if (this.slim) return 1.5;
			if (this.thick) return 4.5;
			return 3.5;
		},

		labelClass() {
			const modifier = this.maxValue >= 100 ? '--reduced' : '';
			return `progress-circular__label${modifier}`;
		},

		circleIndicatorStyle() {
			return {
				'--indicatorColor': this.colorHexCode(this.variant),
			};
		},
	},

	methods: {
		colorHexCode,
	},
}
</script>

<style lang="scss">
@import '../assets/sass/tokens.scss';

.progress-circular {
	display: block;
	margin: 0 auto;
	max-width: 80%;
	max-height: 250px;

	&--sm {
		height: 48px;
		width: 48px;

		& > .progress-circular__label {
			font-weight: $font-weight-semibold;
		}
	}

	&--md {
		height: 64px;
		width: 64px;

		& > .progress-circular__label {
			font-weight: $font-weight-semibold;
		}
	}

	&--lg {
		height: 80px;
		width: 80px;

		& > .progress-circular__label {
			font-weight: $font-weight-regular;
		}
	}
	

	&__ring-background {
		fill: none;
		stroke: $n-50;
	}

	&__ring-progress {
		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			fill: none;
			stroke-linecap: round;
			animation: progress 1s ease-out forwards;
			stroke: $base-color;
		}
	}

	@keyframes progress {
		0% {
			stroke-dasharray: 0 100;
		}
	}

	&__label {
		font-size: 0.5em;
		text-anchor: middle;

		&--reduced {
			@extend .progress-circular__label;
			font-size: 0.6em;
		}
	}
}
</style>
