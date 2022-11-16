<template>
	<span class="cds-radio">
		<!--
			Evento emitido quando o Radio muda seu estado.
			@event change
			@type {Event}
		-->
		<input
			:id="value"
			class="cds-radio__input"
			type="radio"
			:value="value"
			:disabled="disabled"
			:name="$attrs.name"
			:checked="isChecked"
			@change="$emit('change', $event.target.value)"
		>
		<label
			class="cds-radio__label"
			:for="value"
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
	model: {
		prop: 'modelValue',
		event: 'change',
	},

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

	computed: {
		isChecked() {
			return this.modelValue === this.value;
		},
	},
};
</script>

<style lang="scss">
@import '../assets/sass/app.scss';

*:before,
*:after {
	box-sizing: border-box;
}

.cds-radio {
	display: flex;
	align-items: flex-start;
}

.cds-radio__label {
	@include body-2;    
	margin-left: 10px;

	[disabled="disabled"] {
		color: $n-300;
	}
}

input[type="radio"] {
	-webkit-appearance: none;
	appearance: none;
	margin: 0;
	font: inherit;
	width: 16px;
	height: 16px;
	border: 1px solid $n-50;
	border-radius: 50%;
	margin-top: 1.5px;
	display: grid;
	place-content: center;
}

input[type="radio"]:checked {
	border: 1px solid $gp-500;
}

input[type="radio"]::before {
	content: "";
	width: 8px;
	height: 8px;
	border-radius: 50%;
	transform: scale(0);
	transition: 120ms transform ease-in-out;
	background: $gp-500;
}

input[type="radio"]:checked::before {
	transform: scale(1);
}
input[type="radio"][disabled="disabled"] {
	border: 1px solid $n-50;
	background: $n-20;
}
input[type="radio"][disabled="disabled"]::before {
	background: $n-20;
}
</style>
