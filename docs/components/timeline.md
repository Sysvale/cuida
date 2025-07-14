# Timeline

Timelines são componentes utilizados para apresentar informações em ordem cronológica.

## Quando usar

- Se há um conjunto de informações que pode ser categorizado por data.

## Quando não usar

- Se precisa de um componente de stepper.
- A ordem das informações que você está apresentando é irrelevante.

## Preview

<script setup>
import Timeline from '@/components/Timeline.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Timeline />
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
  <cds-timeline
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