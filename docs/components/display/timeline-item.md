# TimelineItem

### TimelineItems são componentes auxiliares utilizados para montar Timelines.

---

## Quando usar:
- Como parte de um componente Timeline para representar eventos cronológicos
- Para criar listas de eventos organizados temporalmente
- Em interfaces que mostram histórico de ações ou atividades

## Quando não usar:
- Fora de componentes `Timeline`
- Como componente independente sem contexto temporal
- Para listas comuns que não têm ordenação cronológica

## Observações:
- O TimelineItem é um componente auxiliar do Timeline
- Suporta diferentes variantes de cores para indicar tipos de eventos
- Pode exibir estados de carregamento com a propriedade loading
- Oferece layout flexível com slots para conteúdo customizado
- A propriedade hollowed permite estilos visuais diferenciados

## Uso

### Exemplo básico

```vue
<template>
  <cds-timeline-item
    variant="green"
    :loading="false"
    :hollowed="false"
  >
    <template #opposite>
      24/01/2024
    </template>
    <template #title>
      Denis Ritchie
    </template>
    <template #content>
      Criador da linguagem de programação C
    </template>
  </cds-timeline-item>
</template>
```

### Exemplo com estado de carregamento

```vue
<template>
  <cds-timeline-item
    variant="blue"
    :loading="true"
  >
    <template #opposite>
      Carregando...
    </template>
    <template #title>
      Processando dados
    </template>
  </cds-timeline-item>
</template>
```

## Preview

<cds-timeline-item
  variant="green"
  :loading="false"
  :hollowed="false"
>
  <template #opposite>
    24/01/2024
  </template>
  <template #title>
    Denis Ritchie
  </template>
  <template #content>
    Criador da linguagem de programação C
  </template>
</cds-timeline-item>

## Props

| Nome | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | `string` | `'green'` | Variante de cor: 'green', 'teal', 'turquoise', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'gray', 'dark' |
| `loading` | `boolean` | `false` | Define se o item está em estado de carregamento |
| `hollowed` | `boolean` | `false` | Define se o indicador visual é vazado |

## Eventos

Este componente não emite eventos.

## Slots

| Nome | Descrição |
|------|-----------|
| `opposite` | Conteúdo exibido no lado oposto da timeline (geralmente data/hora) |
| `title` | Título do item da timeline |
| `content` | Conteúdo principal do item |

## Figma

[TimelineItem no Figma](https://www.figma.com/design/design-system-url)
