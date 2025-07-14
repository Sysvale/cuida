# LoadingIndicator

O LoadingIndicator é um componente utilizado para indicar o progresso do carregamento da página, proporcionando uma experiência de usuário mais fluida e informativa.

## Quando usar

- Em navegações entre páginas ou abas dentro de uma aplicação, onde o usuário precisa visualizar o progresso de carregamento de forma clara para saber que a transição está em andamento;
- Em aplicações onde o carregamento de conteúdo pode demorar, como em operações de rede ou carregamento de dados pesados.

## Quando não usar

- Para o carregamento de dados secundários ou ações que não afetam diretamente a navegação principal do usuário;
- Quando o usuário realiza interações que podem desencadear novos carregamentos, como o acionamento de um toggle switch. Nesses casos, considere o uso de alternativas como o **Skeleton** para mostrar o conteúdo sendo carregado ou o **Spinner** para indicar que uma ação está em andamento.

## Preview

<script setup>
import LoadingIndicator from '@/components/LoadingIndicator.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <LoadingIndicator />
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
  <cds-loadingindicator
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