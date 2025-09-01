# RadioButtonGroup

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
<CdsRadioButtonGroup
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="radioButtonGroupClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsRadioButtonGroup"
	:events="cdsRadioButtonGroupEvents"
/>

---

## Props

<APITable
	name="RadioButtonGroup"
	section="props"
/>
<br />

## Eventos

<APITable
	name="RadioButtonGroup"
	section="events"
/>
<br />

## Slots

<APITable
	name="RadioButtonGroup"
	section="slots"
/>

<script setup>
import CdsRadioButtonGroup from '@/components/RadioButtonGroup.vue';

const cdsRadioButtonGroupEvents = [
	'radioButtonGroup-click'
];
</script>
