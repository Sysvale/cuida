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
		 * Especifica o texto a ser apresentado no corpo do botão.
		 */
		text: {
			type: String,
			default: 'Lorem ipsum',
		},
		/**
		 * Controla a disponibilidade do Botão.
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Especifica se a versão do Botão é a secundária.
		 */
		secondary: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		predefinedColor() {
			if (this.secondary) {
				return 'button--secondary';
			}

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
			const disabled = this.disabled ? '--disabled' : '--active';

			return `${this.predefinedColor}${disabled} ${this.predefinedSize}`;
		},
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
	&--secondary {
		&--active {
			background-color: $n-10;
			color: $n-700;
			border: 1px solid $n-50 !important;
			
			&:hover {
				@extend .button--secondary--active;
				background-color: $n-20;
			}
		}

		&--disabled {
			background-color: $n-10;
			color: $n-300;
			border: 1px solid $n-30 !important;
		}
	}

	&__container {
		font-weight: $font-weight-semibold;
		border: none;

		&:focus {
			outline: none !important;
		}
	}

	$colors: (
		'--teal': (
			'active': $ts-400,
			'disabled': $ts-300,
		),
		'--green': (
			'active': $gp-400,
			'disabled': $gp-300,
		),
		'--blue': (
			'active': $bn-400,
			'disabled': $bn-300,
		),
		'--indigo': (
			'active': $in-400,
			'disabled': $in-300,
		),
		'--violet': (
			'active': $vr-400,
			'disabled': $vr-300,
		),
		'--pink': (
			'active': $pp-400,
			'disabled': $pp-300,
		),
		'--red': (
			'active': $rc-400,
			'disabled': $rc-300,
		),
		'--orange': (
			'active': $og-400,
			'disabled': $og-300,
		),
		'--amber': (
			'active': $al-400,
			'disabled': $al-300,
		),
	);

	@each $color, $variants in $colors {
		&#{$color} {
			@each $state, $disabled-color in $variants {
				&--#{$state} {
					background-color: $disabled-color;
					color: $n-0;
				}

				&--#{$state}:hover {
					background-color: darken($disabled-color, 5%);
					color: $n-0;
				}
			}

			&--disabled {
				cursor: default;
			}
		}
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
