# MonthAndYearPicker

### MonthAndYearPickers permitem que o usuário selecione um mês e ano através de um campo de texto e um seletor interativo.

---

## Quando usar:
- O usuário precisar selecionar apenas o mês e ano, sem especificar o dia
- Para campos de data que não necessitam de precisão diária
- Em relatórios ou filtros que operam em nível mensal

## Quando não usar:
- O usuário precisar selecionar uma data específica com dia, mês e ano (use DateInput)
- O usuário precisar selecionar um intervalo de datas (use DateInput com a propriedade range)
- For necessário selecionar apenas o ano, sem o mês

## Observações:
- O `v-model` recebe e retorna uma string no formato ('yyyy-MM')
- Por padrão, o componente exibe o mês e ano atual ao abrir, a menos que um valor seja fornecido
- O componente aplica automaticamente restrições de navegação baseadas nas propriedades minDate e maxDate
- Suporta diferentes variantes de cores e estados de validação
- Oferece modo floating label para melhor experiência visual

## Uso

### Exemplo básico

```vue
<template>
  <cds-month-and-year-picker
    v-model="monthValue"
    label="Mês"
    variant="green"
    placeholder="Escolha um mês..."
  />
</template>

<script setup>
import { ref } from 'vue';

const monthValue = ref('2025-05');
</script>
```

### Exemplo com limites de data

```vue
<template>
  <cds-month-and-year-picker
    v-model="monthValue"
    label="Mês"
    variant="green"
    placeholder="Escolha um mês..."
    maxDate="2026-06-06"
    minDate="2023-01-01"
  />
</template>

<script setup>
import { ref } from 'vue';

const monthValue = ref('');
</script>
```

### Exemplo com floating label

```vue
<template>
  <cds-month-and-year-picker
    v-model="monthValue"
    label="Mês"
    variant="green"
    :floatingLabel="true"
    placeholder="Escolha um mês..."
  />
</template>

<script setup>
import { ref } from 'vue';

const monthValue = ref('');
</script>
```

## Preview

<cds-month-and-year-picker
  label="Mês"
  variant="green"
  placeholder="Escolha um mês..."
/>

## Props

| Nome | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `string` | `''` | Valor selecionado no formato 'yyyy-MM' |
| `label` | `string` | `''` | Rótulo do campo |
| `variant` | `string` | `'green'` | Variante de cor: 'green', 'teal', 'turquoise', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'dark' |
| `state` | `string` | `'default'` | Estado do campo: 'default', 'valid', 'invalid', 'loading' |
| `placeholder` | `string` | `''` | Texto de placeholder |
| `required` | `boolean` | `false` | Define se o campo é obrigatório |
| `disabled` | `boolean` | `false` | Define se o campo está desabilitado |
| `fluid` | `boolean` | `false` | Define se o campo ocupa toda a largura |
| `mobile` | `boolean` | `false` | Define se usa layout mobile |
| `floatingLabel` | `boolean` | `false` | Define se o label flutua |
| `errorMessage` | `string` | `''` | Mensagem de erro |
| `supportingText` | `string` | `''` | Texto de suporte |
| `tooltip` | `string` | `''` | Texto do tooltip |
| `maxDate` | `string` | `''` | Data máxima no formato 'yyyy-MM-dd' |
| `minDate` | `string` | `''` | Data mínima no formato 'yyyy-MM-dd' |

## Eventos

| Nome | Descrição |
|------|-----------|
| `update:modelValue` | Emitido quando o valor é alterado |
| `change` | Emitido quando o valor muda |
| `click` | Emitido quando o campo é clicado |
| `focus` | Emitido quando o campo recebe foco |
| `blur` | Emitido quando o campo perde foco |
| `keydown` | Emitido quando uma tecla é pressionada |

## Slots

Este componente não possui slots.

## Figma

[MonthAndYearPicker no Figma](https://www.figma.com/design/design-system-url)
