# Breadcrumb

Breadcrumbs são utilizados para indicar ao usuário o caminho percorrido entre as páginas de uma aplicação até se checar na página atual.

## Quando usar

- Quando houver dois ou mais níveis na hierarquia de páginas;
- Quando você precisar indicar ao usuário em que página ele está e como ele pode refazer os passos que o levaram à página atual;

## Quando não usar

- Em casos nos quais só houver uma página na estrutura de navegação.

## Preview

<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Breadcrumb />
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
  <cds-breadcrumb
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