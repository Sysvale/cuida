# FilterSelect

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
<CdsFilterSelect
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="filterSelectClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsFilterSelect"
	:events="cdsFilterSelectEvents"
/>

---

## Props

<APITable
	name="FilterSelect"
	section="props"
/>
<br />

## Eventos

<APITable
	name="FilterSelect"
	section="events"
/>
<br />

## Slots

<APITable
	name="FilterSelect"
	section="slots"
/>

<script setup>
import CdsFilterSelect from '@/components/FilterSelect.vue';

const cdsFilterSelectEvents = [
	'filterSelect-click'
];
</script>
