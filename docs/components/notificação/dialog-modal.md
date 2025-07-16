# DialogModal

O DialogModal é um componente utilizado para interagir com o usuário em situações críticas ou informativas.

## Quando usar

- Quando for necessário obter a confirmação do usuário para ações que podem ter consequências significativas, como excluir um item;
- Quando ocorrer um erro no sistema e o usuário precisar ser notificado;
- Quando for necessário informar o usuário sobre algo importante, mas que não requer uma ação imediata.

## Quando não usar

- Quando as mensagens a serem passadas ao usuário forem triviais e não exijam a atenção imediata do usuário. Nestes casos, considere usar notificações ou alertas.

## Preview

<script setup>
import DialogModal from '@/components/DialogModal.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <DialogModal />
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
  <cds-dialogmodal
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