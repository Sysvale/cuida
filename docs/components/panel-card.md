# PanelCard

PanelCards são componentes utilizados para agrupar informação em containers com uma estrutura mínima formada por título, subtítulo, e conteúdo.

## Quando usar

- Houver a construção de páginas e dashboards com cars em grid.
- O slot de ações deve agrupar ícones ou botões que aplicam mudanças em todas as informações contidas no PainelCard.

## Quando não usar

- For necessário agrupar elementos fora da estrutura básica: título + subtítulo + conteúdo.
- Ele for o único componente do seu tipo na página, ocupando toda a largura disponível.

## Preview

<script setup>
import PanelCard from '@/components/PanelCard.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <PanelCard />
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
  <cds-panelcard
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