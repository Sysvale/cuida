# ProgressCircular

ProgressCirculars são componentes que indicam o status/progresso de uma operação em andamento, em formato circular.

## Quando usar

- For necessário transmitir a ideia de progresso ou percentual de uma operação em andamento.
- For necessário transmitir a ideia de status de uma operação em andamento e que fração dela já foi concluída.
- For necessário chamar a atenção do usuário para uma informação específica de maneira gráfica.

## Preview

<script setup>
import ProgressCircular from '@/components/ProgressCircular.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <ProgressCircular />
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
  <cds-progresscircular
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