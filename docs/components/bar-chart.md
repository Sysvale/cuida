# BarChart

Um componente de gráfico reutilizável para exibir dados visualmente.

## Quando usar

- Exibir dados em formatos visuais;
- É eficaz ao exibir muitas categorias;
- Visualizar tendências, proporções ou comparações em dados.

## Quando não usar

- Para informações simples que podem ser exibidas em um formato tabular ou em texto;
- Não é recomendado para comparação percentual ou partes de um todo.

## Preview

<script setup>
import BarChart from '@/components/BarChart.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <BarChart />
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
  <cds-barchart
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