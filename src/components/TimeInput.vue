<template>
	<div>
		<label :for="id">
			<span
				class="input__label"
			>
				{{ label }}
			</span>

			<span
				v-if="required"
				class="input--required"
			>
				*
			</span>
		</label>
		<div
			:id="id"
			class="input__container"
		>
			<input
				:class="computedTimeElementClass"
				v-model="hour"
				:disabled="disabled"
				type="number"
				min="0"
				max="23"
				step="1"
				placeholder="00"
				@input="handleTimeInput"
			>
			:
			<input
				:class="computedTimeElementClass"
				v-model="minute"
				:disabled="disabled"
				type="number"
				min="0"
				max="59"
				step="1"
				pattern="[0-9]*"
				placeholder="00"
				@input="handleTimeInput"
			>
		</div>
	</div>
</template>

<script>
import { colorOptions } from '../utils/constants/colors';

export default {
	props: {
		input: {
			type: String,
			default: '',
		},
		/**
		 * O id a ser utilizado pelo elemento HTML.
		 */
		id: {
			type: String,
			default: 'time-input',
		},
		/**
		 * A label a ser exibida acima do input.
		 */
		label: {
			type: String,
			required: true,
		},
		/**
		 * Propriedade utilizada para definir o estilo da label do componente.
		 * Em caso positivo, exibe um * indicando que o campo é de preenchimento obrigatório.
		 */
		required: {
			type: Boolean,
			default: false,
		},
		/**
		 * A variante de cor, que altera o estilo do estado de focus do componente.
		 * São 9 variantes implementadas: 'green', 'teal', 'blue', 'indigo', 'violet',
		 * 'pink', 'red', 'orange' e 'amber'.
		 */
		variant: {
			type: String,
			default: 'green',
			validator: (value) => colorOptions.includes(value),
		},
		/**
		 * Propriedade utilizada para definir o desabilitado do componente
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			internalValue: '',
			hour: '',
			minute: '',
		};
	},

	computed: {
		computedTimeElementClass() {
			return colorOptions.includes(this.variant) ? 'input__time--' + this.variant : 'input__time--green';
		},
	},

	methods: {
		handleTimeInput() {
			this.hour = this.hour ? this.resolveTimeElement(this.hour, 23) : '';
			this.minute = this.minute ? this.resolveTimeElement(this.minute, 59) : '';

			if (!this.hour || !this.minute) {
				return;
			}

			/**
			* Evento indicado que o input foi preenchido.
			* Retorna o horário no formato `HH:mm`
			* @event input
			* @type {Event}
			*/
			this.$emit('input', `${this.hour}:${this.minute}`);
		},

		formatTimeElement(element) {
			return parseInt(element).toLocaleString(undefined, {
				minimumIntegerDigits: 2,
				maximumFractionDigits: 0,
			});
		},

		resolveTimeElement(element, maxValue) {
			const internalElement = this.formatTimeElement(element);

			if (internalElement > maxValue) {
				return maxValue;
			}

			if (internalElement < 0) {
				return '00';
			}

			return internalElement;
		}
	},
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.input {
	&__container {
		color: $n-400;
	}

	&__time {
		@include caption;
		border: 1px solid $n-50;
		border-radius: $border-radius-button;
		height: 39px;
		width: 33px;
		text-align: center;
		color: $n-600;

		&::placeholder {
			color: $n-200;
		}

		$colors: (
			'--teal': $ts-300,
			'--green':  $gp-300,
			'--blue': $bn-300,
			'--indigo': $in-300,
			'--violet': $vr-300,
			'--pink': $pp-300,
			'--red': $rc-300,
			'--orange': $og-300,
			'--amber': $al-300,
		);

		@each $color, $variant in $colors {
			&#{$color} {
				@extend .input__time;

				&:focus-visible {
					outline-color: $variant;
					color: $variant;
				}
			}
		}
	}

	&--required {
		color: $rc-600;
		font-weight: $font-weight-semibold;
	}

	&__label {
		font-weight: $font-weight-semibold;
		color: $n-700;
		font-size: 14px;
		margin: mb(1);
	}
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
