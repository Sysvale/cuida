<template>
	<div>
		<label v-if="label" for="stepper-input-number">{{ label }}</label>
		<div :class="stepperInputDynamicClass">
			<input
				:disabled="disabled"
				@focus="isBeingFocused = true"
				@blur="isBeingFocused = false"
				v-model="internalValue"
				class="stepper-input__field"
				id="stepper-input-number"
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
	border: 1px solid $cinza-4;
	border-radius: 4px;
	width: fit-content;
	width: -moz-fit-content;

	&__icon-container {
		background-color: $cinza-2;
		display: flex;
		flex-direction: column;
		justify-content: center;
		border-radius: 0px 3px 3px 0px;
	}

	&__field {
		padding: pa(2);
		margin: mr(2);
		border-radius: 4px;
		border: none;
		text-align: end;
		color: $cinza-6;

		&:focus {
			outline: 0;
		}
	}

	&--focused {
		@extend .stepper-input;
		border: 1px solid $azul-bidu-light-1;
		box-shadow: 0 0 0 0.2rem rgba($azul-bidu-light-1, .45);
	}

	&--valid {
		@extend .stepper-input;
		border: 1px solid $verde-piccolo-dark-1;
	}

	&--invalid {
		@extend .stepper-input;
		border: 1px solid $vermelho-mario-dark-1;
	}

	&--focused-valid {
		@extend .stepper-input--valid;
		box-shadow: 0 0 0 0.2rem rgba($verde-piccolo-light-1, .45);
	}

	&--focused-invalid {
		@extend .stepper-input--invalid;
		box-shadow: 0 0 0 0.2rem rgba($vermelho-mario-light-1, .45);
	}

	&--disabled {
		background-color: $cinza-1;
		pointer-events: none;
	}

	&__icon--plus {
		background: none;
		border: none;
		padding: 0;
		outline: none;
		padding: pt(1);
		display: flex;
		color: $cinza-6;
		transition: all 0.2s ease-out;
		height: 50%;

		&:hover {
			background-color: $azul-bidu-base;
			color: $branco;
			border-radius: 0px 3px 0px 0px;
		}

		&:active {
			background-color: $azul-bidu-dark-1;
			border-radius: 0px 3px 0px 0px;
		}
	}

	&__icon--minus {
		background: none;
		border: none;
		padding: 0;
		outline: none;
		padding: pt(1);
		display: flex;
		color: $cinza-6;
		transition: all 0.2s ease-out;
		height: 50%;

		&:hover {
			background-color: $azul-bidu-base;
			color: $branco;
			border-radius: 0px 0px 3px 0px;
		}

		&:active {
			background-color: $azul-bidu-dark-1;
			border-radius: 0px 0px 3px 0px;
		}
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
	width: 68px;
}

input:disabled {
	background: none !important;
}
</style>
