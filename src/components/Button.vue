<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<button
		v-cdstip="tooltipDisabled"
		class="button__container"
		:class="computedStyle"
		@click.stop="clickHandler"
	>
		<cds-spinner
			v-if="loading"
			variant="white"
			size="sm"
			class="button__loader"
		/>

		<!-- @slot Slot padrão utilizado para exibir texto do botão. -->
		<slot>
			{{ text }}
		</slot>
	</button>
</template>

<script>
import CdsSpinner from '../components/Spinner.vue';
import Cdstip from '../utils/directives/cdstip';

export default {

	directives: {
		cdstip: Cdstip,
	},

	components: {
		CdsSpinner,
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
		* Quando true, torna a largura do botão fluida
		*/
		block: {
			type: Boolean,
			default: false,
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
		/**
		 * Texto a ser exibido como tooltip com o hover do botão quando a prop disabled estiver ativa.
		 */
		tooltipText: {
			type: String,
			default: null,
		},
		/**
		 * Especifica se a versão do Botão é a secundária.
		 */
		secondary: {
			type: Boolean,
			default: false,
		},
		/**
		 * Especifica se a versão do Botão é a secundária.
		 */
		loading: {
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
				'dark',
			],
			predefinedSizes: [
				'sm',
				'md',
				'lg',
			],
		};
	},

	computed: {
		widthResolver() {
			return this.block ? '100%' : 'max-content';
		},

		tooltipDisabled() {
			return this.disabled && this.tooltipText !== '' ? this.tooltipText : null;
		},

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
			* @event button-click
			* @type {Event}
			*/
			this.$emit('button-click', true);
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';
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
			cursor: default !important;
			background-color: $n-10;
			color: $n-300;
			border: 1px solid $n-30 !important;
		}
	}

	&__loader {
		margin: mr(3);
	}

	&__container {
		font-family: Satoshi, Inter, Avenir, Helvetica, Arial, sans-serif;
		display: flex;
		align-items: center;
		justify-content: center;
		width: v-bind(widthResolver);
		border: none;
		cursor: pointer;

		&:focus {
			outline: none !important;
		}
	}

	$colors: (
		'--green': (
			'active': $gp-400,
			'disabled': $gp-300,
		),
		'--teal': (
			'active': $ta-400,
			'disabled': $ta-300,
		),
		'--turquoise': (
			'active': $ts-400,
			'disabled': $ts-300,
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
		'--dark': (
			'active': $n-700,
			'disabled': $n-500,
		),
	);

	@each $color, $variants in $colors {
		&#{$color} {
			@each $state, $disabled-color in $variants {
				&--#{$state} {
					background-color: $disabled-color;
					color: $n-0;
				}

				@if $state == 'active' {
					&--#{$state}:hover {
						background-color: darken($disabled-color, 5%);
						color: $n-0;
					}
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
		@include button-3;
		padding: pYX(2, 4);
		border-radius: $border-radius-lil;
	}

	&--md {
		@include button-2;
		padding: pYX(3, 6);
		border-radius: $border-radius-extra-small;
	}

	&--lg {
		@include button-1;
		padding: pYX(4, 8);
		border-radius: $border-radius-extra-small;
	}
}
</style>
