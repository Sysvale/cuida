<template>
	<div>
		<span>
			<span
				v-if="hasSlots"
			>
				<slot name="label" />
			</span>

			<label
				v-else
				class="stepper-input__label"
				for="stepper-input"
			>
				<span>
					{{ label }}
				</span>
	
				<span
					v-if="required"
					class="stepper-input__label--required-indicator"
				>
					*
				</span>
	
			</label>
		</span>

		<div :class="stepperInputDynamicClass">
			<input
				:disabled="disabled"
				@focus="isBeingFocused = true"
				@blur="isBeingFocused = false"
				v-model="internalValue"
				class="stepper-input__field"
				:class="{
					'stepper-input__field--thin': width === 'thin',
					'stepper-input__field--default': width === 'default',
					'stepper-input__field--wide': width =='wide',
				}"
				id="stepper-input"
				type="number"
			/>

			<div class="stepper-input__icon-container">
				<button
					:disabled="disabled"
					@focus="isBeingFocused = true"
					@blur="isBeingFocused = false"
					@click="changeValue(1)"
					v-longclick="() => changeValue(1)"
					class="stepper-input__icon--plus"
					tabindex="-1"
				>
					<plus-icon size="1x" class="custom-class" />
				</button>

				<button
					:disabled="disabled"
					@focus="isBeingFocused = true"
					@blur="isBeingFocused = false"
					@click="changeValue(-1)"
					v-longclick="() => changeValue(-1)"
					class="stepper-input__icon--minus"
					tabindex="-1"
				>
					<minus-icon size="1x" class="custom-class" />
				</button>
			</div>
		</div>

		<div
			v-if="errorState && !disabled"
			class="stepper-input__error-message"
		>
			{{ errorMessage }}
		</div>
	</div>
</template>

<script>
import { PlusIcon, MinusIcon } from 'vue-feather-icons';

