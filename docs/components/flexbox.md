# Flexbox

Flexbox é um componente que usa a API de Flexbox do CSS para fornecer controle sobre o alinhamento e distribuição de elementos em uma única dimensão (linha ou coluna).

## Quando usar

- Para alinhar elementos em uma única dimensão, seja em linha ou coluna.
- Quando for necessário distribuir o espaço entre itens de forma responsiva, adaptando-se ao tamanho da tela.
- Para centralizar elementos horizontal ou verticalmente dentro de um contêiner.
- Quando for necessário controlar o crescimento, encolhimento e espaçamento de elementos filhos em relação ao contêiner pai.

## Quando não usar

- Quando o layout requer organização em duas dimensões (linhas e colunas simultaneamente). Para esses casos, utilize o `<cds-grid>`.
- Para cenários que envolvem estruturas complexas de layout, como Dashboards ou Galerias de Imagens, onde o controle bidimensional é necessário.
- Em situações onde o posicionamento fixo ou absoluto é necessário para controlar o layout do conteúdo.

## Preview

<script setup>
import Flexbox from '@/components/Flexbox.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Flexbox />
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
  <cds-flexbox
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