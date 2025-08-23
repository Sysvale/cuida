# CarouselController

### CarouselControllers são componentes utilizados para controlar a exibição de elementos em carrosséis.

---

## Quando usar:
- Você possuir uma categoria de elementos da interface que se repetem e que podem ser exibidos em forma de carrossel.

## Quando não usar:
- Você estiver trabalhando com tabelas. Nesses casos recomendamos o uso de paginação.
- Todo o conteúdo a ser gerenciado puder ser exibido de uma só vez. Nesse caso não há necessidade de controle de páginas e do uso do componente.

## Observações:
- O CarouselController é ideal para navegação entre páginas de conteúdo similar.
- Funciona bem com componentes que precisam de paginação visual.
- Oferece controles intuitivos de navegação para frente e para trás.

## Uso

### Exemplo básico

```vue
<template>
  <cds-carousel-controller
    :total="12"
    :perPage="4"
    propertyName="Métricas"
    @click-forward="handleClickForwardEvent"
    @click-back="handleClickBackEvent"
  />
</template>

<script setup>
const handleClickForwardEvent = () => {
  console.info('Clicked forward');
};

const handleClickBackEvent = () => {
  console.info('Clicked back');
};
</script>
```

## Preview

<cds-carousel-controller
  :total="12"
  :perPage="4"
  propertyName="Métricas"
  @click-forward="handleClickForwardEvent"
  @click-back="handleClickBackEvent"
/>

## Props

| Nome | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `total` | `number` | `0` | Número total de itens |
| `perPage` | `number` | `1` | Número de itens por página |
| `propertyName` | `string` | `''` | Nome da propriedade para exibir no controle |

## Eventos

| Nome | Descrição |
|------|-----------|
| `click-forward` | Emitido quando o botão de avançar é clicado |
| `click-back` | Emitido quando o botão de voltar é clicado |

## Slots

Este componente não possui slots.

## Figma

[CarouselController no Figma](https://www.figma.com/design/design-system-url)
