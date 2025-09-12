<template>
	<div
		class="mobile-stepper-input__container"
	>
		<div :class="stepperInputStatusClasses">
			<input
				ref="mobile-stepper-input__field"
				v-model="internalValue"
				class="mobile-stepper-input__field"
				:class="inputWidthClass"
				type="number"
				:disabled="$attrs.disabled"
				@focus="isBeingFocused = true"
				@blur="isBeingFocused = false"
			>
			
			<span
				v-if="$attrs.suffix"
				class="mobile-stepper-input__suffix"
			>
				<!-- @slot Slot e prop de mesmo nome utilizados para adicionar sufixo ao stepperInput. O valor padrão é `%`. O valor passado por slot tem maior precedência que o valor enviado para a prop.-->
				<slot name="suffix">
					{{ $attrs.suffix }}
				</slot>
			</span>
		</div>

		<IconButton
			v-long-click="() => emits('subtract')"
			icon="minus-outline"
			size="lg"
			:disabled="$attrs.disabled"
			@cds-click="emits('subtract')"
		/>
		<IconButton
			v-long-click="() => emits('add')"
			icon="plus-outline"
			size="lg"
			:disabled="$attrs.disabled"
			@cds-click="emits('add')"
		/>
	</div>
</template>

<script setup>

defineOptions({ name: 'MobileStepperInput' });

import { ref, computed, watch, useAttrs } from 'vue';
import IconButton from './IconButton.vue';

import { useInputStatusClasses } from '../utils/composables/useInputStatusClasses.js';
import { longClickDirective } from '@sysvale/vue3-long-click';

const emits = defineEmits({
	'add': null,
	'subtract': null,
});

const model = defineModel('modelValue', {
	type: Number,
});

const attrs = useAttrs();

const internalValue = ref(0);
const isBeingFocused = ref(false);
const vLongClick = longClickDirective({ delay: 400, interval: 50 });
const stepperInputStatusClasses = useInputStatusClasses('mobile-stepper-input', attrs.state, attrs.disabled, isBeingFocused);

const widthResolver = computed(() => {
	return (attrs.width === 'fluid') || attrs.fluid ? '100%' : 'fit-content';
});

const inputWidthClass = computed(() => {
	if (attrs.fluid) return `mobile-stepper-input__field--fluid`;
	return `mobile-stepper-input__field--${attrs.width}`;
});

const inputPadding = computed(() => {
	if (attrs.suffix) return '8px 2px 8px 8px';
	return '8px';
});

const inputMargin = computed(() => {
	if (attrs.suffix) return '0';
	return '8px';
});

watch(internalValue, (newValue) => {
	if (newValue === model.value) return;
	model.value = newValue;
});

watch(model, (newValue) => {
	internalValue.value = newValue;
});
</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.mobile-stepper-input {
	display: flex;
	outline: 1px solid tokens.$n-50;
	border-radius: 6px;
	height: 40px;
	width: v-bind(widthResolver);
	background: tokens.$n-0;

	&__container {
		display: flex;
		align-items: center;
		gap: tokens.spacer(2);

		input {
			font-family: 'Satoshi';
		}
	}

	&__suffix {
		color: tokens.$n-600;
		display: flex;
		align-items: center;
		padding: tokens.pTRBL(2, 2, 2, 0);
		margin: tokens.mr(2);
		@include tokens.caption;
	}

	&__field {
		padding: v-bind(inputPadding);
		margin-right: v-bind(inputMargin);
		border-radius: 6px;
		border: none;
		text-align: end;
		color: tokens.$n-600;

		&--thin {
			width: 72px;
		}

		&--default {
			width: 144px;
		}

		&--wide {
			width: 284px;
		}

		&--fluid {
			width: 100%;
		}

		&:focus {
			outline: 0;
		}
	}

	&--focused {
		@extend .mobile-stepper-input;
		outline: 1px solid tokens.$bn-300;
		box-shadow: 0 0 0 0.2rem rgba(tokens.$bn-300, .45);
	}

	&--valid {
		@extend .mobile-stepper-input;
		outline: 1px solid tokens.$gp-500;
	}

	&--invalid {
		@extend .mobile-stepper-input;
		outline: 1px solid tokens.$rc-600;
	}

	&--focused-valid {
		@extend .mobile-stepper-input--valid;
		box-shadow: 0 0 0 0.2rem rgba(tokens.$gp-300, .45);
	}

	&--focused-invalid {
		@extend .mobile-stepper-input--invalid;
		box-shadow: 0 0 0 0.2rem rgba(tokens.$rc-300, .45);
	}

	&--disabled {
		background-color: tokens.$n-10;
		pointer-events: none;
	}
	
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: tokens.ma(0);
}

input[type=number] {
	-moz-appearance: textfield;
}

input:disabled {
	background: none !important;
}
</style>

