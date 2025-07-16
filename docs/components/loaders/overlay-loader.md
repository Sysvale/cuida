# OverlayLoader

OverlayLoader é utilizado para indicar o carregamento de componentes internos de páginas, como cards e gráficos.

## Quando usar

- Para indicar o carregamento de elementos de página que ainda não possuam skeleton implementado.

## Quando não usar

- Não utilize o OverlayLoader para carregamento de páginas. Nesses casos prefira o Spinner.
- Não utilize o OverlayLoader para indicar carregameto de componentes que possuam skeletons implementados

## Preview

<script setup>
import OverlayLoader from '@/components/OverlayLoader.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <OverlayLoader />
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
  <cds-overlayloader
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