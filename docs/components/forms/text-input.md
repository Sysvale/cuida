# TextInput

TextInputs permitem que os usuários insiram texto em uma interface

## Quando usar

- Necessitar de um campo de texto para inserir informações.

## Quando não usar

- O dado a ser utilizado no componente for numérico.
- Houver a necessidade de selecionar múltiplos itens.

## Preview

<script setup>
import TextInput from '@/components/TextInput.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <TextInput />
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
  <cds-textinput
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