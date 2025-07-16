# Switch

Switches são componentes utilizados para ativar ou desativar configurações ou opções específicas. 

## Quando usar

- A configuração controlada pelo Switch deve aplicar mudanças automaticamente.
- Ao usar labels. Quando usados em conjunto, devem descrever dois estados, dependentes do estado do Switch.

## Quando não usar

- Em formulários que possuem botão de submit.
- Utilizar Switches para controlar ações que dependam de requisições sem indicar o tempo de espera ao usuário.

## Preview

<script setup>
import Switch from '@/components/Switch.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Switch />
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
  <cds-switch
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