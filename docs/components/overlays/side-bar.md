# SideBar

### SideBars são componentes utilizados para criar soluções de navegação e menus.
---
<br>

## Recomendamos o uso de SideBars quando:
- For necessário separar o conteúdo por páginas e navergar por elas.
- Não for o caso de utilizar soluções como sideBar, sidebars, cards ou links como navegação.

<br>

## Não recomendamos o uso de SideBars quando:
- Houver muitos itens a serem mostrados no menu.
- For necessário mostrar os links verticalmente.

<br>

### Obs.:
- No objeto de configuração são aceitas as propriedades `label`, `icon`, `type`, `route` e `items`;
- O `type` pode ser assumir 3 valores:
	- **route**, para rotas internas (é renderizado um `router-link` com elas);
	- **link** para elementos que não devem redirecionar para nenhnuma rota;
	- **external** para links que devem ser abertos em uma nova guia;

---

## Uso

```js
<CdsSideBar
	variant="green"
	:items
	:activeItem="items[4]"
	userName="Joana Mendes"
	userRole="Administradora"
	userPicture="https://thispersondoesnotexist.com/"
	:collapsible="true"
	:collapsibleState="false"
	logoImage="https://framerusercontent.com/images/Xdjpf9nazmZOoS2SUnbbkwsaFk.png"
	:light="false"
	:searchButton="false"
	:show-logout="false"
	@sidebar-click="logClick"
	@search-button-click="logSearchButtonClick"
	@collapse-click="logCollapseClick"
	@logout="logLogout"
>
	<template #logo>
		<img
			v-if="!args.light"
			src="https://framerusercontent.com/images/Xdjpf9nazmZOoS2SUnbbkwsaFk.png"
		>
		<img
			v-else
			src="https://framerusercontent.com/images/cF8DHaPnyhgullDGcpLnyXwGUp4.png"
		>
	</template>
</CdsSideBar>
```

---

## Preview

<PreviewBuilder
	:args
	component="CdsSideBar"
	:events="cdsSideBarEvents"
>
	<template #logo>
		<img
			v-if="!args.light"
			src="https://framerusercontent.com/images/Xdjpf9nazmZOoS2SUnbbkwsaFk.png"
		>
		<img
			v-else
			src="https://framerusercontent.com/images/cF8DHaPnyhgullDGcpLnyXwGUp4.png"
		>
	</template>
</PreviewBuilder>

---

## Props

<APITable
	name="CdsSideBar"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsSideBar"
	section="events"
/>
<br>

## Slots

<APITable
	name="CdsSideBar"
	section="slots"
/>

<script setup>
import { ref } from 'vue';
import CdsSideBar from '@/components/SideBar.vue';
import CdsIcon from '@/components/Icon.vue';
import CdsPopover from '@/components/Popover.vue';
import CdsAvatar from '@/components/Avatar.vue';
import CdsRichTooltip from '@/components/RichTooltip.vue';

const cdsSideBarEvents = [
	'search-button-click',
	'logout',
	'sidebar-click',
	'collapse-click',
	'profile-menu-option-click',
	'logo-click'
];

const items = [
	{
		label: 'Dashboard',
		icon: 'dashboard-outline',
		type: 'route',
		route: {
			path: '/dashboard',
			name: 'dashboard'
		},
	},
	{
		label: 'Atendimento',
		icon: 'clipboard-text-outline',
		type: 'route',
		route: {
			path: '/attendance',
			name: 'attendance'
		},
	},
	{
		label: 'Links',
		icon: 'link-outline',
		items: [
			{
				label: 'Painel (Tv)',
				route: {
					path: 'https://www.google.com',
					name: 'painel-tv',
				},
				type: 'external',
			},
			{
				label: 'Totem',
				route: {
					path: 'https://www.wikipedia.org/',
					name: 'totem',
				},
				type: 'external',
			},
		]
	},
	{
		label: 'Relatórios',
		icon: 'printer-outline',
		type: 'route',
		route: {
			path: '/reports',
			name: 'pagina2'
		},
	},
	{
		label: 'Configurações',
		icon: 'settings-outline',
		type: 'route',
		items: [
			{
				label: 'Painel (Tv)',
				route: {
					path: '/tv',
					name: 'tv'
				}
			},
			{
				label: 'Totem',
				route: {
					path: '/totem',
					name: 'totem',
				},
			},
			{
				label: 'Serviços',
				route: {
					path: '/services',
					name: 'serviços',
				},
			},
			{
				label: 'Categorias',
				route: {
					path: '/categories',
					name: 'categorias',
				}
			},
			{
				label: 'Prioridades',
				route: {
					path: '/priorities',
					name: 'prioridades',
				},
			},
		]
	},
	{
		label: 'Suporte',
		icon: 'lifebuoy-outline',
		type: 'link',
		route: {
			path: '/support',
			name: 'support',
		},
	},
];

const isLight = ref(false);

const args = ref({
	items,
	variant: 'green',
	activeItem: items[4],
	userName: 'Joana Mendes',
	userRole: 'Administradora',
	userPicture: 'https://thispersondoesnotexist.com/',
	collapsible: true,
	collapsibleState: false,
	logoImage: 'https://framerusercontent.com/images/Xdjpf9nazmZOoS2SUnbbkwsaFk.png',
	light: false,
	searchButton: false,
	showLogout: false,
});
</script>
