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
		color: $t-600;
		background-color: $t-200;
		border: 1px solid $t-300;
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
		color: $v-600;
		background-color: $v-200;
		border: 1px solid $v-400;
	}

	&--pink {
		color: $p-600;
		background-color: $p-200;
		border: 1px solid $p-300;
	}

	&--red {
		color: $v-600;
		background-color: $v-300;
		border: 1px solid $v-400;
	}

	&--orange {
		color: $o-600;
		background-color: $o-200;
		border: 1px solid $o-300;
	}

	&--yellow {
		color: $a-600;
		background-color: $a-200;
		border: 1px solid $a-300;
	}

	&--gray {
		color: $cinza-9;
		background-color: $cinza-2;
		border: 1px solid $cinza-5;
	}
}
</style>
