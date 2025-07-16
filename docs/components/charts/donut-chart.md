# DonutChart

Um componente de gráfico reutilizável para exibir dados visualmente, de modo um pouco mais legível que o PieChart.

## Quando usar

- Exibir dados em formatos visuais;
- Visualizar tendências, proporções ou comparações em dados;
- Exibir proporções ou partes de um todo, onde cada fatia representa uma parcela do total;
- Funciona bem com categorias mutuamente exclusivas;

## Quando não usar

- Para informações simples que podem ser exibidas em um formato tabular ou em texto;
- Quando os dados apresentarem muitas categorias ou subcategorias;
- Não é apropriado para dados contínuos ou dados temporais.

---

## Preview

<script setup>
import DonutChart from '@/components/DonutChart.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <DonutChart />
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
  <cds-donutchart
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