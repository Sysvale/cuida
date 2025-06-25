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
});

const emits = defineEmits(['click']);

/* REACTIVE DATA */
const internalDate = ref(props.selectedDate);
const internalMinDate = ref(props.minDate);
const internalMaxDate = ref(props.maxDate);

/* COMPUTED */
const maxMonth = computed(() => {
	if (!props.maxDate) return 12;
	return extractMonth(props.maxDate);
});

const minMonth = computed(() => {
	if (!props.minDate) return 1;
	return extractMonth(props.minDate);
});

const currentMonth = computed(() => {
	if (!internalDate.value) return 1;
	return extractMonth(internalDate.value);
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
function isMothDisabled(month) {
	if (props.minDate && (month + 1 < minMonth.value)) {
		return true;
	}

	if (props.maxDate && (month + 1 > maxMonth.value)) {
		return true;
	}

	return false;
}

function extractMonth(date) {
	let month = date.split('-')[1];
	return month < 9 ? month.replace('0', '') : month;
}

function monthSelectorClasses(index) {
	let classes = {
		[`month-selector__month--${props.variant}`]: true,
		'month-selector__month--disabled': isMothDisabled(index),
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
	if(isMothDisabled(index)) return;
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