<template>
	<div
		ref="datePicker"
		class="date-input"
	>
		<CdsBaseInput
			v-if="mode === 'typing'"
			ref="baseInput"
			v-bind="props"
			v-model="internalValue"
			type="text"
			v-facade="'##/##/####'"
			:floating-label="floatingLabel || mobile"
			@blur="handleTypeUpdate"
			@keydown.enter.prevent="handleTypeUpdate"
		/>

		<CdsBaseInput
			v-if="mode !== 'typing'"
			ref="baseInput"
			v-bind="props"
			v-model="internalValue"
			type="date"
			:floating-label="floatingLabel || mobile"
			:readonly="props.range"
			@click="toggleDatePicker"
			@focus="emitFocus"
			@blur="handleBlur"
			@keydown="emitKeydown"
			@keydown.enter.prevent="applySelection"
		>
			<template #trailing-icon>
				<div class="date-input__icon">
					<CdsIcon
						height="20"
						width="20"
						name="calendar-outline"
					/>
				</div>
			</template>
		</CdsBaseInput>

		<Transition v-if="mode !== 'typing'" name="calendar-animation">
			<div
				v-show="isCalendarOpen"
				ref="calendar"
				:class="`date-input__calendar--${dropdownDirection}`"
				@mousedown.prevent="handleCalendarMouseDown"
			>
				<div class="calendar__header">
					<CdsFlexbox gap="0">
						<span
							:class="{
								'calendar__month-and-title--no-hover': range,
								'calendar__month-and-title': !range
							}"
							@click="toggleMonthPickerDisplay"
						>
							{{ currentMonth }}
						</span>
	
						<span
							:class="{
								'calendar__month-and-title--no-hover': range,
								'calendar__month-and-title': !range
							}"
							@click="toggleYearPickerDisplay"
						>
							{{ currenYear }}
						</span>
					</CdsFlexbox>

					<CdsFlexbox>
						<CdsIcon
							height="20"
							width="20"
							name="caret-up-outline"
							class="calendar__right-caret"
							:class="{ 'calendar__caret--disabled': !allowPreviousMonthNavigation }"
							@click="previousMonth"
						/>
	
						<CdsIcon
							height="20"
							width="20"
							name="caret-down-outline"
							class="calendar__left-caret"
							:class="{ 'calendar__caret--disabled': !allowNextMonthNavigation }"
							@click="nextMonth"
						/>
					</CdsFlexbox>
				</div>

				<CdsGrid
					v-if="!showMonthPicker && !showYearPicker"
					:cols="7"
					gap="5px"
					@mouseleave="handleCalendarMouseLeave"
				>
					<div
						v-for="day in weekDaysLetters"
						:key="day"
						class="calendar__week-day"
					>
						{{ day }}
					</div>
					<div
						v-for="emptyDay in emptyDays"
						:key="'empty-' + emptyDay"
						class="calendar__empty-day"
					/>
					<div
						v-for="day in daysInMonth"
						:key="day"
						:class="getDayClasses(day)"
						:disabled="isDateDisabled(day)"
						@click="selectDate(day)"
						@mouseenter="handleHover(day)"
					>
						{{ day }}
					</div>
				</CdsGrid>

				<MonthSelectorGrid
					v-show="!range && showMonthPicker"
					ref="monthPicker"
					:selected-date="model"
					:min-date="minDate"
					:max-date="maxDate"
					:variant="variant"
					@click="handleMonthSelection"
				/>

				<YearSelectorGrid
					v-show="!range && showYearPicker"
					ref="monthPicker"
					:selected-date="model"
					:min-date="minDate"
					:max-date="maxDate"
					:variant="variant"
					@click="handleYearSelection"
				/>
			</div>
		</Transition>
	</div>
</template>

<script setup>

defineOptions({ name: 'DateInput' });

import { ref, computed, watch, useTemplateRef } from 'vue';
import { DateTime } from 'luxon';
import CdsBaseInput from './BaseInput.vue';
import CdsIcon from './Icon.vue';
import CdsFlexbox from './Flexbox.vue';
import CdsGrid from './Grid.vue';
import { direction, dropdownTopPosition, dropdownBottomPosition } from '../utils/composables/useDropdownPosition.js';
import MonthSelectorGrid from './InternalComponents/MonthSelectorGrid.vue';
import YearSelectorGrid from './InternalComponents/YearSelectorGrid.vue';
import {
	nativeEvents,
	nativeEmits,
} from '../utils/composables/useComponentEmits.js';
import { useClickOutside } from '../utils/composables/useClickOutside.js';
import { facade } from 'vue-input-facade';
const vFacade = facade;

