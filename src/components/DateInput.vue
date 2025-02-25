<template>
	<div class="date-picker">
		<CdsBaseInput
			ref="baseInput"
			:value="formattedDate"
			type="text"
			v-bind="{...$attrs, ...props}"
			readonly
			placeholder="Selecione um range de datas"
			@click="toggleDatePicker"
			@change="emitChange"
			@focus="emitFocus"
			@blur="handleBlur"
			@keydown="emitKeydown"
		>
			<template #trailing-icon>
				<div class="date-input__icon">
					<cds-icon
						height="20"
						width="20"
						name="calendar-outline"
					/>
				</div>
			</template>
		</CdsBaseInput>

		<div
			v-if="isOpen"
			class="calendar"
		>
			<div class="calendar-header">
				<CdsIcon
					height="20"
					width="20"
					name="caret-left-outline"
					class="calendar-caret"
					@click="previousMonth"
				/>

				<span class="calendar-header__month">{{ currentMonthYear }}</span>

				<CdsIcon
					height="20"
					width="20"
					name="caret-right-outline"
					class="calendar-caret"
					@click="nextMonth"
				/>
			</div>
			<div class="calendar-grid">
				<div
					v-for="day in weekDaysLetters"
					:key="day"
					class="week-day"
				>
					{{ day }}
				</div>
				<div
					v-for="emptyDay in emptyDays"
					:key="'empty-' + emptyDay"
					class="calendar-day2"
				/>
				<div
					v-for="day in daysInMonth"
					:key="day"
					class="calendar-day"
					:class="computedSelectedDate(day)"
					@click="selectDate(day)"
				>
					{{ day }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch, useTemplateRef, nextTick } from 'vue';
import { DateTime } from 'luxon';
import CdsBaseInput from './BaseInput.vue';
import CdsIcon from './Icon.vue';
import {
	nativeEvents,
	nativeEmits,
} from '../utils/composables/useComponentEmits.js';

const model = defineModel('modelValue', {
	type: [String, Object],
});

const baseInputRef = useTemplateRef('baseInput');

