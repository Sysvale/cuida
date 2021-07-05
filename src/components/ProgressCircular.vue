<template>
	<svg
		class="progress-circular"
		viewBox="0 0 36 36"
		:height="size"
		:width="size"
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
			class="progress-circular__ring-progress"
			:stroke="color"
			:stroke-dasharray="normalizedDashArray"
			:stroke-width="stroke-1"
			d="M18 2.0845
			a 15.9155 15.9155 0 0 1 0 31.831
			a 15.9155 15.9155 0 0 1 0 -31.831"
		/>
		<text x="18" y="21.7" :fill="labelColor" :class="labelClass">
			{{ label }}
		</text>
	</svg>
</template>

<script>
export default {
	props: {
		/**
		 * Define a cor da ProgressCircular.
		 */
		color: {
			type: String,
			default: '#2EB88D',
			required: false,
		},
		/**
		 * Define a cor de background da ProgressCircular.
		 */
		backgroundColor: {
			type: String,
			default: '#CED4DA',
			required: false,
		},
		/**
		 * Define o tamanho (diâmetro) da ProgressCircular.
		 */
		size: {
			type: Number,
			default: 24,
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
		 * Define a espessura do circulo da ProgressCircular.
		 */
		width: {
			type: String,
			default: 'default',
			required: false,
		},
		/**
		 * Define a cor do texto (label) dentro da ProgressCircular.
		 */
		labelColor: {
			type: String,
			default: '#303A44',
			required: false,
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
			switch(this.width) {
			case 'small':
				return 1.5;
			case 'large':
				return 4.5;
			default:
				return 3.5;
			}
		},

		labelClass() {
			const modifier = this.maxValue >= 100 ? '--reduced' : '';
			return `progress-circular__label${modifier}`;
		}
	},
}
</script>

<style lang="scss" scoped>
.progress-circular {
	display: block;
	margin: 0 auto;
	max-width: 80%;
	max-height: 250px;

	&__ring-background {
		fill: none;
	}

	&__ring-progress {
		fill: none;
		stroke-linecap: round;
		animation: progress 1s ease-out forwards;
	}

	@keyframes progress {
		0% {
			stroke-dasharray: 0 100;
		}
	}

	&__label {
		font-family: sans-serif;
		font-size: 0.66em;
		text-anchor: middle;

		&--reduced {
			@extend .progress-circular__label;
			font-size: 0.6em;
		}
	}
}
</style>
