# CalloutCard

## Quando usar

- For necessário mostrar atalhos, dicas ou tutoriais de uma forma não intrusiva e visualmente marcante.

## Quando não usar

- For necessário mostrar mensagens relacionadas a mudanças ou condições especiais que ocorrem em um componente ou página. Para estes casos, recomenda-se o uso do Alert.

## Preview

<script setup>
import CalloutCard from '@/components/CalloutCard.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <CalloutCard />
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
  <cds-calloutcard
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