# MobileNavbar

MobileNavbar é uma barra de navegação móvel localizada na parte inferior da tela.

## Quando usar

- Em aplicações móveis ou responsivas que exigem uma navegação simples e acessível.
- Quando for necessário fornecer acesso rápido a seções principais do aplicativo.
- Para substituir navegações complexas em telas pequenas, mantendo a usabilidade.

## Quando não usar

- Em telas grandes (desktop), onde uma navbar lateral ou superior é mais apropriada.
- Quando o número de itens de navegação é muito grande (mais de 5 itens).

## Preview

<script setup>
import MobileNavbar from '@/components/MobileNavbar.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <MobileNavbar />
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
  <cds-mobilenavbar
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