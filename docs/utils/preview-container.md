# PreviewContainer

Container visual utilizado para exibir componentes na documentação.

---

## Descrição

O **PreviewContainer** é um componente de layout usado internamente na documentação. Ele fornece um container com bordas, espaçamento e fundo para exibição de componentes, garantindo consistência entre os previews.

É utilizado pelo [PreviewBuilder](/utils/preview-builder) e pode ser usado isoladamente para exibir componentes simples, sem props ou eventos, ou para demonstrar estados específicos dentro de páginas que já utilizam o PreviewBuilder.

---

## Funcionamento

O componente renderiza uma `div` com borda, `border-radius`, `padding` e opção de fundo configurada pela prop `with-background`. Essa propriedade adiciona um fundo cinza claro para destacar componentes que precisam de contraste visual.

---

## Uso

### Padrão
```vue
<PreviewContainer>
  <CdsButton text="Meu botão" />
</PreviewContainer>
```

### Com fundo cinza
```vue
<PreviewContainer with-background>
  <CdsTextInput 
    label="Nome" 
    placeholder="Digite aqui..."
  />
</PreviewContainer>
```

### Múltiplos componentes
```vue
<PreviewContainer with-background>
  <CdsFlexbox gap="4">
    <CdsButton text="Primário" variant="primary" />
    <CdsButton text="Secundário" variant="secondary" />
    <CdsButton text="Perigo" variant="danger" />
  </CdsFlexbox>
</PreviewContainer>
```

---

## Props

| Nome | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `with-background` | `boolean` | `false` | Define se o container deve ter fundo cinza claro |

---

## Slots

| Nome | Descrição |
|------|-----------|
| `default` | Conteúdo exibido dentro do container |

---

## Integração com LogBuilder

O **PreviewContainer** pode ser utilizado junto ao **LogBuilder** para exibir componentes que emitem eventos.

```vue
<PreviewContainer>
  <CdsButton 
    text="Testar eventos"
    @button-click="handleClick"
  />
  <LogBuilder :events="['button-click']" />
</PreviewContainer>
```

---

## Tipos TypeScript

```typescript
export type PreviewContainerType = typeof import("./PreviewContainer.vue")["default"];

interface Props {
  withBackground?: boolean;
}
```

---

## Notas importantes

- ⚠️ **Exclusivo para documentação** - Não usar em componentes ou aplicações de produção 
- O componente define apenas layout e aparência visual, sem comportamento interativo.  
