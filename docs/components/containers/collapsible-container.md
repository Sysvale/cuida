# CollapsibleContainer

### CollapsibleContainers são componentes utilizados para reduzir o espaço vertical quando há uma grande quantidade de informações, com a possibilidade de ser expandido para exibir o conteúdo sumarizado.

---

## Quando usar:
- For necessário otimizar o espaço vertical.
- Se deseja mostrar itens sumarizados.
- Se possui uma grande quantidade de informações que podem ser agrupadas em um tópico/título.

## Quando não usar:
- Houver poucos itens a ser sumarizados.

## Observações:
- O CollapsibleContainer é ideal para economizar espaço em interfaces com muito conteúdo.
- Permite ao usuário controlar a visibilidade do conteúdo expandindo ou recolhendo.
- Mantém a interface limpa enquanto disponibiliza informações adicionais quando necessário.

## Uso

### Exemplo básico

```vue
<template>
  <cds-collapsible-container
    :value="false"
    title="Veja mais informações"
  >
    <p>
      Mussum Ipsum, cacilds vidis litro abertis. Todo mundo
      vê os porris que eu tomo, mas ninguém vê os tombis que eu levo!
      Atirei o pau no gatis, per gatis num morreus. Pra lá , depois
      divoltis porris, paradis. Leite de capivaris, leite de mula
      manquis sem cabeça. Viva Forevis aptent taciti sociosqu ad
      litora torquent. Per aumento de cachacis, eu reclamis. Nec
      orci ornare consequat. Praesent lacinia ultrices consectetur.
      Sed non ipsum felis. Cevadis im ampola pa arma uma pindureta.
    </p>
  </cds-collapsible-container>
</template>
```

## Preview

<cds-collapsible-container
  :value="false"
  title="Veja mais informações"
>
  <p>
    Mussum Ipsum, cacilds vidis litro abertis. Todo mundo
    vê os porris que eu tomo, mas ninguém vê os tombis que eu levo!
    Atirei o pau no gatis, per gatis num morreus. Pra lá , depois
    divoltis porris, paradis. Leite de capivaris, leite de mula
    manquis sem cabeça. Viva Forevis aptent taciti sociosqu ad
    litora torquent. Per aumento de cachacis, eu reclamis. Nec
    orci ornare consequat. Praesent lacinia ultrices consectetur.
    Sed non ipsum felis. Cevadis im ampola pa arma uma pindureta.
  </p>
</cds-collapsible-container>

## Props

| Nome | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `value` | `boolean` | `false` | Define se o container está expandido ou recolhido |
| `title` | `string` | `''` | Título exibido no cabeçalho do container |

## Eventos

| Nome | Descrição |
|------|-----------|
| `input` | Emitido quando o estado do container é alterado |

## Slots

| Nome | Descrição |
|------|-----------|
| `default` | Conteúdo que será exibido quando o container estiver expandido |

## Figma

[CollapsibleContainer no Figma](https://www.figma.com/design/design-system-url)
