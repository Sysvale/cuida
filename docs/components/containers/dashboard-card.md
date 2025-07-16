# DashboardCard

DashboardCards são componentes utilizados para construir cards com informações que requeiram uma descrição curta e que possam ser classificadas em status.

## Quando usar

- For necessário mostrar informações de modo resumido em dashboards
- For necessário um card com botão clicável e que leve o usuário a uma nova tela.
- A informação descrita no card possa ser classificada.

## Quando não usar

- Houver um conjunto muito grande de informações a ser exibido.
- Se deseja utilizar ícones em conjunto com os dados. Utilize <a href="https://sysvale.github.io/cuida/?path=/docs/componentes-containers-expansioncard--expansion-card">ExpansionCards</a> nesses cenários.

## Preview

<script setup>
import DashboardCard from '@/components/DashboardCard.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <DashboardCard />
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
  <cds-dashboardcard
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