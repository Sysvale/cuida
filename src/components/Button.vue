<template>
	<span id="cds-button">
		<button
			class="button__container"
			:class="predefinedColor + ' ' + predefinedSize"
			@click="clickHandler()"
		>
			{{ text }}
		</button>
	</span>
</template>

<script>
export default {
	data() {
		return {
			predefinedColors: [
				'teal',
				'green',
				'blue',
				'indigo',
				'violet',
				'pink',
				'red',
				'orange',
				'amber',
			],
			predefinedSizes: [
				'sm',
				'md',
				'lg',
			],
		};
	},

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
		 * Especifica o tamanho do botão. São 3 tamanhos implementados: 'sm', 'md', 'lg'.
		 */
		size: {
			type: String,
			default: 'md',
		},
		/**
		 * Especifica se o botão é protagonista.
		 */
		primary: {
			type: Boolean,
			default: true,
		},
		/**
		 * Especifica o texto a ser apresentado no corpo do botão.
		 */
		text: {
			type: String,
			default: 'Lorem ipsum',
		},
		/**
		 * Controla a disponibilidade do FilterPill
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		predefinedColor() {
			if (this.predefinedColors.indexOf(this.variant) > -1) {
				return `button--${this.variant}`;
			}
			return 'button--green';
		},

		predefinedSize() {
			if (this.predefinedSizes.indexOf(this.size) > -1) {
				return `button-size--${this.size}`;
			}
			return 'button-size--md';
		},
	},

	methods: {
		clickHandler() {
			/**
			* Evento que indica que o Botão foi clicado
			* @event click
			* @type {Event}
			*/
			this.$emit('click', true);
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';
.button {
	&__container {
		border-radius: 50px !important;
		min-width: 300px;
		min-height: 50px;
		padding: pYX(0, 2);
		font-weight: 500 !important;
		display: block;
		@include body-2;
	}

	&--turquoise {
		color: $ts-700;
		background-color: $ts-100;
		border: 1px solid $ts-400;
	}

	&--green {
		color: $gp-700;
		background-color: $gp-100;
		border: 1px solid $gp-400;
	}

	&--blue {
		color: $bn-700;
		background-color: $bn-100;
		border: 1px solid $bn-400;
	}

	&--indigo {
		color: $in-700;
		background-color: $in-100;
		border: 1px solid $in-400;
	}

	&--violet {
		color: $vr-700;
		background-color: $vr-100;
		border: 1px solid $vr-400;
	}

	&--pink {
		color: $pp-700;
		background-color: $pp-100;
		border: 1px solid $pp-400;
	}

	&--red {
		color: $rc-700;
		background-color: $rc-100;
		border: 1px solid $rc-400;
	}

	&--orange {
		color: $og-700;
		background-color: $og-100;
		border: 1px solid $og-400;
	}

	&--amber {
		color: $al-700;
		background-color: $al-100;
		border: 1px solid $al-500;
	}
}

.button-size {
	&--sm {
		font-size: 12px;
		padding: 0.5rem 1rem;
	}

	&--md {
		font-size: 14px;
		padding: 0.75rem 1.5rem;
	}

	&--lg {
		font-size: 16px;
		padding: 1rem 2rem;
	}
}

</style>
