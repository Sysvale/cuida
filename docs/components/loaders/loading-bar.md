# LoadingBar

LoadingBars é um componente utilizado para indicar que o progresso de uma operação ainda não foi finalizado.

## Quando usar

- For necessário impedir a visualização e navegação do conteúdo de páginas enquanto houver alguma pendência de operação.

## Quando não usar

- A visualização e navegação não puder ser interrompida.

## Preview

<script setup>
import LoadingBar from '@/components/LoadingBar.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <LoadingBar />
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
  <cds-loadingbar
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