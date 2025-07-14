# DynamicInputList

Permite que o usuário adicione, remova e edite múltiplos inputs em uma lista dinâmica.

## Quando usar

- Quando o usuário precisar inserir uma quantidade variável de informações do mesmo tipo;
- Para formulários que exigem múltiplas entradas do mesmo tipo (ex: números de telefone, emails adicionais, etc).

## Quando não usar

- A quantidade de campos for fixa e conhecida previamente;
- Quando for necessário coletar informações de diferentes tipos. Neste caso, utilize campos individuais;
- A complexidade da lista é alta, contendo vários inputs, e requer uma solução mais específica.

## Preview

<script setup>
import DynamicInputList from '@/components/DynamicInputList.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <DynamicInputList />
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
  <cds-dynamicinputlist
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