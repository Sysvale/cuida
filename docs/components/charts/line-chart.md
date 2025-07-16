# LineChart

Um componente de gráfico reutilizável para exibir dados visualmente.

## Quando usar

- Exibir dados em formatos visuais;
- Ideal para mostrar tendências ao longo do tempo;
- Comparação de múltiplas séries.

## Quando não usar

- Para informações simples que podem ser exibidas em um formato tabular ou em texto;
- Dados discretos sem sequência lógica;
- Grande quantidade de série de dados.

## Preview

<script setup>
import LineChart from '@/components/LineChart.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <LineChart />
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
  <cds-linechart
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