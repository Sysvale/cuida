# Stepper

Steppers são componentes que controlam e exibem tarefas divididas em etapas.

## Quando usar

- For necessário mostrar, de forma visual, o estado e a etapa atual de um stepper.
- Houver um modal com várias etapas.
- Houver uma série de entradas ou ações que desejam mostrar o progresso do seu preenchimento, não importando data e hora dos estados.

## Quando não usar

- Se precisa da cronologia (data, hora) dos steps. Para isso, utilize componente Timeline.
- A ordem das etapas, eventos ou ações não são relevantes.

## Preview

<script setup>
import Stepper from '@/components/Stepper.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Stepper />
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
  <cds-stepper
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