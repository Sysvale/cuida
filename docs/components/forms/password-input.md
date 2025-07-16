# PasswordInput

PasswordInputs permitem que os usuários insiram caracteres sensíveis na interface.

## Quando usar

- Necessitar de um campo de texto para inserir informações sensíveis, como uma senha.

## Quando não usar

- O dado a ser utilizado no componente for um dado comum (Exemplo: nome ou idade).

## Preview

<script setup>
import PasswordInput from '@/components/PasswordInput.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <PasswordInput />
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
  <cds-passwordinput
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