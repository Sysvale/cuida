<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		ref="cds-filter-select"
		class="filter-select"
	>
		<div
			ref="filterSelectRef"
			class="filter-select__container"
			:class="inputClass"
			@keydown.enter.prevent="activateSelectionOnEnter"
			@keydown.arrow-down.prevent="highlightOnArrowDown"
			@keydown.arrow-up.prevent="highlightOnArrowUp"
			@click="activateSelectionOnClick"
		>
			<label
				class="filter-select__label"
			>
				<div
					for="cds-filter-select"
				>
					<span>
						{{ capitalizedLabel }}
					</span>
				</div>
			</label>

			<input
				:id="$attrs.id || id"
				ref="filter-select-input"
				v-model="localValue[optionsField]"
				type="text"
				autocomplete="off"
				:onkeypress="`return ${allowSearch};`"
				:class="inputClass"
				:placeholder="placeholder"
				:disabled="disabled"
				:readonly="!searchable"
				@input="filterOptions"
				@focus="activeSelection"
				@blur="hide"
			>

			<div
				v-show="active"
				ref="filter-select-options"
				class="filter-select__options"
				:class="{
					'filter-select__options--thin': width === 'thin',
					'filter-select__options--default': width === 'default',
					'filter-select__options--wide': width === 'wide',
					'filter-select__options--fluid': fluid,
					'filter-select__options--down': direction === 'down',
					'filter-select__options--up': direction === 'up',
				}"
			>
				<ul
					v-if="localOptions.length > 0"
					class="option__container"
				>
					<li
						v-for="(option, index) in localOptions"
						:key="index"
						:ref="`${option[optionsField]}-${index}`"
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

			<span
				:class="active ? 'filter-select__chevron--opened' : 'filter-select__chevron--closed'"
			/>
		</div>
	</div>
</template>

<script>
import { widths } from '../utils';
import { generateKey } from '../utils';
import cloneDeep from 'lodash.clonedeep';
import removeAccents from '../utils/methods/removeAccents';

