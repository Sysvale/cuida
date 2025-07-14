# Tooltip

Tooltip são labels flutuantes não interativas usados para explicar um elemento ou recurso da interface. Podem ser acionados com hover.

## Quando usar

- O texto a ser exibido como label for conciso, com no máximo 4 palavras.
- Para exibir informações suplementares sobre uma feature ou elemento da interface.

## Quando não usar

- Para comunicar erros e status do sistema.
- Para mostrar informações críticas para a compreensão de uma feature ou elemento da interface.

## Preview

<script setup>
import Tooltip from '@/components/Tooltip.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Tooltip />
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
  <cds-tooltip
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