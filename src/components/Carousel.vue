<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="carousel-container">
		<div
			v-if="showArrows"
			class="carousel__arrow carousel__arrow--left"
			:class="{ 'carousel__arrow--dark': darkArrows }"
			@click="scrollToPrevious"
		>
			<icon
				name="arrow-left-outline"
				width="20"
				height="20"
			/>
		</div>

		<div
			ref="carousel"
			v-long-click="startDrag"
			class="carousel"
			@mousedown="startDrag"
			@mousemove="onDrag"
			@mouseup="stopDrag"
			@mouseleave="stopDrag"
			@touchmove="onDrag"
			@touchend="stopDrag"
		>
			<div
				v-for="(item, index) in items"
				:key="item"
				class="carousel__item"
				@click="handleClick(item)"
			>
				<!-- @slot Slot utilizado para renderização de cada item do carrossel. Os dados do escopo do slot podem ser acessados no formato a seguir: ```slot={ item, index }``` -->
				<slot
					:item="item"
					:index="index"
					name="default"
				/>
			</div>
		</div>

		<div
			v-if="showArrows"
			class="carousel__arrow carousel__arrow--right"
			:class="{ 'carousel__arrow--dark': darkArrows }"
			@click="scrollToNext"
		>
			<icon
				name="arrow-right-outline"
				width="20"
				height="20"
			/>
		</div>
	</div>
</template>

<script setup>
import { longClickDirective } from '@sysvale/vue3-long-click';
import useIsMobile from '../utils/composables/useIsMobile';
import { ref, computed } from 'vue';
import Icon from './Icon.vue';

const props = defineProps({
	/**
	 * Array de itens a serem exibidos no carousel.
	 */
	items: {
		type: Array,
		default: () => [],
	},
	/**
	 * Define a posição em que os itens serão alinhados quando for feita a ação de rolagem no carrossel.
	 */
	snapTo: {
		type: String,
		default: 'start',
		validator: (value) => ['start', 'center', 'end'].includes(value),
	},
	/**
	 * Define o espaçamento entre os itens do carrossel.
	 */
	gap: {
		type: Number,
		default: 0,
	},
	/**
	 * Controla a exibição das setas de rolagem.
	 */
	showArrows: {
		type: Boolean,
		default: false,
	},
	/**
	 * Define se a cor das setas de rolagem deve ser escura.
	 */
	darkArrows: {
		type: Boolean,
		default: false,
	},
	/**
	 * Define se os itens do carrossel devem ser clicáveis.
	 */
	clickable: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits([
	/**
		* Evento emitido quando algum item do carrossel é clicado.
		* @event item-click
		* @type {Event}
	*/
	'item-click',
]);

const { isMobile } = useIsMobile();
const vLongClick = longClickDirective({ delay: 1000, interval: 100 });
const carousel = ref(null);
let isDragging = false;
let startX, scrollLeft;

const resolvedSnap = computed(() => props.snapTo);
const resolvedGap = computed(() => `${props.gap * 4}px`);

function startDrag(event) {
	if (isMobile.value) {
		return;
	}

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

function scrollToNext() {
	const carouselElement = carousel.value;
	const itemWidth = carouselElement.querySelector('.carousel__item').offsetWidth + props.gap * 4;
	carouselElement.scrollBy({
		left: itemWidth,
		behavior: 'smooth',
	});
}

function scrollToPrevious() {
	const carouselElement = carousel.value;
	const itemWidth = carouselElement.querySelector('.carousel__item').offsetWidth + props.gap * 4;
	carouselElement.scrollBy({
		left: -itemWidth,
		behavior: 'smooth',
	});
}

function handleClick(item) {
	if (!props.clickable) {
		return;
	}

	emit('item-click', item);
}
</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.carousel-container {
	position: relative;
	width: 100%;
}

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

	&__arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 1000;
		background-color: tokens.$n-0;
		color: tokens.$n-700;
		border-radius: 1000px;
		width: 40px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: tokens.$shadow-md;
		cursor: pointer;

		&--left {
			left: 0;
			margin: tokens.ml(3);
		}

		&--right {
			right: 0;
			margin: tokens.mr(3);
		}

		&--dark {
			background-color: tokens.$n-800;
			opacity: 0.85;
			color: tokens.$n-10;
		}
	}

}

</style>