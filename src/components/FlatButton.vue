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

const props = defineProps({
	/**
	* A variante de cor. São 11 variantes implementadas: 'green', 'teal', 'turquoise',
	* 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber' e 'dark'.
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
	* Evento que indica que o Flat Button foi clicado
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
@import '../assets/sass/tokens.scss';
.flat-button {
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
		'--dark': (
			'active': $n-800,
			'disabled': $n-400,
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
