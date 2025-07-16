# BottomSheet

BottomSheets são componentes que exibem conteúdo adicional em uma camada sobreposta na parte inferior da página atual, fornecendo acesso rápido a informações ou ações complementares sem interromper o fluxo principal da interface.

## Quando usar

- Para fornecer acesso rápido a opções ou controles adicionais sem obscurecer o conteúdo principal da página;
- Quando há necessidade de apresentar informações contextuais relevantes sem exigir uma mudança de contexto para o usuário;
- Para oferecer uma experiência de navegação fluida, permitindo que o usuário permaneça na mesma tela enquanto interage com o conteúdo adicional.

## Quando não usar

- Se o conteúdo ou as ações adicionais exigirem mais espaço do que a área disponível na parte inferior da tela.
- Quando a presença de um BottomSheet interferiria na experiência do usuário ou causaria confusão ao sobrepor-se a outros elementos essenciais da interface.
- Se houver necessidade de exibir uma quantidade significativa de informações ou fluxos complexos que não possam ser adequadamente contidos na parte inferior da tela.

## Preview

<script setup>
import BottomSheet from '@/components/BottomSheet.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <BottomSheet />
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
  <cds-bottomsheet
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