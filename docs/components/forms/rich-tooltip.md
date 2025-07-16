# RichTooltip

RichTooltip, assim como Tooltips, são labels flutuantes usadas para explicar um da interface, entretanto provêem maior liberdade para descrição de textos estruturados e/ou mais longos.

## Quando usar

- O texto a ser exibido como label precisar ocupar várias linhas ou seguir determinada estrurua, como "label: descritor".
- Para exibir informações suplementares sobre uma feature ou elemento da interface.

## Quando não usar

- Com conteúdo simples, composto por poucas palavras.
- Para comunicar erros e status do sistema.
- Para mostrar informações críticas para a compreensão de uma feature ou elemento da interface.

## Preview

<script setup>
import RichTooltip from '@/components/RichTooltip.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <RichTooltip />
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
  <cds-richtooltip
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