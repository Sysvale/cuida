<template>
	<div class="mobile-navbar">
		<div class="mobile-navbar__items">
			<div
				v-for="index in 4"
				:key="index"
				class="mobile-navbar__item"
			>
				<icon
					height="20"
					width="20"
					name="home-outline"
					color="#48525c"
				/>

				<div class="mobile-navbar__item-text">
					Item {{ index }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import Icon from '../components/Icon.vue';

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
	background-color: rgba(#fff, .8);
	backdrop-filter: blur(10px);
	box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.05);

	&__items {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
	}

	&__item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: spacer(1);
		width: 100%;
		height: 100%;
		padding: pa(4);
		cursor: pointer;
	}

	&__item-text {
		@include overline;
		color: $n-600;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}
</style>
