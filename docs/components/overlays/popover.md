# Popover

Popovers são componentes flutuantes utilizados para exibir, sob interação, informações e ações relacionadas ao conteúdo da tela.

## Quando usar

- Para criar dropdowns;
- Para mostrar informações ou ações adicionais sobre determinado elemento da interface;

## Quando não usar

- Como um substituto para Tooltips, ou seja, tendo como conteúdo apenas pequenas porções de texto;
- Como um subistituto para modais;
- Para mostrar informações críticas para o sucesso de uma ação do usuário;

## Preview

<script setup>
import Popover from '@/components/Popover.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Popover />
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
  <cds-popover
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