export default {
	props: {
		/**
		 * Especifica o título do FilterSelect.
		 */
		label: {
			type: String,
			default: 'Label',
			required: true,
		},
		/**
		 * Indica o texto que instrui o usuário a como interagir com o FilterSelect.
		 */
		placeholder: {
			type: String,
			default: 'Selecione...',
			required: false,
		},
		/**
		 * Array de objetos que especifica a lista de opções do Filter Select. Os valores
		 * a serem mostrado como opções do FilterSelect devem estar atribuídos a chave
		 * `value` do objeto.
		 */
		options: {
			type: Array,
			default: () => [],
			required: true,
		},
		/**
		 * Guarda o valor selecionado do FilterSelect.
		 */
		modelValue: {
			type: [Array, Object],
			required: true,
		},
		/**
		 * Indica se vai ser possível fazer buscas no FilterSelect.
		 */
		searchable: {
			type: Boolean,
			default: false,
			required: false,
		},
		/**
		 * Define a largura do FilterSelect. As opções são 'thin', 'default' e 'wide'.
		 */
		width: {
			type: String,
			default: 'default',
			required: false,
		},
		/**
		 * Especifica se a largura do FilterSelect deve ser fluida.
		 */
		fluid: {
			type: Boolean,
			default: false,
			required: false,
		},
		/**
		 * Especifica o status de interação do FilterSelect.
		 */
		disabled: {
			type: Boolean,
			default: false,
			required: false,
		},
		/**
		* Indica o nome da da chave do objeto a ser considerada na renderização
		* das opções do FilterSelect.
		*/
		optionsField: {
			type: String,
			default: 'value',
			required: false,
		},
		/**
		* Quando true, passa a retornar o optionsField no modelValue fora do objeto
		* das opções do FilterSelect.
		*/
		returnValue: {
			type: Boolean,
			default: false,
			required: false,
		},
	},

	data() {
		return {
			currentPos: 0,
			active: false,
			id: null,
			allowSearch: false,
			localOptions: [],
			pristineOptions: [],
			localValue: '',
			selectElement: '',
			direction: 'down',
			uniqueKey: generateKey(),
		};
	},

	computed: {
		inputClass() {
			let returningClass = '';
			const inputClass = 'filter-select__input';

			if (this.active && this.direction === 'down') {
				returningClass = `${inputClass}--opened-down`;
			} else if (this.active && this.direction === 'up') {
				returningClass = `${inputClass}--opened-up`;
			} else {
				returningClass = `${inputClass}--closed`;
			}

			if (this.disabled) {
				returningClass += ` ${inputClass}--disabled`;
			}

			returningClass += ` ${inputClass}--${widths.find((item) => item === this.width)}`;
			returningClass += this.fluid ? ` ${inputClass}--fluid` : ` ${inputClass}--fit`;
			returningClass += this.searchable ? ` ${inputClass}--searchable` : '';

			return returningClass;
		},

		capitalizedLabel() {
			return this.label.charAt(0).toUpperCase() + this.label.slice(1);
		},
	},

	watch: {
		modelValue: {
			handler(newValue, oldValue) {
				if (newValue !== oldValue) {
					if (newValue instanceof Object) {
						this.localValue = newValue;
					} else {
						this.localValue = {id: newValue, value: newValue }
					}
				}
			},
			immediate: true,
		},

		options: {
			handler(newValue, oldValue) {
				if (newValue !== oldValue) {
					this.localOptions = newValue;
					this.pristineOptions = newValue;
				}
			},
			immediate: true,
		},

		searchable: {
			handler(newValue, oldValue) {
				if (newValue !== oldValue) {
					this.allowSearch = newValue;
				}
			},
			immediate: true,
		},

		localValue: {
			handler(currentValue) {
				const compatibleOptions = this.localOptions.filter(
					(option) => JSON.stringify(option) === JSON.stringify(currentValue),
				);
				if (compatibleOptions.length === 0) {
					return;
				}

				if (this.returnValue) {
					/**
					* Evento que indica que o valor do Select foi alterado
					* @event update:modelValue
					* @type {Event}
					*/
					this.$emit('update:modelValue', currentValue[this.optionsField]);
				} else {
					this.$emit('update:modelValue', currentValue);
				}
			},
			deep: true,
		},
	},

	mounted() {
		this.id = `cds-filter-select-${this.uniqueKey}`;
		this.selectElement = this.$refs['cds-filter-select'];

		document.querySelector('body').addEventListener('click', this.closeFilterSelect);
	},

	methods: {
		filterOptions() {
			const sanitizedString = removeAccents(this.localValue[this.optionsField]);
			const regexExp = new RegExp(sanitizedString, 'i');

			this.localOptions = this.options.filter(
				(option) => removeAccents(option[this.optionsField]).search(regexExp) >= 0,
			);
		},

		activeSelection() {
			if (this.disabled) return;

			this.$nextTick().then(() => {
				const element = this.localOptions[this.currentPos];
				this.$refs[`${element[this.optionsField]}-${this.currentPos}`][0].classList.add('highlight');
			});
		},

		activateSelectionOnEnter() {
			if (this.disabled) return;

			this.active = !this.active;

			if (typeof this.localOptions[this.currentPos] === 'undefined') {
				this.localOptions = this.pristineOptions;
			} else {
				this.localValue = cloneDeep(this.localOptions[this.currentPos]);
			}

			this.$refs['filter-select-input'].blur();
		},

		activateSelectionOnClick() {
			let boundingRect = this.selectElement.getBoundingClientRect();

			if ((boundingRect.top + boundingRect.height + 286) < window.innerHeight) {
				this.direction = 'down';
			} else {
				this.direction = 'up';
			}

			if (this.disabled) return;

			this.active = !this.active;
		},

		hide() {
			this.localOptions = this.pristineOptions;
			this.active = false;
		},

		selectItem() {
			this.localValue = cloneDeep(this.localOptions[this.currentPos]);
		},

		getLiInDOM(position) {
			const element = this.localOptions[position];
			return this.$refs[`${element[this.optionsField]}-${position}`][0];
		},

		handleOptionVisibility(option, amount, direction) {
			const optionDOMRect = option.getBoundingClientRect();
			const optionsContainer = this.$refs['filter-select-options'];
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
		},

		highlightOnArrowDown() {
			if (this.currentPos === this.localOptions.length - 1) return;

			this.currentPos += 1;
			const selectedOption = this.getLiInDOM(this.currentPos);
			const previousOption = this.getLiInDOM(this.currentPos - 1);

			selectedOption.classList.add('highlight');
			previousOption.classList.remove('highlight');

			this.handleOptionVisibility(selectedOption, 37, 'down');
		},

		highlightOnArrowUp() {
			if (this.currentPos === 0) return;

			const selectedOption = this.getLiInDOM(this.currentPos);
			const previousOption = this.getLiInDOM(this.currentPos - 1);

			selectedOption.classList.remove('highlight');
			previousOption.classList.add('highlight');

			this.handleOptionVisibility(selectedOption, -37, 'up');
			this.currentPos -= 1;
		},

		highlightOnMouseOver(index) {
			this.currentPos = index;
			this.getLiInDOM(this.currentPos).classList.add('highlight');
		},

		unhighlightOnMouseOut() {
			this.getLiInDOM(this.currentPos).classList.remove('highlight');
		},

		closeFilterSelect(event) {
			if (
				this.$refs.filterSelectRef
				&& !this.$refs.filterSelectRef.contains(event.target)
			) {
				this.hide();
			}
		},
	},
};
</script>
<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

