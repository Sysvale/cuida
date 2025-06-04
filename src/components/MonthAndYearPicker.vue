<template>
	<div
		ref="monthAndYearPicker"
		class="month-and-year-picker "
	>
		<CdsBaseInput
			ref="baseInput"
			v-bind="props"
			v-model="monthAndYear"
			type="text"
			:floating-label="floatingLabel || mobile"
			:readonly="true"
			@click="toggleDatePicker"
		>
			<template #trailing-icon>
				<div class="month-and-year-picker__icon">
					<cds-icon
						height="20"
						width="20"
						name="calendar-outline"
					/>
				</div>
			</template>
		</CdsBaseInput>

		<Transition name="month-and-year-picker-animation">
			<div
				v-show="showMonthPicker"
				ref="calendar"
				:class="`month-and-year-picker__dropdown--${dropdownDirection}`"
				@mousedown.prevent="handleCalendarMouseDown"
			>
				<div class="dropdown__header">
						<span
							class="dropdown__month-and-title--no-hover"
							@click="toggleYearPickerDisplay"
						>
							{{ currentYear }}
						</span>

					<CdsFlexbox>
						<CdsIcon
							height="20"
							width="20"
							name="caret-up-outline"
							class="dropdown__right-caret"
							:class="{ 'dropdown__caret--disabled': !allowPreviousYearNavigation() }"
							@click="previousYear"
						/>

						<CdsIcon
							height="20"
							width="20"
							name="caret-down-outline"
							class="dropdown__left-caret"
							:class="{ 'dropdown__caret--disabled': !allowNextYearNavigation() }"
							@click="nextYear"
						/>
					</CdsFlexbox>
				</div>

				<MonthSelectorGrid
					ref="monthPicker"
					:selected-date="model"
					:min-date="dynamicMinDate"
					:max-date="dynamicMaxDate"
					:variant="variant"
					@click="handleMonthSelection"
				/>
			</div>
		</Transition>
	</div>
</template>

<script setup>
import { ref, computed, watch, useTemplateRef } from 'vue';
import { DateTime } from 'luxon';
import CdsBaseInput from './BaseInput.vue';
import MonthSelectorGrid from './InternalComponents/MonthSelectorGrid.vue';
import CdsIcon from './Icon.vue';
import CdsFlexbox from './Flexbox.vue';
import { useClickOutside } from '../utils/composables/useClickOutside.js';
import { direction, dropdownTopPosition, dropdownBottomPosition } from '../utils/composables/useDropdownPosition.js';

const model = defineModel('modelValue', {
	type: String,
});

const props = defineProps({
	/**
	* Especifica a label do input.
	*/
	label: {
		type: String,
		default: 'Label',
	},
	/**
	* A variante da Badge. SÃ£o 9 variantes: 'turquoise', 'green', 'blue',
	* 'violet', 'pink', 'red', 'orange', 'amber' e 'gray'.
	*/
	variant: {
		type: String,
		default: 'green',
	},
	/**
	* Especifica o estado do Input. As opções são 'default', 'valid', 'loading' e 'invalid'.
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
	* Desabilita o input.
	*/
	disabled: {
		type: Boolean,
		default: false,
	},
	/**
	* Especifica se a largura do MonthAndYearPicker deve ser fluida.
	*/
	fluid: {
		type: Boolean,
		default: false,
	},
	/**
	* <span className="deprecated-warning">[DEPRECATED]</span> Essa prop vai ser substituída pela prop `floatingLabel` na v4. Define o tipo do input, se true será um input adaptado para o mobile
	*/
	mobile: {
		type: Boolean,
		default: false,
	},
	/**
	* Define o tipo do input, se true será um input adaptado para o mobile
	*/
	floatingLabel: {
		type: Boolean,
		default: false,
	},
	/**
	* Texto placeholder para o MonthAndYearPicker.
	*/
	placeholder: {
		type: String,
		default: 'Selecione uma data',
	},
	/**
	* Especifica a mensagem de erro, que será exibida caso o estado seja inválido
	*/
	errorMessage: {
		type: String,
		default: 'Valor inválido',
	},
	/**
	* A data mínima selecionável no MonthAndYearPicker. Deve ser uma string no formato `yyyy-MM-dd`.
	*/
	minDate: {
		type: String,
		default: '',
	},
	/**
	* A data máxima selecionável no MonthAndYearPicker. Deve ser uma string no formato `yyyy-MM-dd`.
	*/
	maxDate: {
		type: String,
		default: '',
	},
	/**
	* Define exibição e texto do tooltip do input
	*/
	tooltip: {
		type: String,
		default: null,
	},
	/**
	* Especifica ícone do tooltip do MonthAndYearPicker.
	*/
	tooltipIcon: {
		type: String,
		default: 'info-outline',
	},
	/**
	* Especifica mensagem de auxílio.
	*/
	supportingText: {
		type: [String, Array],
		default: '',
	},
	/**
	* Controla a exibição e o conteúdo do link de suporte exibido ao lado da label.
	*/
	supportLink: {
		type: String,
		default: null,
	},
	/**
	* Define a url a ser acessada no clique do link de suporte.
	*/
	supportLinkUrl: {
		type: String,
		default: 'https://cuida.framer.wiki/',
	},
});

const showMonthPicker = ref(false);
const dropdownDirection = ref('down');
const internalValue = ref(DateTime.now().setLocale('pt-BR'));
const { clickedOutside, setTargetElement } = useClickOutside();
const datePickerRef = useTemplateRef('monthAndYearPicker');

/* COMPUTED */
const currentYear = computed(() => {
	return internalValue.value.toFormat('yyyy');
});

