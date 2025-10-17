<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		class="cds-checkbox__container"
	>
		<div
			class="cds-checkbox__input"
		>
			<input
				:id="$attrs.id || 'cds-checkbox-option-input'"
				:value="modelValue"
				type="checkbox"
				:name="$attrs.name || 'cds-checkbox-option'"
				:aria-hidden="disabled ? 'true' : 'false'"
				:checked="isChecked"
				:aria-label="label"
				:aria-checked="isIndeterminate ? 'mixed' : isChecked"
				:tabindex="disabled ? -1 : 0"
				@change="handleChange"
				@click="handleInputClick"
				@keydown.space.prevent="handleKeyboardToggle"
			>

			<label
				:for="$attrs.id || 'cds-checkbox-option-input'"
				:class="resolveCheckboxClass"
				aria-hidden="true"
				@click.prevent="toggleValue"
			/>
		</div>

		<label
			class="cds-checkbox__label"
			:class="{
				'cds-checkbox__label--disabled': disabled,
				'cds-checkbox__label--prominent': prominent && modelValue,
			}"
			:for="$attrs.id || 'cds-checkbox-option-input'"
			aria-hidden="true"
			@click.prevent="toggleValue"
		>
			{{ label }}
		</label>
	</div>
</template>

<script>
import variantClassResolver from '../utils/methods/variantClassResolver';

export default {
	name: 'CdsCheckbox',
	props: {
		/**
		* A prop usada como v-model para monitorar a seleção do Checkbox
		*/
		modelValue: {
			type: Boolean,
			default: false,
			required: true,
		},
		/**
		* Exibe a etiqueta do checkbox
		*/
		label: {
			type: String,
			default: 'checkbox content',
		},
		/**
		* A variante de cor. São 10 variantes:
		* @values green, teal, blue, indigo, violet, pink, red, orange, amber, dark
		*/
		variant: {
			type: String,
			default: 'green',
		},
		/**
		* Prop usada para indicar visualmente se o checkbox está no estado indeterminado. Two-way binding ativo com o `v-model:indeterminate`
		*/
		indeterminate: {
			type: Boolean,
			default: false,
		},
		/**
		* Destaca visualmente a label
		*/
		prominent: {
			type: Boolean,
			default: false,
		},
		/**
		* Controla o status checkbox
		*/
		disabled: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			isChecked: this.modelValue,
			isIndeterminate: this.indeterminate,
		};
	},

	computed: {
		resolveCheckboxClass() {
			const disabledClass = this.disabled ? 'cds-checkbox__input--disabled' : '';
			const variantClass = variantClassResolver('cds-checkbox__input', this.variant);
			let checkedClass = this.isChecked
				? `cds-checkbox__input--checked`
				: 'cds-checkbox__input--unchecked';
			checkedClass = this.isIndeterminate ? 'cds-checkbox__input--indeterminate' : checkedClass;

			return `${variantClass} ${checkedClass} ${disabledClass}`;
		}
	},

	watch: {
		modelValue: {
			handler(newValue, oldValue) {
				if (newValue === oldValue) {
					return;
				}

				this.isChecked = this.modelValue;
			},
			immediate: true,
		},

		indeterminate: {
			handler(newValue, oldValue) {
				if (newValue === oldValue) {
					return;
				}

				this.isIndeterminate = this.indeterminate;
			},
			immediate: true,
		},
		isChecked: {
			handler(newValue) {
				const input = this.$el?.querySelector('input[type="checkbox"]');
				if (input && input.checked !== newValue) {
					input.checked = newValue;
				}
			},
		},
	},

	methods: {
		handleChange(event) {
			if (this.disabled) {
				event.preventDefault();
				const input = event.target;
				input.checked = this.isChecked;
				return;
			}

			this.isChecked = event.target.checked;
			this.isIndeterminate = false;
			this.$emit('update:modelValue', this.isChecked);
			this.$emit('update:indeterminate', false);
		},

		handleKeyboardToggle(event) {
			if (this.disabled) {
				event.preventDefault();
				return;
			}
		},

		handleInputClick(event) {
			if (this.disabled) {
				event.preventDefault();
				const input = event.target;
				input.checked = this.isChecked;
			}
		},

		toggleValue(event) {
			if (this.disabled) {
				event?.preventDefault();
				return;
			}
			this.isChecked = this.isIndeterminate ? false : !this.isChecked;
			this.isIndeterminate = false;
			/**
			* Evento utilizado para implementar o v-model.
			* @event update:modelValue
			* @type {Event}
			*/
			this.$emit('update:modelValue', this.isChecked);

			/**
			* Evento utilizado para implementar o modelValue com a prop "Indeterminate".
			* @event update:indeterminate
			* @type {Event}
			*/
			this.$emit('update:indeterminate', false);
		},
	},
};
</script>
<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.cds-checkbox__container {
	display: flex;
	align-items: center;
	gap: tokens.spacer(2);

	input[type=checkbox] {
		clip: rect(0, 0, 0, 0);
		margin-top: tokens.spacer(n8);
		position: absolute;
	}

	.cds-checkbox__input {
		position: relative;

		@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			background-color: $base-color !important;
		}

		label {
			cursor: pointer;
			display: block;
			width: 16px;
			height: 16px;
			border-radius: tokens.$border-radius-button;
		}

		&--checked {
			&:after {
				border: 2px solid tokens.$n-0;
				border-top: none;
				border-right: none;
				content: "";
				height: 5px;
				width: 8px;
				left: 4px;
				opacity: 0;
				position: absolute;
				top: 5px;
				transform: rotate(-45deg);
				border-radius: 0.4px;
				opacity: 1;
			}
		}

		&--indeterminate {
			&:after {
				border: 2px solid tokens.$n-0;
				border-top: none;
				border-right: none;
				border-left: none;
				content: "";
				height: 5px;
				width: 8px;
				left: 4px;
				opacity: 0;
				position: absolute;
				top: 5px;
				border-radius: 1px;
				opacity: 1;
			}
		}

		&--disabled {
			background-color: tokens.$n-100 !important;
			border: none !important;
			cursor: not-allowed !important;
		}

		&--disabled:not(.cds-checkbox__input--checked) {
			background-color: tokens.$n-20 !important;
			border: 1px solid tokens.$n-200 !important;
			cursor: not-allowed !important;
		}

		&--unchecked {
			background-color: tokens.$n-0 !important;
			border: 1px solid tokens.$n-400 !important;
		}

	}

	.cds-checkbox__label {
		@include tokens.body-2;
		cursor: pointer;
		color: tokens.$n-700;

		&--disabled {
			@extend .cds-checkbox__label;
			color: tokens.$n-400;
			cursor: not-allowed !important;
		}

		&--prominent {
			font-weight: tokens.$font-weight-semibold;
			color: tokens.$n-800;
		}
	}
}
</style>
