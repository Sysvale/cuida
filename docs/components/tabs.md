# Tabs

Tabs são componentes utilizados para criar soluções de navegação internas.

## Quando usar

- For necessário separar o conteúdo por abas e navergar por elas.
- Não for o caso de utilizar soluções como navbars, sidebars, cards ou links como navegação.

## Quando não usar

- Houver muitos itens a serem mostrados como abas.
- Quando a ação de clique realizada pelo usuário o levar para outra página.

## Preview

<script setup>
import Tabs from '@/components/Tabs.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Tabs />
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
  <cds-tabs
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