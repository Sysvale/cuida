# Carousel

O Carousel é um componente que permite a exibição de uma série de conteúdos (imagens, textos, cards, etc.) em um formato deslizante, em que o usuário pode navegar entre os itens de forma sequencial.

## Quando usar

- Quando há necessidade de exibir vários itens (como imagens, produtos, cards informativos) em um espaço reduzido, sem sobrecarregar a interface.
- Para destacar conteúdos importantes de forma dinâmica, como promoções, destaques ou novidades.
- Quando a ordem de exibição dos itens é relevante e a navegação sequencial faz sentido para o contexto.

## Quando não usar

- Quando o conteúdo for uma informação crítica e não deve ficar escondida.
- Se a quantidade de itens for muito pequena (menos de 3), pois a navegação pode parecer desnecessária.
- Em interfaces onde a acessibilidade é uma prioridade e o carousel pode dificultar a experiência para usuários com deficiências visuais ou motoras.
- Quando o espaço disponível na tela é insuficiente para exibir os itens de forma clara e legível.

## Preview

<script setup>
import Carousel from '@/components/Carousel.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <Carousel />
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
  <cds-carousel
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