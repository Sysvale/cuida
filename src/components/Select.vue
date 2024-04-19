<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		ref="cds-select"
		class="select"
	>
		<label
			class="select__label"
		>
			<div
				class="label__content"
				for="cds-select"
			>
				<span>
					{{ label }}
				</span>

				<span
					v-if="required"
					class="label__required-indicator"
				>
					*
				</span>

				<cds-icon
					v-if="tooltip"
					v-cdstip="tooltip"
					:name="tooltipIcon"
					height="20"
					width="20"
					class="label__icon"
				/>
			</div>
		</label>
		<div
			class="select__container"
			:class="fluid ? 'select__container--fluid' : 'select__container--fit'"
		>
			<input
				:id="$attrs.id || id"
				ref="select-input"
				v-model="localValue[optionsField]"
				type="text"
				autocomplete="off"
				:onkeypress="`return ${allowSearch};`"
				:class="inputClass"
				:placeholder="placeholder"
				:disabled="disabled"
				:readonly="!searchable"
				@keydown.enter.prevent="activateSelectionOnEnter"
				@keydown.arrow-down.prevent="highlightOnArrowDown"
				@keydown.arrow-up.prevent="highlightOnArrowUp"
				@click="activateSelectionOnClick"
				@input="filterOptions"
				@focus="activeSelection"
				@blur="hide"
			>

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
				:class="active ? 'select__chevron--opened' : 'select__chevron--closed'"
			/>
		</div>

		<div
			v-if="errorState && !disabled"
			class="select__error-message"
		>
			{{ errorMessage }}
		</div>
	</div>
</template>

<script>
import { widths } from '../utils';
import { generateKey } from '../utils';
import cloneDeep from 'lodash.clonedeep';
import removeAccents from '../utils/methods/removeAccents';
import CdsIcon from './Icon.vue';

export default {
	components: {
		CdsIcon,
	},

	props: {
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
		 * Guarda o valor selecionado do select.
		 */
		modelValue: {
			type: [Array, Object],
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
		 * Define a largura do Select. As opções são 'thin', 'default' e 'wide'.
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
		errorState() {
			return this.state === 'invalid';
		},

		inputClass() {
			let returningClass = '';

			if (this.active && this.direction === 'down') {
				returningClass = 'select__input--opened-down';
			} else if (this.active && this.direction === 'up') {
				returningClass = 'select__input--opened-up';
			} else {
				returningClass = 'select__input--closed';
			}

			if (!this.disabled) {
				if (this.state === 'valid') {
					returningClass += ' select__input--valid';
				} else if (this.state === 'invalid') {
					returningClass += ' select__input--invalid';
				}
			} else {
				returningClass += ' select__input--disabled';
			}

			returningClass += ` select__input--${widths.find((item) => item === this.width)}`;
			returningClass += this.fluid ? ' select__input--fluid' : ' select__input--fit';
			returningClass += this.searchable ? ' select__input--searchable' : '';

			return returningClass;
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
					* @event input
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
		this.id = `cds-select-${this.uniqueKey}`;
		this.selectElement = this.$refs['cds-select'];
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

			this.$refs['select-input'].blur();
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
			const optionsContainer = this.$refs['select-options'];
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
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

#cds-select {
	-webkit-user-select: none; /* Safari */
	-ms-user-select: none; /* IE 10 and IE 11 */
	user-select: none;
}

.label {
	&__required-indicator {
		color: $rc-600;
	}

	&__icon {
		margin: mTRBL(0, 0, n1, 1);
		cursor: pointer;
	}

	&__content {
		margin: mb(1);
	}
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

	&__label {
		@include label;
		display: flex;
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
		position: absolute;
		top: 6px;
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
		position: absolute;
		top: 6px;
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
		outline: 1px solid $n-50;
		display: flex;
		flex-direction: column;
		margin-top: 1px;
		justify-items: center;
		text-overflow: ellipsis;
		max-height: 296px;
		overflow: auto;
		position: absolute;
		z-index: 999;
		background-color: $n-0;

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
			border-top-left-radius: $border-radius-extra-small;
			border-top-right-radius: $border-radius-extra-small;
		}

		&--down {
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
	background-color: $n-20;
	cursor: pointer;
}
</style>
