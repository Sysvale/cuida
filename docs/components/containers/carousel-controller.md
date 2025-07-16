# CarouselController

CarouselControllers são componentes utilizados para controlar a exibição de elementos em carrosséis.

## Quando usar

- Você possuir uma categoria de elementos da interface que se repetem e que podem ser exibidos em forma de carrossel.

## Quando não usar

- Você estiver trabalhando com tabelas. Nesses casos recomendamos o uso de paginação (TODO).
- Todo o conteúdo a ser gerenciado puder ser exibido de uma só vez. Nesse caso não há necessidade de controle de páginas e do uso do componente;

## Preview

<script setup>
import CarouselController from '@/components/CarouselController.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <CarouselController />
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
  <cds-carouselcontroller
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