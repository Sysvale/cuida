<template>
	<span id="statusList">
		<div>
			<div
				v-for="(item) in items"
				:key="item.id"
			>
				<hr class="horizontal-divider" />
				<status-item
					@action-clicked="handleClick(item)"
					:variant="item.variant"
					:title="item.title"
					:subtitle="item.subtitle"
					:clickable-action="item.clickableAction"
					:action-text="item.actionText"
				/>
			</div>
		</div>
	</span>
</template>

<script>
import StatusItem from './StatusItem.vue';

export default {
	components: {
		StatusItem,
	},

	props: {
		/**
		* A lista de elementos a serem exibidos
		*/
		items: {
			type: Array,
			default: () => [],
			required: true,
		},
	},

	methods: {
		handleClick(item) {
			console.log(item);
		},
	},
};
</script>

<style lang="sass" scoped>
@import '../assets/sass/app.scss';

#statusList .horizontal-divider {
	border-top: 1px solid $gray-5;
}
</style>
