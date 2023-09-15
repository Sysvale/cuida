<template>
	<span id="cds-link-button">
		<button
			class="link-button__container"
			:class="computedStyle"
			@click="clickHandler()"
		>
			<!-- @slot Slot padrão utilizado para exibir texto do botão. -->
			<slot>
				{{ text }}
			</slot>
		</button>
	</span>
</template>

<script>
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
		 * Especifica o texto a ser apresentado no corpo do botão.
		 * Este texto será exibido apenas se o slot default não for utilizado.
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
	},
	data() {
		return {
			predefinedColors: [
				'green',
				'teal',
				'turquoise',
				'blue',
				'indigo',
				'violet',
				'pink',
				'red',
				'orange',
				'amber',
			],
		};
	},

	computed: {
		predefinedColor() {
			if (this.predefinedColors.indexOf(this.variant) > -1) {
				return `link-button--${this.variant}`;
			}

			return 'link-button--green';
		},

		computedStyle() {
			const disabled = this.disabled ? '--disabled' : '--active';

			return `${this.predefinedColor}${disabled}`;
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
@import '../assets/sass/tokens.scss';
.link-button {
	&__container {
		font-weight: $font-weight-semibold;
		border: none;
		cursor: pointer;
		background-color: transparent;

		&:focus {
			outline: none !important;
		}
	}

	$colors: (
		'--green': (
			'active': $gp-500,
			'disabled': $gp-300,
		),
		'--teal': (
			'active': $ta-500,
			'disabled': $ta-300,
		),
		'--turquoise': (
			'active': $ts-500,
			'disabled': $ts-300,
		),
		'--blue': (
			'active': $bn-500,
			'disabled': $bn-300,
		),
		'--indigo': (
			'active': $in-500,
			'disabled': $in-300,
		),
		'--violet': (
			'active': $vr-500,
			'disabled': $vr-300,
		),
		'--pink': (
			'active': $pp-500,
			'disabled': $pp-300,
		),
		'--red': (
			'active': $rc-500,
			'disabled': $rc-300,
		),
		'--orange': (
			'active': $og-500,
			'disabled': $og-300,
		),
		'--amber': (
			'active': $al-500,
			'disabled': $al-300,
		),
	);

	@each $color, $variants in $colors {
		&#{$color} {
			@each $state, $disabled-color in $variants {
				&--#{$state} {
					color: $disabled-color;
				}

				@if $state == 'active' {
					&--#{$state}:hover {
						color: darken($disabled-color, 5%);
					}
				}
			}

			&--disabled {
				cursor: default;
			}
		}
	}
}
</style>
