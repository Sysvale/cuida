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
				:disabled="disabled"
			>

			<label
				:for="$attrs.id || 'cds-checkbox-option-input'"
				:class="resolveCheckboxClass"
				@click="toggleValue"
			/>
		</div>

		<label
			class="cds-checkbox__label"
			:class="{
				'cds-checkbox__label--disabled': disabled,
				'cds-checkbox__label--prominent': prominent && modelValue,
			}"
			:for="$attrs.id || 'cds-checkbox-option-input'"
			@click="toggleValue"
		>
			{{ label }}
		</label>
	</div>
</template>

<script>
import variantClassResolver from '../utils/methods/variantClassResolver';

export default {
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
		* A variante da Checkbox. São 10 variantes: 'teal', 'green', 'blue',
		* 'indigo', 'violet', 'pink', 'red', 'orange', 'amber' e 'dark'.
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
	},

	methods: {
		toggleValue() {
			if (this.disabled) return;
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
@import '../assets/sass/tokens.scss';

.cds-checkbox__container {
	display: flex;
	align-items: center;
	gap: spacer(2);

	input[type=checkbox] {
		visibility: hidden;
		margin-top: spacer(n8);
		position: absolute;
	}

	.cds-checkbox__input {
		position: relative;

		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			background-color: $base-color !important;
		}

		label {
			cursor: pointer;
			display: block;
			width: 16px;
			height: 16px;
			border-radius: $border-radius-button;
		}

		&--checked {
			&:after {
				border: 2px solid $n-0;
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
				border: 2px solid $n-0;
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
			background-color: $n-100 !important;
			border: none !important;
			cursor: default !important;
		}

		&--disabled:not(.cds-checkbox__input--checked) {
			background-color: $n-20 !important;
			border: 1px solid $n-200 !important;
			cursor: default !important;
		}

		&--unchecked {
			background-color: $n-0 !important;
			border: 1px solid $n-400 !important;
		}

	}

	.cds-checkbox__label {
		@include body-2;
		cursor: pointer;
		color: $n-700;

		&--disabled {
			@extend .cds-checkbox__label;
			color: $n-400;
			cursor: default !important;
		}

		&--prominent {
			font-weight: $font-weight-semibold;
			color: $n-800;
		}
	}
}
</style>
