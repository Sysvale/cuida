# CollapsibleContainer

CollapsibleContainers são componentes utilizados para reduzir o espaço vertical quando há uma grande quantidade de informações, com a possibilidade de ser expandido para exibir o conteúdo sumarizado.

## Quando usar

- For necessário otimizar o espaço vertical.
- Se deseja mostrar itens sumarizados.
- Se possui uma grande quantidade de informações que podem ser agrupadas em um tópico/título.

## Quando não usar

- Houver poucos itens a ser sumarizados;

## Preview

<script setup>
import CollapsibleContainer from '@/components/CollapsibleContainer.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <CollapsibleContainer />
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
  <cds-collapsiblecontainer
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