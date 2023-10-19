<template>
	<div>
		<label
			class="input__label"
		>
			<div
				class="label__content"
				:for="id"
			>
				<span>
					{{ label }}
				</span>

				<span
					v-if="required"
					class="label__required-indicator"
				>
					*
				</span>
			</div>
		</label>
		<div
			:id="id"
			class="input__container"
		>
			<div>
				<input
					:id="`${id}-start-hour`"
					v-model="startHour"
					v-facade="'##'"
					:class="computedInputClass"
					:disabled="disabled"
					type="text"
					min="0"
					max="23"
					step="1"
					placeholder="00"
					@keyup.up="startHour++"
					@keyup.down="startHour > 0 ? startHour-- : null"
					@input="handleTimeInput"
				>
				:
				<input
					:id="`${id}-start-minute`"
					v-model="startMinute"
					v-facade="'##'"
					:class="computedInputClass"
					:disabled="disabled"
					type="text"
					min="0"
					max="59"
					step="1"
					placeholder="00"
					@keyup.up="startMinute++"
					@keyup.down="startMinute > 0 ? startMinute-- : null"
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
					:id="`${id}-end-hour`"
					v-model="endHour"
					v-facade="'##'"
					:class="computedInputClass"
					:disabled="disabled"
					type="text"
					min="0"
					max="23"
					step="1"
					placeholder="00"
					@keyup.up="endHour++"
					@keyup.down="endHour > 0 ? endHour-- : null"
					@input="handleTimeInput"
				>
				:
				<input
					:id="`${id}-end-minute`"
					v-model="endMinute"
					v-facade="'##'"
					:class="computedInputClass"
					:disabled="disabled"
					type="text"
					min="0"
					max="59"
					step="1"
					placeholder="00"
					@keyup.up="endMinute++"
					@keyup.down="endMinute > 0 ? endMinute-- : null"
					@input="handleTimeInput"
				>
			</div>
		</div>
		<div
			v-if="state === 'invalid' && !disabled"
			class="input__message"
		>
			{{ errorMessage }}
		</div>
	</div>
</template>

<script>
import { facade } from 'vue-input-facade';
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
	directives: {
		facade,
	},

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
		modelValue: {
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

	computed: {
		computedInputClass() {
			if (this.disabled) {
				return 'input__time--disabled';
			}

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
		modelValue(newValue, oldValue) {
			if (newValue === oldValue || newValue == null) {
				return;
			}

			this.buildTimeElements(newValue);
		},
	},

	mounted() {
		this.buildTimeElements(this.modelValue);
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
				this.$emit('update:modelValue', null);
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
			* @event update:modelValue
			* @type {Event}
			*/
			this.$emit('update:modelValue', `${this.startHour}:${this.startMinute}`);
		},

		resolveRangeInterval() {
			const interval = Interval.fromDateTimes(
				DateTime.fromFormat(`${this.startHour}:${this.startMinute}`, 'HH:mm'),
				DateTime.fromFormat(`${this.endHour}:${this.endMinute}`, 'HH:mm'),
			);

			if (interval.invalid) {
				this.$emit('update:modelValue', null);
				return;
			}

			this.$emit('update:modelValue', [
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
				this.startHour = '';
				this.startMinute = '';
				this.endHour = '';
				this.endMinute = '';

				return;
			}

			[this.startHour, this.startMinute] = time[0].split(':');
			[this.endHour, this.endMinute] = time[1].split(':');
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.label {
	&__required-indicator {
		color: $rc-600;
	}

	&__content {
		margin: mb(1);
	}
}

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
		border-radius: $border-radius-lil;
		width: 36px;
		height: 40px;
		text-align: center;
		color: $n-600;

		&::placeholder {
			color: $n-200;
		}

		&:focus-visible {
			outline-color: $bn-300;
		}

		&--disabled {
			@extend .input__time;
			background-color: $n-20 !important;
			pointer-events: none;
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

	&__label {
		@include label;
		display: flex;
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
