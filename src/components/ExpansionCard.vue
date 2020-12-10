<template>
	<div
		class="expansion-card__container"
		:class="expansionCardContainerStyle"
		@mouseover="!isExpanded ? toggleCardStyle('hover') : null"
		@mouseleave="!isExpanded ? toggleCardStyle() : null"
		@click.self="isHovering ? toggleCardStyle('expand') : null"
	>
		<div
			v-if="isHovering"
			class="expansion-card__expand-icon"
			@click="toggleCardStyle('expand')"
		>
			<b-icon-arrows-angle-expand />
		</div>
		<div
			v-if="isExpanded"
			class="expansion-card__contract-icon"
		>
			<b-icon-arrows-angle-contract
				@click="toggleCardStyle('contract')"
			/>
		</div>
		<!--  -->
	</div>
</template>

<script>
import {
	BIcon,
	BIconArrowsAngleExpand,
	BIconArrowsAngleContract
} from 'bootstrap-vue';

export default {
	props: {
		//
	},

	components: {
		BIcon,
		BIconArrowsAngleContract,
		BIconArrowsAngleExpand,
	},

	data() {
		return {
			isHovering: false,
			isExpanded: false,
		};
	},

	computed: {
		expansionCardContainerStyle() {
			let dynamicClass = '';

			if (this.isHovering) {
				dynamicClass = 'expansion-card__container--hover';	
			}
			if (this.isExpanded) {
				dynamicClass = 'expansion-card__container--expanded';	
			}

			return dynamicClass;
		}
	},

	methods: {
		toggleCardStyle(status) {
			this.isHovering = false;

			switch(status) {
			case 'hover':
				if (!this.isExpanded) {
					this.isHovering = true;
				}
				break;
			case 'expand':
			case 'contract':
				this.isExpanded = !this.isExpanded;
				this.$emit('expanded', this.isExpanded);
				break;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.expansion-card {
	display: flex;
	align-items: center;
	@include padding(onidirecional, 3);
	border-radius: 16px;

	&__container {
		@extend .expansion-card;
		border: 1px solid $cinza-3;
		min-height: 48px;

		&--hover {
			cursor: pointer;
		}

		&--expanded {
			// 
		}
	}

	&__expand-icon {
		display: flex;
		margin-left: auto;
		color: $cinza-5;
	}

	&__contract-icon {
		@extend .expansion-card__expand-icon;

		& .b-icon {
			cursor: pointer;
		}
	}
}
</style>
