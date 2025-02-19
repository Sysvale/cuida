<template>
	<div
		ref="carousel"
		class="carousel"
		@mousedown="startDrag"
		@mousemove="onDrag"
		@mouseup="stopDrag"
		@mouseleave="stopDrag"
		@touchstart="startDrag"
		@touchmove="onDrag"
		@touchend="stopDrag"
	>
		<div
			v-for="(item, index) in items"
			:key="item"
			class="carousel__item"
		>
			<slot
				:item="item"
				:index="index"
				name="default"
			/>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
	items: {
		type: Array,
		default: () => [],
	},
	snapTo: {
		type: String,
		default: 'start',
		validator: (value) => ['start', 'center', 'end'].includes(value)
	},
	gap: {
		type: Number,
		default: 0,
	}
});

const carousel = ref(null);
let isDragging = false;
let startX, scrollLeft;

const resolvedSnap = computed(() => props.snapTo)
const resolvedGap = computed(() => {
	return `${props.gap * 4}px`;
});

function startDrag(event) {
	isDragging = true;
	startX = (event.pageX || event.touches[0].pageX) - carousel.value.offsetLeft;
	scrollLeft = carousel.value.scrollLeft;
	event.preventDefault();

	carousel.value.style.scrollSnapType = 'none';
}

function onDrag(event) {
	if (!isDragging) return;
	const x = (event.pageX || event.touches[0].pageX) - carousel.value.offsetLeft;
	const walk = (x - startX) * 1.5;
	carousel.value.scrollLeft = scrollLeft - walk;
}

function stopDrag() {
	isDragging = false;

	carousel.value.style.scrollSnapType = 'x mandatory';
	carousel.value.style.scrollBehavior = 'smooth';

	setTimeout(() => {
		carousel.value.style.scrollBehavior = 'auto';
	}, 300);
}
</script>

<style lang="scss" scoped>
.carousel {
	display: flex;
	overflow-x: auto;
	gap: v-bind(resolvedGap);
	scroll-snap-type: x mandatory;
	scrollbar-width: none;
	-ms-overflow-style: none;
	cursor: grab;
	transition: scroll-snap-type 0.3s ease;

	&::-webkit-scrollbar {
		display: none;
	}

	&:active {
		cursor: grabbing;
	}

	&__item {
		flex: none;
		scroll-snap-align: v-bind(resolvedSnap);
	}
}

</style>
