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
				v-model="computedModel"
				type="text"
				:onkeypress="`return ${allowSearch};`"
				:placeholder="placeholder"
				:disabled="disabled"
				:readonly="!searchable"
				:support-link-url="supportLinkUrl || linkUrl"
				:support-link="supportLink || linkText"
				:floating-label="floatingLabel || mobile"
				:class="inputClass"
				:fluid="computedFluid"
				@keydown.enter.prevent="activateSelectionOnEnter"
				@keydown.arrow-down.prevent="highlightOnArrowDown"
				@keydown.arrow-up.prevent="highlightOnArrowUp"
				@keydown="emitKeydown"
				@click="activateSelectionOnClick"
				@update:model-value="filterOptions"
				@focus="activeSelection"
				@blur="hide"
			>
				<template #trailing-icon>
					<span
						:class="active ? 'select__chevron--opened' : 'select__chevron--closed'"
					/>
				</template>
			</CdsBaseInput>

			<div
				v-show="active"
				ref="select-options"
				class="select__options"
				:class="selectOptionsClass"
			>
				<ul
					v-if="localOptions.length > 0"
					class="option__container"
				>
					<li
						v-for="(option, index) in localOptions"
						:key="option.id || option"
						:ref="(el) => { liRefs[`${option[optionsField]}-${index}`] = el }"
						class="option__text"
						@mousedown="selectItem"
						@mouseover="highlightOnMouseOver(index)"
						@mouseout="unhighlightOnMouseOut()"
					>
						<!--
							@slot Slot utilizado para personalizar a lista de opções do select. Os dados do scoped slot podem ser acessados como: ```slot-scope={ 'option', 'index', 'value' }```
						-->
						<slot
							name="option"
							:index
							:option
							:value="option[optionsField]"
						>
							{{ option[optionsField] }}
						</slot>
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
				<div
					v-if="showAddOption"
					class="option__add"
					@mousedown="handleAddOption"
				>
					<span class="add-button-searchstring">{{ searchString }} </span>
					<small class="add-button-text">Clique para adicionar</small>
				</div>
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
import { get, cloneDeep } from 'lodash';
import removeAccents from '../utils/methods/removeAccents';
import CdsBaseInput from './BaseInput.vue';

defineOptions({ name: 'CdsSelect' });

const model = defineModel('modelValue', {
	type: [Array, Object, String],
});

