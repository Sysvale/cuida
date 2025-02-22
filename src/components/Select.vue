<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		ref="cds-select"
		class="select"
	>
		<div
			class="select__container"
			:class="fluid ? 'select__container--fluid' : 'select__container--fit'"
		>
			<CdsBaseInput
				:id="$attrs.id || id"
				ref="baseInput"
				v-bind="{...$attrs, ...props}"
				v-model="localValue[optionsField]"
				type="text"
				autocomplete="off"
				:onkeypress="`return ${allowSearch};`"
				:placeholder="placeholder"
				:disabled="disabled"
				:readonly="!searchable"
				:support-link-url="supportLinkUrl || linkUrl"
				:support-link="supportLink || linkText"
				:floating-label="floatingLabel || mobile"
				@keydown.enter.prevent="activateSelectionOnEnter"
				@keydown.arrow-down.prevent="highlightOnArrowDown"
				@keydown.arrow-up.prevent="highlightOnArrowUp"
				@click="activateSelectionOnClick"
				@input="filterOptions"
				@focus="activeSelection"
				@blur="hide"
			>
				<template #trailing-icon>
					<!-- opa -->
					<span
						:class="active ? 'select__chevron--opened' : 'select__chevron--closed'"
					/>
				</template>
			</CdsBaseInput>

			<div
				v-show="active"
				ref="select-options"
				class="select__options"
				:class="{
					'select__options--thin': width === 'thin',
					'select__options--default': width === 'default',
					'select__options--wide': width === 'wide',
					'select__options--fluid': fluid,
					'select__options--down': direction === 'down',
					'select__options--up': direction === 'up',
				}"
			>
				<ul
					v-if="localOptions.length > 0"
					class="option__container"
				>
					<li
						v-for="(option, index) in localOptions"
						:key="index"
						:ref="(el) => { liRefs[`${option[optionsField]}-${index}`] = el }"
						class="option__text"
						@mousedown="selectItem"
						@mouseover="highlightOnMouseOver(index)"
						@mouseout="unhighlightOnMouseOut()"
					>
						{{ option[optionsField] }}
					</li>
				</ul>

				<ul
					v-else
					class="option__container"
				>
					<li
						class="option__text--muted"
					>
						Nenhuma opção encontrada
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch, computed, useTemplateRef, onMounted, nextTick  } from 'vue';
import {
	nativeEvents,
	nativeEmits,
} from '../utils/composables/useComponentEmits.js';
import { widths } from '../utils';
import { generateKey } from '../utils';
import cloneDeep from 'lodash.clonedeep';
import removeAccents from '../utils/methods/removeAccents';
import CdsBaseInput from './BaseInput.vue';


const model = defineModel('modelValue', {
	type: [Array, Object],
});

