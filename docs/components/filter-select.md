# FilterSelect

FilterSelect permitem que o usuário escolha opções como filtro de determinado conteúdo. São derivados dos Selects, mas têm implementação e aplicabilidade mais específicas. Ocupam menos conteúdo verticalmente e não possuem propriedades relacionadas à validação.

## Quando usar

- O usuário tiver de escolher uma única opção em uma lista com diversos itens.
- Quando essas opções servierem de filtros a conteúdos em uma página, card, ou sidesheet,como
por exemplo para mapas, gráficose relatórios

## Quando não usar

- Em substituição ao componente <a href="https://sysvale.github.io/cuida/?path=/docs/componentes-forms-select--select">Select</a>
- O usuário precisar selecionar mais de um item da lista. Nesse caso, utilize <a href="https://sysvale.github.io/cuida/?path=/docs/componentes-forms-clusteredmultiselect--clustered-multiselect">ClusteredMultiselects</a>.

## Preview

<script setup>
import FilterSelect from '@/components/FilterSelect.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <FilterSelect />
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
  <cds-filterselect
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