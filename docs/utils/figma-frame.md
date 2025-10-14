# FigmaFrame

Componente utilizado para incorporar frames do Figma na documentação.

---

## Descrição

O **FigmaFrame** permite exibir designs, protótipos e frames do Figma dentro das páginas de documentação. Ele gera um iframe estilizado a partir da URL informada, aplicando propriedades como largura, borda, e border-radius para manter a consistência com o restante da interface.

---

## Funcionamento

O conteúdo é carregado a partir da prop src, que deve receber uma string com o link de embed gerado no Figma.

---

## Uso

```vue
<FigmaFrame 
  src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FFILE_ID%2F..."
/>
```

---

## Props

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `src` | `string` | ✅ | URL de embed do frame do Figma |

---


## Como obter URLs do Figma

### 1. Acesse o frame no Figma
- Abra o arquivo do Figma
- Navegue até o frame desejado
- Selecione o frame específico

### 2. Gere o link de embed
- Clique no botão "Share" (compartilhar)
- Escolha "Copy embed code" ou "Copy link"
- Use a URL no formato de embed

---

## Troubleshooting

### Frame não carrega
- Verifique se a URL está no formato de embed
- Confirme se o arquivo do Figma está público
- Teste a URL diretamente no navegador


### Performance lenta
- Reduza número de frames por página
- Considere lazy loading para múltiplos frames
- Otimize arquivos no Figma

---

## Tipos TypeScript

```typescript path=null start=null
export type FigmaFrameType = typeof import("./FigmaFrame.vue")["default"];

interface Props {
  src: string;
}
```

---

## Notas importantes

- ⚠️ **Exclusivo para documentação** - Não usar em componentes ou aplicações de produção
