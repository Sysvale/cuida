# InteractionBlockingOverlay

O InteractionBlockingOverlay é um componente utilizado para bloquear a interação do usuário em situações onde o sistema não está preparado para o uso, como em telas ou módulos que não possuem responsividade adequada para dispositivos móveis ou no modo paisagem (landscape).

## Quando usar

- Quando uma tela ou módulo não possui uma versão responsiva para dispositivos móveis, garantindo que o usuário não interaja com elementos quebrados ou não funcionais.
- Quando um dispositivo móvel estiver em modo paisagem e o layout da aplicação não estiver adaptado para essa orientação.
- Em situações temporárias, onde uma funcionalidade ou conteúdo específico precisa ser desativado para manutenção ou atualização.

## Quando não usar

- Quando o sistema já oferece uma versão responsiva ou uma alternativa viável para a interação em dispositivos móveis.
- Em casos onde a aplicação pode ajustar automaticamente o layout sem necessidade de bloqueio.
- Se o bloqueio da interação pode causar frustração ao usuário, especialmente em funcionalidades essenciais ou em fluxos críticos.

## Preview

<script setup>
import InteractionBlockingOverlay from '@/components/InteractionBlockingOverlay.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <InteractionBlockingOverlay />
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
  <cds-interactionblockingoverlay
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