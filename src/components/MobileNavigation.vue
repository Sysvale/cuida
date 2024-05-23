<template>
	<div class="mobile-navigation">
		<div class="mobile-navigation__header">
			<div class="mobile-navigation__logo">
				<slot name="main-logo">
					<img :src="mainLogo">
				</slot>
			</div>

			<div class="mobile-navigation__title">
				{{ title }}
			</div>

			<div class="mobile-navigation__menu-btn">
				<cds-icon
					name="menu-outline"
				/>
			</div>
		</div>

		<secondary-navigation
			:items="navigationItems"
			:light="light"
		/>
	</div>
</template>

<script setup>
import { defineProps } from 'vue';
import CdsIcon from './Icon.vue';
import SecondaryNavigation from './SecondaryNavigation.vue';

defineProps({
	title: {
		type: String,
		default: '',
	},

	light: {
		type: Boolean,
		default: false,
	},

	mainLogo: {
		type: String,
		default: '',
	},

	navigationItems: {
		type: Array,
		default: () => [],
	}
});
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.mobile-navigation {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 1000;
	background: $n-0;

	&__header {
		padding: pTRBL(2, 4, 3, 4);
	}

	&__logo {
		display: flex;
		justify-content: center;
		padding: py(4);
	}

	&__title {
		@include subheading-1;
		margin: mt(3);
	}

	&__menu-btn {
		position: absolute;
		top: spacer(6);
		left: spacer(4);
	}
}
</style>
