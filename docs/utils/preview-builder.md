# PreviewBuilder

Componente responsável por criar previews interativas dos componentes do design system.

---

## Descrição

O **PreviewBuilder** é utilizado na documentação para renderizar componentes de forma interativa.
Ele combina a renderização do componente, o controle de props por meio do playground, a captura de eventos e o container visual que envolve o preview.

---

## Exemplos de uso

### Uso básico
```vue
<PreviewBuilder
  :args="componentArgs"
  :component="CdsButton"
  :events="['button-click', 'focus', 'blur']"
/>
```

### Com slot default
```vue
<PreviewBuilder
  :args
  :component="CdsText"
>
  O empenho em analisar o desenvolvimento contínuo obstaculiza a apreciação da importância.
</PreviewBuilder>
```

### Com named slot
```vue
<PreviewBuilder
  :args
  :component="CdsActionBar"
  :events="cdsActionBarEvents"
  with-trigger
  @trigger-click="args.show = !args.show"
>
  <template #description>
    8 itens selecionados
  </template>
</PreviewBuilder>
```

### Com trigger (para modais e overlays)
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

### Múltiplos previews
```vue
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

## API

### Props

| Nome | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `component` | `Component & { name: string }` | - | Instância ou nome do componente a ser renderizado |
| `args` | `Object` | - | Objeto reativo com as props do componente (`model`) |
| `events` | `string[]` | `[]` | Lista de eventos a serem capturados |
| `with-background` | `boolean` | `false` | Aplica fundo cinza ao container (útil para contraste) |
| `with-trigger` | `boolean` | `false` | Exibe botão de trigger para abrir modais, popovers, etc |
| `static` | `boolean` | `false` | Desativa o playground, exibindo apenas o preview |

---

### Eventos

| Nome | Descrição |
|------|-----------|
| `trigger-click` | Emitido quando o botão de trigger é clicado (disponível apenas com `with-trigger`) |

---

### Slots

| Nome | Descrição |
|------|-----------|
| `default` | Conteúdo renderizado dentro do componente exibido |

---

## Dependências

O **PreviewBuilder** combina diferentes partes do sistema de documentação:
- `PreviewContainer` — container visual principal
- `PlaygroundBuilder` — controles interativos das props
- `LogBuilder` — captura e exibição de eventos

---

## Tipos TypeScript

```typescript
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

---

## Notas importantes

- ⚠️ **Exclusivo para documentação** - Não usar em componentes ou aplicações de produção
- O objeto `args` precisa ser reativo (`ref` ou `reactive`).
- A lista de eventos deve ser um array de strings.
- Os eventos informados em `events` são automaticamente registrados no `LogBuilder`.
- O componente passado deve possuir a propriedade `name`:
  - Para Composition API: `defineOptions({ name: 'CdsBaseInput' });`
  - Para Options API: ```export default {
	name: 'CdsActionBar'
	props: ....```
- Todos os slots são repassados automaticamente ao componente renderizado.
