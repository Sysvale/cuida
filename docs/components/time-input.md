# TimeInput

TimeInputs são componentes utilizados para inserir horários específicos no formato simples: hora e minutos.

## Quando usar

- For necessário definir horários de eventos, agendamentos, alarmes e etc…

## Quando não usar

- For necessário mostrar opções disponíveis de horários para seleção.

## Preview

<script setup>
import TimeInput from '@/components/TimeInput.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <TimeInput />
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
  <cds-timeinput
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