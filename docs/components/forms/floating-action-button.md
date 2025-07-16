# FloatingActionButton (FAB)

O FloatingActionButton é um botão que flutua sobre a interface do usuário, sempre visível, usado para promover uma ação primária ou frequente em um aplicativo.

## Quando usar

- Para destacar a ação principal ou mais importante em uma tela.
- Em aplicações móveis ou responsivas onde é necessário um acesso rápido a uma funcionalidade específica.
- Quando a interface precisa de um elemento de ação que seja altamente visível e de fácil acesso.
- Em telas onde o espaço é limitado e um botão tradicional ocuparia muito espaço ou distrairia o usuário.

## Quando não usar

- Quando há múltiplas ações principais com a mesma importância, pois o FAB é destinado a uma única ação primária.
- Em telas onde a ação não é crítica ou não é frequentemente utilizada pelo usuário.
- Em interfaces que já possuem muitos elementos flutuantes ou sobrepostos, para evitar poluição visual.
- Em telas grandes (desktop), onde um botão tradicional ou outro componente de interface pode ser mais apropriado.

## Preview

<script setup>
import FloatingActionButton from '@/components/FloatingActionButton.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <FloatingActionButton />
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
  <cds-floatingactionbutton
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