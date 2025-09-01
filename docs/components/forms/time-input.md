# TimeInput

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
<CdsTimeInput
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="timeInputClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsTimeInput"
	:events="cdsTimeInputEvents"
/>

---

## Props

<APITable
	name="TimeInput"
	section="props"
/>
<br />

## Eventos

<APITable
	name="TimeInput"
	section="events"
/>
<br />

## Slots

<APITable
	name="TimeInput"
	section="slots"
/>

<script setup>
import CdsTimeInput from '@/components/TimeInput.vue';

const cdsTimeInputEvents = [
	'timeInput-click'
];
</script>
