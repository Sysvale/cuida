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

		<div
			class="select__container"
			:class="fluid ? 'select__container--fluid' : 'select__container--fit'"
		>
			<input
				v-model="testText"
				v-on-click-outside="hide"
				:class="inputClass"
				type="text"
				@click="activeSelection"
				onkeypress="return false;"
				:placeholder="placeholder"
			/>

			<div
				v-if="active"
				class="select__options"
				:class="{
					'select__options--sm': size === 'sm',
					'select__options--md': size === 'md',
					'select__options--lg': size === 'lg',
					'select__options--fluid': fluid,
				}"
			>
				<div
					v-for="option in options"
					:key="option.value"
					class="option__text"
					@click="testText = option.value"
				>
					<span
					>
						{{ option.value }}
					</span>
				</div>
			</div>

			<span
				:class="active ? 'select__chevron--opened' : 'select__chevron--closed'"
			/>
		</div>
	</div>
</template>

<script>
import { directive as onClickOutside } from 'vue-on-click-outside';
import { sizes } from '../utils';

export default {
	props: {
		/**
		 * Prop que especifica o título do select.
		 */
		label: {
			type: String,
			default: 'Label',
			required: true,
		},
		/**
		 * Prop que indica o texto que instrui o usuário a como interagir com o select.
		 */
		placeholder: {
			type: String,
			default: 'Selecione...',
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
		 * Define o tamanho do Select. As opções são 'sm', 'md', 'lg'
		 */
		size: {
			type: String,
			default: 'md',
		},
		/**
		 * Prop que se a largura do select deve ser fluida.
		 */
		fluid: {
			type: Boolean,
			default: false,
			required: false,
		},
		/**
		 * Prop que indica o estado do select.
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
			active: false,
			id: null,
			testText: '',
		};
	},

	mounted() {
		this.id = `filter-pill$-${this._uid}`;
	},

	computed: {
		inputClass() {
			let returningClass = '';

			returningClass = this.active ? 'select__input--opened' : 'select__input--closed';
			returningClass += ` select__input--${sizes.find((item) => item === this.size)}`;
			returningClass += this.fluid ? ' select__input--fluid' : ' select__input--fit';
			returningClass += this.disabled ? ' select__input--disabled' : '';

			return returningClass;
		},
	},

	methods: {
		activeSelection() {
			if (this.disabled) {
				return;
			}

			this.active = !this.active;

			/**
			* Evento que indica que o Select foi clicado
			* @event click
			* @type {Event}
			*/
			this.$emit('click', true);
		},

		hide() {
			this.active = false;
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

		&--closed {
			@extend .select__input;
			border-radius: $border-radius-extra-small;
		}

		&--opened {
			@extend .select__input;
			border-top-left-radius: $border-radius-extra-small;
			border-top-right-radius: $border-radius-extra-small;
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
		max-height: 300px;
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

		&:hover {
			background-color: $n-20;
			cursor: pointer;
		}
	}
}
</style>
