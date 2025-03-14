<template>
	<div :class="stepperInputDynamicClass">
		<cds-icon
			name="search-outline"
			class="search-input__search-icon"
		/>
		<input
			id="cds-search-input"
			:value="internalValue"
			:placeholder="placeholder"
			:disabled="disabled"
			:class="inputClass"
			@focus="isBeingFocused = true"
			@blur="isBeingFocused = false"
			@input="handleInput"
		>

		<cds-icon
			v-if="internalValue"
			name="x-outline"
			width="18"
			height="18"
			class="search-input__close-icon"
			@click="handleClearInput"
		/>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import CdsIcon from './Icon.vue';
import CdsLinkButton from './FlatButton.vue';

const internalValue = ref('');
const isBeingFocused = ref(false);

const model = defineModel();

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
	* Especifica se a largura do SearchInput deve ser fluida.
	*/
	fluid: {
		type: Boolean,
		default: false,
	},
});

const stepperInputDynamicClass = computed(() => {
	let stepperInputClass = props.fluid ? 'search-input--fluid' : 'search-input';
	return stepperInputClass.concat(' ', props.disabled ? 'search-input--disabled' : '');
});

const inputClass = computed(() => props.fluid ? 'search-input__field--fluid' : 'search-input__field');


function handleInput(e) {
	internalValue.value = e.target.value;
	model.value = e.target.value;
};

function handleClearInput() {
	internalValue.value = '';
	model.value = '';
};

onMounted(() => {
	internalValue.value = model.value;
});
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.search-input {
	display: flex;
	align-items: center;
	outline: 1px solid $n-50;
	border-radius: $border-radius-extra-small;
	width: fit-content;
	width: -moz-fit-content;
	background: $n-0;

	&--fluid {
		@extend .search-input;
		width: 100%;
	}

	&__search-icon {
		color: $n-300;
		padding: pl(3);
	}

	&__close-icon {
		color: $n-300;
		padding: pr(3);
		cursor: pointer;
	}

	&__close-icon:hover {
		color: $n-400;
	}

	&__field {
		padding: pTRBL(3, 3, 3, 2);
		margin: mr(2);
		height: 40px !important;
		border-radius: $border-radius-extra-small;
		border: none;
		text-align: start;
		color: $n-600;
		box-sizing: border-box;

		&:focus {
			outline: 0;
		}

		&--fluid {
			@extend .search-input__field;
			width: 100%;
		}
	}

	&--disabled {
		background-color: $n-20;
		pointer-events: none;
		border: none;
	}
}
</style>
