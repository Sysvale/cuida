# RadialBarChart

Um RadialBarChart é uma variação do BarChart plotado em um sistema de coordenadas polares, em vez de cartesiano.

## Quando usar

- Exibir dados com apelo gráfico;
- Comparar dados;

## Quando não usar

- Quando for necessária uma fidelidade elevada na exibição das informações, com o objetivo de realizar comparações precisas entre os dados;
- Quando os dados apresentarem categorias ou subcategorias;

---

## Preview

<script setup>
import RadialBarChart from '@/components/RadialBarChart.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <RadialBarChart />
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
  <cds-radialbarchart
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