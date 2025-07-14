# ActionsList

Actions lists são componentes usados para mostrar uma lista de ações em linha, podendo algumas delas serem ocultas.

## Quando usar

- Houver ações associadas a um item de uma lista ou linha de tabela.
- Houver várias ações possíveis em determinada situação, mas algumas delas puderem ser colapsadas.

## Quando não usar

- For necessário o uso de botões.
- For necessário construir componentes de navegação (Menu, navbar, etc).
- As ações listadas afetam toda a view ou mais que um conjunto de dados relacionados.

## Preview

<script setup>
import ActionsList from '@/components/ActionsList.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <ActionsList />
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
  <cds-actionslist
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