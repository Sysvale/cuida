# Wizard

Wizards são componentes utilizados para um processo passo a passo que permite ao usuário inserir informações em uma ordem prescrita e na qual as etapas subsequentes podem depender das informações inseridas nas etapas anteriores.

## Quando usar

- Quando precisar completar etapas em uma determinada sequência.
- For necessário exibir informações em  blocos para simplificar o fluxo.

## Quando não usar

- Quando o processo não for tão complexo, não havendo necessidade de divisão em etapas.
- Quando houver mais de três etapas, deve se considerar dividir em mais processos.
- Quando não houver necessidade de guiar o usuário numa sequência.

## Preview

<script setup>
import Wizard from '@/components/Wizard.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Wizard />
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
  <cds-wizard
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