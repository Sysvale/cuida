# Checkbox

Checkboxes são componentes de formulário que permitem seleções binárias e múltiplas.

## Quando usar

- Quando precisar de um componente de formulário para seleções binárias.

## Quando não usar

- Não use checkboxes sem labels.
- Evite labels negativas, elas são mais difíceis de interpretar.
- Quando for preciso que o efeito da interação com o Checkbox seja imediato. Checkboxes devem ser usados sempre em conjunto com um botão de submissão. Para contornar casos como esse, use Switches.
- Evite utilizar checkboxes alinhadas horizontalmente.

## Preview

<script setup>
import Checkbox from '@/components/Checkbox.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Checkbox />
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
  <cds-checkbox
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