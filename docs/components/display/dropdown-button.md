# DropdownButton

DropdownButtons são componentes utilizados para ativar popovers contendo listas de ações.

## Quando usar

- Quando precisar agrupar ações sob um mesmo contexto.

## Quando não usar

- Em substituição à um Multiselect ou Select.
- Para exibir filtros
- Com mais de 5 ações

## Preview

<script setup>
import DropdownButton from '@/components/DropdownButton.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <DropdownButton />
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
  <cds-dropdownbutton
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