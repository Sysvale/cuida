# List

O componente List é utilizado para exibir uma listagem de itens com um título e um conteúdo, permitindo personalização através de slots.

## Quando usar

- Para exibir listas de itens com título e conteúdo de forma padronizada.
- Quando for necessário permitir a personalização da exibição dos itens através de slots.
- Para criar listagens interativas em aplicações web e mobile.

## Quando não usar

- Se a lista precisar ter uma estrutura altamente customizada e dinâmica, onde um componente mais flexível como um table ou grid seria mais adequado.
- Quando não há necessidade de interação ou personalização dos itens exibidos.

## Preview

<script setup>
import List from '@/components/List.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <List />
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
  <cds-list
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