# SearchInput

### SearchInputs permitem que os usuários realizem buscas sobre conjuntos de dados na interface.

---

## Quando usar:
- Para implementar funcionalidades de busca em listas, tabelas ou conjuntos de dados
- Quando é necessário filtrar conteúdo em tempo real
- Para busca em bases de conhecimento ou catálogos
- Em barras de busca globais da aplicação

## Quando não usar:
- Para campos de entrada de dados comuns que não envolvem busca
- Quando a funcionalidade de busca não é o objetivo principal do campo
- Para filtros muito específicos que precisam de controles mais complexos

## Observações:
- O SearchInput possui um ícone de lupa integrado para facilitar o reconhecimento
- Suporta placeholder personalizável para orientar o usuário
- Pode ser usado em modo fluido para ocupar toda a largura disponível
- Oferece feedback visual apropriado para estados de busca

## Uso

### Exemplo básico

```vue
<template>
  <cds-search-input
    v-model="searchValue"
    placeholder="Busque..."
  />
</template>

<script setup>
import { ref } from 'vue';
const args = ref({});

const searchValue = ref('');
</script>
```

### Exemplo em modo fluido

```vue
<template>
  <cds-search-input
    v-model="searchValue"
    placeholder="Pesquisar usuários..."
    :fluid="true"
  />
</template>

<script setup>
import { ref } from 'vue';
const args = ref({});

const searchValue = ref('');
</script>
```

## Preview

<cds-search-input placeholder="Busque..." />

## Props

| Nome | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `string` | `''` | Valor do campo de busca |
| `placeholder` | `string` | `'Busque...'` | Texto de placeholder |
| `disabled` | `boolean` | `false` | Define se o campo está desabilitado |
| `fluid` | `boolean` | `false` | Define se o campo ocupa toda a largura |
| `hideLabel` | `boolean` | `false` | Define se o rótulo deve ser ocultado |

## Eventos

| Nome | Descrição |
|------|-----------|
| `update:modelValue` | Emitido quando o valor da busca é alterado |
| `search` | Emitido quando uma busca é realizada |
| `clear` | Emitido quando o campo de busca é limpo |

## Slots

Este componente não possui slots.

## Figma

[SearchInput no Figma](https://www.figma.com/design/design-system-url)
