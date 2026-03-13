<template>
	<div class="scroll-indicator__container">
		<CdsGrid
			:cols="3"
			gap="5px"
			class="year-selector__grid"
			tabindex="0"
			@wheel.prevent="handleScroll"
		>
			<div
				v-for="year in yearSpan"
				:key="`next-${year}`"
				:class="yearSelectorClasses(year)"
				class="year-selector__year"
				@click="handleClick(year)"
			>
				{{ year }}
			</div>
		</CdsGrid>
		<div
			class="scroll-indicator"
			@mousedown.prevent="startDragScroll"
		>
			<div
				class="scroll-indicator__thumb"
				:style="{
					height: `${scrollThumbHeight}%`,
					top: `${scrollThumbPosition}%`
				}"
			/>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue';
import CdsGrid from '../Grid.vue';

defineOptions({ name: 'CdsYearSelectorGrid' });

const props = defineProps({
	variant: {
		type: String,
		default: 'green',
	},
	selectedDate: {
		type: String,
		default: '',
		required: false,
	},
	minDate: {
		type: String,
		default: '',
	},
	maxDate: {
		type: String,
		default: '',
	},
});

const emits = defineEmits(['click']);

/* REACTIVE DATA */
const todayYear = new Date().getFullYear();
const selectedYear = computed(() => {
	if (!props.selectedDate) return null;
	return parseInt(props.selectedDate.split('-')[0]);
});

const minYear = computed(() => {
	if (props.minDate) {
		return parseInt(props.minDate.split('-')[0]);
	}
	return todayYear - 120;
});
const maxYear = computed(() => {
	if (props.maxDate) {
		return parseInt(props.maxDate.split('-')[0]);
	}
	return todayYear + 50;
});
const initialYear = ref((selectedYear.value || todayYear) - 7);
const scrollThumbHeight = ref(33);
const isDragging = ref(false);
const startY = ref(0);
const initialScrollPosition = ref(0);

/* COMPUTED */
const yearSpan = computed(() => {
	const yearSpan = new Array(12).fill(0);
	return yearSpan.map((_,i) => initialYear.value + i);
});

const scrollThumbPosition = computed(() => {
	const range = maxYear.value - minYear.value;
	const currentProgress = (initialYear.value - minYear.value) / range;
	return currentProgress * (100 - scrollThumbHeight.value);
});

/* HOOKS */
onUnmounted(() => {
	window.removeEventListener('mousemove', handleDragScroll);
	window.removeEventListener('mouseup', stopDragScroll);
});

/* FUNCTIONS */
function handleScroll(event) {
	const delta = event.deltaY;

	if (delta > 0) {
		incrementYear();
	} else {
		decrementYear();
	}
}

function yearSelectorClasses(year) {
	let classes = {
		[`year-selector__year--${props.variant}`]: true,
		'year-selector__year--disabled':( year < minYear.value) || (year > maxYear.value),
		[`year-selector__year--selected--${props.variant}`]: year == selectedYear.value,
	}

	return classes;
}

function incrementYear() {
	if (initialYear.value + 11 < maxYear.value) {
		initialYear.value += 3;
	}
}

function decrementYear() {
	if (initialYear.value > minYear.value) {
		initialYear.value -= 3;
	}
}

function startDragScroll(event) {
	isDragging.value = true;
	startY.value = event.clientY;
	initialScrollPosition.value = initialYear.value;

	window.addEventListener('mousemove', handleDragScroll);
	window.addEventListener('mouseup', stopDragScroll);
}

function handleDragScroll(event) {
	if (!isDragging.value) return;

	const deltaY = event.clientY - startY.value;
	const dragSensitivity = 0.5;
	const yearChange = Math.round(deltaY * dragSensitivity);

	if (yearChange !== 0) {
		const newInitialYear = initialScrollPosition.value + (yearChange > 0 ? 3 : -3);

		if (newInitialYear >= minYear.value && newInitialYear + 11 <= maxYear.value) {
			initialYear.value = newInitialYear;
			startY.value = event.clientY;
			initialScrollPosition.value = initialYear.value;
		}
	}
}

function stopDragScroll() {
	isDragging.value = false;
	window.removeEventListener('mousemove', handleDragScroll);
	window.removeEventListener('mouseup', stopDragScroll);
}

function handleClick(year) {
	if(year > maxYear.value || year < minYear.value) return;
	emits('click', year);
}
</script>

<style lang="scss" scoped>
@use 'sass:color';
@use '../../assets/sass/tokens/index' as tokens;
@use'../../assets/sass/placeholders.scss';

.scroll-indicator {
	position: absolute;
	right: -4px;
	top: 0;
	bottom: 0;
	width: 6px;
	background-color: transparent;
	border-radius: 3px;
	opacity: 0.5;
	transition: opacity 0.3s ease;
	cursor: pointer;
	z-index: 1;

	&__container {
		position: relative;
		width: 100%;

		&:hover .scroll-indicator {
			opacity: 0.8;
		}

		&:hover .scroll-indicator__thumb {
			background-color: tokens.$n-200;
		}
	}

	&__thumb {
		position: absolute;
		right: 0;
		width: 6px;
		background-color: tokens.$n-100;
		border-radius: 3px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}
}

.year-selector {
	&__grid {
		width: 100%;
	}

	&__year {
		padding: 8px 16px;
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
			@extend .year-selector__year;

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

		&--active {
			color: tokens.$n-300;
			cursor: not-allowed;
			pointer-events: none;
		}

		&--selected {
			background-color: tokens.$bn-50;
			border-radius: tokens.$border-radius-lil;
			font-weight: bold;

			@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
				@extend .year-selector__year--selected;
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