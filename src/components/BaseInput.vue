<template>
	<div class="base-input__container">
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
	
			<CdsLabel
				v-if="!hideLabelInput"
				:text="label"
				:fluid="fluid"
				:for="componentId"
				:required="required"
				:tooltip="tooltip"
				:tooltip-icon="tooltipIcon"
				:support-link="supportLink"
				:support-link-url="supportLinkUrl"
				@support-link-click="emits('supportLinkClick')"
			/>
	
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
	
				<textarea
					v-if="type === 'textarea'"
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
				/>
	
				<div
					v-else-if="type === 'date'"
					:id="componentId"
					ref="htmlInput"
					tabindex="0"
					v-bind="props"
					:placeholder="placeholder"
					:disabled="disabled"
					:class="inputClass"
					:type="type"
					:autocomplete="computedAutocompleteProp"
					@focus="handleFocus"
					@blur="handleBlur"
					@keydown="handleKeydown"
				>
					<small class="base-input__date-text">{{ internalValue || placeholder }}</small>
				</div>
	
				<div 
					v-else
					style="width: 100%;"
				>
					<div
						v-if="enableTopContent"
						class="base-input__top-content"
					>
						<slot name="top-content" />
					</div>
	
					<input
						:id="componentId"
						ref="htmlInput"
						v-bind="props"
						v-model="internalValue"
						:required="required"
						:readonly="readonly"
						:placeholder="placeholder"
						:disabled="disabled"
						:class="inputClass"
						:autocomplete="computedAutocompleteProp"
						:type="type"
						@focus="handleFocus"
						@blur="handleBlur"
						@keydown="handleKeydown"
					>
				</div>
	
				<div
					v-if="isLoading && !disabled"
					class="base-input__spinner-container"
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
import { ref, computed, watch, useTemplateRef, onMounted } from 'vue';
import { useHasSlot } from '../utils/composables/useHasSlot.js';
import {
	nativeEvents,
	nativeEmits,
} from '../utils/composables/useComponentEmits.js';
import generateKey from '../utils/methods/uuidv4';
import inputTypeValidator from '../utils/validators/input';
import CdsIcon from './Icon.vue';
import CdsSpinner from './Spinner.vue';
import CdsBaseMobileInput from './BaseMobileInput.vue';
import CdsLabel from './Label.vue';

const model = defineModel('modelValue', {
	type: [String, Number],
});

