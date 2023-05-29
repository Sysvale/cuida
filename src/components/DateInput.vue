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
			id="cds-date-input"
			v-model="internalDate"
			locale="pt-BR"
			:available-dates="availableDates"
			@update:modelValue="handleUpdateInput"
		>
			<template #header-left-button="{ page }">
				<cds-chevron
					direction="left"
					@click="page.movePrevMonth()"
				/>
			</template>
			<template #header-right-button="{ page }">
				<cds-chevron
					direction="right"
					@click="page.moveNextMonth()"
				/>
			</template>

			<template #default="{ inputValue, togglePopover, inputEvents }">
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
				>
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
import { DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';
import CdsChevron from './Chevron.vue';

const dateStringValidator = (value) => /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(value);

export default {
	components: {
		VDatePicker: DatePicker,
		CdsChevron,
	},

	props: {
		/**
		* Prop utilizada como v-model. Deve ser uma string no formato `yyyy-MM-dd`.
		*/
		modelValue: {
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
		modelValue(newValue, oldValue) {
			if (newValue === oldValue) {
				return;
			}

			this.resolveInternalDate();
		},
	},

	mounted() {
		this.resolveInternalDate();
	},

	methods: {
		handleUpdateInput(date) {
			/**
			* Evento emitido quando uma data é selecionada. Utilizado para implementar o v-model.
			* @event update:modelValue
			* @type {Event}
			*/
			this.$emit('update:modelValue', date ? DateTime.fromJSDate(date).toFormat('yyyy-MM-dd') : '');
		},

		resolveInternalDate() {
			if (!this.modelValue) {
				this.internalDate = '';
				return;
			}

			this.internalDate = dateStringValidator(this.modelValue)
				? DateTime.fromFormat(this.modelValue, 'yyyy-MM-dd')
				: DateTime.now();
		},
	},
};
</script>

<style lang="scss">
@import '../assets/sass/tokens.scss';

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
		@include label;

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

.vc-popover-caret {
	display: none !important;
}

.vc-container {
	outline: 1px solid $n-30 !important;
	border: none !important;
	border-radius: $border-radius-extra-small !important;
}

.vc-popover-content {
	box-shadow: none !important;
	box-shadow: 0px 0px 8px rgba($n-900, .08) !important;
}

.vc-arrows-container {
	padding: 12px 10px !important
}

.vc-title {
	line-height: 24px !important;
}
</style>
