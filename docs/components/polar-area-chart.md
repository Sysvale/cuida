# PolarAreaChart

Um componente de gráfico reutilizável para exibir dados visualmente.

## Quando usar

- Exibir dados em formatos visuais;
- Visualizar tendências ao longo de variáveis contínuas, como direções ou graus.

## Quando não usar

- Para informações simples que podem ser exibidas em um formato tabular ou em texto;
- Quando os dados apresentarem ênfase na comparação númerica de quantidades;
- Não recomendado para representar séries temporais ou dados discretos.

## Preview

<script setup>
import PolarAreaChart from '@/components/PolarAreaChart.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <PolarAreaChart />
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
  <cds-polarareachart
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