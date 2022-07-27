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
		>
			<input
				v-on-click-outside="hide"
				:class="active ? 'select__input--opened' : 'select__input--closed'"
				type="text"
				@click="activeSelection"
				onkeypress="return false;"
				:placeholder="placeholder"
			/>

			<div
				v-if="active"
				class="select__options"
			>
				<div
					v-for="option in options"
					:key="option.value"
					class="option__text"
				>
					<span>
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
		 * Prop que indica o estado do select.
		 */
		disabled: {
			type: Boolean,
			default: false,
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
	},

	directives: {
		'on-click-outside': onClickOutside,
	},

	data() {
		return {
			selected: this.value,
			active: false,
			id: null,
		};
	},

	mounted() {
		this.id = `filter-pill$-${this._uid}`;
	},

	computed: {
		predefinedStyle() {
			if (this.predefinedColors.indexOf(this.variant) > -1) {
				return `badge--${this.variant}`;
			}
			return 'badge--gray';
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
		max-width: 576px;
		min-width: 120px;
		height: 40px;
		border: none;
		outline: 1px solid $n-50;
		background: $n-0;
		padding-right: spacer(5);
		padding-left: spacer(3);
		color: $n-600;
		caret-color: transparent;
		cursor: pointer;
		background-color: $n-0;
		@include subheading-3;

		&--closed {
			@extend .select__input;
			border-radius: $border-radius-extra-small;
		}

		&--opened {
			@extend .select__input;
			border-top-left-radius: $border-radius-extra-small;
			border-top-right-radius: $border-radius-extra-small;
		}
	}

	&__label {
		font-weight: $font-weight-semibold;
		color: $n-700;
		font-size: 14px;
		margin: mb(1);
	}

	&__container {
		width: fit-content;
		position: relative;
	}

	&__chevron--closed {
		position: absolute;
		top: 6px;
		right: 2px;
		display: block;
		background: $n-0;
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
		background: $n-0;
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
	}

}

.option {
	&__text {
		padding: pYX(2, 3);

		&:hover {
			background-color: $n-20;
			cursor: pointer;
		}
	}
}
</style>
