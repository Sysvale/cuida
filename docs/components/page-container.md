# PageContainer

PageContainers são blocos básicos de estrutura no Cuida. Eles provêm padding e alinhamento de conteúdo.

## Quando usar

- PageContainers devem ser usados sempre na construção das páginas, com o conteúdo sendo colocado como slot no componente.

## Quando não usar

- Não devem ser usados PageContainers aninhados.

## Preview

<script setup>
import PageContainer from '@/components/PageContainer.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <PageContainer />
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
  <cds-pagecontainer
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