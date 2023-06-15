<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<span
		class="cds-checkbox__container"
		@click="toggleValue"
	>
		<div
			class="cds-checkbox__content"
			:class="{ 'cds-checkbox__content--no-text': noText } "
		>
			<input
				:id="$attrs.id || 'cds-checkbox-option-input'"
				:value="modelValue"
				type="checkbox"
				:name="$attrs.name || 'cds-checkbox-option'"
				:checked="isChecked"
				:disabled="disabled"
				@input="toggleValue"
			>
			<label
				:for="$attrs.id || 'cds-checkbox-option-input'"
				:class="resolveCheckboxClass"
				@click.stop="toggleValue"
			/>
		</div>
		<div
			v-if="!noText"
			class="cds-checkbox__label"
			:class="{
				'cds-checkbox__label--disabled': disabled
			}"
		>
			<!-- @slot Slot usado pra mostrar o conteúdo do checkbox. -->
			<slot>
				{{ label }}
			</slot>
		</div>
	</span>
</template>

<script>
import variantClassResolver from '../utils/methods/variantClassResolver';

export default {
	props: {
		/**
		 * A prop usada como v-model para monitorar a seleção do Checkbox
		*/
		modelValue: {
			default: null,
			required: true,
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
		 * Controla a exibição da etiqueta do checkbox
		 */
		noText: {
			type: Boolean,
			default: false,
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
		};
	},

	computed: {
		resolveCheckboxClass() {
			const disabledClass = this.disabled ? 'cds-checkbox__content--disabled' : '';
			const checkedClass = this.isChecked
				? `cds-checkbox__content--checked ${variantClassResolver('cds-checkbox__content--checked', this.variant)}`
				: '';
			return `${checkedClass} ${disabledClass}`;
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
	},

	methods: {
		toggleValue() {
			if (this.disabled) return;
			this.isChecked = !this.isChecked;
			/**
			* Evento utilizado para implementar o v-model.
			* @event update:modelValue
			* @type {Event}
			*/
			this.$emit('update:modelValue', this.isChecked);
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
	cursor: pointer;

	input[type=checkbox] {
		visibility: hidden;
	}

	.cds-checkbox__content {
		width: 18px;
		position: relative;
		margin-right: spacer(3);
		margin-top: spacer(n1);
		box-sizing: border-box;

		&--no-text {
			margin-right: spacer(0);
		}

		label {
			box-sizing: border-box;
			cursor: pointer;
			position: absolute;
			width: 18px;
			height: 18px;
			top: 3px;
			border-radius: $border-radius-button;
			border: 1px solid $n-400;

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
			}
		}

		input[type=checkbox]:checked + label:after {
			-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
			filter: alpha(opacity=100);
			opacity: 1;
		}

		input[type=checkbox]:not(:checked) + label:after {
			-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=1)";
			filter: alpha(opacity=1);
			opacity: 1;
			border: none !important;
		}

		&--checked {
			background-color: $gp-500 !important;
			border: none !important;

			@include variantResolver using ($color-name, $base-color, $disabled, $muted, $background, $hover) {
				@extend .cds-checkbox__content--checked;
				background-color: $base-color !important;
			}
		}

		&--disabled {
			background-color: $n-40 !important;
			border: none !important;
		}
	}

	.cds-checkbox__label {
		@include body-2;
		color: $n-600;

		&--disabled {
			@extend .cds-checkbox__label;
			color: $n-300;
		}
	}
}
</style>
