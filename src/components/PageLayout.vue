<template>
	<div class="page-layout">
		<side-bar
			:variant="variant"
			:light="light"
			:user-name="user.name ?? ''"
			:user-role="user.role ?? ''"
			:user-picture="user.picture ?? null"
			:collapsible="collapsibleSideBar"
			:items="sideBarItems"
			:logo-image="logos.default"
			:collapsed-logo-image="logos.collapsed"
		/>

		<div class="page-layout__content">
			<secondary-navigation
				:light="light"
				:items="navigationItems"
				@item-click="emit('navigation-item-click', $event)"
			/>

			<page-container class="page-layout__container">
				<slot />
			</page-container>
		</div>
	</div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import SideBar from './SideBar.vue';
import SecondaryNavigation from './SecondaryNavigation.vue';
import PageContainer from './PageContainer.vue';

defineProps({
	/**
	 * A variante de cor. São 10 variantes implementadas: 'green', 'teal',
	 * 'blue', 'indigo', 'violet', 'pink', 'red', 'orange','amber' e 'white'.
	 * A variante só terá efeito quando o PageLayout estiver no modo light.
	 */
	variant: {
		type: String,
		default: 'green',
	},
	/**
	 * Ativa o modo light do PageLayout.
	*/
	light: {
		type: Boolean,
		default: false,
	},
	/**
	 * Define as informações referentes ao usuário. O objeto deve seguir a assinatura:
	 * { name: String, role: String, picture: String }
	*/
	user: {
		type: Object,
		default: () => {},
	},
	/**
	 * Define se a sidebar pode ser colapsada.
	*/
	collapsibleSideBar: {
		type: Boolean,
		default: false,
	},
	sideBarItems: {
		type: Array,
		default: () => [],
	},
	navigationItems: {
		type: Array,
		default: () => [],
	},
	logos: {
		type: Object,
		default: () => {},
	}
});

const emit = defineEmits(['sidebar-item-click', 'navigation-item-click']);
</script>

<style lang="scss" scoped>
.page-layout {
	display: flex;

	&__content {
		position: relative;
		flex-grow: 1;
	}

	&__container {
		max-height: calc(100vh - 54px);
		overflow-y: auto;
	}
}
</style>
