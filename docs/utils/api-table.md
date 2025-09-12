# APITable

### Componente para exibir informações de API dos componentes de forma tabelar
---

O **APITable** é um componente interno da documentação que gera automaticamente tabelas com informações sobre props, eventos e slots dos componentes do design system. Ele consome dados gerados pelo plugin `vueDocgenPlugin` e os apresenta de forma organizada e legível.

## Quando usar

- Para documentar as props de um componente
- Para listar os eventos emitidos por um componente  
- Para documentar os slots disponíveis em um componente
- Sempre que precisar de uma tabela estruturada com informações de API

## Como funciona

O componente lê dados do arquivo `docs/.docgen/components.json` (gerado automaticamente pelo plugin vue-docgen) e renderiza uma tabela formatada com base no tipo de seção solicitada.

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

## Parâmetros

### Props

| Nome | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `name` | `string` | `'Button'` | Nome do componente para buscar os dados da API |
| `section` | `string` | - | Seção a ser exibida: `'props'`, `'events'` ou `'slots'` |

---

## Comportamento por seção

### Props (`section="props"`)

Exibe uma tabela com as seguintes colunas:
- **Nome**: Nome da prop com indicador visual se for obrigatória
- **Tipo**: Tipo da propriedade (string, boolean, number, etc.)
- **Default**: Valor padrão da propriedade
- **Opções**: Valores aceitos (quando aplicável)
- **Descrição**: Descrição da propriedade

### Eventos (`section="events"`)

Exibe uma tabela com as seguintes colunas:
- **Nome**: Nome do evento com prefixo `@`
- **Descrição**: Descrição do evento

### Slots (`section="slots"`)

Exibe uma tabela com as seguintes colunas:
- **Nome**: Nome do slot com prefixo `#`
- **Descrição**: Descrição do slot

---

## Características visuais

### 🔴 Props obrigatórias
Props marcadas como `required: true` recebem:
- Um indicador visual vermelho (`CdsRequiredIndicator`)
- Texto "(required)" em vermelho
- Formatação em `code` para destaque

### 📝 Formatação
- Nomes de props, eventos e slots são formatados como `code`
- Valores de opções são listados linha por linha
- Tabela transparente para integração visual com o tema

---

## Dependências

O componente depende de:
- `CdsTable` - Componente de tabela do design system
- `CdsRequiredIndicator` - Indicador visual para campos obrigatórios
- `docs/.docgen/components.json` - Dados gerados pelo vue-docgen-api

---

## Exemplo de dados consumidos

```json
{
  "Button": {
    "props": [
      {
        "name": "variant",
        "type": { "name": "string" },
        "required": false,
        "defaultValue": { "value": "'primary'" },
        "values": ["'primary'", "'secondary'", "'danger'"],
        "description": "Variante visual do botão"
      }
    ],
    "events": [
      {
        "name": "button-click",
        "description": "Emitido quando o botão é clicado"
      }
    ],
    "slots": [
      {
        "name": "default",
        "description": "Conteúdo principal do botão"
      }
    ]
  }
}
```

---

## Notas importantes

- ⚠️ **Não deve ser usado diretamente em aplicações** - É exclusivo para a documentação
- Os dados são gerados automaticamente pelo build process
- O componente não exibe nada se não houver dados para o componente especificado
- A seção especificada deve existir nos dados do componente

---

## Estrutura interna

```vue path=null start=null
<template>
  <CdsTable
    v-if="tableData.value.length"
    :fields="tableFields"
    :items="tableData"
    transparent
  >
    <!-- Formatação customizada para nome das props/eventos/slots -->
    <template #table-item="{ data, field }">
      <!-- Indicador de obrigatório e formatação em code -->
    </template>
  </CdsTable>
</template>
```