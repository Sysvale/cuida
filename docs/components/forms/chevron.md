# Chevron

### Chevrons são elementos gráficos usados em interfaces para indicar possibilidade de interação.

---

## Quando usar:
- Parte de um elemento pode ser oculta ou visível
- Indicar ações como `play`, `next` e `fastforward`

## Quando não usar:
- Como ícones.
- Evite usar chevrons sem a propriedade `animate` ativa

## Observações:
- Os chevrons são elementos visuais simples e eficazes para navegação
- Suportam diferentes direções: top, right, bottom, left
- Disponíveis em diferentes tamanhos: sm, md, lg
- Ideais para indicar expansão/colapso de conteúdo

## Uso

### Exemplo básico

```vue
<template>
  <cds-chevron />
</template>
```

### Exemplo com direção e tamanho

```vue
<template>
  <cds-chevron
    direction="right"
    size="md"
  />
</template>
```

## Preview

<cds-chevron />

## Props

| Nome | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `direction` | `string` | `'right'` | Direção do chevron: 'top', 'right', 'bottom', 'left' |
| `size` | `string` | `'md'` | Tamanho do chevron: 'sm', 'md', 'lg' |
| `animate` | `boolean` | `true` | Define se o chevron deve ter animação |

## Eventos

Este componente não emite eventos.

## Slots

Este componente não possui slots.

## Figma

[Chevron no Figma](https://www.figma.com/design/design-system-url)
