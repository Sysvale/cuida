<template>
	<div
		class="progress-bar"
	>
		<span
			v-if="showText"
			:class="textAside ? 'bar__text--aside' : 'bar__text'"
		>
			{{ formatedvalue }}
		</span>

		<div
			class="progress-bar__content"
		>
			<div
				:class="`progress-bar__indicator--${variant}`"
				:style="progressIndicatorStyle"
			/>
		</div>
	</div>
</template>

<script>

export default {
	props: {
		/**
		 * A variante de cor. São 9 variantes implementadas: 'green', 'teal', 'turquoise',
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
				'--leftMargin': this.textAside ? '3' : '10',
				'--bottomMargin': this.textAside ? '10' : '2',
			};
		},

		textDirection() {
			return this.textAside ? 'row-reverse' : 'column';
		},
	},
};
</script>

<style lang="scss" scoped>
@import './../assets/sass/tokens.scss';
.progress-bar {
	align-items: center;
	display: flex;
	flex-direction: v-bind(textDirection);

	&__content {
		background-color: $n-40;
		border-radius: $border-radius-extra-large;
		height: 7px;
		width: 100%;
	}

	&__indicator {
		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			background-color: $base-color;
			border-radius: $border-radius-extra-large;
			height: 7px;
			width: var(--width);
		}
	}

	&__text--aside {
		font-weight: $font-weight-semibold;
		margin: ml(3);
	}

	&__text {
		font-weight: $font-weight-semibold;
		margin: mb(2);
	}
}
</style>
