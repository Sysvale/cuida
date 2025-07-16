# CheckboxGroup

CheckboxGroups são componentes de formulário que permitem seleções binárias e múltiplas.

## Quando usar

- Quando precisar de um componente de formulário para seleções binárias com várias opções.

## Quando não usar

- Quando for preciso que o efeito da interação com o Checkbox seja imediato. Checkboxes devem ser usados sempre em conjunto com um botão de submissão. Para contornar casos como esse, use Switches.

## Preview

<script setup>
import CheckboxGroup from '@/components/CheckboxGroup.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <CheckboxGroup />
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
  <cds-checkboxgroup
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