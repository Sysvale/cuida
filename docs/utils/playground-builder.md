# PlaygroundBuilder

Sistema de controles interativos que gera automaticamente inputs para manipular as props dos componentes.

---

## Descrição

O PlaygroundBuilder é um componente utilizado para criar controles interativos adequados a cada tipo de propriedade do componente documentado. Ele permite explorar e testar diferentes configurações dos componentes em tempo real.

---

## Funcionamento

O componente recebe, por meio da prop component, o nome do componente que será utilizado no playground. Com base nos metadados disponíveis no arquivo components-metadata.json, ele identifica as props do componente, analisa seus tipos e gera dinamicamente o controle mais apropriado — como campos de texto, seletores, checkboxes ou listas — de acordo com o tipo da prop (string, number, boolean, enum, etc.).

---

## Uso

### Uso básico
```vue
<script setup>
const buttonArgs = ref({
  variant: 'primary',
  size: 'md', 
  disabled: false,
  text: 'Clique aqui'
});
</script>

<PlaygroundBuilder
  v-model:args="buttonArgs"
  :component="Button"
/>
```

### Integrado no PreviewBuilder
```vue
<!-- PlaygroundBuilder é usado automaticamente pelo PreviewBuilder -->
<PreviewBuilder
  :args="componentArgs"
  :component="CdsButton"
  :events="['button-click']"
  <!-- PlaygroundBuilder será renderizado automaticamente -->
/>
```

---

## Props

| Nome | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `component` | `string` | - | Nome do componente para buscar metadados |

---

## Eventos

| Nome | Descrição |
|------|-----------|
| `update` | Emitido quando alguma prop é alterada |

---

## Tipos de controles gerados

O PlaygroundBuilder gera diferentes tipos de controles baseado no tipo da prop:

### Propriedades numéricas (`number`)
- **NumberInput**: Para valores numéricos simples
- **Slider**: Quando as props têm `min` e `max` definidos
  - Calcula automaticamente o `step`
  - Exibe valor em tempo real

### Propriedades string
- **Select**: Quando há valores específicos disponíveis (documentados com `@values`)
- **TextInput**: Para strings livres

### Propriedades boolean
- **Switch**: Para valores booleanos

### Arrays e objetos
- Renderiza o conteúdo em um container scrollável que permite visualizar a estrutura de arrays e objetos, facilitando o entendimento de como devem ser formatados.

---


## Tipos TypeScript

```typescript path=null start=null
export type PlaygroundBuilderType = typeof import("./PlaygroundBuilder.vue")["default"];

interface Props {
  component: string;
  args?: Object;
}

interface Emits {
  (e: 'update'): void;
}
```

---


## Notas importantes

- ⚠️ **Exclusivo para documentação** - Não usar em componentes ou aplicações de produção
- Requer dados válidos em `components-metadata.json`
- Funciona apenas com props que têm metadados apropriados
- Os controles são gerados dinamicamente na montagem
- Sincronização bidirecional com o componente pai
