# Select

Selects permitem que o usuário escolha uma opção a partir de uma lista de itens.

## Quando usar

- O usuário tiver de escolher uma única opção em uma lista com diversos itens.

## Quando não usar

- A lista de opções possuir 3 itens ou menos. Nesses casos, recomendamos a utilização de radio buttons.
- O usuário precisar selecionar mais de um item da lista. Nesse caso, utilize <a href="https://sysvale.github.io/cuida/?path=/docs/componentes-forms-clusteredmultiselect--clustered-multiselect">ClusteredMultiselects</a>.

## Preview

<script setup>
import Select from '@/components/Select.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Select />
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
  <cds-select
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