const props = defineProps({
	/**
	 * Especifica o título do select.
	 */
	label: {
		type: String,
		default: 'Label',
		required: true,
	},
	/**
	 * Indica o texto que instrui o usuário a como interagir com o select.
	 */
	placeholder: {
		type: String,
		default: 'Selecione...',
		required: false,
	},
	/**
	 * Array de objetos que especifica a lista de opções do select. Os valores
	 * a serem mostrado como opções do select devem estar atribuídos a chave
	 * `value` do objeto.
	 */
	options: {
		type: Array,
		default: () => [],
		required: true,
	},
	/**
	 * Especifica o estado do Select. As opções são 'default', 'valid', 'loading' e 'invalid'.
	 */
	state: {
		type: String,
		default: 'default',
	},
	/**
	 * Controla a exibição do asterísco indicativo de campo obrigatório.
	 */
	required: {
		type: Boolean,
		default: false,
		required: false,
	},
	/**
	 * Especifica a mensagem de erro, que será exibida caso o estado seja inválido
	 */
	errorMessage: {
		type: String,
		default: 'Valor inválido',
	},
	/**
	 * Indica se vai ser possível fazer buscas no select.
	 */
	searchable: {
		type: Boolean,
		default: false,
		required: false,
	},
	/**
	 * <span className="deprecated-warning">[DEPRECATED]</span> Define a largura do Select. As opções são 'thin', 'default' e 'wide'.
	 */
	width: {
		type: String,
		default: 'default',
		required: false,
	},
	/**
	 * Especifica se a largura do select deve ser fluida.
	 */
	fluid: {
		type: Boolean,
		default: false,
		required: false,
	},
	/**
	 * Especifica o status de interação do select.
	 */
	disabled: {
		type: Boolean,
		default: false,
		required: false,
	},
	/**
	 * Define exibição e texto do tooltip do select
	 */
	tooltip: {
		type: String,
		default: null,
	},
	/**
	 * Especifica ícone do tooltip do Select.
	 */
	tooltipIcon: {
		type: String,
		default: 'info-outline',
	},
	/**
	* Indica o nome da da chave do objeto a ser considerada na renderização
	* das opções do select.
	*/
	optionsField: {
		type: String,
		default: 'value',
		required: false,
	},
	/**
	* Quando true, passa a retornar o optionsField no modelValue fora do objeto
	* das opções do select.
	*/
	returnValue: {
		type: Boolean,
		default: false,
		required: false,
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
		type: String,
		default: 'https://cuida.framer.wiki/',
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
});


const currentPos = ref(0);
const active = ref(false);
const id = ref(null);
const allowSearch = ref(false);
const localOptions = ref([]);
const pristineOptions = ref([]);
const localValue = ref({});
const selectElement = ref('');
const direction = ref('down');
const uniqueKey = ref(generateKey());

const select = useTemplateRef('baseInput');
const cdsSelect = useTemplateRef('cds-select');
const selectOptions = useTemplateRef('select-options');
const liRefs = ref({});




const errorState = computed(() => {
	return props.state === 'invalid';
});

const inputClass = computed(() => {
	let returningClass = '';
	const inputClass = props.mobile ? 'select__mobile-input' : 'select__input';

	if (active.value && direction.value === 'down') {
		returningClass = `${inputClass}--opened-down`;
	} else if (active.value && direction.value === 'up') {
		returningClass = `${inputClass}--opened-up`;
	} else {
		returningClass = `${inputClass}--closed`;
	}

	if (!props.disabled) {
		if (props.state === 'valid') {
			returningClass += ` ${inputClass}--valid`;
		} else if (props.state === 'invalid') {
			returningClass += ` ${inputClass}--invalid`;
		}
	} else {
		returningClass += ` ${inputClass}--disabled`;
	}

	returningClass += ` ${inputClass}--${widths.find((item) => item === props.width)}`;
	returningClass += props.fluid ? ` ${inputClass}--fluid` : ` ${inputClass}--fit`;
	returningClass += props.searchable ? ` ${inputClass}--searchable` : '';

	return returningClass;
});

const resolveLabel = computed(() => {
	return props.mobile ? 'mobile-label' : 'label';
});

const resolveChevronTop = computed(() => {
	return props.mobile ? '9px' : '6px';
});

watch(() => props.searchable, (newValue, oldValue) => {
	if (newValue !== oldValue) {
		allowSearch.value = newValue;
	}
}, { immediate: true });

watch(() => props.options, (newValue, oldValue) => {
	if (newValue !== oldValue) {
		localOptions.value = newValue;
		pristineOptions.value = newValue;
	}
}, { immediate: true });

watch(() => model, (newValue, oldValue) => { 
	if (newValue !== oldValue) {
		if (newValue instanceof Object) {
			localValue.value = newValue.value;
		} else {
			localValue.value = {id: newValue, value: newValue }
		}
	}
}, { immediate: true });

watch(localValue, (currentValue) => {
	const compatibleOptions = localOptions.value.filter(
		(option) => JSON.stringify(option) === JSON.stringify(currentValue),
	);
	if (compatibleOptions.length === 0) {
		return;
	}
	if (props.returnValue) {
		/**
		* Evento que indica que o valor do Select foi alterado
		* @event update:modelValue
		* @type {Event}
		*/
		model.value = currentValue[props.optionsField];
	} else {
		model.value = currentValue;
	}
}, { deep: true });

onMounted(() => {
	id.value = `cds-select-${uniqueKey.value}`;
	selectElement.value = cdsSelect.value;
});

function filterOptions() {
	const sanitizedString = removeAccents(localValue.value[props.optionsField]);
	const regexExp = new RegExp(sanitizedString, 'i');

	localOptions.value = props.options.filter(
		(option) => removeAccents(option[props.optionsField]).search(regexExp) >= 0,
	);
}

function activeSelection() {
	if (props.disabled) return;

	resetActiveSelection();

	nextTick().then(() => {
		const element = localOptions.value[currentPos.value];
		// this.$refs[`${element[props.optionsField]}-${currentPos.value}`][0].classList.add('highlight');
		// liRefs.value[`${element[props.optionsField]}-${currentPos.value}`].classList.add('highlight');
	});
}

function activateSelectionOnEnter() {
	if (props.disabled) return;

	active.value = !active.value;

	resetActiveSelection();

	if (typeof localOptions.value[currentPos.value] === 'undefined') {
		localOptions.value = pristineOptions.value;
	} else {
		localValue.value = cloneDeep(localOptions.value[currentPos.value]);
	}

	select.value.focus();
}

function activateSelectionOnClick() {
	let boundingRect = selectElement.value.getBoundingClientRect();

	if ((boundingRect.top + boundingRect.height + 286) < window.innerHeight) {
		direction.value = 'down';
	} else {
		direction.value = 'up';
	}

	if (props.disabled) return;

	active.value = !active.value;
}

function hide() {
	localOptions.value = pristineOptions.value;
	active.value = false;
}

function selectItem() {
	localValue.value = cloneDeep(localOptions.value[currentPos.value]);
}

function getLiInDOM(position) {
	const element = localOptions.value[position];
	// return this.$refs[`${element[props.optionsField]}-${position}`][0];
	return liRefs.value[`${element[props.optionsField]}-${position}`];
}

function handleOptionVisibility(option, amount, direction) {
	const optionDOMRect = option.getBoundingClientRect();
	const optionsContainer = selectOptions.value;
	const optionsContainerDOMRect = optionsContainer.getBoundingClientRect();

	if (
		direction === 'up'
		&& optionDOMRect.top <= optionsContainerDOMRect.top
	) {
		optionsContainer.scrollTop += amount;
	}

	if (
		direction === 'down'
		&& optionDOMRect.top >= optionsContainerDOMRect.bottom
	) {
		optionsContainer.scrollTop += amount;
	}
}

function highlightOnArrowDown() {
	if (currentPos.value === localOptions.value.length - 1) return;

	currentPos.value += 1;
	const selectedOption = getLiInDOM(currentPos.value);
	const previousOption = getLiInDOM(currentPos.value - 1);

	selectedOption.classList.add('highlight');
	previousOption.classList.remove('highlight');

	handleOptionVisibility(selectedOption, 37, 'down');
}

function highlightOnArrowUp() {
	if (currentPos.value === 0) return;

	const selectedOption = getLiInDOM(currentPos.value);
	const previousOption = getLiInDOM(currentPos.value - 1);

	selectedOption.classList.remove('highlight');
	previousOption.classList.add('highlight');

	handleOptionVisibility(selectedOption, -37, 'up');
	currentPos.value -= 1;
}

function highlightOnMouseOver(index) {
	currentPos.value = index;
	getLiInDOM(currentPos.value).classList.add('highlight');
}

function unhighlightOnMouseOut() {
	getLiInDOM(currentPos.value).classList.remove('highlight');
}

function resetActiveSelection() {
	localOptions.value.forEach((option, index) => {
		const element = localOptions.value[index];
		// this.$refs[`${element[props.optionsField]}-${index}`][0].classList.remove('highlight');
		// liRefs.value[`${element[props.optionsField]}-${currentPos.value}`].classList.remove('highlight');

	})
}

</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

#cds-select {
	-webkit-user-select: none; /* Safari */
	-ms-user-select: none; /* IE 10 and IE 11 */
	user-select: none;
}

