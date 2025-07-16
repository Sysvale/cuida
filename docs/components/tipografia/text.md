# Text

Componentes Text permitem renderizar texto com diferentes estilos e configurações.

## Quando usar

- Quando quiser renderizar texto utilizando as definições tipográficas do design system para garantir consistência visual.
- Quando quiser utilizar tags de texto HTML sem as margens padrão.

## Quando não usar

- Para exibir textos decorativos ou de realce dentro de botões e componentes interativos. Utilize a estilização apropriada para cada caso..

## Preview

<script setup>
import Text from '@/components/Text.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Text />
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
  <cds-text
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