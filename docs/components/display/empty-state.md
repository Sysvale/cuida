# EmptyState

EmptyStates são componentes utilizados em momentos instrutivos aos usuários.

## Quando usar

- For necessário instruir o usuário sobre o funcionamento de uma determinada página.
- Uma página ou componente não possuir conteúdo padrão a ser mostrado.
- Uma determinada ação resultar em erro.

## Quando não usar

- Utilizado como um loader.
- Utilizado apenas com título.

## Preview

<script setup>
import EmptyState from '@/components/EmptyState.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <EmptyState />
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
  <cds-emptystate
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