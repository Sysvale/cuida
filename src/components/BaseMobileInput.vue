<template>
	<CdsFlexbox
		direction="column"
		gap="1"
	>
		<div
			:class="baseMobileInputClass"
			@click.stop="handleClick"
		>
			<div
				v-if="hasLeadingIcon"
				class="base-mobile-input__leading-icon-container"
			>
				<slot name="leading-icon">
					<CdsIcon
						v-if="leadingIcon"
						height="22"
						width="22"
						:name="leadingIcon"
						class="base-mobile-input__icon"
					/>
				</slot>
			</div>

			<label
				:class="{
					'base-mobile-input__label': !fluid,
					'base-mobile-input__label--fluid': fluid,
				}"
				:for="componentId"
				@click.stop.prevent="handleClick"
			>
				<span
					class="label__content"
				>
					{{ label }}

					<CdsRequiredIndicator v-if="required" />
				</span>
			</label>

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
				tabindex="0"
				:id="componentId"
				ref="htmlInput"
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
				<small class="base-mobile-input__date-text">{{ internalValue || placeholder }}</small>
			</div>

			<input
				v-else
				:id="componentId"
				ref="htmlInput"
				v-bind="{...$attrs, ...props}"
				v-model="internalValue"
				placeholder=""
				:required="required"
				:disabled="disabled"
				:class="inputClass"
				:readonly="readonly"
				:type="type"
				:autocomplete="computedAutocompleteProp"
				@focus="handleFocus"
				@blur="handleBlur"
				@keydown="handleKeydown"
			>

			<div
				v-if="isLoading && !disabled"
				class="base-mobile-input__spinner-container"
			>
				<CdsSpinner
					size="sm"
					variant="blue"
					class="base-mobile-input__icon--spinner-icon"
				/>
			</div>

			<div
				v-if="hasTrailingIcon"
				class="base-mobile-input__trailing-icon-container"
			>
				<slot name="trailing-icon">
					<CdsIcon
						v-if="trailingIcon"
						height="22"
						width="22"
						:name="trailingIcon"
						class="base-mobile-input__icon"
					/>
				</slot>
			</div>
		</div>

		<div
			v-if="hasError && !disabled"
			class="base-mobile-input__error-message"
		>
			{{ errorMessage }}
		</div>

		<template v-if="computedSupportText">
			<ul
				v-if="Array.isArray(computedSupportText)"
				class="base-mobile-input__supporting-text-container"
			>
				<li
					v-if="hasSupportLink"
					class="base-mobile-input__supporting-text-list"
				>
					<CdsFlexbox
						align="baseline"
						gap="1"
					>
						<span class="base-mobile-input__supporting-text">Link: </span>

						<CdsFlexbox
							gap="1"
							align="baseline"
							tag="span"
						>
							<CdsLink
								:text="supportLink"
								:href="supportLinkUrl"
								class="label__link"
								new-tab
							/>

							<CdsIcon
								height="13"
								width="13"
								name="open-in-new-tab-outline"
								class="label__link-icon"
							/>
						</CdsFlexbox>
					</CdsFlexbox>
				</li>

				<li
					v-if="tooltip"
					class="base-mobile-input__supporting-text-list"
				>
					<CdsFlexbox
						gap="1"
						align="center"
					>
						<CdsIcon
							:name="tooltipIcon"
							height="16"
							width="16"
						/>

						{{ tooltip }}
					</CdsFlexbox>
				</li>

				<li
					v-for="text in computedSupportText"
					:key="text"
					class="base-mobile-input__supporting-text-list"
				>
					{{ text }}
				</li>
			</ul>

			<div
				v-else
				class="base-mobile-input__supporting-text"
			>
				<CdsFlexbox
					v-if="tooltip"
					gap="1"
					align="center"
				>
					<CdsIcon
						:name="tooltipIcon"
						height="16"
						width="16"
					/>

					{{ tooltip }}
				</CdsFlexbox>

				<template v-if="!hasSupportLink">
					{{ computedSupportText }}
				</template>

				<CdsFlexbox
					v-if="supportLink"
					align="baseline"
					gap="1"
				>
					<span class="base-mobile-input__supporting-text">Link: </span>

					<CdsFlexbox
						gap="1"
						align="baseline"
						tag="span"
					>
						<CdsLink
							class="label__link"
							:href="supportLinkUrl"
							:text="supportLink"
							new-tab
						/>

						<CdsIcon
							height="13"
							width="13"
							name="open-in-new-tab-outline"
							class="label__link-icon"
						/>
					</CdsFlexbox>
				</CdsFlexbox>
			</div>
		</template>
	</CdsFlexbox>
