# Card

Cards são componentes utilizados como containers de propósito geral. À partir das suas props e slots `header`, `body`, `footer`, `image`, `icon` e `extra` é possível criar variações e cards mais específicos, como o DashboardCard.

## Quando usar

- Para agrupar elementos relacionados entre si.
- Para dar proeminência visual a elementos relacionados entre si.

## Quando não usar

- De modo aninhado, com cards dentro de cards.
- Quando o conteúdo encapsulado pelo card ocupar mais da metade da página.

## Preview

<script setup>
import dedent from 'ts-dedent';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <dedent />
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
  <cds-card
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