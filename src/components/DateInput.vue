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
			>
				<div
					class="label__content"
					for="cds-text-input"
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
		</span>

		<v-date-picker
			id="cds-date-input"
			v-model="internalDate"
			locale="pt-BR"
			:min-date="minDate ? new Date(minDate) : null"
			:max-date="maxDate ? new Date(maxDate) : null"
			:attributes="showTodayDot ? attributes: {}"
			color="green"
			:is-range="range"
			@update:model-value="handleUpdateInput"
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
				<div
					:class="inputClass"
				>
					<input
						:value="resolveInputValue(inputValue)"
						:disabled="disabled"
						:placeholder="placeholder"
						type="text"
						v-on="inputEvents"
						@click="togglePopover"
						@focus="isBeingFocused = true"
						@blur="isBeingFocused = false"
					>
					<div class="date-input__icon">
						<cds-icon
							height="20"
							width="20"
							name="calendar-outline"
						/>
					</div>
				</div>
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
import { DateTime } from 'luxon';
import { DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';
import { isEmpty } from 'lodash';
import CdsChevron from './Chevron.vue';
import CdsIcon from './Icon.vue';

const dateStringValidator = (value) => /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(value);

export default {
	components: {
		VDatePicker: DatePicker,
		CdsChevron,
		CdsIcon,
	},

	props: {
		/**
		* Prop utilizada como v-model. Deve ser uma string no formato `yyyy-MM-dd`
		* ou um objeto com as propriedades `start` e `end`, no mesmo formato.
		*/
		modelValue: {
			type: [String, Object],
			default: '',
			validator: (value) => value === '' || typeof value === 'object' || dateStringValidator(value),
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
		 * Controla o modo do input.
		 */
		range: {
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
		/**
		 * Controla a marcação do dia atual no calendário.
		 */
		showTodayDot: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			internalDate: DateTime.now(),
			isBeingFocused: false,
			inputControl: 0,
			attributes: [
				{
					dates: new Date(),
					dot: true,
				},
			],
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

			if (this.disabled) {
				return this.fluid
					? 'date-input--disabled date-input--fluid'
					: 'date-input--disabled';
			}

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
			if (this.range) {
				this.$emit(
					'update:modelValue',
					date.start && date.end
						? {
							start: DateTime.fromJSDate(date.start).toFormat('yyyy-MM-dd'),
							end: DateTime.fromJSDate(date.end).toFormat('yyyy-MM-dd'),
						}
						: ''
				);
				return;
			}
			/**
			* Evento emitido quando uma data é selecionada. Utilizado para implementar o v-model.
			* @event update:modelValue
			* @type {Event}
			*/
			this.$emit('update:modelValue', date ? DateTime.fromJSDate(date).toFormat('yyyy-MM-dd') : '');
		},

		resolveInternalDate() {
			if (!this.modelValue) {
				this.internalDate = this.range ? null : '';
				return;
			}

			if (this.range) {
				this.internalDate = dateStringValidator(this.modelValue.start) && dateStringValidator(this.modelValue.end)
					? {
						start: DateTime.fromFormat(this.modelValue.start, 'yyyy-MM-dd'),
						end: DateTime.fromFormat(this.modelValue.end, 'yyyy-MM-dd'),
					}
					: {
						start: DateTime.now(),
						end: DateTime.now(),
					}
				return;
			}

			this.internalDate = dateStringValidator(this.modelValue)
				? DateTime.fromFormat(this.modelValue, 'yyyy-MM-dd')
				: DateTime.now();
		},

		resolveInputValue(value) {
			if (typeof value !== 'object') {
				return value;
			}

			if ((!value.start && !value.end) || isEmpty(value)) {
				return null;
			}

			return `${value.start} a ${value.end}`;
		}
	},
};
</script>

<style lang="scss">
@import '../assets/sass/tokens.scss';

.date-input {
	display: flex;
	justify-content: space-between;
	outline: 1px solid $n-50;
	width: 266px;
	height: 40px;
	color: $n-600;
	border-radius: $border-radius-extra-small !important;
	cursor: pointer;

	input {
		border: none;
		outline: 0;
		height: 100%;
		width: 100%;
		padding: pl(3);
	}

	&__icon {
		display: grid;
		place-items: center;
		margin: mr(3);
	}

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

	&--disabled {
		@extend .date-input;
		background-color: $n-20 !important;
		pointer-events: none;
		border: none;
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
		display: flex;
		justify-content: space-between;
	}

	&__error-message {
		@include caption;
		color: $rc-600;
		margin: mt(1);
	}
}

.label {
	&__required-indicator {
		color: $rc-600;
	}

	&__content {
		margin: mb(1);
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
	line-height: 23px !important;
	background-color: transparent;
	font-size: 17px;
	text-transform: capitalize;
}

.vc-weeks {
	margin: mt(5);
}

.vc-header {
	.vc-arrow {
		border-radius: 10px;
	}
}

.vc-nav-title {
	@include body-1;
	font-weight: 800;
	background-color: transparent;
}

.vc-nav-arrow {
	border-radius: 10px;
}

.vc-nav-item {
	@include body-1;
	background-color: transparent;
	text-transform: capitalize;
	font-weight: 430;
}
</style>
