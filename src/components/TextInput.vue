<template>
	<div>
		<span>
			<span
				v-if="hasSlots"
			>
				<slot name="label" />
			</span>

			<label
				v-else
				:class="labelDynamicClass"
				for="cds-text-input"
			>
				<span
					class="label__content"
				>
					{{ label }}

					<CdsRequiredIndicator v-if="required" />

					<cds-icon
						v-if="tooltip"
						v-cdstip="tooltip"
						:name="tooltipIcon"
						height="20"
						width="20"
						class="label__icon"
					/>
				</span>

				<cds-link
					v-if="linkTextState"
					class="label__link"
					:href="linkUrl"
					:text="linkText"
					new-tab
				/>
			</label>
		</span>

		<div :class="stepperInputDynamicClass">
			<input
				v-if="mask"
				:id="`cds-text-input-${$attrs.id}`"
				v-model="internalValue"
				v-facade="internalMask"
				:placeholder="placeholder"
				:disabled="disabled"
				:class="inputClass"
				:type="inputType"
				@focus="handleFocus"
				@blur="handleBlur"
			>

			<input
				v-else
				:id="`cds-text-input-${$attrs.id}`"
				v-model="internalValue"
				:placeholder="placeholder"
				:disabled="disabled"
				:class="inputClass"
				:type="inputType"
				@focus="handleFocus"
				@blur="handleBlur"
			>

			<div
				v-if="state !== 'default'"
				class="text-input__icon-container"
			>
				<cds-icon
					v-if="validState && !disabled"
					height="20"
					width="20"
					name="check-outline"
					class="text-input__icon--check-icon"
				/>

				<cds-icon
					v-if="errorState && !disabled"
					height="20"
					width="20"
					name="alert-outline"
					class="text-input__icon--alert-circle-icon"
				/>

				<cds-spinner
					v-if="loadingState && !disabled"
					size="sm"
					variant="blue"
					class="text-input__icon--spinner-icon"
				/>
			</div>
		</div>
		<div
			v-if="errorState && !disabled"
			class="text-input__error-message"
		>
			{{ errorMessage }}
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { facade } from 'vue-input-facade';
import CdsLink from './Link.vue';
import CdsIcon from './Icon.vue';
import CdsSpinner from './Spinner.vue';
import Cdstip from '../utils/directives/cdstip';
import CdsRequiredIndicator from './RequiredIndicator.vue';
import { generateKey } from '../utils';
import { useHasSlots } from '../utils/composables/useHasSlots.js';

const vFacade = facade;
const vCdstip = Cdstip;

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
	 */
	state: {
		type: String,
		default: 'default',
	},
	/**
	 * Especifica o tipo do TextInput. As opções são 'text' e 'email'.
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
	 * Define texto do link do input (localizado à direita da label).
	 */
	linkText: {
		type: String,
		default: null,
	},
	/**
	 * Define a url a ser acessada no clique do link (no caso do link ser exibido).
	 */
	linkUrl: {
		type: String,
		default: 'https://cuida.framer.wiki/',
	},
	/**
	 * Define a utilização de lazy para debouncer.
	 */
	lazy: {
		type: Boolean,
		default: false,
	},
	/**
	 * Define o tipo do input, se true será um input adaptado para o mobile
	 */
	mobile: {
		type: Boolean,
		default: false,
	},
});

const emits = defineEmits({
	'blur': null,
	'focus': null,
});

const internalValue = ref('');
const internalMask = ref(props.mask);
const isBeingFocused = ref(false);
const timeout = ref(null);
const hasSlots = useHasSlots();

const stepperInputDynamicClass = computed(() => {
	let stepperInputClass = props.fluid ? 'text-input--fluid' : 'text-input';

	if (!isBeingFocused.value) {
		if (!props.disabled) {
			if (props.state === 'valid') {
				stepperInputClass += ' text-input--valid';
			} else if (props.state === 'invalid') {
				stepperInputClass += ' text-input--invalid';
			}
		} else {
			stepperInputClass += ' text-input--disabled';
		}
	} else if (!props.disabled) {
		if (props.state === 'default') {
			stepperInputClass += ' text-input--focused';
		} else if (props.state === 'valid') {
			stepperInputClass += ' text-input--focused-valid';
		} else if (props.state === 'invalid') {
			stepperInputClass += ' text-input--focused-invalid';
		} else if (props.state === 'loading') {
			stepperInputClass += ' text-input--focused-loading';
		}
	}

	return stepperInputClass;
});

