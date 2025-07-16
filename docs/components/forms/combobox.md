# ComboBox

O ComboBox é um componente que permite ao usuário selecionar múltiplas opções filtráveis e opcionalmente, adicionar novas opções.

## Quando usar

- Quando o usuário pode selecionar **múltiplos itens** a partir de uma lista.
- Quando as opções disponíveis podem **não contemplar todos os casos**, permitindo que o usuário adicione novas.
- Quando a lista de opções é extensa e se beneficia de um campo de busca.
- Em formulários onde se deseja flexibilidade e agilidade na entrada de dados.

## Quando não usar

- Se não for permitido adicionar novos itens à lista.
- Quando o conjunto de opções é fixo e necessário selecionar mais de um item, considere usar o `Multiselect`.
- Se for necessário selecionar apenas um item, prefira o `Select`.

## Preview

<script setup>
import ComboBox from '@/components/ComboBox.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <ComboBox />
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
  <cds-combobox
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