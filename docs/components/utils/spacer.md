# Spacer

Componente auxiliar utilizado para adicionar paddings e margins seguindo o padrão de tokens do Cuida.

## Quando usar

- No caso de determinado componente ou elemento da interface precisar apenas de espaçamento (padding ou margin) como modificar de estilo.

## Quando não usar

- Nos casos em que determinado componente precisar de vários modificadores de estilo. Pra esses casos
utilize classes e nelas inclua paddings e margins com os tokens de espaçamento do Cuida.

## Preview

<script setup>
import Spacer from '@/components/Spacer.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Spacer />
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
  <cds-spacer
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