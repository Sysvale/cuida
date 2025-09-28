<template>
	<button
		ref="componentRef"
		class="flat-button__container"
		:class="computedStyle"
		@click="clickHandler"
	>
		<!-- @slot Slot padrão utilizado para exibir texto do botão. -->
		<slot>
			{{ text }}
		</slot>
	</button>
</template>

<script setup>
import { computed, useTemplateRef } from 'vue';

defineOptions({ name: 'FlatButton' });

const props = defineProps({
	/**
	* A variante de cor.
	* @values green, teal, blue, indigo, violet, pink, red, orange, amber, dark
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
		default: 'Flat Button',
	},
	/**
	* Controla a disponibilidade do Botão.
	*/
	disabled: {
		type: Boolean,
		default: false,
	},
});

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

const componentRef = useTemplateRef('componentRef');

const predefinedColor = computed(() => {
	if (predefinedColors.includes(props.variant)) {
		return `flat-button--${props.variant}`;
	}
	return 'flat-button--green';
});

const computedStyle = computed(() => {
	const disabled = props.disabled ? '--disabled' : '--active';
	return `${predefinedColor.value}${disabled}`;
});

const emit = defineEmits(['click']);

const clickHandler = (event) => {
	if (props.disabled) {
		return;
	}
	/**
	* Evento que indica que o FlatButton foi clicado
	* @event click
	* @type {Event}
	*/
	emit('click', event);
};

/* EXPOSE */
defineExpose({
	componentRef,
});
</script>

<style lang="scss" scoped>
@use 'sass:color';
@use '../assets/sass/tokens/index' as tokens;
.flat-button {
	&__container {
		font-weight: tokens.$font-weight-semibold;
		border: none;
		cursor: pointer;
		background-color: transparent;

		&:focus {
			outline: none !important;
		}
	}

	$colors: (
		'--green': (
			'active': tokens.$gp-500,
			'disabled': tokens.$gp-300,
		),
		'--teal': (
			'active': tokens.$ta-500,
			'disabled': tokens.$ta-300,
		),
		'--turquoise': (
			'active': tokens.$ts-500,
			'disabled': tokens.$ts-300,
		),
		'--blue': (
			'active': tokens.$bn-500,
			'disabled': tokens.$bn-300,
		),
		'--indigo': (
			'active': tokens.$in-500,
			'disabled': tokens.$in-300,
		),
		'--violet': (
			'active': tokens.$vr-500,
			'disabled': tokens.$vr-300,
		),
		'--pink': (
			'active': tokens.$pp-500,
			'disabled': tokens.$pp-300,
		),
		'--red': (
			'active': tokens.$rc-500,
			'disabled': tokens.$rc-300,
		),
		'--orange': (
			'active': tokens.$og-500,
			'disabled': tokens.$og-300,
		),
		'--amber': (
			'active': tokens.$al-500,
			'disabled': tokens.$al-300,
		),
		'--dark': (
			'active': tokens.$n-800,
			'disabled': tokens.$n-400,
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
						color: color.adjust($disabled-color, $lightness: -5%);
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
