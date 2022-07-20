<template>
	<span
		id="cds-checkbox"
		class="checkbox__container"
		@click="toggleValue"
	>
		<div class="checkbox__content">
			<input
				v-model="internalValue"
				type="checkbox"
				:id="'cds-checkbox-option-input'"
				:name="$attrs.name || 'cds-checkbox-option'"
				:value="true"
				:disabled="disabled"
			/>
			<label
				:for="$attrs.name || 'cds-checkbox-option'"
				:class="{
					'checkbox__content--checked': internalValue,
					'checkbox__content--disabled': disabled,
					'checkbox__content--indeterminate': indeterminate && !internalValue,
				}"
				@click.stop="toggleValue"
			/>
		</div>
		<div
			v-if="!noText"
			class="checkbox__label"
			:class="{
				'checkbox__label--disabled': disabled
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
export default {
	props: {
		/**
		 * A prop usada como v-model para monitorar a seleção do Checkbox
		*/
		value: {
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
		 * Exibe o checkbox com o estado de indeterminação 
		 * (deve ser utilizada com operador .sync)
		 */
		indeterminate: {
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
	},

	data() {
		return {
			internalValue: this.value,
		};
	},

	mounted() {
		this.updateIndeterminate(this.indeterminate);
	},

	watch: {
		internalValue(value) {
			/**
				 * Evento utilizado para o v-model.
				* @event input
				* @type {Event}
			*/
			this.$emit('input', value);
		},

		value: {
			handler(newValue) {
				this.internalValue = newValue;
				this.updateIndeterminate(false);
			},
			immediate: true,
		},

		indeterminate: {
			handler(newValue) {
				this.updateIndeterminate(newValue);
			},
		},
	},

	methods: {
		toggleValue() {
			if(this.disabled) return;
			this.internalValue = !this.internalValue;
		},
		updateIndeterminate(value) {
			if(this.internalValue) return;

			const input = document.getElementById('cds-checkbox-option-input');

			if(input) {
				input.indeterminate = value;
				/**
					 * Evento utilizado para atualizar a prop indeterminate.
					* @event input
					* @type {Event}
				*/
				this.$emit('update:indeterminate', value);
			}
		}
	}
};
</script>
<style lang="scss">
@import '../assets/sass/app.scss';

.checkbox__container {
	display: flex;
	align-items: center;
	width: fit-content;
	cursor: pointer;
}

#cds-checkbox {


	input[type=checkbox] {
		visibility: hidden;
	}

	.checkbox__content {
		width: 18px;
		position: relative;
		margin-right: spacer(6);
		margin-left: spacer(n3);

		label {
			cursor: pointer;
			position: absolute;
			width: 18px;
			height: 18px;
			top: 3px;
			border-radius: $border-radius-button;
			border: 1px solid $n-500;

			&:after {
				border: 2px solid $n-0;
				border-top: none;
				border-right: none;
				content: "";
				height: 6px;
				width: 12px;
				left: 3px;
				opacity: 0;
				position: absolute;
				top: 4px;
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

		input[type=checkbox]:indeterminate + label:after {
			-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
			filter: alpha(opacity=100);
			opacity: 1;
			border-left: none !important;
			top: 4px !important;
			width: 9px !important;
			transform: rotate(0deg) !important;
		}

		&--checked {
			background-color: $gp-500 !important;
			border: none !important;
		}

		&--indeterminate {
			background-color: $gp-500 !important;
			border: none !important;
		}

		&--disabled {
			background-color: $n-40 !important;
			border: none !important;
		}
	}

	.checkbox__label {
		@include body-2;
		color: $n-500;

		&--disabled {
			@extend .checkbox__label;
			color: $n-40;
		}
	}
}


</style>
