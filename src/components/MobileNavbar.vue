<template>
	<div class="mobile-navbar">
		<div class="mobile-navbar__items">
			<router-link
				v-for="(item, index) in items"
				:key="item"
				class="mobile-navbar__item-link"
				:to="routerPushTo(item)"
				@click="onItemClick(item, index)"
			>
				<div
					class="mobile-navbar__item"
					:class="{
						'mobile-navbar__item--active': activeItem?.label === item.label,
						[`mobile-navbar__item--active--${variant}`]: activeItem?.label === item.label,
					}"
				>
					<icon
						height="20"
						width="20"
						:name="item.icon"
					/>

					<div class="mobile-navbar__item-text">
						{{ item.label }}
					</div>
				</div>
			</router-link>

			<div
				:class="computedClass"
				:style="indicatorStyle"
			/>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Icon from '../components/Icon.vue';

const props = defineProps({
	/**
	 * Define os itens de menu da navbar.
	 */
	items: {
		type: Array,
		required: true,
		validator: (value) => {
			return value.length > 0 && value.lenght <= 5 && value.every(item => item.route.path && item.route.name);
		},
	},
	/**
	 * Define a variante de cor dos detalhes do componente. São 9 variantes implementadas: 'green', 'teal',
	 * 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'gray' e 'dark'.
	 */
	variant: {
		type: String,
		default: 'blue',
	},
});

const emits = defineEmits(['item-click']);

const activeItem = ref(props.items[0]);
const activeIndex = ref(0);

const indicatorStyle = computed(() => {
	const itemWidth = 100 / props.items.length;
	return {
		width: `${itemWidth}%`,
		transform: `translateX(${activeIndex.value * 100}%)`,
	};
});

const computedClass = computed(() => {
	let classString = '';

	switch (activeIndex.value) {
		case 0:
			classString += `mobile-navbar__indicator--first `;
			break;
		case props.items.length - 1:
			classString += `mobile-navbar__indicator--last `;
			break;
		default:
			classString += `mobile-navbar__indicator `;
			break;
	}

	return classString.concat(`mobile-navbar__indicator--${props.variant}`);
});

function routerPushTo(item) {
	if (item.route.name) {
		return { name: item.route.name };
	}

	return { path: item.route.path };
}

function onItemClick(item, index) {
	activeItem.value = item;
	activeIndex.value = index;
	emits('item-click', item);
}

</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.mobile-navbar {
	bottom: 0;
	left: 0;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: rgba(#fff, .85);
	backdrop-filter: blur(10px);
	box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.05);
	position: relative;

	&__items {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		position: relative;
	}

	&__item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: spacer(1);
		flex: 1;
		min-width: 0;
		height: 100%;
		padding: pYX(2, 1);
		position: relative;
		color: $n-600;
		z-index: 1;

		&--active {
			@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
				color: $shade-500;
			}
		}
	}

	&__item-link {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: spacer(1);
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	&__item-text {
		font-size: 9.5px;
		font-weight: $font-weight-semibold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: center;
		width: 100%;
	}

	&__indicator {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		transition: transform 0.3s ease;
		border-radius: 8px 8px 0 0;

		&--first {
			@extend .mobile-navbar__indicator;
			border-radius: 0 8px 0 0;
		}

		&--last {
			@extend .mobile-navbar__indicator;
			border-radius: 8px 0 0 0;
		}

		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			background-color: $shade-50;
			color: $shade-500;
		}

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 2px;
			background-color: currentColor;
		}
	}
}
</style>