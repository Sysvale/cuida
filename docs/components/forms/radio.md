# Radio

O Radio permite que os usuários selecionem uma opção de um conjunto.

## Quando usar

- As opções que o componente busca prover são mutuamente exclusivas.

## Quando não usar

- Duas ou mais opções puderem ser selecionadas ao mesmo tempo.
- Houver 4 ou mais opções. Você pode usar o componente `Dropdown` nesses casos.

## Preview

<script setup>
import Radio from '@/components/Radio.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Radio />
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
  <cds-radio
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