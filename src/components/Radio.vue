<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<span class="cds-radio__container">
		<!--
			Evento emitido quando o Radio muda seu estado.
			@event change
			@type {Event}
		-->
		<input
			:id="`${uniqueId}-${value}`"
			type="radio"
			class="cds-radio"
			:class="`cds-radio--${variant}`"
			:value="value"
			:disabled="disabled"
			:name="$attrs.name"
			:checked="isChecked"
			@change="$emit('update:modelValue', $event.target.value)"
		>

		<label
			class="cds-radio__label"
			:for="`${uniqueId}-${value}`"
		>
			<!-- @slot Slot padrão para renderização de conteúdo customizado da label -->
			<slot>
				<span
					class="cds-radio__label-text"
					:disabled="disabled"
				>
					{{ label }}
				</span>
			</slot>
		</label>
	</span>
</template>

<script>
export default {
	props: {
		/**
		 * A prop usada como v-model para monitorar a seleção do Radio
		*/
		modelValue: {
			default: null,
			required: true,
		},
		/**
		 * A prop usada como valor associado ao Radio. O que será atribuído
		 * v-model quando essa opção for selecionado
		*/
		value: {
			default: null,
			required: true,
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
		 * Define a label do input, o conteúdo que é exibido para descrever o Radio
		 */
		label: {
			type: String,
			default: 'radio content',
		},
		/**
		 * Controla o status do Radio
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			uniqueId: Math.random(),
		};
	},

	computed: {
		isChecked() {
			return this.modelValue === this.value;
		},

		cursorType() {
			return this.disabled ? 'default' : 'pointer';
		}
	},
};
</script>

<style lang="scss">
@import '../assets/sass/tokens.scss';

.cds-radio__container {
	display: flex;
	align-items: flex-start;
}

.cds-radio__label {
	cursor: v-bind(cursorType);
	@include body-2;
	margin: ml(2);
}

.cds-radio {
	cursor: v-bind(cursorType);
	-webkit-appearance: none;
	appearance: none;
	margin: 0;
	font: inherit;
	width: 16px;
	height: 16px;
	border: 1px solid $n-400;
	border-radius: 50%;
	margin-top: 1.4px;
	display: grid;
	place-content: center;

	@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
		&:checked {
			border: 1px solid $base-color;
		}

		&::before {
			content: "";
			width: 8px;
			height: 8px;
			border-radius: 50%;
			transform: scale(0);
			transition: 120ms transform ease-in-out;
			background: $base-color;
		}

		&[disabled][checked] {
			background: $shade-200;
			border: 1px solid $shade-200;
		}

		&[disabled]:not(checked) {
			background: $n-20;
			border: 1px solid $n-100;
		}
	}

	&:checked::before {
		transform: scale(1);
	}
}
</style>
