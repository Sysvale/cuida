# PageHeader

PageHeader são componentes utilizados para adicionar título, subtítulo e ações em páginas.

## Quando usar

- Precisar colocar headers em páginas.
- Precisar adicionar botões de ação a nível de página.
- Precisar adicionar cards informativos no topo de páginas.

## Quando não usar

- Fora do topo de páginas.

## Preview

<script setup>
import PageHeader from '@/components/PageHeader.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <PageHeader />
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
  <cds-pageheader
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