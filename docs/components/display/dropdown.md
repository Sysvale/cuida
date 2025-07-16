# Dropdown

Dropdown são componentes utilizados para ativar popovers contendo filtros para listas e views.

## Quando usar

- Para utilizar com filtros.
- Houver popovers contendo opções de filtragem.

## Quando não usar

- Em substituição à um Multiselect ou Select.

## Preview

<script setup>
import Dropdown from '@/components/Dropdown.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Dropdown />
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
  <cds-dropdown
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