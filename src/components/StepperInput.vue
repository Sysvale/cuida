<template>
	<div>
		<template
			v-if="hasSlots"
		>
			<slot name="label" />
		</template>

		<label
			v-else
			class="stepper-input__label"
			for="stepper-input"
		>
			<span
				class="label__content"
			>
				{{ label }}

				<CdsRequiredIndicator v-if="required" />
			</span>
		</label>

		<CdsMobileStepperInput
			v-if="mobile"
			v-model="internalValue"
			v-bind="props"
			@add="changeValue(step)"
			@subtract="changeValue(-step)"
		/>
		<div
			v-else
			:class="stepperInputStatusClasses"
			@click="emitClick"
		>
			<input
				ref="stepper-input"
				v-model="internalValue"
				:disabled="disabled"
				class="stepper-input__field"
				:class="inputWidthClass"
				type="number"
				@focus="handleFocus"
				@blur="handleBlur"
			>

			<span
				v-if="suffix"
				class="stepper-input__suffix"
			>
				<!-- @slot Slot e prop de mesmo nome utilizados para adicionar sufixo ao stepperInput. O valor padrão é `%`. O valor passado por slot tem maior precedência que o valor enviado para a prop.-->
				<slot name="suffix">
					{{ suffix }}
				</slot>
			</span>

			<div class="stepper-input__icon-container">
				<button
					v-long-click="() => changeValue(step)"
					:disabled="disabled"
					class="stepper-input__icon--plus"
					tabindex="-1"
					@focus="handleFocus"
					@blur="handleBlur"
					@click="changeValue(step)"
				>
					<CdsIcon
						height="16"
						width="16"
						name="plus-outline"
					/>
				</button>

				<button
					v-long-click="() => changeValue(-step)"
					:disabled="disabled"
					class="stepper-input__icon--minus"
					tabindex="-1"
					@focus="handleFocus"
					@blur="handleBlur"
					@click="changeValue(-step)"
				>
					<CdsIcon
						height="16"
						width="16"
						name="minus-outline"
					/>
				</button>
			</div>
		</div>
		<div
			v-if="errorState && !disabled"
			class="stepper-input__error-message"
		>
			{{ errorMessage }}
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch, useTemplateRef } from 'vue';
import { useHasSlots } from '../utils/composables/useHasSlots.js';
import {
	nativeEvents,
	nativeEmits,
} from '../utils/composables/useComponentEmits.js';
import { useInputStatusClasses } from '../utils/composables/useInputStatusClasses.js';
import { longClickDirective } from '@sysvale/vue3-long-click';
import CdsMobileStepperInput from './MobileStepperInput.vue';
import CdsIcon from './Icon.vue';
import CdsRequiredIndicator from './RequiredIndicator.vue';
import stateValidator from '../utils/validators/state';

defineOptions({ name: 'CdsStepperInput' });

const hasSlots = useHasSlots();
const vLongClick = longClickDirective({ delay: 400, interval: 50 });
const model = defineModel('modelValue', { type: Number });

const componentRef = useTemplateRef('stepper-input');

defineExpose({
	componentRef,
});

const emits = defineEmits({
	/**
	* Evento emitido quando o valor do modelValue está fora dos limites definidos pelas props `min` e `max`.
	* @event invalid-number
	* @type {Event}
	*/
	'invalid-number': null,
	/**
	* Evento emitido quando o valor da prop `Step` está fora dos limites definidos pelas props `min` e `max`.
	* @event step-out-of-bounds
	* @type {Event}
	*/
	'step-out-of-bounds': null,
	...nativeEvents
});

const { emitFocus, emitBlur, emitChange, emitClick } = nativeEmits(emits);

const props = defineProps({
	/**
	* Especifica o menor valor que o StepperInput deve aceitar.
	*/
	min: {
		type: [Number, String],
		default: Number.MIN_SAFE_INTEGER,
	},
	/**
	* Especifica o menor valor que o StepperInput deve aceitar.
	*/
	max: {
		type: [Number, String],
		default: Number.MAX_SAFE_INTEGER,
	},
	/**
	* Indica passo usado no incremento e decremento do valor do StepperInput.
	*/
	step: {
		type: Number,
		default: 1,
	},
	/**
	* A label do StepperInput.
	*/
	label: {
		type: String,
		default: 'Label',
	},
	/**
	* Exibe asterisco indicativo de campo obrigatório.
	*/
	required: {
		type: Boolean,
		default: false,
	},
	/**
	* @deprecated Define a largura do StepperInput. As opções são 'thin', 'default', 'wide' e 'fluid'.
	*/
	width: {
		type: String,
		default: 'default',
		validator: (value) => ['thin', 'default', 'wide', 'fluid'].includes(value)
	},
	/**
	* Indica se o componente deverá ocupar 100% da largura disponível.
	*/
	fluid: {
		type: Boolean,
		default: false,
	},
	/**
	* Desabilita o StepperInput.
	*/
	disabled: {
		type: Boolean,
		default: false,
	},
	/**
	* Especifica o estado do StepperInput. As opções são 'default', 'valid' e 'invalid'.
	* @values default, valid, invalid
	*/
	state: {
		type: String,
		default: 'default',
		validator: stateValidator,
	},
	/**
	* Especifica a mensagem de erro, que será exibida caso o estado seja inválido
	*/
	errorMessage: {
		type: String,
		default: 'Valor inválido',
	},
	/**
	* Indica se o componente deve ter sua apresentação ajustada a aplicações móveis.
	*/
	mobile: {
		type: Boolean,
		default: false,
	},
	/**
	* Quando ativo adiciona sufixo que indica ao usuário que ele está manipulando dados com caracterísitcas específicas, como porcentagem, milhares, pesos, etc.
	*/
	suffix: {
		type: String,
		default: '',
	},
});

