# TextArea

TextAreas permitem que os usuários insiram um texto longo em uma interface.

## Quando usar

- Necessitar de um campo de texto para inserir informações grandes. Exemplo: Descrição de produto ou mensagens.

## Quando não usar

- For necessário informar apenas um dado específico ao campo de texto.

## Preview

<script setup>
import TextArea from '@/components/TextArea.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <TextArea />
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
  <cds-textarea
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