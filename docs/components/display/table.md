# Table

Tables são componentes utilizados para exibir e organizar conteúdo, facilitando a comparação e análise de informações.

## Quando usar

- Desejar comparar dados.
- For necessário exibir dados de forma tabulada.

## Quando não usar

- For necessário interagir/realizar uma ação com o conteúdo apresentado na tabela.

## Preview

<script setup>
import Table from '@/components/Table.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Table />
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
  <cds-table
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