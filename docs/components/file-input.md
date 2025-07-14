# FileInput

FileInput é um input customizado de arquivos.

## Quando usar

- For necessário que o usuário faça uploads do seu computador para a plataforma.
- For necessário prover uma experiência de arrasta e solta para upload de arquivos.

## Quando não usar

- Se tratar de uma experiência mobile-first.

## Preview

<script setup>
import FileInput from '@/components/FileInput.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <FileInput />
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
  <cds-fileinput
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