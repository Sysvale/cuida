<template>
	<div>
		<label v-if="label" for="stepper-input-number">{{ label }}</label>
		<div
			:class="isBeignFocused ? 'stepper-input--focused' : 'stepper-input'"
		>
			<input
				:disabled="disabled"
				@focus="isBeignFocused = true"
				@blur="isBeignFocused = false"
				v-model="internalValue"
				class="stepper-input__field"
				id="stepper-input-number"
				type="number"
			/>

			<div class="stepper-input__icon-container">
				<button
					:disabled="disabled"
					@focus="isBeignFocused = true"
					@blur="isBeignFocused = false"
					@click="changeValue(1)"
					v-longclick="() => changeValue(1)"
					class="stepper-input__icon--plus"
				>
					<plus-icon size="1x" class="custom-class" />
				</button>
				<button
					:disabled="disabled"
					@focus="isBeignFocused = true"
					@blur="isBeignFocused = false"
					@click="changeValue(-1)"
					v-longclick="() => changeValue(-1)"
					class="stepper-input__icon--minus"
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
			type: Number,
			default: 0,
		},
		/**
		 * Especifica o menor valor que o StepperInput deve aceitar.
		 */
		min: {
			type: Number,
			default: Number.MIN_SAFE_INTEGER,
		},
		/**
		 * Especifica o maior valor que o StepperInput deve aceitar.
		 */
		max: {
			type: Number,
			default: Number.MAX_SAFE_INTEGER,
		},
		/**
		 * Especifica a label do input.
		 */
		label: {
			type: String,
			default: 'Microarea',
			required: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
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
			internalValue: 0,
			isBeignFocused: false,
		};
	},

	watch: {
		internalValue(value) {
			if (value < this.min) {
				this.$emit('invalid number', `'O campo não pode ser menor que ${this.min}.'`);
				this.internalValue = this.min;
			} else if (value > this.max) {
				this.$emit('invalid number', `'O campo não pode ser maior que ${this.max}.'`);
				this.internalValue = this.max;
			} else {
				this.$emit('input', value);
			}
		},
	},

	methods: {
		changeValue (amount) {
			this.internalValue = parseInt(this.internalValue) + amount;
		}
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.stepper-input__icon-container {
	background-color: $cinza-2;
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-radius: 0px 3px 3px 0px;
}

.stepper-input__icon--plus {
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
	padding-top: 2px;
	display: flex;
	cursor: pointer;
	color: $cinza-6;
	transition: all 0.2s ease-out;
	height: 50%;
}

.stepper-input__icon--minus {
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
	padding-top: 2px;
	display: flex;
	cursor: pointer;
	color: $cinza-6;
	transition: all 0.2s ease-out;
	height: 50%;
}

.stepper-input__icon--plus:hover {
	background-color: $azul-bidu-base;
	color: $branco;
	border-radius: 0px 3px 0px 0px;
}

.stepper-input__icon--minus:hover {
	background-color: $azul-bidu-base;
	color: $branco;
	border-radius: 0px 0px 3px 0px;
}

.stepper-input__icon--plus:active {
	background-color: $azul-bidu-dark-1;
	color: $branco;
	border-radius: 0px 3px 0px 0px;
}

.stepper-input__icon--minus:active {
	background-color: $azul-bidu-dark-1;
	color: $branco;
	border-radius: 0px 0px 3px 0px;
}

.stepper-input {
	display: flex;
	border: 1px solid $cinza-4;
	border-radius: 4px;
	width: fit-content;

	&--focused {
		@extend .stepper-input;
		outline: 1px auto $azul-bidu-light-1;
	}
}

.stepper-input__field {
	@include padding(onidirecional, 2);
	@include margin(direita, 2);
	border-radius: 4px;
	height: 36px;
	border: none;
	text-align: end;
	color: $cinza-6;

	&:focus {
		outline: 0;
	}
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

input[type=number]{
	width: 68px;
}
</style>
