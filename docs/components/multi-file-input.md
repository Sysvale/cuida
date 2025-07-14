# MultiFileInput

O MultiFileInput é um componente que permite ao usuário selecionar e carregar múltiplos arquivos de forma organizada.

## Quando usar

- Quando o usuário precisa enviar múltiplos arquivos em um único formulário.
- Para situações onde é importante visualizar a lista de arquivos selecionados antes de finalizar o envio.
- Quando o espaço na interface é limitado, mas a seleção de vários arquivos é um requisito.

## Quando não usar

- Quando apenas um único arquivo precisa ser enviado (nesse caso, um input de arquivo simples é suficiente).
- Se a lista de arquivos selecionados pode se tornar muito longa, ocupando espaço excessivo na tela e prejudicando a usabilidade.
- Em interfaces onde a complexidade do componente pode confundir o usuário, especialmente se o envio de múltiplos arquivos não for uma necessidade comum.

## Preview

<script setup>
import MultiFileInput from '@/components/MultiFileInput.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <MultiFileInput />
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
  <cds-multifileinput
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