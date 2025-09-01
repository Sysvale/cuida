# MobileNavigation

### O MobileNavigation é uma barra lateral que proporciona acesso rápido e fácil às principais seções da aplicação no ambiente mobile.
---
<br />

## Quando usar:
- Quando for necessária uma navegação na versão mobile da aplicação;
- Quando for necessário facilitar o acesso a diferentes seções do aplicativo, garantindo que o usuário possa navegar facilmente entre as páginas sem se perder;
- Quando o espaço vertical for limitado, aproveitando ao máximo a largura da tela do dispositivo móvel.

<br />

## Quando não usar:
- Quando em ambiente desktop, onde uma barra de navegação superior ou lateral pode ser mais adequada;
- Quando em telas que requerem espaço horizontal significativo, pois o menu pode sobrepor ou obstruir o conteúdo principal.


---

## Uso

```js
<CdsMobileNavigation
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="mobileNavigationClick = true"
/>
```

---

## Preview

<PreviewContainer
	:component="CdsMobileNavigation"
	:events="cdsMobileNavigationEvents"
	light="true"
	:items
	:user
	:activeItem="items[1]"
	:sticky="false"
/>

---

## Props

<APITable
	name="MobileNavigation"
	section="props"
/>
<br />

## Eventos

<APITable
	name="MobileNavigation"
	section="events"
/>
<br />

## Slots

<APITable
	name="MobileNavigation"
	section="slots"
/>

<script setup>
import { ref } from 'vue';
import CdsMobileNavigation from '@/components/MobileNavigation.vue';

const cdsMobileNavigationEvents = [
	'logout',
	'item-click',
	'profile-click',
];

const items = ref([
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
		label: 'Vigilância sanitária',
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
			name: 'medical-care',
		},
	},
]);

const user = ref({
	name: 'Joana Mendes',
	role: 'Administradora',
});
</script>
