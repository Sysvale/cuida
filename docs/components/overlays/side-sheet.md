# SideSheet

SideSheets são painéis que surgem do lado direito da tela. De modo semelhante aos Modais, são úteis quando se precisa que os usuários concluam executem ações sem perder o contexto da página atual.

## Quando usar

- Para criar filtros com muitos campos sobre o conteúdo mostrado na página.
- Para criar formulários mantendo o conteúdo principal da página visível.
- Para mostrar informações detalhadas sobre determinado item da página.

## Quando não usar

- Quando o conteúdo do SideSheet não for relacionado com o conteúdo da página.
- Não use SideBars como solução de navegação vertical.

## Preview

<script setup>
import SideSheet from '@/components/SideSheet.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <SideSheet />
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
  <cds-sidesheet
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