const props = defineProps({
	/**
	* Especifica a label do input.
	*/
	label: {
		type: String,
		default: 'Label',
	},
	/**
	 * A variante da Badge. São 9 variantes: 'turquoise', 'green', 'blue',
	 * 'violet', 'pink', 'red', 'orange', 'amber' e 'gray'.
	 */
	variant: {
		type: String,
		default: 'gray',
	},
	/**
	* Exibe asterisco de obrigatório (obs.: não faz a validação)
	*/
	required: {
		type: Boolean,
		default: false,
	},
	/**
	* Controla o modo do input.
	*/
	range: {
		type: Boolean,
		default: false,
	},
	/**
	* Especifica se a largura do TextInput deve ser fluida.
	*/
	fluid: {
		type: Boolean,
		default: false,
		required: false,
	},
	/**
	* Desabilita o input.
	*/
	disabled: {
		type: Boolean,
		default: false,
	},
	/**
	* Especifica o estado do TextInput. As opções são 'default', 'valid', 'loading' e 'invalid'.
	*/
	state: {
		type: String,
		default: 'default',
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
	* <span className="deprecated-warning">[DEPRECATED]</span> Essa prop vai ser substituída pela `supportLink` na v4. Define texto do link do input (localizado à direita da label).
	*/
	linkText: {
		type: String,
		default: null,
	},
	/**
	* <span className="deprecated-warning">[DEPRECATED]</span> Essa prop vai ser substituída pela `supportLinkUrl` na v4. Define a url a ser acessada no clique do link (no caso do link ser exibido).
	*/
	linkUrl: {
		type: String,
		default: 'https://cuida.framer.wiki/',
	},
	/**
	* Controla a exibição e o conteúdo do link de suporte exibido ao lado da label.
	*/
	supportLink: {
		type: String,
		default: null,
	},
});

const emits = defineEmits({
	...nativeEvents
});

const isOpen = ref(false);
const currentDate = ref(DateTime.now().setLocale('pt-BR'));
const startDate = ref(null);
const endDate = ref(null);
const weekDaysLetters = ref(['S', 'T', 'Q', 'Q', 'S', 'S', 'D']);
const { emitClick, emitChange, emitFocus, emitBlur, emitKeydown } = nativeEmits(emits);

const formattedDate = computed(() => {
	if (props.range && startDate.value && endDate.value) {
		return `${startDate.value.toFormat('dd/MM/yyyy')} - ${endDate.value.toFormat('dd/MM/yyyy')}`;
	}
	if (startDate.value && typeof startDate.value.toFormat === 'function') {
		return startDate.value.toFormat('dd/MM/yyyy');
	}
  
	return '';
});

const currentMonthYear = computed(() => {
	return currentDate.value.toFormat('MMMM yyyy');
});

const daysInMonth = computed(() => {
	const days = [];
	const firstDay = currentDate.value.startOf('month');
	const lastDay = currentDate.value.endOf('month');

	for (let day = firstDay; day <= lastDay; day = day.plus({ days: 1 })) {
		days.push(day.day);
	}

	return days;
});

const emptyDays = computed(() => {
	const firstDayOfMonth = currentDate.value.startOf('month');
	const weekDay = firstDayOfMonth.weekday;
	return weekDay - 1;
});

watch(model, (newValue, oldValue) => {
	if (newValue === oldValue) {
		return;
	}

	if (typeof newValue === 'string' && newValue) {
		startDate.value = DateTime.fromISO(newValue);
	} else if (props.range && newValue && typeof newValue === 'object') {
		startDate.value = DateTime.fromISO(newValue.start);
		endDate.value = DateTime.fromISO(newValue.end);
	} else {
		startDate.value = null;
	}
});

function toggleDatePicker() {
	if (props.range && startDate.value && endDate.value) {
		isOpen.value = !isOpen.value;
	} else {
		isOpen.value = !isOpen.value;
	}
}

function previousMonth() {
	currentDate.value = currentDate.value.minus({ months: 1 });
}

function nextMonth() {
	currentDate.value = currentDate.value.plus({ months: 1 });
}

function selectDate(day) {
	const selectedDate = currentDate.value.set({ day });


	if (props.range) {
		if (!startDate.value || (startDate.value && endDate.value)) {
			startDate.value = selectedDate;
			endDate.value = null;
		} else if (selectedDate < startDate.value) {
			startDate.value = selectedDate;
		} else {
			endDate.value = selectedDate;
		}

		if (startDate.value && endDate.value) {
			model.value = {
				start: startDate.value.toFormat('yyyy-MM-dd'),
				end: endDate.value.toFormat('yyyy-MM-dd')
			};
			isOpen.value = false;
		}
	} else {
		startDate.value = selectedDate;
		endDate.value = null;
		isOpen.value = false;
		emitChange();
		model.value = startDate.value.toFormat('yyyy-MM-dd');
	}
}

function computedSelectedDate(day) {
	const selectedDate = currentDate.value.set({ day });

	if (props.range) {
		if (startDate.value && selectedDate.toFormat('dd/MM/yyyy') === startDate.value.toFormat('dd/MM/yyyy')) { 
			return `between-day--${props.variant}`;
		}
		else if (endDate.value && selectedDate.toFormat('dd/MM/yyyy') === endDate.value.toFormat('dd/MM/yyyy')) { 
			return `between-day--${props.variant}`;
		}
		else if (startDate.value &&
				endDate.value &&
				selectedDate > startDate.value &&
				selectedDate < endDate.value) {
			return `selected-day--${props.variant}`;
		}
		else {
			return '';
		}
	} else {
		if (!startDate.value) return false;
		return startDate.value && selectedDate.toFormat('dd/MM/yyyy') === startDate.value.toFormat('dd/MM/yyyy') ? `selected-day--${props.variant}` : '';
	}
}

function clearSelection() {
	startDate.value = null;
	endDate.value = null;
}

function applySelection() {
	isOpen.value = false;
}

function handleBlur() {
	emitBlur();

	nextTick(() => {
		// toggleDatePicker();
	});
}

/* EXPOSE */
defineExpose({
	componentRef: baseInputRef.value?.componentRef,
	isFocused: baseInputRef.value?.isFocused,
	focus: () => baseInputRef.value?.focus(),
	blur: () => baseInputRef.value?.blur(),
	clear: () => baseInputRef.value?.clear(),
	select: () => baseInputRef.value?.select(),
	getDMYFormat: () => startDate.value?.toFormat('dd/MM/yyyy'),
	toISO: () => startDate.value?.toISO(),
	toString: () => startDate.value?.toString(),
	toJSDate: () => startDate.value?.toJSDate(),
	toDateTime: () => startDate.value,
});
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.date-picker {
	position: relative;
}

.date-input__icon {
	color: $n-700;
	margin: mt(1);
}

.calendar {
	margin: mt(2);
	position: absolute;
	top: 100%;
	left: 0;
	background: $n-0;
	border: 1px solid $n-30;
	box-shadow: $shadow-md;
	border-radius: $border-radius-extra-small;
	padding: pa(3);
	min-height: 312px;
	width: 266px;
	animation: slide-down 0.2s ease-in-out;
}

@keyframes slide-down {
	0% {
		opacity: 0;
		transform: translateY(-10px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}

.calendar-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16px;
	margin-top: 4px;
}

.calendar-grid {
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	gap: 5px;
}

.calendar-day {
	padding: 6px 6px;
	text-align: center;
	cursor: pointer;
	@include body-2;
	font-size: 14.5px;
	color: $n-800;
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
}

.calendar-day2 {
	padding: 8px 5px;
	text-align: center;
	cursor: default;
	@include body-2;
	color: $n-800;
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
}

.calendar-day:hover {
	background: $bn-50;
	border-radius: $border-radius-lil;
}

.selected-day {
	background-color: $bn-50;
	border-radius: $border-radius-lil;
	font-weight: bold;

	@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
		@extend .selected-day;
		color: darken($shade-500, 4%);
		background-color: $shade-100;
	}
}

.between-day {
	background-color: $bn-50;
	border-radius: $border-radius-lil;
	font-weight: bold;

	@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
		@extend .selected-day;
		color: darken($shade-100, 4%);
		background-color: $base-color;
	}
}

.week-day {
	padding: 8px 5px;
	text-align: center;
	cursor: pointer;
	font-size: 13.5px;
	font-weight: $font-weight-semibold;
	color: $n-700;
}

.calendar-header__month {
	font-weight: $font-weight-semibold;
	color: $n-700;
	font-size: 16px;
}

.calendar-caret {
	cursor: pointer;
	color: $n-500;
}
</style>
