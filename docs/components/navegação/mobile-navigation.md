# MobileNavigation

O MobileNavigation é uma barra lateral que proporciona acesso rápido e fácil às principais seções da aplicação no ambiente mobile.

## Quando usar

- Quando for necessária uma navegação na versão mobile da aplicação;
- Quando for necessário facilitar o acesso a diferentes seções do aplicativo, garantindo que o usuário possa navegar facilmente entre as páginas sem se perder;
- Quando o espaço vertical for limitado, aproveitando ao máximo a largura da tela do dispositivo móvel.

## Quando não usar

- Quando em ambiente desktop, onde uma barra de navegação superior ou lateral pode ser mais adequada;
- Quando em telas que requerem espaço horizontal significativo, pois o menu pode sobrepor ou obstruir o conteúdo principal.

## Preview

<script setup>
import MobileNavigation from '@/components/MobileNavigation.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <MobileNavigation />
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
  <cds-mobilenavigation
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