# DropdownButton

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
<CdsDropdownButton
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="dropdownButtonClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsDropdownButton"
	:events="cdsDropdownButtonEvents"
/>

---

## Props

<APITable
	name="DropdownButton"
	section="props"
/>
<br />

## Eventos

<APITable
	name="DropdownButton"
	section="events"
/>
<br />

## Slots

<APITable
	name="DropdownButton"
	section="slots"
/>

<script setup>
import CdsDropdownButton from '@/components/DropdownButton.vue';

const cdsDropdownButtonEvents = [
	'dropdownButton-click'
];
</script>
