# Slider

Sliders são componentes utilizados para seleção de valores dentro de um intervalo.

## Quando usar

- Recomendamos o uso de sliders quando for preciso a seleção de valores dentro de um intervalo,
sobretudo quando for preciso selecionar mais de um valor.
- Recomendamos o uso de sliders quando a velocidade na seleção de valores em um intervalo for
mais relevante que a precisão.

## Quando não usar

- Não recomendamos o uso de sliders quando não houver necessidade de uma precisão muito grande na seleção dos valores.
- Não recomendamos o uso de sliders em conjunto com inputs para que o usuário consiga editar
o dado tanto pelo slider quanto pelos inputs.

## Preview

<script setup>
import Slider from '@/components/Slider.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Slider />
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
  <cds-slider
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