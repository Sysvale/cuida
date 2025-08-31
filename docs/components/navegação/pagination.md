# Pagination

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
<CdsPagination
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="paginationClick = true"
/>
```

---

## Preview

<PreviewContainer
	:component="CdsPagination"
	:events="cdsPaginationEvents"
/>

---

## Props

<APITable
	name="Pagination"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Pagination"
	section="events"
/>
<br />

## Slots

<APITable
	name="Pagination"
	section="slots"
/>

<script setup>
import CdsPagination from '@/components/Pagination.vue';

const cdsPaginationEvents = [
	'pagination-click'
];
</script>