const WEEK_DAYS = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
const DATE_FORMATS = [
	'dd/MM/yyyy',
	'MM/dd/yyyy',
	'yyyy-MM-dd',
	'dd-MM-yyyy',
	'dd.MM.yyyy',
	'dd MMM yyyy',
	'MMM dd yyyy',
];

const model = defineModel('modelValue', {
	type: [String, Object],
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
	* A variante de cor. São 10 variantes:
	* @values 'green', 'teal', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'dark'
	*/
	variant: {
		type: String,
		default: 'green',
	},
	/**
	* Especifica o estado do TextInput. As opções são 'default', 'valid', 'loading' e 'invalid'.
	* @values default, valid, loading, invalid
	*/
	state: {
		type: String,
		default: 'default',
	},
	/**
	* Quando true, o usuário poderá selecionar um intervalo de datas.
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
	* Desabilita o input.
	*/
	disabled: {
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
	* <span className="deprecated-warning">[DEPRECATED]</span> Essa prop vai ser renomeada para prop `highlightToday` na v4. Controla a marcação do dia atual no calendário.
	*/
	showTodayDot: {
		type: Boolean,
		default: false,
	},
	/**
	* Controla a marcação do dia atual no calendário.
	*/
	highlightToday: {
		type: Boolean,
		default: false,
	},
	/**
	* Texto placeholder para o DateInput.
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
	* A data mínima selecionável no DateInput. Deve ser uma string no formato `yyyy-MM-dd`.
	*/
	minDate: {
		type: String,
		default: '',
	},
	/**
	* A data máxima selecionável no DateInput. Deve ser uma string no formato `yyyy-MM-dd`.
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
	* Especifica ícone do tooltip do TextInput.
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
		type: [String, null],
		default: null,
	},
	/**
	* Define o modo de interação com o DateInput. Quando definido como 'typing', o componente permite apenas
	* digitação. No modo 'picking', a data deve ser selecionada através do date picker, desabilitando a digitação direta.
	*/
	mode: {
		type: String,
		default: 'picking',
		validator: (value) => (['typing', 'picking']).includes(value),
	},
});

const emits = defineEmits({
	...nativeEvents
});

/* REACTIVE DATA */
const baseInputRef = useTemplateRef('baseInput');
const datePickerRef = useTemplateRef('datePicker');
const { emitClick, emitFocus, emitBlur, emitKeydown } = nativeEmits(emits);
const { clickedOutside, setTargetElement } = useClickOutside();
const isCalendarOpen = ref(false);
const currentDate = ref(DateTime.now().setLocale('pt-BR'));
const startDate = ref(null);
const endDate = ref(null);
const hoverDate = ref(null);
const isHoveringCalendar = ref(false);
const weekDaysLetters = ref(WEEK_DAYS);
const internalValue = ref('');
const isCalendarInteraction = ref(false);
const showMonthPicker = ref(false);
const showYearPicker = ref(false);
const dropdownDirection = ref('down');
const dateMask = ref(null);

/* COMPUTED */
const currentMonth = computed(() => {
	return currentDate.value.setLocale('pt-BR').toFormat('MMMM');
});

const currenYear = computed(() => {
	return currentDate.value.setLocale('pt-BR').toFormat('yyyy');
});

const emptyDays = computed(() => {
	const firstDayOfMonth = currentDate.value.startOf('month');
	return firstDayOfMonth.weekday - 1;
});

const daysInMonth = computed(() => {
	const days = [];
	const daysInCurrentMonth = currentDate.value.daysInMonth;

	for (let i = 1; i <= daysInCurrentMonth; i++) {
		days.push(i);
	}

	return days;
});

const minDateObj = computed(() => {
	if (!props.minDate) return null;
	return DateTime.fromFormat(props.minDate, 'yyyy-MM-dd');
});

const maxDateObj = computed(() => {
	if (!props.maxDate) return null;
	return DateTime.fromFormat(props.maxDate, 'yyyy-MM-dd');
});

const allowPreviousMonthNavigation = computed(() => {
	if (showMonthPicker.value || showYearPicker.value) return false;
	if (!minDateObj.value) return true;

	const previousMonth = currentDate.value.minus({ months: 1 });
	return previousMonth.startOf('month') >= minDateObj.value.startOf('month');
});

const allowNextMonthNavigation = computed(() => {
	if (showMonthPicker.value || showYearPicker.value) return false;
	if (!maxDateObj.value) return true;

	const nextMonth = currentDate.value.plus({ months: 1 });
	return nextMonth.startOf('month') <= maxDateObj.value.startOf('month');
});

const dateInputContainerWidth = computed(() => {
	return props.fluid ? '100%' : 'fit-content';
})

/* WATCHERS */
watch(model, (newValue) => {
	if (!newValue) {
		clearDates();
		currentDate.value = DateTime.now().setLocale('pt-BR');
		return;
	}

	const temporaryDate = DateTime.fromISO(newValue);

	if (!temporaryDate.isValid && (typeof newValue === 'string')) {
		clearDates();
		model.value = null;
		console.warn('Data informada é inválida');
		throw new Error('Invalid DateTime');
	}

	if (typeof newValue === 'string') {
		startDate.value = DateTime.fromISO(newValue);
		internalValue.value = startDate.value.toFormat('dd/MM/yyyy');
		currentDate.value = startDate.value.startOf('month');
	} else if (props.range && typeof newValue === 'object') {
		if (newValue.start) {
			startDate.value = DateTime.fromISO(newValue.start);
		}

		if (newValue.end) {
			endDate.value = DateTime.fromISO(newValue.end);
		}

		if (startDate.value && endDate.value) {
			internalValue.value = `De ${startDate.value.toFormat('dd/MM/yyyy')} a ${endDate.value.toFormat('dd/MM/yyyy')}`;
			currentDate.value = endDate.value.startOf('month');
		} else if (startDate.value) {
			currentDate.value = startDate.value.startOf('month');
		}
	}
}, { immediate: true });

watch(clickedOutside, (newValue) => {
	if (newValue && isCalendarOpen.value) {
		isCalendarOpen.value = false;
	}
});

watch(datePickerRef, (newValue) => {
	if (newValue) {
		setTargetElement(newValue);
	}
});

watch(() => props.range, () => {
	dateMask.value = props.range ? null : '##/##/####';
}, { immediate: true });

/* FUNCTIONS */
function isDateDisabled(day) {
	const dateToCheck = currentDate.value.set({ day });

	if (minDateObj.value && dateToCheck.startOf('day') < minDateObj.value) {
		return true;
	}

	if (maxDateObj.value && dateToCheck.startOf('day') > maxDateObj.value) {
		return true;
	}

	return false;
}

function isToday(day) {
	const today = DateTime.now();
	const dateToCheck = currentDate.value.set({ day });

	return dateToCheck.hasSame(today, 'day');
}

function toggleDatePicker() {
	if (props.disabled) {
		return;
	}

	isCalendarOpen.value = !isCalendarOpen.value;
	dropdownDirection.value = direction(datePickerRef, 340, (props.mobile || props.floatingLabel));

	if (isCalendarOpen.value) {
		if (props.range && endDate.value) {
			currentDate.value = endDate.value.startOf('month');
		} else if (startDate.value) {
			currentDate.value = startDate.value.startOf('month');
		}
	}

	emitClick();
}

function previousMonth() {
	if (allowPreviousMonthNavigation.value) {
		currentDate.value = currentDate.value.minus({ months: 1 });
	}
}

function nextMonth() {
	if (allowNextMonthNavigation.value) {
		currentDate.value = currentDate.value.plus({ months: 1 });
	}
}

function handleHover(day) {
	if (props.range && startDate.value && !endDate.value && !isDateDisabled(day)) {
		hoverDate.value = currentDate.value.set({ day });
		isHoveringCalendar.value = true;
	}
}

function handleCalendarMouseLeave() {
	isHoveringCalendar.value = false;
	hoverDate.value = null;
}

function getDayClasses(day) {
	const classes = [`calendar__day--${props.variant}`];
	const selectedDate = currentDate.value.set({ day });

	if (isToday(day) && (props.showTodayDot || props.highlightToday)) {
		classes.push(`today--${props.variant}`);
	}

	if (isDateDisabled(day)) {
		classes.push('disabled-day');
		return classes;
	}

	if (props.range) {
		const isStartDate = startDate.value && selectedDate.hasSame(startDate.value, 'day');
		const isEndDate = endDate.value && selectedDate.hasSame(endDate.value, 'day');

		if (isStartDate || isEndDate) {
			classes.push(`selected-day--${props.variant}`);
		} else if (startDate.value && endDate.value &&
				selectedDate > startDate.value &&
				selectedDate < endDate.value) {
			classes.push(`between-day--${props.variant}`);
		} else if (startDate.value && !endDate.value && hoverDate.value && isHoveringCalendar.value) {
			if ((hoverDate.value < startDate.value &&
				selectedDate < startDate.value &&
				selectedDate >= hoverDate.value) ||
				(hoverDate.value > startDate.value &&
				selectedDate > startDate.value &&
				selectedDate <= hoverDate.value)) {
				classes.push(`between-day--${props.variant}`);
			}
		}
	} else if (startDate.value && selectedDate.hasSame(startDate.value, 'day')) {
		classes.push(`selected-day--${props.variant}`);
	}

	return classes;
}

function selectDate(day) {
	if (isDateDisabled(day)) {
		return;
	}

	const selectedDate = currentDate.value.set({ day });

	if (props.range) {
		if (!startDate.value || (startDate.value && endDate.value)) {
			startDate.value = selectedDate;
			endDate.value = null;
		} else {
			if (selectedDate < startDate.value) {
				endDate.value = startDate.value;
				startDate.value = selectedDate;
			} else {
				endDate.value = selectedDate;
			}

			if (startDate.value && endDate.value) {
				updateRangeModel();
				isCalendarOpen.value = false;
			}
		}
	} else {
		startDate.value = selectedDate;
		model.value = startDate.value.toFormat('yyyy-MM-dd');
		internalValue.value = startDate.value.toFormat('dd/MM/yyyy');
		isCalendarOpen.value = false;
	}

	hoverDate.value = null;
}

function updateRangeModel() {
	if (!startDate.value || !endDate.value) return;

	model.value = {
		start: startDate.value.toFormat('yyyy-MM-dd'),
		end: endDate.value.toFormat('yyyy-MM-dd')
	};

	internalValue.value = `De ${startDate.value.toFormat('dd/MM/yyyy')} a ${endDate.value.toFormat('dd/MM/yyyy')}`;
}

function parseUserDate() {
	if (!internalValue.value) return null;

	if (props.range && internalValue.value.includes('a')) {
		const datePattern = /De\s+(\d{2}\/\d{2}\/\d{4})\s+a\s+(\d{2}\/\d{2}\/\d{4})/;
		const matches = internalValue.value.match(datePattern);

		if (matches && matches.length === 3) {
			const startStr = matches[1];
			const endStr = matches[2];

			const start = DateTime.fromFormat(startStr, 'dd/MM/yyyy');
			const end = DateTime.fromFormat(endStr, 'dd/MM/yyyy');

			if (start.isValid && end.isValid) {
				if (isDateInValidRange(start) && isDateInValidRange(end)) {
					return { start, end: end < start ? start : end };
				}
				return null;
			}
		}

		return parseRangeSplitByHyphen();
	} else {
		return parseSingleDate();
	}
}

function parseRangeSplitByHyphen() {
	const [startStr, endStr] = internalValue.value.split('-').map(d => d.trim());
	let parsedStart = null;
	let parsedEnd = null;

	for (const format of DATE_FORMATS) {
		const start = DateTime.fromFormat(startStr, format);
		if (start.isValid) {
			parsedStart = start;
			break;
		}
	}

	for (const format of DATE_FORMATS) {
		const end = DateTime.fromFormat(endStr, format);
		if (end.isValid) {
			parsedEnd = end;
			break;
		}
	}

	if (parsedStart && parsedEnd) {
		if (isDateInValidRange(parsedStart) && isDateInValidRange(parsedEnd)) {
			return {
				start: parsedStart > parsedEnd ? parsedEnd : parsedStart,
				end: parsedStart > parsedEnd ? parsedStart : parsedEnd
			};
		}
	}

	return null;
}

function parseSingleDate() {
	for (const format of DATE_FORMATS) {
		const date = DateTime.fromFormat(internalValue.value, format);
		if (date.isValid && isDateInValidRange(date)) {
			return date;
		}
	}

	const ISODate = DateTime.fromISO(internalValue.value);
	if (ISODate.isValid && isDateInValidRange(ISODate)) {
		return ISODate;
	}

	return null;
}

function isDateInValidRange(date) {
	if ((minDateObj.value && date < minDateObj.value) ||
		(maxDateObj.value && date > maxDateObj.value)) {
		return false;
	}
	return true;
}

function handleBlur() {
	if (isCalendarInteraction.value) {
		isCalendarInteraction.value = false;
		return;
	}

	const parsedResult = parseUserDate();

	if (parsedResult) {
		if (props.range && typeof parsedResult === 'object') {
			startDate.value = parsedResult.start;
			endDate.value = parsedResult.end;
			updateRangeModel();
			currentDate.value = endDate.value;
		} else {
			startDate.value = parsedResult;
			endDate.value = null;

			model.value = startDate.value.toFormat('yyyy-MM-dd');
			internalValue.value = startDate.value.toFormat('dd/MM/yyyy');
			currentDate.value = startDate.value;
		}
	} else if (internalValue.value) {
		console.warn('Formato de data não reconhecido');
	}

	emitBlur();
}

function handleCalendarMouseDown(event) {
	event.preventDefault();
	isCalendarInteraction.value = true;
}

function applySelection() {
	const parsedResult = parseUserDate();

	if (parsedResult) {
		if (props.range && typeof parsedResult === 'object') {
			startDate.value = parsedResult.start;
			endDate.value = parsedResult.end;
			updateRangeModel();
			currentDate.value = endDate.value;
		} else {
			startDate.value = parsedResult;
			endDate.value = null;

			model.value = startDate.value.toFormat('yyyy-MM-dd');
			internalValue.value = startDate.value.toFormat('dd/MM/yyyy');
			currentDate.value = startDate.value;
		}
	}

	isCalendarOpen.value = false;
}

function clearSelection() {
	startDate.value = null;
	endDate.value = null;
	internalValue.value = '';
	model.value = props.range ? { start: null, end: null } : null;
}

function clearDates() {
	startDate.value = null;
	endDate.value = null;
	internalValue.value = '';
}

function getDMYFormat() {
	if (props.range && startDate.value && endDate.value) {
		return {
			start: startDate.value.toFormat('dd/MM/yyyy'),
			end: endDate.value.toFormat('dd/MM/yyyy')
		};
	}

	return startDate.value?.toFormat('dd/MM/yyyy');
}

function toISO() {
	if (props.range && startDate.value && endDate.value) {
		return {
			start: startDate.value.toISO(),
			end: endDate.value.toISO()
		};
	}

	return startDate.value?.toISO();
}

function toString() {
	if (props.range && startDate.value && endDate.value) {
		return {
			start: startDate.value.toString(),
			end: endDate.value.toString()
		};
	}

	return startDate.value?.toString();
}

function toJSDate() {
	if (props.range && startDate.value && endDate.value) {
		return {
			start: startDate.value.toJSDate(),
			end: endDate.value.toJSDate()
		};
	}

	return startDate.value?.toJSDate();
}

function toDateTime() {
	if (props.range && startDate.value && endDate.value) {
		return {
			start: startDate.value,
			end: endDate.value
		};
	}

	return startDate.value;
}

function handleMonthSelection(selectedMonth) {
	internalValue.value = internalValue.value ? internalValue.value : DateTime.now().setLocale('pt-BR').toFormat('dd/MM/yyyy');
	showMonthPicker.value = !showMonthPicker.value;
	let [day, month, year] = internalValue.value.split('/');
	month = selectedMonth.index;
	let daysInMonth = DateTime.local(+year, +month).daysInMonth;

	day = daysInMonth < day ? daysInMonth : day;

	currentDate.value = DateTime.fromFormat(`${day}/${month}/${year}`, 'dd/MM/yyyy');
}

function handleYearSelection(selectedYear) {
	internalValue.value = internalValue.value ? internalValue.value : DateTime.now().setLocale('pt-BR').toFormat('dd/MM/yyyy');
	showYearPicker.value = !showYearPicker.value;
	let [day, month] = internalValue.value.split('/');

	currentDate.value = DateTime.fromFormat(`${day}/${month}/${selectedYear}`, 'dd/MM/yyyy');
}

function toggleMonthPickerDisplay() {
	if (props.range) return;
	showYearPicker.value = false;
	showMonthPicker.value = !showMonthPicker.value;
}

function toggleYearPickerDisplay() {
	if (props.range) return;
	showMonthPicker.value = false;
	showYearPicker.value = !showYearPicker.value;
}

function handleTypeUpdate() {
	if (!internalValue.value) {
		model.value = null;
		return;
	}

	const parsed = DateTime.fromFormat(internalValue.value, 'dd/MM/yyyy');

	if (!parsed.isValid) {
		clearDates();
		model.value = null;
		console.warn('Data informada é inválida');
		throw new Error('Invalid DateTime');
	}

	model.value = parsed.setLocale('pt-BR').toFormat('yyyy-MM-dd');
}

/* EXPOSE */
defineExpose({
	componentRef: baseInputRef.value?.componentRef,
	isFocused: baseInputRef.value?.isFocused,
	focus: () => baseInputRef.value?.focus(),
	blur: () => baseInputRef.value?.blur(),
	clear: () => baseInputRef.value?.clear(),
	select: () => baseInputRef.value?.select(),
	getDMYFormat,
	toISO,
	toString,
	toJSDate,
	toDateTime,
	clearSelection,
});
</script>

<style lang="scss" scoped>
@use 'sass:color';
@use '../assets/sass/tokens/index' as tokens;
@use'../assets/sass/placeholders.scss';

.date-input {
	position: relative;
	width: v-bind(dateInputContainerWidth);

	&__icon {
		color: tokens.$n-700;
		margin: tokens.mt(1);
	}

	&__calendar {
		position: absolute;
		background: tokens.$n-0;
		border: 1px solid tokens.$n-30;
		box-shadow: tokens.$shadow-md;
		border-radius: tokens.$border-radius-extra-small;
		padding: tokens.pa(3);
		width: 266px;
		z-index: 500;
		transition: all 0.2s ease;

		&--up {
			@extend .date-input__calendar;
			bottom: v-bind(dropdownBottomPosition);
		}
		
		&--down {
			@extend .date-input__calendar;
			top: v-bind(dropdownTopPosition);
		}
	}
}

.calendar {
	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16px;
		margin-top: 4px;
	}

	&__day {
		padding: 6px 6px;
		text-align: center;
		cursor: pointer;
		@include tokens.body-2;
		font-size: 14.5px;
		color: tokens.$n-800;

		transition: all 0.2s ease;
		border-radius: tokens.$border-radius-lil;
		z-index: 1;
		position: relative;
		@extend %user-select-none;

		@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			@extend .calendar__day;
			&:hover {
				background-color: $shade-200;
				color: $shade-600;
				transition: all 0.2s ease;
			}
		}
	}

	&__empty-day {
		padding: 8px 5px;
		text-align: center;
		cursor: default;
		@include tokens.body-2;
		color: tokens.$n-800;
		@extend %user-select-none;
	}

	&__week-day {
		padding: 8px 5px;
		text-align: center;
		font-size: 13.5px;
		font-weight: tokens.$font-weight-semibold;
		color: tokens.$n-700;
		@extend %user-select-none;
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
		@extend .calendar__caret;
		margin: tokens.ml(n1);
	}

	&__right-caret {
		@extend .calendar__caret;
		margin: tokens.mr(n1);
	}

	&__caret--disabled {
		color: tokens.$n-400;
		cursor: not-allowed;
		opacity: 0.5;
	}
}

