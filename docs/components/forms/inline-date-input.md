# InlineDateInput

### InlineDateInput são componentes para escolha de datas e horas dentro de formulários.

---

## Quando usar:
- Houver a necessidade de oferecer opções de datas dentro de um grupo de inputs de um formulário
- Para seleção de datas em formulários inline
- Quando o espaço é limitado e precisa de um seletor de data compacto

## Quando não usar:
- For necessário exibir informações adicionais condicionais no calendário (ex.: datas que já estejam ocupadas)
- For necessário que o calendário seja exibido constantemente
- For necessário alterar dinamicamente o estado da tela exibida, baseado na data escolhida. Para estes casos, recomenda-se o uso de Calendar

## Observações:
- O InlineDateInput oferece uma experiência compacta para seleção de datas
- Suporta seleção de períodos (range) além de datas individuais
- Possui diferentes variantes de cores para combinar com o design
- Integra-se bem com outros componentes de formulário

## Uso

### Exemplo básico

```vue
<template>
  <cds-inline-date-input
    v-model="dateValue"
    label="Horário"
  />
</template>

<script setup>
import { ref } from 'vue';

const dateValue = ref('2000-01-01');
</script>
```

### Exemplo com período (range)

```vue
<template>
  <cds-inline-date-input
    v-model="dateRange"
    label="Período"
    :range="true"
    variant="blue"
  />
</template>

<script setup>
import { ref } from 'vue';

const dateRange = ref('');
</script>
```

## Preview

<cds-inline-date-input
  label="Período"
  variant="blue"
  :range="true"
/>

## Props

| Nome | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `string` | `''` | Valor da data selecionada |
| `label` | `string` | `''` | Rótulo do campo |
| `variant` | `string` | `'blue'` | Variante de cor: 'green', 'teal', 'turquoise', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'dark' |
| `state` | `string` | `'default'` | Estado do campo: 'default', 'valid', 'invalid' |
| `range` | `boolean` | `false` | Define se permite seleção de período |
| `disabled` | `boolean` | `false` | Define se o campo está desabilitado |

## Eventos

| Nome | Descrição |
|------|-----------|
| `update:modelValue` | Emitido quando a data selecionada é alterada |
| `change` | Emitido quando o valor do campo muda |

## Slots

Este componente não possui slots.

## Figma

[InlineDateInput no Figma](https://www.figma.com/design/design-system-url)
