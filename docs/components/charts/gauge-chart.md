# GaugeChart

O Gauge Chart é indicado para mostrar o progresso em direção a uma meta específica.

## Quando usar

- Use "Gauge charts" quando precisar monitorar e comunicar de forma visual o status de métricas-chave ou indicadores de desempenho;
- Use "Gauge charts" para comunicar o estado geral de uma única métrica de maneira rápida e visualmente impactante.

## Quando não usar

- Evite o uso de "Gauge charts" para representar conjuntos de dados complexos ou multidimensionais. Esse tipo de gráfico é mais eficaz ao exibir uma única métrica em relação a uma escala.

## Preview

<script setup>
import GaugeChart from '@/components/GaugeChart.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <GaugeChart />
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
  <cds-gaugechart
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