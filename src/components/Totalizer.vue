<template>
	<div
		class="totalizer"
	>
		<div
			v-if="iconSide === 'left'"
		>
			<div
				v-if="!!this.$slots.icon"
				class="totalizer__icon totalizer__icon--left"
				:class="`totalizer__icon--${variant}`"
			>
				<!-- @slot slot para a renderização do ícone do totalizer. -->
				<slot name="icon" />
			</div>
		</div>

		<div>
			<div
				v-if="!!this.$slots.value"
				class="totalizer__value"
			>
				<!-- @slot slot para a renderização do valor principal
				do totalizer. -->
				<slot name="value" />
			</div>

			<div
				v-if="!!this.$slots.subtitle"
				class="totalizer__subtitle"
			>
				<!-- @slot slot para a renderização do subtitulo do totalizer. -->
				<slot name="subtitle" />
			</div>
		</div>

		<div
			v-if="iconSide === 'right'"
		>
			<div
				v-if="!!this.$slots.icon"
				class="totalizer__icon totalizer__icon--right"
				:class="`totalizer__icon--${variant}`"
			>
				<!-- @slot slot para a renderização do ícone do totalizer. -->
				<slot name="icon" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * Variante do totalizer. São 9 variantes: 'turquoise', 'green', 'blue',
		 * 'purple', 'pink', 'red', 'orange', 'yellow' e 'gray'.
		 */
		variant: {
			type: String,
			default: 'gray',
		},
		/**
		 * Prop que controla o posicionamento do ícone no totalizer.
		 */
		iconSide: {
			type: String,
			default: 'right',
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.totalizer {
	display: flex;
	align-items: center;
	padding: 1rem !important;
	border-radius: 16px;
	border: 1px solid #DDE2E7;
	width: fit-content;

	&__value {
		@include titulo-2;
		@include peso-de-fonte-medium;
		color: $cinza-8;
	}

	&__subtitle {
		@include legenda;
		@include peso-de-fonte-medium;
		color: $cinza-6;
	}

	&__icon {
		display: flex;
		padding: pa(3);
		border-radius: 100%;
		width: 50px;
		height: 50px;
		align-self: center;
		align-items: center;
		justify-content: center;
		color: $azul-sonic-base;
		background-color: $azul-sonic-light-2;

		&--right {
			margin-left: 1rem !important;
		}

		&--left {
			margin-right: 1rem !important;
		}

		&--blue {
			color: $azul-sonic-base;
			background-color: $azul-sonic-light-2;
		}

		&--turquoise {
			color: $turquesa-perry-base;
			background-color: $turquesa-perry-light-2;
		}

		&--green {
			color: $verde-piccolo-base;
			background-color: $verde-piccolo-light-2;
		}

		&--purple {
			color: $roxo-thanos-base;
			background-color: $roxo-thanos-light-2;
		}

		&--pink {
			color: $pantera-cor-de-rosa-base;
			background-color: $pantera-cor-de-rosa-light-2;
		}

		&--red {
			color: $vermelho-mario-base;
			background-color: $vermelho-mario-light-2;
		}

		&--orange {
			color: $laranja-naruto-base;
			background-color: $laranja-naruto-light-2;
		}

		&--yellow {
			color: $amarelo-pikachu-base;
			background-color: $amarelo-pikachu-light-2;
		}

		&--gray {
			color: $cinza-5;
			background-color: $cinza-2;
		}

		& .b-icon {
			min-width: 20px;
			min-height: 20px;
		}
	}
}
</style>