.select {
	&__input {
		height: 40px;
		border: none;
		outline: 1px solid $n-50;
		background: $n-0;
		padding-right: spacer(8);
		padding-left: spacer(3);
		color: $n-600;
		caret-color: transparent;
		cursor: pointer;
		background-color: $n-0;
		@include body-2;
		text-overflow: ellipsis;

		&:hover:not([disabled]):not(.select__input--invalid):not(.select__input--valid) {
			outline: 1px solid $n-100;
		}

		&--closed {
			@extend .select__input;
			border-radius: $border-radius-extra-small !important;
		}

		&--opened-down {
			@extend .select__input;
			border-top-left-radius: $border-radius-extra-small !important;
			border-top-right-radius: $border-radius-extra-small !important;
		}

		&--opened-up {
			@extend .select__input;
			border-bottom-left-radius: $border-radius-extra-small !important;
			border-bottom-right-radius: $border-radius-extra-small !important;
		}

		&--searchable {
			caret-color: $n-700;
		}

		&--thin {
			width: 150px;
		}

		&--default {
			width: 300px;
		}

		&--wide {
			width: 600px;
		}

		&--fluid {
			width: 100%;
		}

		&--disabled {
			background-color: $n-20 !important;
			pointer-events: none;
			border: none;
		}

		&--valid {
			outline: 1px solid $gp-500;
		}

		&--invalid {
			outline: 1px solid $rc-600;
		}

		&::placeholder {
			color: $n-300;
			@include body-2;
		}

		&--disabled::placeholder {
			color: $n-100;
		}
	}

	&__mobile-input {
		@extend .select__input;
		@include body-2;
		height: 48px;
		font-weight: 400;
		border-radius: $border-radius-lil;

		&:hover:not([disabled]):not(.select__mobile-input--invalid):not(.select__mobile-input--valid) {
			outline: 1px solid $n-100;
		}

		&--closed {
			@extend .select__mobile-input;
			border-radius: $border-radius-extra-small !important;
		}

		&--opened-down {
			@extend .select__mobile-input;
			border-top-left-radius: $border-radius-extra-small !important;
			border-top-right-radius: $border-radius-extra-small !important;
		}

		&--opened-up {
			@extend .select__mobile-input;
			border-bottom-left-radius: $border-radius-extra-small !important;
			border-bottom-right-radius: $border-radius-extra-small !important;
		}

		&--searchable {
			caret-color: $n-700;
		}

		&--thin {
			width: 150px;
		}

		&--default {
			width: 300px;
		}

		&--wide {
			width: 600px;
		}

		&--fluid {
			width: 100%;
		}

		&--disabled {
			background-color: $n-20 !important;
			pointer-events: none;
			border: none;
		}

		&--valid {
			outline: 1px solid $gp-500;
		}

		&--invalid {
			outline: 1px solid $rc-600;
		}

		&::placeholder {
			color: $n-300;
			@include body-2;
		}

		&--disabled::placeholder {
			color: $n-100;
		}
	}

	&__label {
		@include label;
		display: flex;
	}

	&__mobile-label {
		@extend .select__label;
		font-size: 14px;
		font-weight: 700;
	}

	&__container {
		position: relative;

		&--fluid {
			width: 100%;
		}

		&--fit {
			width: fit-content;
		}
	}

	&__chevron--closed {
		//position: absolute;
		top: v-bind(resolveChevronTop);
		right: 2px;
		display: block;
		height: 32px;
		width: 32px;
		pointer-events: none;
		border-radius: $border-radius-small;
		display: flex;
		align-items: center;
		justify-content: center;

		&::before,
		&::after {
			content: '';
			width: 0;
			height: 0;
		}

		&::before {
			border-left: 6px solid transparent;
			border-right: 6px solid transparent;
			border-bottom: 6px solid $n-100;
			border-radius: $border-radius-small;
			transition: all 300ms ease-in-out;
			transform: rotate(-180deg);
		}
	}

	&__chevron--opened {
		//position: absolute;
		top: v-bind(resolveChevronTop);
		right: 2px;
		display: block;
		height: 32px;
		width: 32px;
		pointer-events: none;
		border-radius: $border-radius-small;
		display: flex;
		align-items: center;
		justify-content: center;

		&::before,
		&::after {
			content: '';
			width: 0;
			height: 0;
		}

		&::before {
			border-left: 6px solid transparent;
			border-right: 6px solid transparent;
			border-bottom: 6px solid $n-100;
			border-radius: $border-radius-small;
			transition: all 300ms ease-in-out;
			transform: rotate(0deg);
		}
	}

	&__options {
		@include body-2;
		color: $n-700;
		outline: 1px solid $n-40;
		display: flex;
		flex-direction: column;
		margin-top: 6px;
		justify-items: center;
		text-overflow: ellipsis;
		max-height: 296px;
		overflow: auto;
		position: absolute;
		z-index: 999;
		background-color: $n-0;
		border-radius: $border-radius-extra-small;

		&--thin {
			width: 150px;
		}

		&--default {
			width: 300px;
		}

		&--wide {
			width: 600px;
		}

		&--fluid {
			width: 100%;
		}

		&::-webkit-scrollbar {
			width: 12px;
			border-radius: 20px;
		}

		&::-webkit-scrollbar-track {
			background: transparent;
		}

		&::-webkit-scrollbar-thumb {
			background: $n-100;
			border-radius: 5px;
			border-right: 3px solid transparent;
			border-left: 3px solid transparent;
			background-clip: padding-box;
		}
		
		&::-webkit-scrollbar-thumb:hover {
			background: $n-50;
		}

		&--up { /////TODO: fix this
			bottom: 40px;
			width: 100%;
			border-top-left-radius: $border-radius-extra-small;
			border-top-right-radius: $border-radius-extra-small;
		}

		&--down { /////TODO: fix this
			width: 100%;
			border-bottom-left-radius: $border-radius-extra-small;
			border-bottom-right-radius: $border-radius-extra-small;
		}
	}

	&__error-message {
		@include caption;
		color: $rc-600;
		margin: mt(1);
	}
}

.option {
	&__text {
		padding: pa(3);
		text-overflow: ellipsis;

		&--muted {
			@extend .option__text;
			color: $n-400;
		}
	}

	&__container {
		list-style-type: none;
		margin: 0;
		padding: 0;
	}
}

.highlight{
	background-color: $n-10;
	cursor: pointer;
}
</style>
