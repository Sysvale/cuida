# AlertCard

AlertCards são componentes utilizados para transmitir mensagens contextuais importantes e apresentar possíveis ações a serem tomadas em cima delas.

## Quando usar

- For necessário mostrar informações contextuais extensas.
- For necessário mostrar informações contextuais que requerem ações do usuário sobre elas.

## Quando não usar

- For necessário mostrar informações de maneira discreta ou que pode ser ocultada. Para esse caso, recomendamos o uso de b-toasts.
- For necessário mostrar informações contextuais curtas.

## Preview

<script setup>
import AlertCard from '@/components/AlertCard.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <AlertCard />
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
  <cds-alertcard
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