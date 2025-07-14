# QuickActionBar

O QuickActionBar é um componente de busca e ação rápida que permite ao usuário pesquisar informações em diferentes áreas do sistema, como usuários cadastrados, métricas e palavras-chave. Além da busca, ele oferece a capacidade de tomar ações, funcionando como uma barra de ação rápida que retorna as opções disponíveis, possibilitando o acesso em situações nas quais essas ações podem ser realizadas.

## Quando usar

- Quando o usuário precisar de uma busca completa e integrada que abranja diversas áreas e informações do sistema;
- Quando é importante apresentar rapidamente resultados consolidados de várias origens sem que o usuário precise navegar entre diferentes seções;
- Para simplificar o acesso a registros específicos, independentemente de onde estejam no sistema, como pessoas, dados analíticos, documentos e palavras-chave;
- Quando ações rápidas, como a criação de novos registros ou métricas, puderem estar acessíveis diretamente da barra de busca.

## Quando não usar

- Quando o usuário necessita de um filtro ou busca específica dentro de uma seção restrita do sistema. Nesse caso, considere usar filtros ou campos de busca locais;
- Para ações que requerem pouca atenção do usuário, como buscas triviais que não exigem visibilidade em tela cheia.

## Preview

<script setup>
import QuickActionBar from '@/components/QuickActionBar.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <QuickActionBar />
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
  <cds-quickactionbar
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