const labelDynamicClass = computed(() => {
	const labelType = props.mobile ? 'mobile-label' : 'label';

	return props.fluid ? `text-input__${labelType}--fluid` : `text-input__${labelType}`;
});

const validState = computed(() => {
	return props.state === 'valid';
});

const errorState = computed(() => {
	return props.state === 'invalid';
});

const loadingState = computed(() => { 
	return props.state === 'loading';
});

const inputClass = computed(() => {
	const inputType = props.mobile ? 'mobile-field' : 'field';

	return props.fluid ? `text-input__${inputType}--fluid` : `text-input__${inputType}`;
});

const linkTextState = computed(() => {
	return props.linkText ? true : false;
});

watch(props.mask, (newValue) => internalMask.value = newValue);

watch(model, (newValue, oldValue) => {
	if (newValue !== oldValue) {
		internalValue.value = newValue;
	}
}, {immediate: true});

watch(internalValue, (value) => {
	if (props.lazy) {
		emitLazy(value);
	} else {
		model.value = value;
	}
});

/**
 * Permite que o evento seja emitido apenas quando não houver digitação por 1 segundo.
 */
function emitLazy(value) {
	clearTimeout(timeout.value);

	timeout.value = setTimeout(function () {
		model.value = value;
	}, 1000);
};

function handleBlur() {
	isBeingFocused.value = false;
	/**
	 * Evento emitido quando o componente deixa de ser focado.
	 * @event blur
	 * @type {Event}
	*/
	emits('blur', true);
};

function handleFocus() {
	isBeingFocused.value = true;
	/**
	 * Evento emitido quando o componente é focado.
	 * @event focus
	 * @type {Event}
	*/
	emits('focus', true);
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.text-input {
	display: flex;
	justify-content: space-between;
	outline: 1px solid $n-50;
	border-radius: $border-radius-extra-small;
	width: 266px;
	background: $n-0;

	&--fluid {
		@extend .text-input;
		width: 100%;
	}

	&__label {
		@include label;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		width: 266px;

		&--fluid {
			@extend .text-input__label;
			width: 100%;
		}
	}

	&__mobile-label {
		@extend .text-input__label;
		font-size: 14px;
		font-weight: 700;

		&--fluid {
			@extend .text-input__mobile-label;
			width: 100%;
		}
	}

	&__icon-container {
		background-color: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: mr(3);
		min-width: 15px;
	}

	&__field {
		padding: pa(3);
		margin: mr(2);
		height: 40px !important;
		border-radius: $border-radius-extra-small;
		border: none;
		text-align: start;
		color: $n-600;
		width: 100%;

		&::hover {
			cursor: not-allowed;
		}

		&::placeholder {
			color: $n-400;
		}

		&:focus {
			outline: 0;
		}

		&--fluid {
			@extend .text-input__field;
			width: 100%;
		}
	}

	&__mobile-field {
		@extend .text-input__field;
		@include body-2;
		font-weight: 400;
		height: 48px !important;
		border-radius: $border-radius-lil;

		&--fluid {
			@extend .text-input__mobile-field;
			width: 100%;
		}
	}

	&--focused {
		@extend .text-input;
		outline: 1px solid $bn-300;
		box-shadow: 0 0 0 0.2rem rgba($bn-300, .45);
	}

	&--valid {
		@extend .text-input;
		outline: 1px solid $gp-500;
	}

	&--invalid {
		@extend .text-input;
		outline: 1px solid $rc-600;
	}

	&--focused-valid {
		@extend .text-input--valid;
		box-shadow: 0 0 0 0.2rem rgba($gp-300, .45);
	}

	&--focused-invalid {
		@extend .text-input--invalid;
		box-shadow: 0 0 0 0.2rem rgba($rc-300, .45);
	}

	&--disabled {
		background-color: hsl(214 25% 98% / 1);
		pointer-events: none;
		border: none;
		cursor: not-allowed !important;

	}

	&__icon--check-icon {
		color: $gp-500;
		height: 50%;
	}

	&__icon--alert-circle-icon {
		color: $rc-600;
		height: 50%;
	}

	&__icon--spinner-icon {
		padding: 0px;
	}

	&__error-message {
		@include caption;
		color: $rc-600;
		margin: mt(1);
	}
}

.label {
	&__required-indicator {
		color: $rc-600;
	}

	&__icon {
		margin: mTRBL(0, 0, n1, 1);
		cursor: pointer;
	}

	&__link {
		justify-self: end;
	}

	&__content {
		margin: mb(1);
	}
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: ma(0);
}

input:disabled {
	background: none !important;
}
</style>
