<template>
	<span
		id="progressBar"
	>
		<div
			class="bar"
		>
			<span
				v-if="showText"
				:class="textAside ? 'bar__text--aside' : 'bar__text'"
			>
				{{ formatedvalue }}
			</span>

			<div
				class="bar__content"
			>
				<div
					class="bar__indicator"
					:style="progressIndicatorStyle"
				/>
			</div>
		</div>
	</span>
</template>

<script>
import { colorHexCode } from '../utils/constants/colors';

export default {
	props: {
		/**
		 * A variante de cor. São 9 variantes implementadas: 'green', 'teal',
		 * 'blue', 'indigo', 'violet', 'pink', 'red', 'orange' e 'amber'.
		 */
		variant: {
			type: String,
			default: 'green',
		},
		/**
		 * Define o indicador de progresso da ProgressBar.
		 */
		value: {
			type: Number,
			default: 0,
			required: true,
		},
		/**
		 * Define se a porcentagem vai ser mostrada.
		 */
		showText: {
			type: Boolean,
			default: false,
			required: false,
		},
		/**
		 * Quando true, dispõe o texto à direita.
		 */
		textAside: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		formatedvalue() {
			return `${parseInt(this.value * 100, 10)}%`;
		},

		progressIndicatorStyle() {
			return {
				'--width': this.formatedvalue,
				'--indicatorColor': this.colorHexCode(this.variant),
				'--leftMargin': this.textAside ? '3' : '10',
				'--bottomMargin': this.textAside ? '10' : '2',
			};
		},

		textDirection() {
			return this.textAside ? 'row-reverse' : 'column';
		},
	},

	methods: {
		colorHexCode,
	},
};
</script>

<style lang="scss">
@import './../assets/sass/tokens.scss';
#progressBar .bar {
	align-items: center;
	display: flex;
	flex-direction: v-bind(textDirection);

	&__content {
		background-color: $n-40;
		border-radius: 80px;
		height: 7px;
		width: 100%;
	}

	&__indicator {
		background-color: var(--indicatorColor);
		border-radius: 80px;
		height: 7px;
		width: var(--width);
	}

	&__text--aside {
		font-weight: 600;
		margin: ml(3);
	}

	&__text {
		font-weight: 600;
		margin: mb(2);
	}
}
</style>
