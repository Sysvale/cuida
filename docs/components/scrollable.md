# Scrollable

Scrollable é um componente utilizado para o tornar o conteúdo envolvido "scrolável".

## Quando usar

- Se quer mostrar muito conteúdo em um espaço pequeno ou pré-definido.

## Quando não usar

- Houver pouco conteúdo.
- Já houver um outro scrollable.

## Preview

<script setup>
import Scrollable from '@/components/Scrollable.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Scrollable />
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
  <cds-scrollable
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