<template>
	<div
		id="cds-select"
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
				v-model="selectedOption"
				type="text"
				:onkeypress="`return ${keyp};`"
				:class="inputClass"
				:placeholder="placeholder"
				:disabled="disabled"
				v-on-click-outside="hide"
				@input="filterOptions"
				@click="activateSelectionOnClick"
				@keydown.enter.prevent="activateSelectionOnEnter"
				@keydown.arrow-down.prevent="highlightOnArrowDown"
				@keydown.arrow-up.prevent="highlightOnArrowUp"
				@focus="activeSelection"
				@blur="hide"
			/>

			<div
				v-show="active"
				class="select__options"
				ref="select-options"
				:class="{
					'select__options--sm': size === 'sm',
					'select__options--md': size === 'md',
					'select__options--lg': size === 'lg',
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
						:key="option.value"
						:ref="option.value"
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
				tabindex="-1"
				:class="active ? 'select__chevron--opened' : 'select__chevron--closed'"
			/>
		</div>
	</div>
</template>

<script>
import { directive as onClickOutside } from 'vue-on-click-outside';
import { sizes } from '../utils';
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
		 * Especifica a lista de opções do select.
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
		 * Define o tamanho do Select. As opções são 'sm', 'md', 'lg'.
		 */
		size: {
			type: String,
			default: 'md',
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
			selected: this.value,
			currentPos: 0,
			active: false,
			id: null,
			selectedOption: '',
			keyp: this.searchable,
			localOptions: this.options,
		};
	},

	mounted() {
		this.id = `select$-${this._uid}`;
	},

	computed: {
		inputClass() {
			let returningClass = '';

			returningClass = this.active ? 'select__input--opened' : 'select__input--closed';
			returningClass += ` select__input--${sizes.find((item) => item === this.size)}`;
			returningClass += this.fluid ? ' select__input--fluid' : ' select__input--fit';
			returningClass += this.disabled ? ' select__input--disabled' : '';
			returningClass += this.searchable ? ' select__input--searchable' : '';

			return returningClass;
		},
	},

	methods: {
		filterOptions() {
			const sanitizedString = removeAccents(this.selectedOption);
			const regexExp = new RegExp(sanitizedString, 'i');

			this.localOptions = this.options.filter(
				(option) => removeAccents(option.value).search(regexExp) >= 0,
			);
		},

		activeSelection() {
			if (this.disabled) return;

			this.$nextTick().then(() => {
				const element = this.localOptions[this.currentPos];
				this.$refs[element.value][0].classList.add('highlight');
			});

			this.active = true;

			/**
			* Evento que indica que o Select foi clicado
			* @event click
			* @type {Event}
			*/
			// this.$emit('click', true);
		},

		activateSelectionOnEnter() {
			if (this.disabled) return;

			this.active = !this.active;
			this.selectedOption = this.localOptions[this.currentPos].value;

			/**
			* Evento que indica que o Select foi clicado
			* @event click
			* @type {Event}
			*/
			// this.$emit('click', true);
		},

		activateSelectionOnClick() {
			if (this.disabled) return;

			this.active = true;

			// this.selectedOption = localOptions[this.currentPos].value;

			/**
			* Evento que indica que o Select foi clicado
			* @event click
			* @type {Event}
			*/
			// this.$emit('click', true);
		},

		hide() {
			this.selectedOption = this.localOptions[this.currentPos].value;
			this.active = false;
		},

		getLiInDOM(position) {
			const element = this.localOptions[position];
			return this.$refs[element.value][0];
		},

		handleOptionVisibility(option, amount, direction) {
			const optionDOMRect = option.getBoundingClientRect();
			const optionsContainer = this.$refs['select-options'];
			const optionsContainerDOMRect = this.$refs['select-options'].getBoundingClientRect();

			if (
				direction === 'up'
				&& optionDOMRect.top <= optionsContainerDOMRect.top
			) {
				optionsContainer.scrollTop += amount;
			}

			if (
				direction === 'down'
				&& optionDOMRect.top <= optionsContainerDOMRect.bottom
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
		selected(currentOption) {
			this.$emit('input', currentOption);
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
			border-radius: $border-radius-extra-small;
		}

		&--opened {
			@extend .select__input;
			border-top-left-radius: $border-radius-extra-small;
			border-top-right-radius: $border-radius-extra-small;
		}

		&--searchable {
			caret-color: $n-700;
		}

		&--sm {
			width: 150px;
		}

		&--md {
			width: 300px;
		}

		&--lg {
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
		outline: 1px solid $n-50;
		border-bottom-left-radius: $border-radius-extra-small;
		border-bottom-right-radius: $border-radius-extra-small;
		display: flex;
		flex-direction: column;
		margin-top: 1px;
		justify-items: center;
		@include subheading-3;
		text-overflow: ellipsis;
		max-height: 296px;
		overflow: auto;

		&--sm {
			width: 150px;
		}

		&--md {
			width: 300px;
		}

		&--lg {
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
