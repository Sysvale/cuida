<template>
	<div
		class="badge__container"
		:class="predefinedStyle"
	>
		<div class="badge__content">
			<!-- @slot Slot padrão utilizado para exibir o conteúdo dentro da badge -->
			<slot/>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * A variante da Badge. São 9 variantes: 'turquoise', 'green', 'blue',
		 * 'purple', 'pink', 'red', 'orange', 'yellow' e 'gray'.
		 */
		variant: {
			type: String,
			default: 'gray',
		},
	},

	data() {
		return {
			predefinedColors: [
				'turquoise',
				'green',
				'blue',
				'purple',
				'pink',
				'red',
				'orange',
				'yellow',
				'gray',
			],
		};
	},

	computed: {
		predefinedStyle() {
			if (this.predefinedColors.indexOf(this.variant) > -1) {
				return `badge--${this.variant}`;
			}
			return 'badge--gray';
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.badge {
	&__container {
		border-radius: 50px !important;
		width: fit-content;
		padding: 0px 8px;
	}

	&__content {
		font-weight: 600 !important;
	}

	&--turquoise {
		color: $turquesa-perry-dark-2;
		background-color: $turquesa-perry-light-2;
		border: 1px solid $turquesa-perry-light-1;
	}

	&--green {
		color: $g-700;
		background-color: $g-200;
		border: 1px solid $g-300;
	}

	&--blue {
		color: $b-700;
		background-color: $b-200;
		border: 1px solid $b-300;
	}

	&--purple {
		color: $roxo-thanos-dark-2;
		background-color: $roxo-thanos-light-2;
		border: 1px solid $roxo-thanos-light-1;
	}

	&--pink {
		color: $pantera-cor-de-rosa-dark-2;
		background-color: $pantera-cor-de-rosa-light-2;
		border: 1px solid $pantera-cor-de-rosa-light-1;
	}

	&--red {
		color: $vermelho-mario-dark-2;
		background-color: $vermelho-mario-light-2;
		border: 1px solid $vermelho-mario-light-1;
	}

	&--orange {
		color: $laranja-naruto-dark-2;
		background-color: $laranja-naruto-light-2;
		border: 1px solid $laranja-naruto-light-1;
	}

	&--yellow {
		color: $amarelo-pikachu-dark-2;
		background-color: $amarelo-pikachu-light-2;
		border: 1px solid $amarelo-pikachu-light-1;
	}

	&--gray {
		color: $cinza-9;
		background-color: $cinza-2;
		border: 1px solid $cinza-5;
	}
}
</style>
