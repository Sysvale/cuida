# DateInput

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
<CdsDateInput
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="dateInputClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsDateInput"
	:events="cdsDateInputEvents"
/>

---

## Props

<APITable
	name="DateInput"
	section="props"
/>
<br />

## Eventos

<APITable
	name="DateInput"
	section="events"
/>
<br />

## Slots

<APITable
	name="DateInput"
	section="slots"
/>

<script setup>
import CdsDateInput from '@/components/DateInput.vue';

const cdsDateInputEvents = [
	'dateInput-click'
];
</script>
