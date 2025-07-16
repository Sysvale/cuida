# DataTable

O DataTable é um wrapper da tabela base, que adiciona funcionalidades de usabilidade e personalização para visualização e interação com dados tabulares.

## Quando usar

- Quando for necessário exibir dados em formato tabular com funcionalidades extras como personalização de colunas, exibição da contagem total de registros e ações complementares (ex: exportações);
- Quando o contexto exigir uma interface para manipulação e leitura de dados, como painéis administrativos, relatórios dinâmicos ou listas interativas;
- Quando o desenvolvedor quiser aproveitar a API da tabela base mas com uma estrutura visual e funcional mais completa e pronta para uso.

## Quando não usar

- Quando a tabela base já atende completamente às necessidades da interface, sem necessidade de contagem de registros, personalização ou ações adicionais;
- Quando o controle total sobre o layout da tabela for necessário e o uso de slots for inadequado ao contexto visual.

## Preview

<script setup>
import DataTable from '@/components/DataTable.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <DataTable />
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
  <cds-datatable
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