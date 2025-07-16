# Pagination

Pagination são indicadores de status utilizados para tornar evidentes metadados importates.

## Quando usar

- For necessário mostrar status associados com a lógica de negócio ou ações do usuário.
- O conteúdo a ser mostrado for *readonly*.
- For preciso categorizar algo.

## Quando não usar

- O conteúdo que a Pagination representa puder ser setado ou removido pelo usuário.
- O click no componente precisar executar uma ação ou funcionalidade.

## Preview

<script setup>
import Pagination from '@/components/Pagination.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Pagination />
</div>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `prop` | `string` | `''` | Description |

## Eventos

| Event | Description |
|-------|-------------|
| `event` | Event description |

## Uso

```vue
<template>
  <cds-pagination
    prop="value"
    @event="handleEvent"
  />
</template>

<script setup>
const handleEvent = () => {
  console.log('Event handled');
};
</script>
```

<style scoped>
.demo-container {
  padding: 20px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  margin: 16px 0;
}
</style>