# Button

Buttons são componentes que permitem que o usuário execute uma ação com um toque.

## Quando usar

- For necessário comunicar ao usuário que ele pode executar uma ação na interface,
seja em diálogos, janelas modais, formulários, cards, etc.

## Quando não usar

- For necessário dar a opção de executar uma ação como um detalhe pequeno na interface.
Nesse caso, recomendamos o uso de links.

## Preview

<script setup>
import Button from '@/components/Button.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Button />
</div>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `green` | A variante de cor. São 9 variantes implementadas: 'green', 'teal', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange' e 'amber'. |
| `prop` | `string` | `''` | Description |
| `prop` | `string` | `''` | Description |
| `prop` | `string` | `''` | Description |

## Eventos

| Event | Description |
|-------|-------------|
| `event` | Event description |

## Uso

```vue
<template>
  <cds-button
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