#cds-filter-select {
	-webkit-user-select: none; /* Safari */
	-ms-user-select: none; /* IE 10 and IE 11 */
	user-select: none;
}

.filter-select {
	&__container {
		display: flex;
		align-items: center;
		cursor: pointer;
		position: relative;
		outline: 1px solid tokens.$n-50;
		background: tokens.$n-0;
		width: fit-content;

		&:hover:not([disabled]) {
			outline: 1px solid tokens.$n-100;
		}
	}

	&__input {
		height: 40px;
		border: none;
		padding-right: tokens.spacer(8);
		padding-left: tokens.spacer(2);
		color: tokens.$n-600;
		caret-color: transparent;
		cursor: pointer;
		background-color: tokens.$n-0;
		@include tokens.body-2;
		text-overflow: ellipsis;

		&--closed {
			@extend .filter-select__input;
			border-radius: tokens.$border-radius-extra-small !important;
		}

		&--opened-down {
			@extend .filter-select__input;
			border-top-left-radius: tokens.$border-radius-extra-small !important;
			border-top-right-radius: tokens.$border-radius-extra-small !important;
		}

		&--opened-up {
			@extend .filter-select__input;
			border-bottom-left-radius: tokens.$border-radius-extra-small !important;
			border-bottom-right-radius: tokens.$border-radius-extra-small !important;
		}

		&--searchable {
			caret-color: tokens.$n-700;
		}

		&--thin {
			width: 290px;
		}

		&--default {
			width: 400px;
		}

		&--wide {
			width: 600px;
		}

		&--fluid {
			width: 100%;
		}

		&--disabled {
			background-color: tokens.$n-20 !important;
			pointer-events: none;
			border: none;
		}

		&::placeholder {
			color: tokens.$n-300;
			@include tokens.body-2;
		}

		&--disabled::placeholder {
			color: tokens.$n-100;
		}

		&:focus {
			outline: 0px solid;
		}
	}

	&__label {
		@include tokens.body-2;
		font-weight: tokens.$font-weight-semibold;
		display: flex;
		margin: tokens.ml(3);
		cursor: pointer;
	}

	&__label::after {
		content: ": ";
	}

	&__chevron--closed {
		position: absolute;
		top: 6px;
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
		position: absolute;
		top: 6px;
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
		outline: 1px solid tokens.$n-50;
		display: flex;
		flex-direction: column;
		margin-top: 1px;
		justify-items: center;
		text-overflow: ellipsis;
		max-height: 296px;
		overflow: auto;
		position: absolute;
		z-index: 999;
		background-color: tokens.$n-0;
		top: 40px;
		right: 0;

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

		&--up {
			bottom: 40px;
			width: 100%;
			border-top-left-radius: tokens.$border-radius-extra-small;
			border-top-right-radius: tokens.$border-radius-extra-small;
		}

		&--down {
			width: 100%;
			border-bottom-left-radius: tokens.$border-radius-extra-small;
			border-bottom-right-radius: tokens.$border-radius-extra-small;
		}
	}
}

.option {
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

.highlight {
	background-color: tokens.$n-20;
	cursor: pointer;
}
</style>
