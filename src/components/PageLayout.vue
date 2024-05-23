<template>
	<div class="page-layout">
		<side-bar
			:variant="variant"
			:active-item="sideBarActiveItem"
			:light="light"
			:user-name="user.name ?? ''"
			:user-role="user.role ?? ''"
			:user-picture="user.picture ?? null"
			:collapsible="collapsibleSideBar"
			:items="sideBarItems"
			:logo-image="logos.default"
			:collapsed-logo-image="logos.collapsed"
			@sidebar-click="emit('sidebar-item-click', $event)"
			@logout="emit('sidebar-logout', $event)"
		/>

		<div class="page-layout__content">
			<secondary-navigation
				:light="light"
				:active-item="navigationActiveItem"
				:items="navigationItems"
				@item-click="emit('navigation-item-click', $event)"
			/>

			<page-container class="page-layout__container">
				<!-- @slot Slot usado para inserção de conteúdo do PageLayout. -->
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
	/**
	 * Define os itens da da barra lateral de navegação.
	 */
	sideBarItems: {
		type: Array,
		default: () => [],
	},
	/**
	 * Define os itens da da barra de navegação secundária.
	 */
	navigationItems: {
		type: Array,
		default: () => [],
	},
	/** Define as logos da barra lateral de navegação, collapsible é a logo
	 *  que aparecerá quando a sidebar estiver colapsada.
	 */
	logos: {
		type: Object,
		default: () => {},
	},
	/** Define o item ativo da sideBar */
	sideBarActiveItem: {
		type: Object,
		default: () => {},
	},
	/** Define o item ativo da navegação secundária */
	navigationActiveItem: {
		type: Object,
		default: () => {},
	},
});


const emit = defineEmits([
	/**
	* Evento emitido quando um dos itens da SideBar é clicado
	* @event sidebar-item-click
	* @type {Event}
	*/
	'sidebar-item-click',

	/**
	* Evento emitido quando o icone de logout da SideBar é clicado
	* @event sidebar-logout
	* @type {Event}
	*/
	'sidebar-logout',

	/**
	* Evento emitido quando o icone da SecondaryNavbar é clicado
	* @event navigation-item-click
	* @type {Event}
	*/
	'navigation-item-click'
]);
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
