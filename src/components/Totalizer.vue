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
		font-weight: $peso-de-fonte-medium;
		color: $n-800;
	}

	&__subtitle {
		@include legenda;
		font-weight: $peso-de-fonte-medium;
		color: $n-600;
	}

	&__icon {
		display: flex;
		padding: 12px;
		border-radius: 100%;
		width: 50px;
		height: 50px;
		align-self: center;
		align-items: center;
		justify-content: center;
		color: $bn-400;
		background-color: $bn-200;

		&--right {
			margin-left: 1rem !important;
		}

		&--left {
			margin-right: 1rem !important;
		}

		&--blue {
			color: $bn-400;
			background-color: $bn-100;
		}

		&--turquoise {
			color: $ts-500;
			background-color: $ts-100;
		}

		&--green {
			color: $gp-500;
			background-color: $gp-100;
		}

		&--purple {
			color: $vr-500;
			background-color: $vr-100;
		}

		&--pink {
			color: $pp-500;
			background-color: $pp-100;
		}

		&--red {
			color: $rc-500;
			background-color: $rc-100;
		}

		&--orange {
			color: $og-500;
			background-color: $og-100;
		}

		&--yellow {
			color: $al-500;
			background-color: $al-100;
		}

		&--gray {
			color: $n-200;
			background-color: $n-20;
		}

		& .b-icon {
			min-width: 20px;
			min-height: 20px;
		}
	}
}
</style>
