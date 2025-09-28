<template>
	<CdsBaseInput
		ref="baseInput"
		v-bind="props"
		v-model="internalValue"
		v-facade="internalMask"
		:enable-autocomplete="!disableAutocomplete"
		:support-link-url="supportLinkUrl || linkUrl"
		:support-link="supportLink || linkText"
		:floating-label="floatingLabel || mobile"
		@click="emitClick"
		@focus="emitFocus"
		@blur="emitBlur"
		@keydown="emitKeydown"
	/>
</template>

<script setup>
import { ref, watch, useTemplateRef } from 'vue';
import {
	nativeEvents,
	nativeEmits,
} from '../utils/composables/useComponentEmits.js';
import { facade } from 'vue-input-facade';
import CdsBaseInput from './BaseInput.vue';

defineOptions({ name: 'TextInput' });

const vFacade = facade;

const componentRef = useTemplateRef('baseInput');

const model = defineModel('modelValue', {
	type: String,
});

const props = defineProps({
	/**
	* Especifica a label do input.
	*/
	label: {
		type: String,
		default: 'Label',
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
	* <span className="deprecated-warning">[DEPRECATED]</span> Use o componente EmailInput caso precise de um campo para Emails. Especifica o tipo do TextInput. As opções são 'text' e 'email'.
	*/
	inputType: {
		type: String,
		default: 'text',
		validator: (value) => ['text', 'email'].includes(value),
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
	* Especifica a máscara a ser aplicada ao TextInput.
	* Exemplo: "(##) #####-####"
	*/
	mask: {
		type: [String, Array],
		default: null,
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
	* <span className="deprecated-warning">[DEPRECATED]</span> Essa prop vai ser substituída pela `supportLink` na v4. Define texto do link do input (localizado à direita da label).
	*/
	linkText: {
		type: String,
		default: null,
	},
	/**
	* <span className="deprecated-warning">[DEPRECATED]</span> Essa prop vai ser substituída pela `supportLinkUrl` na v4. Define a url a ser acessada no clique do link (no caso do link ser exibido).
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
	* Especifica mensagem de auxílio.
	*/
	supportingText: {
		type: [String, Array],
		default: '',
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
	* <span className="deprecated-warning">[DEPRECATED]</span> Essa prop vai ser substituída pela prop `floatingLabel` na v4. Define o tipo do input, se true será um input adaptado para o mobile
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
	/**
	* Desabilita autocomplete do browser.
	*/
	disableAutocomplete: {
		type: Boolean,
		default: false,
	},
});

const emits = defineEmits({
	...nativeEvents
});

const internalValue = ref('');
const internalMask = ref(props.mask);
const { emitClick, emitFocus, emitBlur, emitKeydown } = nativeEmits(emits);

watch(() => props.mask, (newValue) => internalMask.value = newValue);

watch(model, (newValue, oldValue) => {
	if (newValue !== oldValue) {
		internalValue.value = newValue;
	}
}, {immediate: true});

watch(internalValue, (value) => {
	model.value = value;
	componentRef.value = componentRef.value?.componentRef;
});

/* EXPOSE */
defineExpose({
	componentRef,
	isFocused: componentRef.value?.isFocused,
	focus: () => componentRef.value?.focus(),
	blur: () => componentRef.value?.blur(),
	clear: () => componentRef.value?.clear(),
	select: () => componentRef.value?.select(),
});
</script>
