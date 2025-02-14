<template>
	<div>
		<CdsBaseMobileInput
			v-if="floatingLabel"
			ref="mobileInput"
			v-bind="{...$attrs, ...props}"
			v-model="internalValue"
			:has-leading-icon="hasLeadingIcon"
			:has-trailing-icon="hasTrailingIcon"
			@click="handleClick"
			@focus="handleFocus"
			@blur="handleBlur"
			@keydown="handleKeydown"
		>
			<template #trailing-icon>
				<slot name="trailing-icon" />
			</template>

			<template #leading-icon>
				<slot name="leading-icon" />
			</template>
		</CdsBaseMobileInput>
	
		<template v-else>
			<template
				v-if="useHasSlot('label')"
			>
				<slot name="label" />
			</template>
	
			<label
				v-else
				:class="{
					'base-input__label': !fluid,
					'base-input__label--fluid': fluid,
				}"
				:for="componentId"
			>
				<span
					class="label__content"
				>
					{{ label }}
	
					<CdsRequiredIndicator v-if="required" />
	
					<CdsIcon
						v-if="tooltip"
						v-cdstip="tooltip"
						:name="tooltipIcon"
						height="18"
						width="18"
						class="label__icon"
					/>
				</span>
	
				<CdsLink
					v-if="supportLink"
					:href="supportLinkUrl"
					:text="supportLink"
					class="label__link"
					new-tab
				/>
			</label>
	
			<div
				:class="baseInputClass"
				@click="handleClick"
			>
				<div
					v-if="hasLeadingIcon"
					class="base-input__leading-icon-container"
				>
					<slot name="leading-icon">
						<CdsIcon
							v-if="leadingIcon"
							height="20"
							width="20"
							:name="leadingIcon"
							class="base-input__icon"
						/>
					</slot>
				</div>
	
				<input
					:id="componentId"
					ref="htmlInput"
					v-model="internalValue"
					:required="required"
					:placeholder="placeholder"
					:disabled="disabled"
					:class="inputClass"
					:type="type"
					@focus="handleFocus"
					@blur="handleBlur"
					@keydown="handleKeydown"
				>
	
				<div
					v-if="isLoading && !disabled"
					class="base-input__trailing-icon-container"
				>
					<CdsSpinner
						size="sm"
						variant="blue"
						class="base-input__icon--spinner-icon"
					/>
				</div>
	
				<div
					v-if="hasTrailingIcon"
					class="base-input__trailing-icon-container"
				>
					<slot name="trailing-icon">
						<CdsIcon
							height="20"
							width="20"
							:name="trailingIcon"
							class="base-input__icon"
						/>
					</slot>
				</div>
			</div>
	
			<div
				v-if="hasError && !disabled"
				class="base-input__error-text"
			>
				{{ errorMessage }}
			</div>
	
			<template
				v-if="supportingText"
			>
				<ul
					v-if="Array.isArray(supportingText)"
					class="base-input__supporting-text-container"
				>
					<li
						v-for="text in supportingText"
						:key="text"
						class="base-input__supporting-text-list"
					>
						{{ text }}
					</li>
				</ul>
	
				<span
					v-else
					class="base-input__supporting-text"
				>
					{{ supportingText }}
				</span>
			</template>
		</template>
	</div>
</template>

<script setup>
import { ref, computed, watch, useTemplateRef, onMounted, useAttrs } from 'vue';
import { useHasSlot } from '../utils/composables/useHasSlot.js';
import {
	nativeEvents,
	nativeEmits,
} from '../utils/composables/useComponentEmits.js';
import generateKey from '../utils/methods/uuidv4';
import inputTypeValidator from '../utils/validators/input';
import vCdstip from '../utils/directives/cdstip';
import CdsLink from './Link.vue';
import CdsIcon from './Icon.vue';
import CdsSpinner from './Spinner.vue';
import CdsRequiredIndicator from './RequiredIndicator.vue';
import CdsBaseMobileInput from './BaseMobileInput.vue';

const model = defineModel('modelValue', {
	type: [String, Number],
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
	type: {
		type: String,
		default: 'text',
		validator: inputTypeValidator,
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
		default: 'Digite aqui...',
	},
	/**
	* Especifica a mensagem de erro, que será exibida caso o estado seja inválido
	*/
	errorMessage: {
		type: String,
		default: 'Valor inválido',
	},
	/**
	* Especifica mensagem de auxílio.
	*/
	supportingText: {
		type: [String, Array],
		default: '',
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
		type: String,
		default: 'https://cuida.framer.wiki/',
	},
	/**
	* Define o tipo do input, se `true` será um input adaptado para o mobile. Quando essa prop está ativa é renderizado o componente baseMobileInput.
	*/
	floatingLabel: {
		type: Boolean,
		default: false,
	},
	/**
	* Define o ícone que será exibido à esquerda do input
	*/
	leadingIcon: {
		type: [String, null],
		default: null,
	},
	/**
	* Define o ícone que será exibido à direita do input
	*/
	trailingIcon: {
		type: [String, null],
		default: null,
	},
});

const emits = defineEmits({
	...nativeEvents
});

/* REACTIVE DATA */
const attrs = useAttrs();
const componentRef = ref();
const internalValue = ref('');
const previousInternalValue = ref('');
const isFocused = ref(false);
const { emitClick, emitFocus, emitBlur, emitKeydown, emitChange } = nativeEmits(emits);
const htmlInputRef = useTemplateRef('htmlInput');
const baseMobileInputRef = useTemplateRef('mobileInput');
const componentId = `cds-base-input-${attrs.id || generateKey()}`;

