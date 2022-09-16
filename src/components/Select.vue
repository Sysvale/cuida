<template>
	<div
		class="select"
	>
		<span
			class="select__label"
		>
			{{ label }}
		</span>

		<span
			v-if="required"
			class="select--required"
		>
			*
		</span>

		<div
			class="select__container"
			:class="fluid ? 'select__container--fluid' : 'select__container--fit'"
		>
			<input
				v-model="localValue.value"
				type="text"
				:onkeypress="`return ${allowSearch};`"
				:class="inputClass"
				:placeholder="placeholder"
				:disabled="disabled"
				v-on-click-outside="hide"
				@keydown.enter.prevent="activateSelectionOnEnter"
				@keydown.arrow-down.prevent="highlightOnArrowDown"
				@keydown.arrow-up.prevent="highlightOnArrowUp"
				@click="activateSelectionOnClick"
				@input="filterOptions"
				@focus="activeSelection"
				@blur="hide"
			/>

			<div
				v-show="active"
				class="select__options"
				ref="select-options"
				:class="{
					'select__options--thin': width === 'thin',
					'select__options--default': width === 'default',
					'select__options--wide': width =='wide',
					'select__options--fluid': fluid,
				}"
			>
				<ul
					v-if="localOptions.length > 0"
					class="option__container"
				>
					<li
						v-for="(option, index) in localOptions"
						class="option__text"
						:key="index"
						:ref="`${option.value}-${index}`"
						@mouseover="highlightOnMouseOver(index)"
						@mouseout="unhighlightOnMouseOut()"
					>
						{{ option.value }}
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
	</div>
</template>

<script>
import { directive as onClickOutside } from 'vue-on-click-outside';
import { widths } from '../utils';
import removeAccents from '../utils/methods/removeAccents';

export default {
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
		value: {
			type: Object,
			default: () => {},
			required: true,
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
	},

	directives: {
		'on-click-outside': onClickOutside,
	},

	data() {
		return {
			currentPos: 0,
			active: false,
			id: null,
			allowSearch: this.searchable,
			localOptions: this.options,
			localValue: this.value,
		};
	},

	mounted() {
		this.id = `select$-${this._uid}`;
	},

	computed: {
		inputClass() {
			let returningClass = '';

			returningClass = this.active ? 'select__input--opened' : 'select__input--closed';
			returningClass += ` select__input--${widths.find((item) => item === this.width)}`;
			returningClass += this.fluid ? ' select__input--fluid' : ' select__input--fit';
			returningClass += this.disabled ? ' select__input--disabled' : '';
			returningClass += this.searchable ? ' select__input--searchable' : '';

			return returningClass;
		},
	},

	methods: {
		filterOptions() {
			const sanitizedString = removeAccents(this.localValue.value);
			const regexExp = new RegExp(sanitizedString, 'i');

			this.localOptions = this.options.filter(
				(option) => removeAccents(option.value).search(regexExp) >= 0,
			);
		},

		activeSelection() {
			if (this.disabled) return;

			this.$nextTick().then(() => {
				const element = this.localOptions[this.currentPos];
				this.$refs[`${element.value}-${this.currentPos}`][0].classList.add('highlight');
			});

			this.active = true;
		},

		activateSelectionOnEnter() {
			if (this.disabled) return;

			this.active = !this.active;
			this.localValue = this.localOptions[this.currentPos];
		},

		activateSelectionOnClick() {
			if (this.disabled) return;

			this.active = true;
		},

		hide() {
			this.localValue = this.localOptions[this.currentPos];
			this.active = false;
		},

		getLiInDOM(position) {
			const element = this.localOptions[position];
			return this.$refs[`${element.value}-${position}`][0];
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

	watch: {
		localValue: {
			handler(currentValue) {
				/**
				* Evento que indica que o valor do Select foi alterado
				* @event input
				* @type {Event}
				*/
				this.$emit('input', currentValue);
			},
			deep: true,
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

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
		@include subheading-3;
		text-overflow: ellipsis;

		&:hover:not([disabled]) {
			outline: 1px solid $n-200;
		}

		&--closed {
			@extend .select__input;
			border-radius: $border-radius-extra-small !important;
		}

		&--opened {
			@extend .select__input;
			border-top-left-radius: $border-radius-extra-small !important;
			border-top-right-radius: $border-radius-extra-small !important;
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
			background-color: $n-20;
			outline: none;
			cursor: default;
		}

		&::placeholder {
			color: $n-300;
		}

		&--disabled::placeholder {
			color: $n-100;
		}
	}

	&--required {
		color: $rc-600;
		font-weight: $font-weight-semibold;
	}

	&__label {
		font-weight: $font-weight-semibold;
		color: $n-700;
		font-size: 14px;
		margin: mb(1);
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
		@include subheading-3;
		outline: 1px solid $n-50;
		border-bottom-left-radius: $border-radius-extra-small;
		border-bottom-right-radius: $border-radius-extra-small;
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
	}

}

.option {
	&__text {
		padding: pYX(2, 3);
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