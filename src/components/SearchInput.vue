<template>
	<CdsBaseInput
		ref="baseInput"
		v-bind="props"
		v-model="internalValue"
		type="search"
		leading-icon="search-outline"
	/>
</template>

<script setup>
import { ref, useTemplateRef, watch } from 'vue';
import CdsBaseInput from './BaseInput.vue';

const internalValue = ref('');

const baseInputRef = useTemplateRef('baseInput')

const model = defineModel('modelValue', {
	type: String,
});

const props = defineProps({
	/**
	* Desabilita o SearchInput.
	*/
	disabled: {
		type: Boolean,
		default: false,
	},
	/**
	* Especifica o placeholder do input
	*/
	placeholder: {
		type: String,
		default: 'Busque...',
	},
	/**
	 * Quando ativado a label não será exibida
	 */
	hideLabel: {
		type: Boolean,
		default: false,
	},
	/**
	* Especifica se a largura do SearchInput deve ser fluida.
	*/
	fluid: {
		type: Boolean,
		default: false,
	},
	/**
	* Habilita autocomplete do browser.
	*/
	enableAutocomplete: {
		type: Boolean,
		default: false,
	},
});

watch(internalValue, (value) => {
	model.value = value;
});

defineExpose({
	componentRef: baseInputRef.value?.componentRef,
	isFocused: baseInputRef.value?.isFocused,
	focus: () => baseInputRef.value?.focus(),
	blur: () => baseInputRef.value?.blur(),
	clear: () => baseInputRef.value?.clear(),
	select: () => baseInputRef.value?.select(),
});
</script>
