# StackedBarChart

Um componente de gráfico reutilizável para exibir dados visualmente.

## Quando usar

- Exibir dados em formatos visuais;
- Comparação de dados como um todo;
- Tendências ao longo do tempo.

## Quando não usar

- Para informações simples que podem ser exibidas em um formato tabular ou em texto;
- Comparação absoluta;
- Muitas categorias.

## Preview

<script setup>
import StackedBarChart from '@/components/StackedBarChart.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <StackedBarChart />
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
  <cds-stackedbarchart
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