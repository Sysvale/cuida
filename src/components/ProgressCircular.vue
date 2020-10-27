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
		<text x="18" y="21.7" :fill="labelColor" class="progress-circular__label">{{label}}</text>
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
		stroke: {
			type: Number,
			default: 2.6,
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
		font-size: 0.7em;
		text-anchor: middle;
	}
}
</style>