export default {
	props: {
		/**
		* Prop utilizada como v-model. Controla a visibilidade do popover .
		*/
		value: {
			type: [Number, String],
			default: 0,
		},
		/**
		 * Especifica o maior valor que o StepperInput deve aceitar.
		 */
		max: {
			type: [Number, String],
			default: Number.MAX_SAFE_INTEGER,
		},
		/**
		 * Especifica o menor valor que o StepperInput deve aceitar.
		 */
		min: {
			type: [Number, String],
			default: Number.MIN_SAFE_INTEGER,
		},
		/**
		 * Especifica a label do input.
		 */
		label: {
			type: String,
			default: 'Label',
		},
		/**
		 * Exibe asterisco de obrigatório (obs.: não faz a validação)
		 */
		 required: {
			type: Boolean,
			default: false,
		},
		/**
		 * Define a largura do Select. As opções são 'thin', 'default' e 'wide'.
		 */
		 width: {
			type: String,
			default: 'default',
			required: false,
		},
		/**
		 * Desabilita o input.
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Especifica o estado do StepperInput. As opções são 'default', 'valid' e 'invalid'.
		 */
		state: {
			type: String,
			default: 'default',
		},
		/**
		 * Especifica a mensagem de erro, que será exibida caso o estado seja inválido
		 */
		 errorMessage: {
			type: String,
			default: 'Valor inválido',
		},
	},

	components: {
		PlusIcon,
		MinusIcon,
	},

	data() {
		return {
			internalValue: this.value,
			isBeingFocused: false,
		};
	},

	computed: {
		hasSlots() {
			return !!Object.keys(this.$slots).length;
		},

		errorState() {
			return this.state === 'invalid';
		},

		stepperInputDynamicClass() {
			let stepperInputClass = '';

			if (!this.isBeingFocused) {
				stepperInputClass = 'stepper-input';

				if (!this.disabled) {
					if (this.state === 'valid') {
						stepperInputClass += ' stepper-input--valid';
					} else if (this.state === 'invalid') {
						stepperInputClass += ' stepper-input--invalid';
					}
				} else {
					stepperInputClass += ' stepper-input--disabled';
				}
			} else if (!this.disabled) {
				if (this.state === 'default') {
					stepperInputClass += ' stepper-input--focused';
				} else if (this.state === 'valid') {
					stepperInputClass += ' stepper-input--focused-valid';
				} else if (this.state === 'invalid') {
					stepperInputClass += ' stepper-input--focused-invalid';
				}
			}

			return stepperInputClass;
		},
	},

	watch: {
		internalValue(value) {
			if (!value) {
				this.internalValue = 0;
			}

			if (value < this.min) {
				/**
				* Evento que indica que o valor informado está fora do intervalo aceito.
				* @event invalid number
				* @type {Event}
				*/
				this.internalValue = this.min;
				this.$emit('invalid-number', `'O campo não pode ser menor que ${parseInt(this.min, 10)}.'`);
			} else if (value > this.max) {
				this.internalValue = this.max;
				this.$emit('invalid-number', `'O campo não pode ser maior que ${parseInt(this.max, 10)}.'`);
			} else {
				/**
				* Evento utilizado para implementar o v-model.
				* @event input
				* @type {Event}
				*/
				this.$emit('input', parseInt(value, 10));
			}
		},
	},

	methods: {
		changeValue(amount) {
			this.internalValue = parseInt(this.internalValue) + amount;
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.stepper-input {
	display: flex;
	outline: 1px solid $n-50;
	border-radius: 6px;
	height: 40px;
	width: fit-content;
	width: -moz-fit-content;

	&__label {
		@include body-2;
		font-weight: $font-weight-semibold;
		color: $n-700;

		&--required-indicator {
			color: $rc-600;
		}
	}

	&__icon-container {
		background-color: $n-20;
		display: flex;
		flex-direction: column;
		justify-content: center;
		border-radius: 0px 8px 8px 0px;
	}

	&__field {
		padding: pa(2);
		margin: mr(2);
		border-radius: 6px;
		border: none;
		text-align: end;
		color: $n-600;

		&--thin {
			width: 72px;
		}

		&--default {
			width: 144px;
		}

		&--wide {
			width: 284px;
		}

		&:focus {
			outline: 0;
		}
	}

	&--focused {
		@extend .stepper-input;
		outline: 1px solid $bn-300;
		box-shadow: 0 0 0 0.2rem rgba($bn-300, .45);
	}

	&--valid {
		@extend .stepper-input;
		outline: 1px solid $gp-500;
	}

	&--invalid {
		@extend .stepper-input;
		outline: 1px solid $rc-600;
	}

	&--focused-valid {
		@extend .stepper-input--valid;
		box-shadow: 0 0 0 0.2rem rgba($gp-300, .45);
	}

	&--focused-invalid {
		@extend .stepper-input--invalid;
		box-shadow: 0 0 0 0.2rem rgba($rc-300, .45);
	}

	&--disabled {
		background-color: $n-10;
		pointer-events: none;
	}

	&__icon--plus {
		background: none;
		border: none;
		padding: 0;
		outline: none;
		padding: pt(1);
		display: flex;
		color: $n-600;
		transition: all 0.2s ease-out;
		height: 50%;

		&:hover {
			background-color: $bn-400;
			color: $n-0;
			border-radius: 0px 8px 0px 0px;
		}

		&:active {
			background-color: $bn-500;
			border-radius: 0px 8px 0px 0px;
		}
	}

	&__icon--minus {
		background: none;
		border: none;
		padding: 0;
		outline: none;
		padding: pt(1);
		display: flex;
		color: $n-600;
		transition: all 0.2s ease-out;
		height: 50%;

		&:hover {
			background-color: $bn-400;
			color: $n-0;
			border-radius: 0px 0px 8px 0px;
		}

		&:active {
			background-color: $bn-500;
			border-radius: 0px 0px 8px 0px;
		}
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

input[type=number] {
	-moz-appearance: textfield;
}

input[type=number]{
	// width: 68px;
}

input:disabled {
	background: none !important;
}
</style>
