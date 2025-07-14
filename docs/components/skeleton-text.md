# SkeletonText

Skeleton texts permitem exibir um estado de carregamento para vários tipos de componentes

## Quando usar

- Informar ao usuário que as informações do componentes estão sendo carregadas.
- O conteúdo a ser carregado for dinâmico.

## Quando não usar

- O conteúdo a ser carregado for estático.

## Preview

<script setup>
import SkeletonText from '@/components/SkeletonText.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <SkeletonText />
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
  <cds-skeletontext
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