</template>

<script setup lang="ts">
import { ref, computed, watch, useTemplateRef, useAttrs, nextTick } from 'vue';
import {
	type NativeEvents,
	nativeEmits,
} from '../utils/composables/useComponentEmits.ts';
import generateKey from '../utils/methods/uuidv4';
import inputTypeValidator from '../utils/validators/input';
import CdsLink from './Link.vue';
import CdsIcon from './Icon.vue';
import CdsFlexbox from './Flexbox.vue';
import CdsSpinner from './Spinner.vue';
import CdsRequiredIndicator from './RequiredIndicator.vue';

const model = defineModel('modelValue', {
	type: [String, Number],
});

const props = defineProps({
	/**
	* Especifica a label do input.
	*/
	label: {
		type: String,
		default: 'Nome',
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
	* Especifica a mensagem de erro, que será exibida caso o estado seja inválido
	*/
	errorMessage: {
		type: String,
		default: 'Valor inválido',
	},
	/**
	* Especifica mensagem de auxílio
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
	* Define o ícone que será exibido à direita do input
	*/
	trailingIcon: {
		type: [String, null],
		default: null,
	},
	/**
	* Define o ícone que será exibido à esquerda do input
	*/
	leadingIcon: {
		type: [String, null],
		default: null,
	},
	/**
	* 
	*/
	hasLeadingIcon: {
		type: Boolean,
		default: false,
	},
	hasTrailingIcon: {
		type: Boolean,
		default: false,
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
	* Habilita autocomplete do browser.
	*/
	enableAutocomplete: {
		type: Boolean,
		default: false,
	},
});

const emits = defineEmits<NativeEvents>();

const internalValue = ref('');
const previousInternalValue = ref('');
const isFocused = ref(false);
const attrs = useAttrs();
const { emitClick, emitFocus, emitBlur, emitKeydown } = nativeEmits(emits);
const componentRef = useTemplateRef('htmlInput');
const componentId = `cds-base-mobile-input-${props.type}-${attrs.id || generateKey()}`;
internalValue.value = model.value;

/* COMPUTED */
const computedAutocompleteProp = computed(() => props.enableAutocomplete ? 'on' : 'off');

const baseMobileInputClass = computed(() => {
	let mobileInputClass = props.fluid ? 'base-mobile-input--fluid' : 'base-mobile-input';

	if (!isFocused.value) {
		mobileInputClass +=  props.disabled
			? ' base-mobile-input--disabled'
			: ` base-mobile-input--${props.state}`;
	} else if (!props.disabled) {
		mobileInputClass +=  props.state === 'default'
			? ' base-mobile-input--focused'
			: ` base-mobile-input--focused-${props.state}`;
	}

	return mobileInputClass;
});

const computedSupportText = computed(() => {
	if (props.supportingText) {
		if (typeof props.supportingText === 'string') {
			return hasSupportLink.value ? [props.supportingText] : props.supportingText;
		}
		return [...props.supportingText];
	}

	const text = props.supportLink;

	if (Array.isArray(text) && !hasSupportLink.value && text.length === 1) {
		return text[0];
	}

	return text;
});

const hasError = computed(() => {
	return props.state === 'invalid';
});

const isLoading = computed(() => { 
	return props.state === 'loading';
});

const inputClass = computed(() => {
	const inputType = props.mobile ? 'mobile-field' : 'field';

	return props.fluid ? `base-mobile-input__${inputType}--fluid` : `base-mobile-input__${inputType}`;
});

const hasSupportLink = computed(() => {
	return props.supportLink ? true : false;
});

const inputHeight = computed(() => {
	return props.type === 'textarea' ? 'auto' : '40px';
});

const inputMinHeight = computed(() => {
	return props.type === 'textarea' ? '120px' : 'auto';
});

const inputTopPadding = computed(() => {
	return props.type === 'textarea' ? '16px' : '12px';
});

const spinnerXPosition = computed(() => {
	return props.hasTrailingIcon ? '36px' : '9px';
});

const labelSize = computed(() => {
	return isFocused.value || internalValue.value || internalValue.value === 0 ? '12px' : '14.5px';
});

const labelBottomPosition = computed(() => {
	if (props.type === 'textarea') return 'auto';
	return isFocused.value || internalValue.value || internalValue.value === 0 ? '25px' : '14px';
});

const labelLeftPosition = computed(() => {
	return props.hasLeadingIcon ? '36px' : '12px';
});

const labelColor = computed(() => {
	return isFocused.value || internalValue.value || internalValue.value === 0 ? '#647382' : '#3B4754';
});

const computedCursor = computed(() => {
	if(props.disabled) return 'not-allowed';
	if(isLoading.value) return 'progress';
	if(props.readonly) return 'pointer';

	return 'text';
});

/* WATCHERS */
watch(model, (newValue, oldValue) => {
	if (newValue !== oldValue) {
		internalValue.value = newValue;
	}
	
	if (newValue === 0 || newValue === '0' || newValue === '' || newValue === null || newValue === undefined) {
		internalValue.value = (props.money || attrs.money) ? 'R$ 0,00' : '';
	}
}, { immediate: true });

watch(internalValue, (value) => {
	if (!props.lazy) {
		model.value = value;
	}
});

/* FUNCTIONS */
function handleClick(event) {
	/**
	* Evento emitido quando o componente é clicado.
	* @event click
	* @type {Event}
	*/
	emitClick(event);
	nextTick(() => {
		componentRef.value.focus();
	});
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

.base-mobile-input {
    position: relative;
	padding: tokens.pTRBL(2, 1, 0, 1);
	cursor: v-bind(computedCursor);	
	@extend %input;

	&__supporting-text-container {
		@extend %custom-ul;
	}

	&--fluid {
		@extend .base-mobile-input;
		width: 100%;
	}

	&__label {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		width: 266px;
        position: absolute;
        bottom: v-bind(labelBottomPosition);
		left: v-bind(labelLeftPosition);
        transition: all ease 0.2s;
        font-size: v-bind(labelSize);
        font-weight: tokens.$font-weight-semibold;
		cursor: v-bind(computedCursor);	

		&--fluid {
			@extend .base-mobile-input__label;
			width: 100%;
		}
	}

	&__date-text {
		font-weight: 460;
		letter-spacing: 0.1px;
	}

	&__trailing-icon-container {
		background-color: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: tokens.mTRBL(0, 2, 1, 0);
		min-width: 15px;
	}

	&__leading-icon-container {
		background-color: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: tokens.mTRBL(0, 1, 1, 1);
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
		padding: tokens.pTRBL(3, 1, 0, 2);
		padding-top: v-bind(inputTopPadding);
		height: v-bind(inputHeight);
		min-height: v-bind(inputMinHeight);
		border-radius: tokens.$border-radius-extra-small;
		border: none;
		text-align: start;
		color: tokens.$n-700;
		width: 100%;
		resize: vertical;
        font-size: 14.5px;
		cursor: v-bind(computedCursor);	


		&:focus {
			outline: 0;
		}

		&--fluid {
			@extend .base-mobile-input__field;
			width: 100%;
		}
	}

	&--focused {
		@extend .base-mobile-input;
		@extend %focused;

	}

	&--valid {
		@extend .base-mobile-input;
		@extend %valid;
	}

	&--invalid {
		@extend .base-mobile-input;
		@extend %invalid;
	}

	&--focused-valid {
		@extend .base-mobile-input--valid;
		@extend %focused-valid;
	}

	&--focused-invalid {
		@extend .base-mobile-input--invalid;
		@extend %focused-invalid;
	}

	&--disabled {
		@extend %disabled;
	}

	&__icon--check-icon {
		color: tokens.$gp-500;
		height: 50%;
	}

	&__icon {
		color: tokens.$n-700;
	}

	&__icon--spinner-icon {
		padding: 0px;
	}

	&__error-message {
		@include tokens.caption;
		color: tokens.$rc-600;
		margin: tokens.mt(1);
	}

	&__supporting-text {
		&:nth-child(1) {
			margin: tokens.mt(1);
		}

		@include tokens.caption;
		color: tokens.$n-600;
	}

	&__supporting-text-list {
		@extend .base-mobile-input__supporting-text;
		@extend %custom-li;
	}
}

.label {
	&__icon {
		margin: tokens.mTRBL(0, 0, n1, 1);
		cursor: default;
	}

	&__link {
		justify-self: end;
	}

	&__link-icon {
		color: tokens.$bn-500;
	}

	&__content {
		color: v-bind(labelColor);
		margin: tokens.ma(0);
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
