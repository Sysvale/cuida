# Skeleton

O componente Skeleton é usado para criar espaços reservados que representam conteúdo que está carregando ou sendo processado.

## Quando usar

- Use o componente Skeleton quando o carregamento de conteúdo for perceptível
para o usuário e você deseja fornecer feedback visual durante esse processo.
- É especialmente útil em situações onde o tempo de carregamento do conteúdo é
variável ou pode levar algum tempo para ser concluído.

## Quando não usar

- Evite usar o componente Skeleton quando o conteúdo é carregado
instantaneamente, pois pode causar distração ou poluição visual desnecessária.
- Não use quando o feedback visual do carregamento não for relevante para a
experiência do usuário ou quando o carregamento é rápido e não perceptível.

## Preview

<script setup>
import Skeleton from '@/components/Skeleton.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Skeleton />
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
  <cds-skeleton
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