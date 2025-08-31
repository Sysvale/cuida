# CheckboxGroup

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
<CdsCheckboxGroup
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="checkboxGroupClick = true"
/>
```

---

## Preview

<PreviewContainer
	:component="CdsCheckboxGroup"
	:events="cdsCheckboxGroupEvents"
/>

---

## Props

<APITable
	name="CheckboxGroup"
	section="props"
/>
<br />

## Eventos

<APITable
	name="CheckboxGroup"
	section="events"
/>
<br />

## Slots

<APITable
	name="CheckboxGroup"
	section="slots"
/>

<script setup>
import CdsCheckboxGroup from '@/components/CheckboxGroup.vue';

const cdsCheckboxGroupEvents = [
	'checkboxGroup-click'
];
</script>
