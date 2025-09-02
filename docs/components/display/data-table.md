# DataTable

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
<CdsDataTable
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="dataTableClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:component="CdsDataTable"
	:events="cdsDataTableEvents"
/>

---

## Props

<APITable
	name="DataTable"
	section="props"
/>
<br />

## Eventos

<APITable
	name="DataTable"
	section="events"
/>
<br />

## Slots

<APITable
	name="DataTable"
	section="slots"
/>

<script setup>
import CdsDataTable from '@/components/DataTable.vue';

const cdsDataTableEvents = [
	'dataTable-click'
];
</script>
