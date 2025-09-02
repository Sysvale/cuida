# FloatingActionButton

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
<CdsFloatingActionButton
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="floatingActionButtonClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:component="CdsFloatingActionButton"
	:events="cdsFloatingActionButtonEvents"
/>

---

## Props

<APITable
	name="FloatingActionButton"
	section="props"
/>
<br />

## Eventos

<APITable
	name="FloatingActionButton"
	section="events"
/>
<br />

## Slots

<APITable
	name="FloatingActionButton"
	section="slots"
/>

<script setup>
import CdsFloatingActionButton from '@/components/FloatingActionButton.vue';

const cdsFloatingActionButtonEvents = [
	'floatingActionButton-click'
];
</script>
