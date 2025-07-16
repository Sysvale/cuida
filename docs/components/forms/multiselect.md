# Multiselect

Multiselects são componentes que permitem ao usuário selecionar múltiplas opções divididas em categorias.

## Quando usar

- Houver a possibilidade de selecionar múltipos itens em um select.
- Se deseja classificar os itens do select em categorias.

## Quando não usar

- Os itens do select não puderem ser classificados em categorias.
- Houver necessidade de detalhar no input as opções selecionadas, já que mostramos como resumo apenas quantas e não quais foram as opções escolhidas.

## Preview

<script setup>
import Multiselect from '@/components/Multiselect.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Multiselect />
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
  <cds-multiselect
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