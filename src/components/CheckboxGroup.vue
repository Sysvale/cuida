<template>
	<div class="checkbox__container">
		<label class="checkbox__label">
			{{ label }}
			<span
				v-if="required"
				class="checkbox__required"
			>
				*
			</span>
		</label>
		<div
			v-for="option in options"
			:key="option.value"
			:class="resolveCheckboxClass(option.value)"
			@click="handleCheckboxClick(option.value)"
		>
			<cds-checkbox
				:id="option.value"
				:model-value="internalValue.includes(option.value)"
				:label="option.label"
				:disabled="disabled"
				:variant="variant"
			/>
		</div>
		<div
			v-if="isInvalid && !disabled"
			class="checkbox__error-message"
		>
			{{ errorMessage }}
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import CdsCheckbox from './Checkbox.vue';
import variantClassResolver from '../utils/methods/variantClassResolver';
import variantValidator from '../utils/validators/variant';

const props = defineProps({
	/**
	* Prop usada como v-model para monitorar as seleções do CheckboxGroup
	*/
	modelValue: {
		type: Array,
		default: () => ([]),
	},
	/**
	* Opções disponíveis para seleção na lista a ser renderizada pelo componente. Deve ser formada por objetos contendo `label` e `value`.
	*/
	options: {
		type: Array,
		default: () => ([]),
	},
	/**
	* Etiqueta do componente.
	*/
	label: {
		type: String,
		default: 'Label',
	},
	/**
	 * Exibe asterisco de obrigatório (obs.: não faz a validação)
	 */
	required: {
		type: Boolean,
		default: false,
	},
	/**
	* A variante do componente. São 10 variantes: 'teal', 'green', 'blue',
	* 'indigo', 'violet', 'pink', 'red', 'orange', 'amber' e 'dark'.
	*/
	variant: {
		type: String,
		default: 'green',
		validator: variantValidator,
	},
	/**
	* Controla o status checkbox
	*/
	disabled: {
		type: Boolean,
		default: false,
	},
	/**
	 * Especifica o estado do CheckboxGroup. As opções são 'default', 'valid' e 'invalid'.
	 */
	state: {
		type: String,
		default: 'default',
	},
	/**
	 * Especifica a mensagem de erro, que será exibida caso o estado seja inválido
	 */
	errorMessage: {
		type: String,
		default: 'Valor inválido',
	},
});

const emits = defineEmits(['update:modelValue']);

const internalValue = ref([]);
const checkboxControl = ref(0);

const isInvalid = computed(() => props.state === 'invalid');

watch(internalValue, () => checkboxControl.value += 1);

onMounted(() => {
	internalValue.value = props.modelValue;
});

function resolveCheckboxClass(selectedOption) {
	if (props.disabled) {
		return 'checkbox__item--disabled';
	}

	const variantClass = isInvalid.value
		? 'checkbox__item--error'
		: variantClassResolver('checkbox__item', props.variant);

	return internalValue.value.includes(selectedOption)
		? `checkbox__item--selected ${variantClass}`
		: `checkbox__item ${isInvalid.value ? variantClass : ''}`;
}

function handleCheckboxClick(selectedOption) {
	if (props.disabled) {
		return;
	}

	if (internalValue.value.includes(selectedOption)) {
		internalValue.value = internalValue.value.filter((option) => option !== selectedOption);
		emits('update:modelValue', internalValue.value);
		return;
	}

	internalValue.value.push(selectedOption);
	emits('update:modelValue', internalValue.value);
}
</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.checkbox {
	&__container {
		display: flex;
		flex-direction: column;
		gap: spacer(2);
	}

	&__label {
		@include tokens.button-2;
		margin: mb(2);
	}

	&__item {
		cursor: pointer;
		padding: pYX(4, 3);
		@include tokens.body-2;
		border: 1px solid tokens.$n-50;
		border-radius: tokens.$border-radius-extra-small;

		@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			border-color: $base-color !important;
		}

		&--error {
			border-color: tokens.$rc-600;
		}

		&--selected {
			@extend .checkbox__item;
		}

		&--disabled {
			@extend .checkbox__item;
			background-color: tokens.$n-10;
		}
	}

	&__required {
		color: tokens.$rc-600;
	}

	&__error-message {
		@include tokens.caption;
		color: tokens.$rc-600;
		margin: mt(1);
	}
}
</style>
