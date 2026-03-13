<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<button
		v-cdstip="tooltipDisabled"
		class="button__container"
		:class="computedStyle"
		:disabled="disabled"
		@click.stop="clickHandler"
	>
		<CdsSpinner
			v-if="loading"
			:variant="computedSpinnerVariant"
			size="sm"
			class="button__prepend"
		/>
		<div
			v-if="hasSlot($slots, 'prepend') && !loading"
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
			v-if="hasSlot($slots, 'append')"
			class="button__append"
		>
			<!-- @slot Slot para exibir append do botão. -->
			<slot name="append" />
		</div>
	</button>
</template>

<script setup>
import { computed } from 'vue';
import hasSlot from '../utils/methods/hasSlot';

defineOptions({ name: 'CdsButton' });

const predefinedColors = [
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
];
const predefinedSizes = ['sm', 'md', 'lg'];

const props = defineProps({
	/**
	 * A variante de cor. São 10 variantes:
	 * @values green, teal, blue, indigo, violet, pink, red, orange, amber, dark
	 */
	variant: {
		type: String,
		default: 'green',
	},
	/**
	 * Especifica o tamanho do botão. São 3 tamanhos implementados:
	 * @values 'sm', 'md', 'lg'
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
		default: 'Click here',
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
	 * Especifica se o botão deve mostrar spinner de carregamento.
	 * Caso o botão seja do tipo ghost ou secondary a variante do spinner é a mesma passada na prop variant.
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
});

const emits = defineEmits([
	/**
	 * Evento que indica que o Botão foi clicado
	 * @event button-click
	 * @type {Event}
	 */
	'button-click',
]);

const widthResolver = computed(() => {
	return props.block ? '100%' : 'max-content';
});
const tooltipDisabled = computed(() => {
	return props.disabled && props.tooltipText !== '' ? props.tooltipText : null;
});
const predefinedColor = computed(() => {
	if (props.ghost) {
		return 'button--ghost';
	}

	if (props.secondary) {
		return 'button--secondary';
	}

	if (predefinedColors.indexOf(props.variant) > -1) {
		return `button--${props.variant}`;
	}

	return 'button--green';
});
const predefinedSize = computed(() => {
	if (predefinedSizes.indexOf(props.size) > -1) {
		return `button-size--${props.size}`;
	}
	return 'button-size--md';
});
const computedStyle = computed(() => {
	const disabled = props.disabled ? '--disabled' : '--active';

	return `${predefinedColor.value}${disabled} ${predefinedSize.value}`;
});
const computedSpinnerVariant = computed(() => {
	return props.secondary || props.ghost ? props.variant : 'white';
});

function clickHandler() {
	if (props.disabled) {
		return;
	}
	emits('button-click', true);
}
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
			outline: none !important;

			&:hover {
				@extend .button--secondary--active;
				background-color: tokens.$n-20;
			}
		}

		&--active:focus-visible {
			box-shadow: 0 0 0 2px tokens.$n-30 inset;
		}

		&--active:focus:not(:focus-visible) {
			box-shadow: none;
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
			outline: none !important;

			&:focus-visible {
				box-shadow: 0 0 0 2px tokens.$n-40 inset;
			}

			&:focus:not(:focus-visible) {
				box-shadow: none;
			}
		}

		&:hover {
			@extend .button--ghost--active;
			background-color: tokens.$n-10;
		}

		&--disabled {
			cursor: default !important;
			background: none;
			color: tokens.$n-300;
		}
	}

	&__prepend {
		margin: tokens.mr(3);
	}

	&__loader {
		margin: tokens.mr(3);
	}

	&__append {
		margin: tokens.ml(3);
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
			'focus': tokens.$gp-600,
		),
		'--teal': (
			'active': tokens.$ta-400,
			'disabled': tokens.$ta-300,
			'focus': tokens.$ta-600,
		),
		'--turquoise': (
			'active': tokens.$ts-400,
			'disabled': tokens.$ts-300,
			'focus': tokens.$ts-600,
		),
		'--blue': (
			'active': tokens.$bn-400,
			'disabled': tokens.$bn-300,
			'focus': tokens.$bn-600,
		),
		'--indigo': (
			'active': tokens.$in-400,
			'disabled': tokens.$in-300,
			'focus': tokens.$in-600,
		),
		'--violet': (
			'active': tokens.$vr-400,
			'disabled': tokens.$vr-300,
			'focus': tokens.$vr-600,
		),
		'--pink': (
			'active': tokens.$pp-400,
			'disabled': tokens.$pp-300,
			'focus': tokens.$pp-600,
		),
		'--red': (
			'active': tokens.$rc-400,
			'disabled': tokens.$rc-300,
			'focus': tokens.$rc-600,
		),
		'--orange': (
			'active': tokens.$og-400,
			'disabled': tokens.$og-300,
			'focus': tokens.$og-600,
		),
		'--amber': (
			'active': tokens.$al-400,
			'disabled': tokens.$al-300,
			'focus': tokens.$al-600,
		),
		'--dark': (
			'active': tokens.$n-700,
			'disabled': tokens.$n-500,
			'focus': tokens.$n-400,
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

		@if map-has-key($variants, 'focus') {
			&#{$color}--active:focus-visible {
				box-shadow: 0 0 0 2px map-get($variants, 'focus') inset;
			}

			&#{$color}--active:focus:not(:focus-visible) {
				box-shadow: none;
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