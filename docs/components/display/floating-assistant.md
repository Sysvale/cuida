# FloatingAssistant

Floating Assistant é um componente flutuante que pode ser utilizado para fornecer dicas de usabilidade ou informações específicas sobre o conteúdo da página.

## Quando usar

- Houver necessidade de fornecer dicas ou informações adicionais sobre um determinado elemento ou seção da página.
- For necessário direcionar o usuário para uma página externa que contenha informações/tutoriais adicionais sobre o conteúdo.
- O objetivo for reduzir a quantidade de informações exibidas na tela, mantendo o foco do usuário no elemento relevante.

## Quando não usar

- O componente se tornar intrusivo e atrapalhar a navegação e experiência do usuário.
- Não houver espaço suficiente para exibição do componente e ele puder ser confundido com o conteúdo da página.

## Preview

<script setup>
import FloatingAssistant from '@/components/FloatingAssistant.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <FloatingAssistant />
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
  <cds-floatingassistant
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