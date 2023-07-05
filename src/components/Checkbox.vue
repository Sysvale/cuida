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
				:checked="isChecked"
				:disabled="disabled"
			>

			<label
				:for="$attrs.id || 'cds-checkbox-option-input'"
				:class="resolveCheckboxClass"
				@click.stop="toggleValue"
			/>
		</div>

		<div
			class="cds-checkbox__label"
			:class="{
				'cds-checkbox__label--disabled': disabled
			}"
			@click="toggleValue"
		>
			{{ label }}
		</div>
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
		* Prop usada para indicar visualmente se o checkbox está no estado indeterminado. Two-way binding ativo com o `v-model:indeterminate`
		*/
		indeterminate: {
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
<style lang="scss">
@import '../assets/sass/tokens.scss';

.cds-checkbox__container {
	display: flex;
	align-items: center;
	width: fit-content;

	input[type=checkbox] {
		visibility: hidden;
	}

	.cds-checkbox__input {
		width: 18px;
		position: relative;
		margin-right: spacer(3);
		margin-top: spacer(n1);

		@include variantResolver using ($color-name, $base-color, $disabled, $muted, $background, $hover) {
			background-color: $base-color !important;
		}

		label {
			cursor: pointer;
			position: absolute;
			width: 18px;
			height: 18px;
			top: 3px;
			border-radius: $border-radius-button;
		}

		&--checked {
			&:after {
				border: 2px solid $n-0;
				border-top: none;
				border-right: none;
				content: "";
				height: 5px;
				width: 9px;
				left: 5px;
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
				width: 9px;
				left: 5px;
				opacity: 0;
				position: absolute;
				top: 5px;
				border-radius: 1px;
				opacity: 1;
			}
		}

		&--unchecked {
			border: 1px solid $n-400;
			background-color: $n-0 !important;
		}

		&--disabled {
			background-color: $n-20 !important;
			border-color: $n-50 !important;
		}
	}

	.cds-checkbox__label {
		@include body-2;
		cursor: pointer;

		&--disabled {
			@extend .cds-checkbox__label;
			color: $n-300;
		}
	}
}
</style>
