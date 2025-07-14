# Alert

Alerts são componentes utilizados para prover feedbacks contextuais e notificações em resposta a ações do usuário ou atividades do sistema.

## Quando usar

- For necessário mostrar informações contextuais.
- Para feedbacks urgentes.

## Quando não usar

- Não cubra outros elementos da interface com um Alert.
- For necessário mostrar informações de modo não intrusivo. Para esse caso, recomendamos o uso de b-toasts.
- For necessário mostrar informações contextuais extensas. Para esse caso, recomendamos o uso de AlertCard.

## Preview

<script setup>
import Alert from '@/components/Alert.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Alert />
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
  <cds-alert
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