const props = defineProps({
	/**
	* ID do input.
	*/
	id: {
		type: String,
		default: '',
	},
	/**
	* Especifica a label do input.
	*/
	label: {
		type: String,
		default: 'Label',
	},
	/**
	 * Quando ativado e o tipo selecionado for for search a label não será exibida.
	 */
	hideLabel: {
		type: Boolean,
		default: false,
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
		type: [String, null],
		default: null,
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
	/**
	* Quando true, o v-model é atualizado com o evento `change` no lugar do `input`.
	*/
	lazy: {
		type: Boolean,
		default: false,
	},
	/**
	* Quando true, o input é somente leitura.
	*/
	readonly: {
		type: Boolean,
		default: false,
	},
	/**
	* Define o número máximo de caracteres do input.
	*/
	maxlength: {
		type: Number,
		default: null,
	},
	/**
	* Define o número mínimo de caracteres do input.
	*/
	minlength: {
		type: Number,
		default: null,
	},
	/**
	* Define o nome do input.
	*/
	name: {
		type: String,
		default: '',
	},
	/**
	* Habilita autocomplete do browser.
	*/
	enableAutocomplete: {
		type: Boolean,
		default: false,
	},
	/**
	 * Habilita exibição de conteudo na parte superior do input
	 */
	enableTopContent: {
		type: Boolean,
		default: false,
	},
});

const emits = defineEmits({
	...nativeEvents,
	'supportLinkClick': null,
});

/* REACTIVE DATA */
const componentRef = ref();
const internalValue = ref('');
const previousInternalValue = ref('');
const isFocused = ref(false);
const { emitClick, emitFocus, emitBlur, emitKeydown } = nativeEmits(emits);
const htmlInputRef = useTemplateRef('htmlInput');
const baseMobileInputRef = useTemplateRef('mobileInput');
const componentId = `cds-base-input-${props.type}-${props.id || generateKey()}`;

/* COMPUTED */
const computedAutocompleteProp = computed(() => props.enableAutocomplete ? 'on' : 'off');

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

const inputHeight = computed(() => {
	return props.type === 'textarea' ? 'auto' : '40px';
});

const inputMinHeight = computed(() => {
	return props.type === 'textarea' ? '120px' : 'auto';
});

const inputTopPadding = computed(() => {
	return props.type === 'textarea' ? '8px' : '14px';
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
	if(props.readonly) return 'pointer';

	return 'text';
});

const hasLeadingIcon = computed(() => {
	return props.leadingIcon || useHasSlot('leading-icon');
});

const hasTrailingIcon = computed(() => {
	return props.trailingIcon || useHasSlot('trailing-icon');
});

const spinnerXPosition = computed(() => {
	return hasTrailingIcon.value ? '36px' : '9px';
});

const hideLabelInput = computed(() => props.type === 'search'
	&& props.hideLabel
	&& !props.floatingLabel
);

/* WATCHERS */
watch(model, (newValue, oldValue) => {
	if (newValue !== oldValue) {
		internalValue.value = newValue;
	}
}, { immediate: true });

watch(internalValue, (value) => {
	if (!props.lazy) {
		model.value = value;
	}
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
function handleClick(event) {
	/**
	* Evento emitido quando o componente é clicado.
	* @event click
	* @type {Event}
	*/
	emitClick(event);
}

function handleFocus(event) {
	isFocused.value = true;
	previousInternalValue.value = internalValue.value;
	/**
	* Evento emitido quando o componente é focado.
	* @event focus
	* @type {Event}
	*/
	emitFocus(event);
}

function handleBlur(event) {
	isFocused.value = false;
	/**
	* Evento emitido quando o componente deixa de ser focado.
	* @event blur
	* @type {Event}
	*/
	emitBlur(event);

	if(previousInternalValue.value !== internalValue.value) {
		model.value = internalValue.value;
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
@use '../assets/sass/tokens/index' as tokens;
@use'../assets/sass/placeholders.scss';

.base-input {
	@extend %input;
	display: flex;
	justify-content: space-between;
	position: relative;
	cursor: v-bind(computedCursor);

	&__container {
		width: inherit;
	}

	&__top-content {
		padding: tokens.pa(1);
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: tokens.spacer(2);
	}

	&__supporting-text-container {
		@extend %custom-ul;
	}

	&--fluid {
		@extend .base-input;
		width: 100%;
	}

	&__label {
		@include tokens.label;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		width: 266px;

		&--fluid {
			@extend .base-input__label;
			width: 100%;
		}
	}

	&__date-text {
		display: block;
		font-weight: 460;
		letter-spacing: 0.1px;
		margin-top: -1px;
	}

	&__leading-icon-container {
		background-color: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: tokens.ml(2);
		min-width: 15px;
	}

	&__trailing-icon-container {
		background-color: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: tokens.mr(3);
		min-width: 15px;
	}

	&__spinner-container {
		background-color: none;
		min-width: 15px;
		position: absolute;
		right: v-bind(spinnerXPosition);
		top: 12px;
	}

	&__field {
		padding: tokens.pTRBL(0, 2, 3, 2);
		padding-top: v-bind(inputTopPadding);
		height: v-bind(inputHeight);
		min-height: v-bind(inputMinHeight);
		border-radius: tokens.$border-radius-extra-small;
		border: none;
		text-align: start;
		color: tokens.$n-600;
		width: 100%;
		resize: vertical;
		cursor: v-bind(computedCursor);
		background-color: transparent;
		line-height: 1.5;

		&::placeholder {
			@extend %placeholder;
		}

		&::-webkit-scrollbar {
			width: 12px;
			border-radius: tokens.$border-radius-lil;
		}

		&::-webkit-scrollbar-track {
			background: transparent;
		}

		&::-webkit-scrollbar-thumb {
			background: tokens.$n-100;
			border-radius: tokens.$border-radius-lil;
			border-right: 3px solid transparent;
			border-left: 3px solid transparent;
			background-clip: padding-box;
		}

		&::-webkit-scrollbar-thumb:hover {
			background: tokens.$n-200;
			border-radius: tokens.$border-radius-lil;
			border-right: 3px solid transparent;
			border-left: 3px solid transparent;
			background-clip: padding-box;
			cursor: default;
		}

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
		color: tokens.$n-700;
	}

	&__icon--alert-circle-icon {
		color: tokens.$rc-600;
		height: 50%;
	}

	&__icon--spinner-icon {
		padding: 0px;
	}

	&__error-text {
		@include tokens.caption;
		color: tokens.$rc-600;
		margin: tokens.mt(1);
	}

	&__supporting-text {
		&:nth-child(1) {
			margin: tokens.mt(2);
		}

		@include tokens.caption;
		color: tokens.$n-600;
		margin: tokens.mt(1);
	}

	&__supporting-text-list {
		@extend .base-input__supporting-text;
		@extend %custom-li;
	}
}

.label {
	&__icon {
		margin: tokens.mTRBL(0, 0, n1, 1);
		cursor: default;
		color: tokens.$n-700;
	}

	&__link {
		justify-self: end;
	}

	&__content {
		color: tokens.$n-800;
		margin: tokens.mb(1);
	}
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: tokens.ma(0);
}

input:disabled {
	background: none !important;
}
</style>
