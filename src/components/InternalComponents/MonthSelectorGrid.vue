<template>
	<CdsGrid
		v-if="typeof internalDate === 'string'"
		:cols="3"
		gap="5px"
		class="month-selector__grid"
	>
		<div
			v-for="(month, index) in MONTHS"
			:key="month"
			class="month-selector__month"
			:class="monthSelectorClasses(index)"
			@click="handleClick(month, index)"
		>
			{{ month }}
		</div>
	</CdsGrid>
</template>

<script setup>
import CdsGrid from '../Grid.vue';
import { computed, ref, onMounted, watch } from 'vue';

defineOptions({ name: 'CdsMonthSelectorGrid' });

const MONTHS = ['jan', 'fev', 'mar', 'abr', 'maio', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

const props = defineProps({
	variant: {
		type: String,
		default: 'green',
	},
	minDate: {
		type: String,
		default: '',
	},
	maxDate: {
		type: String,
		default: '',
	},
	selectedDate: {
		type: String,
		default: '',
		required: false,
	},
	year: {
		type: Number,
		default: new Date().getFullYear(),
	},
});

const emits = defineEmits(['click']);

/* REACTIVE DATA */
const internalDate = ref(props.selectedDate);
const internalMinDate = ref(props.minDate);
const internalMaxDate = ref(props.maxDate);

/* COMPUTED */
const currentMonth = computed(() => {
	if (!internalDate.value) return 1;
	const month = internalDate.value.split('-')[1];
	return month ? parseInt(month) : 1;
});

/* WATCHERS */
watch(() => props.selectedDate, (newValue) => {
	internalDate.value = newValue;
});

watch(() => props.minDate, (newValue) => {
	internalMinDate.value = newValue;
}, {immediate: true});

watch(() => props.maxDate, (newValue) => {
	internalMaxDate.value = newValue;
}, {immediate: true});

/* HOOKS */
onMounted(() => {
	internalDate.value = !internalDate.value ? '' : internalDate.value;
});

/* FUNCTIONS */
function isMonthDisabled(monthIndex) {
	const month = monthIndex + 1;
	const year = props.year;

	if (props.minDate) {
		const [minYear, minMonth] = props.minDate.split('-').map(Number);
		if (year < minYear) return true;
		if (year === minYear && month < minMonth) return true;
	}

	if (props.maxDate) {
		const [maxYear, maxMonth] = props.maxDate.split('-').map(Number);
		if (year > maxYear) return true;
		if (year === maxYear && month > maxMonth) return true;
	}

	return false;
}


function monthSelectorClasses(index) {
	let classes = {
		[`month-selector__month--${props.variant}`]: true,
		'month-selector__month--disabled': isMonthDisabled(index),
		[`month-selector__month--selected--${props.variant}`]: (index + 1) == currentMonth.value,
	}

	return classes;
};

function payload(month, index) {
	return {
		month,
		index: index < 9 ? `0${index + 1}` : index + 1,
	}
}

function handleClick(month, index) {
	if(isMonthDisabled(index)) return;
	emits('click', payload(month, index));
}
</script>

<style lang="scss" scoped>
@use 'sass:color';
@use '../../assets/sass/tokens/index' as tokens;
@use'../../assets/sass/placeholders.scss';

.month-selector {
    &__grid {
        width: 100%;
    }

	&__month {
		padding: 8px 20px;
		text-align: center;
		cursor: pointer;
		@include tokens.body-1;
		color: tokens.$n-800;

		transition: all 0.2s ease;
		border-radius: tokens.$border-radius-lil;
		z-index: 1;
		position: relative;
		@extend %user-select-none;

        @include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
            @extend .month-selector__month;

            &:hover {
                background-color: $shade-200;
				color: $shade-600;
                transition: all 0.2s ease;
            }
        }

        &--disabled {
            color: tokens.$n-300;
            cursor: not-allowed;
            pointer-events: none;
        }

        &--selected {
            background-color: tokens.$bn-50;
            border-radius: tokens.$border-radius-lil;
            font-weight: bold;

            @include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
                @extend .month-selector__month--selected;
                color: $shade-50 !important;
                background-color: $base-color;

                &:hover {
                    background-color: color.adjust($base-color, $lightness: -5%);
                }
            }
        }
	}
}
</style>