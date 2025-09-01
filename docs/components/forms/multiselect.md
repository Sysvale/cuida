# Multiselect

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
<CdsMultiselect
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="multiselectClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsMultiselect"
	:events="cdsMultiselectEvents"
/>

---

## Props

<APITable
	name="Multiselect"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Multiselect"
	section="events"
/>
<br />

## Slots

<APITable
	name="Multiselect"
	section="slots"
/>

<script setup>
import CdsMultiselect from '@/components/Multiselect.vue';

const cdsMultiselectEvents = [
	'multiselect-click'
];
</script>
