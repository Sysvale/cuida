# PageLayout

### O PageLayout é uma coleção de componentes que permite a criação de telas padronizadas com navegação primária na vertical e navegação secundária na horizontal.
---
<br />

## Recomendamos o uso do PageLayout quando:
- Quando for necessário usar uma navegação primária disposta verticalmente. Para mais detalhes sobre como configurar a navegação primária dessa forma, consulte a documentação do componente Sidebar.
- Quando for necessário incluir uma navegação secundária que se dispõe horizontalmente na parte superior da tela.

<br />

## Não recomendamos o uso do PageLayout quando:
- Quando for necessário usar uma navegação primária disposta horizontalmente.

---

## Uso

```js
<CdsPageLayout
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="pageLayoutClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsPageLayout"
	:events="cdsPageLayoutEvents"
>
	<template #default>
		Conteúdo da página
	</template>
</PreviewBuilder>

---

## Props

<APITable
	name="PageLayout"
	section="props"
/>
<br />

## Eventos

<APITable
	name="PageLayout"
	section="events"
/>
<br />

## Slots

<APITable
	name="PageLayout"
	section="slots"
/>

<script setup>
import { ref } from 'vue';
import CdsPageLayout from '@/components/PageLayout.vue';

const cdsPageLayoutEvents = [
	'sidebar-item-click',
	'sidebar-logout',
	'popover-item-click',
	'navigation-item-click',
];

const sideBarItems = [
	{
		label: 'Início',
		icon: 'home-outline',
		type: 'route',
		route: {
			path: '/home',
			name: 'home'
		},
	},
	{
		label: 'Vigilância Sanitária',
		icon: 'shield-outline',
		type: 'route',
		route: {
			path: '/visa',
			name: 'visa'
		},
	},
	{
		label: 'Central de marcação',
		icon: 'calendar-outline',
		type: 'route',
		route: {
			path: '/regulation',
			name: 'regulation'
		},
	},
	{
		label: 'Cuidados médicos',
		icon: 'heart-rate-outline',
		type: 'route',
		route: {
			path: '/medical-care',
			name: 'medical-care'
		},
	}
];

const navigationItems = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		route: {
			name: 'dashboard',
		},
	},
	{
		key: 'home',
		label: 'Inicio',
		route: {
			name: 'home',
		},
	},
	{
		key: 'reports',
		label: 'Relatórios',
		subitems: [
			{
				key: 'productivity',
				label: 'Relatório de produtividade',
				route: {
					name: 'productivity',
				},
			},
			{
				key: 'time-sheet',
				label: 'Folha de ponto',
				route: {
					name: 'timesheet',
				},
			}
		],
	},
];

const logos = ref({
	default: 'https://framerusercontent.com/images/cF8DHaPnyhgullDGcpLnyXwGUp4.png',
	collapsed: 'https://i.imgur.com/aNrsz0h.png',
});

const user = ref({
	name: 'Joana Mendes',
	role: 'Administradora',
	picture: 'https://this-person-does-not-exist.com/img/avatar-gen83fa18cdcd216e7220794a23e76fe0dc.jpg',
});

const args = ref({
	sideBarItems,
	navigationItems,
	sideBarActiveItem: sideBarItems[2],
	navigationActiveItem: navigationItems[1],
	user,
	logos,
	variant: 'indigo',
	light: true,
});
</script>
