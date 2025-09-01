# ColorPicker

### ColorPickers permitem aos usuários escolherem cores de modo visual.

---

## Quando usar:
- Use o ColorPicker em cenários em que o usuário precisa escolher uma cor dentre um conjunto de cores disponíveis
- Use o ColorPicker em conjunto com inputs caso queira que o usuário visualize o valor HEX da cor escolhida
- Em caso de poucas opções de cor dê preferência ao ColorPicker no modo `inline`

## Quando não usar:
- Quando o usuário precisa de uma paleta de cores ilimitada
- Para seleção de cores que não estão disponíveis no Cuida

## Observações:
- O ColorPicker não permite ao usuário escolher qualquer cor, apenas cores disponíveis no Cuida
- O modo como você estrutura o array (matriz) da prop swatch importa na renderização do componente. Ex.: se você tiver 3 linhas na matriz o ColorPicker renderizará 3 linhas de cores
- O ColorPicker emite a cor selecionada como uma string contendo o HEX da cor
- Disponível em modo inline ou com popover para economizar espaço

## Uso

### Exemplo básico (inline)

```vue
<template>
  <cds-color-picker
    v-model="color"
    label="Cor"
    :swatch="swatch"
    :inline="true"
    @change="handleEmit"
  />
</template>

<script setup>
import { ref } from 'vue';
const args = ref({});

const color = ref('#2AC092');

const swatch = [
  [
    '$gp-400',
    '$ts-400',
    '$bn-400',
    '$in-400',
    '$vr-400',
  ],
  [
    '$pp-400',
    '$rc-400',
    '$og-400',
    '$al-400',
    '$n-400',
  ],
];

const handleEmit = (value) => {
  console.info('value: ', value);
};
</script>
```

### Exemplo com popover

```vue
<template>
  <cds-color-picker
    v-model="color"
    :swatch="largeSwatch"
    :popoverHeight="190"
    @change="handleEmit"
  />
</template>

<script setup>
import { ref } from 'vue';
const args = ref({});

const color = ref('#2AC092');

const largeSwatch = [
  ['$gp-200', '$gp-300', '$gp-400', '$gp-500'],
  ['$ts-200', '$ts-300', '$ts-400', '$ts-500'],
  ['$bn-200', '$bn-300', '$bn-400', '$bn-500'],
  ['$in-200', '$in-300', '$in-400', '$in-500'],
];

const handleEmit = (value) => {
  console.info('value: ', value);
};
</script>
```

## Preview

<cds-color-picker
  label="Cor"
  :inline="true"
/>

## Props

| Nome | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `string` | `''` | Valor da cor selecionada (HEX) |
| `label` | `string` | `''` | Rótulo do campo |
| `swatch` | `array` | `[]` | Matriz de cores disponíveis para seleção |
| `inline` | `boolean` | `false` | Define se o picker é exibido inline ou em popover |
| `popoverHeight` | `number` | `150` | Altura do popover quando não é inline |
| `disabled` | `boolean` | `false` | Define se o componente está desabilitado |

## Eventos

| Nome | Descrição |
|------|-----------|
| `update:modelValue` | Emitido quando a cor selecionada é alterada |
| `change` | Emitido quando uma nova cor é escolhida |
| `variant-chosen` | Emitido quando uma variante de cor é escolhida |

## Slots

Este componente não possui slots.

## Figma

[ColorPicker no Figma](https://www.figma.com/design/design-system-url)
