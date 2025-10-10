<template>
	<div class="pin-input__container">
		<input
			v-for="(number, index) in length"
			:id="`pin-input${number}`"
			:key="index"
			ref="inputs"
			v-model="innerValue[number - 1]"
			:type="visible ? 'text' : 'password'"
			maxlength="1"
			class="pin-input"
			:class="computedClass"
			autocomplete="off"
			@keydown.delete.stop="handleBack(number)"
			@keypress="(event) => changeInputContent(event, number)"
			@input="(event) => handleInput(event, number)"
			@focus="fixCursorPosition(number)"
		>
	</div>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed, watch, useTemplateRef } from 'vue';

const props = defineProps({
	modelValue: {
		type: String,
		default: '',
	},
	/**
	 * Especifica a quantidade de caracteres no PIN.
	 */
	length: {
		type: Number,
		default: 4,
	},
	/**
	 * Especifica o estado do TextInput. As opções são 'default', 'valid' e 'invalid'.
	 */
	state: {
		type: String,
		default: 'default',
	},
	/**
	 * Especifica se os caracteres do PIN são visíveis ou não.
	 */
	visible: {
		type: Boolean,
		default: false,
	},
	/**
	 * Especifica se o PinInput deve ser versão mobile.
	 */
	mobile: {
		type: Boolean,
		default: false,
	},
});

const emits = defineEmits(['update:modelValue']);

const innerValue = ref(new Array(props.length));
const inputRefs = useTemplateRef('inputs');

const computedClass = computed(() => {
	let classToUse = '';

	switch (props.state) {
		case 'valid':
			classToUse = 'pin-input--valid';
			break;
		case 'invalid':
			classToUse = 'pin-input--invalid';
			break;
		default:
			classToUse = 'pin-input';
	}

	return props.mobile ? `${classToUse} pin-input--mobile` : classToUse;
});

watch(
	() => props.modelValue,
	(value) => {
		innerValue.value = value.split('');
	}
);

function handleInput(event, index) {
	let stringifiedPin = innerValue.value.join('');
	const length = props.length;

	if (index < length && event.inputType !== 'deleteContentBackward') {
		let nextInput = inputRefs.value[index - 1];
		nextInput.focus();
	}

	if (stringifiedPin.length === length) {
		emits('update:modelValue', stringifiedPin);
	}
}

function handleBack(index) {
	if (index > 1) {
		innerValue.value[index - 1] = '';
		let previousInput = inputRefs.value[index - 2];

		setTimeout(() => {
			previousInput.focus();
		}, 150);
	}
}

function fixCursorPosition(index) {
	let input = inputRefs.value[index - 1];

	setTimeout(() => {
		input.setSelectionRange(1, 1);
	}, 3);
}

function changeInputContent(event, index) {
	if (event.key === 'Enter' || event.charCode === 32) {
		event.preventDefault();
		return;
	}

	const length = props.length;

	innerValue.value.splice(index - 1, 1, event.key);
	if (index < length) {
		inputRefs.value[index].focus();
	}

	if (index === length && innerValue.value.join('').length === length) {
		emits('update:modelValue', innerValue.value.join(''));
	}
}
</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;
.pin-input {
	height: 40px;
	box-sizing: border-box;
	width: 36px;
	border-radius: tokens.$border-radius-extra-small;
	border: 1px solid tokens.$n-100;
	text-align: center;
	font-size: 1.5em;
	transition: tokens.$interaction;

	&--mobile {
		@extend .pin-input;
		height: 48px;
		width: 42px;
	}

	&__container {
		display: flex;
		gap: 8px;
	}

	&:focus-visible {
		outline-color: tokens.$bn-300;
		color: tokens.$bn-300;
		transition: tokens.$interaction;
	}

	&--valid {
		@extend .pin-input;
		border: 1px solid tokens.$gp-500;

		&:focus-visible {
			outline-color: tokens.$gp-500;
		}
	}

	&--invalid {
		@extend .pin-input;
		border: 1px solid tokens.$rc-500;

		&:focus-visible {
			outline-color: tokens.$rc-500;
		}
	}
}
</style>
