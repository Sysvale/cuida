# NavBar

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
<CdsNavBar
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="navBarClick = true"
/>
```

---

## Preview

<PreviewContainer
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

## Slots

<APITable
	name="NavBar"
	section="slots"
/>

<script setup>
import CdsNavBar from '@/components/NavBar.vue';

const cdsNavBarEvents = [
	'navBar-click'
];
</script>
