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
			<div>
				<input
					:class="computedInputClass"
					v-model="startHour"
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
					:class="computedInputClass"
					v-model="startMinute"
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
			<div
				v-if="mode === 'range'"
				class="input__separator"
			>
				Até
			</div>
			<div v-if="mode === 'range'">
				<input
					:class="computedInputClass"
					v-model="endHour"
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
					:class="computedInputClass"
					v-model="endMinute"
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
		<div
			v-if="state === 'invalid'"
			class="input__message"
		>
			{{ errorMessage }}
		</div>
	</div>
</template>

<script>
import { Interval, DateTime } from 'luxon';
import { hourFormat, isAfter } from '../utils/validators/time';

const valueValidator = (value) => {
	if (value === '' || value === []) {
		return true;
	}

	if (typeof value === 'string') {
		return hourFormat(value);
	}

	return value.length === 2
		&& isAfter(value[1], value[0]);
};

export default {
	props: {
		/**
		* Prop utilizada como v-model. Define o horário exibido.
		*
		* Modo `single`: Deve ser enviada como uma String contendo o horário.
		*
		* Modo `range`: Deve ser enviada como um Array contendo dois horários (inicial e final).
		*
		* Pode ser enviada como um Array vazio ou String vazia.
		*
		* Todos os horários devem estar no formato `HH:mm`.
		*
		*/
		value: {
			type: [String, Array],
			default: '',
			validator: valueValidator,
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
		 * Propriedade utilizada para definir o desabilitado do componente
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Propriedade utilizada para definir o modo de exibição do componente.
		 *
		 * `single`: Apenas um input de tempo;
		 *
		 * `range`: Dois inputs de tempo (início e fim).
		 */
		mode: {
			type: String,
			default: 'single',
			validator: (value) => ['single', 'range'].includes(value),
		},
		/**
		 * Propriedade utilizada para indicar o estado de validação do componente.
		 */
		state: {
			type: String,
			default: 'default',
			validator: (value) => ['default', 'valid', 'invalid'].includes(value),
		},
		/**
		 * Mensagem a ser exibida em caso de estado inválido.
		 */
		errorMessage: {
			type: String,
			default: 'Horário inválido',
		},
	},

	data() {
		return {
			startHour: '',
			startMinute: '',
			endHour: '',
			endMinute: '',
		};
	},

	mounted() {
		this.buildTimeElements(this.value);
	},

	computed: {
		computedInputClass() {
			switch (this.state) {
				case 'valid':
					return 'input__time--valid';
				case 'invalid':
					return 'input__time--invalid';
				default:
					return 'input__time';
			}
		},
	},

	watch: {
		value(newValue, oldValue) {
			if (newValue === oldValue || !newValue) {
				return;
			}

			this.buildTimeElements(newValue);
		},
	},

	methods: {
		handleTimeInput() {
			this.startHour = this.startHour ? this.resolveTimeElement(this.startHour, 23) : '';
			this.startMinute = this.startMinute ? this.resolveTimeElement(this.startMinute, 59) : '';
			this.endHour = this.endHour ? this.resolveTimeElement(this.endHour, 23) : '';
			this.endMinute = this.endMinute ? this.resolveTimeElement(this.endMinute, 59) : '';

			if (
				!(this.startHour && this.startMinute)
				|| (this.range && !(this.endHour && this.endMinute))
			) {
				this.$emit('input', null);
				return;
			}

			if (this.mode === 'range') {
				this.resolveRangeInterval();
				return;
			}

			/**
			* Evento indicando que o input foi preenchido.
			* Retorna uma string com o horário, caso o componente esteja em modo `single`,
			* ou um array contendo horários inicial e final, quando em modo `range`.
			*
			* Em caso de o valor do campo estar inválido, o evento é emitido com valor `null`,
			* leve isto em consideração em possíveis formatações.
			*
			* As datas são retornadas sempre no formato `HH:mm`.
			* @event input
			* @type {Event}
			*/
			this.$emit('input', `${this.startHour}:${this.startMinute}`);
		},

		resolveRangeInterval() {
			const interval = Interval.fromDateTimes(
				DateTime.fromFormat(`${this.startHour}:${this.startMinute}`, 'HH:mm'),
				DateTime.fromFormat(`${this.endHour}:${this.endMinute}`, 'HH:mm'),
			);

			if (interval.invalid) {
				this.$emit('input', null);
				return;
			}

			this.$emit('input', [
				interval.start.toFormat('HH:mm'),
				interval.end.toFormat('HH:mm'),
			]);
		},

		formatTimeElement(element) {
			return parseInt(element, 10).toLocaleString(undefined, {
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
		},

		buildTimeElements(time) {
			if (this.mode === 'single') {
				if (typeof time !== 'string') {
					return;
				}

				[this.startHour, this.startMinute] = time.split(':');
				return;
			}

			if (typeof time === 'string') {
				return;
			}

			[this.startHour, this.startMinute] = time[0].split(':');
			[this.endHour, this.endMinute] = time[1].split(':');
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.input {
	&__container {
		color: $n-400;
		display: flex;
		align-items: center;
	}

	&__separator {
		@include caption;
		margin: mx(3);
		color: $n-600;
	}

	&__time {
		@include caption;
		border: 1px solid $n-50;
		border-radius: $border-radius-button;
		width: 33px;
		text-align: center;
		color: $n-600;

		&::placeholder {
			color: $n-200;
		}

		&:focus-visible {
			outline-color: $bn-300;
		}

		&--valid {
			@extend .input__time;
			border: 1px solid $gp-500;

			&:focus-visible {
				outline-color: $gp-500;
			}
		}

		&--invalid {
			@extend .input__time;
			border: 1px solid $rc-500;

			&:focus-visible {
				outline-color: $rc-500;
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
	}

	&__message {
		@include caption;
		color: $rc-500;
		margin: mt(2);
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
