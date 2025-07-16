# ActionBar

ActionBars são barras de ferramentas que podem exibir ações e informações para o usuário.

## Quando usar

- Par agrupar ações que o usuário pode tomar sobre itens de uma lista ou tabela.
- Não houver espaço nos menus e em outros locais para exibir ações e informações.

## Quando não usar

- Para exibir os status do sistema.
- Em modo flutuante, a ActionBar ocultar permanentemente informações na tela.

## Preview

<script setup>
import ActionBar from '@/components/ActionBar.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <ActionBar />
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
  <cds-actionbar
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