const props = defineProps({
	/**
	 * Especifica o título do select.
	 */
	label: {
		type: String,
		default: 'Label',
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
	 * @values default, valid, loading, invalid
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
	 * Indica se a busca deve levar em consideração argumentos compostos.
	 * Só tem efeito se a prop `searchable` for `true`.
	 */
	deepSearch: {
		type: Boolean,
		default: false,
		required: false,
	},
	/**
	 * @deprecated Define a largura do Select. As opções são 'thin', 'default' e 'wide'.
	 */
	width: {
		type: String,
		default: '',
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
	* @deprecated Essa prop vai ser substituída pela `supportLink` na v4. Define texto do link do input (localizado à direita da label).
	*/
	linkText: {
		type: String,
		default: null,
	},
	/**
	* @deprecated Essa prop vai ser substituída pela `supportLinkUrl` na v4. Define a url a ser acessada no clique do link (no caso do link ser exibido).
	*/
	linkUrl: {
		type: [String, null],
		default: null,
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
	* @deprecated Essa prop vai ser substituída pela prop `floatingLabel` na v4. Define o tipo do input, se true será um input adaptado para o mobile
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
	* Indica se vai ser possível adicionar novas opções ao Select. Só tem efeito se a prop `searchable` for `true`.
	*/
	addable: {
		type: Boolean,
		default: false,
	},
});

const emits = defineEmits({
	...nativeEvents
});

/* REACTIVE DATA */
const currentPos = ref(0);
const active = ref(false);
const id = ref(null);
const allowSearch = ref(false);
const localOptions = ref([]);
const pristineOptions = ref([]);
const localValue = ref({
	value: '',
	id: '',
});
const selectElement = ref('');
const direction = ref('down');
const uniqueKey = ref(generateKey());
const select = useTemplateRef('baseInput');
const cdsSelect = useTemplateRef('cds-select');
const selectOptions = useTemplateRef('select-options');
const liRefs = ref({});
const { emitClick, emitFocus, emitBlur, emitKeydown } = nativeEmits(emits);
const searchString = ref('');

/* COMPUTED */
const resolveChevronTop = computed(() => {
	return props.mobile ? '9px' : '6px';
});

const inputClass = computed(() => {
	let returningClass = '';
	const inputClass = props.mobile ? 'select__mobile-input' : 'select__input';

	returningClass += ` ${inputClass}--${widths.find((item) => item === props.width)}`;
	returningClass += props.fluid ? ` ${inputClass}--fluid` : ` ${inputClass}--fit`;
	returningClass += props.searchable ? ` ${inputClass}--searchable` : '';

	return returningClass;
});

const selectOptionsClass = computed(() => ({
	'select__options--thin': props.width === 'thin',
	'select__options--default': props.width === 'default',
	'select__options--wide': props.width === 'wide',
	'select__options--fluid': props.fluid,
	'select__options--down': direction.value === 'down',
	'select__options--up': direction.value === 'up',
}));

const selectContainerWidth = computed(() => {
	return props.fluid ? '100%' : 'fit-content';
});

const showAddOption = computed(() => {
	return props.searchable
		&& props.addable
		&& searchString.value?.trim().length > 0
		&& !localOptions.value.some(option => option[props.optionsField]?.toLowerCase() === searchString?.value.toLowerCase());
});

const computedModel = computed(() => localValue.value[props.optionsField]);

//NOTE: Essa computada vai ser removida junto com a descontinuação da prop width na V4
const computedFluid = computed(() => {
	return widths.some((item) => item === props.width) || props.fluid;
});

/* WATCHERS */
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

watch(model, (newValue, oldValue) => {
	if (newValue !== oldValue && newValue !== localValue.value) {
		if (newValue instanceof Object) {
			localValue.value = newValue;
		} else {
			localValue.value = {id: newValue, value: newValue }
		}
	}
}, { immediate: true });

watch(localValue, (currentValue) => {
	if (currentValue === model.value) return;

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

/* HOOKS */
onMounted(() => {
	id.value = `cds-select-${uniqueKey.value}`;
	selectElement.value = cdsSelect.value;
});

/* FUNCTIONS */
function filterOptions(value) {
	if (props.searchable && props.addable) {
		searchString.value = value;
	}

	const sanitizedString = removeAccents(String(value) || '');

	if (props.deepSearch) {
		deepOptionSearch(sanitizedString);
	} else {
		simpleOptionSearch(sanitizedString);
	}
}

function simpleOptionSearch(sanitizedSearchValue) {
	const regexExp = new RegExp(sanitizedSearchValue, 'i');

	localOptions.value = pristineOptions.value.filter(
		(option) => removeAccents(option[props.optionsField]).search(regexExp) >= 0,
	);
}

function deepOptionSearch(sanitizedSearchValue) {
	const searchArray = sanitizedSearchValue.toLowerCase().split(' ');

	localOptions.value = pristineOptions.value.filter(
		(option) => {
			return searchArray.reduce((acc, curr) => (
				acc = acc && removeAccents(option[props.optionsField]).toLowerCase().includes(curr)
			), true);
		}
	)
}

function activeSelection() {
	if (props.disabled) return;

	resetActiveSelection();

	nextTick().then(() => {
		const element = localOptions.value[currentPos.value];
		liRefs.value[`${get(element, props.optionsField)}-${currentPos.value}`]?.classList.add('highlight');
	});
	emitFocus();
}

function activateSelectionOnEnter() {
	if (props.disabled) return;

	active.value = !active.value;

	resetActiveSelection();

	if (typeof localOptions.value[currentPos.value] === 'undefined') {
		handleAddOption();

		nextTick(() => {
			localValue.value = props.searchable && props.addable
				? localValue.value
				: cloneDeep(localOptions.value[0]);
		});

	} else {
		localValue.value = cloneDeep(localOptions.value[currentPos.value]);
	}

	searchString.value = '';
	select.value.blur();
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

	emitClick();
	select.value.focus();
}

function hide() {
	if (!searchString.value) {
		localValue.value = localOptions.value.some(item => item[props.optionsField]?.toLowerCase() === get(localValue.value, props.optionsField)?.toLowerCase())
			? localValue.value
			: {};
	}

	nextTick(() => {
		localOptions.value = pristineOptions.value;
		searchString.value = '';
		active.value = false;
	});

	emitBlur();
}

function selectItem() {
	searchString.value = '';
	localValue.value = cloneDeep(localOptions.value[currentPos.value]);
}

function getLiInDOM(position) {
	const element = localOptions.value[position];
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
	if (!active.value) return;
	if (currentPos.value === localOptions.value.length - 1) return;

	currentPos.value += 1;
	const selectedOption = getLiInDOM(currentPos.value);
	const previousOption = getLiInDOM(currentPos.value - 1);

	selectedOption.classList.add('highlight');
	previousOption.classList.remove('highlight');

	handleOptionVisibility(selectedOption, 37, 'down');
}

function highlightOnArrowUp() {
	if (!active.value) return;
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
		liRefs.value[`${element[props.optionsField]}-${index}`].classList.remove('highlight');
	})
}

function handleAddOption() {
	if (!props.addable || !searchString.value) {
		return;
	}

	const newOption = {
		id: searchString.value.toLowerCase().trim().replace(/ /g, '-'),
		[props.optionsField]: searchString.value.trim(),
	};

	localOptions.value = [...props.options, newOption];
	pristineOptions.value = localOptions.value;
	localValue.value = newOption;
}

/* EXPOSE */
defineExpose({
	componentRef: select.value?.componentRef,
	isFocused: select.value?.isFocused,
	focus: () => select.value?.focus(),
	blur: () => select.value?.blur(),
	clear: () => select.value?.clear(),
	select: () => select.value?.select(),
});
</script>
<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.select {
	width: v-bind(selectContainerWidth);

	&__input {
		&--searchable {
			caret-color: tokens.$n-700;
		}

		&--thin {
			width: 150px !important;
		}

		&--default {
			width: 266px !important;
		}

		&--wide {
			width: 600px !important;
		}

		&--fluid {
			width: 100%;
		}
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
		top: v-bind(resolveChevronTop);
		right: 2px;
		display: block;
		height: 32px;
		width: 32px;
		pointer-events: none;
		border-radius: tokens.$border-radius-small;
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
			border-bottom: 6px solid tokens.$n-100;
			border-radius: tokens.$border-radius-small;
			transition: all 300ms ease-in-out;
			transform: rotate(-180deg);
		}
	}

	&__chevron--opened {
		top: v-bind(resolveChevronTop);
		right: 2px;
		display: block;
		height: 32px;
		width: 32px;
		pointer-events: none;
		border-radius: tokens.$border-radius-small;
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
			border-bottom: 6px solid tokens.$n-100;
			border-radius: tokens.$border-radius-small;
			transition: all 300ms ease-in-out;
			transform: rotate(0deg);
		}
	}

	&__options {
		@include tokens.body-2;
		color: tokens.$n-700;
		outline: 1px solid tokens.$n-40;
		display: flex;
		flex-direction: column;
		margin-top: 6px;
		justify-items: center;
		text-overflow: ellipsis;
		max-height: 296px;
		overflow: auto;
		position: absolute;
		z-index: 999;
		background-color: tokens.$n-0;
		border-radius: tokens.$border-radius-extra-small;
		animation: slide-down 0.2s ease-in-out;

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
			background: tokens.$n-100;
			border-radius: 5px;
			border-right: 3px solid transparent;
			border-left: 3px solid transparent;
			background-clip: padding-box;
		}

		&::-webkit-scrollbar-thumb:hover {
			background: tokens.$n-50;
		}

		&--up {
			bottom: 40px;
			width: 100%;
		}

		&--down {
			width: 100%;
		}
	}
}

@keyframes slide-down {
	0% {
		opacity: 0;
		transform: translateY(-10px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}

.option {
	&__add {
		cursor: pointer;
		font-weight: tokens.$font-weight-semibold;
		background-color: tokens.$n-20;
		padding: tokens.pa(3);
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	&__text {
		padding: tokens.pa(3);
		text-overflow: ellipsis;

		&--muted {
			@extend .option__text;
			color: tokens.$n-400;
		}
	}

	&__container {
		list-style-type: none;
		margin: 0;
		padding: 0;
	}
}

.highlight{
	background-color: tokens.$n-10;
	cursor: pointer;
}

.add-button-searchstring {
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
}

.add-button-text {
	@include tokens.overline;
	font-weight: tokens.$font-weight-bold;
}
</style>
