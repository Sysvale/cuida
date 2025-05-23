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
});

const emits = defineEmits(['click']);

/* REACTIVE DATA */
const currentYear = ref(new Date().getFullYear());
const minYear = currentYear.value - 120;
const maxYear = currentYear.value + 50;
const initialYear = ref(currentYear.value - 7);
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
	const range = maxYear - minYear;
	const currentProgress = (initialYear.value - minYear) / range;
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
		'year-selector__year--disabled':( year < minYear) || (year > maxYear),
		[`year-selector__year--selected--${props.variant}`]: year == currentYear.value,
	}

	return classes;
}

function incrementYear() {
	if (initialYear.value + 11 < maxYear) {
		initialYear.value += 3;
	}
}

function decrementYear() {
	if (initialYear.value > minYear) {
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

		if (newInitialYear >= minYear && newInitialYear + 11 <= maxYear) {
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
@import '../../assets/sass/tokens.scss';
@import '../../assets/sass/placeholders.scss';

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
			background-color: $n-200;
		}
	}

	&__thumb {
		position: absolute;
		right: 0;
		width: 6px;
		background-color: $n-100;
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
		@include body-1;
		color: $n-800;

		transition: all 0.2s ease;
		border-radius: $border-radius-lil;
		z-index: 1;
		position: relative;
		@extend %user-select-none;

		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			@extend .year-selector__year;

			&:hover {
				background-color: $shade-200;
				color: $shade-600;
				transition: all 0.2s ease;
			}
		}

		&--disabled {
			color: $n-300;
			cursor: not-allowed;
			pointer-events: none;
		}

		&--active {
			color: $n-300;
			cursor: not-allowed;
			pointer-events: none;
		}

		&--selected {
			background-color: $bn-50;
			border-radius: $border-radius-lil;
			font-weight: bold;

			@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
				@extend .year-selector__year--selected;
				color: $shade-50 !important;
				background-color: $base-color;

				&:hover {
					background-color: darken($base-color, 5%);
				}
			}
		}
	}
}
</style>