const monthAndYear = computed(() => {
	return internalValue.value.toFormat('MMMM/yyyy');
});

const dynamicMinDate = computed(() => {
	let isTheSameYear = DateTime.fromFormat(props.minDate, 'yyyy-MM-dd').toFormat('yyyy') === currentYear.value;

	return isTheSameYear ? props.minDate : DateTime.fromFormat(`${currentYear.value}-01-01`, 'yyyy-MM-dd').setLocale('pt-BR').toFormat('yyyy-MM-dd');
});

const dynamicMaxDate = computed(() => {
	let isTheSameYear = DateTime.fromFormat(props.maxDate, 'yyyy-MM-dd').toFormat('yyyy') === currentYear.value;

	return isTheSameYear ? props.maxDate : DateTime.fromFormat(`${currentYear.value}-12-31`, 'yyyy-MM-dd').setLocale('pt-BR').toFormat('yyyy-MM-dd');
});

watch(clickedOutside, (newValue) => {
	if (newValue && showMonthPicker.value) {
		showMonthPicker.value = false;
	}
});

watch(datePickerRef, (newValue) => {
	if (newValue) {
		setTargetElement(newValue);
	}
});

function handleMonthSelection(selectedMonth) {
	internalValue.value = internalValue.value ? internalValue.value : DateTime.now().setLocale('pt-BR').toFormat('dd/MM/yyyy');
	showMonthPicker.value = !showMonthPicker.value;
	let [day, month, year] = internalValue.value.toFormat('dd/MM/yyyy').split('/');
	month = selectedMonth.index;

	internalValue.value = DateTime.fromObject({ year: year, month: month }).setLocale('pt-BR');

	model.value = internalValue.value.toFormat('yyyy-MM');
}

const minDateObj = computed(() => {
	if (!props.minDate) return null;
	return DateTime.fromFormat(props.minDate, 'yyyy-MM-dd');
});

const maxDateObj = computed(() => {
	if (!props.maxDate) return null;
	return DateTime.fromFormat(props.maxDate, 'yyyy-MM-dd');
});

function allowPreviousYearNavigation() {
	if (!minDateObj.value) return true;
	
	const previousYear = internalValue.value.minus({ year: 1 });
	return previousYear.startOf('year') >= minDateObj.value.startOf('year');
}

function allowNextYearNavigation() {
	if (!maxDateObj.value) return true;

	const nextYear = internalValue.value.plus({ year: 1 });
	return nextYear.startOf('year') <= maxDateObj.value.startOf('year');
}

function previousYear() {
	if (allowPreviousYearNavigation()) {
		internalValue.value = internalValue.value.minus({ year: 1 });
	}
}

function nextYear() {
	if (allowNextYearNavigation()) {
		internalValue.value = internalValue.value.plus({ year: 1 });
	}
}

function toggleDatePicker() {
	if (props.disabled) {
		return;
	}

	dropdownDirection.value = direction(datePickerRef, 340, (props.mobile || props.floatingLabel));
	showMonthPicker.value = !showMonthPicker.value;
}

</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;
@use'../assets/sass/placeholders.scss';

.month-and-year-picker {
	position: relative;
	width: v-bind(dateInputContainerWidth);

	&__icon {
		color: tokens.$n-700;
		margin: mt(1);
	}

	&__dropdown {
		position: absolute;
		background: tokens.$n-0;
		border: 1px solid tokens.$n-30;
		box-shadow: tokens.$shadow-md;
		border-radius: tokens.$border-radius-extra-small;
		padding: pa(3);
		width: 266px;
		z-index: 500;
		transition: all 0.2s ease;

		&--up {
			@extend .month-and-year-picker__dropdown;
			bottom: v-bind(dropdownBottomPosition);
		}

		&--down {
			@extend .month-and-year-picker__dropdown;
			top: v-bind(dropdownTopPosition);
		}
	}
}

.dropdown {
	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16px;
		margin-top: 4px;
	}

	&__month-and-title {
		font-weight: tokens.$font-weight-semibold;
		color: tokens.$n-700;
		font-size: 16px;
		padding: 4px;
		transition: all 0.2s ease;
		@extend %user-select-none;

		&:hover {
			background: tokens.$n-20;
			border-radius: tokens.$border-radius-lil;
			color: tokens.$n-900;
			transition: all 0.2s ease;
			cursor: pointer;
		}
	}

	&__month-and-title--no-hover {
		font-weight: tokens.$font-weight-semibold;
		color: tokens.$n-700;
		font-size: 16px;
		padding: 4px;
		transition: all 0.2s ease;
		@extend %user-select-none;
	}

	&__caret {
		cursor: pointer;
		color: tokens.$n-500;
		transition: color 0.2s ease;
		padding: 6px 6px;

		&:hover {
			color: tokens.$n-700;
			background: tokens.$bn-50;
			border-radius: tokens.$border-radius-lil;
			transition: all 0.2s ease;
			padding: 6px 6px;
		}
	}

	&__left-caret {
		@extend .dropdown__caret;
		margin: ml(n1);
	}

	&__right-caret {
		@extend .dropdown__caret;
		margin: mr(n1);
	}

	&__caret--disabled {
		color: tokens.$n-400;
		cursor: not-allowed;
		opacity: 0.5;
	}
}

.month-and-year-picker-animation {
	&-enter-active {
		transition: opacity 0.2s ease, transform 0.2s ease;
	}

	&-leave-active {
		transition: opacity 0.25s ease, transform 0.28s ease;
	}
}

.month-and-year-picker-animation-enter-from,
.month-and-year-picker-animation-leave-to {
	opacity: 0;
	transform: translateY(-10px);
}
</style>
