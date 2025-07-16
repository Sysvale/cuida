# Link

Links são componentes usados ​​para navegar para outra página e podem abrir uma nova guia.

## Quando usar

- For necessário navegar para outra seção ou página.
- For necessário redirecionar para um site ou documento externo.

## Quando não usar

- For necessário executar uma ação (exemplo: salvar, editar). Nesses casos é recomendado utilizar o componente Button.

## Preview

<script setup>
import Link from '@/components/Link.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Link />
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
  <cds-link
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