# FigmaFrame

### Componente para incorporar frames do Figma diretamente na documentação
---

O **FigmaFrame** é um componente simples e eficiente que permite incorporar designs, protótipos e frames do Figma diretamente nas páginas de documentação. Ele cria um iframe estilizado e responsivo para exibir conteúdo do Figma de forma integrada ao design system.

## Quando usar

- Para mostrar designs originais dos componentes
- Quando precisar exibir protótipos ou wireframes
- Para comparar implementação com o design original
- Para documentar especificações visuais diretamente do Figma

## Como funciona

O componente cria um iframe com estilos padronizados que carrega o URL do frame do Figma especificado, mantendo a proporção e aparência consistente com o resto da documentação.

---

## Uso

### Uso básico
```vue
<FigmaFrame 
  src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FFILE_ID%2F..."
/>
```

### Frame específico do design system
```vue
<FigmaFrame 
  src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FJ5fTswomlHu7RXk1gwbUq6%2FCuida%3Fnode-id%3D123-456"
/>
```

### Em seção de componente
```vue
<template>
<div>
  <h2>Design Original</h2>
  <p>Veja abaixo o design original deste componente no Figma:</p>
  
  <FigmaFrame 
    src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FJ5fTswomlHu7RXk1gwbUq6%2FCuida%3Fnode-id%3D3-0"
  />
</div>
</template>
```

---

## Props

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `src` | `string` | ✅ | URL de embed do frame do Figma |

---

## Características visuais

### 🎨 Estilo do iframe
- **Largura**: 700px (fixa)
- **Altura**: 450px (fixa)
- **Border**: 1px sólida `#DFE5EC` (consistente com outros containers)
- **Border-radius**: 12px para cantos arredondados
- **Margin-top**: 24px para espaçamento superior

### 🔧 Atributos técnicos
- **allowfullscreen**: Permite visualização em tela cheia
- **frameborder**: Removida via CSS (border personalizada)
- **Loading**: Carregamento padrão do navegador

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

### 3. Formato da URL
```
https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2F[FILE_ID]%2F[FILE_NAME]%3Fnode-id%3D[NODE_ID]
```

### 4. Exemplo de URL completa
```
https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FJ5fTswomlHu7RXk1gwbUq6%2FCuida%3Fnode-id%3D3-0%26t%3Dabcdefghijk-1
```

---

## Exemplos práticos

### Documentação de botão
```vue
<template>
<div>
  <h1>Button</h1>
  
  <h2>Design Specification</h2>
  <p>Veja as especificações originais do botão no Figma:</p>
  
  <FigmaFrame 
    src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FJ5fTswomlHu7RXk1gwbUq6%2FCuida-Button-Specs%3Fnode-id%3D1-100"
  />

  <h2>Variantes</h2>
  <p>Todas as variantes disponíveis do componente:</p>
  
  <FigmaFrame 
    src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FJ5fTswomlHu7RXk1gwbUq6%2FCuida-Button-Variants%3Fnode-id%3D2-200"
  />

  <h2>Implementação</h2>
  <PreviewBuilder 
    :component="CdsButton"
    :args="buttonArgs"
  />
</div>
</template>
```

### Comparação design vs implementação
```vue
<template>
<div>
  <h2>Design Original</h2>
  <FigmaFrame 
    src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FJ5fTswomlHu7RXk1gwbUq6%2FCuida%3Fnode-id%3D3-0"
  />
  
  <h2>Componente Implementado</h2>
  <PreviewContainer>
    <CdsModal 
      v-model="showModal"
      title="Modal implementado"
    >
      Conteúdo do modal
    </CdsModal>
  </PreviewContainer>
</div>
</template>
```

### Protótipo interativo
```vue
<template>
<div>
  <h2>Protótipo Navegável</h2>
  <p>Explore o protótipo interativo do fluxo completo:</p>
  
  <FigmaFrame 
    src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FJ5fTswomlHu7RXk1gwbUq6%2FCuida-Prototype%3Fnode-id%3D1-1%26scaling%3Dmin-zoom%26page-id%3D0%253A1"
  />
</div>
</template>
```

---

## Estrutura CSS

```scss path=null start=null
.frame-container {
  border: 1px solid #DFE5EC;
  border-radius: 12px;
  margin-top: 24px;
  width: 700px;
  height: 450px;
}
```

### Design tokens utilizados
- **Border color**: `#DFE5EC` (neutral-200 do design system)
- **Border radius**: `12px` (padrão para containers)
- **Spacing**: `24px` (consistente com outros componentes)

---

## Responsividade

### 📱 Limitações
- Largura fixa de 700px
- Altura fixa de 450px  
- Não responsivo (por design)

### 💡 Recomendações
- Ideal para desktop e tablets
- Em mobile, considere usar links diretos ao Figma
- Para melhor experiência, use em seções com scroll horizontal se necessário

---

## Considerações de performance

### ⚡ Carregamento
- Iframe carrega conteúdo sob demanda
- Não bloqueia renderização da página
- Figma otimiza automaticamente o conteúdo

### 🔒 Segurança
- URLs devem ser de domínios confiáveis (figma.com)
- Embed host configurado para compartilhamento seguro
- Sandbox automático do iframe

---

## Boas práticas

### ✅ Faça:
- Use URLs de embed oficiais do Figma
- Adicione contexto explicativo antes do frame
- Mantenha designs atualizados no Figma
- Use para mostrar especificações visuais importantes

### ❌ Evite:
- URLs diretas de arquivos (sem embed)
- Frames muito pequenos ou com muito conteúdo
- Usar como única documentação de componentes
- Misturar diferentes estilos de frames na mesma página

---

## Troubleshooting

### Frame não carrega
```
- Verifique se a URL está no formato de embed
- Confirme se o arquivo do Figma está público
- Teste a URL diretamente no navegador
```

### Layout quebrado
```
- Confirme as dimensões 700x450px
- Verifique se não há CSS conflitante
- Teste em diferentes navegadores
```

### Performance lenta
```
- Reduza número de frames por página
- Considere lazy loading para múltiplos frames
- Otimize arquivos no Figma
```

---

## Estrutura interna

```vue path=null start=null
<template>
  <iframe
    class="frame-container"
    :src="src"
    allowfullscreen
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  src: string
}>();
</script>

<style scoped>
.frame-container {
  border: 1px solid #DFE5EC;
  border-radius: 12px;
  margin-top: 24px;
  width: 700px;
  height: 450px;
}
</style>
```

---

## Integração com documentação

### Com outros componentes
```html
<div>
  <!-- Design original -->
  <FigmaFrame :src="designUrl" />
  
  <!-- Implementação -->
  <PreviewBuilder :component="Component" :args="args" />
  
  <!-- Especificações -->  
  <APITable name="Component" section="props" />
</div>
```

### Em fluxos de trabalho
1. **Designer** atualiza o Figma
2. **Developer** referencia o frame na documentação
3. **Reviewer** compara design com implementação
4. **User** vê contexto visual completo

---

## Notas importantes

- ⚠️ **Exclusivo para documentação** - Não usar em aplicações de produção
- Requer conexão com internet para carregar frames
- Dependente da disponibilidade dos serviços do Figma
- Dimensões fixas por consistência visual
- Sempre adicione contexto textual junto com o frame

---

## Tipos TypeScript

```typescript path=null start=null
export type FigmaFrameType = typeof import("./FigmaFrame.vue")["default"];

interface Props {
  src: string;
}
```