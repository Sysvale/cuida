# ProgressBar

ProgressBars são componentes utilizados para indicar o status e progresso de algo aos usuários.

## Quando usar

- For necessário transmitir a ideia do progresso de algo.
- For necessário transmitir a ideia do status de algo.
- Se deseja chamar a atenção do usuário para uma informação específica de maneira gráfica.

## Quando não usar

- For necessário criar loaders.
- For necessária muita precisão ao mostrar os números ou progresso.
- For necessário criar steppers.

## Preview

<script setup>
import ProgressBar from '@/components/ProgressBar.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <ProgressBar />
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
  <cds-progressbar
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