<template>
	<div>
		<CdsBaseInput
			v-if="money"
			ref="baseInput"
			v-bind="{...$attrs, ...props}"
			v-model="internalValue"
			:floating-label="floatingLabel || mobile"
			:support-link="supportLink || linkText"
			:support-link-url="supportLinkUrl || linkUrl"
			@click="emitClick"
			@focus="handleFocus"
			@blur="emitBlur"
			@keydown="emitKeydown"
			@input="handleMoneyInput"
		/>

		<CdsBaseInput
			v-else-if="mask"
			ref="baseInput"
			v-bind="{...$attrs, ...props}"
			v-model="internalValue"
			v-facade="mask"
			type="tel"
			:floating-label="floatingLabel || mobile"
			:support-link="supportLink || linkText"
			:support-link-url="supportLinkUrl || linkUrl"
			@click="emitClick"
			@change="handleChange"
			@focus="handleFocus"
			@blur="emitBlur"
			@keydown="emitKeydown"
		/>

		<CdsBaseInput
			v-else
			ref="baseInput"
			v-bind="{...$attrs, ...props}"
			v-model="internalValue"
			:floating-label="floatingLabel || mobile"
			:support-link="supportLink || linkText"
			:support-link-url="supportLinkUrl || linkUrl"
			type="text"
			inputmode="decimal"
			@click="emitClick"
			@change="handleChange"
			@focus="handleFocus"
			@blur="handleBlur"
			@keydown="emitKeydown"
			@input="handleDefaultInput"
		/>
	</div>
</template>

<script setup>
import { nextTick, ref, useTemplateRef, watch } from 'vue';
import { facade } from 'vue-input-facade';
import {
	nativeEmits,
	nativeEvents,
} from '../utils/composables/useComponentEmits.js';
import { unmaskBRL } from '../utils/directives/cdsBRL';
import CdsBaseInput from './BaseInput.vue';

defineOptions({ name: 'CdsNumberInput' });

const vFacade = facade;
const baseInputRef = useTemplateRef('baseInput');

const model = defineModel('modelValue', {
	type: [Number, String],
});

const unmaskedValue = defineModel('unmaskedValue', {
	type: [Number, String, null],
});

const props = defineProps({
	/**
	 * Especifica a label do input.
	 */
	label: {
		type: String,
		default: 'Valor',
	},
	/**
	 * Desabilita o input.
	 */
	disabled: {
		type: Boolean,
		default: false,
	},
	/**
	 * Especifica o estado do TextInput. As opções são 'default', 'valid', 'loading' e 'invalid'.
	 * @values default, valid, loading, invalid
	 */
	state: {
		type: String,
		default: 'default',
	},
	/**
	 * Exibe asterisco de obrigatório (obs.: não faz a validação)
	 */
	required: {
		type: Boolean,
		default: false,
	},
	/**
	 * Especifica o placeholder do input
	 */
	placeholder: {
		type: String,
		default: 'Digite aqui a informação',
	},
	/**
	* Especifica mensagem de auxílio.
	*/
	supportingText: {
		type: [String, Array],
		default: '',
	},
	/**
	* Especifica a mensagem de erro, que será exibida caso o estado seja inválido
	*/
	errorMessage: {
		type: String,
		default: 'Valor inválido',
	},
	/**
	* Especifica se a largura do TextInput deve ser fluida.
	*/
	fluid: {
		type: Boolean,
		default: false,
		required: false,
	},
	/**
	* Define exibição e texto do tooltip do input
	*/
	tooltip: {
		type: String,
		default: null,
	},
	/**
	* Especifica ícone do tooltip do TextInput.
	*/
	tooltipIcon: {
		type: String,
		default: 'info-outline',
	},
	/**
	* Indica se o input vai funcionar com a máscara de dinheiro.
	* A máscara utiliza `R$` como prefixo,` , ` como separador de decimais
	* e tem precisão de 2 dígitos.
	*
	*
	* Ao utilizar essa prop o `update:modelValue` vai deixar de emitir
	* `Number`e vai passar a emitir uma `String` contendo a máscara.
	*
	*
	* Para receber o valor sem máscara, utilize a prop `unmaskedValue`
	* com v-model: `v-model:unmaskedValue="nome da propriedade a ser atualizada"`
	*/
	money: {
		type: Boolean,
		default: false,
	},
	/**
	 * @deprecated Define exibição e texto do link do input (localizado à direita da label).
	 */
	linkText: {
		type: String,
		default: null,
	},
	/**
	 * @deprecated Define a url a ser acessada no clique do link (no caso do link ser exibido).
	 */
	linkUrl: {
		type: String,
		default: null,
	},
	/**
	* Controla a exibição e o conteúdo do link de suporte exibido ao lado da label.
	*/
	supportLink: {
		type: String,
		default: null,
	},
	/**
	* Define a url a ser acessada no clique do link de suporte.
	*/
	supportLinkUrl: {
		type: [String, null],
		default: null,
	},
	/**
	* Quando true, o v-model é atualizado com o evento `change` no lugar do `input`.
	*/
	lazy: {
		type: Boolean,
		default: false,
	},
	/**
	* Especifica a máscara a ser aplicada ao TextInput.
	* Exemplo: "(##) #####-####"
	*/
	mask: {
		type: [String, Array],
		default: null,
	},
	/**
	* @deprecated Define o tipo do input, se true será um input adaptador para o mobile
	*/
	mobile: {
		type: Boolean,
		default: false,
	},
	/**
	* Define o tipo do input, se true será um input adaptado para o mobile
	*/
	floatingLabel: {
		type: Boolean,
		default: false,
	},
});

const emits = defineEmits({
	...nativeEvents
});

