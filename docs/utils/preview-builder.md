# PreviewBuilder

### Componente principal para criar previews interativas e completas dos componentes
---

O **PreviewBuilder** é o componente mais importante da documentação, responsável por criar previews interativas completas dos componentes do design system. Ele combina a renderização do componente, controles de playground, captura de eventos e container visual em uma solução integrada.

## Quando usar

- Para criar a seção de preview principal de um componente
- Quando precisar de uma demonstração interativa completa
- Para componentes que precisam de playground automático
- Sempre que quiser capturar e exibir eventos do componente

## Como funciona

O PreviewBuilder renderiza dinamicamente o componente especificado, gera automaticamente controles baseados nas props, captura eventos emitidos e apresenta tudo em um container visual consistente.

---

## Uso

### Uso básico
```vue
<PreviewBuilder
  :args="componentArgs"
  :component="CdsButton"
  :events="['button-click', 'focus', 'blur']"
/>
```

### Com trigger para modais/overlays
```vue
<PreviewBuilder
  :args="modalArgs"
  :component="CdsModal"
  :events="['close', 'ok', 'cancel']"
  with-trigger
  @trigger-click="modalArgs.modelValue = true"
>
  <span>Conteúdo do modal</span>
</PreviewBuilder>
```

### Preview estático (sem playground)
```vue
<PreviewBuilder
  :args="buttonArgs"
  :component="CdsButton"
  :events="['button-click']"
  static
>
  Texto do botão
</PreviewBuilder>
```

---

## Props

| Nome | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `component` | `Component & { name: string }` | - | Instância do componente Vue a ser renderizado |
| `args` | `Object` | - | Objeto reativo com as props do componente (v-model) |
| `events` | `string[]` | `[]` | Array com nomes dos eventos a serem capturados |
| `with-background` | `boolean` | `false` | Se deve aplicar fundo cinza no container |
| `with-trigger` | `boolean` | `false` | Se deve renderizar botão de trigger para modais |
| `static` | `boolean` | `false` | Se deve ocultar o playground (apenas preview) |

---

## Eventos

| Nome | Descrição |
|------|-----------|
| `trigger-click` | Emitido quando o botão de trigger é clicado (apenas com `with-trigger`) |

---

## Slots

| Nome | Descrição |
|------|-----------|
| `default` | Conteúdo a ser passado para o componente sendo renderizado |

---

## Funcionalidades integradas

### 🎮 Playground automático
- Gera controles automaticamente baseados nas props do componente
- Suporta strings, números, booleans e enums
- Controles específicos para diferentes tipos (text input, number input, select, switch, slider)

### 📊 Captura de eventos
- Captura e exibe todos os eventos especificados
- Log em tempo real com timestamp
- Formatação JSON do payload dos eventos

### 🎨 Container visual
- Border consistente com o design system
- Background opcional para melhor contraste
- Botão de log posicionado estrategicamente

### ⚡ Trigger para overlays
- Botão automático para testar modais, popovers, etc.
- Integração com o v-model do componente
- Label automática baseada no nome do componente

---

## Exemplos de uso

### Botão simples
```vue
<script setup>
import { ref } from 'vue';
import CdsButton from '@/components/Button.vue';

const buttonArgs = ref({
  variant: 'primary',
  size: 'md',
  disabled: false,
  text: 'Clique aqui'
});
</script>

<template>
<PreviewBuilder
  :args="buttonArgs"
  :component="CdsButton"
  :events="['button-click']"
/>
</template>
```

### Modal com trigger
```vue
<script setup>
import { ref } from 'vue';
import CdsModal from '@/components/Modal.vue';

const modalArgs = ref({
  modelValue: false,
  title: 'Título do modal',
  size: 'md'
});
</script>

<template>
<PreviewBuilder
  :args="modalArgs"
  :component="CdsModal"
  :events="['close', 'update:modelValue']"
  with-trigger
  @trigger-click="modalArgs.modelValue = !modalArgs.modelValue"
>
  <p>Conteúdo do modal aqui</p>
</PreviewBuilder>
</template>
```

### Input com background
```vue
<script setup>
import { ref } from 'vue';
import CdsTextInput from '@/components/TextInput.vue';

const inputArgs = ref({
  modelValue: '',
  label: 'Nome',
  placeholder: 'Digite seu nome'
});
</script>

<template>
<PreviewBuilder
  :args="inputArgs"
  :component="CdsTextInput"
  :events="['update:modelValue', 'focus', 'blur']"
  with-background
/>
</template>
```

---

## Estrutura interna

```vue path=null start=null
<template>
  <PreviewContainer :withBackground>
    <!-- Componente dinâmico com props e eventos -->
    <component
      :is="component"
      v-bind="{ ...$attrs, ...model }"
      v-model="model.modelValue"
      v-on="internalEvents"
    >
      <slot />
    </component>
    
    <!-- Sistema de captura de eventos -->
    <LogBuilder ref="logBuilderRef" :events />
  </PreviewContainer>

  <!-- Playground para controlar props -->
  <PlaygroundBuilder
    v-if="!static"
    :component="component.name"
    :args="model"
  />
</template>
```

---

## Dependências

O componente integra:
- `PreviewContainer` - Container visual
- `PlaygroundBuilder` - Controles interativos  
- `LogBuilder` - Captura de eventos
- Componentes do design system (conforme especificado)

---

## Notas importantes

- ⚠️ **Exclusivo para documentação** - Não usar em aplicações
- O objeto `args` deve ser reativo (`ref` ou `reactive`)
- Eventos são automaticamente vinculados aos controles do LogBuilder
- O componente deve ter a propriedade `name` definida
- Slots são automaticamente passados para o componente renderizado

---

## Tipos TypeScript

```typescript path=null start=null
export type PreviewBuilderType = typeof import("./PreviewBuilder.vue")["default"];

interface Props {
  component: Component & { name: string };
  args?: Object;
  events?: string[];
  withBackground?: boolean;
  withTrigger?: boolean;
  static?: boolean;
}
```