# NumberInput

O componente NumberInput permite que os usuários insiram e editem valores numéricos em uma interface.

## Quando usar

- Precisar de um campo para que os usuários insiram informações exclusivamente numéricas, como:
	- Quantidades (por exemplo, número de itens em um carrinho de compras).
	- Valores monetários (por exemplo, preços, descontos).
	- Idades, medidas, ou qualquer outro dado que seja estritamente numérico.
- A entrada de dados for numérica e não exigir texto livre ou seleção de opções pré-definidas.

## Quando não usar

- O dado a ser inserido for textual. Nesse caso, considere usar o componente `TextInput`.
- O tipo de uso envolver valores incrementais. Nesse caso, considere usar o componente `StepperInput`.

## Preview

<script setup>
import NumberInput from '@/components/NumberInput.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <NumberInput />
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
  <cds-numberinput
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