.calendar-animation {
	&-enter-active {
		transition: opacity 0.2s ease, transform 0.2s ease;
	}

	&-leave-active {
		transition: opacity 0.25s ease, transform 0.28s ease;
	}
}

.calendar-animation-enter-from,
.calendar-animation-leave-to {
	opacity: 0;
	transform: translateY(-10px);
}

.disabled-day {
	color: tokens.$n-300 !important;
	cursor: not-allowed !important;
	pointer-events: none;
}

.disabled-day:hover {
	background: transparent !important;
}

.calendar-day:hover {
	background: tokens.$bn-50;
	border-radius: tokens.$border-radius-lil;
	transition: all 0.2s ease;
}

.today {
	position: relative;
	border-radius: tokens.$border-radius-lil;

	@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
		border: 1px solid $shade-300;
	}
}

.between-day {
	background-color: tokens.$bn-50;
	border-radius: tokens.$border-radius-lil;
	font-weight: bold;

	@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
		@extend .between-day;
		color: $shade-600;
		background-color: $shade-100;

		&:hover {
			background-color: $shade-200;
			transition: all 0.2s ease;
		}
	}
}

.selected-day {
	background-color: tokens.$bn-50;
	border-radius: tokens.$border-radius-lil;
	font-weight: bold;

	@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
		@extend .selected-day;
		color: $shade-50 !important;
		background-color: $base-color;

		&:hover {
			background-color: color.adjust($base-color, $lightness: -5%);
			transition: all 0.2s ease;
		}
	}
}
</style>
