# Guia dos Componentes de Documentação

### Como usar os componentes personalizados para documentar componentes do design system
---

Este guia explica como usar os componentes de documentação personalizados criados para migração do Storybook para o VitePress. Estes componentes trabalham em conjunto para fornecer uma experiência de documentação rica e interativa.

## Visão geral dos componentes

### 🎯 Componentes principais
- **PreviewBuilder**: Componente principal que integra todos os outros
- **APITable**: Exibe informações técnicas (props, eventos, slots)
- **FigmaFrame**: Mostra designs originais do Figma

### 🔧 Componentes de suporte  
- **PreviewContainer**: Container visual básico
- **PlaygroundBuilder**: Controles interativos
- **LogBuilder**: Captura de eventos

---

## Estrutura padrão de documentação

### Template recomendado
````markdown
# NomeDoComponente

### Descrição breve do componente
---

Descrição detalhada do componente...

## Quando usar
- Lista de casos de uso...

## Quando não usar  
- Lista de quando evitar...

---

## Uso

```js
<CdsComponente
  prop="valor"
/>
```

---

## Preview

<PreviewBuilder
  :args="componentArgs"
  :component="CdsComponente"
  :events="componentEvents"
/>

---

## Props

<APITable
  name="ComponentName"
  section="props"
/>

## Eventos

<APITable
  name="ComponentName"  
  section="events"
/>

## Slots

<APITable
  name="ComponentName"
  section="slots"
/>

<script setup>
import { ref } from 'vue';
import CdsComponente from '@/components/SeuComponente.vue';

const componentArgs = ref({
  // props padrão
});

const componentEvents = [
  // lista de eventos
];
</script>
````

---

## Fluxo de trabalho

### 1. Preparação dos dados
```javascript
// Script setup com imports e dados reativos
const buttonArgs = ref({
  variant: 'primary',
  size: 'md',
  disabled: false,
  text: 'Clique aqui'
});

// Lista de eventos para captura
const buttonEvents = [
  'button-click',
  'focus',
  'blur'
];
```

### 2. Preview interativo
```html
<PreviewBuilder
  :args="buttonArgs"
  :component="CdsButton"
  :events="buttonEvents"
/>
```

### 3. Documentação técnica
```html
<!-- Props -->
<APITable
  name="Button"
  section="props"
/>

<!-- Eventos -->  
<APITable
  name="Button"
  section="events"
/>

<!-- Slots -->
<APITable
  name="Button"
  section="slots"
/>
```

---

## Casos de uso específicos

### Componente simples (Botão, Badge)
```html
<!-- Descrição e exemplos de uso -->

<PreviewBuilder
  :args="args"
  :component="CdsButton"
  :events="['button-click']"
/>

<APITable name="Button" section="props" />
<APITable name="Button" section="events" />
```

### Componente com trigger (Modal, Popover)
```html
<PreviewBuilder
  :args="modalArgs"
  :component="CdsModal"
  :events="['close', 'ok', 'cancel']"
  with-trigger
  @trigger-click="modalArgs.modelValue = !modalArgs.modelValue"
>
  <span>Conteúdo do modal</span>
</PreviewBuilder>
```

### Componente com fundo (Inputs)
```html
<PreviewBuilder
  :args="inputArgs"
  :component="CdsTextInput"
  :events="['update:modelValue', 'focus', 'blur']"
  with-background
/>
```

### Preview estático (sem playground)
```html
<PreviewBuilder
  :args="args"
  :component="CdsIcon"
  :events="[]"
  static
/>
```

### Múltiplos previews na mesma página
```html
<div>
  <h3>Variante Primary</h3>
  <PreviewBuilder
    :args="primaryArgs"
    :component="CdsButton"
    :events="buttonEvents"
  />

  <h3>Variante Secondary</h3>
  <PreviewBuilder
    :args="secondaryArgs"
    :component="CdsButton"
    :events="buttonEvents"
  />
</div>
```

---

## Integração com Figma

