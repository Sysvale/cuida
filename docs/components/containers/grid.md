# Grid

Gris são componentes que usam a API das grids CSS para prover estruturas de organização consistentes.

## Quando usar

- Para criar layouts responsivos e consistentes em toda a aplicação.
- Para alinhar elementos em linhas e colunas de forma uniforme.
- Na construção de Dashboards, Bento Grids, Galerias, etc.
- Em estruturas nas quais for necessário especificar a estrutura dos elementos de forma bidimensional, tanto em linhas quanto em colunas;

## Quando não usar

- Quando o design requer posicionamento absoluto ou fixo de elementos;
- Em componentes pequenos e auto-contidos que não necessitam de um sistema de grid;
- Em situações nas quais for necessário alinhar elementos apenas em uma das dimensões e não nas duas ao mesmo tempo. Para esses casos, utilize FlexBox.

## Preview

<script setup>
import Grid from '@/components/Grid.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Grid />
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
  <cds-grid
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