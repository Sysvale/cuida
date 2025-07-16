# ToastContainer

O ToastContainer é um componente global utilizado para gerenciar e exibir múltiplos Toasts na aplicação.Ele controla a posição, o enfileiramento e a animação dos Toasts.

## Quando usar

- Para garantir que os Toasts não se sobreponham a outros elementos importantes da interface.
- Para exibir informações suplementares sobre uma feature ou elemento da interface.

## Quando não usar

- Para comunicar erros e status do sistema.
- Para mostrar informações críticas para a compreensão de uma feature ou elemento da interface.

## Preview

<script setup>
import ToastContainer from '@/components/ToastContainer.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <ToastContainer />
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
  <cds-toastcontainer
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