### Incluindo designs originais
```html
<div>
  <h2>Design Original</h2>
  <FigmaFrame 
    src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FJ5fTswomlHu7RXk1gwbUq6%2FCuida%3Fnode-id%3D3-0"
  />

  <h2>Implementação</h2>
  <PreviewBuilder
    :args="componentArgs"
    :component="CdsComponent"
    :events="componentEvents"
  />
</div>
```

---

## Componentes avançados

### Usando PreviewContainer diretamente
```html
<!-- Para layouts customizados -->
<PreviewContainer with-background>
  <CdsFlexbox gap="4">
    <CdsButton text="Button 1" />
    <CdsButton text="Button 2" variant="secondary" />
    <CdsButton text="Button 3" variant="danger" />
  </CdsFlexbox>
  <LogBuilder :events="['button-click']" />
</PreviewContainer>
```

### LogBuilder standalone  
```javascript
// Script setup para LogBuilder standalone
const logBuilder = useTemplateRef('logBuilderRef');
const internalEvents = ref({});

onMounted(() => {
  internalEvents.value = logBuilder.value.createEventListeners();
});
```

```html
<div>
  <CdsButton 
    text="Testar eventos"
    v-on="internalEvents"
  />
  <LogBuilder ref="logBuilderRef" :events="['button-click']" />
</div>
```

---

## Dicas e boas práticas

### ✅ Faça:
- Use `PreviewBuilder` como componente principal sempre que possível
- Mantenha `args` reativo com `ref()`
- Liste todos os eventos importantes do componente  
- Adicione contexto textual antes dos previews
- Use `with-background` para inputs e formulários
- Use `with-trigger` para modais e overlays

### ❌ Evite:
- Usar os componentes em aplicações de produção
- Misturar diferentes abordagens na mesma documentação
- Esquecer de importar os componentes necessários
- Args não reativos (objetos estáticos)
- Listas de eventos vazias quando há eventos importantes

### 🎯 Performance:
- PreviewBuilder carrega componentes sob demanda
- LogBuilder usa watchers otimizados
- APITable lê dados estáticos do build

### 📝 Manutenção:
- Dados das props são gerados automaticamente
- Atualizações nos componentes refletem automaticamente
- Documentação fica sempre sincronizada com o código

---

## Migração do Storybook

### Equivalências
| Storybook | VitePress |
|-----------|-----------|
| `Meta` | Frontmatter + imports |
| `Story` | `PreviewBuilder` |
| `args` | `args` (ref reativo) |
| `argTypes` | Automaticamente detectado |
| `actions` | `LogBuilder` |
| `controls` | `PlaygroundBuilder` |

### Exemplo de migração
```javascript
// Storybook (antes)
export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary']
    }
  }
};

export const Primary = {
  args: {
    variant: 'primary',
    text: 'Button'
  }
};
```

```html
<!-- VitePress (depois) -->
<!-- Script setup com imports e dados reativos -->
<PreviewBuilder
  :args="buttonArgs"
  :component="CdsButton"
  :events="['button-click']"
/>
```

---

## Troubleshooting

### Preview não aparece
- Verifique se o componente está importado corretamente
- Confirme se `args` é reativo (`ref()` ou `reactive()`)
- Verifique se o nome do componente tem a propriedade `name`

### Playground não gera controles
- Confirme se existe arquivo `components.json` gerado
- Verifique se o nome do componente está correto
- Confirme se as props têm metadados adequados

### Eventos não são capturados
- Verifique se a lista de eventos não está vazia
- Confirme se os nomes dos eventos estão corretos
- Use `createEventListeners()` para uso manual

### Performance lenta
- Reduza número de `PreviewBuilder` por página
- Use `static={true}` quando playground não for necessário
- Considere lazy loading para componentes pesados

---

## Conclusão

Os componentes de documentação fornecem uma experiência rica e interativa equivalente ao Storybook, mas integrada nativamente ao VitePress. Eles automatizam a maior parte do trabalho repetitivo enquanto mantêm flexibilidade para casos específicos.

**Próximos passos:**
1. Documente seus componentes usando este guia
2. Teste os previews interativos  
3. Valide as tabelas de API automáticas
4. Adicione designs do Figma quando relevante
5. Colete feedback da equipe sobre a nova experiência