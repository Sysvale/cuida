# InnerTabs

InnerTabs são componentes utilizados para criar soluções de navegação interas às <a href="https://sysvale.github.io/cuida/?path=/docs/componentes-navega%C3%A7%C3%A3o-tabs--tabs">Tabs</a>.

## Quando usar

- Dentro de tabs, houver necessidade de mais um nível na estrutura de navegação;
- Em casos que for muito importante mostrar todo o título das abas;
- For necessário separar o conteúdo por abas e navergar por elas;
- Não for o caso de utilizar soluções como navbars, sidebars, cards ou links como navegação;

## Quando não usar

- Houver muitos itens a serem mostrados como abas.
- Quando a ação de clique realizada pelo usuário o levar para outra página.

## Preview

<script setup>
import InnerTabs from '@/components/InnerTabs.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <InnerTabs />
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
  <cds-innertabs
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