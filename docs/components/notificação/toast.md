# Toast

Toasts são componentes utilizados para prover feedback breve e notificações não intrusivas sobre o status de uma ação ou evento do sistema.

## Quando usar

- Para exibir mensagens de feedback temporárias (ex: "Item salvo com sucesso", "Erro ao processar solicitação").
- Para notificar o usuário sobre eventos do sistema que não exigem ação imediata (ex: "Arquivo processado com sucesso").
- Quando a informação a ser exibida é importante, mas não crítica a ponto de interromper o fluxo do usuário.

## Quando não usar

- Para mensagens críticas que exigem a atenção e confirmação imediata do usuário (considere usar `Alert` ou `DialogModal`).
- Quando a mensagem precisa permanecer visível indefinidamente até que o usuário a dispense manualmente (considere usar `Alert`).

## Preview

<script setup>
import Toast from '@/components/Toast.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Toast />
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
  <cds-toast
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