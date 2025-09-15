# PreviewContainer

### Container visual padronizado para exibição de componentes na documentação
---

O **PreviewContainer** é um componente de layout que fornece um container visual consistente e padronizado para exibir componentes na documentação. Ele define bordas, padding, espaçamento e opções de fundo para criar uma apresentação uniforme dos previews.

## Quando usar

- Para criar uma área visual delimitada para um componente
- Quando precisar de um fundo opcional para melhor contraste
- Para manter consistência visual na documentação
- Como wrapper básico para demonstrações simples

## Como funciona

O componente cria uma div com estilos padronizados, incluindo borda, border-radius, padding e um sistema de fundo opcional controlado por CSS variables.

---

## Uso

### Uso básico
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
| `with-background` | `boolean` | `false` | Se deve aplicar fundo cinza claro no container |

---

## Slots

| Nome | Descrição |
|------|-----------|
| `default` | Conteúdo a ser exibido dentro do container |

---

## Características visuais

### 🎨 Estilo padrão
- **Border**: 1px sólida cor `#DFE5EC`
- **Border-radius**: 12px para cantos arredondados
- **Padding**: 28px em todos os lados
- **Margin**: 16px vertical para espaçamento entre containers
- **Position**: Relative para posicionamento de elementos filhos

### 🌈 Fundo opcional
Quando `with-background` é `true`:
- **Background**: `#F8F9FA` (cinza muito claro)
- **Transparente**: Por padrão é transparente

### 📱 Responsividade
- Padding e margens são fixos
- Container se adapta ao conteúdo
- Mantém proporções consistentes

---

## Exemplos práticos

### Botões com diferentes variantes
```vue
<PreviewContainer>
  <CdsFlexbox gap="3">
    <CdsButton text="Primário" />
    <CdsButton text="Secundário" variant="secondary" />
    <CdsButton text="Outline" variant="outline" />
  </CdsFlexbox>
</PreviewContainer>
```

### Formulário com fundo
```vue
<PreviewContainer with-background>
  <CdsFlexbox direction="column" gap="4" style="max-width: 400px">
    <CdsTextInput label="Nome" />
    <CdsTextInput label="Email" type="email" />
    <CdsTextArea label="Mensagem" />
    <CdsButton text="Enviar" />
  </CdsFlexbox>
</PreviewContainer>
```

### Cards e componentes complexos
```vue
<PreviewContainer with-background>
  <CdsFlexbox gap="4">
    <CdsCard>
      <template #header>
        <h3>Card 1</h3>
      </template>
      Conteúdo do primeiro card
    </CdsCard>
    
    <CdsCard>
      <template #header>
        <h3>Card 2</h3>
      </template>
      Conteúdo do segundo card
    </CdsCard>
  </CdsFlexbox>
</PreviewContainer>
```

---

## CSS e estilos

```scss path=null start=null
.preview-container {
  position: relative;
  padding: 28px;
  border: 1px solid #DFE5EC;
  background-color: v-bind(containerBackground);
  border-radius: 12px;
  margin: 16px 0;
}
```

### CSS Variables utilizadas
- `containerBackground`: Computada dinamicamente baseada na prop `with-background`

---

## Integração com outros componentes

### Com LogBuilder
```vue
<PreviewContainer>
  <CdsButton 
    text="Testar eventos"
    @button-click="handleClick"
  />
  <LogBuilder :events="['button-click']" />
</PreviewContainer>
```

### Dentro do PreviewBuilder
O PreviewContainer é automaticamente usado pelo PreviewBuilder:
```vue
<!-- PreviewBuilder usa PreviewContainer internamente -->
<PreviewBuilder 
  :component="CdsButton"
  :args="buttonArgs"
  with-background
/>
```

---

## Design tokens

O componente utiliza tokens do design system:

| Propriedade | Token/Valor | Descrição |
|-------------|-------------|-----------|
| Border | `#DFE5EC` | Cor da borda (neutral-200) |
| Border-radius | `12px` | Raio dos cantos arredondados |
| Background (opcional) | `#F8F9FA` | Cor de fundo clara (neutral-50) |
| Padding | `28px` | Espaçamento interno |
| Margin | `16px 0` | Espaçamento externo vertical |

---

## Estrutura interna

```vue path=null start=null
<template>
  <div class="preview-container">
    <slot />
  </div>
</template>

<script setup>
const props = withDefaults(defineProps<{
  withBackground?: boolean,
}>(), {
  withBackground: false,
});

const containerBackground = computed(() => 
  props.withBackground ? '#F8F9FA' : 'transparent'
);
</script>
```

---

## Notas importantes

- ⚠️ **Exclusivo para documentação** - Não usar em aplicações
- Mantém posição `relative` para posicionamento de elementos filhos (como LogBuilder)
- O fundo é controlado via CSS variable para performance
- Margens verticais ajudam no espaçamento entre múltiplos containers
- Design responsivo e adaptável ao conteúdo

---

## Casos de uso comuns

### ✅ Usar quando:
- Precisar de um container visual para demonstrações
- Quiser padronizar a aparência dos previews
- Necessitar de fundo opcional para contraste
- Criar layouts simples de demonstração

### ❌ Evitar quando:
- O componente já tem seu próprio container
- Precisar de estilos muito específicos
- O layout requer estruturas complexas
- Em aplicações de produção (apenas documentação)

---

## Tipos TypeScript

```typescript path=null start=null
export type PreviewContainerType = typeof import("./PreviewContainer.vue")["default"];

interface Props {
  withBackground?: boolean;
}
```