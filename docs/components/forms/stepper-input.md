# StepperInput

StepperInputs são inputs numéricos com botões de incremento e decremento sempre visíveis.

## Quando usar

- For necessário precisar de um input do tipo número.
- O número a ser adicionado ao StepperInput for pequeno ou de poucos dígitos.

## Quando não usar

- O dado a ser utilizado no componente não for numérico.
- O dado a ser utilizado  no componente for muito grande.
- O dado a ser utilizado no componente não for incremental.

## Preview

<script setup>
import StepperInput from '@/components/StepperInput.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <StepperInput />
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
  <cds-stepperinput
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