/* COMPUTED */
const baseInputClass = computed(() => {
	let inputClass = props.fluid ? 'base-input--fluid' : 'base-input';

	if (!isFocused.value) {
		inputClass +=  props.disabled
			? ' base-input--disabled'
			: ` base-input--${props.state}`;
	} else if (!props.disabled) {
		inputClass +=  props.state === 'default'
			? ' base-input--focused'
			: ` base-input--focused-${props.state}`;
	}

	return inputClass;
});

const hasError = computed(() => {
	return props.state === 'invalid';
});

const isLoading = computed(() => { 
	return props.state === 'loading';
});

const inputClass = computed(() => {
	const type = 'field';

	return props.fluid
		? `base-input__${type}--fluid`
		: `base-input__${type}`;
});

const computedCursor = computed(() => {
	if(props.disabled) return 'not-allowed';
	if(isLoading.value) return 'progress';

	return 'text';
});

const hasLeadingIcon = computed(() => {
	return props.leadingIcon || useHasSlot('leading-icon');
});

const hasTrailingIcon = computed(() => {
	return props.trailingIcon || useHasSlot('trailing-icon');
});

/* WATCHERS */
watch(model, (newValue, oldValue) => {
	if (newValue !== oldValue) {
		internalValue.value = newValue;
	}
}, { immediate: true });

watch(internalValue, (value) => {
	model.value = value;
});

watch(() => props.floatingLabel, () => {
	componentRef.value = props.floatingLabel
		? baseMobileInputRef?.value?.componentRef
		: htmlInputRef.value;
});

/* HOOKS */
onMounted(() => {
	componentRef.value = props.floatingLabel 
		? baseMobileInputRef?.value?.componentRef
		: htmlInputRef.value;
});

/* FUNCTIONS */
function handleClick() {
	/**
	* Evento emitido quando o componente é clicado.
	* @event click
	* @type {Event}
	*/
	emitClick();
}

function handleFocus() {
	isFocused.value = true;
	previousInternalValue.value = internalValue.value;
	/**
	* Evento emitido quando o componente é focado.
	* @event focus
	* @type {Event}
	*/
	emitFocus();
}

function handleBlur() {
	isFocused.value = false;
	/**
	* Evento emitido quando o componente deixa de ser focado.
	* @event blur
	* @type {Event}
	*/
	emitBlur();

	if(previousInternalValue.value !== internalValue.value) {
		emitChange();
	}
	previousInternalValue.value = internalValue.value;
}

function handleKeydown(keyEvent) {
	isFocused.value = true;
	/**
	* Evento emitido quando o usuário digita.
	* @event keydown
	* @type {Event}
	*/
	emitKeydown(keyEvent);
}

/* EXPOSE */
defineExpose({
	componentRef,
	isFocused,
	focus: () => componentRef.value?.focus(),
	blur: () => componentRef.value?.blur(),
	clear: () => componentRef.value?.clear(),
	select: () => componentRef.value?.select(),
});
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';
@import '../assets/sass/placeholders.scss';

.base-input {
	@extend %input;
	display: flex;
	justify-content: space-between;
	cursor: v-bind(computedCursor);

	&__supporting-text-container {
		@extend %custom-ul;
	}

	&--fluid {
		@extend .base-input;
		width: 100%;
	}

	&__label {
		@include label;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		width: 266px;

		&--fluid {
			@extend .base-input__label;
			width: 100%;
		}
	}

	&__leading-icon-container {
		background-color: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: ml(2);
		min-width: 15px;
	}

	&__trailing-icon-container {
		background-color: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: mr(3);
		min-width: 15px;
	}

	&__field {
		padding: pTRBL(0, 2, 3, 2);
		padding-top: 14px;
		height: 40px !important;
		border-radius: $border-radius-extra-small;
		border: none;
		text-align: start;
		color: $n-600;
		width: 100%;
		cursor: v-bind(computedCursor);
		background-color: transparent;

		&::placeholder {
			@extend %placeholder;
		}

		&:focus {
			outline: 0;
		}

		&--fluid {
			@extend .base-input__field;
			width: 100%;
		}
	}

	&--focused {
		@extend .base-input;
		@extend %focused;
	}

	&--valid {
		@extend .base-input;
		@extend %valid;
	}

	&--invalid {
		@extend .base-input;
		@extend %invalid;
	}

	&--focused-valid {
		@extend .base-input--valid;
		@extend %focused-valid;
	}

	&--focused-invalid {
		@extend .base-input--invalid;
		@extend %focused-invalid;
	}

	&--disabled {
		@extend %disabled;
	}

	&__icon {
		color: $n-700;
	}

	&__icon--alert-circle-icon {
		color: $rc-600;
		height: 50%;
	}

	&__icon--spinner-icon {
		padding: 0px;
	}

	&__error-text {
		@include caption;
		color: $rc-600;
		margin: mt(1);
	}

	&__supporting-text {
		&:nth-child(1) {
			margin: mt(2);
		}

		@include caption;
		color: $n-600;
		margin: mt(1);
	}

	&__supporting-text-list {
		@extend .base-input__supporting-text;
		@extend %custom-li;
	}
}

.label {
	&__icon {
		margin: mTRBL(0, 0, n1, 1);
		cursor: default;
		color: $n-700;
	}

	&__link {
		justify-self: end;
	}

	&__content {
		color: $n-800;
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
