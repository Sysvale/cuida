<template>
	<div>
		<CdsBaseInput
			ref="baseInput"
			v-model="internalValue"
			v-facade="internalMask"
			v-bind="{...$attrs, ...props}"
			type="textarea"
			:support-link-url="supportLinkUrl || linkUrl"
			:support-link="supportLink || linkText"
			:floating-label="floatingLabel || mobile"
			@click="emitClick"
			@change="emitChange"
			@focus="emitFocus"
			@blur="emitBlur"
			@keydown="emitKeydown"
		/>
	</div>
</template>

<script setup>
import { ref, watch, useTemplateRef } from 'vue';
import {
	nativeEvents,
	nativeEmits,
} from '../utils/composables/useComponentEmits.js';
import { facade } from 'vue-input-facade';
import CdsBaseInput from './BaseInput.vue';

const baseInputRef = useTemplateRef('baseInput');

const model = defineModel('modelValue', {
	type: String,
});

const props = defineProps({
	/**
	 * Especifica a label do textarea.
	 */
	label: {
		type: String,
		default: 'Label',
	},

	/**
	* Exibe asterisco que indica campo obrigatório (Obs: Não faz a validação)
	*/
	required: {
		type: Boolean,
		default: false,
	},

	/**
	 * Especifica o placeholder do textarea.
	 */
	placeholder: {
		type: String,
		default: 'Digite aqui a descrição',
	},

	/**
	 * Desabilita o input do textarea.
	 */
	disabled: {
		type: Boolean,
		default: false,
	},

	/**
	 * Especifica o estado do textarea. As opções são 'default', 'valid', 'invalid' e 'loading'.
	 */
	state: {
		type: String,
		default: 'default',
	},

	/**
	 * Especifica a mensagem de erro que será exibida, caso o estado do textarea seja inválido.
	 */
	errorMessage: {
		type: String,
		default: 'Valor inválido',
	},


	/**
	 * Especifica se a largura do textarea deve ser fluida.
	 */
	fluid: {
		type: Boolean,
		default: false,
		required: false,
	},
});

const emits = defineEmits({
	...nativeEvents
});

const internalValue = ref(model.value);
const { emitClick, emitChange, emitFocus, emitBlur, emitKeydown } = nativeEmits(emits);

watch(model, (newValue, oldValue) => {
	if (newValue !== oldValue) {
		internalValue.value = newValue;
	}
}, { immediate: true });

watch(internalValue, (value) => {
	model.value = value;
});

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
