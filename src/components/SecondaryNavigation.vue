<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="secondary-navigation">
		<div class="secondary-navigation__container">
			<div
				v-for="(item, index) in items"
				:key="index"
				class="secondary-navigation__item"
				:class="{ 'secondary-navigation__item--active': isActive(index) }"
				@click="onClick(index)"
				@mouseover="onHover(index)"
			>
				<div class="secondary-navigation__content">
					{{ item.label }}
					<icon
						v-if="hasSubItems(index)"
						class="secondary-navigation__icon"
						height="16"
						width="16"
						name="caret-down-outline"
					/>
					<div
						v-if="hasSubItems(index) && index === hoveredItem"
						class="secondary-navigation__dropdown"
						@mouseout="onHover(-1)"
					>
						<div
							v-for="subitem in item.subitems"
							id="`subitem-${index}`"
							:key="subitem.key"
						>
							{{ subitem.label }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import Icon from './Icon.vue';

const items = [
	{
		label: 'Item 1',
		key: 'item-1',
	},
	{
		label: 'Item 2',
		key: 'item-2',
		subitems: [
			{
				label: 'Item 2.1',
				key: 'item-2.1',
			},
			{
				label: 'Item 2.2',
				key: 'item-2.2',
			}
		]
	},
	{
		label: 'Item 3',
		key: 'item-4',
	},
	{
		label: 'Item 4',
		key: 'item-4',
		subitems: [
			{
				label: 'Item 4.1',
				key: 'item-4.1',

			},
			{
				label: 'Item 4.2',
				key: 'item-4.2',
			},
			{
				label: 'Item 4.3',
				key: 'item-4.3',
			},
		]
	},
];
const activeItem = ref(0);
const hoveredItem = ref(0);

const onClick = (index) => {
	activeItem.value = index;

	if (hasSubItems(index)) {
		return;
	}

}

const isActive = (index) => {
	return activeItem.value === index;
}

const hasSubItems = (index) => {
	return items[index]?.subitems?.length > 0;
}

const onHover = (index) => {
	console.log('hover', index);
	hoveredItem.value = index;
}

</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.secondary-navigation {
	background: $n-800;
	width: 100%;
	height:54px;
	box-shadow: $shadow-sm;
	display: flex;
	gap: spacer(5);
	align-items: center;

	&__item {
		padding: pYX(2,3);
		height: 100%;
		color: $n-100;
		cursor: pointer;
		color: $n-0;
		@include body-2;

		&--active {
			@include body-2;
			font-weight: $font-weight-bold;
		}
	}

	&__container {
		display: flex;
		padding: px(6);
	}

	&__content {
		gap: spacer(2);
		display: flex;
		align-items: center;
		position: relative;
	}

	&__icon {
		align-self: end;
	}

	&__dropdown {
		background: $n-800;
		box-shadow: $shadow-md;
		border-radius: $border-radius-extra-small;
		margin: mt(5);
		padding: pa(5);
		min-width: 150px;
		top: 0;
		display: flex;
		flex-direction: column;
		gap: spacer(6);
		position:absolute;
	}

}

</style>
