# Pagination

### Pagination são indicadores de status utilizados para tornar evidentes metadados importates.
---
<br>

## Quando usar:
- For necessário mostrar status associados com a lógica de negócio ou ações do usuário.
- O conteúdo a ser mostrado for *readonly*.
- For preciso categorizar algo.


<br>

## Quando não usar:
- O conteúdo que a Pagination representa puder ser setado ou removido pelo usuário.
- O click no componente precisar executar uma ação ou funcionalidade.

---

## Uso

```js
<CdsPagination
	v-model="page"
	per-page="12"
	total="60"
	variant="green"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsPagination"
	:events="cdsPaginationEvents"
/>

---

## Props

<APITable
	name="Pagination"
	section="props"
/>
<br>

## Eventos

<APITable
	name="Pagination"
	section="events"
/>
<br>

<script setup>
import { ref } from 'vue';
import CdsPagination from '@/components/Pagination.vue';

const cdsPaginationEvents = [
	'update:modelValue'
];

const args = ref({});
</script>
