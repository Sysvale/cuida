<template>
	<span class="cds-radio">
		<!--
			Evento emitido quando o Radio muda seu estado.
			@event change
			@type {Event}
		-->
		<input
			type="radio"
			:id="value"
			:value="value"
			:disabled="disabled"
			:name="name"
			:checked="isChecked"
			@change="$emit('change', $event.target.value)"
		>
		<label
			class="cds-radio__content"
			:for="value"
		>
			<!-- @slot Slot padrão para renderização de conteúdo customizado da label -->
			<slot>
				<span
					class="cds-radio__label"
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
		 * A prop usada para controle do input pelo name. Definir mesmo name para um grupo de opções.
		*/
		name: {
			type: String,
			default: '',
		},
		/**
		 * Define a label do input, o conteúdo que é exibido para descrever o Radio.
		 */
		label: {
			type: String,
			default: '',
		},
		/**
		 * Controla o status do radio
		 */
		disabled: {
			type: Boolean,
			default: false,
			required: false,
		},
		/**
		 * Estado do radio em relação a validação
		 */
		invalid: {
			type: Boolean,
			default: false,
			required: false,
		},
	},

	computed: {
		isChecked() {
			return this.modelValue == this.value;
		},
	},
};
</script>

<style lang="scss">
@import '../assets/sass/app.scss';

.cds-radio [type="radio"]:checked,
.cds-radio [type="radio"]:not(:checked) {
	position: absolute;
	left: -9999px;
}

.cds-radio [type="radio"]:checked + label,
.cds-radio [type="radio"]:not(:checked) + label
{
	position: relative;
	padding: pl(7);
	cursor: pointer;
	line-height: 20px;
	display: inline-block;
	color: $n-800;
}

.cds-radio [type="radio"]:checked + label:before,
.cds-radio [type="radio"]:not(:checked) + label:before {
	content: '';
	position: absolute;
	left: 0;
	top: 0;
	width: 20px;
	height: 20px;
	border: 1px solid $n-200;
	border-radius: 100%;
	background: $n-0;
}

.cds-radio [type="radio"]:checked + label:after,
.cds-radio [type="radio"]:not(:checked) + label:after {
	content: '';
	width: 12px;
	height: 12px;
	background: $gp-500;
    border: 1px solid $gp-500;
	position: absolute;
	top: 4px;
	left: 4px;
	border-radius: 100%;
	-webkit-transition: all 0.3s ease;
	transition: all 0.3s ease;
}

.cds-radio [type="radio"]:not(:checked) + label:after {
	opacity: 0;
	-webkit-transform: scale(0);
	transform: scale(0);
}

.cds-radio [type="radio"]:checked + label:after {
	opacity: 1;
	-webkit-transform: scale(1);
	transform: scale(1);
}

.cds-radio input[type="radio"][disabled="disabled"] + label:before {
	-webkit-transition: all 0.3s ease;
	transition: all 0.3s ease;
    background: $n-30;
    color: $n-30;
    cursor: not-allowed;
}

.cds-radio input[type="radio"][invalid="invalid"] + label:before {
	border: 2px solid $rc-400;
}
</style>
