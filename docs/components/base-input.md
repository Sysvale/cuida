# BaseInput

BaseInput é o componente base para todos os tipos de inputs, fornecendo a estrutura e funcionalidades comuns.

## Quando usar

- Na implementação de componentes do tipo input, com exceção de checkboxes, radios, ranges e files.

## Quando não usar

- ⚠️ **Atenção:** Este componente **não deve** ser utilizado diretamente na aplicação, mas sim como base para a criação de novos componentes de input..

## Preview

<script setup>
import BaseInput from '@/components/BaseInput.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <BaseInput />
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
  <cds-baseinput
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