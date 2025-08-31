# SideBar

Buttons são componentes clicáveis e que indicam ao usuário que ele pode realizar uma ação ao interagir com ele.

### Quando usar

- For necessário comunicar ao usuário que ele pode executar uma ação na interface,
  seja em dialogs, modais, formulários, cards, etc.

### Quando não usar

- Não utilize botões com apenas ícone. Para esses casos de uso recomenda-se utilizar o IconButton.
- Em redirecionamentos para páginas externas. Nesses casos utilize links.

---

## Uso

```js
<CdsSideBar
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="sideBarClick = true"
/>
```

---

## Preview

<PreviewContainer
	:component="CdsSideBar"
	:events="cdsSideBarEvents"
/>

---

## Props

<APITable
	name="SideBar"
	section="props"
/>
<br />

## Eventos

<APITable
	name="SideBar"
	section="events"
/>
<br />

## Slots

<APITable
	name="SideBar"
	section="slots"
/>

<script setup>
import CdsSideBar from '@/components/SideBar.vue';

const cdsSideBarEvents = [
	'sideBar-click'
];
</script>
