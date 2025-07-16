# RadioButtonGroup

RadioButtonsGroup são radio buttons customizados para facilitar a seleção e feedback.

## Quando usar

- As opções que o componente busca prover são mutuamente exclusivas.
- For necessário utilizar um ```<input type="radio"``` />.

## Quando não usar

- Duas ou mais opções puderem ser selecionadas ao mesmo tempo.
- Houver 4 ou mais opções. Prefira Dropdowns nesses casos.

## Preview

<script setup>
import RadioButtonGroup from '@/components/RadioButtonGroup.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <RadioButtonGroup />
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
  <cds-radiobuttongroup
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