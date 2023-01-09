<template>
	<div class="date-input__container">
		<span>
			<span
				v-if="hasSlots"
			>
				<!-- @slot Slot para renderização customizada da label. -->
				<slot name="label" />
			</span>

			<label
				v-else
				class="date-input__label"
				for="cds-date-input"
			>
				<span>
					{{ label }}
				</span>
	
				<span
					v-if="required"
					class="date-input__label--required-indicator"
				>
					*
				</span>
	
			</label>
		</span>

		<v-date-picker
			v-model="internalDate"
			id="cds-date-input"
			locale="pt-BR"
			:available-dates="availableDates"
			@input="handleDateInput"
		>
			<template v-slot="{ inputValue, togglePopover, inputEvents }">
				<input
					:value="inputValue"
					:class="inputClass"
					:disabled="disabled"
					:placeholder="placeholder"
					type="text"
					v-on="inputEvents"
					@click="togglePopover"
					@focus="isBeingFocused = true"
					@blur="isBeingFocused = false"
				/>
			</template>
		</v-date-picker>
		<div
			v-if="errorState && !disabled"
			class="date-input__error-message"
		>
			{{ errorMessage }}
		</div>
	</div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import { DateTime } from 'luxon';
import * as VDatePicker from 'v-calendar/lib/components/date-picker.umd';

const dateStringValidator = (value) => /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(value);

export default {
	components: {
		VDatePicker,
	},

	props: {
		/**
		* Prop utilizada como v-model. Deve ser uma string no formato `yyyy-MM-dd`.
		*/
		value: {
			type: String,
			default: '',
			validator: (value) => value === '' || dateStringValidator(value),
		},
		/**
		 * Especifica a label do input.
		 */
		label: {
			type: String,
			default: 'Date',
		},
		/**
		 * Desabilita o input.
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Especifica o estado do DateInput. As opções são 'default', 'valid' e 'invalid'.
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
		 * Especifica a mensagem de erro, que será exibida caso o estado seja inválido
		 */
		 errorMessage: {
			type: String,
			default: 'Valor inválido',
		},
		/**
		 * Especifica se a largura do DateInput deve ser fluida.
		 */
		fluid: {
			type: Boolean,
			default: false,
		},
		/**
		 * A data mínima selecionável no DateInput. Deve ser uma string no formato `yyyy-MM-dd`.
		 */
		minDate: {
			type: String,
			default: '',
			validator: (value) => value === '' || dateStringValidator(value),
		},
		/**
		 * A data máxima selecionável no DateInput. Deve ser uma string no formato `yyyy-MM-dd`.
		 */
		maxDate: {
			type: String,
			default: '',
			validator: (value) => value === '' || dateStringValidator(value),
		},
		/**
		 * Texto placeholder para o DateInput.
		 */
		placeholder: {
			type: String,
			default: 'Selecione uma data',
		},
	},

	data() {
		return {
			internalDate: DateTime.now(),
			isBeingFocused: false,
		};
	},

	mounted() {
		this.resolveInternalDate();
	},

	computed: {
		errorState() {
			return this.state === 'invalid';
		},

		hasSlots() {
			return !!Object.keys(this.$slots).length;
		},

		inputClass() {
			let returningClass = '';

			if (!this.isBeingFocused) {
				if (!this.disabled) {
					if (this.state === 'valid') {
						returningClass += ' date-input--valid';
					} else if (this.state === 'invalid') {
						returningClass += ' date-input--invalid';
					}
				}
			} else if (!this.disabled) {
				if (this.state === 'valid') {
					returningClass += ' date-input--focused-valid';
				} else if (this.state === 'invalid') {
					returningClass += ' date-input--focused-invalid';
				}
			}

			returningClass += this.fluid ? ' date-input--fluid' : ' date-input';

			return returningClass;
		},

		availableDates() {
			return {
				start: this.minDate ? DateTime.fromISO(this.minDate) : null,
				end: this.maxDate ? DateTime.fromISO(this.maxDate) : null,
			};
		},
	},

	watch: {
		value(newValue, oldValue) {
			if (newValue === oldValue) {
				return;
			}

			this.resolveInternalDate();
		},
	},

	methods: {
		handleDateInput(date) {
			/**
			* Evento emitido quando uma data é selecionada. Utilizado para implementar o v-model.
			* @event input
			* @type {Event}
			*/
			this.$emit('input', date ? DateTime.fromJSDate(date).toFormat('yyyy-MM-dd') : '');
		},

		resolveInternalDate() {
			if (!this.value) {
				this.internalDate = '';
				return;
			}

			this.internalDate = dateStringValidator(this.value)
				? DateTime.fromFormat(this.value, 'yyyy-MM-dd')
				: DateTime.now();
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.date-input {
	outline: 1px solid $n-50;
	border: none;
	border-radius: $border-radius-extra-small !important;
	padding: pa(3);
	color: $n-600;
	cursor: pointer;

	&:focus {
		@extend .date-input;
		outline: 0;
		outline: 1px solid $bn-300;
		box-shadow: 0 0 0 0.2rem rgba($bn-300, .45);
	}

	&--fluid {
		@extend .date-input;
		width: 100%;
	}

	&--valid {
		outline: 1px solid $gp-500 !important;
	}

	&--invalid {
		outline: 1px solid $rc-600 !important;
	}

	&--focused-valid {
		@extend .date-input--valid;
		box-shadow: 0 0 0 0.2rem rgba($gp-300, .45) !important;
	}

	&--focused-invalid {
		@extend .date-input--invalid;
		box-shadow: 0 0 0 0.2rem rgba($rc-300, .45) !important;
	}

	&__container {
		display: flex;
		flex-direction: column;
	}

	&__label {
		@include body-2;
		font-weight: $font-weight-semibold;
		color: $n-700;
		margin: mb(2);

		&--required-indicator {
			color: $rc-600;
		}
	}

	&__error-message {
		@include caption;
		color: $rc-600;
		margin: mt(1);
	}
}
</style>