/* REACTIVE DATA */
const internalValue = ref('');
const { emitClick, emitChange, emitFocus, emitBlur, emitKeydown } = nativeEmits(emits);

/* WATCHERS */
watch(model, (newValue) => {
	if (props.money) {
		if (newValue === null || newValue === undefined || newValue === '') {
			internalValue.value = 'R$ 0,00';
			unmaskedValue.value = 0;
			return;
		}

		if (typeof newValue === 'number') {
			const formatted = newValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
			internalValue.value = formatted;
			unmaskedValue.value = newValue;
			return;
		}

		if (typeof newValue === 'string') {
			if (newValue.startsWith('R$')) {
				internalValue.value = newValue;
				unmaskedValue.value = unmaskBRL(newValue);
				return;
			}
			
			const parsed = parseFloat(newValue.replace(',', '.'));
			if (!isNaN(parsed)) {
				const formatted = parsed.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
				internalValue.value = formatted;
				unmaskedValue.value = parsed;
			} else {
				internalValue.value = 'R$ 0,00';
				unmaskedValue.value = 0;
			}
		}
	} else if (!props.mask) {
		if (newValue === null || newValue === undefined || newValue === '') {
			internalValue.value = '';
			unmaskedValue.value = '';
			return;
		}

		const numericValue = typeof newValue === 'string' ? parseFloat(newValue.replace(',', '.')) : newValue;
		const currentInternalNumeric = parseFloat(String(internalValue.value).replace(',', '.'));

		const hasDecimalIntent = (numericValue % 1 !== 0) || (typeof newValue === 'string' && (newValue.includes(',') || newValue.includes('.')));
		const formattedValue = numericValue.toLocaleString('pt-BR', {
			minimumFractionDigits: hasDecimalIntent ? 2 : 0,
			maximumFractionDigits: hasDecimalIntent ? 2 : 0,
			useGrouping: false,
		});

		if (formattedValue !== internalValue.value && numericValue !== currentInternalNumeric) {
			internalValue.value = formattedValue;
		}
		unmaskedValue.value = numericValue;
	} else {
		internalValue.value = newValue ?? '';
	}
}, { immediate: true });

watch(internalValue, (value) => {
	if (props.money) return;

	let stringifiedInput = String(value);

	if (props.mask) {
		model.value = stringifiedInput;
		unmaskedValue.value = +stringifiedInput.replace(/\D/g, '');
	} else if (stringifiedInput.length > 15) {
		internalValue.value = +stringifiedInput.slice(0, 15);
	} else {
		const numericValue = parseFloat(stringifiedInput.replace(',', '.'));
		model.value = isNaN(numericValue) ? '' : numericValue;
		unmaskedValue.value = model.value;
	}
});

/* FUNCTIONS */
function formatDigitsToBRL(digits) {
	const onlyNumbers = String(digits || '').replace(/\D/g, '');
	if (!onlyNumbers) return 'R$ 0,00';
	
	const number = parseFloat(onlyNumbers) / 100;
	return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function handleMoneyInput(event) {
	const digits = event.target.value.replace(/\D/g, '');

	const formattedValue = formatDigitsToBRL(digits);

	
	internalValue.value = formattedValue;
	unmaskedValue.value = unmaskBRL(formattedValue);
	model.value = formattedValue;

	/*
	*  Dadas as diferenças entre as engines do Chrome e Firefox
	*  essa validação foi adicionada para forçar a renderização do DOM
	*  e evitar que o valor padrão (R$ 0,00) pudesse ser visualmente
	*  alterado para R$ 0,0 no Firefox.
	*/
	if (event.target.value !== formattedValue) {
		nextTick(() => {
			event.target.value = formattedValue;
		});
	}
}

function handleDefaultInput(event) {
	let value = event.target.value;

	// Permitir apenas números e uma vírgula (substituindo ponto por vírgula)
	value = value.replace(/\./g, ',');
	value = value.replace(/[^\d,]/g, '');

	// Garantir apenas uma vírgula
	const parts = value.split(',');
	if (parts.length > 2) {
		value = parts[0] + ',' + parts.slice(1).join('');
	}

	// Limitar a 2 casas decimais
	if (parts.length === 2 && parts[1].length > 2) {
		value = parts[0] + ',' + parts[1].slice(0, 2);
	}

	internalValue.value = value;
}

function handleFocus(event) {
	if (props.money) {
		internalValue.value = (internalValue.value === '')
			? 'R$ 0,00'
			: internalValue.value;

		setTimeout(() => {
			baseInputRef.value?.select();
		}, 0);
	}
	emitFocus(event);
}

function handleBlur(event) {
	if (!props.money && !props.mask && internalValue.value !== '') {
		const stringValue = String(internalValue.value);
		const hasSeparator = stringValue.includes(',') || stringValue.includes('.');
		const numericValue = parseFloat(stringValue.replace(',', '.'));
		if (!isNaN(numericValue)) {
			internalValue.value = numericValue.toLocaleString('pt-BR', {
				minimumFractionDigits: hasSeparator ? 2 : 0,
				maximumFractionDigits: hasSeparator ? 2 : 0,
				useGrouping: false,
			});
		}
	}
	emitBlur(event);
}

function handleChange() {
	if (!props.money) {
		model.value = internalValue.value;
	}
	emitChange();
}

/* EXPOSE */
defineExpose({
	componentRef: baseInputRef.value?.componentRef,
	isFocused: baseInputRef.value?.isFocused,
	focus: () => baseInputRef.value?.focus(),
	blur: () => baseInputRef.value?.blur(),
	clear: () => baseInputRef.value?.clear(),
	select: () => baseInputRef.value?.select(),
});
</script>
