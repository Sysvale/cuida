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

const componentRef = useTemplateRef('baseInput')

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
	* Define o tipo do input, se true será um input adaptado para o mobile
	*/
	floatingLabel: {
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
	componentRef.value = componentRef.value?.componentRef;
});
</script>