const internalValue = ref(model.value);
const isBeingFocused = ref(false);

const stepperInputStatusClasses = useInputStatusClasses('stepper-input', props.state, props.disabled, isBeingFocused);

const widthResolver = computed(() => {
	return (props.width === 'fluid') || props.fluid ? '100%' : 'fit-content';
});

const errorState = computed(() => {
	return props.state === 'invalid';
});

const inputWidthClass = computed(() => {
	if (props.fluid) return `stepper-input__field--fluid`;
	return `stepper-input__field--${props.width}`;
});

const inputPadding = computed(() => {
	if (props.suffix) return '8px 2px 8px 8px';
	return '8px';
});

const inputMargin = computed(() => {
	if (props.suffix) return '0';
	return '8px';
});

watch(model, (value) => {
	internalValue.value = value;
});

watch(internalValue, (value) => {
	if (!value) {
		internalValue.value = 0;
	}

	if (typeof value === 'string') {
		internalValue.value = +internalValue.value;
	}

	if (value < props.min) {
		internalValue.value = props.min;
		/**
		* Evento que indica que o valor informado está fora do intervalo aceito.
		* @event invalid number
		* @type {Event}
		*/
		emits('invalid-number', `'O campo não pode ser menor que ${parseInt(props.min, 10)}.'`);
	} else if (value > props.max) {
		internalValue.value = props.max;
		emits('invalid-number', `'O campo não pode ser maior que ${parseInt(props.max, 10)}.'`);
	} else {
		model.value = parseInt(value, 10);
	}
});

watch(() => props.step, (step) => { 
	if (step > props.max || step < props.min) {
		console.warn('A propriedade step está fora dos limites definidos por min e max.');
		emits('step-out-of-bounds');
	}
}, {
	immediate: true,
});

function changeValue(amount) {
	internalValue.value = parseInt(internalValue.value) + amount;
	emitChange();
}

function handleFocus() {
	isBeingFocused.value = true;
	emitFocus();
}

function handleBlur() {
	isBeingFocused.value = false;
	emitBlur();
}
</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.label {
	&__content {
		margin: tokens.mb(1);
	}
}

.stepper-input {
	display: flex;
	outline: 1px solid tokens.$n-50;
	border-radius: 6px;
	height: 40px;
	width: v-bind(widthResolver);
	background: tokens.$n-0;

	&__label {
		@include tokens.caption;
		font-weight: tokens.$font-weight-semibold;
		margin: tokens.mb(1);
		display: flex;
		color: tokens.$n-700;
	}

	&__suffix {
		color: tokens.$n-600;
		display: flex;
		align-items: center;
		padding: tokens.pTRBL(2, 2, 2, 0);
		margin: tokens.mr(2);
		@include tokens.caption;
	}

	&__icon-container {
		background-color: tokens.$n-20;
		display: flex;
		flex-direction: column;
		justify-content: center;
		border-radius: 0px 8px 8px 0px;
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
		@extend .stepper-input;
		outline: 1px solid tokens.$bn-300;
		box-shadow: 0 0 0 0.2rem rgba(tokens.$bn-300, .45);
	}

	&--valid {
		@extend .stepper-input;
		outline: 1px solid tokens.$gp-500;
	}

	&--invalid {
		@extend .stepper-input;
		outline: 1px solid tokens.$rc-600;
	}

	&--focused-valid {
		@extend .stepper-input--valid;
		box-shadow: 0 0 0 0.2rem rgba(tokens.$gp-300, .45);
	}

	&--focused-invalid {
		@extend .stepper-input--invalid;
		box-shadow: 0 0 0 0.2rem rgba(tokens.$rc-300, .45);
	}

	&--disabled {
		background-color: tokens.$n-10 !important;
		pointer-events: none !important;
	}

	&__icon--plus {
		background: none;
		border: none;
		padding: 0;
		outline: none;
		padding: tokens.pt(1);
		display: flex;
		color: tokens.$n-600;
		transition: all 0.2s ease-out;
		height: 50%;
		cursor: pointer;

		&:hover {
			background-color: tokens.$bn-400;
			color: tokens.$n-0;
			border-radius: 0px 8px 0px 0px;
		}

		&:active {
			background-color: tokens.$bn-500;
			border-radius: 0px 8px 0px 0px;
		}
	}

	&__icon--minus {
		background: none;
		border: none;
		padding: 0;
		outline: none;
		padding: tokens.pt(1);
		display: flex;
		color: tokens.$n-600;
		transition: all 0.2s ease-out;
		height: 50%;
		cursor: pointer;

		&:hover {
			background-color: tokens.$bn-400;
			color: tokens.$n-0;
			border-radius: 0px 0px 8px 0px;
		}

		&:active {
			background-color: tokens.$bn-500;
			border-radius: 0px 0px 8px 0px;
		}
	}

	&__error-message {
		@include tokens.caption;
		color: tokens.$rc-600;
		margin: tokens.mt(1);
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
