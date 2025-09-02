# TextArea

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
<CdsTextArea
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="textAreaClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:component="CdsTextArea"
	:events="cdsTextAreaEvents"
/>

---

## Props

<APITable
	name="TextArea"
	section="props"
/>
<br />

## Eventos

<APITable
	name="TextArea"
	section="events"
/>
<br />

## Slots

<APITable
	name="TextArea"
	section="slots"
/>

<script setup>
import CdsTextArea from '@/components/TextArea.vue';

const cdsTextAreaEvents = [
	'textArea-click'
];
</script>
