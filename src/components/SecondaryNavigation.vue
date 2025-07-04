<template>
	<div
		class="secondary-navigation"
		:class="`secondary-navigation--${resolveBackground}`"
	>
		<div class="secondary-navigation__container">
			<template
				v-for="item in items"
				:key="item.key"
			>
				<router-link
					v-if="!hasSubItems(item.key)"
					class="secondary-navigation__item"
					:class="isActiveItem(item.key) ? `secondary-navigation__item--active-${resolveBackground}` : ''"
					:to="resolveRoute(item)"
					@click="onClickItem(item)"
				>
					<div class="secondary-navigation__content">
						{{ item.label }}
					</div>
				</router-link>
				<div v-else>
					<div
						class="secondary-navigation__item"
						:class="isActiveItem(item.key) ? `secondary-navigation__item--active-${resolveBackground}` : ''"
						@click="onClickItem(item)"
						@mouseover="onHover(item.key)"
						@mouseleave="onHover(-1)"
					>
						<div class="secondary-navigation__content">
							{{ item.label }}
							<icon
								v-if="item.key !== hoveredItem"
								class="secondary-navigation__icon"
								name="caret-down-outline"
								height="16"
								width="16"
							/>
							<div
								v-else-if="item.key === hoveredItem"
							>
								<icon
									class="secondary-navigation__icon"
									height="16"
									width="16"
									name="caret-up-outline"
								/>
								<div
									class="secondary-navigation__dropdown"
									:class="`secondary-navigation__dropdown--${resolveBackground}`"
								>
									<router-link
										v-for="subitem in item.subitems"
										:key="subitem.key"
										:to="resolveRoute(subitem)"
										class="secondary-navigation__subitem"
										:class="{ 'secondary-navigation__subitem--active': isActiveSubItem(subitem.key) }"
										@click="onClickSubItem(subitem.key, item.key)"
									>
										{{ subitem.label }}
									</router-link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>
		</div>

		<div class="secondary-navigation__overflow-left" />
		<div class="secondary-navigation__overflow-right" />
	</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import Icon from './Icon.vue';

const props = defineProps({
	light: {
		type: Boolean,
		default: false,
	},

	activeItem: {
		type: Object,
		default: () => {},
	},

	items: {
		type: Array,
		default: () => [],
	},
});

const emit = defineEmits(['item-click']);

const internalActiveItem = ref(props.activeItem.key);
const activeSubItem = ref(null)
const hoveredItem = ref(0);

const resolveBackground = computed(() => {
	return (props.light) ? 'light' : 'dark';
});

watch(props.activeItem, (item) => {
	internalActiveItem.value = item.key;
});


const onHover = (itemKey) => {
	hoveredItem.value = itemKey;
}

const resolveRoute = (item) => {
	if (!item.route) {
		return null;
	}

	const { path, name } = item.route;

	return path instanceof String ? { path } : { name };
};

const onClickItem = (item) => {
	if (hasSubItems(item.key)) {
		return;
	}

	activeSubItem.value = null;
	internalActiveItem.value = item.key;

	emit('item-click', item.key);
}

const isActiveItem = (itemKey) => {
	return internalActiveItem.value === itemKey;
}

const hasSubItems = (key) => {
	return props.items.find((item) => (
		item.key === key && item?.subitems?.length > 0
	));
}

const onClickSubItem = (subItemKey, itemKey) => {
	activeSubItem.value = subItemKey;
	internalActiveItem.value = itemKey;

	emit('item-click', subItemKey);
}

const isActiveSubItem = (subItemKey) => {
	return activeSubItem.value === subItemKey;
}

</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.secondary-navigation {
	width: 100%;
	height:54px;
	box-shadow: tokens.$shadow-sm;
	display: flex;
	gap: tokens.spacer(5);
	align-items: center;
	top: 0;
	left: 0;
	z-index: tokens.$z-index-toolbar;

	&--light {
		background: tokens.$n-0;
		color: tokens.$n-700;
	}

	&--dark {
		background: tokens.$n-800;
		color: tokens.$n-0;
	}

	&__item {
		padding: tokens.pYX(2,3);
		height: 54px;
		cursor: pointer;
		@include tokens.body-2;
		display: flex;

		&--active-dark {
			text-shadow:0px 0px 1px tokens.$n-0;
		}

		&--active-light {
			text-shadow:0px 0px 1px tokens.$n-700;
		}
	}

	&__subitem {
		@include tokens.body-2;
		text-shadow:0px 0px 0px tokens.$n-0;

		&--active {
			@include tokens.body-2;
			font-weight: tokens.$font-weight-semibold;
		}
	}

	&__container {
		display: flex;
		padding: tokens.px(6);
	}

	&__content {
		gap: tokens.spacer(2);
		height: 20px;
		display: flex;
		align-self: center;
		position: relative;
	}

	&__icon {
		align-self: center;
	}

	&__dropdown {
		box-shadow: tokens.$shadow-md;
		border-radius: tokens.$border-radius-extra-small;
		margin: tokens.mt(5);
		padding: tokens.pa(5);
		min-width: 250px;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		gap: tokens.spacer(6);
		position:absolute;

		&--dark {
			background: tokens.$n-800;
		}

		&--light {
			background: tokens.$n-0;
		}
	}
}
</style>
