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
			@change="handleChange"
			@focus="handleFocus"
			@blur="emitBlur"
			@keydown="emitKeydown"
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
			type="number"
			@click="emitClick"
			@change="handleChange"
			@focus="handleFocus"
			@blur="emitBlur"
			@keydown="emitKeydown"
		/>
	</div>
</template>

<script setup>
import { ref, watch, onMounted, useTemplateRef } from 'vue';
import {
	nativeEvents,
	nativeEmits,
} from '../utils/composables/useComponentEmits.js';
import { vCdsBrl, unmaskBRL } from '../utils/directives/cdsBRL';
import { facade } from 'vue-input-facade';
import CdsBaseInput from './BaseInput.vue';

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
	 * <span className="deprecated-warning">[DEPRECATED]</span> Define exibição e texto do link do input (localizado à direita da label).
	 */
	linkText: {
		type: String,
		default: null,
	},
	/**
	 * <span className="deprecated-warning">[DEPRECATED]</span> Define a url a ser acessada no clique do link (no caso do link ser exibido).
	 */
	linkUrl: {
		type: String,
		default: 'https://cuida.framer.wiki/',
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
	* <span className="deprecated-warning">[DEPRECATED]</span> Define o tipo do input, se true será um input adaptador para o mobile
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
let cdsBrlBiding = {};


/* WATCHERS */
watch(model, (newValue, oldValue) => {
	if (newValue !== oldValue) {
		internalValue.value = newValue;
	}
}, {immediate: true});

watch(internalValue, (value, oldValue) => {
	if (value !== oldValue) {
		let stringifiedInput = String(value);

		if (props.money) {
			/**
			* Evento utilizado para implementar o v-model para atualização
			* de valores sem máscara de dinheiro.
			* @event update:unmaskedValue
			* @type {Event}
			*/
			unmaskedValue.value = unmaskBRL(stringifiedInput);
			/**
			* Evento utilizado para implementar o v-model padrão do componente.
			* @event update:modelValue
			* @type {Event}
			*/
			model.value = stringifiedInput;
		} else if (props.mask) {
			internalValue.value = stringifiedInput;
			model.value = stringifiedInput;
			unmaskedValue.value = +stringifiedInput.replace(/\D/g, '');
		} else if (stringifiedInput.length > 15) {
			internalValue.value = +stringifiedInput.slice(0, 15);
		} else {
			model.value = +stringifiedInput;
			unmaskedValue.value = +stringifiedInput;
		}
	}
});

/* HOOKS */
onMounted(() => {
	if (props.money && baseInputRef.value && baseInputRef.value.componentRef) {
		cdsBrlBiding =  {
			value: model.value,
			oldValue: '',
			instance: baseInputRef.value.componentRef,
			modifiers: {},
			arg: null,
		};
		vCdsBrl.mounted(baseInputRef.value.componentRef, cdsBrlBiding);
	}
});

/* FUNCTIONS */
function handleFocus() {
	if (props.money) {
		internalValue.value = (internalValue.value == 0 || internalValue.value == '') 
			? 'R$ 0,00'
			: internalValue.value;
	}
	emitFocus();
}

function handleChange() {
	model.value = internalValue.value;
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
