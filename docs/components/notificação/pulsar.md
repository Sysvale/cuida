# Pulsar

Pulsars são componentes educativos utilizados para instruir os usuários sobre novidades na interface ou no produto.

## Quando usar

- Para atrair a atenção do usuário para uma nova feature ou área da interface de modo não intrusivo.

## Quando não usar

- Como único recurso de comunicação sobre mudança na interface ou no produto.
- Quando outro pulsar já estiver em uso na interface.

## Preview

<script setup>
import Pulsar from '@/components/Pulsar.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Pulsar />
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
  <cds-pulsar
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