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
			class="button__prepend"
		/>
		<div
			v-if="hasPrependSlot && !loading"
			class="button__prepend"
		>
			<!-- @slot Slot para exibir prepend do botão. -->
			<slot name="prepend" />
		</div>
		<!-- @slot Slot padrão utilizado para exibir texto do botão. -->
		<slot>
			{{ text }}
		</slot>
		<div
			v-if="hasAppendSlot"
			class="button__append"
		>
			<!-- @slot Slot para exibir append do botão. -->
			<slot name="append" />
		</div>
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
		/**
		* Especifica se o componente deve ser exibido na sua versão ghost.
		*/
		ghost: {
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
			if (this.ghost) {
				return 'button--ghost';
			}

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

		hasPrependSlot(){
			return Object.keys(this.$slots).some(slot => slot === 'prepend');
		},

		hasAppendSlot(){
			return Object.keys(this.$slots).some(slot => slot === 'append');
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
@use 'sass:color';
@use '../assets/sass/tokens/index' as tokens;

.button {
	&--secondary {
		&--active {
			background-color: tokens.$n-10;
			color: tokens.$n-700;
			border: 1px solid tokens.$n-50 !important;
			
			&:hover {
				@extend .button--secondary--active;
				background-color: tokens.$n-20;
			}
		}

		&--disabled {
			cursor: default !important;
			background-color: tokens.$n-10;
			color: tokens.$n-300;
			border: 1px solid tokens.$n-30 !important;
		}
	}

	&--ghost {
		&--active {
			background: none;
			cursor: pointer;
		}

		&:hover {
			@extend .button--ghost--active;
			background-color: $n-10;
		}

		&--disabled {
			cursor: default !important;
			background: none;
			color: $n-300;
		}
	}

	&__prepend {
		margin: mr(3);
	}

	&__loader {
		margin: tokens.mr(3);
	}

	&__append {
		margin: ml(3);
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
			'active': tokens.$gp-400,
			'disabled': tokens.$gp-300,
		),
		'--teal': (
			'active': tokens.$ta-400,
			'disabled': tokens.$ta-300,
		),
		'--turquoise': (
			'active': tokens.$ts-400,
			'disabled': tokens.$ts-300,
		),
		'--blue': (
			'active': tokens.$bn-400,
			'disabled': tokens.$bn-300,
		),
		'--indigo': (
			'active': tokens.$in-400,
			'disabled': tokens.$in-300,
		),
		'--violet': (
			'active': tokens.$vr-400,
			'disabled': tokens.$vr-300,
		),
		'--pink': (
			'active': tokens.$pp-400,
			'disabled': tokens.$pp-300,
		),
		'--red': (
			'active': tokens.$rc-400,
			'disabled': tokens.$rc-300,
		),
		'--orange': (
			'active': tokens.$og-400,
			'disabled': tokens.$og-300,
		),
		'--amber': (
			'active': tokens.$al-400,
			'disabled': tokens.$al-300,
		),
		'--dark': (
			'active': tokens.$n-700,
			'disabled': tokens.$n-500,
		),
	);

	@each $color, $variants in $colors {
		&#{$color} {
			@each $state, $disabled-color in $variants {
				&--#{$state} {
					background-color: $disabled-color;
					color: tokens.$n-0;
				}

				@if $state == 'active' {
					&--#{$state}:hover {
						background-color: color.adjust($disabled-color, $lightness: -5%);
						color: tokens.$n-0;
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
		@include tokens.button-3;
		padding: tokens.pYX(2, 4);
		height: 32px;
		border-radius: tokens.$border-radius-lil;
	}

	&--md {
		@include tokens.button-2;
		padding: tokens.pYX(3, 6);
		height: 40px;
		border-radius: tokens.$border-radius-extra-small;
	}

	&--lg {
		@include tokens.button-1;
		padding: tokens.pYX(4, 8);
		height: 48px;
		border-radius: tokens.$border-radius-extra-small;
	}
}
</style>
