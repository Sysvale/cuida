# NavBar

### NavBars são componentes utilizados para criar soluções de navegação e menus.
---
<br />

## Recomendamos o uso de NavBars quando:
- For necessário separar o conteúdo por páginas e navergar por elas.
- Não for o caso de utilizar soluções como tabs, sidebars, cards ou links como navegação.

<br />

## Não recomendamos o uso de NavBars quando:
- Houver muitos itens a serem mostrados no menu.
- For necessário mostrar os links verticalmente.

---

## Uso

```js
<CdsNavBar
	variant="green"
	:items
	:activeItem="items[1]"
	@navbar-click="logClick"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsNavBar"
	:events="cdsNavBarEvents"
/>

---

## Props

<APITable
	name="NavBar"
	section="props"
/>
<br />

## Eventos

<APITable
	name="NavBar"
	section="events"
/>
<br />

<script setup>
import { ref } from 'vue';
import CdsNavBar from '@/components/NavBar.vue';

const cdsNavBarEvents = [
	'navbar-click'
];

const items = [
	{
		label: 'Mapa de grupo de risco',
		route: {
			path: '/mapa',
			name: 'principal'
		},
	},
	{
		label: 'Liga Saudável',
		route: {
			path: '/liga-saudavel',
			name: 'pagina1'
		},
	},
	{
		label: 'Mapa de calor dos bairros',
		route: {
			path: '/mapa-de-calor',
			name: 'pagina2'
		},
	},
];

const args = ref({
	items,
	activeItem: items[1],
});
</script>
