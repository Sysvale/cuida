<template>
	<div>
		<label
			v-if="label"
			class="text-input__label"
			for="cds-text-input"
		>
			<!--
				@slot Slot para renderização customizada da label
				(Obs.: Existe, também, a prop label que pode ser usada
				quando não há necessidade de customização)
			-->
			<slot name="label">
				{{ label }}
				<span
					v-if="required"
					class="text-input__label--required-indicator"
				>
					*
				</span>
			</slot>
		</label>
		<div :class="stepperInputDynamicClass">
			<input
				id="cds-text-input"
				v-model="internalValue"
				:placeholder="placeholder"
				:disabled="disabled"
				:class="inputClass"
				type="text"
				@focus="isBeingFocused = true"
				@blur="isBeingFocused = false"
			/>

			<div class="text-input__icon-container">
				<check-icon
					v-if="validState && !disabled"
					size="1x"
					class="text-input__icon--check-icon"
				/>
				<alert-circle-icon
					v-if="errorState && !disabled"
					size="1x"
					class="text-input__icon--alert-circle-icon"
				/>
			</div>
		</div>
		<div
			v-if="errorState && !disabled"
			class="text-input__error-message"
		>
			{{ errorMessage }}
		</div>
	</div>
</template>

<script>
import { CheckIcon, AlertCircleIcon } from 'vue-feather-icons';

export default {
	props: {
		/**
		* Prop utilizada como v-model.
		*/
		value: {
			type: String,
			default: '',
		},
		/**
		 * Especifica a label do input.
		 */
		label: {
			type: String,
			default: 'Label',
		},
		/**
		 * Desabilita o input.
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Especifica o estado do TextInput. As opções são 'default', 'valid' e 'invalid'.
		 */
		state: {
			type: String,
			default: 'default',
		},

		/**
		 * Exibe asterisco de obrigatório (obs.: não faz a validação)
		 */
		required: {
			type: Boolean,
			default: false,
		},

		/**
		 * Especifica o placeholder do input
		 */
		placeholder: {
			type: String,
			default: 'Digite aqui a informação',
		},

		/**
		 * Especifica a mensagem de erro, que será exibida caso o estado seja inválido
		 */
		errorMessage: {
			type: String,
			default: 'Valor inválido',
		},
		/**
		 * Especifica se a largura do TextInput deve ser fluida.
		 */
		fluid: {
			type: Boolean,
			default: false,
			required: false,
		},
	},

	components: {
		CheckIcon,
		AlertCircleIcon,
	},

	data() {
		return {
			internalValue: this.value,
			isBeingFocused: false,
		};
	},

	computed: {
		stepperInputDynamicClass() {
			let stepperInputClass = this.fluid ? 'text-input--fluid' : 'text-input';

			if (!this.isBeingFocused) {
				if (!this.disabled) {
					if (this.state === 'valid') {
						stepperInputClass += ' text-input--valid';
					} else if (this.state === 'invalid') {
						stepperInputClass += ' text-input--invalid';
					}
				} else {
					stepperInputClass += ' text-input--disabled';
				}
			} else if (!this.disabled) {
				if (this.state === 'default') {
					stepperInputClass += ' text-input--focused';
				} else if (this.state === 'valid') {
					stepperInputClass += ' text-input--focused-valid';
				} else if (this.state === 'invalid') {
					stepperInputClass += ' text-input--focused-invalid';
				}
			}

			return stepperInputClass;
		},

		validState() {
			return this.state === 'valid';
		},

		errorState() {
			return this.state === 'invalid';
		},

		inputClass() {
			return this.fluid ? 'text-input__field--fluid' : 'text-input__field';
		},
	},

	watch: {
		internalValue(value) {
			/**
			* Evento utilizado para implementar o v-model.
			* @event input
			* @type {Event}
			*/
			this.$emit('input', value);
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.text-input {
	display: flex;
	border: 1px solid $n-50;
	border-radius: $border-radius-extra-small;
	width: fit-content;
	width: -moz-fit-content;

	&--fluid {
		@extend .text-input;
		width: 100%;
	}

	&__label {
		@include body-2;
		font-weight: $font-weight-semibold;
		color: $n-700;

		&--required-indicator {
			color: $rc-600;
		}
	}

	&__icon-container {
		background-color: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: mr(3);
		min-width: 15px;
	}

	&__field {
		padding: pa(3);
		margin: mr(2);
		height: 38px !important;
		border-radius: $border-radius-extra-small;
		border: none;
		text-align: start;
		color: $n-600;

		&:focus {
			outline: 0;
		}

		&--fluid {
			@extend .text-input__field;
			width: 100%;
		}
	}

	&--focused {
		@extend .text-input;
		border: 1px solid $bn-300;
		box-shadow: 0 0 0 0.2rem rgba($bn-300, .45);
	}

	&--valid {
		@extend .text-input;
		border: 1px solid $gp-500;
	}

	&--invalid {
		@extend .text-input;
		border: 1px solid $rc-600;
	}

	&--focused-valid {
		@extend .text-input--valid;
		box-shadow: 0 0 0 0.2rem rgba($gp-300, .45);
	}

	&--focused-invalid {
		@extend .text-input--invalid;
		box-shadow: 0 0 0 0.2rem rgba($rc-300, .45);
	}

	&--disabled {
		background-color: $n-20;
		pointer-events: none;
		border: none;
	}

	&__icon--check-icon {
		color: $gp-500;
		height: 50%;
	}

	&__icon--alert-circle-icon {
		color: $rc-600;
		height: 50%;
	}

	&__error-message {
		@include caption;
		color: $rc-600;
		margin: mt(1);
	}
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: ma(0);
}

input:disabled {
	background: none !important;
}
</style>
