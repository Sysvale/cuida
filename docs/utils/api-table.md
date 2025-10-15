# APITable

Componente interno usado na documentação para exibir informações da API dos componentes em formato de tabela.

---

## Descrição

O **APITable** gera automaticamente tabelas com dados sobre **props**, **eventos** e **slots** dos componentes do design system. Ele consome o arquivo `components-metadata.json` gerado pelo `vueDocgen` e organiza as informações em formato de tabela.

---

## Funcionamento

Para que o componente funcione corretamente, o componente documentado deve conter **comentários JSDoc**.
Esses comentários são processados pelo `vueDocgen` e transformados no arquivo `components-metadata.json`, usado pelo APITable.

O `vueDocgen` identifica automaticamente:
- **Nome da prop/event/slot** a partir do componente;
- **Valores default das props** a partir da definição no SFC (Ex.: `default: 'md',`);
- **Obrigatoriedade** a partir do `required: true`;
- **Lista de valores aceitos** definidos com a tag `@values` no comentário JSDoc;
- **Descrição** a partir do texto do comentário;
- **Deprecações** usando a tag `@deprecated`.

---

## Comentando os componentes para que o APITable funciona corretamente:

### Props
Usam blocos JSDoc padrão:
```vue
/**
 * A variante do Alert. São 3 variantes implementadas:
 * @values info, warning, danger
 */
variant: {
  type: String,
  default: 'info',
  required: false,
},
```

### Eventos
Utilizam a tag `@event`:
```vue
/**
 * Evento emitido quando o botão "X" é clicado.
 * @event close
 * @type {Event}
 */
```

### Slots
São definidos via comentários em HTML:
```vue
<!-- @slot Slot para renderização de botões na ActionBar. -->
```

### Props deprecated
Para marcar props obsoletas:
```vue
/**
 * @deprecated Essa prop será substituída por `floatingLabel` na v4.
 * Define o tipo do input; se true, será um input adaptado para mobile.
 */
```

---

## Props do componente

| Prop | Tipo | Descrição |
|------|------|------------|
| `name` | `string` | Nome do componente a ser documentado |
| `section` | `string` | Seção a exibir: `"props"`, `"events"` ou `"slots"` |

Com base nessas props, o APITable renderiza automaticamente a tabela correspondente.

---

## Uso

```vue
<!-- Para documentar props -->
<APITable
  name="Button"
  section="props"
/>

<!-- Para documentar eventos -->
<APITable
  name="Modal"
  section="events"
/>

<!-- Para documentar slots -->
<APITable
  name="Card"
  section="slots"
/>
```

---

## Notas importantes

- ⚠️ **Exclusivo para documentação** - Não usar em componentes ou aplicações de produção
- Os dados do `components-metadata.json` são gerados automaticamente no processo de build.
- Para atualizar manualmente o `components-metadata.json` após alterações em JSDocs, execute `npm run generate:docs`.
- Se o componente ou a seção informada não existirem no components-metadata.json, o componente não exibirá conteúdo.
