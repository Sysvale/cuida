<template>
	<span id="cds-button">
		<button
			class="button__container"
			:class="computedStyle"
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

		computedStyle() {
			const disabled = this.disabled ? 'button__container--disabled' : '';

			return `${this.predefinedColor} ${this.predefinedSize} ${disabled}`;
		}
	},

	methods: {
		clickHandler() {
			if (this.disabled) {
				return;
			}
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
		font-weight: $font-weight-semibold;
		border: none;
	}

	&--disabled {
		background-color: $gp-300;
		cursor: default;
	}

	&--teal {
		color: $n-0;
		background-color: $ts-400;
	}

	&--green {
		color: $n-0;
		background-color: $gp-400;
	}

	&--blue {
		color: $n-0;
		background-color: $bn-400;
	}

	&--indigo {
		color: $n-0;
		background-color: $in-400;
	}

	&--violet {
		color: $n-0;
		background-color: $vr-400;
	}

	&--pink {
		color: $n-0;
		background-color: $pp-400;
	}

	&--red {
		color: $n-0;
		background-color: $rc-400;
	}

	&--orange {
		color: $n-0;
		background-color: $og-400;
	}

	&--amber {
		color: $n-0;
		background-color: $al-400;
	}
}

.button-size {
	&--sm {
		font-size: 12px;
		padding: pYX(2, 4);
		border-radius: $border-radius-lil;
	}

	&--md {
		font-size: 14px;
		padding: pYX(3, 6);
		border-radius: $border-radius-extra-small;
	}

	&--lg {
		font-size: 18px;
		padding: pYX(3, 6);
		border-radius: $border-radius-extra-small;
	}
}

</style>
