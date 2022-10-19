<template>
	<div class="date-input__container">
		<label
			v-if="label"
			class="date-input__label"
			for="cds-date-input"
		>
			<!-- @slot Slot para renderização customizada da label. -->
			<slot name="label">
				{{ label }}
				<span
					v-if="required"
					class="date-input__label--required-indicator"
				>
					*
				</span>
			</slot>
		</label>
		<v-date-picker
			v-model="internalDate"
			id="cds-date-input"
			locale="pt-BR"
			:available-dates="availableDates"
			@input="handleDateInput"
		>
			<template v-slot="{ inputValue, togglePopover }">
				<input
					:value="inputValue"
					readonly
					:class="inputClass"
					:disabled="disabled"
					:placeholder="placeholder"
					type="text"
					@click="togglePopover"
				/>
			</template>
		</v-date-picker>
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
		 * Exibe asterisco de obrigatório (obs.: não faz a validação)
		 */
		required: {
			type: Boolean,
			default: false,
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
		};
	},

	mounted() {
		this.resolveInternalDate();
	},

	computed: {
		inputClass() {
			return this.fluid ? 'date-input--fluid' : 'date-input';
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
	border: 1px solid $n-50;
	border-radius: $border-radius-extra-small;
	padding: pa(3);
	color: $n-600;
	cursor: pointer;

	&:focus {
		@extend .date-input;
		outline: 0;
		border: 1px solid $bn-300;
		box-shadow: 0 0 0 0.2rem rgba($bn-300, .45);
	}

	&--fluid {
		@extend .date-input;
		width: 100%;
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
}
</style>
