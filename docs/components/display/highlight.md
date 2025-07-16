# Highlight

Highlights são componentes utilizados para destacar palavras ou frases importantes em um determinado contexto.

## Quando usar

- Se deseja guiar a atenção do usuário para palavras ou frases específicas na interface (nesses cenários, Highlights animados podem ser ainda mais efetivos que os comuns).
- Estiver implementando alguma feature de *diff* e precisar indicar elementos que foram substituídos por outros.

## Quando não usar

- Se deseja criar hierarquia na página. Para esses casos, use mecanismos de hierarquia tipográfica como peso da fonte, tamanho ou cor.
- O elemento sobre o qual o Highlight será *wrapper* não for um elemento de texto.
- Forem destacados trechos muito grandes de texto. Isso pode acabar resultando no oposto do que se espera com o uso de Highlights.

## Preview

<script setup>
import Highlight from '@/components/Highlight.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Highlight />
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
  <cds-highlight
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