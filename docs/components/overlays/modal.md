# Modal

Modais são como dialogs personolizados, janelas que exibem um conteúdo adicional em uma camada acima da página atual, com uma sobreposição de superfície (overlay) cobrindo a página e tornando-a temporariamente inacessível.

## Quando usar

- For necessário notificar o usuário de algum processo;
- For necessário uma tomada de decisão para completar uma ação;
- Se deseja realizar ação dentro de uma página paralelo ao fluxo principal da mesma;

## Quando não usar

- For necessário exibir uma grande quantidade de informação ou fluxos complexos;
- For necessário ser usado em conjunto com outros modais e popovers (cascata).

## Preview

<script setup>
import Modal from '@/components/Modal.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Modal />
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
  <cds-modal
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